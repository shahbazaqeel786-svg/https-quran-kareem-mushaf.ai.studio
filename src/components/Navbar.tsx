import React from 'react';
import { useQuran } from '../context/QuranContext';
import { SURAH_METADATA } from '../data/quranMetadata';
import { 
  BookOpen, 
  Search, 
  Sparkles, 
  Sliders, 
  Bookmark, 
  Heart, 
  HelpCircle, 
  Users, 
  User, 
  Moon, 
  Sun, 
  Palette, 
  Volume2, 
  Wifi, 
  WifiOff, 
  BookMarked,
  Book
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentSurah,
    setCurrentSurahNumber,
    currentAyahNumber,
    setCurrentAyahNumber,
    activeTab,
    setActiveTab,
    readerMode,
    setReaderMode,
    setSearchModalOpen,
    setTajweedModalOpen,
    setSettingsModalOpen,
    settings,
    updateSettings,
    isOffline,
    isPlaying,
    stopAudio
  } = useQuran();

  const themes: Array<{ id: typeof settings.theme; label: string; iconColor: string }> = [
    { id: 'parchment', label: 'ورق قدیم (Parchment)', iconColor: '#b48324' },
    { id: 'emerald', label: 'زمرد مدینہ (Emerald)', iconColor: '#059669' },
    { id: 'dark', label: 'تہجد نائٹ (Midnight)', iconColor: '#6366f1' },
    { id: 'royal', label: 'شاہی نیلا (Royal)', iconColor: '#0284c7' },
    { id: 'sepia', label: 'قدیم نسخہ (Sepia)', iconColor: '#d97706' }
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 shadow-sm"
      style={{
        borderColor: settings.theme === 'dark' ? '#1f2937' : settings.theme === 'emerald' ? '#064e3b' : '#e5e0d3',
        backgroundColor: settings.theme === 'dark' ? 'rgba(13, 17, 23, 0.95)' : settings.theme === 'emerald' ? 'rgba(4, 36, 29, 0.96)' : 'rgba(253, 250, 243, 0.96)'
      }}
    >
      {/* Top Banner: App Title, Quick Jump & Action Buttons */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2">
        {/* Left / Logo: Kitab Icon & Title */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('quran')}
            className="flex items-center gap-2 group text-right cursor-pointer"
            title="القرآن الكريم - صفحہ اول"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-600/30 flex items-center justify-center text-amber-700 dark:text-amber-300 shadow-inner group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-['Amiri'] tracking-wide text-amber-900 dark:text-amber-100 leading-tight">
                القرآن الكريم
              </div>
              <div className="text-[10px] sm:text-xs text-amber-800/70 dark:text-amber-200/70 font-sans font-medium">
                Mushaf Kitab • التجوید والترجمہ
              </div>
            </div>
          </button>

          {/* Offline / Online Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border border-amber-500/20 bg-amber-500/5 text-amber-800 dark:text-amber-200">
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-rose-500" />
                <span>آف لائن موڈ</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>آن لائن ذخیرہ</span>
              </>
            )}
          </div>
        </div>

        {/* Center: Surah Selector & Ayah Quick Jump */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Surah Dropdown */}
          <div className="relative">
            <select
              value={currentSurah.number}
              onChange={(e) => setCurrentSurahNumber(Number(e.target.value))}
              aria-label="منتخب سورت"
              className="appearance-none pl-3 pr-8 py-1.5 rounded-lg text-sm font-medium border border-amber-600/30 bg-amber-500/5 hover:bg-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-500 text-neutral-800 dark:text-neutral-100 cursor-pointer shadow-xs transition"
            >
              {SURAH_METADATA.map((s) => (
                <option key={s.number} value={s.number} className="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                  {s.number}. {s.urduName} ({s.name})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-amber-700 dark:text-amber-300 text-xs">
              ▼
            </div>
          </div>

          {/* Ayah Dropdown */}
          <div className="relative">
            <select
              value={currentAyahNumber}
              onChange={(e) => setCurrentAyahNumber(Number(e.target.value))}
              aria-label="آیت نمبر"
              className="appearance-none pl-2.5 pr-6 py-1.5 rounded-lg text-sm font-medium border border-amber-600/30 bg-amber-500/5 hover:bg-amber-500/10 focus:outline-none focus:ring-2 focus:ring-amber-500 text-neutral-800 dark:text-neutral-100 cursor-pointer shadow-xs transition"
            >
              {Array.from({ length: currentSurah.numberOfAyahs }, (_, i) => i + 1).map((aNum) => (
                <option key={aNum} value={aNum} className="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                  آیت {aNum}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-amber-700 dark:text-amber-300 text-xs">
              ▼
            </div>
          </div>

          {/* Reader Mode Toggle (Kitab open book vs Ayah Study list) */}
          {activeTab === 'quran' && (
            <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-amber-500/10 border border-amber-600/20 text-xs font-medium">
              <button
                onClick={() => setReaderMode('kitab')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  readerMode === 'kitab'
                    ? 'bg-amber-600 text-white shadow-xs font-semibold'
                    : 'text-amber-900 dark:text-amber-200 hover:bg-amber-500/20'
                }`}
                title="کتابی مصحف انداز"
              >
                <Book className="w-3.5 h-3.5" />
                <span>کتابی مصحف</span>
              </button>
              <button
                onClick={() => setReaderMode('ayah_list')}
                className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                  readerMode === 'ayah_list'
                    ? 'bg-amber-600 text-white shadow-xs font-semibold'
                    : 'text-amber-900 dark:text-amber-200 hover:bg-amber-500/20'
                }`}
                title="آیت بہ آیت مطالعہ و ترجمہ"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>مطالعہ و تفسیر</span>
              </button>
            </div>
          )}
        </div>

        {/* Right Tools: Search, Tajweed guide, Theme, Settings */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Advanced Search Button */}
          <button
            onClick={() => setSearchModalOpen(true)}
            className="p-2 rounded-lg border border-amber-600/30 bg-amber-500/5 hover:bg-amber-500/15 text-amber-900 dark:text-amber-200 transition cursor-pointer"
            title="تلاش قرآن، اردو و انگریزی ترجمہ (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Tajweed Guide Modal Trigger */}
          <button
            onClick={() => setTajweedModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-medium transition cursor-pointer"
            title="تجوید کے رنگین قواعد و رہنمائی"
          >
            <div className="flex gap-1 items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
            </div>
            <span>تجوید گائیڈ</span>
          </button>

          {/* Theme Quick Switcher */}
          <div className="relative group">
            <button
              onClick={() => {
                const currentIndex = themes.findIndex(t => t.id === settings.theme);
                const nextTheme = themes[(currentIndex + 1) % themes.length].id;
                updateSettings({ theme: nextTheme });
              }}
              className="p-2 rounded-lg border border-amber-600/30 bg-amber-500/5 hover:bg-amber-500/15 text-amber-900 dark:text-amber-200 transition cursor-pointer"
              title={`موجودہ تھیم: ${themes.find(t => t.id === settings.theme)?.label} (تبدیل کریں)`}
            >
              <Palette className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </button>
          </div>

          {/* Settings Modal Trigger */}
          <button
            onClick={() => setSettingsModalOpen(true)}
            className="p-2 rounded-lg border border-amber-600/30 bg-amber-500/5 hover:bg-amber-500/15 text-amber-900 dark:text-amber-200 transition cursor-pointer"
            title="فونٹ سائز، قاری اور تراجم سیٹنگز"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Primary Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-2 sm:px-6 overflow-x-auto py-1 scrollbar-none flex items-center justify-between sm:justify-start gap-1 sm:gap-2">
        <button
          onClick={() => setActiveTab('quran')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'quran'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/10'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>تلاوتِ قرآن</span>
        </button>

        <button
          onClick={() => setActiveTab('duas')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'duas'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/10'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-500" />
          <span>اذکار و دعائیں (تسبیح)</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/10'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-indigo-500" />
          <span>مسابقہ قرآنی (Quiz)</span>
        </button>

        <button
          onClick={() => setActiveTab('khatam')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'khatam'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/10'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-500" />
          <span>حلقہ ختمِ قرآن (اشتراک)</span>
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'bookmarks'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/10'
          }`}
        >
          <Bookmark className="w-4 h-4 text-amber-500" />
          <span>بک مارکس و نوٹس</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/10'
          }`}
        >
          <User className="w-4 h-4 text-sky-500" />
          <span>پروفائل و بیک اپ</span>
        </button>
      </nav>
    </header>
  );
};
