import { QuizQuestion } from '../types/quran';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    category: 'surah',
    categoryLabel: 'سورۃ و قرآن کی معلومات',
    questionUrdu: 'قرآن مجید کی کس سورت کو "قلب القرآن" (قرآن کا دل) کہا جاتا ہے؟',
    questionEnglish: 'Which Surah is referred to as the "Heart of the Quran"?',
    optionsUrdu: ['سورۃ یٰسٓ', 'سورۃ الرحمٰن', 'سورۃ الملک', 'سورۃ البقرہ'],
    optionsEnglish: ['Surah Ya-Sin', ['Surah Ar-Rahman'], 'Surah Al-Mulk', 'Surah Al-Baqarah'] as any,
    correctIndex: 0,
    explanationUrdu: 'حدیث شریف (ترمذی) میں ہے کہ ہر چیز کا ایک دل ہوتا ہے اور قرآن مجید کا دل سورۃ یٰسٓ ہے۔',
    explanationEnglish: 'Hadith in Jami at-Tirmidhi mentions: "Indeed everything has a heart, and the heart of the Quran is Surah Ya-Sin."'
  },
  {
    id: 'q2',
    category: 'tajweed',
    categoryLabel: 'قواعد التجوید',
    questionUrdu: 'حروفِ قلقلہ کتنے ہیں اور ان کا مجموعہ کیا ہے؟',
    questionEnglish: 'How many letters of Qalqalah are there and what is their mnemonic?',
    optionsUrdu: ['5 حروف (قُطْبُ جَدٍّ)', '6 حروف (يَرْمَلُون)', '4 حروف (نُمُو)', '3 حروف (حروفِ مدہ)'],
    optionsEnglish: ['5 letters (Qutb Jadd)', '6 letters (Yarmaloon)', '4 letters (Numoo)', '3 letters (Madd letters)'],
    correctIndex: 0,
    explanationUrdu: 'حروفِ قلقلہ 5 ہیں: ق، ط، ب، ج، د (مجموعہ: قُطْبُ جَدٍّ)۔ جب یہ ساکن ہوں تو ان میں گونج اور جھٹکا پیدا کیا جاتا ہے۔',
    explanationEnglish: 'Qalqalah letters are five: Qaf, Ta, Ba, Jeem, and Dal, remembered by the phrase "Qutb Jadd".'
  },
  {
    id: 'q3',
    category: 'surah',
    categoryLabel: 'فضائلِ سور',
    questionUrdu: 'قرآن کریم کی کس سورت کو "عروس القرآن" (قرآن کی دلہن) کہا جاتا ہے؟',
    questionEnglish: 'Which Surah is known as the "Bride of the Quran" (Uroos al-Quran)?',
    optionsUrdu: ['سورۃ الرحمٰن', 'سورۃ الواقعہ', 'سورۃ الفاتحہ', 'سورۃ الکوثر'],
    optionsEnglish: ['Surah Ar-Rahman', 'Surah Al-Waqi\'ah', 'Surah Al-Fatihah', 'Surah Al-Kawthar'],
    correctIndex: 0,
    explanationUrdu: 'امام بیہقیؒ نے شعب الایمان میں روایت نقل فرمائی ہے کہ رسول اللہ ﷺ نے فرمایا: ہر چیز کی ایک دلہن ہوتی ہے اور قرآن کی دلہن سورۃ الرحمٰن ہے۔',
    explanationEnglish: 'Imam Bayhaqi narrated in Shu\'ab al-Iman that the Prophet ﷺ said: "Everything has a bride, and the bride of the Quran is Surah Ar-Rahman."'
  },
  {
    id: 'q4',
    category: 'tajweed',
    categoryLabel: 'قواعد التجوید',
    questionUrdu: 'جب نون ساکن یا تنوین کے بعد حرف "ب" (با) آئے تو کون سا قاعدہ لاگو ہوتا ہے؟',
    questionEnglish: 'When Noon Sakin or Tanween is followed by the letter Ba (ب), which Tajweed rule applies?',
    optionsUrdu: ['اقلاب (Iqlab)', 'اظہار (Izhar)', 'ادغام (Idgham)', 'اخفاء (Ikhfa)'],
    optionsEnglish: ['Iqlab (Conversion to Meem)', 'Izhar (Clear Pronunciation)', 'Idgham (Merging)', 'Ikhfa (Concealment)'],
    correctIndex: 0,
    explanationUrdu: 'اقلاب میں نون ساکن یا تنوین کو میم مخففہ میں بدل کر 2 حرکات کے غنے کے ساتھ پڑھا جاتا ہے، جیسے "مِنْ بَعْدِ" -> "مِمْ بَعْدِ"۔',
    explanationEnglish: 'Iqlab means turning the Noon Sakinah or Tanween into a concealed Meem with Ghunnah when followed by Ba.'
  },
  {
    id: 'q5',
    category: 'ayah',
    categoryLabel: 'قرآنی آیات و احکام',
    questionUrdu: 'قرآن کریم کی سب سے طویل آیت کون سی ہے؟',
    questionEnglish: 'Which is the longest Ayah in the Holy Quran?',
    optionsUrdu: ['آیۃ الدین (سورۃ البقرہ: 282)', 'آیت الکرسی (سورۃ البقرہ: 255)', 'سورۃ النساء: 176', 'سورۃ المائدہ: 3'],
    optionsEnglish: ['Ayat ad-Dayn / The Loan Verse (Al-Baqarah 2:282)', 'Ayat al-Kursi (Al-Baqarah 2:255)', 'An-Nisa 4:176', 'Al-Ma\'idah 5:3'],
    correctIndex: 0,
    explanationUrdu: 'سورۃ البقرہ کی آیت 282 (آیتِ قرض و دین) قرآن کی سب سے لمبی آیت ہے، جو مالی لین دین اور دستاویز لکھنے کے آداب پر مشتمل ہے۔',
    explanationEnglish: 'Surah Al-Baqarah Ayah 282 (Ayat ad-Dayn) is the longest verse, detailing contracts, financial obligations, and witnesses.'
  },
  {
    id: 'q6',
    category: 'prophet',
    categoryLabel: 'انبیاءِ کرام کا ذکر',
    questionUrdu: 'قرآن مجید میں سب سے زیادہ کثرت سے کس نبی علیہ السلام کا نام مبارک آیا ہے؟',
    questionEnglish: 'Which Prophet is mentioned by name most frequently in the Holy Quran?',
    optionsUrdu: ['حضرت موسیٰ علیہ السلام (136 بار)', 'حضرت ابراہیم علیہ السلام (69 بار)', 'حضرت نوح علیہ السلام (43 بار)', 'حضرت عیسیٰ علیہ السلام (25 بار)'],
    optionsEnglish: ['Prophet Musa (Moses) - 136 times', 'Prophet Ibrahim (Abraham) - 69 times', 'Prophet Nuh (Noah) - 43 times', 'Prophet Isa (Jesus) - 25 times'],
    correctIndex: 0,
    explanationUrdu: 'حضرت موسیٰ علیہ السلام کا نام مبارک قرآن مجید میں 136 مرتبہ وارد ہوا ہے اور ان کی قوم کے احوال تفصیل سے بیان ہوئے ہیں۔',
    explanationEnglish: 'Prophet Musa (Moses) peace be upon him is mentioned by name 136 times in the Quran.'
  },
  {
    id: 'q7',
    category: 'surah',
    categoryLabel: 'قرآنی سورتیں',
    questionUrdu: 'قرآن مجید کی وہ کون سی سورت ہے جس کے شروع میں "بسم اللہ الرحمن الرحیم" نہیں پڑھی جاتی؟',
    questionEnglish: 'Which Surah in the Holy Quran does not begin with the Basmalah?',
    optionsUrdu: ['سورۃ التوبہ (سورۃ براءۃ)', 'سورۃ الانفال', 'سورۃ النحل', 'سورۃ القیامہ'],
    optionsEnglish: ['Surah At-Tawbah (Bara\'ah)', 'Surah Al-Anfal', 'Surah An-Nahl', 'Surah Al-Qiyamah'],
    correctIndex: 0,
    explanationUrdu: 'سورۃ التوبہ کے شروع میں بسم اللہ نہیں ہے کیونکہ اس میں منافقین اور مشرکین سے براءت اور اعلانِ جنگ کا ذکر ہے، جبکہ بسم اللہ امان و رحمت ہے۔ البتہ سورۃ النمل میں بسم اللہ دو بار آئی ہے۔',
    explanationEnglish: 'Surah At-Tawbah does not begin with Basmalah because it contains a declaration of disavowal, while Surah An-Naml contains two Basmalahs.'
  },
  {
    id: 'q8',
    category: 'tajweed',
    categoryLabel: 'تجوید و حرکات',
    questionUrdu: 'مد لازم (Madd Lazim) کی ادائیگی میں آواز کو کتنی حرکات تک کھینچا جاتا ہے؟',
    questionEnglish: 'For how many Harakat (counts) is Madd Lazim prolonged?',
    optionsUrdu: ['6 حرکات (طول)', '4 حرکات (توسط)', '2 حرکات (قصر)', '8 حرکات'],
    optionsEnglish: ['6 counts (Tool)', '4 counts (Tawassut)', '2 counts (Qasr)', '8 counts'],
    correctIndex: 0,
    explanationUrdu: 'مد لازم کی مقدار تمام قراء کے نزدیک بالاتفاق 6 حرکات (طول) ہے، جیسے لفظ "الضَّالِّينَ" اور حروفِ مقطعات میں۔',
    explanationEnglish: 'Madd Lazim is universally prolonged for 6 full vowel counts (Harakat) by all canonical reciters.'
  }
];
