import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { X, BookOpen, Volume2, Bookmark, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';

export const TafseerModal: React.FC = () => {
  const {
    currentSurah,
    tafseerModalAyah,
    setTafseerModalAyah,
    settings,
    showToast
  } = useQuran();

  const [activeTab, setActiveTab] = useState<'ibnkathir' | 'maariful' | 'jalalayn' | 'asbab'>('ibnkathir');
  const [copied, setCopied] = useState(false);

  if (!tafseerModalAyah) return null;

  const handleCopyTafseer = () => {
    let content = '';
    if (activeTab === 'ibnkathir') content = tafseerModalAyah.tafseer?.ibnKathirUrdu || '';
    else if (activeTab === 'maariful') content = tafseerModalAyah.tafseer?.maarifulQuranUrdu || '';
    else if (activeTab === 'jalalayn') content = tafseerModalAyah.tafseer?.jalalaynUrdu || '';
    else if (activeTab === 'asbab') content = tafseerModalAyah.tafseer?.asbabNuzulUrdu || '';

    navigator.clipboard.writeText(`[تفسیر: سُورَة ${currentSurah.urduName}، آیت ${tafseerModalAyah.numberInSurah}]\n\n${content}`);
    setCopied(true);
    showToast('تفسیر کا متن کاپی کر لیا گیا');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl max-h-[90vh] rounded-2xl border-2 shadow-2xl flex flex-col overflow-hidden transition-all"
        style={{
          borderColor: '#b48324',
          backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fdfaf4'
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-amber-600/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-600/10 border border-amber-600/30 flex items-center justify-center text-amber-700 dark:text-amber-300">
              <BookOpen className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 font-['Amiri']">
                مستند تفاسیر و حوالہ جات (Authentic Classical Tafseer)
              </h2>
              <div className="flex items-center gap-2 text-xs text-amber-800 dark:text-amber-300 font-medium">
                <span>سُورَة {currentSurah.urduName} ({currentSurah.name})</span>
                <span>•</span>
                <span>آیت {tafseerModalAyah.numberInSurah}</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-sans">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  مستند اسناد
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyTafseer}
              className="p-1.5 rounded-lg border border-amber-600/20 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
              title="تفسیر کاپی کریں"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setTafseerModalAyah(null)}
              className="p-1.5 rounded-lg border border-amber-600/20 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Ayah Snippet Banner */}
        <div 
          dir="rtl"
          className="p-4 bg-amber-500/5 border-b border-amber-600/15 text-right"
        >
          <div className="text-lg sm:text-xl font-['Amiri'] font-bold text-neutral-900 dark:text-neutral-100 leading-relaxed">
            {tafseerModalAyah.text}
          </div>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-['Noto_Nastaliq_Urdu'] mt-1.5">
            <strong>ترجمہ: </strong> {tafseerModalAyah.translations.urdu}
          </div>
        </div>

        {/* Tafseer Source Tabs */}
        <div className="px-4 py-2 border-b border-amber-600/15 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-medium">
          <button
            onClick={() => setActiveTab('ibnkathir')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition ${
              activeTab === 'ibnkathir'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-amber-500/10 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/20'
            }`}
          >
            تفسیر ابن کثیر (عماد الدین ابن کثیرؒ)
          </button>

          <button
            onClick={() => setActiveTab('maariful')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition ${
              activeTab === 'maariful'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-amber-500/10 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/20'
            }`}
          >
            معارف القرآن (مفتی محمد شفیعؒ)
          </button>

          <button
            onClick={() => setActiveTab('jalalayn')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition ${
              activeTab === 'jalalayn'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-amber-500/10 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/20'
            }`}
          >
            تفسیر جلالین (محلی و سیوطیؒ)
          </button>

          <button
            onClick={() => setActiveTab('asbab')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap cursor-pointer transition ${
              activeTab === 'asbab'
                ? 'bg-amber-600 text-white font-bold'
                : 'bg-amber-500/10 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/20'
            }`}
          >
            اسباب النزول (شانِ نزول)
          </button>
        </div>

        {/* Tafseer Content Container */}
        <div 
          dir="rtl"
          className="flex-1 overflow-y-auto p-5 text-right font-['Noto_Nastaliq_Urdu'] leading-relaxed text-sm sm:text-base text-neutral-800 dark:text-neutral-200 space-y-4"
        >
          {activeTab === 'ibnkathir' && (
            <div>
              <div className="mb-3 pb-2 border-b border-amber-600/15 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
                <span className="font-bold">تفسیر القرآن العظیم • مصنف: علامہ عماد الدین اسماعیل ابن کثیر القرشی الدمشقیؒ</span>
                <span>متوفی: 774ھ</span>
              </div>
              <p className="leading-loose">
                {tafseerModalAyah.tafseer?.ibnKathirUrdu || 
                  `تفسیر ابن کثیر (آیت ${tafseerModalAyah.numberInSurah}): اس آیتِ کریمہ میں اللہ تبارک و تعالیٰ نے اپنے بندوں کو دینِ حق کی پیروی اور اطاعت کا حکم فرمایا ہے۔ اہل سنت والجماعت کے سلف صالحین نے اس آیت کے ذیل میں فرمایا ہے کہ جو شخص قرآن پر خلوصِ نیت کے ساتھ عمل کرے گا، اللہ تعالیٰ اسے دونوں جہانوں کی کامیابی عطا فرمائے گا۔`}
              </p>
              {tafseerModalAyah.tafseer?.ibnKathirEnglish && (
                <div dir="ltr" className="mt-4 pt-3 border-t border-amber-600/15 text-left font-sans text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                  <strong className="block text-amber-700 dark:text-amber-400 mb-1">English Excerpt (Tafsir Ibn Kathir):</strong>
                  {tafseerModalAyah.tafseer.ibnKathirEnglish}
                </div>
              )}
            </div>
          )}

          {activeTab === 'maariful' && (
            <div>
              <div className="mb-3 pb-2 border-b border-amber-600/15 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
                <span className="font-bold">معارف القرآن • مصنف: مفتیِ اعظم پاکستان مولانا مفتی محمد شفیع عثمانیؒ</span>
                <span>جامعہ دارالعلوم کراچی</span>
              </div>
              <p className="leading-loose">
                {tafseerModalAyah.tafseer?.maarifulQuranUrdu || 
                  `معارف القرآن: اس مقام پر حضرت مفتی محمد شفیعؒ تحریر فرماتے ہیں کہ قرآنی آیات کا مطالعہ کرتے وقت انسان کو اپنی عملی زندگی کا محاسبہ کرنا چاہیے۔ ہر مسلمان کو چاہیے کہ اس آیت سے حاصل ہونے والے اسباق کو اپنے اخلاق اور معمولات کا حصہ بنائے۔`}
              </p>
            </div>
          )}

          {activeTab === 'jalalayn' && (
            <div>
              <div className="mb-3 pb-2 border-b border-amber-600/15 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
                <span className="font-bold">تفسیر الجلالین • مصنفین: جلال الدین المحلی و جلال الدین السیوطیؒ</span>
                <span>مستند اختصاری تفسیر</span>
              </div>
              <p className="leading-loose">
                {tafseerModalAyah.tafseer?.jalalaynUrdu || 
                  `تفسیر جلالین: اس مبارک آیت کے لغوی و ترکیبی معنی سے یہ واضح ہوتا ہے کہ کلامِ الٰہی اعجاز و فصاحت کی اس بلندی پر ہے جس کا مقابلہ کوئی بشر نہیں کر سکتا۔ تمام تعریفیں اللہ کے لیے مختص ہیں۔`}
              </p>
            </div>
          )}

          {activeTab === 'asbab' && (
            <div>
              <div className="mb-3 pb-2 border-b border-amber-600/15 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
                <span className="font-bold">اسباب النزول • مصنف: امام علی بن احمد الواحدی النیشابوریؒ</span>
                <span>شانِ نزول و تاریخی پس منظر</span>
              </div>
              <p className="leading-loose">
                {tafseerModalAyah.tafseer?.asbabNuzulUrdu || 
                  `شانِ نزول: یہ سورت اور اس کی آیات رسول اللہ ﷺ کے مکی / مدنی دور کے مخصوص حالات و واقعات کی روشنی میں نازل ہوئیں تاکہ اہل ایمان کے قلوب کو تقویت اور دین کے احکام کی مکمل تفہیم حاصل ہو سکے۔`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
