export type TypingCategory = 
  | 'home_row' 
  | 'keyboard_practice' 
  | 'letters' 
  | 'words' 
  | 'sentences' 
  | 'timed_test' 
  | 'bangla_preview';

export interface TypingDrill {
  id: string;
  category: TypingCategory;
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  targetWpm: number;
  text: string;
  timedSeconds?: number;
  handFocus?: 'left' | 'right' | 'both';
  keyboardHighlightKeys?: string[];
  banglaPhoneticHint?: string;
}

/**
 * Architecture readiness for future Bangla typing integration (Avro Phonetic & Bijoy / National layout).
 * Kept inactive for now as requested, but structurally declared for clean modular expansion.
 */
export type TypingLanguageMode = 'english' | 'bangla_avro' | 'bangla_bijoy';

export interface KeyboardLayoutDefinition {
  id: string;
  name: string;
  language: TypingLanguageMode;
  descriptionEn: string;
  descriptionBn: string;
  isReady: boolean;
  notes: string;
}

export const SUPPORTED_KEYBOARD_LAYOUTS: KeyboardLayoutDefinition[] = [
  {
    id: 'qwerty_en',
    name: 'English QWERTY',
    language: 'english',
    descriptionEn: 'Standard international QWERTY layout for English touch typing.',
    descriptionBn: 'ইংরেজি টাচ টাইপিংয়ের আন্তর্জাতিক স্ট্যান্ডার্ড কিউওয়ার্টি লেআউট।',
    isReady: true,
    notes: 'Default active engine for all drills and timed tests.'
  },
  {
    id: 'avro_phonetic',
    name: 'Bangla Avro Phonetic (Schema Ready)',
    language: 'bangla_avro',
    descriptionEn: 'Phonetic typing engine translating English keystrokes into Bangla Unicode (e.g. "k" -> "ক", "ami" -> "আমি").',
    descriptionBn: 'ইংরেজি কী চেপে ফোনেটিক নিয়মে সরাসরি বাংলা ইউনিকোড টাইপিং (ফেজ ২-এর জন্য প্রস্তুত)।',
    isReady: false,
    notes: 'Data model and transliteration hook schema ready for future Phase 2 release.'
  },
  {
    id: 'bijoy_standard',
    name: 'Bangla Bijoy / National Layout (Schema Ready)',
    language: 'bangla_bijoy',
    descriptionEn: 'Fixed character mapping according to the Bangladesh Computer Council (BCC) national keyboard standard.',
    descriptionBn: 'বাংলাদেশ কম্পিউটার কাউন্সিল (BCC) জাতীয় প্রমিত কীবোর্ড লেআউট (ফেজ ২-এর জন্য প্রস্তুত)।',
    isReady: false,
    notes: 'Fixed matrix layer mapping ready for future activation.'
  }
];

