import { Bookmark, BookmarkFolder, KhatamCircle, UserProfile, UserSettings } from '../types/quran';

const STORAGE_KEYS = {
  BOOKMARKS: 'quran_bookmarks',
  FOLDERS: 'quran_bookmark_folders',
  NOTES: 'quran_ayah_notes',
  SETTINGS: 'quran_user_settings',
  PROFILE: 'quran_user_profile',
  KHATAM: 'quran_khatam_circles',
  LAST_READ: 'quran_last_read'
};

export const DEFAULT_SETTINGS: UserSettings = {
  theme: 'parchment',
  arabicFont: 'amiri',
  arabicFontSize: 32,
  translationFontSize: 16,
  activeReciterId: 'alafasy',
  playbackSpeed: 1.0,
  isLooping: false,
  loopCount: 1,
  loopRangeStart: null,
  loopRangeEnd: null,
  showTajweedColors: true,
  showWordByWord: true,
  showTransliteration: false,
  activeLanguages: ['urdu', 'english'],
  selectedUrduTranslator: 'jalandhry',
  selectedEnglishTranslator: 'sahih',
  dailyGoalMinutes: 15,
  dailyGoalAyahs: 10,
  remindersEnabled: true,
  readerMode: 'kitab',
  playUrduAudioAfterArabic: true,
  ayahsPerPage: 6
};

export const DEFAULT_FOLDERS: BookmarkFolder[] = [
  { id: 'f_daily', name: 'Daily Tilawat', nameUrdu: 'روزانہ تلاوت', color: '#059669', iconName: 'BookOpen' },
  { id: 'f_hifz', name: 'Memorization (Hifz)', nameUrdu: 'حفظ و تکرار', color: '#0284c7', iconName: 'BookmarkCheck' },
  { id: 'f_tadabbur', name: 'Reflections (Tadabbur)', nameUrdu: 'تدبر و تفکر', color: '#d97706', iconName: 'Sparkles' },
  { id: 'f_dua', name: 'Quranic Duas', nameUrdu: 'قرآنی دعائیں', color: '#7c3aed', iconName: 'Heart' }
];

export const DEFAULT_PROFILE: UserProfile = {
  name: 'طالب القرآن',
  email: 'quran.seeker@example.com',
  readingStreakDays: 7,
  lastReadDate: new Date().toISOString().split('T')[0],
  totalAyahsRead: 248,
  totalMinutesRead: 195,
  lastRead: {
    surahNumber: 1,
    ayahNumber: 1,
    surahNameArabic: 'الفَاتِحَة',
    surahNameUrdu: 'الفاتحہ',
    timestamp: Date.now()
  },
  hifzTargetSurahs: [1, 67, 112, 113, 114]
};

export const DEFAULT_KHATAM_CIRCLES: KhatamCircle[] = [
  {
    id: 'khatam_ramadan_family',
    title: 'خاندان کا ختمِ قرآن مجید (Family Khatam)',
    targetDate: '2026-11-15',
    isCompleted: false,
    notes: ['تمام احباب روزانہ 1 پارہ پڑھ کر اپ ڈیٹ کریں', 'دعائے ختمِ قرآن کا اہتمام کیا جائے گا'],
    members: [
      { id: 'm1', name: 'احمد رضا', avatar: '👨', assignedJuz: [1, 2, 3], completedJuz: [1, 2] },
      { id: 'm2', name: 'فاطمہ زہرا', avatar: '🧕', assignedJuz: [4, 5, 6], completedJuz: [4, 5, 6] },
      { id: 'm3', name: 'محمد حمزہ', avatar: '👦', assignedJuz: [7, 8, 9, 10], completedJuz: [7] },
      { id: 'm4', name: 'عائشہ صدیقہ', avatar: '👩', assignedJuz: [11, 12, 13, 14], completedJuz: [11, 12] },
      { id: 'm5', name: 'آپ (صارف)', avatar: '⭐', assignedJuz: [15, 16, 29, 30], completedJuz: [15, 30] }
    ]
  }
];

