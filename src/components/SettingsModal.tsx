import React from 'react';
import { useQuran } from '../context/QuranContext';
import { RECITERS_LIST } from '../data/quranMetadata';
import { 
  X, 
  Type, 
  Palette, 
  Globe, 
  Volume2, 
  Sliders, 
  Sparkles, 
  BookOpen, 
  RotateCcw 
} from 'lucide-react';
import { DEFAULT_SETTINGS } from '../services/storageService';

export const SettingsModal: React.FC = () => {
  const {
    settingsModalOpen,
    setSettingsModalOpen,
    settings,
    updateSettings,
    showToast
  } = useQuran();

  if (!settingsModalOpen) return null;

  const fontOptions = [
    { id: 'amiri', label: 'امیری قرآن (Amiri Quran - مصحف)' },
    { id: 'naskh', label: 'نسخ عربی (Noto Naskh Arabic)' },
    { id: 'scheherazade', label: 'شہرزاد قدیم (Scheherazade New)' },
    { id: 'nastaliq', label: 'نستعلیق انڈو پاک (Noto Nastaliq Urdu)' }
  ];

  const themeOptions = [
    { id: 'parchment', label: 'ورق قدیم (Classic Parchment)', hex: '#fcf8ee' },
    { id: 'emerald', label: 'زمرد مدینہ (Madinah Emerald)', hex: '#04271f' },
    { id: 'dark', label: 'تہجد نائٹ (Midnight Dark)', hex: '#0e131d' },
    { id: 'royal', label: 'شاہی نیلا (Royal Sapphire)', hex: '#0c162f' },
    { id: 'sepia', label: 'قدیم نسخہ (Sepia Manuscript)', hex: '#f5edd9' }
  ];

  const languageOptions = [
    { id: 'urdu', label: 'اردو (Urdu - مولانا فتح محمد جالندھری)' },
    { id: 'english', label: 'English (Sahih International)' },
    { id: 'hindi', label: 'हिन्दी (Hindi - मौलाना अज़ीज़ुल हक़)' },
    { id: 'indonesian', label: 'Bahasa Indonesia (Kemenag)' },
    { id: 'turkish', label: 'Türkçe (Diyanet)' },
    { id: 'french', label: 'Français (Hamidullah)' }
  ];

  const toggleLanguage = (langId: string) => {
    let active = [...settings.activeLanguages];
    if (active.includes(langId)) {
      if (active.length > 1) {
        active = active.filter(l => l !== langId);
      } else {
        showToast('کم از کم ایک زبان فعال رہنی چاہیے');
        return;
      }
    } else {
      active.push(langId);
    }
    updateSettings({ activeLanguages: active });
  };

  const handleResetSettings = () => {
    updateSettings(DEFAULT_SETTINGS);
    showToast('سیٹنگز ابتدائی حالت پر بحال ہو گئیں');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl max-h-[90vh] rounded-3xl border-2 shadow-2xl flex flex-col overflow-hidden transition-all"
        style={{
          borderColor: '#b48324',
          backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fdfaf4'
        }}
      >
        {/* Header */}
        <div className="p-4 border-b border-amber-600/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600/10 border border-amber-600/30 flex items-center justify-center text-amber-700 dark:text-amber-300">
              <Sliders className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 font-['Amiri']">
                ترتیباتِ مصحف و تلاوت (Settings & Preferences)
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                فونٹ سائز، تھیم، قاری اور تراجم کا انتظام
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetSettings}
              className="p-1.5 rounded-lg border border-amber-600/20 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer text-xs flex items-center gap-1"
              title="ری سیٹ کریں"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>ری سیٹ</span>
            </button>
            <button
              onClick={() => setSettingsModalOpen(false)}
              className="p-1.5 rounded-lg border border-amber-600/20 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Settings Form */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Section 1: Themes & Dark Mode */}
          <div>
            <label className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5" />
              <span>تھیمز اور نائٹ موڈ (Themes & Visual Aesthetic)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {themeOptions.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateSettings({ theme: t.id as any })}
                  className={`p-3 rounded-xl border-2 text-right transition cursor-pointer flex items-center justify-between ${
                    settings.theme === t.id
                      ? 'border-amber-600 ring-2 ring-amber-500/40 font-bold'
                      : 'border-amber-600/20 hover:border-amber-600/40'
                  }`}
                  style={{
                    backgroundColor: t.hex,
                    color: t.id === 'parchment' || t.id === 'sepia' ? '#1c1917' : '#ffffff'
                  }}
                >
                  <span className="text-xs font-['Amiri']">{t.label}</span>
                  <span 
                    className="w-4 h-4 rounded-full border border-white/40 shadow-xs"
                    style={{ backgroundColor: t.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Arabic Font & Typography */}
          <div>
            <label className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" />
              <span>عربی رسم الخط اور فونٹ سائز (Arabic Font & Size)</span>
            </label>

            {/* Font Family selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {fontOptions.map((f) => (
                <button
                  key={f.id}
                  onClick={() => updateSettings({ arabicFont: f.id as any })}
                  className={`p-2.5 rounded-xl border text-right transition cursor-pointer text-xs ${
                    settings.arabicFont === f.id
                      ? 'bg-amber-600 text-white font-bold border-amber-600'
                      : 'bg-amber-500/5 hover:bg-amber-500/15 border-amber-600/20 text-neutral-800 dark:text-neutral-200'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Arabic Font Size Slider */}
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-600/20 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>عربی متن کا سائز: <strong>{settings.arabicFontSize}px</strong></span>
                <span className="text-neutral-500">22px - 54px</span>
              </div>
              <input
                type="range"
                min="22"
                max="54"
                step="2"
                value={settings.arabicFontSize}
                onChange={(e) => updateSettings({ arabicFontSize: Number(e.target.value) })}
                className="accent-amber-600 cursor-pointer w-full"
              />

              {/* Live Preview */}
              <div 
                dir="rtl"
                className="mt-2 p-2 rounded-lg bg-white/70 dark:bg-neutral-900/60 text-center font-['Amiri'] font-bold text-neutral-900 dark:text-neutral-100"
                style={{ fontSize: `${settings.arabicFontSize}px` }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>
            </div>

            {/* Translation Font Size Slider */}
            <div className="mt-3 p-4 rounded-xl bg-amber-500/5 border border-amber-600/20 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span>ترجمہ کا فونٹ سائز: <strong>{settings.translationFontSize}px</strong></span>
                <span className="text-neutral-500">12px - 26px</span>
              </div>
              <input
                type="range"
                min="12"
                max="26"
                step="1"
                value={settings.translationFontSize}
                onChange={(e) => updateSettings({ translationFontSize: Number(e.target.value) })}
                className="accent-amber-600 cursor-pointer w-full"
              />
            </div>
          </div>

          {/* Section 3: Reciter Choice & Urdu Voice Translation */}
          <div>
            <label className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5" />
              <span>قاریِ تلاوت اور صوتی اردو ترجمہ (Reciter & Urdu Audio)</span>
            </label>
            <select
              value={settings.activeReciterId}
              onChange={(e) => updateSettings({ activeReciterId: e.target.value })}
              className="w-full p-3 rounded-xl border border-amber-600/30 bg-amber-500/5 text-sm font-semibold text-neutral-900 dark:text-neutral-100 cursor-pointer focus:outline-none mb-3"
            >
              {RECITERS_LIST.map((r) => (
                <option key={r.id} value={r.id} className="bg-neutral-50 dark:bg-neutral-900">
                  {r.nameUrdu} — ({r.name})
                </option>
              ))}
            </select>

            {/* Urdu voice translation switch */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-600/25 flex items-center justify-between mb-3">
              <div>
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block">
                  عربی تلاوت کے فوراً بعد اردو ترجمہ سنائیں:
                </span>
                <span className="text-[11px] text-neutral-600 dark:text-neutral-300">
                  صوتی ترجمہ: قاری شمشاد علی خان (اردو آواز)
                </span>
              </div>
              <button
                onClick={() => updateSettings({ playUrduAudioAfterArabic: !settings.playUrduAudioAfterArabic })}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
                  settings.playUrduAudioAfterArabic
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-neutral-300 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                {settings.playUrduAudioAfterArabic ? 'فعال (آن)' : 'بند'}
              </button>
            </div>

            {/* Kitab Ayahs Per Page */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-600/25 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 block">
                  کتاب کے فی صفحہ آیات کی تعداد (ورق گردانی):
                </span>
                <span className="text-[11px] text-neutral-600 dark:text-neutral-300">
                  آیات مکمل ہونے پر کتاب کا صفحہ خود بخود پلٹے گا
                </span>
              </div>
              <select
                value={settings.ayahsPerPage}
                onChange={(e) => updateSettings({ ayahsPerPage: Number(e.target.value) })}
                className="p-1.5 rounded-lg border border-amber-600/30 bg-transparent text-xs font-bold text-amber-900 dark:text-amber-200"
              >
                {[3, 4, 5, 6, 7, 8, 10].map(cnt => (
                  <option key={cnt} value={cnt} className="bg-neutral-50 dark:bg-neutral-900">{cnt} آیات / صفحہ</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 4: Multilingual Translations Selector */}
          <div>
            <label className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              <span>تراجم کی زبانیں منتخب کریں (Multiple Translation Languages)</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {languageOptions.map((lang) => {
                const isActive = settings.activeLanguages.includes(lang.id);
                return (
                  <button
                    key={lang.id}
                    onClick={() => toggleLanguage(lang.id)}
                    className={`p-3 rounded-xl border text-right transition cursor-pointer flex items-center justify-between text-xs ${
                      isActive
                        ? 'border-emerald-600 bg-emerald-500/15 text-emerald-950 dark:text-emerald-100 font-bold'
                        : 'border-amber-600/20 bg-amber-500/5 text-neutral-600 dark:text-neutral-300 hover:bg-amber-500/15'
                    }`}
                  >
                    <span>{lang.label}</span>
                    <span className={`w-3.5 h-3.5 rounded-full ${isActive ? 'bg-emerald-600' : 'bg-neutral-300'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