export const TYPING_DRILLS: TypingDrill[] = [
  // 1. Home Row Drills
  {
    id: 'hr-1',
    category: 'home_row',
    titleEn: '1. Home Row Anchor Keys (F and J)',
    titleBn: '১. হোম রো-এর মূল ভিত্তি (F এবং J)',
    descriptionEn: 'Feel the small raised bumps on F (left index) and J (right index). Practice striking them alternately.',
    descriptionBn: 'F এবং J কী-র উঁচু দাগে আঙুল রেখে পর্যায়ক্রমে চাপ দেওয়ার অভ্যাস করুন।',
    level: 'Beginner',
    targetWpm: 15,
    text: 'f j f j fj jf ff jj fjf jfj ff jj f j f j ff jj fj jf',
    handFocus: 'both',
    keyboardHighlightKeys: ['F', 'J', 'Space']
  },
  {
    id: 'hr-2',
    category: 'home_row',
    titleEn: '2. Left Hand Home Row (A S D F)',
    titleBn: '২. বাম হাতের হোম রো (A S D F)',
    descriptionEn: 'Pinky on A, Ring on S, Middle on D, Index on F. Keep hands arched and relaxed.',
    descriptionBn: 'বাম হাতের কনিষ্ঠা A, অনামিকা S, মধ্যমা D এবং তর্জনী F কী-তে রাখুন।',
    level: 'Beginner',
    targetWpm: 18,
    text: 'asdf asdf fdsa fdsa aass ddff asdf sad fad daf fass dads safe',
    handFocus: 'left',
    keyboardHighlightKeys: ['A', 'S', 'D', 'F', 'Space']
  },
  {
    id: 'hr-3',
    category: 'home_row',
    titleEn: '3. Right Hand Home Row (J K L ;)',
    titleBn: '৩. ডান হাতের হোম রো (J K L ;)',
    descriptionEn: 'Index on J, Middle on K, Ring on L, Pinky on semicolon (;). Thumbs on spacebar.',
    descriptionBn: 'ডান হাতের তর্জনী J, মধ্যমা K, অনামিকা L এবং কনিষ্ঠা সেমিকোলন (;) কী-তে রাখুন।',
    level: 'Beginner',
    targetWpm: 18,
    text: 'jkl; jkl; ;lkj ;lkj jjkk ll;; jkl; klj; jllk ;kjl jalk',
    handFocus: 'right',
    keyboardHighlightKeys: ['J', 'K', 'L', ';', 'Space']
  },
  {
    id: 'hr-4',
    category: 'home_row',
    titleEn: '4. Full Home Row Integration',
    titleBn: '৪. সম্পূর্ণ হোম রো সমন্বয় (A S D F J K L ;)',
    descriptionEn: 'Combine both hands on the home row without looking down at the keyboard.',
    descriptionBn: 'কীবোর্ডের দিকে না তাকিয়ে উভয় হাতের সব আঙুল দিয়ে হোম রো প্র্যাকটিস করুন।',
    level: 'Beginner',
    targetWpm: 22,
    text: 'asdf jkl; a s d f j k l ; fall glad flash flask salad lads flask fall salad',
    handFocus: 'both',
    keyboardHighlightKeys: ['A', 'S', 'D', 'F', 'J', 'K', 'L', ';', 'G', 'H', 'Space']
  },
  {
    id: 'hr-5',
    category: 'home_row',
    titleEn: '5. Extended Home Row (Adding G and H)',
    titleBn: '৫. প্রসারিত হোম রো (G এবং H কী যোগ)',
    descriptionEn: 'Reach index fingers horizontally: left index reaches G, right index reaches H, then return to F and J.',
    descriptionBn: 'বাম তর্জনী দিয়ে G এবং ডান তর্জনী দিয়ে H কী-তে পৌঁছে আবার F ও J-তে ফিরে আসুন।',
    level: 'Beginner',
    targetWpm: 20,
    text: 'fgf jhj fgf jhj g h gh hg flag glad half dash hall flash shaft gas hag',
    handFocus: 'both',
    keyboardHighlightKeys: ['F', 'G', 'H', 'J', 'Space']
  },

  // 2. Keyboard Practice (Finger Coordination & Exploration)
  {
    id: 'kp-1',
    category: 'keyboard_practice',
    titleEn: 'Index Fingers Master Class (F, J, G, H, R, U)',
    titleBn: 'তর্জনী নিয়ন্ত্রণ ও বিচরণ (F, J, G, H, R, U)',
    descriptionEn: 'The index fingers are your most active workers. Practice reaching without shifting your palms.',
    descriptionBn: 'হাতের কব্জি স্থির রেখে তর্জনী দিয়ে আশেপাশের কী-গুলোতে নির্ভুলভাবে পৌঁছানোর অভ্যাস।',
    level: 'Beginner',
    targetWpm: 20,
    text: 'frf juj fgf jhj fur jug rug hug jar fur jug run fun hut gun jar',
    handFocus: 'both',
    keyboardHighlightKeys: ['F', 'R', 'G', 'J', 'U', 'H', 'Space']
  },
  {
    id: 'kp-2',
    category: 'keyboard_practice',
    titleEn: 'Middle & Ring Fingers Control (D, E, C, K, I, comma)',
    titleBn: 'মধ্যমা ও অনামিকার সমন্বয় (D, E, C, K, I, comma)',
    descriptionEn: 'Build independent finger strength so your ring finger does not drag your pinky along.',
    descriptionBn: 'মধ্যমা ও অনামিকা আঙুলের স্বাধীন শক্তি ও পেশীর নিয়ন্ত্রণ গড়ে তুলুন।',
    level: 'Intermediate',
    targetWpm: 22,
    text: 'ded kik dcd k,k ice kid die oil like dock coke coil milk slice click',
    handFocus: 'both',
    keyboardHighlightKeys: ['D', 'E', 'C', 'K', 'I', ',', 'Space']
  },
  {
    id: 'kp-3',
    category: 'keyboard_practice',
    titleEn: 'Pinky Stretch & Spacebar Rhythm',
    titleBn: 'কনিষ্ঠা আঙুলের প্রসার ও স্পেসবারের ছন্দ',
    descriptionEn: 'Lightly tap the spacebar with your dominant thumb and strike edge keys (A, Q, P, ;) with pinkies.',
    descriptionBn: 'বৃদ্ধাঙ্গুলি দিয়ে স্পেসবার এবং কনিষ্ঠা দিয়ে দুই ধারের কী নিয়ন্ত্রণ করুন।',
    level: 'Intermediate',
    targetWpm: 20,
    text: 'a q p ; pass quick plan quiz paste aqua quad jump path plot zip',
    handFocus: 'both',
    keyboardHighlightKeys: ['A', 'Q', 'P', ';', 'Space']
  },

  // 2. Letter Practice
  {
    id: 'let-1',
    category: 'letters',
    titleEn: 'Top Row Reaching (E and I)',
    titleBn: 'উপরের সারিতে আঙুল পৌঁছানো (E এবং I)',
    descriptionEn: 'Reach up from D to E with left middle finger, and from K to I with right middle finger.',
    descriptionBn: 'বাম মধ্যমা দিয়ে D থেকে E এবং ডান মধ্যমা দিয়ে K থেকে I তে পৌঁছান।',
    level: 'Beginner',
    targetWpm: 20,
    text: 'ded kik ded kik de ki ed ik feed kid side dike life like file feed skill',
    handFocus: 'both',
    keyboardHighlightKeys: ['D', 'E', 'K', 'I', 'Space']
  },
  {
    id: 'let-2',
    category: 'letters',
    titleEn: 'Top Row Vowels (U and O)',
    titleBn: 'ভাওয়েল প্র্যাকটিস (U এবং O)',
    descriptionEn: 'Right hand reach to U with index finger and O with ring finger.',
    descriptionBn: 'ডান হাত দিয়ে U এবং O কী-তে পৌঁছানোর অভ্যাস করুন।',
    level: 'Beginner',
    targetWpm: 22,
    text: 'juj lol juj lol ou uo soul loud look cook cool soil folio soul fool',
    handFocus: 'right',
    keyboardHighlightKeys: ['J', 'U', 'L', 'O', 'Space']
  },
  {
    id: 'let-3',
    category: 'letters',
    titleEn: 'Bottom Row Steps (C and M)',
    titleBn: 'নিচের সারিতে আঙুল নামানো (C এবং M)',
    descriptionEn: 'Drop left middle finger to C and right index finger to M.',
    descriptionBn: 'বাম মধ্যমা দিয়ে C এবং ডান তর্জনী দিয়ে M কী চাপার অনুশীলন।',
    level: 'Intermediate',
    targetWpm: 24,
    text: 'dcd jmj dcd jmj cam mac calm clam dome come came mica mosaic mock',
    handFocus: 'both',
    keyboardHighlightKeys: ['D', 'C', 'J', 'M', 'Space']
  },

  // 3. Word Practice
  {
    id: 'wrd-1',
    category: 'words',
    titleEn: 'Essential Computer Words',
    titleBn: 'কম্পিউটারের প্রয়োজনীয় শব্দাবলী',
    descriptionEn: 'Type frequent hardware and software terms to build muscle memory for computing.',
    descriptionBn: 'কম্পিউটার পরিচালনায় বারবার ব্যবহৃত মৌলিক শব্দগুলো দ্রুত টাইপ করুন।',
    level: 'Beginner',
    targetWpm: 25,
    text: 'cpu ram disk mouse data file save text web page code chip icon folder click drive port byte word boot',
    handFocus: 'both'
  },
  {
    id: 'wrd-2',
    category: 'words',
    titleEn: 'Windows & Internet Vocabulary',
    titleBn: 'উইন্ডোজ ও ইন্টারনেট শব্দমালা',
    descriptionEn: 'Everyday terms encountered in operating systems and browsers.',
    descriptionBn: 'ব্রাউজার এবং ফাইল ব্যবস্থাপনায় নিত্যদিনের শব্দসমূহ।',
    level: 'Intermediate',
    targetWpm: 28,
    text: 'desktop taskbar window chrome browser email attach download upload search password screen shut restart',
    handFocus: 'both'
  },

  // 4. Sentence Practice
  {
    id: 'snt-1',
    category: 'sentences',
    titleEn: 'Computer Foundations in Sentences',
    titleBn: 'সহজ বাক্য গঠন অনুশীলন',
    descriptionEn: 'Type complete meaningful sentences about computer basics with capitalization and full stops.',
    descriptionBn: 'বড় হাতের অক্ষর ও ফুল স্টপ দিয়ে বাক্য টাইপিংয়ের বাস্তব অনুশীলন।',
    level: 'Intermediate',
    targetWpm: 30,
    text: 'A computer accepts input and shows output. Keep your fingers resting on the home row keys. Press Ctrl and S to save your work frequently.',
    handFocus: 'both'
  },
  {
    id: 'snt-2',
    category: 'sentences',
    titleEn: 'Safe Computing Habits in Bangladesh',
    titleBn: 'নিরাপদ ইন্টারনেট ব্যবহারের বাক্য',
    descriptionEn: 'Type sentences reinforcing digital safety and awareness.',
    descriptionBn: 'সাইবার নিরাপত্তা ও সচেতনতামূলক বাক্যসমূহ অনুশীলন করুন।',
    level: 'Intermediate',
    targetWpm: 32,
    text: 'Never share your secret password or OTP with anyone. Check the browser address bar before typing your email login. Create a backup of your important documents.',
    handFocus: 'both'
  },

  {
    id: 'snt-3',
    category: 'sentences',
    titleEn: 'Office Communication & Email Etiquette',
    titleBn: 'অফিস যোগাযোগ ও ইমেইল লেখার বাক্য',
    descriptionEn: 'Common phrases used in professional emails and document writing.',
    descriptionBn: 'পেশাদার যোগাযোগ ও চিঠিপত্রে বহুল ব্যবহৃত বাক্যসমূহ।',
    level: 'Intermediate',
    targetWpm: 35,
    text: 'Please find attached the report for your review. Thank you for your assistance with this matter. We look forward to your valuable feedback.',
    handFocus: 'both'
  },

  // 5. Timed Tests (Sprint, Standard, and Endurance)
  {
    id: 'time-30',
    category: 'timed_test',
    titleEn: '30-Second Rapid Sprint Test',
    titleBn: '৩০ সেকেন্ডের দ্রুত গতির স্প্রিন্ট টেস্ট',
    descriptionEn: 'A high-intensity short sprint to gauge peak burst speed and quick reflex accuracy.',
    descriptionBn: 'স্বল্প সময়ে তাৎক্ষণিক আঙুলের ক্ষিপ্রতা ও নির্ভুলতা পরিমাপ করুন।',
    level: 'Beginner',
    targetWpm: 30,
    timedSeconds: 30,
    text: 'Quick fingers and relaxed wrists make typing easy and joyful. Keep your eyes on the screen and trust your muscle memory for every key.',
    handFocus: 'both'
  },
  {
    id: 'time-60',
    category: 'timed_test',
    titleEn: '60-Second Standard Benchmark Test',
    titleBn: '১ মিনিটের স্পিড ও অ্যাকুরেসি টেস্ট',
    descriptionEn: 'The international gold standard benchmark to measure real words-per-minute with error penalties.',
    descriptionBn: 'আন্তর্জাতিক মানদণ্ডে ১ মিনিটে কত শব্দ নির্ভুলভাবে টাইপ করতে পারেন তা মেপে দেখুন।',
    level: 'Intermediate',
    targetWpm: 35,
    timedSeconds: 60,
    text: 'The central processing unit is often called the brain of the computer system. It interprets and carries out the basic instructions that operate a computer. When you type on your keyboard, electrical signals travel to the processor, which translates each keystroke into digital characters displayed on the monitor. Mastering both accuracy and speed will save you hundreds of hours in your academic and professional life.',
    handFocus: 'both'
  },
  {
    id: 'time-120',
    category: 'timed_test',
    titleEn: '120-Second Endurance Challenge',
    titleBn: '২ মিনিটের স্ট্যামিনা ও স্থায়িত্ব পরীক্ষা',
    descriptionEn: 'Maintain rhythmic pacing and posture over 2 continuous minutes without fatigue or rushing.',
    descriptionBn: 'টানা ২ মিনিট ক্লান্তিহীনভাবে গতি ও সর্বোচ্চ নির্ভুলতা বজায় রাখার পরীক্ষা।',
    level: 'Advanced',
    targetWpm: 40,
    timedSeconds: 120,
    text: 'Information technology is transforming everyday life in Bangladesh. Students in remote villages can now access high quality education, read digital textbooks from NCTB, and learn practical skills online. Touch typing is the foundation of digital literacy because it turns your thoughts directly into words on the screen without looking down at the keys. As you build muscle memory, your fingers will instinctively find the keys, allowing you to focus completely on creative thoughts and problem solving.',
    handFocus: 'both'
  },

  // 6. Bangla Typing Architecture Preview
  {
    id: 'bn-1',
    category: 'bangla_preview',
    titleEn: 'Avro Phonetic Preview: Common Phrases',
    titleBn: 'অভ্র ফোনেটিক অনুশীলন (ইংরেজি অক্ষরে বাংলা লেখা)',
    descriptionEn: 'Designed for the bilingual architecture. Type phonetically in English to produce Bengali output.',
    descriptionBn: 'ইংরেজি কীবোর্ডে ফোনেটিক নিয়ম অনুযায়ী টাইপ করার প্রস্তুতিমূলক ড্রিল।',
    level: 'Beginner',
    targetWpm: 25,
    text: 'ami banglay gan gai. shobaike shubheccha. digital bangladesh amader shopno. shikha amader odhikar.',
    banglaPhoneticHint: 'আমি বাংলায় গান গাই। সবাইকে শুভেচ্ছা। ডিজিটাল বাংলাদেশ আমাদের স্বপ্ন। শিক্ষা আমাদের অধিকার।',
    handFocus: 'both'
  }
];

