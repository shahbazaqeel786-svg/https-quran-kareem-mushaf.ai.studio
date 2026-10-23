import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { DUAS_DATA } from '../data/duasData';
import { DuaItem } from '../types/quran';
import { 
  Heart, 
  RotateCcw, 
  Sparkles, 
  Volume2, 
  Check, 
  Copy, 
  ShieldCheck, 
  Sun, 
  Moon, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export const DuasAndAdhkar: React.FC = () => {
  const { settings, showToast } = useQuran();

  // Active Category Filter
  const [activeCategory, setActiveCategory] = useState<'all' | 'morning_evening' | 'daily' | 'forgiveness' | 'protection' | 'quranic'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Digital Tasbeeh State
  const [tasbeehCount, setTasbeehCount] = useState<number>(0);
  const [tasbeehTarget, setTasbeehTarget] = useState<number>(33);
  const [selectedZikr, setSelectedZikr] = useState<string>('سُبْحَانَ اللَّهِ');
  const [zikrMeaning, setZikrMeaning] = useState<string>('اللہ پاک ہے اور ہر عیب سے مبرا ہے');
  const [totalLaps, setTotalLaps] = useState<number>(0);

  const zikrPresets = [
    { arabic: 'سُبْحَانَ اللَّهِ', meaning: 'اللہ پاک ہے اور ہر عیب سے مبرا ہے', defaultTarget: 33 },
    { arabic: 'الْحَمْدُ لِلَّهِ', meaning: 'تمام تعریفیں اور شکر اللہ کے لیے ہیں', defaultTarget: 33 },
    { arabic: 'اللَّهُ أَكْبَرُ', meaning: 'اللہ سب سے بڑا ہے', defaultTarget: 34 },
    { arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', meaning: 'میں اللہ سے معافی چاہتا ہوں اور اسی کی طرف رجوع کرتا ہوں', defaultTarget: 100 },
    { arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ', meaning: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں', defaultTarget: 100 },
    { arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَعَلَىٰ آلِ مُحَمَّدٍ', meaning: 'درودِ پاک بر رسولِ اکرم ﷺ', defaultTarget: 100 }
  ];

  const handleTasbeehClick = () => {
    const nextCount = tasbeehCount + 1;
    if (tasbeehTarget > 0 && nextCount >= tasbeehTarget) {
      setTasbeehCount(0);
      setTotalLaps(prev => prev + 1);
      showToast(`ماشاء اللہ! ${tasbeehTarget} بار ذکر مکمل ہو گیا ✨`);
    } else {
      setTasbeehCount(nextCount);
    }
  };

  const handleResetTasbeeh = () => {
    setTasbeehCount(0);
    setTotalLaps(0);
    showToast('تسبیح کاؤنٹر ری سیٹ ہو گیا');
  };

  const handleCopyDua = (dua: DuaItem) => {
    const text = `${dua.titleUrdu}\n\n${dua.arabic}\n\nترجمہ: ${dua.translationUrdu}\n\nحوالہ: ${dua.reference}`;
    navigator.clipboard.writeText(text);
    setCopiedId(dua.id);
    showToast('دعا کا متن کاپی کر لیا گیا');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredDuas = DUAS_DATA.filter(d => activeCategory === 'all' || d.category === activeCategory);

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 flex flex-col gap-8">
      {/* Top Section: Interactive Digital Tasbeeh Counter */}
      <div 
        className="rounded-3xl p-6 sm:p-8 border-2 shadow-xl text-center relative overflow-hidden transition-all"
        style={{
          borderColor: '#b48324',
          backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fcf8ee'
        }}
      >
        <div className="flex items-center justify-between pb-4 border-b border-amber-600/20 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>ڈیجیٹل تسبیح کاؤنٹر (Smart Tasbeeh)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-500 dark:text-neutral-400">دور (Laps): <strong>{totalLaps}</strong></span>
            <button
              onClick={handleResetTasbeeh}
              className="p-1.5 rounded-lg border border-amber-600/30 text-neutral-600 dark:text-neutral-300 hover:bg-amber-500/10 cursor-pointer"
              title="صفر کریں (Reset)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Zikr Preset Selector */}
        <div className="my-4 flex flex-wrap gap-2 justify-center">
          {zikrPresets.map((z, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedZikr(z.arabic);
                setZikrMeaning(z.meaning);
                setTasbeehTarget(z.defaultTarget);
                setTasbeehCount(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer font-['Amiri'] ${
                selectedZikr === z.arabic
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-neutral-800 dark:text-neutral-200 border border-amber-600/20'
              }`}
            >
              {z.arabic}
            </button>
          ))}
        </div>

        {/* Selected Dhikr Display */}
        <div className="my-5">
          <h2 className="text-2xl sm:text-3xl font-bold font-['Amiri'] text-amber-900 dark:text-amber-100">
            {selectedZikr}
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 font-['Noto_Nastaliq_Urdu'] mt-1">
            {zikrMeaning}
          </p>
        </div>

        {/* Giant Circular Tasbeeh Button */}
        <div className="flex flex-col items-center justify-center my-6">
          <button
            onClick={handleTasbeehClick}
            className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-amber-600 bg-gradient-to-b from-amber-500/20 to-amber-600/30 hover:from-amber-500/30 hover:to-amber-600/40 active:scale-95 transition-all shadow-xl flex flex-col items-center justify-center cursor-pointer select-none group"
          >
            <span className="text-5xl sm:text-6xl font-bold font-sans text-amber-900 dark:text-amber-100 group-hover:scale-105 transition-transform">
              {tasbeehCount}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-amber-800 dark:text-amber-300 mt-1">
              ہدف: {tasbeehTarget > 0 ? tasbeehTarget : 'لامحدود'}
            </span>
          </button>
        </div>

        {/* Target Buttons: 33, 100, Unlimited */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold">
          <span>ہدف منتخب کریں:</span>
          {[33, 100, 0].map(tgt => (
            <button
              key={tgt}
              onClick={() => {
                setTasbeehTarget(tgt);
                setTasbeehCount(0);
              }}
              className={`px-3 py-1 rounded-lg border transition cursor-pointer ${
                tasbeehTarget === tgt
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'border-amber-600/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10'
              }`}
            >
              {tgt === 0 ? 'کھلا (لامحدود)' : `${tgt} مرتبہ`}
            </button>
          ))}
        </div>
      </div>

      {/* Duas Section: Category Navigation & Duas List */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-['Amiri'] text-neutral-900 dark:text-neutral-100">
              حصن المسلم و مسنون دعائیں (Authentic Duas & Adhkar)
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              صحیح احادیث اور قرآن مجید سے ماخوذ روزمرہ کی بابرکت دعائیں
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-500/10 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/20'
              }`}
            >
              تمام دعائیں
            </button>
            <button
              onClick={() => setActiveCategory('morning_evening')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeCategory === 'morning_evening'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-500/10 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/20'
              }`}
            >
              صبح و شام کے اذکار
            </button>
            <button
              onClick={() => setActiveCategory('quranic')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeCategory === 'quranic'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-500/10 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/20'
              }`}
            >
              قرآنی دعائیں (ربنا)
            </button>
            <button
              onClick={() => setActiveCategory('forgiveness')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeCategory === 'forgiveness'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-500/10 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/20'
              }`}
            >
              توبہ و استغفار
            </button>
            <button
              onClick={() => setActiveCategory('protection')}
              className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                activeCategory === 'protection'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-500/10 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/20'
              }`}
            >
              حفاظت و استعاذہ
            </button>
          </div>
        </div>

        {/* Duas Cards List */}
        <div className="space-y-4">
          {filteredDuas.map((dua) => (
            <div
              key={dua.id}
              className="rounded-2xl p-5 sm:p-6 border transition-all duration-300 hover:border-amber-600/40"
              style={{
                borderColor: 'rgba(180, 131, 36, 0.3)',
                backgroundColor: settings.theme === 'dark' ? '#111620' : '#fffdf9'
              }}
            >
              {/* Header: Title & Reference */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-600/15">
                <div className="text-right">
                  <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-['Amiri']">
                    {dua.titleUrdu}
                  </h3>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                    {dua.titleEnglish}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    {dua.reference}
                  </span>

                  <button
                    onClick={() => handleCopyDua(dua)}
                    className="p-1.5 rounded-lg border border-amber-600/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10 cursor-pointer"
                    title="کاپی کریں"
                  >
                    {copiedId === dua.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Arabic Dua */}
              <div 
                dir="rtl"
                className="text-right text-xl sm:text-2xl font-bold font-['Amiri'] text-amber-900 dark:text-amber-100 leading-loose my-3 select-all"
              >
                {dua.arabic}
              </div>

              {/* Transliteration */}
              {dua.transliteration && (
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans italic mb-3">
                  {dua.transliteration}
                </p>
              )}

              {/* Urdu Translation */}
              <div className="text-right pt-2 border-t border-amber-600/10">
                <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 block mb-0.5">
                  اردو مفہوم و ترجمہ:
                </span>
                <p 
                  dir="rtl"
                  className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 font-['Noto_Nastaliq_Urdu'] leading-relaxed"
                >
                  {dua.translationUrdu}
                </p>
              </div>

              {/* English Translation */}
              <div className="text-left pt-2 border-t border-amber-600/10 mt-2">
                <span className="text-[11px] font-semibold text-sky-700 dark:text-sky-400 block mb-0.5">
                  English Meaning:
                </span>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-sans">
                  {dua.translationEnglish}
                </p>
              </div>

              {/* Hadith Virtues / Benefits */}
              {dua.benefitUrdu && (
                <div 
                  dir="rtl"
                  className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-600/20 text-xs sm:text-sm font-['Noto_Nastaliq_Urdu'] text-neutral-800 dark:text-neutral-200 leading-relaxed"
                >
                  <strong className="text-amber-900 dark:text-amber-200">فضیلت و برکت: </strong>
                  {dua.benefitUrdu}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
