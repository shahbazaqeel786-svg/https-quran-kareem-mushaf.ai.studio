import React, { useState, useMemo } from 'react';
import { useQuran } from '../context/QuranContext';
import { SURAH_METADATA } from '../data/quranMetadata';
import { PRELOADED_SURAHS } from '../data/quranAyahs';
import { Search, X, BookOpen, ArrowUpRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const {
    searchModalOpen,
    setSearchModalOpen,
    jumpToSurahAndAyah,
    settings
  } = useQuran();

  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'surahs' | 'ayahs'>('all');

  const popularKeywords = [
    { label: 'آیت الکرسی', query: '2:255' },
    { label: 'سورۃ یٰسٓ', query: '36' },
    { label: 'سورۃ الرحمٰن', query: '55' },
    { label: 'سورۃ الملک', query: '67' },
    { label: 'صبر و استقامت', query: 'صبر' },
    { label: 'رحمتِ الٰہی', query: 'رحمت' },
    { label: 'توبہ و مغفرت', query: 'مغفرت' },
    { label: 'Peace / سلام', query: 'peace' }
  ];

  // Search logic across Surahs and Ayahs
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { surahs: [], ayahs: [] };

    // Check if query is in format "surah:ayah" like "2:255" or "1:1"
    const matchSurahAyah = q.match(/^(\d+):(\d+)$/);
    if (matchSurahAyah) {
      const sNum = parseInt(matchSurahAyah[1]);
      const aNum = parseInt(matchSurahAyah[2]);
      const surah = SURAH_METADATA.find(s => s.number === sNum);
      if (surah && aNum <= surah.numberOfAyahs) {
        return {
          surahs: [],
          ayahs: [
            {
              surahNumber: sNum,
              ayahNumber: aNum,
              surahName: surah.urduName,
              arabicText: `انتقال برائے سورۃ ${surah.urduName}، آیت ${aNum}`,
              translation: `مستقیم رسائی: پارہ ${surah.juzNumber}، صفحہ ${surah.pageNumber}`
            }
          ]
        };
      }
    }

    // 1. Search Surahs
    const matchedSurahs = SURAH_METADATA.filter(s => 
      s.urduName.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.englishName.toLowerCase().includes(q) ||
      s.englishNameTranslation.toLowerCase().includes(q) ||
      String(s.number) === q
    );

    // 2. Search in preloaded ayahs and local datasets
    const matchedAyahs: Array<{
      surahNumber: number;
      ayahNumber: number;
      surahName: string;
      arabicText: string;
      translation: string;
    }> = [];

    Object.entries(PRELOADED_SURAHS).forEach(([sNumStr, ayahsList]) => {
      const sNum = parseInt(sNumStr);
      const surahMeta = SURAH_METADATA.find(s => s.number === sNum);
      if (!surahMeta) return;

      ayahsList.forEach(a => {
        const inArabic = a.text.includes(q);
        const inUrdu = a.translations.urdu.toLowerCase().includes(q);
        const inEng = a.translations.english.toLowerCase().includes(q);

        if (inArabic || inUrdu || inEng) {
          matchedAyahs.push({
            surahNumber: sNum,
            ayahNumber: a.numberInSurah,
            surahName: surahMeta.urduName,
            arabicText: a.text,
            translation: a.translations.urdu
          });
        }
      });
    });

    return {
      surahs: matchedSurahs,
      ayahs: matchedAyahs
    };
  }, [query]);

  if (!searchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[85vh] rounded-2xl border-2 shadow-2xl flex flex-col overflow-hidden transition-all"
        style={{
          borderColor: '#b48324',
          backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fdfaf4'
        }}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-4 border-b border-amber-600/20 flex items-center gap-3">
          <Search className="w-5 h-5 text-amber-600" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="قرآن کریم، سورۃ کا نام، اردو یا انگریزی ترجمہ تلاش کریں (مثلاً 2:255 یا صبر)..."
            autoFocus
            className="w-full bg-transparent text-sm sm:text-base font-medium text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="p-1.5 rounded-lg border border-amber-600/30 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer text-xs"
          >
            بند کریں (ESC)
          </button>
        </div>

        {/* Popular Keyword Suggestions */}
        <div className="px-4 py-2 border-b border-amber-600/10 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
          <span className="text-amber-700 dark:text-amber-300 font-semibold flex items-center gap-1 shrink-0">
            <Sparkles className="w-3 h-3" />
            فوری تلاش:
          </span>
          {popularKeywords.map((k) => (
            <button
              key={k.label}
              onClick={() => setQuery(k.query)}
              className="px-2.5 py-1 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-neutral-800 dark:text-neutral-200 whitespace-nowrap cursor-pointer transition"
            >
              {k.label}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!query.trim() && (
            <div className="py-12 text-center text-neutral-500 dark:text-neutral-400">
              <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40 text-amber-600" />
              <p className="font-['Noto_Nastaliq_Urdu'] text-sm">
                کسی بھی سورت کا نام، آیت نمبر (مثلاً 2:255)، یا اردو و انگریزی الفاظ لکھیں
              </p>
            </div>
          )}

          {query.trim() && searchResults.surahs.length === 0 && searchResults.ayahs.length === 0 && (
            <div className="py-12 text-center text-neutral-500 dark:text-neutral-400">
              <p className="font-['Noto_Nastaliq_Urdu'] text-base">
                "{query}" کے متعلق کوئی نتیجہ نہیں ملا۔ دوسرا لفظ آزمائیں۔
              </p>
            </div>
          )}

          {/* Surahs Matches */}
          {searchResults.surahs.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2 font-['Amiri']">
                مطابقت رکھنے والی سورتیں ({searchResults.surahs.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {searchResults.surahs.map((s) => (
                  <button
                    key={s.number}
                    onClick={() => {
                      jumpToSurahAndAyah(s.number, 1);
                      setSearchModalOpen(false);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl border border-amber-600/20 bg-amber-500/5 hover:bg-amber-500/15 text-right transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-full bg-amber-600/20 text-amber-900 dark:text-amber-200 text-xs font-bold flex items-center justify-center">
                        {s.number}
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 font-['Amiri']">
                          سُورَة {s.urduName} ({s.name})
                        </div>
                        <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
                          {s.englishName} • {s.numberOfAyahs} آیات
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-amber-600" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Ayahs Matches */}
          {searchResults.ayahs.length > 0 && (
            <div className="mt-4">
              <h3 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-2 font-['Amiri']">
                مطابقت رکھنے والی آیاتِ مبارکہ ({searchResults.ayahs.length})
              </h3>
              <div className="space-y-2.5">
                {searchResults.ayahs.map((a, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      jumpToSurahAndAyah(a.surahNumber, a.ayahNumber);
                      setSearchModalOpen(false);
                    }}
                    className="w-full text-right p-3.5 rounded-xl border border-amber-600/20 bg-amber-500/5 hover:bg-amber-500/15 transition cursor-pointer flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-semibold text-amber-800 dark:text-amber-300">
                        سُورَة {a.surahName} • آیت {a.ayahNumber}
                      </span>
                      <span className="text-[11px] text-amber-600 underline">
                        کھولیں →
                      </span>
                    </div>
                    <p 
                      dir="rtl"
                      className="text-sm sm:text-base font-['Amiri'] font-semibold text-neutral-900 dark:text-neutral-100 leading-relaxed"
                    >
                      {a.arabicText}
                    </p>
                    <p 
                      dir="rtl"
                      className="text-xs text-neutral-600 dark:text-neutral-300 font-['Noto_Nastaliq_Urdu'] leading-relaxed"
                    >
                      {a.translation}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