export const storageService = {
  getSettings(): UserSettings {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: UserSettings): void {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  },

  getProfile(): UserProfile {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveProfile(profile: UserProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.warn('Failed to save profile:', e);
    }
  },

  updateLastRead(surahNumber: number, ayahNumber: number, surahNameArabic: string, surahNameUrdu: string): void {
    const profile = this.getProfile();
    const today = new Date().toISOString().split('T')[0];
    let streak = profile.readingStreakDays;

    if (profile.lastReadDate !== today) {
      // Calculate day difference
      const last = new Date(profile.lastReadDate).getTime();
      const curr = new Date(today).getTime();
      const diffDays = Math.round((curr - last) / (1000 * 3600 * 24));
      if (diffDays === 1) streak += 1;
      else if (diffDays > 1) streak = 1;
    }

    const updated: UserProfile = {
      ...profile,
      readingStreakDays: streak,
      lastReadDate: today,
      totalAyahsRead: profile.totalAyahsRead + 1,
      lastRead: {
        surahNumber,
        ayahNumber,
        surahNameArabic,
        surahNameUrdu,
        timestamp: Date.now()
      }
    };
    this.saveProfile(updated);
  },

  getBookmarks(): Bookmark[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  saveBookmark(bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Bookmark {
    const list = this.getBookmarks();
    const existingIdx = list.findIndex(b => b.surahNumber === bookmark.surahNumber && b.ayahNumber === bookmark.ayahNumber);
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `bm_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: Date.now()
    };

    if (existingIdx >= 0) {
      list[existingIdx] = newBookmark;
    } else {
      list.unshift(newBookmark);
    }
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
    return newBookmark;
  },

  removeBookmark(surahNumber: number, ayahNumber: number): void {
    const list = this.getBookmarks().filter(b => !(b.surahNumber === surahNumber && b.ayahNumber === ayahNumber));
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(list));
  },

  isBookmarked(surahNumber: number, ayahNumber: number): boolean {
    return this.getBookmarks().some(b => b.surahNumber === surahNumber && b.ayahNumber === ayahNumber);
  },

  getFolders(): BookmarkFolder[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FOLDERS);
      return saved ? JSON.parse(saved) : DEFAULT_FOLDERS;
    } catch {
      return DEFAULT_FOLDERS;
    }
  },

  saveFolder(name: string, nameUrdu: string, color: string, iconName: string = 'Folder'): BookmarkFolder {
    const folders = this.getFolders();
    const folder: BookmarkFolder = {
      id: `f_${Date.now()}`,
      name,
      nameUrdu,
      color,
      iconName
    };
    folders.push(folder);
    localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(folders));
    return folder;
  },

  getKhatamCircles(): KhatamCircle[] {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.KHATAM);
      return saved ? JSON.parse(saved) : DEFAULT_KHATAM_CIRCLES;
    } catch {
      return DEFAULT_KHATAM_CIRCLES;
    }
  },

  saveKhatamCircles(circles: KhatamCircle[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.KHATAM, JSON.stringify(circles));
    } catch (e) {
      console.warn('Failed to save Khatam circles:', e);
    }
  },

  exportAllData(): string {
    const bundle = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      settings: this.getSettings(),
      profile: this.getProfile(),
      bookmarks: this.getBookmarks(),
      folders: this.getFolders(),
      khatamCircles: this.getKhatamCircles()
    };
    return JSON.stringify(bundle, null, 2);
  },

  importAllData(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.settings) localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(parsed.settings));
      if (parsed.profile) localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(parsed.profile));
      if (parsed.bookmarks) localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(parsed.bookmarks));
      if (parsed.folders) localStorage.setItem(STORAGE_KEYS.FOLDERS, JSON.stringify(parsed.folders));
      if (parsed.khatamCircles) localStorage.setItem(STORAGE_KEYS.KHATAM, JSON.stringify(parsed.khatamCircles));
      return true;
    } catch (e) {
      console.error('Import failed:', e);
      return false;
    }
  }
};
