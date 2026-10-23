import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Ayah, Bookmark, KhatamCircle, SurahMeta, UserProfile, UserSettings } from '../types/quran';
import { SURAH_METADATA, RECITERS_LIST } from '../data/quranMetadata';
import { fetchSurahAyahs, getAyahAudioUrl, getAyahUrduAudioUrl } from '../services/quranApi';
import { storageService, DEFAULT_SETTINGS, DEFAULT_PROFILE } from '../services/storageService';

interface QuranContextType {
  // Surah & Ayah state
  currentSurah: SurahMeta;
  setCurrentSurahNumber: (num: number) => void;
  currentAyahNumber: number;
  setCurrentAyahNumber: (num: number) => void;
  ayahs: Ayah[];
  loadingAyahs: boolean;

  // View & Tab
  activeTab: 'quran' | 'duas' | 'quiz' | 'khatam' | 'bookmarks' | 'profile';
  setActiveTab: (tab: 'quran' | 'duas' | 'quiz' | 'khatam' | 'bookmarks' | 'profile') => void;
  readerMode: 'kitab' | 'ayah_list';
  setReaderMode: (mode: 'kitab' | 'ayah_list') => void;

  // Audio state & Sequential Urdu Translation
  isPlaying: boolean;
  currentPlayingAyah: number | null;
  audioPhase: 'arabic' | 'urdu' | 'idle';
  playbackSpeed: number;
  setPlaybackSpeed: (speed: number) => void;
  activeReciterId: string;
  setActiveReciterId: (id: string) => void;
  isLooping: boolean;
  setIsLooping: (loop: boolean) => void;
  loopCount: number;
  setLoopCount: (count: number) => void;
  loopRemaining: number;
  playAyah: (ayahNumber: number, forcePhase?: 'arabic' | 'urdu') => void;
  togglePlayPause: () => void;
  playNextAyah: () => void;
  playPrevAyah: () => void;
  stopAudio: () => void;

  // Modals & Drawers
  tajweedModalOpen: boolean;
  setTajweedModalOpen: (open: boolean) => void;
  tafseerModalAyah: Ayah | null;
  setTafseerModalAyah: (ayah: Ayah | null) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  settingsModalOpen: boolean;
  setSettingsModalOpen: (open: boolean) => void;
  shareCardAyah: Ayah | null;
  setShareCardAyah: (ayah: Ayah | null) => void;

  // Bookmarks & Persistence
  bookmarks: Bookmark[];
  toggleBookmark: (ayah: Ayah) => void;
  isAyahBookmarked: (ayahNumber: number) => boolean;

  // Settings & Profile
  settings: UserSettings;
  updateSettings: (newSettings: Partial<UserSettings>) => void;
  profile: UserProfile;
  updateProfile: (newProfile: Partial<UserProfile>) => void;
  jumpToSurahAndAyah: (surahNumber: number, ayahNumber: number) => void;

  // Offline banner
  isOffline: boolean;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const QuranContext = createContext<QuranContextType | undefined>(undefined);

export const QuranProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(storageService.getSettings());
  const [profile, setProfile] = useState<UserProfile>(storageService.getProfile());
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(storageService.getBookmarks());

