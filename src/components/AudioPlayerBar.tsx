import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { RECITERS_LIST } from '../data/quranMetadata';
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Gauge, 
  Volume2, 
  ChevronUp, 
  ChevronDown,
  UserCheck,
  Mic
} from 'lucide-react';

export const AudioPlayerBar: React.FC = () => {
  const {
    currentSurah,
    currentAyahNumber,
    isPlaying,
    currentPlayingAyah,
    audioPhase,
    playAyah,
    togglePlayPause,
    playNextAyah,
    playPrevAyah,
    stopAudio,
    playbackSpeed,
    setPlaybackSpeed,
    activeReciterId,
    setActiveReciterId,
    isLooping,
    setIsLooping,
    loopCount,
    setLoopCount,
    loopRemaining,
    settings,
    updateSettings
  } = useQuran();

  const [expandedControls, setExpandedControls] = useState(false);

  const activeReciter = RECITERS_LIST.find(r => r.id === activeReciterId) || RECITERS_LIST[0];
  const activeAyahDisplay = currentPlayingAyah || currentAyahNumber || 1;

  const speedOptions = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
  const loopOptions = [
    { label: '1 بار', value: 1 },
    { label: '3 بار', value: 3 },
    { label: '5 بار (حفظ)', value: 5 },
    { label: '10 بار (تکرار)', value: 10 },
    { label: 'لامحدود (∞)', value: 999 }
  ];

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md shadow-2xl transition-all duration-300"
      style={{
        borderColor: '#b48324',
        backgroundColor: 
          settings.theme === 'dark' ? 'rgba(15, 20, 28, 0.96)' :
          settings.theme === 'emerald' ? 'rgba(3, 30, 24, 0.97)' :
          settings.theme === 'royal' ? 'rgba(10, 18, 38, 0.97)' : 'rgba(254, 251, 244, 0.97)'
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
        {/* Main Row */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left: Active Surah and Ayah info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/15 border border-amber-600/30 flex items-center justify-center text-amber-700 dark:text-amber-300">
              <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-bounce text-amber-600' : ''}`} />
            </div>

            <div>
              <div className="text-sm font-bold text-neutral-950 dark:text-neutral-50 font-['Amiri'] flex items-center gap-2">
                <span>سُورَة {currentSurah.urduName} ({currentSurah.name}) • آیت {activeAyahDisplay}</span>
                {isPlaying && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    audioPhase === 'urdu' ? 'bg-emerald-600 text-white animate-pulse' : 'bg-amber-600 text-white animate-pulse'
                  }`}>
                    {audioPhase === 'urdu' ? '🎙️ اردو آواز' : '🔊 عربی'}
                  </span>
                )}
              </div>
              <div className="text-xs text-amber-950 dark:text-amber-200 font-sans font-semibold flex items-center gap-1.5">
                <span>{audioPhase === 'urdu' ? 'ترجمہ: شمشاد علی خان' : activeReciter.nameUrdu}</span>
                {isLooping && (
                  <span className="px-1.5 py-0.2 rounded bg-amber-600/25 text-amber-950 dark:text-amber-100 text-[10px] font-bold">
                    تکرار: {loopRemaining > 900 ? '∞' : `${loopRemaining} باقی`}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Center: Playback Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prev Ayah */}
            <button
              onClick={playPrevAyah}
              className="p-2 rounded-lg border border-amber-600/30 text-amber-900 dark:text-amber-200 hover:bg-amber-500/15 transition cursor-pointer"
              title="پچھلی آیت"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlayPause}
              className="w-11 h-11 rounded-full bg-amber-600 hover:bg-amber-500 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              title={isPlaying ? 'روکیں (Pause)' : 'چلائیں (Play)'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 translate-x-0.5" />}
            </button>

            {/* Next Ayah */}
            <button
              onClick={playNextAyah}
              className="p-2 rounded-lg border border-amber-600/30 text-amber-900 dark:text-amber-200 hover:bg-amber-500/15 transition cursor-pointer"
              title="اگلی آیت"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            {/* Stop Audio */}
            {isPlaying && (
              <button
                onClick={stopAudio}
                className="p-2 rounded-lg border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-500/15 transition cursor-pointer"
                title="بند کریں (Stop)"
              >
                <Square className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Right: Urdu Voice Toggle, Loop, Speed & Reciter Quick Popover */}
          <div className="flex items-center gap-2">
            {/* Urdu Voice Translation Toggle */}
            <button
              onClick={() => updateSettings({ playUrduAudioAfterArabic: !settings.playUrduAudioAfterArabic })}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                settings.playUrduAudioAfterArabic
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'border-amber-600/30 text-amber-900 dark:text-amber-200 hover:bg-amber-500/15'
              }`}
              title="تلاوت کے بعد اردو صوتی ترجمہ آن یا آف کریں"
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">اردو آواز: {settings.playUrduAudioAfterArabic ? 'آن' : 'بند'}</span>
            </button>

            {/* Loop Toggle */}
            <button
              onClick={() => setIsLooping(!isLooping)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition cursor-pointer ${
                isLooping
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'border-amber-600/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10'
              }`}
              title="حفظ کے لیے آڈیو لوپ (Repeat Ayah)"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">لوپ {loopCount > 900 ? '∞' : `${loopCount}x`}</span>
            </button>

            {/* Speed Picker */}
            <div className="relative">
              <select
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                aria-label="رفتارِ تلاوت (Recitation Speed)"
                className="appearance-none pl-2 pr-6 py-1.5 rounded-lg border border-amber-600/30 bg-amber-500/5 text-xs font-semibold text-amber-900 dark:text-amber-200 cursor-pointer focus:outline-none"
                title="رفتارِ تلاوت (Recitation Speed)"
              >
                {speedOptions.map(sp => (
                  <option key={sp} value={sp} className="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                    {sp}x رفتار
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-amber-700 dark:text-amber-300 text-[10px]">
                ▼
              </div>
            </div>

            {/* Reciter Selector */}
            <div className="relative hidden md:block">
              <select
                value={activeReciterId}
                onChange={(e) => setActiveReciterId(e.target.value)}
                aria-label="قاری کا انتخاب"
                className="appearance-none pl-3 pr-7 py-1.5 rounded-lg border border-amber-600/30 bg-amber-500/5 text-xs font-semibold text-amber-900 dark:text-amber-200 cursor-pointer focus:outline-none max-w-[170px] truncate"
                title="قاری کا انتخاب"
              >
                {RECITERS_LIST.map(r => (
                  <option key={r.id} value={r.id} className="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                    {r.nameUrdu}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-amber-700 dark:text-amber-300 text-[10px]">
                ▼
              </div>
            </div>

            {/* Expand Extra Loop Settings */}
            <button
              onClick={() => setExpandedControls(!expandedControls)}
              className="p-1.5 rounded-lg border border-amber-600/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10 cursor-pointer"
              title="مزید آڈیو سیٹنگز"
            >
              {expandedControls ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expanded Loop & Memorization Controls */}
        {expandedControls && (
          <div className="mt-3 pt-3 border-t border-amber-600/20 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-900 dark:text-amber-200">
                حفظ و تکرار کی تعداد (Loop Count):
              </span>
              <div className="flex items-center gap-1">
                {loopOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setLoopCount(opt.value);
                      setIsLooping(true);
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition ${
                      loopCount === opt.value && isLooping
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'bg-amber-500/10 hover:bg-amber-500/20 text-neutral-800 dark:text-neutral-200 border border-amber-600/20'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Reciter selector visible if screen is small */}
            <div className="md:hidden w-full flex items-center gap-2">
              <span className="font-semibold text-amber-900 dark:text-amber-200">قاری:</span>
              <select
                value={activeReciterId}
                onChange={(e) => setActiveReciterId(e.target.value)}
                className="w-full py-1 px-2 rounded-lg border border-amber-600/30 bg-amber-500/5 text-xs text-neutral-900 dark:text-neutral-100"
              >
                {RECITERS_LIST.map(r => (
                  <option key={r.id} value={r.id}>{r.nameUrdu}</option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
