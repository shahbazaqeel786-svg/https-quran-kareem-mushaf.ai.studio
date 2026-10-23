export interface SurahMeta {
  number: number;
  name: string; // Arabic: الفاتحة
  englishName: string; // Al-Faatiha
  englishNameTranslation: string; // The Opening
  urduName: string; // الفاتحہ
  urduMeaning: string; // آغاز / شروعات
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  revelationTypeUrdu: 'مکی' | 'مدنی';
  rukus: number;
  juzNumber: number;
  pageNumber: number;
}

export interface WordData {
  id: number;
  arabic: string;
  transliteration?: string;
  urdu: string;
  english: string;
}

export interface Ayah {
  numberInSurah: number;
  numberInQuran: number;
  text: string;
  tajweedHtml?: string;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  sajda: boolean | string;
  translations: {
    urdu: string; // Fateh Muhammad Jalandhry / Ahmed Ali
    urduMaududi?: string;
    english: string; // Sahih International
    englishKhattab?: string; // The Clear Quran
    hindi?: string;
    indonesian?: string;
    turkish?: string;
    french?: string;
  };
  audioUrl?: string;
  words?: WordData[];
  tafseer?: {
    ibnKathirUrdu?: string;
    ibnKathirEnglish?: string;
    maarifulQuranUrdu?: string;
    jalalaynUrdu?: string;
    asbabNuzulUrdu?: string;
  };
}

export interface Reciter {
  id: string;
  name: string;
  nameUrdu: string;
  style: string;
  identifier: string; // EveryAyah identifier
}

export interface Bookmark {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  surahNameArabic: string;
  surahNameUrdu: string;
  surahNameEnglish: string;
  ayahText: string;
  urduTranslation: string;
  note?: string;
  folderId: string;
  createdAt: number;
  tags?: string[];
}

export interface BookmarkFolder {
  id: string;
  name: string;
  nameUrdu: string;
  color: string;
  iconName: string;
}

export interface QuizQuestion {
  id: string;
  category: 'surah' | 'ayah' | 'tajweed' | 'prophet' | 'tafseer';
  categoryLabel: string;
  questionUrdu: string;
  questionEnglish: string;
  optionsUrdu: string[];
  optionsEnglish: string[];
  correctIndex: number;
  explanationUrdu: string;
  explanationEnglish: string;
}

export interface DuaItem {
  id: string;
  titleUrdu: string;
  titleEnglish: string;
  arabic: string;
  transliteration?: string;
  translationUrdu: string;
  translationEnglish: string;
  reference: string;
  category: 'morning_evening' | 'daily' | 'forgiveness' | 'protection' | 'quranic';
  benefitUrdu?: string;
  repeatCount: number;
}

export interface KhatamMember {
  id: string;
  name: string;
  avatar: string;
  assignedJuz: number[];
  completedJuz: number[];
}

export interface KhatamCircle {
  id: string;
  title: string;
  targetDate: string;
  members: KhatamMember[];
  isCompleted: boolean;
  notes: string[];
}

export interface UserSettings {
  theme: 'parchment' | 'emerald' | 'dark' | 'royal' | 'sepia';
  arabicFont: 'amiri' | 'naskh' | 'scheherazade' | 'nastaliq';
  arabicFontSize: number;
  translationFontSize: number;
  activeReciterId: string;
  playbackSpeed: number;
  isLooping: boolean;
  loopCount: number; // 1, 3, 5, 10, 999 (infinite)
  loopRangeStart: number | null;
  loopRangeEnd: number | null;
  showTajweedColors: boolean;
  showWordByWord: boolean;
  showTransliteration: boolean;
  activeLanguages: string[]; // ['urdu', 'english', 'hindi', ...]
  selectedUrduTranslator: 'jalandhry' | 'maududi';
  selectedEnglishTranslator: 'sahih' | 'khattab';
  dailyGoalMinutes: number;
  dailyGoalAyahs: number;
  remindersEnabled: boolean;
  readerMode: 'kitab' | 'ayah_list'; // 'kitab' open book format vs 'ayah_list'
  playUrduAudioAfterArabic: boolean; // Voice Urdu translation right after Arabic
  ayahsPerPage: number; // For authentic Kitab page flipping
}

export interface UserProfile {
  name: string;
  email: string;
  readingStreakDays: number;
  lastReadDate: string;
  totalAyahsRead: number;
  totalMinutesRead: number;
  lastRead: {
    surahNumber: number;
    ayahNumber: number;
    surahNameArabic: string;
    surahNameUrdu: string;
    timestamp: number;
  } | null;
  hifzTargetSurahs: number[];
}
