import React, { useState, useEffect } from 'react';
import { useQuran } from '../context/QuranContext';
import { 
  Play, 
  Pause, 
  Bookmark, 
  BookOpen, 
  Share2, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  Sparkles,
  Copy,
  Check,
  Languages,
  Book,
  Mic,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { SURAH_METADATA } from '../data/quranMetadata';

export const KitabMushafView: React.FC = () => {
  const {
    currentSurah,
    setCurrentSurahNumber,
    ayahs,
    loadingAyahs,
    currentAyahNumber,
    setCurrentAyahNumber,
    isPlaying,
    currentPlayingAyah,
    audioPhase,
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

  // Mode: 'paginated_kitab' (ورق گردانی صفحہ بہ صفحہ) vs 'continuous'
  const [pageViewMode, setPageViewMode] = useState<'paginated' | 'scroll'>('paginated');
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  // Ayahs per page for authentic Kitab experience (5-6 ayahs per page)
  const ayahsPerPage = settings.ayahsPerPage || 5;
  const totalPages = Math.max(1, Math.ceil(ayahs.length / ayahsPerPage));

  // Determine which page the currently active/playing ayah belongs to
  const activeAyahNum = currentPlayingAyah || currentAyahNumber || 1;
  const expectedPage = Math.floor((activeAyahNum - 1) / ayahsPerPage);

  // Synchronized Page Turning: "wesy he sath sath kitab k safhat bhe badlen"
  // When active Ayah changes into a new page, automatically turn the page!
  useEffect(() => {
    if (pageViewMode === 'paginated' && expectedPage !== currentPageIndex && expectedPage >= 0 && expectedPage < totalPages) {
      setCurrentPageIndex(expectedPage);
    }
  }, [activeAyahNum, expectedPage, pageViewMode, totalPages]);

  // Ayahs on current page
  const currentPaginatedAyahs = pageViewMode === 'paginated'
    ? ayahs.slice(currentPageIndex * ayahsPerPage, (currentPageIndex + 1) * ayahsPerPage)
    : ayahs;

  const handleNextPage = () => {
    if (currentPageIndex + 1 < totalPages) {
      setCurrentPageIndex(prev => prev + 1);
      const firstAyahOfNextPage = (currentPageIndex + 1) * ayahsPerPage + 1;
      setCurrentAyahNumber(firstAyahOfNextPage);
    } else if (currentSurah.number < 114) {
      setCurrentSurahNumber(currentSurah.number + 1);
      setCurrentPageIndex(0);
    }
  };

  const handlePrevPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
      const firstAyahOfPrevPage = (currentPageIndex - 1) * ayahsPerPage + 1;
      setCurrentAyahNumber(firstAyahOfPrevPage);
    } else if (currentSurah.number > 1) {
      setCurrentSurahNumber(currentSurah.number - 1);
      setCurrentPageIndex(0);
    }
  };

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
    const textToCopy = `${arabicText}\n\nترجمہ: ${urduTrans}\n[سُورَة ${currentSurah.urduName}، آیت ${ayahNum}]`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedAyah(ayahNum);
    showToast('آیت اور اردو ترجمہ کاپی ہو گیا ✓');
    setTimeout(() => setCopiedAyah(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-2 sm:px-4 py-3 sm:py-6 flex flex-col gap-5">
      {/* Top Banner: Juz, Page Info, Urdu Voice Translation Toggle & Page Mode */}
      <div 
        className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl border shadow-xs"
        style={{
          borderColor: '#b48324',
          backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fcf8ee'
        }}
      >
        {/* Left: Juz & Folio Page */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-950 dark:text-amber-100">
          <span className="font-['Amiri'] text-base text-amber-700 dark:text-amber-400 font-bold">
            الجُزْء {currentSurah.juzNumber}
          </span>
          <span className="text-amber-600/40">•</span>
          <span>مصحف صفحہ {currentSurah.pageNumber + currentPageIndex}</span>
          <span className="text-amber-600/40">•</span>
          <span className="px-2 py-0.5 rounded-md bg-amber-600/15 text-amber-900 dark:text-amber-200 font-medium">
            صفحہ {currentPageIndex + 1} از {totalPages}
          </span>
        </div>

        {/* Center: Audio Urdu Translation Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const newVal = !settings.playUrduAudioAfterArabic;
              updateSettings({ playUrduAudioAfterArabic: newVal });
              showToast(newVal ? 'تلاوت کے بعد اردو صوتی ترجمہ آن ہے 🎙️' : 'اردو صوتی ترجمہ بند کر دیا گیا');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-2xs ${
              settings.playUrduAudioAfterArabic
                ? 'bg-emerald-600 text-white border-emerald-600 ring-2 ring-emerald-500/30'
                : 'bg-amber-500/10 border-amber-600/30 text-amber-950 dark:text-amber-200'
            }`}
            title="آیت کی تلاوت کے فوراً بعد اس کا صوتی اردو ترجمہ سنیں"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>صوتی اردو ترجمہ: {settings.playUrduAudioAfterArabic ? 'فعال (آن)' : 'بند'}</span>
          </button>
        </div>

        {/* Right: Page Navigation Mode & Tajweed Switch */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-0.5 rounded-xl bg-amber-500/15 border border-amber-600/25 text-xs font-bold">
            <button
              onClick={() => setPageViewMode('paginated')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                pageViewMode === 'paginated'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-950 dark:text-amber-100 hover:bg-amber-500/20'
              }`}
              title="کتاب کی طرح صفحہ بہ صفحہ ورق گردانی"
            >
              صفحہ بہ صفحہ
            </button>
            <button
              onClick={() => setPageViewMode('scroll')}
              className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                pageViewMode === 'scroll'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-amber-950 dark:text-amber-100 hover:bg-amber-500/20'
              }`}
              title="تمام آیات کا مسلسل مطالعہ"
            >
              پورا مصحف
            </button>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer select-none text-xs font-bold text-amber-950 dark:text-amber-100">
            <input
              type="checkbox"
              checked={settings.showTajweedColors}
              onChange={(e) => updateSettings({ showTajweedColors: e.target.checked })}
              className="accent-amber-600 w-4 h-4 rounded cursor-pointer"
            />
            <span>تجوید</span>
          </label>
        </div>
      </div>

      {/* Real-time Recitation & Translation Banner when playing */}
      {isPlaying && currentPlayingAyah && (
        <div className="px-4 py-2.5 rounded-2xl bg-amber-600/10 border-2 border-amber-600/30 flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-600 animate-ping"></span>
            <span className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-100 font-['Amiri']">
              {audioPhase === 'arabic' ? (
                <>🔊 عربی تلاوت جاری ہے: سُورَة {currentSurah.urduName} • آیت {currentPlayingAyah}</>
              ) : (
                <>🎙️ اردو صوتی ترجمہ جاری ہے: آیت {currentPlayingAyah} (شمشاد علی خان)</>
              )}
            </span>
          </div>

          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-600 text-white">
            صفحہ {currentPageIndex + 1}
          </span>
        </div>
      )}

      {/* The Authentic Open Kitab / Mushaf Page Container */}
      <div 
        className="relative rounded-3xl p-3 sm:p-8 sm:px-10 book-spine-shadow border-2 transition-all duration-300"
        style={{
          borderColor: '#b48324',
          backgroundColor: 
            settings.theme === 'parchment' ? '#faf6ec' :
            settings.theme === 'emerald' ? '#03211a' :
            settings.theme === 'dark' ? '#0b0f17' :
            settings.theme === 'royal' ? '#080f22' : '#f3ebd7'
        }}
      >
        {/* Ornate Islamic Gold Double Border Frame */}
        <div className="absolute inset-2 sm:inset-4 pointer-events-none rounded-2xl border border-amber-600/50 outline outline-1 outline-amber-600/30 outline-offset-3"></div>

        {/* Corner Arabesque Geometric Accents */}
        <div className="absolute top-3 left-3 text-amber-600 font-serif text-lg pointer-events-none select-none">✤</div>
        <div className="absolute top-3 right-3 text-amber-600 font-serif text-lg pointer-events-none select-none">✤</div>
        <div className="absolute bottom-3 left-3 text-amber-600 font-serif text-lg pointer-events-none select-none">✤</div>
        <div className="absolute bottom-3 right-3 text-amber-600 font-serif text-lg pointer-events-none select-none">✤</div>

        {/* Surah Header Cartouche (Only on first page of Surah or continuous mode) */}
        {currentPageIndex === 0 && (
          <div className="relative my-3 sm:my-5 mx-auto max-w-xl text-center">
            <div className="relative py-4 px-6 rounded-2xl border-2 border-amber-600/70 bg-gradient-to-r from-amber-600/15 via-amber-500/25 to-amber-600/15 shadow-inner">
              <div className="text-amber-700 dark:text-amber-300 text-xs tracking-widest uppercase font-bold mb-1">
                سُورَةُ {currentSurah.name} • {currentSurah.englishName}
              </div>
              
              <h1 className="text-3xl sm:text-5xl font-bold font-['Amiri'] text-amber-950 dark:text-amber-50 tracking-wide">
                سُورَةُ {currentSurah.name}
              </h1>

              <div className="mt-2 flex items-center justify-center gap-3 text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-bold">
                <span>{currentSurah.urduName} ({currentSurah.urduMeaning})</span>
                <span>•</span>
                <span>{currentSurah.revelationTypeUrdu}</span>
                <span>•</span>
                <span>{currentSurah.numberOfAyahs} آیات</span>
                <span>•</span>
                <span>{currentSurah.rukus} رکوع</span>
              </div>
            </div>

            {/* Bismillah Banner (Except Surah At-Tawbah 9) */}
            {currentSurah.number !== 9 && (
              <div className="text-center my-5 sm:my-6">
                <div 
                  className="text-2xl sm:text-4xl font-['Amiri'] font-bold text-amber-950 dark:text-amber-50 tracking-wider"
                  style={{ fontFamily: "'Amiri Quran', 'Amiri', serif" }}
                >
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </div>
                <div className="text-sm text-neutral-800 dark:text-neutral-200 mt-1 font-['Noto_Nastaliq_Urdu'] font-medium">
                  شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے
                </div>
                <div className="flex items-center justify-center gap-2 mt-2 text-amber-600/50">
                  <span className="w-16 h-px bg-amber-600/40"></span>
                  <span className="text-base">۝</span>
                  <span className="w-16 h-px bg-amber-600/40"></span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Page Folio Header if on subsequent pages */}
        {currentPageIndex > 0 && pageViewMode === 'paginated' && (
          <div className="text-center pb-3 mb-4 border-b border-amber-600/20 text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-bold">
            <span>سُورَة {currentSurah.urduName} ({currentSurah.name}) • صفحہ {currentPageIndex + 1} از {totalPages}</span>
          </div>
        )}

        {/* Loading Spinner */}
        {loadingAyahs && (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
            <div className="w-12 h-12 border-3 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-base text-neutral-800 dark:text-neutral-200 font-['Noto_Nastaliq_Urdu']">
              قرآنِ کریم کی آیات اور ترجمہ لوڈ ہو رہا ہے...
            </p>
          </div>
        )}

        {/* AYAH LIST: Verse with Urdu Translation right after each verse */}
        {!loadingAyahs && (
          <div className="flex flex-col gap-4 sm:gap-6 my-2">
            {currentPaginatedAyahs.map((ayah) => {
              const isPlayingThis = isPlaying && currentPlayingAyah === ayah.numberInSurah;
              const isSelected = currentAyahNumber === ayah.numberInSurah;
              const isBookmarked = isAyahBookmarked(ayah.numberInSurah);

              return (
                <div
                  key={ayah.numberInSurah}
                  id={`kitab-ayah-${ayah.numberInSurah}`}
                  onClick={() => setCurrentAyahNumber(ayah.numberInSurah)}
                  className={`ayah-verse-card rounded-2xl p-4 sm:p-6 border-2 transition-all ${
                    isPlayingThis
                      ? audioPhase === 'urdu'
                        ? 'border-emerald-500 ring-4 ring-emerald-500/30 bg-emerald-500/10 shadow-lg'
                        : 'border-amber-500 ring-4 ring-amber-500/30 bg-amber-500/10 shadow-lg'
                      : isSelected
                      ? 'border-amber-600/50 bg-amber-500/5 shadow-xs'
                      : 'border-amber-600/20 bg-white/70 dark:bg-neutral-900/40 hover:border-amber-600/40'
                  }`}
                >
                  {/* Ayah Header Bar: Number + Action Buttons */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-600/15">
                    {/* Verse Badge */}
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        {currentSurah.number}:{ayah.numberInSurah}
                      </span>
                      <span className="text-xs font-bold text-amber-900 dark:text-amber-200 font-['Amiri']">
                        آیت {ayah.numberInSurah} • الجزء {ayah.juz}
                      </span>

                      {/* Live Phase Tag */}
                      {isPlayingThis && (
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          audioPhase === 'urdu'
                            ? 'bg-emerald-600 text-white animate-pulse'
                            : 'bg-amber-600 text-white animate-pulse'
                        }`}>
                          {audioPhase === 'urdu' ? '🎙️ اردو صوتی ترجمہ' : '🔊 عربی تلاوت'}
                        </span>
                      )}
                    </div>

                    {/* Quick Tools */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {/* Play Arabic Audio */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isPlayingThis && audioPhase === 'arabic') togglePlayPause();
                          else playAyah(ayah.numberInSurah, 'arabic');
                        }}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                          isPlayingThis && audioPhase === 'arabic'
                            ? 'bg-amber-600 text-white animate-pulse'
                            : 'border border-amber-600/30 text-amber-950 dark:text-amber-100 hover:bg-amber-500/15'
                        }`}
                        title="عربی تلاوت سنیں"
                      >
                        {isPlayingThis && audioPhase === 'arabic' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                        <span className="hidden sm:inline">عربی تلاوت</span>
                      </button>

                      {/* Play Urdu Voice Audio */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isPlayingThis && audioPhase === 'urdu') togglePlayPause();
                          else playAyah(ayah.numberInSurah, 'urdu');
                        }}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition ${
                          isPlayingThis && audioPhase === 'urdu'
                            ? 'bg-emerald-600 text-white animate-pulse'
                            : 'border border-emerald-600/40 text-emerald-900 dark:text-emerald-200 hover:bg-emerald-500/15'
                        }`}
                        title="صوتی اردو ترجمہ سنیں (شمشاد علی خان)"
                      >
                        <Mic className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">اردو آواز</span>
                      </button>

                      {/* Bookmark */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(ayah);
                        }}
                        className={`p-1.5 rounded-lg border text-xs cursor-pointer transition ${
                          isBookmarked
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'border-amber-600/30 text-amber-950 dark:text-amber-100 hover:bg-amber-500/15'
                        }`}
                        title="بک مارک کریں"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>

                      {/* Tafseer */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setTafseerModalAyah(ayah);
                        }}
                        className="flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-amber-600/30 text-amber-950 dark:text-amber-100 hover:bg-amber-500/15 text-xs font-semibold cursor-pointer"
                        title="تفسیر ابن کثیر و معارف القرآن"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                        <span className="hidden sm:inline">تفسیر</span>
                      </button>

                      {/* Copy */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyAyah(ayah.text, ayah.translations.urdu, ayah.numberInSurah);
                        }}
                        className="p-1.5 rounded-lg border border-amber-600/30 text-amber-950 dark:text-amber-100 hover:bg-amber-500/15 text-xs cursor-pointer"
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setShareCardAyah(ayah);
                        }}
                        className="p-1.5 rounded-lg border border-amber-600/30 text-amber-950 dark:text-amber-100 hover:bg-amber-500/15 text-xs cursor-pointer"
                        title="قرآنی کارڈ بنائیں"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* 1. ARABIC AYAH TEXT */}
                  <div 
                    dir="rtl"
                    className="text-right leading-[2.6] sm:leading-[3.0] transition-all my-2 font-bold select-all"
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
                      <span className="text-neutral-950 dark:text-neutral-50">
                        {ayah.text}
                      </span>
                    )}

                    {/* Ornate End-of-Ayah Calligraphic Circle ۝ */}
                    <span 
                      className="inline-flex items-center justify-center mx-2 align-middle select-none text-amber-600 dark:text-amber-400"
                      style={{ fontSize: '0.85em' }}
                    >
                      <span className="relative inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-amber-600 bg-amber-500/15 shadow-xs">
                        <span className="text-xs font-sans font-bold text-amber-950 dark:text-amber-100">
                          {ayah.numberInSurah}
                        </span>
                      </span>
                    </span>
                  </div>

                  {/* 2. URDU TRANSLATION RIGHT AFTER THE AYAH */}
                  <div 
                    dir="rtl"
                    className={`mt-3 pt-3 border-t-2 border-amber-600/20 p-3.5 sm:p-4 rounded-xl border-r-4 text-right transition-colors ${
                      isPlayingThis && audioPhase === 'urdu'
                        ? 'bg-emerald-500/15 border-r-emerald-600 shadow-md ring-2 ring-emerald-500/40'
                        : 'bg-amber-500/5 dark:bg-neutral-800/60 border-r-amber-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 font-['Amiri'] flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${isPlayingThis && audioPhase === 'urdu' ? 'bg-emerald-600 animate-ping' : 'bg-emerald-600'} inline-block`}></span>
                        اردو ترجمہ (مولانا فتح محمد جالندھری):
                      </span>
                      <span className="text-[11px] font-sans text-amber-800/80 dark:text-amber-300/80">
                        آیت {ayah.numberInSurah}
                      </span>
                    </div>

                    <p 
                      className="text-neutral-950 dark:text-neutral-50 font-['Noto_Nastaliq_Urdu'] leading-[2.4] font-medium"
                      style={{ fontSize: `${settings.translationFontSize + 2}px` }}
                    >
                      {ayah.translations.urdu}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Realistic Kitab Page Turn Controls: "wesy he sath sath kitab k safhat bhe badlen" */}
        {pageViewMode === 'paginated' && (
          <div className="mt-8 pt-4 border-t-2 border-amber-600/25 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-amber-950 dark:text-amber-200 font-bold">
            {/* Previous Page Button */}
            <button
              onClick={handlePrevPage}
              disabled={currentPageIndex === 0 && currentSurah.number <= 1}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-amber-600/40 bg-amber-500/10 hover:bg-amber-500/20 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition shadow-2xs"
            >
              <ChevronRight className="w-4 h-4" />
              <span>
                {currentPageIndex > 0 ? `پچھلا صفحہ (${currentPageIndex})` : 'پچھلی سورت'}
              </span>
            </button>

            {/* Page Jump Dots / Selector */}
            <div className="flex items-center gap-1 max-w-[200px] overflow-x-auto py-1 scrollbar-none">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPageIndex(idx);
                    setCurrentAyahNumber(idx * ayahsPerPage + 1);
                  }}
                  className={`w-7 h-7 rounded-lg text-xs font-bold transition cursor-pointer flex items-center justify-center ${
                    currentPageIndex === idx
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'border border-amber-600/30 text-amber-900 dark:text-amber-200 hover:bg-amber-500/15'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Next Page Button */}
            <button
              onClick={handleNextPage}
              disabled={currentPageIndex + 1 >= totalPages && currentSurah.number >= 114}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-amber-600/40 bg-amber-500/10 hover:bg-amber-500/20 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition shadow-2xs"
            >
              <span>
                {currentPageIndex + 1 < totalPages ? `اگلا صفحہ (${currentPageIndex + 2})` : 'اگلی سورت'}
              </span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
