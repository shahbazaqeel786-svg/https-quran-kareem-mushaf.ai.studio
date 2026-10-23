import React from 'react';
import { QuranProvider, useQuran } from './context/QuranContext';
import { Navbar } from './components/Navbar';
import { KitabMushafView } from './components/KitabMushafView';
import { AyahStudyView } from './components/AyahStudyView';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { DuasAndAdhkar } from './components/DuasAndAdhkar';
import { QuizMode } from './components/QuizMode';
import { CollaborationWorkspace } from './components/CollaborationWorkspace';
import { BookmarksView } from './components/BookmarksView';
import { UserProfileAndBackup } from './components/UserProfileAndBackup';
import { TajweedLegendModal } from './components/TajweedLegendModal';
import { TafseerModal } from './components/TafseerModal';
import { SearchModal } from './components/SearchModal';
import { SettingsModal } from './components/SettingsModal';
import { AyahCardModal } from './components/AyahCardModal';

const AppContent: React.FC = () => {
  const {
    activeTab,
    readerMode,
    settings,
    toastMessage
  } = useQuran();

  // Determine theme class
  const getThemeClass = () => {
    switch (settings.theme) {
      case 'dark': return 'mushaf-dark dark text-neutral-100';
      case 'emerald': return 'mushaf-emerald dark text-emerald-50';
      case 'royal': return 'mushaf-royal dark text-sky-50';
      case 'sepia': return 'mushaf-sepia text-stone-900';
      case 'parchment':
      default: return 'mushaf-parchment text-neutral-900';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 pb-28 ${getThemeClass()}`}>
      {/* Sticky Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="transition-all duration-300">
        {activeTab === 'quran' && (
          readerMode === 'kitab' ? <KitabMushafView /> : <AyahStudyView />
        )}
        {activeTab === 'duas' && <DuasAndAdhkar />}
        {activeTab === 'quiz' && <QuizMode />}
        {activeTab === 'khatam' && <CollaborationWorkspace />}
        {activeTab === 'bookmarks' && <BookmarksView />}
        {activeTab === 'profile' && <UserProfileAndBackup />}
      </main>

      {/* Sticky Bottom Audio Player Bar */}
      <AudioPlayerBar />

      {/* Modals & Dialogs */}
      <TajweedLegendModal />
      <TafseerModal />
      <SearchModal />
      <SettingsModal />
      <AyahCardModal />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 duration-300 pointer-events-none">
          <div className="px-4 py-2.5 rounded-xl bg-amber-600/95 text-white text-xs sm:text-sm font-semibold shadow-2xl backdrop-blur-md flex items-center gap-2 border border-amber-400/40">
            <span>✨</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <QuranProvider>
      <AppContent />
    </QuranProvider>
  );
}
