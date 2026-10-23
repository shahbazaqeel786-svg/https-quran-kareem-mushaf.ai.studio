import React from 'react';
import { useQuran } from '../context/QuranContext';
import { TAJWEED_RULES } from '../data/tajweedData';
import { X, Sparkles, BookOpen, Volume2 } from 'lucide-react';

export const TajweedLegendModal: React.FC = () => {
  const {
    tajweedModalOpen,
    setTajweedModalOpen,
    settings,
    updateSettings
  } = useQuran();

  if (!tajweedModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[90vh] rounded-2xl border-2 shadow-2xl flex flex-col overflow-hidden transition-all"
        style={{
          borderColor: '#b48324',
          backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fdfaf4'
        }}
      >
        {/* Modal Header */}
        <div className="p-4 border-b border-amber-600/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 font-['Amiri']">
                قواعد التجوید اور رنگوں کی رہنمائی (Tajweed Rules)
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                قرآنِ کریم کو صحیح مخارج اور قواعد کے ساتھ تلاوت کرنے کا رہنما
              </p>
            </div>
          </div>

          <button
            onClick={() => setTajweedModalOpen(false)}
            className="p-1.5 rounded-lg border border-amber-600/20 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tajweed Switch Bar */}
        <div className="px-4 py-2.5 bg-amber-500/5 border-b border-amber-600/15 flex items-center justify-between text-xs sm:text-sm">
          <span className="font-semibold text-neutral-700 dark:text-neutral-300">
            تلاوت کے دوران تجوید کلرز دکھائیں:
          </span>
          <button
            onClick={() => updateSettings({ showTajweedColors: !settings.showTajweedColors })}
            className={`px-3 py-1 rounded-full font-bold text-xs transition cursor-pointer ${
              settings.showTajweedColors
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
            }`}
          >
            {settings.showTajweedColors ? 'فعال ہے (ON)' : 'غیر فعال (OFF)'}
          </button>
        </div>

        {/* Rules List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
          {TAJWEED_RULES.map((rule) => (
            <div 
              key={rule.id}
              className="p-3.5 sm:p-4 rounded-xl border border-amber-600/20 bg-amber-500/5 hover:bg-amber-500/10 transition flex flex-col gap-2"
            >
              {/* Rule Title & Color Dot */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span 
                    className="w-4 h-4 rounded-full inline-block shadow-xs"
                    style={{ backgroundColor: rule.colorHex }}
                  />
                  <span className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 font-['Amiri']">
                    {rule.nameUrdu} • {rule.nameArabic}
                  </span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-neutral-200/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                  {rule.durationHarakat}
                </span>
              </div>

              {/* Urdu Description */}
              <p 
                dir="rtl"
                className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-['Noto_Nastaliq_Urdu'] leading-relaxed"
              >
                {rule.descriptionUrdu}
              </p>

              {/* English Description */}
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans">
                <strong>Letters:</strong> {rule.letters} — {rule.descriptionEnglish}
              </p>

              {/* Example */}
              <div className="mt-1 p-2.5 rounded-lg bg-white/70 dark:bg-neutral-900/60 border border-amber-600/15 flex items-center justify-between text-right">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase font-semibold block">مثال (Example):</span>
                  <span 
                    dir="rtl"
                    className="text-base sm:text-lg font-['Amiri'] font-bold"
                    style={{ color: rule.colorHex }}
                  >
                    {rule.exampleArabic}
                  </span>
                </div>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-sans italic">
                  {rule.exampleTranslit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
