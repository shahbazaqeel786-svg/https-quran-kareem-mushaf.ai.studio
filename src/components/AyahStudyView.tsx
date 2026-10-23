import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { 
  Play, 
  Pause, 
  Bookmark, 
  BookOpen, 
  Share2, 
  Volume2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  Copy,
  Check
} from 'lucide-react';

export const AyahStudyView: React.FC = () => {
  const {
    currentSurah,
    ayahs,
    loadingAyahs,
    currentAyahNumber,
    setCurrentAyahNumber,
    isPlaying,
    currentPlayingAyah,
    playAyah,
    togglePlayPause,
    toggleBookmark,
    isAyahBookmarked,
    setTafseerModalAyah,
    setShareCardAyah,
    settings,
    updateSettings,
    showToast
  } = useQuran();

  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);
  const [expandedTafseerAyah, setExpandedTafseerAyah] = useState<number | null>(null);

  const getArabicFontFamily = () => {
    switch (settings.arabicFont) {
      case 'amiri': return "'Amiri Quran', 'Amiri', serif";
      case 'naskh': return "'Noto Naskh Arabic', serif";
      case 'scheherazade': return "'Scheherazade New', serif";
      case 'nastaliq': return "'Noto Nastaliq Urdu', serif";
      default: return "'Amiri Quran', 'Amiri', serif";
    }
  };

  const handleCopyAyah = (arabicText: string, urduTrans: string, ayahNum: number) => {
    const textToCopy = `${arabicText}\n\nترجمہ: ${urduTrans}\n[سورۃ ${currentSurah.urduName}، آیت ${ayahNum}]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(ayahNum);
    showToast('آیت مبارکہ اور ترجمہ کاپی ہو گیا');
    setTimeout(() => setCopiedAyah(null), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 py-4 flex flex-col gap-4">
      {/* Surah Header Card */}
      <div 
        className="rounded-2xl p-5 border shadow-sm text-center"
        style={{
          borderColor: '#b48324',
          backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fcf8ee'
        }}
      >
        <span className="text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
          سورۃ {currentSurah.englishName} ({currentSurah.englishNameTranslation})
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold font-['Amiri'] text-amber-900 dark:text-amber-100 my-1">
          سُورَةُ {currentSurah.name}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-['Noto_Nastaliq_Urdu']">
          {currentSurah.urduName} • {currentSurah.urduMeaning} • {currentSurah.revelationTypeUrdu} • {currentSurah.numberOfAyahs} آیات
        </p>

        {/* Word-by-word and Tajweed quick switches */}
        <div className="mt-4 pt-3 border-t border-amber-600/20 flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-amber-900 dark:text-amber-200">
          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={settings.showTajweedColors}
              onChange={(e) => updateSettings({ showTajweedColors: e.target.checked })}
              className="accent-amber-600 w-3.5 h-3.5 rounded"
            />
            <span>تجوید کلر کوڈ</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={settings.showWordByWord}
              onChange={(e) => updateSettings({ showWordByWord: e.target.checked })}
              className="accent-amber-600 w-3.5 h-3.5 rounded"
            />
            <span>لفظ بہ لفظ ترجمہ</span>
          </label>
        </div>
      </div>

      {/* Loading state */}
      {loadingAyahs && (
        <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
          <div className="w-10 h-10 border-3 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-amber-800 dark:text-amber-200 font-['Noto_Nastaliq_Urdu']">
            آیات لوڈ ہو رہی ہیں...
          </p>
        </div>
      )}

      {/* Ayahs List */}
      {!loadingAyahs && ayahs.map((ayah) => {
        const isPlayingThis = isPlaying && currentPlayingAyah === ayah.numberInSurah;
        const isSelected = currentAyahNumber === ayah.numberInSurah;
        const isBookmarked = isAyahBookmarked(ayah.numberInSurah);
        const isTafseerExpanded = expandedTafseerAyah === ayah.numberInSurah;

        return (
          <div
            key={ayah.numberInSurah}
            id={`study-ayah-${ayah.numberInSurah}`}
            className={`rounded-2xl p-4 sm:p-6 border transition-all duration-300 ${
              isPlayingThis
                ? 'ring-2 ring-amber-500 shadow-md'
                : isSelected
                ? 'border-amber-600/40 shadow-xs'
                : 'border-amber-600/20 hover:border-amber-600/35'
            }`}
            style={{
              backgroundColor: 
                settings.theme === 'dark' ? '#111620' :
                settings.theme === 'emerald' ? '#063529' :
                settings.theme === 'royal' ? '#0e1a38' : '#fffdf9'
            }}
          >
            {/* Ayah Top Meta Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-amber-600/15">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                  {currentSurah.number}:{ayah.numberInSurah}
                </span>
                <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 font-['Amiri']">
                  الجزء {ayah.juz} • الحزب
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Play Audio */}
                <button
                  onClick={() => {
                    if (isPlayingThis) togglePlayPause();
                    else playAyah(ayah.numberInSurah);
                  }}
                  className={`p-2 rounded-lg text-xs font-medium cursor-pointer transition ${
                    isPlayingThis
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'border border-amber-600/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10'
                  }`}
                  title="تلاوت سنیں"
                >
                  {isPlayingThis ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                {/* Bookmark */}
                <button
                  onClick={() => toggleBookmark(ayah)}
                  className={`p-2 rounded-lg border text-xs cursor-pointer transition ${
                    isBookmarked
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'border-amber-600/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10'
                  }`}
                  title="بک مارک کریں"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                {/* Authentic Tafseer Modal */}
                <button
                  onClick={() => setTafseerModalAyah(ayah)}
                  className="p-2 rounded-lg border border-amber-600/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10 text-xs cursor-pointer transition"
                  title="مکمل تفسیر ابن کثیر و معارف القرآن"
                >
                  <BookOpen className="w-4 h-4" />
                </button>

                {/* Copy Ayah */}
                <button
                  onClick={() => handleCopyAyah(ayah.text, ayah.translations.urdu, ayah.numberInSurah)}
                  className="p-2 rounded-lg border border-amber-600/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10 text-xs cursor-pointer transition"
                  title="کاپی کریں"
                >
                  {copiedAyah === ayah.numberInSurah ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                {/* Share Card */}
                <button
                  onClick={() => setShareCardAyah(ayah)}
                  className="p-2 rounded-lg border border-amber-600/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10 text-xs cursor-pointer transition"
                  title="تصویر اور کارڈ بنائیں"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Arabic Text */}
            <div 
              dir="rtl"
              className="text-right leading-[2.6] sm:leading-[3.0] mb-4 transition-all font-bold select-all"
              style={{
                fontFamily: getArabicFontFamily(),
                fontSize: `${settings.arabicFontSize}px`
              }}
            >
              {settings.showTajweedColors && ayah.tajweedHtml ? (
                <span 
                  dangerouslySetInnerHTML={{ __html: ayah.tajweedHtml }} 
                  className="text-neutral-950 dark:text-neutral-50"
                />
              ) : (
                <span className="text-neutral-950 dark:text-neutral-50">{ayah.text}</span>
              )}
            </div>

            {/* Optional Word-by-Word Breakdown */}
            {settings.showWordByWord && ayah.words && ayah.words.length > 0 && (
              <div 
                dir="rtl"
                className="my-4 p-3 rounded-xl bg-amber-500/10 dark:bg-neutral-800/50 border border-amber-600/20 flex flex-wrap gap-2.5 justify-start"
              >
                {ayah.words.map((w) => (
                  <div 
                    key={w.id} 
                    className="flex flex-col items-center bg-white dark:bg-neutral-900 px-3 py-2 rounded-xl border border-amber-600/30 shadow-xs text-center min-w-[75px]"
                  >
                    <span className="text-lg sm:text-xl font-['Amiri'] font-bold text-amber-950 dark:text-amber-100">
                      {w.arabic}
                    </span>
                    <span className="text-xs text-emerald-800 dark:text-emerald-300 font-['Noto_Nastaliq_Urdu'] font-bold mt-1">
                      {w.urdu}
                    </span>
                    <span className="text-[10px] text-neutral-600 dark:text-neutral-300 font-sans font-semibold">
                      {w.english}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Translations Section - Prominent High-Contrast Urdu Translation */}
            <div className="flex flex-col gap-3 pt-2">
              {/* Urdu Translation */}
              <div 
                dir="rtl"
                className="p-3.5 sm:p-4 rounded-xl bg-amber-500/10 dark:bg-neutral-800/60 border border-amber-600/25 border-r-4 border-r-emerald-600 text-right"
              >
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block mb-1 font-['Amiri']">
                  اردو ترجمہ (مولانا فتح محمد جالندھری):
                </span>
                <p 
                  className="text-neutral-950 dark:text-neutral-50 font-['Noto_Nastaliq_Urdu'] leading-[2.4] font-medium"
                  style={{ fontSize: `${settings.translationFontSize + 2}px` }}
                >
                  {ayah.translations.urdu}
                </p>
              </div>

              {/* English Translation */}
              {settings.activeLanguages.includes('english') && ayah.translations.english && (
                <div className="text-left pt-2 border-t border-amber-600/10">
                  <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-400 block mb-0.5">
                    English Translation (Sahih International):
                  </span>
                  <p 
                    className="text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed"
                    style={{ fontSize: `${settings.translationFontSize}px` }}
                  >
                    {ayah.translations.english}
                  </p>
                </div>
              )}

              {/* Tafseer quick toggle snippet */}
              {ayah.tafseer?.ibnKathirUrdu && (
                <div className="pt-2">
                  <button
                    onClick={() => setExpandedTafseerAyah(isTafseerExpanded ? null : ayah.numberInSurah)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>تفسیر ابن کثیر کا خلاصہ {isTafseerExpanded ? 'بند کریں' : 'دیکھیں'}</span>
                    {isTafseerExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isTafseerExpanded && (
                    <div 
                      dir="rtl"
                      className="mt-2 p-3.5 rounded-xl bg-amber-500/10 border border-amber-600/20 text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 font-['Noto_Nastaliq_Urdu'] leading-relaxed"
                    >
                      <p className="font-semibold text-amber-900 dark:text-amber-200 mb-1">
                        تفسیر ابن کثیر رحمہ اللہ:
                      </p>
                      <p>{ayah.tafseer.ibnKathirUrdu}</p>
                      {ayah.tafseer.maarifulQuranUrdu && (
                        <p className="mt-2 pt-2 border-t border-amber-600/20">
                          <strong>معارف القرآن:</strong> {ayah.tafseer.maarifulQuranUrdu}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