export const KEYBOARD_FINGER_MAP: Record<string, { finger: string; hand: 'left' | 'right'; color: string }> = {
  // Left Hand
  'q': { finger: 'Left Pinky', hand: 'left', color: 'border-pink-400 bg-pink-50' },
  'a': { finger: 'Left Pinky', hand: 'left', color: 'border-pink-400 bg-pink-50' },
  'z': { finger: 'Left Pinky', hand: 'left', color: 'border-pink-400 bg-pink-50' },
  '1': { finger: 'Left Pinky', hand: 'left', color: 'border-pink-400 bg-pink-50' },
  
  'w': { finger: 'Left Ring', hand: 'left', color: 'border-amber-400 bg-amber-50' },
  's': { finger: 'Left Ring', hand: 'left', color: 'border-amber-400 bg-amber-50' },
  'x': { finger: 'Left Ring', hand: 'left', color: 'border-amber-400 bg-amber-50' },
  '2': { finger: 'Left Ring', hand: 'left', color: 'border-amber-400 bg-amber-50' },

  'e': { finger: 'Left Middle', hand: 'left', color: 'border-emerald-400 bg-emerald-50' },
  'd': { finger: 'Left Middle', hand: 'left', color: 'border-emerald-400 bg-emerald-50' },
  'c': { finger: 'Left Middle', hand: 'left', color: 'border-emerald-400 bg-emerald-50' },
  '3': { finger: 'Left Middle', hand: 'left', color: 'border-emerald-400 bg-emerald-50' },

  'r': { finger: 'Left Index', hand: 'left', color: 'border-blue-400 bg-blue-50' },
  'f': { finger: 'Left Index', hand: 'left', color: 'border-blue-400 bg-blue-50' },
  'v': { finger: 'Left Index', hand: 'left', color: 'border-blue-400 bg-blue-50' },
  't': { finger: 'Left Index', hand: 'left', color: 'border-blue-400 bg-blue-50' },
  'g': { finger: 'Left Index', hand: 'left', color: 'border-blue-400 bg-blue-50' },
  'b': { finger: 'Left Index', hand: 'left', color: 'border-blue-400 bg-blue-50' },
  '4': { finger: 'Left Index', hand: 'left', color: 'border-blue-400 bg-blue-50' },
  '5': { finger: 'Left Index', hand: 'left', color: 'border-blue-400 bg-blue-50' },

  // Thumbs
  ' ': { finger: 'Thumbs', hand: 'left', color: 'border-indigo-400 bg-indigo-50' },

  // Right Hand
  'y': { finger: 'Right Index', hand: 'right', color: 'border-blue-400 bg-blue-50' },
  'h': { finger: 'Right Index', hand: 'right', color: 'border-blue-400 bg-blue-50' },
  'n': { finger: 'Right Index', hand: 'right', color: 'border-blue-400 bg-blue-50' },
  'u': { finger: 'Right Index', hand: 'right', color: 'border-blue-400 bg-blue-50' },
  'j': { finger: 'Right Index', hand: 'right', color: 'border-blue-400 bg-blue-50' },
  'm': { finger: 'Right Index', hand: 'right', color: 'border-blue-400 bg-blue-50' },
  '6': { finger: 'Right Index', hand: 'right', color: 'border-blue-400 bg-blue-50' },
  '7': { finger: 'Right Index', hand: 'right', color: 'border-blue-400 bg-blue-50' },

  'i': { finger: 'Right Middle', hand: 'right', color: 'border-emerald-400 bg-emerald-50' },
  'k': { finger: 'Right Middle', hand: 'right', color: 'border-emerald-400 bg-emerald-50' },
  ',': { finger: 'Right Middle', hand: 'right', color: 'border-emerald-400 bg-emerald-50' },
  '8': { finger: 'Right Middle', hand: 'right', color: 'border-emerald-400 bg-emerald-50' },

  'o': { finger: 'Right Ring', hand: 'right', color: 'border-amber-400 bg-amber-50' },
  'l': { finger: 'Right Ring', hand: 'right', color: 'border-amber-400 bg-amber-50' },
  '.': { finger: 'Right Ring', hand: 'right', color: 'border-amber-400 bg-amber-50' },
  '9': { finger: 'Right Ring', hand: 'right', color: 'border-amber-400 bg-amber-50' },

  'p': { finger: 'Right Pinky', hand: 'right', color: 'border-pink-400 bg-pink-50' },
  ';': { finger: 'Right Pinky', hand: 'right', color: 'border-pink-400 bg-pink-50' },
  '/': { finger: 'Right Pinky', hand: 'right', color: 'border-pink-400 bg-pink-50' },
  '-': { finger: 'Right Pinky', hand: 'right', color: 'border-pink-400 bg-pink-50' },
  '=': { finger: 'Right Pinky', hand: 'right', color: 'border-pink-400 bg-pink-50' },
  '0': { finger: 'Right Pinky', hand: 'right', color: 'border-pink-400 bg-pink-50' }
};
