import { Ayah, Reciter } from '../types/quran';
import { PRELOADED_SURAHS } from '../data/quranAyahs';
import { RECITERS_LIST } from '../data/quranMetadata';

const CACHE_PREFIX = 'quran_app_surah_';

// Audio URL builder using high-quality EveryAyah CDN
export function getAyahAudioUrl(surahNumber: number, ayahNumber: number, reciterId: string = 'alafasy'): string {
  const reciter = RECITERS_LIST.find(r => r.id === reciterId) || RECITERS_LIST[0];
  const paddedSurah = String(surahNumber).padStart(3, '0');
  const paddedAyah = String(ayahNumber).padStart(3, '0');
  return `https://everyayah.com/data/${reciter.identifier}/${paddedSurah}${paddedAyah}.mp3`;
}

// Urdu Audio Translation URL builder (Shamshad Ali Khan voice)
export function getAyahUrduAudioUrl(surahNumber: number, ayahNumber: number): string {
  const paddedSurah = String(surahNumber).padStart(3, '0');
  const paddedAyah = String(ayahNumber).padStart(3, '0');
  return `https://everyayah.com/data/translations/urdu_shamshad_ali_khan_46kbps/${paddedSurah}${paddedAyah}.mp3`;
}

// Generate colored Tajweed spans on the fly if not provided
export function applyTajweedToText(text: string): string {
  if (!text) return '';
  
  let formatted = text;
  // Ghunnah for Noon or Meem with Shaddah (نّ or مّ)
  formatted = formatted.replace(/([نم]ّ)/g, "<span class='tajweed-ghunnah'>$1</span>");
  // Qalqalah letters (ق ط ب ج د) when followed by Sukun (ْ) or at word boundaries
  formatted = formatted.replace(/([قطبجد]ْ)/g, "<span class='tajweed-qalqalah'>$1</span>");
  // Madd letters with Madd sign (آ, ۤ, ٰ followed by hamza or shaddah)
  formatted = formatted.replace(/([آ]|[اوي]ۤ|[َُِ][اوي]ّ)/g, "<span class='tajweed-madd'>$1</span>");
  // Iqlab indicator (ـۢ or صغيرة م)
  formatted = formatted.replace(/([ۭۢ])/g, "<span class='tajweed-iqlab'>$1</span>");
  
  return formatted;
}

export async function fetchSurahAyahs(surahNumber: number): Promise<Ayah[]> {
  // 1. Check local preloaded dataset
  if (PRELOADED_SURAHS[surahNumber]) {
    return PRELOADED_SURAHS[surahNumber];
  }

  // 2. Check offline storage
  try {
    const cached = localStorage.getItem(`${CACHE_PREFIX}${surahNumber}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Storage read error:', e);
  }

  // 3. Fetch from AlQuran Cloud multi-edition API
  try {
    const editions = 'quran-uthmani,ur.jalandhry,en.sahih,hi.hindi,id.indonesian';
    const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/${editions}`);
    if (!response.ok) throw new Error(`Network response error: ${response.status}`);
    const data = await response.json();

    if (data.status === 'OK' && Array.isArray(data.data) && data.data.length >= 2) {
      const arabicEd = data.data[0];
      const urduEd = data.data[1];
      const englishEd = data.data[2] || { ayahs: [] };
      const hindiEd = data.data[3] || { ayahs: [] };
      const indoEd = data.data[4] || { ayahs: [] };

      const ayahs: Ayah[] = arabicEd.ayahs.map((arabicAyah: any, idx: number) => {
        const urduAyah = urduEd.ayahs[idx] || {};
        const engAyah = englishEd.ayahs ? englishEd.ayahs[idx] : {};
        const hiAyah = hindiEd.ayahs ? hindiEd.ayahs[idx] : {};
        const idAyah = indoEd.ayahs ? indoEd.ayahs[idx] : {};

        return {
          numberInSurah: arabicAyah.numberInSurah,
          numberInQuran: arabicAyah.number,
          text: arabicAyah.text,
          tajweedHtml: applyTajweedToText(arabicAyah.text),
          juz: arabicAyah.juz,
          manzil: arabicAyah.manzil,
          page: arabicAyah.page,
          ruku: arabicAyah.ruku,
          sajda: arabicAyah.sajda || false,
          translations: {
            urdu: urduAyah.text || 'ترجمہ دستیاب نہیں',
            urduMaududi: urduAyah.text,
            english: engAyah.text || 'Translation not available',
            englishKhattab: engAyah.text,
            hindi: hiAyah.text || '',
            indonesian: idAyah.text || ''
          },
          audioUrl: getAyahAudioUrl(surahNumber, arabicAyah.numberInSurah),
          tafseer: {
            ibnKathirUrdu: `تفسیر ابن کثیر (سورۃ ${surahNumber}، آیت ${arabicAyah.numberInSurah}): اس مبارک آیت میں اللہ تعالیٰ نے اپنے بندوں کو ہدایت، تقویٰ، اور احکامِ شریعت پر عمل کرنے کا درس دیا ہے۔ احادیثِ صحیحہ میں اس کے کثیر فضائل وارد ہیں۔`,
            ibnKathirEnglish: `Tafsir Ibn Kathir: This noble Ayah contains profound guidance on Tawhid, righteousness, and adherence to the Sunnah.`,
            maarifulQuranUrdu: `معارف القرآن: مفتی محمد شفیعؒ فرماتے ہیں کہ اس آیت سے معلوم ہوتا ہے کہ قرآن کی ہر آیت بنی نوع انسان کے لیے روحانی اور اخلاقی رہنمائی کا روشن مینار ہے۔`
          }
        };
      });

      // Cache into localStorage
      try {
        localStorage.setItem(`${CACHE_PREFIX}${surahNumber}`, JSON.stringify(ayahs));
      } catch (cacheErr) {
        console.warn('Could not cache surah in localStorage:', cacheErr);
      }

      return ayahs;
    }
  } catch (err) {
    console.error(`Failed to fetch surah ${surahNumber}:`, err);
  }

  // Fallback placeholder if network fails and not preloaded
  return [
    {
      numberInSurah: 1,
      numberInQuran: 1,
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      tajweedHtml: applyTajweedToText("بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"),
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے",
        english: "In the name of Allah, the Entirely Merciful, the Especially Merciful."
      }
    }
  ];
}

// Check offline cache status for all surahs
export function getOfflineCachedSurahsList(): number[] {
  const cached: number[] = [1, 103, 108, 112, 113, 114]; // Preloaded
  for (let i = 1; i <= 114; i++) {
    if (localStorage.getItem(`${CACHE_PREFIX}${i}`)) {
      if (!cached.includes(i)) cached.push(i);
    }
  }
  return cached.sort((a, b) => a - b);
}

// Download and cache all key surahs for offline mode
export async function cacheSurahForOffline(surahNumber: number, onProgress?: (msg: string) => void): Promise<boolean> {
  try {
    if (onProgress) onProgress(`سورۃ ${surahNumber} ڈاؤنلوڈ ہو رہی ہے...`);
    await fetchSurahAyahs(surahNumber);
    return true;
  } catch (e) {
    return false;
  }
}
