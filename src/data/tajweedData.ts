export interface TajweedRule {
  id: string;
  nameArabic: string;
  nameUrdu: string;
  nameEnglish: string;
  colorHex: string;
  cssClass: string;
  durationHarakat: string;
  letters: string;
  descriptionUrdu: string;
  descriptionEnglish: string;
  exampleArabic: string;
  exampleTranslit: string;
}

export const TAJWEED_RULES: TajweedRule[] = [
  {
    id: 'ghunnah',
    nameArabic: 'غُنَّة (نون وميم مشددتان)',
    nameUrdu: 'غنہ (نون و میم مشدد)',
    nameEnglish: 'Ghunnah (Nasalization)',
    colorHex: '#059669',
    cssClass: 'tajweed-ghunnah',
    durationHarakat: '2 حرکات',
    letters: 'نّ ، مّ',
    descriptionUrdu: 'جب نون یا میم پر تشدید (ّ) ہو تو ناک کے بانسے سے دو حرکات کی مقدار خوبصورت آواز کے ساتھ غنہ کیا جاتا ہے۔',
    descriptionEnglish: 'A nasal sound produced from the nasal cavity when Noon or Meem carries a Shaddah (ّ), held for 2 counts.',
    exampleArabic: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    exampleTranslit: 'Inna Allaha ma\'a as-sabireen'
  },
  {
    id: 'qalqalah',
    nameArabic: 'قَلْقَلَة (حروف قطب جد)',
    nameUrdu: 'قلقلہ (جھٹکا / گونج)',
    nameEnglish: 'Qalqalah (Echoing / Bouncing)',
    colorHex: '#0284c7',
    cssClass: 'tajweed-qalqalah',
    durationHarakat: 'صوتی گونج',
    letters: 'ق ، ط ، ب ، ج ، د (قُطْبُ جَدٍّ)',
    descriptionUrdu: 'ان پانچ حروف پر جب جزم (ساکن) یا وقف کی حالت میں ٹھہراؤ آئے تو مخرج میں حرکت اور گونج دار جھٹکا پیدا کیا جاتا ہے۔',
    descriptionEnglish: 'Echoing or bouncing sound produced when any of the letters (ق, ط, ب, ج, د) has a sukun or when stopping at an Ayah end.',
    exampleArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ',
    exampleTranslit: 'Qul huwa Allahu ahad. Allahu as-samad'
  },
  {
    id: 'madd_lazim',
    nameArabic: 'مَدّ لَازِم / مُتَّصِل / مُنْفَصِل',
    nameUrdu: 'مد (کھینچنا اور دراز کرنا)',
    nameEnglish: 'Madd (Prolongation - Long)',
    colorHex: '#dc2626',
    cssClass: 'tajweed-madd',
    durationHarakat: '4 سے 6 حرکات',
    letters: 'ا ، و ، ی کے اوپر مد کی علامت (~)',
    descriptionUrdu: 'حروفِ مدہ کے بعد سببِ مد (ہمزہ یا سکون/تشدید) آنے پر آواز کو 4 سے 6 حرکات تک خوبصورت انداز میں دراز کیا جاتا ہے۔',
    descriptionEnglish: 'Prolongation of sound for 4 to 6 counts due to a hamzah or sukun/shaddah following a madd letter.',
    exampleArabic: 'وَلَا الضَّالِّينَ ۝ إِذَا جَاءَ نَصْرُ اللَّهِ',
    exampleTranslit: 'Wa la ad-dallin / Iza ja\'a nasru Allahi'
  },
  {
    id: 'iqlab',
    nameArabic: 'إِقْلَاب (قلب النون ميماً)',
    nameUrdu: 'اقلاب (نون ساکن کو میم میں بدلنا)',
    nameEnglish: 'Iqlab (Conversion to Meem)',
    colorHex: '#d97706',
    cssClass: 'tajweed-iqlab',
    durationHarakat: '2 حرکات غنہ کے ساتھ',
    letters: 'ب (نون ساکن یا تنوین کے بعد)',
    descriptionUrdu: 'نون ساکن یا تنوین کے بعد حرف "ب" آئے تو نون کو خالص میم مخففہ میں بدل کر غنہ اور اخفاء کے ساتھ پڑھا جاتا ہے۔',
    descriptionEnglish: 'Changing Noon Sakin or Tanween into a concealed Meem with Ghunnah when followed by the letter Ba (ب).',
    exampleArabic: 'مِنْ بَعْدِ ۝ أَنْبِئْهُمْ ۝ كَلَّا لَيُنْبَذَنَّ',
    exampleTranslit: 'Mim-ba\'di / Layumba-zanna'
  },
  {
    id: 'ikhfa',
    nameArabic: 'إِخْفَاء حَقِيقِي',
    nameUrdu: 'اخفاء (آواز کو چھپانا)',
    nameEnglish: 'Ikhfa (Concealment with Nasalization)',
    colorHex: '#10b981',
    cssClass: 'tajweed-ghunnah',
    durationHarakat: '2 حرکات',
    letters: 'ت، ث، ج، د، ذ، ز، س، ش، ص، ض، ط، ظ، ف، ق، ك (15 حروف)',
    descriptionUrdu: 'نون ساکن یا تنوین کے بعد حروفِ اخفاء میں سے کوئی حرف آئے تو نون کی آواز ناک کے پردے میں چھپا کر ادا کی جاتی ہے۔',
    descriptionEnglish: 'Pronouncing the Noon Sakin or Tanween between Izhar and Idgham with nasal resonance when followed by one of the 15 Ikhfa letters.',
    exampleArabic: 'مِنْ قَبْلِكَ ۝ كُنْتُمْ ۝ مَنْ ذَا الَّذِي',
    exampleTranslit: 'Min qablika / Kuntum / Man zallazi'
  },
  {
    id: 'idgham',
    nameArabic: 'إِدْغَام (بغير غنة / بغنة)',
    nameUrdu: 'ادغام (حرف کو دوسرے میں ملانا)',
    nameEnglish: 'Idgham (Merging of Letters)',
    colorHex: '#7c3aed',
    cssClass: 'tajweed-idgham',
    durationHarakat: 'بلا غنہ (ل، ر) یا مع الغنہ (ی، ن، م، و)',
    letters: 'ی، ر، م، ل، و، ن (يَرْمَلُون)',
    descriptionUrdu: 'نون ساکن یا تنوین کے بعد یرملون کے حروف آئیں تو نون کو اگلے حرف میں مدغم کر دیا جاتا ہے۔',
    descriptionEnglish: 'Merging the first letter into the second so that they become one single stressed letter.',
    exampleArabic: 'مَنْ يَقُولُ ۝ مِنْ رَبِّهِمْ ۝ هُدًى لِلْمُتَّقِينَ',
    exampleTranslit: 'May-yaqool / Mir-rabbihim'
  },
  {
    id: 'silent',
    nameArabic: 'حُرُوف سَاقِطَة (لَا تُنْطَق)',
    nameUrdu: 'ساقط حروف (جو لکھے جاتے ہیں مگر پڑھے نہیں جاتے)',
    nameEnglish: 'Silent Letters',
    colorHex: '#9ca3af',
    cssClass: 'tajweed-silent',
    durationHarakat: 'بلا حرکت (ساکت)',
    letters: 'ہمزۃ الوصل، الف زائدہ، ل شمسية',
    descriptionUrdu: 'وہ حروف جو رسم الخط میں موجود ہوتے ہیں لیکن ملا کر پڑھتے وقت تلفظ میں ادا نہیں ہوتے۔',
    descriptionEnglish: 'Letters that are written in the Mushaf script but not pronounced during continuous recitation.',
    exampleArabic: 'وَالشَّمْسِ ۝ قَالُوا آمَنَّا ۝ بِسْمِ اللَّهِ',
    exampleTranslit: 'Wash-shamsi / Qaaloo aamanna'
  }
];
