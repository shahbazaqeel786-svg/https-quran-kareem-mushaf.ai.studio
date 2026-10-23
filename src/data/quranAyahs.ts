import { Ayah } from '../types/quran';

// Preloaded rich dataset for instant offline loading and immediate viewing
export const PRELOADED_SURAHS: Record<number, Ayah[]> = {
  // Surah 1: Al-Fatiha (The Opening)
  1: [
    {
      numberInSurah: 1,
      numberInQuran: 1,
      text: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      tajweedHtml: "<span class='tajweed-silent'>بِ</span><span class='tajweed-silent'>سْ</span>مِ اللَّهِ <span class='tajweed-silent'>ال</span>رَّحْمَ<span class='tajweed-madd'>ٰ</span>نِ <span class='tajweed-silent'>ال</span>رَّحِ<span class='tajweed-madd'>ي</span>مِ",
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے",
        urduMaududi: "اللہ کے نام سے جو رحمان و رحیم ہے",
        english: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
        englishKhattab: "In the Name of Allah—the Most Compassionate, Most Merciful.",
        hindi: "अल्लाह के नाम से जो बड़ा कृपालु और अत्यंत दयावान है।",
        indonesian: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang.",
        turkish: "Rahmân ve Rahîm olan Allah'ın adıyla.",
        french: "Au nom d'Allah, le Tout Miséricordieux, le Très Miséricordieux."
      },
      words: [
        { id: 1, arabic: "بِسْمِ", transliteration: "Bismi", urdu: "نام سے", english: "In the name" },
        { id: 2, arabic: "اللَّهِ", transliteration: "Allahi", urdu: "اللہ کے", english: "of Allah" },
        { id: 3, arabic: "الرَّحْمَٰنِ", transliteration: "Ar-Rahman", urdu: "نہایت مہربان", english: "the Entirely Merciful" },
        { id: 4, arabic: "الرَّحِيمِ", transliteration: "Ar-Raheem", urdu: "بہت رحم فرمانے والا", english: "the Especially Merciful" }
      ],
      tafseer: {
        ibnKathirUrdu: "تسمیہ ہر نیک کام کے آغاز میں سنت ہے۔ احادیثِ مبارکہ میں وارد ہے کہ جس کام کے شروع میں بسم اللہ نہ پڑھی جائے وہ برکت سے محروم رہتا ہے۔ رحمن و رحیم دونوں اللہ تعالیٰ کے صفاتی نام ہیں جن سے رحمتِ الٰہی کی وسعت اور تسلسل ظاہر ہوتا ہے۔",
        ibnKathirEnglish: "The Basmalah is recommended before beginning any deed. 'Ar-Rahman' and 'Ar-Rahim' are two names derived from Ar-Rahmah (mercy). Ar-Rahman has wider meaning of universal mercy.",
        maarifulQuranUrdu: "معارف القرآن: بسم اللہ کا مفہوم یہ ہے کہ بندہ اپنے ہر فعل کو اللہ تعالیٰ کے نام سے وابستہ کر کے اعتراف کرتا ہے کہ میری اپنی کوئی قوت نہیں، سب کچھ اللہ کی توفیق اور رحمت سے ہے۔",
        jalalaynUrdu: "تفسیر جلالین: آغاز کرتا ہوں اللہ کے نام سے، جو دنیا و آخرت میں مؤمنین و کافرین پر رحم فرمانے والا اور مومنوں کو خاص نوازنے والا ہے۔",
        asbabNuzulUrdu: "مکہ مکرمہ میں نازل ہوئی، اور نبی اکرم ﷺ پر جب پہلی وحی اتری تو جبرائیل امین نے بسم اللہ پڑھنے کی تلقین فرمائی۔"
      }
    },
    {
      numberInSurah: 2,
      numberInQuran: 2,
      text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      tajweedHtml: "<span class='tajweed-silent'>الْ</span>حَمْدُ لِلَّهِ رَبِّ <span class='tajweed-silent'>الْ</span>عَالَمِ<span class='tajweed-madd'>ي</span>نَ",
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "سب تعریف اللہ ہی کو زیبا ہے جو تمام جہانوں کا پالنے والا ہے",
        urduMaududi: "تعریف اللہ ہی کے لیے ہے جو تمام کائنات کا رب ہے",
        english: "[All] praise is [due] to Allah, Lord of the worlds -",
        englishKhattab: "All praise is for Allah—Lord of all worlds,",
        hindi: "सब प्रशंसा अल्लाह ही के लिए है जो सारे संसार का रब है।",
        indonesian: "Segala puji bagi Allah, Tuhan seluruh alam,",
        turkish: "Hamd, Âlemlerin Rabbi olan Allah'a mahsustur.",
        french: "Louange à Allah, Seigneur de l'univers."
      },
      words: [
        { id: 1, arabic: "الْحَمْدُ", transliteration: "Al-hamdu", urdu: "تمام تعریفیں و شکر", english: "All praise" },
        { id: 2, arabic: "لِلَّهِ", transliteration: "Lillahi", urdu: "اللہ ہی کے لیے", english: "is for Allah" },
        { id: 3, arabic: "رَبِّ", transliteration: "Rabbi", urdu: "پروردگار و مالک", english: "Lord" },
        { id: 4, arabic: "الْعَالَمِينَ", transliteration: "Al-'Alameen", urdu: "تمام جہانوں کا", english: "of the worlds" }
      ],
      tafseer: {
        ibnKathirUrdu: "الحمد میں الف لام استغراق کا ہے، یعنی تمام تعریفیں، کمالات اور شکر گزاری کی تمام صورتیں اللہ تعالیٰ کے لیے مختص ہیں۔ رب کا معنی ہے وہ ذات جو مخلوق کو مرحلہ وار کمال تک پہنچاتی ہے۔ عالمین سے مراد جن، انس، فرشتے اور کائنات کے تمام موجودات ہیں۔",
        ibnKathirEnglish: "Al-Hamd encompasses all gratitude, praise and glorification exclusively belonging to Allah. Rabb means the Owner, Master, Sustainer and Caretaker.",
        maarifulQuranUrdu: "حضرت عبداللہ بن عباسؓ فرماتے ہیں کہ الحمد للہ وہ کلمہ ہے جو تمام شکر گزار بندوں کا شعار ہے۔ جب انسان کو کوئی نعمت ملے تو یہ کہنا شکر کا حق ادا کرتا ہے۔"
      }
    },
    {
      numberInSurah: 3,
      numberInQuran: 3,
      text: "الرَّحْمَٰنِ الرَّحِيمِ",
      tajweedHtml: "<span class='tajweed-silent'>ال</span>رَّحْمَ<span class='tajweed-madd'>ٰ</span>نِ <span class='tajweed-silent'>ال</span>رَّحِ<span class='tajweed-madd'>ي</span>مِ",
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "نہایت مہربان بہت رحم فرمانے والا",
        urduMaududi: "بڑا مہربان اور نہایت رحم کرنے والا ہے",
        english: "The Entirely Merciful, the Especially Merciful,",
        englishKhattab: "the Most Compassionate, Most Merciful,",
        hindi: "बड़ा कृपालु, अत्यंत दयावान,",
        indonesian: "Yang Maha Pengasih, Maha Penyayang,",
        turkish: "O, Rahmân ve Rahîm'dir.",
        french: "Le Tout Miséricordieux, le Très Miséricordieux,"
      },
      words: [
        { id: 1, arabic: "الرَّحْمَٰنِ", transliteration: "Ar-Rahman", urdu: "نہایت مہربان", english: "The Most Gracious" },
        { id: 2, arabic: "الرَّحِيمِ", transliteration: "Ar-Raheem", urdu: "ہمیشہ رحم فرمانے والا", english: "The Most Merciful" }
      ],
      tafseer: {
        ibnKathirUrdu: "رب العالمین کے بعد الرحمٰن الرحیم کی تکرار اس لیے ہے تاکہ ربوبیت کے جلال کے ساتھ رحمت کی حلاوت مل جائے اور بندہ خوف اور رجا کے توازن میں رہے؛ اللہ کی ہیبت سے مایوس نہ ہو بلکہ اس کی بے پایاں رحمت پر بھروسہ رکھے۔"
      }
    },
    {
      numberInSurah: 4,
      numberInQuran: 4,
      text: "مَالِكِ يَوْمِ الدِّينِ",
      tajweedHtml: "مَ<span class='tajweed-madd'>ا</span>لِكِ يَوْمِ <span class='tajweed-silent'>ال</span>دِّ<span class='tajweed-madd'>ي</span>نِ",
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "روزِ جزا کا مالک و مختار",
        urduMaududi: "روزِ جزا کا مالک ہے",
        english: "Sovereign of the Day of Recompense.",
        englishKhattab: "Master of the Day of Judgment.",
        hindi: "बदले के दिन (क़यामत) का मालिक है।",
        indonesian: "Pemilik hari pembalasan.",
        turkish: "Ceza (ve mükâfat) gününün sahibidir.",
        french: "Maître du Jour de la rétribution."
      },
      words: [
        { id: 1, arabic: "مَالِكِ", transliteration: "Maliki", urdu: "مالک و خود مختار", english: "Master / Sovereign" },
        { id: 2, arabic: "يَوْمِ", transliteration: "Yawmi", urdu: "دن کا", english: "of the Day" },
        { id: 3, arabic: "الدِّينِ", transliteration: "Ad-Deen", urdu: "جزا اور حساب کتاب کے", english: "of Recompense" }
      ],
      tafseer: {
        ibnKathirUrdu: "یوم الدین سے مراد قیامت کا دن ہے جب تمام مخلوقات کا حساب کتاب اور بدلہ دیا جائے گا۔ اس دن تمام ظاہری بادشاہتیں ختم ہو جائیں گی اور صدا بلند ہوگی: 'لِّمَنِ الْمُلْكُ الْيَوْمَ ۖ لِلَّهِ الْوَاحِدِ الْقَهَّارِ' (آج کس کی بادشاہی ہے؟ صرف اللہ کی جو ایک اور سب پر غالب ہے)۔"
      }
    },
    {
      numberInSurah: 5,
      numberInQuran: 5,
      text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
      tajweedHtml: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِ<span class='tajweed-madd'>ي</span>نُ",
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "(اے پروردگار!) ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں",
        urduMaududi: "ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں",
        english: "It is You we worship and You we ask for help.",
        englishKhattab: "You ˹alone˺ we worship and You ˹alone˺ we ask for help.",
        hindi: "हम तेरी ही इबादत करते हैं और तुझ ही से मदद चाहते हैं।",
        indonesian: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan.",
        turkish: "(Rabbimiz!) Ancak sana kulluk eder ve yalnız senden yardım dileriz.",
        french: "C'est Toi [Seul] que nous adorons, et c'est Toi [Seul] dont nous implorons secours."
      },
      words: [
        { id: 1, arabic: "إِيَّاكَ", transliteration: "Iyyaka", urdu: "صرف تیری ہی", english: "You alone" },
        { id: 2, arabic: "نَعْبُدُ", transliteration: "Na'budu", urdu: "ہم بندگی و عبادت کرتے ہیں", english: "we worship" },
        { id: 3, arabic: "وَإِيَّاكَ", transliteration: "Wa-iyyaka", urdu: "اور صرف تجھ ہی سے", english: "and You alone" },
        { id: 4, arabic: "نَسْتَعِينُ", transliteration: "Nasta'een", urdu: "ہم مدد طلب کرتے ہیں", english: "we ask for help" }
      ],
      tafseer: {
        ibnKathirUrdu: "حدیث قدسی میں آتا ہے کہ اللہ تعالیٰ نے فرمایا: 'یہ میرے اور میرے بندے کے درمیان مشترک ہے، اور میرے بندے کے لیے وہ ہے جو اس نے مانگا'۔ پہلے عبادت کا ذکر شرک کے خاتمے کے لیے ہے اور استعانت کا ذکر عجب و خود پسندی کے تدارک کے لیے۔",
        maarifulQuranUrdu: "معارف القرآن: اس آیت میں توحید فی العبادت اور توحید فی الاستعانت دونوں کا مکمل اعلان ہے۔ غیر اللہ کے سامنے جھکنے سے مکمل برات اور ہر ضرورت میں صرف باری تعالیٰ کی طرف رجوع کا درس ملتا ہے۔"
      }
    },
    {
      numberInSurah: 6,
      numberInQuran: 6,
      text: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
      tajweedHtml: "<span class='tajweed-silent'>ا</span>هْدِنَا <span class='tajweed-silent'>الصِّ</span>رَاطَ <span class='tajweed-silent'>الْ</span>مُسْتَقِ<span class='tajweed-madd'>ي</span>مَ",
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "ہم کو سیدھے راستے کی ہدایت فرما",
        urduMaududi: "ہمیں سیدھا راستہ دکھا",
        english: "Guide us to the straight path -",
        englishKhattab: "Guide us along the Straight Path,",
        hindi: "हमें सीधा मार्ग दिखा,",
        indonesian: "Tunjukilah kami jalan yang lurus,",
        turkish: "Bizi doğru yola ilet;",
        french: "Guide-nous dans le droit chemin,"
      },
      words: [
        { id: 1, arabic: "اهْدِنَا", transliteration: "Ihdina", urdu: "ہمیں ہدایت و استقامت عطا فرما", english: "Guide us" },
        { id: 2, arabic: "الصِّرَاطَ", transliteration: "As-Sirata", urdu: "راستے کی", english: "to the Path" },
        { id: 3, arabic: "الْمُسْتَقِيمَ", transliteration: "Al-Mustaqeem", urdu: "جو بالکل سیدھا ہے", english: "the Straight" }
      ],
      tafseer: {
        ibnKathirUrdu: "صراط مستقیم سے مراد دینِ اسلام، قرآنِ کریم اور سنتِ رسول ﷺ ہے۔ ہدایت سے مراد راہ دکھانا بھی ہے اور اس پر ثابت قدمی و ترقی عطا کرنا بھی ہے۔ اس لیے مومن ہر نماز میں بار بار یہ دعا مانگتا ہے۔"
      }
    },
    {
      numberInSurah: 7,
      numberInQuran: 7,
      text: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
      tajweedHtml: "صِرَاطَ <span class='tajweed-silent'>الَّ</span>ذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ <span class='tajweed-silent'>الْ</span>مَغْضُوبِ عَلَيْهِمْ وَلَا <span class='tajweed-silent'>ال</span><span class='tajweed-madd'>ضَّآ</span><span class='tajweed-ghunnah'>لِّ</span><span class='tajweed-madd'>ي</span>نَ",
      juz: 1,
      manzil: 1,
      page: 1,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ ان کا جن پر تیرا غضب ہوا اور نہ گمراہوں کا",
        urduMaududi: "ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، جو معتوب نہیں ہوئے، جو بھٹکے ہوئے نہیں ہیں",
        english: "The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.",
        englishKhattab: "the Path of those You have blessed—not those You are displeased with, or those who are astray.",
        hindi: "उन लोगों का मार्ग जिन पर तूने कृपा की, उन लोगों का नहीं जिन पर तेरा प्रकोप हुआ और न भटके हुए लोगों का।",
        indonesian: "(yaitu) jalan orang-orang yang telah Engkau anugerahkan nikmat kepada mereka; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat.",
        turkish: "Kendilerine lütuf ve ikramda bulunduğun kimselerin yoluna; gazaba uğramışların ve sapmışların yoluna değil!",
        french: "le chemin de ceux que Tu as comblés de faveurs, non pas de ceux qui ont encouru Ta colère, ni des égarés."
      },
      words: [
        { id: 1, arabic: "صِرَاطَ", transliteration: "Sirata", urdu: "راستہ", english: "The path" },
        { id: 2, arabic: "الَّذِينَ", transliteration: "Allazeena", urdu: "ان کا جن پر", english: "of those" },
        { id: 3, arabic: "أَنْعَمْتَ", transliteration: "An'amta", urdu: "تو نے انعام کیا", english: "You have bestowed favor" },
        { id: 4, arabic: "عَلَيْهِمْ", transliteration: "'Alayhim", urdu: "ان پر", english: "upon them" },
        { id: 5, arabic: "غَيْرِ", transliteration: "Ghayril", urdu: "نہ کہ", english: "not of" },
        { id: 6, arabic: "الْمَغْضُوبِ", transliteration: "Maghdubi", urdu: "جن پر غضب نازل ہوا", english: "those who earned anger" },
        { id: 7, arabic: "عَلَيْهِمْ", transliteration: "'Alayhim", urdu: "ان پر", english: "upon them" },
        { id: 8, arabic: "وَلَا", transliteration: "Wa-la", urdu: "اور نہ ہی", english: "nor of" },
        { id: 9, arabic: "الضَّالِّينَ", transliteration: "Ad-Daalleen", urdu: "جو گمراہ ہو گئے", english: "those who went astray" }
      ],
      tafseer: {
        ibnKathirUrdu: "انعام یافتہ لوگوں کی وضاحت سورۃ النساء آیت 69 میں خود قرآن نے کر دی: 'مِّنَ النَّبِيِّينَ وَالصِّدِّيقِينَ وَالشُّهَدَاءِ وَالصَّالِحِينَ' (انبیاء، صدیقین، شہداء اور صالحین)۔ حدیث شریف (جامع ترمذی) میں نبی کریم ﷺ نے وضاحت فرمائی کہ مغضوب علیہم سے مراد یہود (جنہوں نے حق جاننے کے باوجود نافرمانی کی) اور ضالین سے مراد نصاریٰ (جو جہالت و غلو میں گمراہ ہوئے) ہیں۔",
        maarifulQuranUrdu: "معارف القرآن: اس دعا کے اختتام پر سنت ہے کہ 'آمین' کہی جائے جس کا مطلب ہے 'اے اللہ قبول فرما'۔"
      }
    }
  ],

  // Surah 112: Al-Ikhlas (The Sincerity)
  112: [
    {
      numberInSurah: 1,
      numberInQuran: 6222,
      text: "قُلْ هُوَ اللَّهُ أَحَدٌ",
      tajweedHtml: "قُ<span class='tajweed-qalqalah'>لْ</span> هُوَ اللَّهُ أَحَ<span class='tajweed-qalqalah'>دٌ</span>",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "کہو کہ وہ اللہ ایک ہے",
        urduMaududi: "کہو: وہ اللہ ہے، یکتا ہے",
        english: "Say, \"He is Allah, [who is] One,",
        englishKhattab: "Say, ˹O Prophet,˺ \"He is Allah—One ˹and Indivisible˺;",
        hindi: "कहो, \"वह अल्लाह यकता (अकेला) है।",
        indonesian: "Katakanlah (Muhammad), \"Dialah Allah, Yang Maha Esa.",
        turkish: "De ki: O, Allah birdir.",
        french: "Dis: «Il est Allah, Unique."
      },
      words: [
        { id: 1, arabic: "قُلْ", transliteration: "Qul", urdu: "فرما دیجیے", english: "Say" },
        { id: 2, arabic: "هُوَ", transliteration: "Huwa", urdu: "وہ", english: "He is" },
        { id: 3, arabic: "اللَّهُ", transliteration: "Allahu", urdu: "اللہ", english: "Allah" },
        { id: 4, arabic: "أَحَدٌ", transliteration: "Ahad", urdu: "ایک / یکتا", english: "One" }
      ],
      tafseer: {
        ibnKathirUrdu: "یہ سورۃ قرآن کا ثلث (ایک تہائی) ہے کیونکہ قرآن کے مضامین تین ہیں: عقائد و توحید، احکام، اور قصص و عبرت۔ یہ سورت خالص عقیدہ توحید پر مشتمل ہے۔ قریش نے رسول اللہ ﷺ سے سوال کیا تھا: 'ہمیں اپنے رب کا نسب بیان کیجیے؟' اس پر یہ سورت نازل ہوئی۔",
        maarifulQuranUrdu: "احد وہ ذات ہے جس کی ذات و صفات میں کوئی شریک، ہمسر یا مماثل نہیں۔ وہ زمان و مکان کی قید سے پاک ہے۔"
      }
    },
    {
      numberInSurah: 2,
      numberInQuran: 6223,
      text: "اللَّهُ الصَّمَدُ",
      tajweedHtml: "اللَّهُ <span class='tajweed-silent'>ال</span>صَّمَ<span class='tajweed-qalqalah'>دُ</span>",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "اللہ بے نیاز اور سب کا سہارا ہے",
        urduMaududi: "اللہ بے نیاز ہے اور سب اس کے محتاج ہیں",
        english: "Allah, the Eternal Refuge.",
        englishKhattab: "Allah—the Sustainer ˹needed by all˺.",
        hindi: "अल्लाह बेनियाज़ (सबका सहारा) है।",
        indonesian: "Allah tempat meminta segala sesuatu.",
        turkish: "Allah Samed'dir (her şey O'na muhtaçtır, O hiçbir şeye muhtaç değildir).",
        french: "Allah, Le Seul à être imploré pour ce que nous désirons."
      },
      words: [
        { id: 1, arabic: "اللَّهُ", transliteration: "Allahu", urdu: "اللہ", english: "Allah" },
        { id: 2, arabic: "الصَّمَدُ", transliteration: "As-Samad", urdu: "سب سے بے نیاز اور سب کا مقتدا", english: "The Eternal Refuge" }
      ],
      tafseer: {
        ibnKathirUrdu: "الصمد: وہ سردار جو اپنی سیادت میں کامل ہو، جس کی طرف تمام کائنات اپنی حاجات کے لیے رجوع کرتی ہے جبکہ وہ کسی کا محتاج نہیں۔ ابن عباسؓ نے فرمایا کہ صمد وہ ہے جو کھاتا پیتا نہیں اور جس کے لیے فنا نہیں۔"
      }
    },
    {
      numberInSurah: 3,
      numberInQuran: 6224,
      text: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
      tajweedHtml: "لَمْ يَلِ<span class='tajweed-qalqalah'>دْ</span> وَلَمْ يُولَ<span class='tajweed-qalqalah'>دْ</span>",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے",
        urduMaududi: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے",
        english: "He neither begets nor is born,",
        englishKhattab: "He has never had offspring, nor was He born.",
        hindi: "न उसने किसी को जना और न वह जना गया।",
        indonesian: "(Allah) tidak beranak dan tidak pula diperanakkan,",
        turkish: "O, doğurmamış ve doğmamıştır.",
        french: "Il n'a jamais engendré, n'a pas été engendré non plus."
      },
      words: [
        { id: 1, arabic: "لَمْ", transliteration: "Lam", urdu: "نہ", english: "Not" },
        { id: 2, arabic: "يَلِدْ", transliteration: "Yalid", urdu: "اس نے جنا", english: "He begot" },
        { id: 3, arabic: "وَلَمْ", transliteration: "Wa-lam", urdu: "اور نہ", english: "and not" },
        { id: 4, arabic: "يُولَدْ", transliteration: "Yoolad", urdu: "وہ جنا گیا", english: "He was begotten" }
      ],
      tafseer: {
        ibnKathirUrdu: "یہود و نصاریٰ اور مشرکینِ عرب کے تمام گمراہ کن عقائد (کہ فرشتے اللہ کی بیٹیاں ہیں یا عزیر و عیسیٰ اللہ کے بیٹے ہیں) کی جڑ کاٹ دی گئی۔ اللہ تعالیٰ نسل، ولادت اور توالد کے مادی قوانین سے پاک ہے۔"
      }
    },
    {
      numberInSurah: 4,
      numberInQuran: 6225,
      text: "وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ",
      tajweedHtml: "وَلَمْ يَكُ<span class='tajweed-idgham'>نْ لَ</span>هُ كُفُوًا أَحَ<span class='tajweed-qalqalah'>دٌ</span>",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "اور کوئی اس کا ہمسر اور برابری کرنے والا نہیں ہے",
        urduMaududi: "اور کوئی اس کا ہمسر نہیں ہے",
        english: "Nor is there to Him any equivalent.\"",
        englishKhattab: "And there is none comparable to Him.\"",
        hindi: "और कोई उसका समकक्ष नहीं है।\"",
        indonesian: "dan tidak ada sesuatu yang setara dengan Dia.\"",
        turkish: "Ve hiçbir şey O'nun dengi değildir.",
        french: "Et nul n'est égal à Lui»."
      },
      words: [
        { id: 1, arabic: "وَلَمْ", transliteration: "Wa-lam", urdu: "اور نہیں ہے", english: "And not" },
        { id: 2, arabic: "يَكُنْ", transliteration: "Yakun", urdu: "کوئی ہوا", english: "is" },
        { id: 3, arabic: "لَهُ", transliteration: "Lahu", urdu: "اس کے واسطے", english: "for Him" },
        { id: 4, arabic: "كُفُوًا", transliteration: "Kufuwan", urdu: "برابر و ہمسر", english: "equal / comparable" },
        { id: 5, arabic: "أَحَدٌ", transliteration: "Ahad", urdu: "کوئی ایک بھی", english: "anyone" }
      ],
      tafseer: {
        ibnKathirUrdu: "کفو کا معنی نظیر، ہم پلہ اور شریک ہے۔ پوری کائنات میں کوئی ہستی نہ ذات میں، نہ صفات میں، نہ اختیارات میں اللہ تعالیٰ کی برابری کر سکتی ہے۔ 'لَيْسَ كَمِثْلِهِ شَيْءٌ ۖ وَهُوَ السَّمِيعُ الْبَصِيرُ'۔"
      }
    }
  ],

  // Surah 113: Al-Falaq (The Daybreak)
  113: [
    {
      numberInSurah: 1,
      numberInQuran: 6226,
      text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
      tajweedHtml: "قُ<span class='tajweed-qalqalah'>لْ</span> أَعُوذُ بِرَبِّ <span class='tajweed-silent'>الْ</span>فَلَ<span class='tajweed-qalqalah'>قِ</span>",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "کہو کہ میں صبح کے پروردگار کی پناہ مانگتا ہوں",
        urduMaududi: "کہو، میں پناہ مانگتا ہوں صبح کے رب کی",
        english: "Say, \"I seek refuge in the Lord of daybreak",
        englishKhattab: "Say, ˹O Prophet,˺ \"I seek refuge in the Lord of the daybreak",
        hindi: "कहो, \"मैं पनाह माँगता हूँ सुबह के रब की,",
        indonesian: "Katakanlah, \"Aku berlindung kepada Tuhan yang menguasai subuh (fajar),",
        turkish: "De ki: Sabahın Rabbine sığınırım,",
        french: "Dis: «Je cherche protection auprès du Seigneur de l'aube naissante,"
      },
      words: [
        { id: 1, arabic: "قُلْ", transliteration: "Qul", urdu: "فرما دیجیے", english: "Say" },
        { id: 2, arabic: "أَعُوذُ", transliteration: "A'oodhu", urdu: "میں پناہ مانگتا ہوں", english: "I seek refuge" },
        { id: 3, arabic: "بِرَبِّ", transliteration: "Bi-Rabbi", urdu: "پروردگار کی", english: "in the Lord" },
        { id: 4, arabic: "الْفَلَقِ", transliteration: "Al-Falaq", urdu: "صبح نمودار کرنے والے کی", english: "of the daybreak" }
      ],
      tafseer: {
        ibnKathirUrdu: "معوذتین (سورۃ الفلق اور سورۃ الناس) جادو، نظرِ بد اور ہر قسم کے شرور سے پناہ مانگنے کے لیے سب سے عظیم ترین حفاظتی دعائیں ہیں۔ فلق سے مراد صبح کی وہ روشنی ہے جو رات کے گھپ اندھیرے کو چیر کر نکلتی ہے۔",
        asbabNuzulUrdu: "لبید بن اعصم یہودی نے نبی کریم ﷺ پر جادو کیا تھا جس کے اثر کو زائل کرنے کے لیے اللہ تعالیٰ نے یہ دونوں سورتیں نازل فرمائیں۔ جب آپؐ ایک ایک آیت تلاوت فرماتے تو جادو کی گرہیں کھلتی جاتی تھیں۔"
      }
    },
    {
      numberInSurah: 2,
      numberInQuran: 6227,
      text: "مِنْ شَرِّ مَا خَلَقَ",
      tajweedHtml: "مِ<span class='tajweed-ghunnah'>نْ شَ</span>رِّ مَا خَلَ<span class='tajweed-qalqalah'>قَ</span>",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "ہر اس چیز کی برائی سے جو اس نے پیدا کی",
        urduMaududi: "ہر اس چیز کے شر سے جو اس نے پیدا کی ہے",
        english: "From the evil of that which He created",
        englishKhattab: "from the evil of whatever He has created,",
        hindi: "उस चीज़ की बुराई से जो उसने पैदा की,",
        indonesian: "dari kejahatan (makhluk yang) Dia ciptakan,",
        turkish: "Yarattığı şeylerin şerrinden,",
        french: "contre le mal des êtres qu'Il a créés,"
      },
      words: [
        { id: 1, arabic: "مِنْ", transliteration: "Min", urdu: "سے", english: "From" },
        { id: 2, arabic: "شَرِّ", transliteration: "Sharri", urdu: "برائی و شر سے", english: "evil" },
        { id: 3, arabic: "مَا", transliteration: "Ma", urdu: "اس چیز کی جو", english: "that which" },
        { id: 4, arabic: "خَلَقَ", transliteration: "Khalaq", urdu: "اس نے پیدا کی", english: "He created" }
      ],
      tafseer: {
        ibnKathirUrdu: "کائنات کی تمام مخلوقات—انسان، جنات، درندے، موذی جانور اور بیماریاں—کی برائیوں سے اللہ کی حفاظت طلب کی گئی ہے۔"
      }
    },
    {
      numberInSurah: 3,
      numberInQuran: 6228,
      text: "وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ",
      tajweedHtml: "وَمِ<span class='tajweed-ghunnah'>نْ شَ</span>رِّ غَاسِ<span class='tajweed-ghunnah'>قٍ إِ</span>ذَا وَقَ<span class='tajweed-qalqalah'>بَ</span>",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "اور اندھیری رات کی برائی سے جب وہ چھا جائے",
        urduMaududi: "اور رات کی تاریکی کے شر سے جب وہ چھا جائے",
        english: "And from the evil of darkness when it settles",
        englishKhattab: "and from the evil of the night when it grows dark,",
        hindi: "और अंधेरी रात की बुराई से जब वह छा जाए,",
        indonesian: "dan dari kejahatan malam apabila telah gelap gulita,",
        turkish: "Karanlığı çöktüğü zaman gecenin şerrinden,",
        french: "contre le mal de l'obscurité quand elle s'approfondit,"
      },
      words: [
        { id: 1, arabic: "وَمِنْ", transliteration: "Wa-min", urdu: "اور سے", english: "And from" },
        { id: 2, arabic: "شَرِّ", transliteration: "Sharri", urdu: "برائی سے", english: "evil of" },
        { id: 3, arabic: "غَاسِقٍ", transliteration: "Ghasiqin", urdu: "اندھیری رات کے", english: "darkness" },
        { id: 4, arabic: "إِذَا", transliteration: "Iza", urdu: "جب کہ", english: "when" },
        { id: 5, arabic: "وَقَبَ", transliteration: "Waqab", urdu: "وہ چھا جائے", english: "it settles" }
      ],
      tafseer: {
        ibnKathirUrdu: "رات کے پھیل جانے پر شیاطین اور برے عناصر منتشر ہوتے ہیں، اس لیے رات کی تاریکی کے شر سے حفاظت کی خصوصی دعا کی گئی۔"
      }
    },
    {
      numberInSurah: 4,
      numberInQuran: 6229,
      text: "وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
      tajweedHtml: "وَمِ<span class='tajweed-ghunnah'>نْ شَ</span>رِّ <span class='tajweed-silent'>ال</span><span class='tajweed-ghunnah'>نَّ</span>فَّاثَاتِ فِي <span class='tajweed-silent'>الْ</span>عُقَ<span class='tajweed-qalqalah'>دِ</span>",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "اور گرہوں میں پھونکنے والیوں (جادوگرنیوں) کی برائی سے",
        urduMaududi: "اور گرہوں میں پھونکنے والوں کے شر سے",
        english: "And from the evil of the blowers in knots",
        englishKhattab: "and from the evil of those who blow on knots,",
        hindi: "और गांठों में फूंकने वालों (जादूगरों) की बुराई से,",
        indonesian: "dan dari kejahatan (perempuan-perempuan) penyihir yang meniup pada buhul-buhul (talinya),",
        turkish: "Düğümlere üfleyenlerin şerrinden,",
        french: "contre le mal de celles qui soufflent sur les nœuds,"
      },
      words: [
        { id: 1, arabic: "وَمِنْ", transliteration: "Wa-min", urdu: "اور سے", english: "And from" },
        { id: 2, arabic: "شَرِّ", transliteration: "Sharri", urdu: "برائی سے", english: "evil of" },
        { id: 3, arabic: "النَّفَّاثَاتِ", transliteration: "An-Naffathati", urdu: "پھونک مارنے والوں کی", english: "the blowers" },
        { id: 4, arabic: "فِي", transliteration: "Fee", urdu: "میں", english: "in" },
        { id: 5, arabic: "الْعُقَدِ", transliteration: "Al-'Uqad", urdu: "گرہوں (گنڈوں) کے", english: "the knots" }
      ],
      tafseer: {
        ibnKathirUrdu: "النفاثات سے مراد جادوگر ہیں جو دھاگوں میں گرہ لگا کر اس پر کلماتِ کفر پھونکتے ہیں۔ اسلام میں جادو حرام اور گناہِ کبیرہ ہے اور اس کا علاج قرآن کی ان آیات سے کیا جاتا ہے۔"
      }
    },
    {
      numberInSurah: 5,
      numberInQuran: 6230,
      text: "وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
      tajweedHtml: "وَمِ<span class='tajweed-ghunnah'>نْ شَ</span>رِّ حَاسِ<span class='tajweed-ghunnah'>دٍ إِ</span>ذَا حَسَ<span class='tajweed-qalqalah'>دَ</span>",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "اور حسد کرنے والے کی برائی سے جب وہ حسد کرے",
        urduMaududi: "اور حاسد کے شر سے جب کہ وہ حسد کرے",
        english: "And from the evil of an envier when he envies.\"",
        englishKhattab: "and from the evil of an envier when they envy.\"",
        hindi: "और ईर्ष्या करने वाले (हसद करने वाले) की बुराई से जब वह ईर्ष्या करे।\"",
        indonesian: "dan dari kejahatan orang yang dengki apabila dia dengki.\"",
        turkish: "Ve haset ettiği zaman hasetçinin şerrinden.",
        french: "et contre le mal de l'envieux quand il envie»."
      },
      words: [
        { id: 1, arabic: "وَمِنْ", transliteration: "Wa-min", urdu: "اور سے", english: "And from" },
        { id: 2, arabic: "شَرِّ", transliteration: "Sharri", urdu: "برائی سے", english: "evil of" },
        { id: 3, arabic: "حَاسِدٍ", transliteration: "Hasidin", urdu: "حسد کرنے والے کے", english: "an envier" },
        { id: 4, arabic: "إِذَا", transliteration: "Iza", urdu: "جب کہ", english: "when" },
        { id: 5, arabic: "حَسَدَ", transliteration: "Hasad", urdu: "وہ حسد کرے", english: "he envies" }
      ],
      tafseer: {
        ibnKathirUrdu: "حسد یہ ہے کہ انسان دوسرے کی نعمت کے زوال کی تمنا کرے۔ حدیث میں ہے: 'حسد نیکیوں کو اس طرح کھا جاتا ہے جیسے آگ لکڑیوں کو کھاتی ہے'۔ جب حاسد اپنے دل کے حسد کو عملی شکل دے تو اس کے شر سے اللہ ہی بچا سکتا ہے۔"
      }
    }
  ],

  // Surah 114: An-Nas (Mankind)
  114: [
    {
      numberInSurah: 1,
      numberInQuran: 6231,
      text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
      tajweedHtml: "قُ<span class='tajweed-qalqalah'>لْ</span> أَعُوذُ بِرَبِّ <span class='tajweed-silent'>ال</span><span class='tajweed-ghunnah'>نَّ</span><span class='tajweed-madd'>ا</span>سِ",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "کہو کہ میں انسانوں کے پروردگار کی پناہ مانگتا ہوں",
        urduMaududi: "کہو، میں پناہ مانگتا ہوں انسانوں کے رب",
        english: "Say, \"I seek refuge in the Lord of mankind,",
        englishKhattab: "Say, ˹O Prophet,˺ \"I seek refuge in the Lord of humankind,",
        hindi: "कहो, \"मैं पनाह माँगता हूँ इंसानों के रब की,",
        indonesian: "Katakanlah, \"Aku berlindung kepada Tuhannya manusia,",
        turkish: "De ki: İnsanların Rabbine sığınırım,",
        french: "Dis: «Je cherche protection auprès du Seigneur des hommes."
      },
      words: [
        { id: 1, arabic: "قُلْ", transliteration: "Qul", urdu: "فرما دیجیے", english: "Say" },
        { id: 2, arabic: "أَعُوذُ", transliteration: "A'oodhu", urdu: "میں پناہ مانگتا ہوں", english: "I seek refuge" },
        { id: 3, arabic: "بِرَبِّ", transliteration: "Bi-Rabbi", urdu: "پروردگار کی", english: "in the Lord" },
        { id: 4, arabic: "النَّاسِ", transliteration: "An-Naas", urdu: "تمام انسانوں کے", english: "of mankind" }
      ],
      tafseer: {
        ibnKathirUrdu: "اللہ تعالیٰ کی تین عظیم صفات کا واسطہ دے کر پناہ مانگی گئی ہے: رب الناس (انسانوں کا پالنہار)، ملک الناس (حقیقی بادشاہ)، اور الہ الناس (سچا معبود)۔ وسوسہ اور باطنی حملے جسمانی شر سے زیادہ خطرناک ہوتے ہیں۔"
      }
    },
    {
      numberInSurah: 2,
      numberInQuran: 6232,
      text: "مَلِكِ النَّاسِ",
      tajweedHtml: "مَلِكِ <span class='tajweed-silent'>ال</span><span class='tajweed-ghunnah'>نَّ</span><span class='tajweed-madd'>ا</span>سِ",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "جو تمام انسانوں کا بادشاہ ہے",
        urduMaududi: "انسانوں کے بادشاہ",
        english: "The Sovereign of mankind.",
        englishKhattab: "the Master of humankind,",
        hindi: "इंसानों के बादशाह की,",
        indonesian: "Raja manusia,",
        turkish: "İnsanların hükümdarına,",
        french: "Le Souverain des hommes,"
      },
      words: [
        { id: 1, arabic: "مَلِكِ", transliteration: "Maliki", urdu: "بادشاہ و فرماں روا", english: "The King" },
        { id: 2, arabic: "النَّاسِ", transliteration: "An-Naas", urdu: "تمام انسانوں کا", english: "of mankind" }
      ]
    },
    {
      numberInSurah: 3,
      numberInQuran: 6233,
      text: "إِلَٰهِ النَّاسِ",
      tajweedHtml: "إِلَ<span class='tajweed-madd'>ٰ</span>هِ <span class='tajweed-silent'>ال</span><span class='tajweed-ghunnah'>نَّ</span><span class='tajweed-madd'>ا</span>سِ",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "جو انسانوں کا حقیقی معبود ہے",
        urduMaududi: "انسانوں کے حقیقی معبود کی",
        english: "The God of mankind,",
        englishKhattab: "the God of humankind,",
        hindi: "इंसानों के सच्चे पूज्य की,",
        indonesian: "sembahan manusia,",
        turkish: "İnsanların ilâhına,",
        french: "Le Dieu des hommes,"
      },
      words: [
        { id: 1, arabic: "إِلَٰهِ", transliteration: "Ilahi", urdu: "سچے معبود کی", english: "The God" },
        { id: 2, arabic: "النَّاسِ", transliteration: "An-Naas", urdu: "تمام انسانوں کے", english: "of mankind" }
      ]
    },
    {
      numberInSurah: 4,
      numberInQuran: 6234,
      text: "مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
      tajweedHtml: "مِ<span class='tajweed-ghunnah'>نْ شَ</span>رِّ <span class='tajweed-silent'>الْ</span>وَسْوَاسِ <span class='tajweed-silent'>الْ</span>خَ<span class='tajweed-ghunnah'>نَّ</span><span class='tajweed-madd'>ا</span>سِ",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "بار بار وسوسہ ڈالنے والے، پیچھے ہٹ جانے والے شیطان کی برائی سے",
        urduMaududi: "اس وسوسہ انداز کے شر سے جو بار بار پلٹ کر آتا ہے",
        english: "From the evil of the retreating whisperer -",
        englishKhattab: "from the evil of the lurking whisperer—",
        hindi: "बार-बार वसवसा डालने वाले पीछे हटने वाले शैतान की बुराई से,",
        indonesian: "dari kejahatan (bisikan) setan yang bersembunyi,",
        turkish: "O sinsi vesvesecinin şerrinden,",
        french: "contre le mal du mauvais conseiller, furtif,"
      },
      words: [
        { id: 1, arabic: "مِنْ", transliteration: "Min", urdu: "سے", english: "From" },
        { id: 2, arabic: "شَرِّ", transliteration: "Sharri", urdu: "برائی سے", english: "the evil" },
        { id: 3, arabic: "الْوَسْوَاسِ", transliteration: "Al-Waswaas", urdu: "وسوسہ ڈالنے والے کے", english: "of the whisperer" },
        { id: 4, arabic: "الْخَنَّاسِ", transliteration: "Al-Khannaas", urdu: "بار بار چھپ جانے والے کے", english: "who withdraws" }
      ],
      tafseer: {
        ibnKathirUrdu: "الخناس: وہ شیطان جو دل پر اس وقت مسلط ہوتا ہے جب انسان غافل ہو، لیکن جیسے ہی انسان اللہ کا ذکر کرتا ہے تو وہ سمٹ کر پیچھے ہٹ جاتا ہے۔ ذکر الٰہی شیطان کے وسوسوں کے خلاف سب سے بڑی ڈھال ہے۔"
      }
    },
    {
      numberInSurah: 5,
      numberInQuran: 6235,
      text: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
      tajweedHtml: "<span class='tajweed-silent'>الَّ</span>ذِي يُوَسْوِسُ فِي صُدُورِ <span class='tajweed-silent'>ال</span><span class='tajweed-ghunnah'>نَّ</span><span class='tajweed-madd'>ا</span>سِ",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "جو لوگوں کے سینوں میں وسوسے ڈالتا ہے",
        urduMaududi: "جو لوگوں کے دلوں میں وسوسے ڈالتا ہے",
        english: "Who whispers into the breasts of mankind -",
        englishKhattab: "who whispers into the hearts of humankind—",
        hindi: "जो लोगों के सीनों में वसवसे डालता है,",
        indonesian: "yang membisikkan (kejahatan) ke dalam dada manusia,",
        turkish: "Ki o insanların göğüslerine vesvese verir,",
        french: "qui souffle le mal dans les poitrines des hommes,"
      },
      words: [
        { id: 1, arabic: "الَّذِي", transliteration: "Allazee", urdu: "جو کہ", english: "Who" },
        { id: 2, arabic: "يُوَسْوِسُ", transliteration: "Yuwaswisu", urdu: "وسوسہ ڈالتا ہے", english: "whispers" },
        { id: 3, arabic: "فِي", transliteration: "Fee", urdu: "میں", english: "in" },
        { id: 4, arabic: "صُدُورِ", transliteration: "Sudoori", urdu: "سینوں کے", english: "the chests" },
        { id: 5, arabic: "النَّاسِ", transliteration: "An-Naas", urdu: "انسانوں کے", english: "of mankind" }
      ]
    },
    {
      numberInSurah: 6,
      numberInQuran: 6236,
      text: "مِنَ الْجِنَّةِ وَالنَّاسِ",
      tajweedHtml: "مِنَ <span class='tajweed-silent'>الْ</span>جِ<span class='tajweed-ghunnah'>نَّ</span>ةِ وَ<span class='tajweed-silent'>ال</span><span class='tajweed-ghunnah'>نَّ</span><span class='tajweed-madd'>ا</span>سِ",
      juz: 30,
      manzil: 7,
      page: 604,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "خواہ وہ جنات میں سے ہو یا انسانوں میں سے",
        urduMaududi: "خواہ وہ جنوں میں سے ہو یا انسانوں میں سے",
        english: "From among the jinn and mankind.\"",
        englishKhattab: "from among jinn and humankind.\"",
        hindi: "चाहे वह जिन्नों में से हो या इंसानों में से।\"",
        indonesian: "dari (golongan) jin dan manusia.\"",
        turkish: "Gerek cinlerden, gerek insanlardan.",
        french: "qu'il soit, (ce conseiller), un djinn ou un être humain»."
      },
      words: [
        { id: 1, arabic: "مِنَ", transliteration: "Mina", urdu: "خواہ", english: "From" },
        { id: 2, arabic: "الْجِنَّةِ", transliteration: "Al-Jinnati", urdu: "جنات میں سے ہوں", english: "the jinn" },
        { id: 3, arabic: "وَالنَّاسِ", transliteration: "Wan-Naas", urdu: "یا انسانوں میں سے", english: "and mankind" }
      ],
      tafseer: {
        ibnKathirUrdu: "وسوسہ انداز اور گمراہ کرنے والے صرف شیاطینِ جن نہیں ہوتے بلکہ شیاطینِ انس (برے ہم نشین، بدکردار مشیر اور گمراہ کن لوگ) بھی انسان کے دل میں شبہات اور برائی ڈالتے ہیں، اس لیے دونوں قسم کے شرور سے اللہ کی پناہ طلب کرنی چاہیے۔"
      }
    }
  ],

  // Surah 108: Al-Kawthar (The Abundance)
  108: [
    {
      numberInSurah: 1,
      numberInQuran: 6205,
      text: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
      tajweedHtml: "إِ<span class='tajweed-ghunnah'>نَّ</span><span class='tajweed-madd'>آ</span> أَعْطَيْنَاكَ <span class='tajweed-silent'>الْ</span>كَوْثَ<span class='tajweed-qalqalah'>رَ</span>",
      juz: 30,
      manzil: 7,
      page: 602,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "(اے پیغمبر!) ہم نے تم کو کوثر (بے انتہا خیر) عطا فرمایا ہے",
        urduMaududi: "ہم نے تمہیں کوثر عطا کر دیا",
        english: "Indeed, We have granted you, [O Muhammad], al-Kawthar.",
        englishKhattab: "Indeed, We have granted you ˹O Prophet˺ abundant goodness.",
        hindi: "(ऐ पैग़म्बर!) हमने तुम्हें कौसर (अत्यधिक भलाई) प्रदान की।",
        indonesian: "Sungguh, Kami telah memberimu (Muhammad) nikmat yang banyak.",
        turkish: "(Resûlüm!) Şüphesiz biz sana Kevser'i verdik.",
        french: "Nous t'avons certes, accordé l'Abondance."
      },
      words: [
        { id: 1, arabic: "إِنَّا", transliteration: "Inna", urdu: "بے شک ہم نے", english: "Indeed, We" },
        { id: 2, arabic: "أَعْطَيْنَاكَ", transliteration: "A'taynaka", urdu: "آپ کو عطا فرمایا", english: "have granted you" },
        { id: 3, arabic: "الْكَوْثَرَ", transliteration: "Al-Kawthar", urdu: "کوثر (خیرِ کثیر)", english: "Al-Kawthar" }
      ],
      tafseer: {
        ibnKathirUrdu: "الکوثر فوعل کے وزن پر کثرت سے ماخوذ ہے، یعنی خیرِ کثیر۔ اس میں حوضِ کوثر اور جنت کی وہ نہر بھی شامل ہے جس کے دونوں کنارے سونے کے اور برتن آسمان کے تاروں کے برابر ہیں، جس کا پانی دودھ سے زیادہ سفید اور شہد سے زیادہ میٹھا ہے۔ جو اس سے ایک گھونٹ پی لے گا وہ کبھی پیاسا نہ ہوگا۔",
        asbabNuzulUrdu: "جب نبی کریم ﷺ کے صاحبزادے قاسم کا انتقال ہوا تو عاص بن وائل اور مشرکین نے طعنہ دیا کہ محمد (ﷺ) ابتر (بے نام و نشان) ہو گئے، ان کا کوئی ذکر باقی نہیں رہے گا۔ اس پر اللہ تعالیٰ نے اپنے حبیب ﷺ کی تسلی کے لیے یہ سورۃ نازل فرمائی کہ آپ کا ذکر اور دین تا قیامت بلند رہے گا۔"
      }
    },
    {
      numberInSurah: 2,
      numberInQuran: 6206,
      text: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
      tajweedHtml: "فَصَلِّ لِرَبِّكَ وَ<span class='tajweed-silent'>ا</span><span class='tajweed-ghunnah'>نْ</span>حَ<span class='tajweed-qalqalah'>رْ</span>",
      juz: 30,
      manzil: 7,
      page: 602,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "پس اپنے پروردگار کے لیے نماز پڑھو اور قربانی کرو",
        urduMaududi: "پس تم اپنے رب ہی کے لیے نماز پڑھو اور قربانی کرو",
        english: "So pray to your Lord and sacrifice [to Him alone].",
        englishKhattab: "So pray and sacrifice to your Lord ˹alone˺.",
        hindi: "तो अपने रब के लिए नमाज़ पढ़ो और क़ुरबानी करो।",
        indonesian: "Maka laksanakanlah salat karena Tuhanmu, dan berkurbanlah.",
        turkish: "Şimdi sen Rabbine kulluk et ve kurban kes.",
        french: "Accomplis donc la Salāt pour ton Seigneur et sacrifie."
      },
      words: [
        { id: 1, arabic: "فَصَلِّ", transliteration: "Fa-salli", urdu: "پس آپ نماز پڑھیے", english: "So pray" },
        { id: 2, arabic: "لِرَبِّكَ", transliteration: "Li-Rabbika", urdu: "اپنے رب کی رضا کے لیے", english: "to your Lord" },
        { id: 3, arabic: "وَانْحَرْ", transliteration: "Wan-har", urdu: "اور قربانی کیجیے", english: "and sacrifice" }
      ],
      tafseer: {
        ibnKathirUrdu: "مشرکین بتوں کے آگے سجدہ کرتے اور ان کے نام پر جانور ذبح کرتے تھے، اللہ تعالیٰ نے حکم دیا کہ آپ کی نماز بھی صرف اللہ کے لیے ہو اور آپ کی قربانی بھی صرف اللہ کے بابرکت نام پر ہو۔"
      }
    },
    {
      numberInSurah: 3,
      numberInQuran: 6207,
      text: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
      tajweedHtml: "إِ<span class='tajweed-ghunnah'>نَّ</span> شَانِئَكَ هُوَ <span class='tajweed-silent'>الْ</span>أَبْتَ<span class='tajweed-qalqalah'>رُ</span>",
      juz: 30,
      manzil: 7,
      page: 602,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "بے شک تمہارا دشمن ہی بے نام و نشان رہے گا",
        urduMaududi: "تمہارا دشمن ہی دراصل جڑ کٹا ہے",
        english: "Indeed, your enemy is the one cut off.",
        englishKhattab: "Only the one who hates you is truly cut off ˹from any goodness˺.",
        hindi: "निस्संदेह तुम्हारा शत्रु ही बेनाम व निशान रहेगा।",
        indonesian: "Sungguh, orang-orang yang membenci kamu dialah yang terputus (dari rahmat Allah).",
        turkish: "Doğrusu sana buğzeden, asıl sonu kesik olandır.",
        french: "Celui qui te hait sera certes, sans postérité."
      },
      words: [
        { id: 1, arabic: "إِنَّ", transliteration: "Inna", urdu: "بے شک", english: "Indeed" },
        { id: 2, arabic: "شَانِئَكَ", transliteration: "Shaani'aka", urdu: "آپ کا دشمن", english: "your enemy" },
        { id: 3, arabic: "هُوَ", transliteration: "Huwa", urdu: "وہی", english: "he is" },
        { id: 4, arabic: "الْأَبْتَرُ", transliteration: "Al-Abtar", urdu: "بے نام و نشان اور جڑ کٹا ہے", english: "the cut off" }
      ],
      tafseer: {
        ibnKathirUrdu: "اللہ تعالیٰ کی پیشین گوئی حرف بہ حرف پوری ہوئی: آپؐ کا دشمن مٹ گیا اور رسول اللہ ﷺ کا نام نامی دنیا کے ہر گوشے میں اذانوں اور درود و سلام کے ذریعے ہر پل گونج رہا ہے۔"
      }
    }
  ],

  // Surah 103: Al-Asr (The Declining Day)
  103: [
    {
      numberInSurah: 1,
      numberInQuran: 6177,
      text: "وَالْعَصْرِ",
      tajweedHtml: "وَ<span class='tajweed-silent'>الْ</span>عَصْ<span class='tajweed-qalqalah'>رِ</span>",
      juz: 30,
      manzil: 7,
      page: 601,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "زمانے کی قسم!",
        urduMaududi: "زمانے کی قسم",
        english: "By time,",
        englishKhattab: "By the ˹passage of˺ time!",
        hindi: "ज़माने की क़सम!",
        indonesian: "Demi masa,",
        turkish: "Asra yemin olsun ki,",
        french: "Par le Temps!"
      },
      words: [
        { id: 1, arabic: "وَ", transliteration: "Wa", urdu: "قسم ہے", english: "By" },
        { id: 2, arabic: "الْعَصْرِ", transliteration: "Al-'Asr", urdu: "زمانے و وقت کی", english: "the time" }
      ],
      tafseer: {
        ibnKathirUrdu: "امام شافعیؒ نے فرمایا کہ اگر اللہ تعالیٰ اپنی مخلوق پر قرآن میں سے صرف اسی سورت کو نازل فرماتا تو یہ ان کے لیے کافی تھی۔ وقت انسان کا اصل سرمایہ ہے جو تیزی سے گزر رہا ہے۔"
      }
    },
    {
      numberInSurah: 2,
      numberInQuran: 6178,
      text: "إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ",
      tajweedHtml: "إِ<span class='tajweed-ghunnah'>نَّ</span> <span class='tajweed-silent'>الْ</span>إِ<span class='tajweed-ghunnah'>نْ</span>سَانَ لَفِي خُسْ<span class='tajweed-qalqalah'>رٍ</span>",
      juz: 30,
      manzil: 7,
      page: 601,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "بے شک انسان سراسر خسارے اور نقصان میں ہے",
        urduMaududi: "بے شک انسان بڑے خسارے میں ہے",
        english: "Indeed, mankind is in loss,",
        englishKhattab: "Surely humanity is in ˹grave˺ loss,",
        hindi: "निस्संदेह इंसान घाटे में है,",
        indonesian: "sungguh, manusia berada dalam kerugian,",
        turkish: "İnsan mutlaka ziyandadır.",
        french: "L'homme est certes, en perdition,"
      },
      words: [
        { id: 1, arabic: "إِنَّ", transliteration: "Inna", urdu: "بے شک", english: "Indeed" },
        { id: 2, arabic: "الْإِنْسَانَ", transliteration: "Al-Insaana", urdu: "ہر انسان", english: "mankind" },
        { id: 3, arabic: "لَفِي", transliteration: "Lafee", urdu: "یقیناً میں ہے", english: "is surely in" },
        { id: 4, arabic: "خُسْرٍ", transliteration: "Khusr", urdu: "بڑے نقصان و خسارے", english: "loss" }
      ]
    },
    {
      numberInSurah: 3,
      numberInQuran: 6179,
      text: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
      tajweedHtml: "إِلَّا <span class='tajweed-silent'>الَّ</span>ذِينَ آمَنُوا وَعَمِلُوا <span class='tajweed-silent'>الصَّ</span>الِحَاتِ وَتَوَاصَوْا بِ<span class='tajweed-silent'>الْ</span>حَ<span class='tajweed-qalqalah'>قِّ</span> وَتَوَاصَوْا بِ<span class='tajweed-silent'>الصَّ</span>بْ<span class='tajweed-qalqalah'>رِ</span>",
      juz: 30,
      manzil: 7,
      page: 601,
      ruku: 1,
      sajda: false,
      translations: {
        urdu: "سوائے ان لوگوں کے جو ایمان لائے اور انہوں نے نیک اعمال کیے، اور ایک دوسرے کو حق کی وصیت کی اور صبر کی تلقین کی",
        urduMaududi: "سوائے ان لوگوں کے جو ایمان لائے، اور جنہوں نے نیک اعمال کیے، اور ایک دوسرے کو حق کی نصیحت اور صبر کی تلقین کی",
        english: "Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.",
        englishKhattab: "except those who have faith, do good, and urge each other to the truth, and urge each other to perseverance.",
        hindi: "सिवाय उन लोगों के जो ईमान लाए और उन्होंने अच्छे कर्म किए, और एक-दूसरे को सत्य की नसीहत की और धैर्य (सब्र) की ताकीद की।",
        indonesian: "kecuali orang-orang yang beriman dan mengerjakan kebajikan serta saling menasihati untuk kebenaran dan saling menasihati untuk kesabaran.",
        turkish: "Ancak iman edip salih ameller işleyenler, birbirlerine hakkı tavsiye edenler ve birbirlerine sabrı tavsiye edenler müstesnadır.",
        french: "sauf ceux qui croient et accomplissent les bonnes œuvres, s'enjoignent mutuellement la vérité et s'enjoignent mutuellement l'endurance."
      },
      words: [
        { id: 1, arabic: "إِلَّا", transliteration: "Illa", urdu: "سوائے", english: "Except" },
        { id: 2, arabic: "الَّذِينَ", transliteration: "Allazeena", urdu: "ان کے جو", english: "those who" },
        { id: 3, arabic: "آمَنُوا", transliteration: "Aamanu", urdu: "ایمان لائے", english: "believed" },
        { id: 4, arabic: "وَعَمِلُوا", transliteration: "Wa-'amilu", urdu: "اور انہوں نے عمل کیے", english: "and did" },
        { id: 5, arabic: "الصَّالِحَاتِ", transliteration: "As-Saalihaat", urdu: "نیک اعمال", english: "righteous deeds" },
        { id: 6, arabic: "وَتَوَاصَوْا", transliteration: "Wa-tawaasaw", urdu: "اور آپس میں تلقین کی", english: "and advised one another" },
        { id: 7, arabic: "بِالْحَقِّ", transliteration: "Bil-Haqqi", urdu: "حق اور سچائی کی", english: "to the truth" },
        { id: 8, arabic: "وَتَوَاصَوْا", transliteration: "Wa-tawaasaw", urdu: "اور تاکید کی", english: "and advised each other" },
        { id: 9, arabic: "بِالصَّبْرِ", transliteration: "Bis-Sabr", urdu: "صبر و استقامت کی", english: "to patience" }
      ],
      tafseer: {
        ibnKathirUrdu: "کامیابی کے چار لازمی ستون اس آیت میں بیان ہوئے: 1. صحیح ایمان، 2. اعمالِ صالحہ، 3. دعوتِ حق اور امر بالمعروف، 4. مشکلات و فتنوں پر صبر و استقامت۔ صحابہ کرامؓ جب بھی ملتے تو اس سورت کی تلاوت کیے بغیر جدا نہ ہوتے تھے۔"
      }
    }
  ]
};