  const [currentSurahNumber, setCurrentSurahNumberState] = useState<number>(profile.lastRead?.surahNumber || 1);
  const [currentAyahNumber, setCurrentAyahNumber] = useState<number>(profile.lastRead?.ayahNumber || 1);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loadingAyahs, setLoadingAyahs] = useState<boolean>(true);

  const [activeTab, setActiveTab] = useState<'quran' | 'duas' | 'quiz' | 'khatam' | 'bookmarks' | 'profile'>('quran');
  const [readerMode, setReaderModeState] = useState<'kitab' | 'ayah_list'>(settings.readerMode || 'kitab');

  // Modals
  const [tajweedModalOpen, setTajweedModalOpen] = useState(false);
  const [tafseerModalAyah, setTafseerModalAyah] = useState<Ayah | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [shareCardAyah, setShareCardAyah] = useState<Ayah | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlayingAyah, setCurrentPlayingAyah] = useState<number | null>(null);
  const [audioPhase, setAudioPhase] = useState<'arabic' | 'urdu' | 'idle'>('idle');
  const [playbackSpeed, setPlaybackSpeedState] = useState(settings.playbackSpeed || 1.0);
  const [activeReciterId, setActiveReciterIdState] = useState(settings.activeReciterId || 'alafasy');
  const [isLooping, setIsLooping] = useState(settings.isLooping || false);
  const [loopCount, setLoopCount] = useState(settings.loopCount || 1);
  const [loopRemaining, setLoopRemaining] = useState(1);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activePhaseRef = useRef<'arabic' | 'urdu' | 'idle'>('idle');
  const currentAyahRef = useRef<number | null>(null);

  // Keep refs in sync for event listeners
  activePhaseRef.current = audioPhase;
  currentAyahRef.current = currentPlayingAyah;

  // Current Surah metadata
  const currentSurah = SURAH_METADATA.find(s => s.number === currentSurahNumber) || SURAH_METADATA[0];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Online / Offline listener
  useEffect(() => {
    const handleOnline = () => { setIsOffline(false); showToast('انٹرنیٹ بحال ہو گیا (Online)'); };
    const handleOffline = () => { setIsOffline(true); showToast('آپ آف لائن ہیں (Offline Mode)'); };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load ayahs when currentSurahNumber changes
  useEffect(() => {
    let isCancelled = false;
    setLoadingAyahs(true);
    fetchSurahAyahs(currentSurahNumber).then(res => {
      if (!isCancelled) {
        setAyahs(res);
        setLoadingAyahs(false);
      }
    }).catch(err => {
      if (!isCancelled) setLoadingAyahs(false);
    });

    return () => {
      isCancelled = true;
    };
  }, [currentSurahNumber]);

  // Synchronized Auto-scroll: "jesy aayat badlen wesy hen line badlen"
  useEffect(() => {
    if (currentPlayingAyah !== null) {
      const el = document.getElementById(`kitab-ayah-${currentPlayingAyah}`) || 
                 document.getElementById(`study-ayah-${currentPlayingAyah}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentPlayingAyah, audioPhase]);

  // Play Urdu Voice translation
  const playUrduAudio = (ayahNum: number) => {
    if (!audioRef.current) return;
    const urduUrl = getAyahUrduAudioUrl(currentSurahNumber, ayahNum);
    setAudioPhase('urdu');
    activePhaseRef.current = 'urdu';

    audioRef.current.src = urduUrl;
    audioRef.current.playbackRate = playbackSpeed;
    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setCurrentPlayingAyah(ayahNum);
      setCurrentAyahNumber(ayahNum);
    }).catch((err) => {
      console.warn('Urdu audio playback failed, trying speech synthesis fallback:', err);
      // Fallback to speech synthesis if audio file not reachable
      const ayahItem = ayahs.find(a => a.numberInSurah === ayahNum);
      if ('speechSynthesis' in window && ayahItem?.translations?.urdu) {
        const utterance = new SpeechSynthesisUtterance(ayahItem.translations.urdu);
        utterance.lang = 'ur-PK';
        utterance.rate = playbackSpeed;
        utterance.onend = () => {
          advanceAfterUrdu(ayahNum);
        };
        window.speechSynthesis.speak(utterance);
      } else {
        advanceAfterUrdu(ayahNum);
      }
    });
  };

  // Helper to advance after Urdu translation is complete
  const advanceAfterUrdu = (ayahNum: number) => {
    if (isLooping && loopRemaining > 1) {
      setLoopRemaining(prev => prev - 1);
      setTimeout(() => playAyah(ayahNum, 'arabic'), 200);
      return;
    }
    if (isLooping && loopCount >= 900) {
      setTimeout(() => playAyah(ayahNum, 'arabic'), 200);
      return;
    }

    setLoopRemaining(loopCount);
    if (ayahNum < currentSurah.numberOfAyahs) {
      setTimeout(() => playAyah(ayahNum + 1, 'arabic'), 250);
    } else {
      setIsPlaying(false);
      setAudioPhase('idle');
      activePhaseRef.current = 'idle';
      showToast('سورۃ مبارکہ کی تلاوت و ترجمہ مکمل ہوا ✨');
    }
  };

  // Setup HTML Audio element with sequential Arabic -> Urdu logic
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleEnded = () => {
      const activeAyah = currentAyahRef.current || 1;
      const currentPhase = activePhaseRef.current;

      // 1. If Arabic recitation just ended
      if (currentPhase === 'arabic') {
        // If user wants Urdu voice translation after each ayah:
        if (settings.playUrduAudioAfterArabic) {
          playUrduAudio(activeAyah);
          return;
        }

        // Otherwise handle loop or advance immediately
        if (isLooping && loopRemaining > 1) {
          setLoopRemaining(prev => prev - 1);
          audio.currentTime = 0;
          audio.play().catch(console.error);
          return;
        }
        if (isLooping && loopCount >= 900) {
          audio.currentTime = 0;
          audio.play().catch(console.error);
          return;
        }

        setLoopRemaining(loopCount);
        if (activeAyah < currentSurah.numberOfAyahs) {
          setTimeout(() => playAyah(activeAyah + 1, 'arabic'), 200);
        } else {
          setIsPlaying(false);
          setAudioPhase('idle');
        }
        return;
      }

      // 2. If Urdu voice translation just ended
      if (currentPhase === 'urdu') {
        advanceAfterUrdu(activeAyah);
      }
    };

    const handleError = () => {
      // If error occurs during urdu audio, simply advance
      if (activePhaseRef.current === 'urdu') {
        advanceAfterUrdu(currentAyahRef.current || 1);
      } else {
        setIsPlaying(false);
        setAudioPhase('idle');
        showToast('آڈیو لوڈ کرنے میں دشواری پیش آئی');
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentSurah, isLooping, loopCount, loopRemaining, settings.playUrduAudioAfterArabic]);

  const playAyah = (ayahNumber: number, forcePhase: 'arabic' | 'urdu' = 'arabic') => {
    if (!audioRef.current) return;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (forcePhase === 'urdu') {
      playUrduAudio(ayahNumber);
      return;
    }

    const url = getAyahAudioUrl(currentSurahNumber, ayahNumber, activeReciterId);
    audioRef.current.src = url;
    audioRef.current.playbackRate = playbackSpeed;
    setAudioPhase('arabic');
    activePhaseRef.current = 'arabic';

    audioRef.current.play().then(() => {
      setIsPlaying(true);
      setCurrentPlayingAyah(ayahNumber);
      setCurrentAyahNumber(ayahNumber);
      setLoopRemaining(loopCount);
      // Update last read
      storageService.updateLastRead(currentSurahNumber, ayahNumber, currentSurah.name, currentSurah.urduName);
      setProfile(storageService.getProfile());
    }).catch(e => {
      console.warn('Playback error:', e);
      setIsPlaying(false);
      setAudioPhase('idle');
    });
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
    } else {
      const ayahToPlay = currentPlayingAyah || currentAyahNumber || 1;
      playAyah(ayahToPlay, audioPhase === 'urdu' ? 'urdu' : 'arabic');
    }
  };

  const playNextAyah = () => {
    const next = (currentPlayingAyah || currentAyahNumber || 1) + 1;
    if (next <= currentSurah.numberOfAyahs) {
      playAyah(next, 'arabic');
    } else if (currentSurahNumber < 114) {
      setCurrentSurahNumberState(currentSurahNumber + 1);
      setTimeout(() => playAyah(1, 'arabic'), 500);
    }
  };

  const playPrevAyah = () => {
    const prev = (currentPlayingAyah || currentAyahNumber || 1) - 1;
    if (prev >= 1) {
      playAyah(prev, 'arabic');
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setCurrentPlayingAyah(null);
    setAudioPhase('idle');
    activePhaseRef.current = 'idle';
  };

  const setPlaybackSpeed = (speed: number) => {
    setPlaybackSpeedState(speed);
    if (audioRef.current) audioRef.current.playbackRate = speed;
    updateSettings({ playbackSpeed: speed });
  };

  const setActiveReciterId = (id: string) => {
    setActiveReciterIdState(id);
    updateSettings({ activeReciterId: id });
    if (isPlaying && currentPlayingAyah) {
      playAyah(currentPlayingAyah, 'arabic');
    }
  };

  const setCurrentSurahNumber = (num: number) => {
    stopAudio();
    setCurrentSurahNumberState(num);
    setCurrentAyahNumber(1);
  };

  const jumpToSurahAndAyah = (surahNumber: number, ayahNumber: number) => {
    stopAudio();
    setCurrentSurahNumberState(surahNumber);
    setCurrentAyahNumber(ayahNumber);
    setActiveTab('quran');
    showToast(`سُورَة ${surahNumber} آیت ${ayahNumber} پر منتقل ہو گئے`);
  };

  const setReaderMode = (mode: 'kitab' | 'ayah_list') => {
    setReaderModeState(mode);
    updateSettings({ readerMode: mode });
  };

  const updateSettings = (newSettings: Partial<UserSettings>) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    storageService.saveSettings(merged);
  };

  const updateProfile = (newProfile: Partial<UserProfile>) => {
    const merged = { ...profile, ...newProfile };
    setProfile(merged);
    storageService.saveProfile(merged);
  };

  const toggleBookmark = (ayah: Ayah) => {
    if (isAyahBookmarked(ayah.numberInSurah)) {
      storageService.removeBookmark(currentSurahNumber, ayah.numberInSurah);
      showToast('بک مارک ہٹا دیا گیا');
    } else {
      storageService.saveBookmark({
        surahNumber: currentSurahNumber,
        ayahNumber: ayah.numberInSurah,
        surahNameArabic: currentSurah.name,
        surahNameUrdu: currentSurah.urduName,
        surahNameEnglish: currentSurah.englishName,
        ayahText: ayah.text,
        urduTranslation: ayah.translations.urdu,
        folderId: 'f_daily'
      });
      showToast('آیت مبارکہ بک مارک کر لی گئی ✨');
    }
    setBookmarks(storageService.getBookmarks());
  };

  const isAyahBookmarked = (ayahNumber: number): boolean => {
    return bookmarks.some(b => b.surahNumber === currentSurahNumber && b.ayahNumber === ayahNumber);
  };

  return (
    <QuranContext.Provider
      value={{
        currentSurah,
        setCurrentSurahNumber,
        currentAyahNumber,
        setCurrentAyahNumber,
        ayahs,
        loadingAyahs,
        activeTab,
        setActiveTab,
        readerMode,
        setReaderMode,
        isPlaying,
        currentPlayingAyah,
        audioPhase,
        playbackSpeed,
        setPlaybackSpeed,
        activeReciterId,
        setActiveReciterId,
        isLooping,
        setIsLooping,
        loopCount,
        setLoopCount,
        loopRemaining,
        playAyah,
        togglePlayPause,
        playNextAyah,
        playPrevAyah,
        stopAudio,
        tajweedModalOpen,
        setTajweedModalOpen,
        tafseerModalAyah,
        setTafseerModalAyah,
        searchModalOpen,
        setSearchModalOpen,
        settingsModalOpen,
        setSettingsModalOpen,
        shareCardAyah,
        setShareCardAyah,
        bookmarks,
        toggleBookmark,
        isAyahBookmarked,
        settings,
        updateSettings,
        profile,
        updateProfile,
        jumpToSurahAndAyah,
        isOffline,
        toastMessage,
        showToast
      }}
    >
      {children}
    </QuranContext.Provider>
  );
};

export const useQuran = () => {
  const context = useContext(QuranContext);
  if (!context) {
    throw new Error('useQuran must be used within a QuranProvider');
  }
  return context;
};
