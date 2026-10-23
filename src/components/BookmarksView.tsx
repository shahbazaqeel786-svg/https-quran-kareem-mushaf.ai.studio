import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { storageService } from '../services/storageService';
import { BookmarkFolder, Bookmark } from '../types/quran';
import { 
  Bookmark as BookmarkIcon, 
  Trash2, 
  ExternalLink, 
  FolderPlus, 
  BookOpen, 
  Sparkles, 
  Clock, 
  Play,
  Heart
} from 'lucide-react';

export const BookmarksView: React.FC = () => {
  const {
    bookmarks,
    profile,
    jumpToSurahAndAyah,
    settings,
    showToast
  } = useQuran();

  const [folders, setFolders] = useState<BookmarkFolder[]>(storageService.getFolders());
  const [selectedFolderId, setSelectedFolderId] = useState<string>('all');
  const [newFolderName, setNewFolderName] = useState('');
  const [showFolderModal, setShowFolderModal] = useState(false);

  const filteredBookmarks = bookmarks.filter(b => 
    selectedFolderId === 'all' || b.folderId === selectedFolderId
  );

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) return;
    const folder = storageService.saveFolder(newFolderName.trim(), newFolderName.trim(), '#b48324');
    setFolders(storageService.getFolders());
    setSelectedFolderId(folder.id);
    setNewFolderName('');
    setShowFolderModal(false);
    showToast('نیا فولڈر شامل ہو گیا');
  };

  const handleDeleteBookmark = (b: Bookmark) => {
    storageService.removeBookmark(b.surahNumber, b.ayahNumber);
    showToast('بک مارک حذف کر دیا گیا');
    // Trigger re-render by calling storage directly
    window.location.hash = '';
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 flex flex-col gap-6">
      {/* Last Read Quick Resume Banner */}
      {profile.lastRead && (
        <div 
          className="rounded-3xl p-5 sm:p-6 border-2 shadow-md flex flex-wrap items-center justify-between gap-4 transition-all"
          style={{
            borderColor: '#b48324',
            backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fcf8ee'
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/15 border border-amber-600/30 flex items-center justify-center text-amber-700 dark:text-amber-300">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase">
                آخری تلاوت (Last Read Bookmark)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-['Amiri'] text-neutral-900 dark:text-neutral-100">
                سُورَة {profile.lastRead.surahNameUrdu} ({profile.lastRead.surahNameArabic}) • آیت {profile.lastRead.ayahNumber}
              </h2>
            </div>
          </div>

          <button
            onClick={() => jumpToSurahAndAyah(profile.lastRead!.surahNumber, profile.lastRead!.ayahNumber)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>تلاوت جاری رکھیں (Resume)</span>
          </button>
        </div>
      )}

      {/* Folders Management & Filtering */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setSelectedFolderId('all')}
            className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
              selectedFolderId === 'all'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-500/10 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/20'
            }`}
          >
            تمام محفوظات ({bookmarks.length})
          </button>

          {folders.map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedFolderId(f.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition cursor-pointer ${
                selectedFolderId === f.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-500/10 text-neutral-700 dark:text-neutral-300 hover:bg-amber-500/20'
              }`}
            >
              {f.nameUrdu}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowFolderModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-600/30 text-amber-800 dark:text-amber-200 hover:bg-amber-500/10 text-xs font-semibold cursor-pointer"
        >
          <FolderPlus className="w-4 h-4" />
          <span>نیا فولڈر</span>
        </button>
      </div>

      {/* Bookmarks List */}
      <div className="space-y-3">
        {filteredBookmarks.length === 0 ? (
          <div className="py-16 text-center text-neutral-500 dark:text-neutral-400">
            <BookmarkIcon className="w-12 h-12 mx-auto mb-3 opacity-30 text-amber-600" />
            <p className="font-['Noto_Nastaliq_Urdu'] text-base">
              اس فولڈر میں فی الوقت کوئی بک مارک موجود نہیں ہے۔ تلاوت کے دوران آیت کے ساتھ بک مارک کا آئیکون دبائیں۔
            </p>
          </div>
        ) : (
          filteredBookmarks.map((b) => (
            <div
              key={b.id}
              className="rounded-2xl p-4 sm:p-5 border transition-all flex flex-col gap-2.5 hover:border-amber-600/40"
              style={{
                borderColor: 'rgba(180, 131, 36, 0.3)',
                backgroundColor: settings.theme === 'dark' ? '#111620' : '#fffdf9'
              }}
            >
              <div className="flex items-center justify-between pb-2 border-b border-amber-600/15">
                <span className="font-bold text-sm font-['Amiri'] text-amber-800 dark:text-amber-300">
                  سُورَة {b.surahNameUrdu} ({b.surahNameArabic}) • آیت {b.ayahNumber}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => jumpToSurahAndAyah(b.surahNumber, b.ayahNumber)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500/15 text-amber-900 dark:text-amber-200 hover:bg-amber-500/25 text-xs font-semibold cursor-pointer"
                  >
                    <span>کھولیں</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteBookmark(b)}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                    title="حذف کریں"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Arabic preview */}
              <p 
                dir="rtl"
                className="text-lg font-['Amiri'] font-semibold text-neutral-900 dark:text-neutral-100 text-right leading-relaxed"
              >
                {b.ayahText}
              </p>

              {/* Translation */}
              <p 
                dir="rtl"
                className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-['Noto_Nastaliq_Urdu'] text-right leading-relaxed"
              >
                {b.urduTranslation}
              </p>
            </div>
          ))
        )}
      </div>

      {/* New Folder Modal */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div 
            className="w-full max-w-sm rounded-2xl p-6 border-2 shadow-2xl flex flex-col gap-4"
            style={{
              borderColor: '#b48324',
              backgroundColor: settings.theme === 'dark' ? '#161b22' : '#fdfaf4'
            }}
          >
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              نیا بک مارک فولڈر بنائیں
            </h3>
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="فولڈر کا نام (مثلاً: آیاتِ شفا، حفظ ہفتہ...)"
              className="p-2.5 rounded-xl border border-amber-600/30 bg-amber-500/5 text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowFolderModal(false)}
                className="px-3 py-1.5 rounded-lg border border-neutral-400 text-xs font-semibold cursor-pointer"
              >
                منسوخ
              </button>
              <button
                onClick={handleCreateFolder}
                className="px-4 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-bold shadow-xs cursor-pointer"
              >
                محفوظ کریں
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
