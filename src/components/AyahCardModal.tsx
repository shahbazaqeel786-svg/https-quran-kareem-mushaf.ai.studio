import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { X, Copy, Check, Share2, Sparkles, Download } from 'lucide-react';

export const AyahCardModal: React.FC = () => {
  const {
    currentSurah,
    shareCardAyah,
    setShareCardAyah,
    settings,
    showToast
  } = useQuran();

  const [copied, setCopied] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<'parchment' | 'emerald' | 'dark' | 'royal'>('parchment');

  if (!shareCardAyah) return null;

  const cardText = `${shareCardAyah.text}\n\nترجمہ: ${shareCardAyah.translations.urdu}\n\nEnglish: ${shareCardAyah.translations.english}\n\n[سُورَة ${currentSurah.urduName}، آیت ${shareCardAyah.numberInSurah}]`;

  const handleCopyCard = () => {
    navigator.clipboard.writeText(cardText);
    setCopied(true);
    showToast('قرآنی کارڈ کا متن کاپی ہو گیا');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `سُورَة ${currentSurah.urduName} آیت ${shareCardAyah.numberInSurah}`,
        text: cardText
      }).catch(() => {});
    } else {
      handleCopyCard();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg rounded-3xl border-2 shadow-2xl flex flex-col overflow-hidden transition-all"
        style={{
          borderColor: '#b48324',
          backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fdfaf4'
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-amber-600/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-neutral-100 font-['Amiri']">
              قرآنی آیت کارڈ جنریٹر (Shareable Ayah Card)
            </h3>
          </div>

          <button
            onClick={() => setShareCardAyah(null)}
            className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Picker */}
        <div className="px-4 py-2 border-b border-amber-600/15 flex items-center justify-center gap-2 text-xs font-semibold">
          <span>کارڈ کا رنگ:</span>
          {[
            { id: 'parchment', label: 'ورق قدیم', bg: '#fcf8ee' },
            { id: 'emerald', label: 'زمرد مدینہ', bg: '#04271f' },
            { id: 'dark', label: 'نائٹ', bg: '#0e131d' },
            { id: 'royal', label: 'شاہی', bg: '#0c162f' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setSelectedTheme(t.id as any)}
              className={`px-3 py-1 rounded-full border transition cursor-pointer ${
                selectedTheme === t.id
                  ? 'border-amber-600 ring-2 ring-amber-500 font-bold'
                  : 'border-amber-600/30 text-neutral-600 dark:text-neutral-300'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* The Visual Card Content */}
        <div className="p-4 sm:p-6 flex justify-center">
          <div 
            id="shareable-ayah-card"
            className="w-full rounded-2xl p-6 sm:p-8 border-2 relative shadow-lg text-center flex flex-col gap-4 select-all"
            style={{
              borderColor: '#b48324',
              backgroundColor: 
                selectedTheme === 'parchment' ? '#fcf8ee' :
                selectedTheme === 'emerald' ? '#04271f' :
                selectedTheme === 'dark' ? '#0e131d' : '#0c162f',
              color: selectedTheme === 'parchment' ? '#1c1917' : '#fdfaf4'
            }}
          >
            {/* Corner geometric dots */}
            <div className="absolute top-2 left-2 text-amber-500/60 text-xs">✤</div>
            <div className="absolute top-2 right-2 text-amber-500/60 text-xs">✤</div>
            <div className="absolute bottom-2 left-2 text-amber-500/60 text-xs">✤</div>
            <div className="absolute bottom-2 right-2 text-amber-500/60 text-xs">✤</div>

            {/* Bismillah */}
            <div className="text-sm font-['Amiri'] text-amber-600/90 font-bold">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>

            {/* Arabic Ayah */}
            <p 
              dir="rtl"
              className="text-xl sm:text-2xl font-['Amiri'] font-bold leading-loose my-1"
            >
              {shareCardAyah.text}
            </p>

            {/* Urdu Translation */}
            <p 
              dir="rtl"
              className="text-xs sm:text-sm font-['Noto_Nastaliq_Urdu'] leading-relaxed opacity-90"
            >
              {shareCardAyah.translations.urdu}
            </p>

            {/* English Translation */}
            {shareCardAyah.translations.english && (
              <p className="text-xs font-sans opacity-75 mt-1 border-t border-amber-600/20 pt-2">
                "{shareCardAyah.translations.english}"
              </p>
            )}

            {/* Surah Reference Badge */}
            <div className="mt-2 text-xs font-semibold text-amber-600 dark:text-amber-400 font-['Amiri']">
              سُورَة {currentSurah.urduName} ({currentSurah.englishName}) • آیت {shareCardAyah.numberInSurah}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-amber-600/20 flex items-center justify-end gap-2">
          <button
            onClick={handleCopyCard}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-amber-600/30 text-amber-900 dark:text-amber-100 hover:bg-amber-500/10 text-xs font-semibold cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>متن کاپی کریں</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-md cursor-pointer transition"
          >
            <Share2 className="w-4 h-4" />
            <span>شیئر کریں (Share)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
