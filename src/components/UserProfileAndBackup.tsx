import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { storageService } from '../services/storageService';
import { cacheSurahForOffline, getOfflineCachedSurahsList } from '../services/quranApi';
import { SURAH_METADATA } from '../data/quranMetadata';
import { 
  User, 
  Flame, 
  Clock, 
  BookOpen, 
  Download, 
  Upload, 
  Bell, 
  HardDrive, 
  Check, 
  ShieldCheck, 
  Sparkles,
  Wifi,
  WifiOff
} from 'lucide-react';

export const UserProfileAndBackup: React.FC = () => {
  const {
    profile,
    updateProfile,
    settings,
    updateSettings,
    showToast,
    isOffline
  } = useQuran();

  const [downloadingSurah, setDownloadingSurah] = useState<number | null>(null);
  const [downloadMsg, setDownloadMsg] = useState<string>('');
  const [cachedSurahs, setCachedSurahs] = useState<number[]>(getOfflineCachedSurahsList());

  const handleDownloadSurah = async (sNum: number) => {
    setDownloadingSurah(sNum);
    setDownloadMsg(`سورۃ ${sNum} آف لائن ڈاؤنلوڈ ہو رہی ہے...`);
    const success = await cacheSurahForOffline(sNum, (msg) => setDownloadMsg(msg));
    setDownloadingSurah(null);
    setDownloadMsg('');
    if (success) {
      setCachedSurahs(getOfflineCachedSurahsList());
      showToast(`سورۃ ${sNum} آف لائن محفوظ ہو گئی ✓`);
    } else {
      showToast('ڈاؤنلوڈ میں خرابی پیش آئی');
    }
  };

  const handleExportData = () => {
    const jsonStr = storageService.exportAllData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quran_kareem_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('بیک اپ فائل ڈاؤنلوڈ ہو گئی (Data Exported)');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = storageService.importAllData(content);
      if (success) {
        showToast('ڈیٹا کامیابی سے بحال ہو گیا (Data Restored) ✨');
        setTimeout(() => window.location.reload(), 1000);
      } else {
        showToast('فائل کا فارمیٹ درست نہیں ہے');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 flex flex-col gap-6">
      {/* Profile Overview Card */}
      <div 
        className="rounded-3xl p-6 sm:p-8 border-2 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{
          borderColor: '#b48324',
          backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fcf8ee'
        }}
      >
        <div className="flex items-center gap-4 text-right sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-amber-600/15 border-2 border-amber-600/40 flex items-center justify-center text-3xl shadow-inner">
            📖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 font-['Amiri']">
                {profile.name}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                طالبِ علم
              </span>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans mt-0.5">
              {profile.email}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-600/20 text-center min-w-[85px]">
            <Flame className="w-5 h-5 mx-auto text-amber-600 mb-0.5" />
            <span className="text-lg font-bold font-sans text-amber-900 dark:text-amber-100 block">
              {profile.readingStreakDays} دن
            </span>
            <span className="text-[10px] text-neutral-500 uppercase font-semibold">تلاوت کا تسلسل</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-600/20 text-center min-w-[85px]">
            <BookOpen className="w-5 h-5 mx-auto text-emerald-600 mb-0.5" />
            <span className="text-lg font-bold font-sans text-neutral-900 dark:text-neutral-100 block">
              {profile.totalAyahsRead}
            </span>
            <span className="text-[10px] text-neutral-500 uppercase font-semibold">کل آیات تلاوت</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-600/20 text-center min-w-[85px]">
            <Clock className="w-5 h-5 mx-auto text-sky-600 mb-0.5" />
            <span className="text-lg font-bold font-sans text-neutral-900 dark:text-neutral-100 block">
              {profile.totalMinutesRead} منٹ
            </span>
            <span className="text-[10px] text-neutral-500 uppercase font-semibold">وقت صرف ہوا</span>
          </div>
        </div>
      </div>

      {/* Daily Reminders & Reading Targets */}
      <div 
        className="rounded-3xl p-6 border-2 shadow-sm flex flex-col gap-4"
        style={{
          borderColor: 'rgba(180, 131, 36, 0.3)',
          backgroundColor: settings.theme === 'dark' ? '#111620' : '#fffdf9'
        }}
      >
        <div className="flex items-center justify-between pb-3 border-b border-amber-600/15">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" />
            <h2 className="text-base sm:text-lg font-bold font-['Amiri'] text-neutral-900 dark:text-neutral-100">
              روزانہ تلاوت کے اہداف اور یاددہانی (Daily Target & Reminders)
            </h2>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.remindersEnabled}
              onChange={(e) => updateSettings({ remindersEnabled: e.target.checked })}
              className="accent-amber-600 w-4 h-4 rounded"
            />
            <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              یاددہانی نوٹیفکیشن
            </span>
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-600/15 flex items-center justify-between">
            <div>
              <span className="font-bold text-neutral-800 dark:text-neutral-200 block text-sm">
                روزانہ آیات کا ہدف:
              </span>
              <span className="text-neutral-500">کم از کم روزانہ تلاوت کی جانے والی آیات</span>
            </div>
            <select
              value={settings.dailyGoalAyahs}
              onChange={(e) => updateSettings({ dailyGoalAyahs: Number(e.target.value) })}
              className="p-1.5 rounded-lg border border-amber-600/30 bg-transparent text-sm font-bold text-amber-800 dark:text-amber-200 focus:outline-none"
            >
              {[5, 10, 20, 50, 100].map(cnt => (
                <option key={cnt} value={cnt} className="bg-neutral-50 dark:bg-neutral-900">{cnt} آیات / دن</option>
              ))}
            </select>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-600/15 flex items-center justify-between">
            <div>
              <span className="font-bold text-neutral-800 dark:text-neutral-200 block text-sm">
                یاددہانی کا بہترین وقت:
              </span>
              <span className="text-neutral-500">نمازِ فجر، مغرب، یا سونے سے قبل</span>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-1 rounded-md">
              بعد نماز فجر و عشاء
            </span>
          </div>
        </div>
      </div>

      {/* Offline Access & Cache Manager */}
      <div 
        className="rounded-3xl p-6 border-2 shadow-sm flex flex-col gap-4"
        style={{
          borderColor: 'rgba(180, 131, 36, 0.3)',
          backgroundColor: settings.theme === 'dark' ? '#111620' : '#fffdf9'
        }}
      >
        <div className="flex items-center justify-between pb-3 border-b border-amber-600/15">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-amber-600" />
            <h2 className="text-base sm:text-lg font-bold font-['Amiri'] text-neutral-900 dark:text-neutral-100">
              آف لائن رسائی و کیش منیجر (Offline Storage Manager)
            </h2>
          </div>

          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
            {cachedSurahs.length} سورتیں محفوظ شدہ
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-['Noto_Nastaliq_Urdu']">
          انٹرنیٹ کے بغیر پڑھنے کے لیے سورتوں کو ڈاؤنلوڈ کر کے براؤزر کے محفوظ ذخیرے میں رکھیں۔
        </p>

        {downloadMsg && (
          <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-600/30 text-xs font-semibold text-amber-900 dark:text-amber-100 animate-pulse">
            {downloadMsg}
          </div>
        )}

        {/* Quick Offline Surahs grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {[1, 2, 18, 36, 55, 67, 112, 114].map(sNum => {
            const surah = SURAH_METADATA.find(s => s.number === sNum);
            const isCached = cachedSurahs.includes(sNum);
            const isCurrentDownloading = downloadingSurah === sNum;

            return (
              <div 
                key={sNum}
                className="p-3 rounded-xl border border-amber-600/20 bg-amber-500/5 flex items-center justify-between"
              >
                <div>
                  <span className="font-bold font-['Amiri'] block text-sm">
                    {surah?.urduName}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {surah?.numberOfAyahs} آیات
                  </span>
                </div>

                {isCached ? (
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                    <Check className="w-3.5 h-3.5" />
                    محفوظ
                  </span>
                ) : (
                  <button
                    onClick={() => handleDownloadSurah(sNum)}
                    disabled={isCurrentDownloading}
                    className="p-1.5 rounded-lg border border-amber-600/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10 cursor-pointer"
                    title="ڈاؤنلوڈ کریں"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Backup and Restore Controls */}
      <div 
        className="rounded-3xl p-6 border-2 shadow-sm flex flex-col gap-4"
        style={{
          borderColor: 'rgba(180, 131, 36, 0.3)',
          backgroundColor: settings.theme === 'dark' ? '#111620' : '#fffdf9'
        }}
      >
        <div className="flex items-center justify-between pb-3 border-b border-amber-600/15">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h2 className="text-base sm:text-lg font-bold font-['Amiri'] text-neutral-900 dark:text-neutral-100">
              ڈیٹا بیک اپ و بحالی (Backup & Restore)
            </h2>
          </div>

          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
            JSON Format
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-['Noto_Nastaliq_Urdu']">
          اپنے تمام بک مارکس، ذاتی نوٹس، ختمِ قرآن کی پیش رفت اور ترتیبات کو محفوظ رکھیں یا دوسرے آلے پر منتقل کریں۔
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {/* Export Button */}
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>بیک اپ فائل ڈاؤنلوڈ کریں (Export JSON)</span>
          </button>

          {/* Import Button */}
          <label className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-amber-600/30 text-amber-900 dark:text-amber-100 hover:bg-amber-500/10 font-bold text-xs cursor-pointer transition">
            <Upload className="w-4 h-4" />
            <span>بیک اپ فائل بحال کریں (Restore JSON)</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
