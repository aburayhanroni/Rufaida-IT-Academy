import { Course } from '../types';
import { BASIC_COMPUTER_MODULES } from './basicComputerModules';

export const COURSES_DATA: Course[] = [
  {
    id: 'basic-computer',
    titleEn: 'Basic Computer Course for Absolute Beginners',
    titleBn: 'একদম নতুনদের জন্য বেসিক কম্পিউটার কোর্স',
    category: 'basic_computer',
    level: 'Beginner',
    levelBn: 'শুরুর স্তর (বিগিনার)',
    taglineEn: 'Master essential computer skills from zero: hardware, typing, Windows, Internet, Word, Excel, and safety.',
    taglineBn: 'কম্পিউটার হার্ডওয়্যার, টাইপিং, উইন্ডোজ, ইন্টারনেট, ওয়ার্ড, এক্সেল ও সাইবার নিরাপত্তা শিখুন একদম শূন্য থেকে।',
    descriptionEn: 'Designed specifically for first-time learners in Bangladesh. This step-by-step course covers everything you need to become confident using a computer for study, daily work, and office tasks.',
    descriptionBn: 'বাংলাদেশের শিক্ষার্থীদের জন্য বিশেষভাবে তৈরি। কোনো পূর্ব অভিজ্ঞতা ছাড়াই ধাপে ধাপে কম্পিউটার চালানো, ফাইল তৈরি, টাইপিং, ইন্টারনেট এবং অফিস প্রোগ্রামে দক্ষ হয়ে উঠুন।',
    badge: 'Flagship Beginner Course',
    badgeColor: 'emerald',
    modulesCount: 11,
    totalLessons: 23,
    estimatedHours: 15,
    prerequisitesEn: 'No prior computer knowledge required. Suitable for all ages.',
    prerequisitesBn: 'কোনো পূর্ব অভিজ্ঞতার প্রয়োজন নেই। যেকোনো বয়সের শিক্ষার্থীর জন্য উপযোগী।',
    hasTypingIntegration: true,
    learningOutcomesEn: [
      'Understand how computers process information (IPO cycle)',
      'Master keyboard keys, universal shortcuts, and mouse precision',
      'Develop touch typing muscle memory with the built-in typing tool',
      'Confidently operate Windows 10/11 and organize files into folders',
      'Browse the internet safely and send professional emails with attachments',
      'Create formatted documents in Word and simple calculation sheets in Excel',
      'Design clean presentation slides in PowerPoint and present with F5',
      'Protect your accounts from cyber scams and keep your PC secure'
    ],
    learningOutcomesBn: [
      'কম্পিউটার কীভাবে কাজ করে (ইনপুট, প্রসেসিং, আউটপুট) তা বোঝা',
      'কীবোর্ড শর্টকাট ও মাউসের সঠিক নিয়ন্ত্রণে পারদর্শী হওয়া',
      'বিল্ট-ইন টাইপিং টুলের মাধ্যমে সঠিক নিয়মে দ্রুত টাইপিং শেখা',
      'আত্মবিশ্বাসের সাথে উইন্ডোজ চালানো এবং ফাইল-ফোল্ডার ব্যবস্থাপনা করা',
      'নিরাপদে ইন্টারনেট ব্রাউজ করা এবং ফাইল সংযুক্ত করে ইমেইল পাঠানো',
      'মাইক্রোসফট ওয়ার্ডে সুন্দর ডকুমেন্ট ও এক্সেলে হিসাবের স্প্রেডশিট তৈরি',
      'পাওয়ারপয়েন্টে স্লাইড ডিজাইন ও প্রেজেন্টেশন প্রদর্শন',
      'সাইবার প্রতারণা থেকে সতর্ক থাকা এবং একাউন্ট সুরক্ষিত রাখা'
    ],
    modules: BASIC_COMPUTER_MODULES
  },
  {
    id: 'ssc-ict',
    titleEn: 'SSC ICT (National Curriculum for Class 9-10)',
    titleBn: 'এসএসসি আইসিটি (৯ম ও ১০ম শ্রেণির জাতীয় শিক্ষাক্রম)',
    category: 'ssc_ict',
    level: 'Secondary (SSC)',
    levelBn: 'মাধ্যমিক (এসএসসি)',
    taglineEn: 'Comprehensive board exam prep: Chapter notes, board questions, interactive examples, MCQs, and chapter quizzes.',
    taglineBn: 'বোর্ড পরীক্ষার পূর্ণাঙ্গ প্রস্তুতি: অধ্যায়ভিত্তিক নোটস, বাস্তব উদাহরণ, অনুশীলন, এমসিকিউ ও মডেল টেস্ট।',
    descriptionEn: 'Aligned with the National Curriculum and Textbook Board (NCTB) syllabus for Bangladesh SSC students. Study independently with chapter breakdowns, conceptual explanations, and board-standard MCQs.',
    descriptionBn: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) প্রণীত নবম-দশম শ্রেণির তথ্য ও যোগাযোগ প্রযুক্তি সিলেবাসের পূর্ণাঙ্গ রূপ। স্কুল বা কোচিং ছাড়াই স্বাধীনভাবে ঘরে বসে বিষয়ভিত্তিক দক্ষতা অর্জন ও বোর্ড পরীক্ষার প্রস্তুতি নিন।',
    badge: 'NCTB Curriculum Aligned',
    badgeColor: 'blue',
    modulesCount: 6,
    totalLessons: 12,
    estimatedHours: 18,
    prerequisitesEn: 'Basic literacy. No prior programming knowledge required.',
    prerequisitesBn: 'নবম-দশম শ্রেণির শিক্ষার্থী বা যেকেউ যারা আইসিটির মূল ধারণা শিখতে চান।',
    learningOutcomesEn: [
      'Master all 6 chapters of the NCTB SSC ICT curriculum',
      'Understand E-Learning, Digital Bangladesh, and 21st-century tech skills',
      'Learn computer virus types, antivirus installation, and strong cyber hygiene',
      'Practice Word Processing and spreadsheet calculations according to practical exam questions',
      'Score 100% on SSC Board exam MCQs through timed practice tests'
    ],
    learningOutcomesBn: [
      'এনসিটিবি পাঠ্যবইয়ের ৬টি অধ্যায়ের সম্পূর্ণ প্রস্তুতি',
      'ই-লার্নিং, ডিজিটাল বাংলাদেশ ও ২১ শতকের প্রযুক্তি জ্ঞান অর্জন',
      'কম্পিউটার ভাইরাস, নিরাপত্তা ও কপিরাইট আইন সম্পর্কে পরিষ্কার ধারণা',
      'বোর্ড ব্যবহারিক পরীক্ষার নিয়ম অনুযায়ী ওয়ার্ড ও এক্সেলের কাজ আয়ত্তকরণ',
      'টাইমড কুইজের মাধ্যমে এসএসসি বোর্ড পরীক্ষায় এমসিকিউ-তে পূর্ণ নম্বর নিশ্চিত করা'
    ],
    modules: [
      {
        id: 'ssc-ch-1',
        moduleNumber: 1,
        titleEn: 'Chapter 1: ICT & Our Bangladesh',
        titleBn: 'অধ্যায় ১: তথ্য ও যোগাযোগ প্রযুক্তি এবং আমাদের বাংলাদেশ',
        descriptionEn: 'E-learning, Digital Bangladesh, careers in ICT, and the transformation of society.',
        descriptionBn: 'ই-লার্নিং, ডিজিটাল বাংলাদেশ, আইসিটিতে ক্যারিয়ার এবং সামাজিক পরিবর্তন।',
        lessons: [
          {
            id: 'ssc-1-1',
            lessonNumber: 1,
            titleEn: '1.1 E-Learning and Education in Bangladesh',
            titleBn: '১.১ ই-লার্নিং ও আমাদের শিক্ষা',
            summaryEn: 'How digital technology is revolutionizing classrooms, remote learning, and skill development.',
            summaryBn: 'শ্রেণিকক্ষে ডিজিটাল মাধ্যমের ব্যবহার এবং দূরশিক্ষণ ও স্বশিক্ষার গুরুত্ব।',
            estimatedMinutes: 25,
            contentBlocks: [
              {
                type: 'text',
                titleEn: 'Concept of E-Learning (Electronic Learning)',
                titleBn: 'ই-লার্নিং এর মূল ধারণা',
                contentEn: 'E-learning refers to using electronic media and internet technology to facilitate teaching and learning. It does not replace the traditional teacher, but rather enhances and democratizes high quality education for students in rural villages and remote towns.',
                contentBn: 'ই-লার্নিং হলো তথ্য ও যোগাযোগ প্রযুক্তির সাহায্যে পাঠদান ও শিক্ষাগ্রহণ পদ্ধতি। এটি কোনো অবস্থাতেই ঐতিহ্যবাহী শিক্ষকের বিকল্প নয়, বরং শিক্ষকের কাজকে আরও ফলপ্রসূ ও আকর্ষণীয় করে তোলে।'
              },
              {
                type: 'key_terms',
                titleEn: 'Digital Bangladesh Vision Pillars',
                titleBn: 'ডিজিটাল বাংলাদেশের প্রধান ভিত্তি',
                contentEn: '1. Human Resource Development. 2. Connecting citizens. 3. Digital Government. 4. ICT in business & economy.',
                contentBn: '১. মানবসম্পদ উন্নয়ন। ২. জনগণের সংযুক্তি। ৩. ডিজিটাল সরকার। ৪. ব্যবসা-বাণিজ্যে আইসিটির ব্যবহার।'
              }
            ],
            quiz: [
              {
                id: 'q-ssc1-1',
                questionEn: 'What is the primary role of E-Learning according to the NCTB textbook?',
                questionBn: 'এনসিটিবি পাঠ্যবই অনুসারে ই-লার্নিং এর মূল ভূমিকা কোনটি?',
                optionsEn: ['Completely replace traditional schools', 'Assist and empower traditional teaching and self-learning', 'Eliminate the need for books', 'Only provide games for entertainment'],
                optionsBn: ['স্কুল পুরোপুরি বন্ধ করে দেওয়া', 'শিক্ষাদান ও স্বাধীন শিক্ষায় সহায়ক ভূমিকা পালন', 'বইয়ের প্রয়োজনীয়তা শেষ করা', 'শুধু বিনোদনমূলক গেম খেলা'],
                correctIndex: 1,
                explanationEn: 'E-learning is a powerful assisting tool that enhances classroom teaching and independent education.',
                explanationBn: 'ই-লার্নিং সনাতন পাঠদানের বিকল্প নয়, বরং সহায়ক মাধ্যম হিসেবে কাজ করে।'
              }
            ]
          },
          {
            id: 'ssc-1-2',
            lessonNumber: 2,
            titleEn: '1.2 Careers in ICT & Future Readiness',
            titleBn: '১.২ আইসিটিতে ক্যারিয়ার ও ভবিষ্যৎ সম্ভাবনা',
            summaryEn: 'Software engineering, graphics design, digital marketing, freelancing, and artificial intelligence.',
            summaryBn: 'সফটওয়্যার তৈরি, গ্রাফিক্স ডিজাইন, ফ্রিল্যান্সিং এবং ভবিষ্যতের প্রযুক্তিগত দক্ষতা।',
            estimatedMinutes: 25,
            contentBlocks: [
              {
                type: 'text',
                titleEn: 'The Global and Local Tech Job Market',
                titleBn: 'তথ্যপ্রযুক্তিতে কর্মসংস্থানের দিগন্ত',
                contentEn: 'In modern Bangladesh, youth can earn independently from any corner of the country through software development, digital marketing, data analysis, and creative design on global platforms.',
                contentBn: 'বর্তমানে বাংলাদেশের তরুণ-তরুণীরা ঘরে বসেই বিশ্বমানের সফটওয়্যার ডেভেলপমেন্ট, ডিজিটাল মার্কেটিং ও গ্রাফিক্সের মাধ্যমে স্বাধীনভাবে ক্যারিয়ার গড়তে পারছে।'
              }
            ],
            quiz: [
              {
                id: 'q-ssc1-2',
                questionEn: 'Which field allows a professional to work remotely for international clients over the internet?',
                questionBn: 'কোন পেশায় ইন্টারনেটের মাধ্যমে দেশ-বিদেশের ক্লায়েন্টের কাজ স্বাধীনভাবে করা যায়?',
                optionsEn: ['Traditional shopkeeper', 'Freelancing / Remote tech work', 'Paper press printer', 'Manual filing clerk'],
                optionsBn: ['প্রথাগত দোকানদার', 'ফ্রিল্যান্সিং / আউটসোর্সিং', 'হাতে ছাপাখানা', 'ফাইল ক্লার্ক'],
                correctIndex: 1,
                explanationEn: 'Freelancing and remote technology work allow professionals to work globally using the internet.',
                explanationBn: 'ফ্রিল্যান্সিংয়ের মাধ্যমে ইন্টারনেটে বিশ্বের যেকোনো স্থান থেকে কাজ করা যায়।'
              }
            ]
          }
        ]
      },
      {
        id: 'ssc-ch-2',
        moduleNumber: 2,
        titleEn: 'Chapter 2: Computer & User Security',
        titleBn: 'অধ্যায় ২: কম্পিউটার ও কম্পিউটার ব্যবহারকারীর নিরাপত্তা',
        descriptionEn: 'Software maintenance, antivirus protection, copyright, and ethical digital citizenship.',
        descriptionBn: 'সফটওয়্যার রক্ষণাবেক্ষণ, ভাইরাস ও অ্যান্টিভাইরাস, পাইরেসি প্রতিরোধ এবং কপিরাইট আইন।',
        lessons: [
          {
            id: 'ssc-2-1',
            lessonNumber: 3,
            titleEn: '2.1 Computer Viruses and Antivirus Protection',
            titleBn: '২.১ কম্পিউটার ভাইরাস এবং অ্যান্টিভাইরাস',
            summaryEn: 'VIRUS stands for Vital Information Resources Under Siege. Learn infection vectors, symptoms, and updates.',
            summaryBn: 'ভাইরাসের পূর্ণরূপ, সংক্রমণের কারণ, লক্ষণ এবং নিয়মিত অ্যান্টিভাইরাস আপডেট রাখার নিয়ম।',
            estimatedMinutes: 25,
            contentBlocks: [
              {
                type: 'text',
                titleEn: 'What is a Computer Virus?',
                titleBn: 'কম্পিউটার ভাইরাস কী?',
                contentEn: 'VIRUS stands for Vital Information Resources Under Siege, coined by Prof. Fred Cohen in 1983. It is malicious software designed to replicate itself, corrupt files, slow down processors, and compromise system security.',
                contentBn: 'VIRUS শব্দটির পূর্ণরূপ হলো Vital Information Resources Under Siege। এটি এমন এক ধরণের ক্ষতিকর প্রোগ্রাম যা কম্পিউটারের ফাইল নষ্ট করে এবং অনুমতি ছাড়া নিজের বিস্তার ঘটায়।'
              },
              {
                type: 'table',
                titleEn: 'Famous Viruses & Reliable Antivirus Software',
                titleBn: 'পরিচিত ভাইরাস ও অ্যান্টিভাইরাস সফটওয়্যার',
                contentEn: 'Famous viruses: CIH (Chernobyl), Trojan Horse, WannaCry Ransomware. Good Antivirus: Windows Defender, Avast, Kaspersky, Bitdefender.',
                contentBn: 'বিখ্যাত ভাইরাস: সিআইএইচ (CIH), ট্রোজান হর্স। বিশ্বস্ত অ্যান্টিভাইরাস: উইন্ডোজ ডিফেন্ডার, ক্যাসপারস্কি, এভাস্ট।'
              }
            ],
            quiz: [
              {
                id: 'q-ssc2-1',
                questionEn: 'What is the full form of the word VIRUS in computer science?',
                questionBn: 'কম্পিউটার বিজ্ঞানে VIRUS শব্দের পূর্ণরূপ কী?',
                optionsEn: ['Very Important Resource User System', 'Vital Information Resources Under Siege', 'Virtual Internet Routing Unit Service', 'Visual Image Recording Utility Software'],
                optionsBn: ['Very Important Resource User System', 'Vital Information Resources Under Siege', 'Virtual Internet Routing Unit Service', 'Visual Image Recording Utility Software'],
                correctIndex: 1,
                explanationEn: 'Prof. Fred Cohen created the term: Vital Information Resources Under Siege.',
                explanationBn: 'VIRUS-এর পূর্ণরূপ হলো Vital Information Resources Under Siege।'
              }
            ]
          },
          {
            id: 'ssc-2-2',
            lessonNumber: 4,
            titleEn: '2.2 Copyright and Software Piracy Laws',
            titleBn: '২.২ কপিরাইট আইন ও সফটওয়্যার পাইরেসি',
            summaryEn: 'Intellectual Property, Creative Commons, the Bangladesh Copyright Act 2000, and ethical computing.',
            summaryBn: 'মেধা সম্পদ সংরক্ষণ, ক্রিয়েটিভ কমন্স লাইসেন্স ও বাংলাদেশ কপিরাইট আইন।',
            estimatedMinutes: 20,
            contentBlocks: [
              {
                type: 'text',
                titleEn: 'Intellectual Property and Copyright',
                titleBn: 'মেধাসম্পদ ও কপিরাইটের গুরুত্ব',
                contentEn: 'Creating software, books, music, or films takes months of intellectual effort. Copyright law grants the creator exclusive legal rights. Using or copying software without purchasing a license is called Software Piracy, which is an illegal crime.',
                contentBn: 'সফটওয়্যার বা শিল্পকর্ম তৈরিতে প্রচুর মেধা ও শ্রম লাগে। স্রষ্টার অনুমতি ব্যতীত তার সৃষ্টি অনুলিপি বা বিক্রি করা বেআইনি, একে সফটওয়্যার পাইরেসি বলে।'
              }
            ],
            quiz: [
              {
                id: 'q-ssc2-2',
                questionEn: 'What is the illegal unauthorized copying of commercial software called?',
                questionBn: 'অনুমোদন ছাড়া বাণিজ্যিক সফটওয়্যার কপি বা বিতরণ করাকে কী বলা হয়?',
                optionsEn: ['Open Source Distribution', 'Software Piracy', 'Software Debugging', 'Data Encryption'],
                optionsBn: ['ওপেন সোর্স ডিস্ট্রিবিউশন', 'সফটওয়্যার পাইরেসি (Software Piracy)', 'সফটওয়্যার ডিবাগিং', 'ডাটা এনক্রিপশন'],
                correctIndex: 1,
                explanationEn: 'Software piracy is the unauthorized copying, distribution, or use of copyrighted software.',
                explanationBn: 'অনুমোদনহীন সফটওয়্যার ব্যবহার ও নকল করাকে সফটওয়্যার পাইরেসি বলে।'
              }
            ]
          }
        ]
      },
      {
        id: 'ssc-ch-3',
        moduleNumber: 3,
        titleEn: 'Chapter 3: Internet in My Education',
        titleBn: 'অধ্যায় ৩: আমার শিক্ষায় ইন্টারনেট',
        descriptionEn: 'Digital textbooks, online educational repositories, and ethical information searching.',
        descriptionBn: 'ই-বুক, ডিজিটাল টেক্সটবুক ও ইন্টারনেটে শিক্ষা উপকরণ ব্যবহারের সঠিক উপায়।',
        lessons: [
          {
            id: 'ssc-3-1',
            lessonNumber: 5,
            titleEn: '3.1 Digital Textbooks and E-Books in Bangladesh',
            titleBn: '৩.১ ডিজিটাল পাঠ্যবই এবং ই-বুক ধারণা',
            summaryEn: 'The NCTB digital book platform, EPUB interactive formats, and accessible education.',
            summaryBn: 'এনসিটিবি-র অনলাইন ই-বুক পোর্টাল, অডিও-ইন্টারেক্টিভ বই এবং সর্বজনীন শিক্ষা।',
            estimatedMinutes: 20,
            contentBlocks: [
              {
                type: 'text',
                titleEn: 'E-Books and Digital Archives',
                titleBn: 'ই-বুক ও সরকারি ডিজিটাল আর্কাইভ',
                contentEn: 'The National Curriculum and Textbook Board (NCTB) provides all national textbooks freely in PDF and interactive formats online at nctb.gov.bd. Students can access updated editions anywhere in Bangladesh.',
                contentBn: 'এনসিটিবি বাংলাদেশের প্রাথমিক ও মাধ্যমিক স্তরের সকল পাঠ্যবই ডিজিটাল ই-বুক আকারে অনলাইনে বিনামূল্যে সরবরাহ করে।'
              }
            ],
            quiz: [
              {
                id: 'q-ssc3-1',
                questionEn: 'Which official organization publishes free school textbooks in Bangladesh?',
                questionBn: 'বাংলাদেশে সরকারি পাঠ্যপুস্তক প্রকাশের দায়িত্বপ্রাপ্ত জাতীয় প্রতিষ্ঠান কোনটি?',
                optionsEn: ['BTRC', 'NCTB', 'BIWTA', 'BBS'],
                optionsBn: ['বিটিআরসি', 'এনসিটিবি (NCTB)', 'বিআইডব্লিউটিএ', 'বিবিএস'],
                correctIndex: 1,
                explanationEn: 'NCTB (National Curriculum and Textbook Board) designs and distributes textbooks.',
                explanationBn: 'এনসিটিবি (জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড) পাঠ্যবই প্রণয়ন করে।'
              }
            ]
          }
        ]
      },
      {
        id: 'ssc-ch-4',
        moduleNumber: 4,
        titleEn: 'Chapter 4: My Writing & Spreadsheet',
        titleBn: 'অধ্যায় ৪: আমার লেখালেখি ও হিসাব',
        descriptionEn: 'Word processor deep-dive and practical spreadsheet calculations according to SSC syllabus.',
        descriptionBn: 'ওয়ার্ড প্রসেসরে সম্পাদনা এবং স্প্রেডশিটে গাণিতিক হিসাব সংক্রান্ত ব্যবহারিক।',
        lessons: [
          {
            id: 'ssc-4-1',
            lessonNumber: 6,
            titleEn: '4.1 Word Processor: Editing and Formatting',
            titleBn: '৪.১ ওয়ার্ড প্রসেসর: সম্পাদনা ও ফরম্যাটিং',
            summaryEn: 'Margins, headers, footers, tables, Bangla font typing with Bijoy and Avro, spell-checking.',
            summaryBn: 'মার্জিন, হেডার-ফুটার, টেবিল সন্নিবেশ ও বিজয়-অভ্র কিবোর্ডের মাধ্যমে বাংলা টাইপিং।',
            estimatedMinutes: 25,
            contentBlocks: [
              {
                type: 'text',
                titleEn: 'Bangla Typing Layouts: Bijoy vs Avro',
                titleBn: 'বাংলা টাইপিং: বিজয় বনাম অভ্র',
                contentEn: 'Bijoy (invented by Mustafa Jabbar) uses custom keyboard mappings (SutonnyMJ font, Ctrl+Alt+V). Avro (developed by Dr. Mehdi Hasan Khan) introduced phonetic typing ("ami" becomes "আমি"), making computer typing accessible to millions.',
                contentBn: 'বিজয় কীবোর্ড বাংলা টাইপিংয়ের প্রাচীনতম জনপ্রিয় মাধ্যম। অন্যদিকে ডা. মেহেদী হাসান খান উদ্ভাবিত অভ্র ফোনেটিক পদ্ধতিতে ইংরেজি অক্ষরে বাংলা টাইপ করা যায় (যেমন ami লিখলে আমি হয়)।'
              }
            ],
            quiz: [
              {
                id: 'q-ssc4-1',
                questionEn: 'Who developed the popular Avro phonetic Bangla typing software?',
                questionBn: 'জনপ্রিয় অভ্র (Avro) ফোনেটিক বাংলা টাইপিং সফটওয়্যারটির প্রধান উদ্ভাবক কে?',
                optionsEn: ['Mustafa Jabbar', 'Dr. Mehdi Hasan Khan', 'Dr. Muhammad Zafar Iqbal', 'Jamal Nazrul Islam'],
                optionsBn: ['মোস্তাফা জব্বার', 'ডা. মেহেদী হাসান খান', 'ড. মুহম্মদ জাফর ইকবাল', 'জামাল নজরুল ইসলাম'],
                correctIndex: 1,
                explanationEn: 'Dr. Mehdi Hasan Khan and the OmicronLab team invented Avro Keyboard.',
                explanationBn: 'ডা. মেহেদী হাসান খান ও তাঁর দল অভ্র কিবোর্ড তৈরি করেন।'
              }
            ]
          },
          {
            id: 'ssc-4-2',
            lessonNumber: 7,
            titleEn: '4.2 Spreadsheet Calculations and Board Problems',
            titleBn: '৪.২ স্প্রেডশিটে হিসাব এবং বোর্ড পরীক্ষার অংক',
            summaryEn: 'Formula vs Function, calculating percentage, monthly employee payroll, product discount.',
            summaryBn: 'ফর্মুলা ও ফাংশনের পার্থক্য, শতকরা নির্ণয় এবং মাসিক বেতন বিবরণী তৈরি।',
            estimatedMinutes: 30,
            contentBlocks: [
              {
                type: 'text',
                titleEn: 'Calculating Percentages and Discounts in Excel',
                titleBn: 'শতকরা ও ডিসকাউন্ট নির্ণয়ের সূত্র',
                contentEn: 'To calculate a 15% discount on price in Cell B2: =B2*15%. To get the final price: =B2-(B2*15%). This is one of the most frequently asked practical questions in SSC exams.',
                contentBn: 'কোনো পণ্যের মূল্য B2 ঘরে থাকলে এবং ১৫% কমিশন বের করতে চাইলে সূত্র হবে: =B2*15%। আর কমিশন বাদে নিট মূল্য হবে: =B2-(B2*15%)।'
              }
            ],
            quiz: [
              {
                id: 'q-ssc4-2',
                questionEn: 'In Excel, which function calculates the average of cells from A1 to A5?',
                questionBn: 'এক্সেলে A1 থেকে A5 পর্যন্ত সেলগুলোর গড় বের করার সঠিক ফাংশন কোনটি?',
                optionsEn: ['=AVG(A1:A5)', '=AVERAGE(A1:A5)', '=MEAN(A1:A5)', '=SUM(A1:A5)/5%'],
                optionsBn: ['=AVG(A1:A5)', '=AVERAGE(A1:A5)', '=MEAN(A1:A5)', '=SUM(A1:A5)/5%'],
                correctIndex: 1,
                explanationEn: 'The full function name in Excel is =AVERAGE(A1:A5).',
                explanationBn: 'এক্সেলে গড় নির্ণয়ের সম্পূর্ণ ফাংশন হলো =AVERAGE(A1:A5)।'
              }
            ]
          }
        ]
      },
      {
        id: 'ssc-ch-5',
        moduleNumber: 5,
        titleEn: 'Chapter 5: Multimedia & Graphics',
        titleBn: 'অধ্যায় ৫: মাল্টিমিডিয়া ও গ্রাফিক্স',
        descriptionEn: 'Introduction to text, graphics, audio, video, PowerPoint presentations, and basic image editing.',
        descriptionBn: 'মাল্টিমিডিয়ার বিভিন্ন মাধ্যম, পাওয়ারপয়েন্ট স্লাইড এবং ফটোশপ/ইলাস্ট্রেটরের প্রাথমিক ধারণা।',
        lessons: [
          {
            id: 'ssc-5-1',
            lessonNumber: 8,
            titleEn: '5.1 Elements of Multimedia',
            titleBn: '৫.১ মাল্টিমিডিয়ার মাধ্যমসমূহ',
            summaryEn: 'Text, Audio, Graphics, Video, and Interactivity: how multimedia enriches modern communication.',
            summaryBn: 'টেক্সট বা বর্ণ, শব্দ বা অডিও, চিত্র বা গ্রাফিক্স এবং ভিডিওর সংমিশ্রণ।',
            estimatedMinutes: 20,
            contentBlocks: [
              {
                type: 'text',
                titleEn: 'The Three Main Media of Multimedia',
                titleBn: 'মাল্টিমিডিয়ার প্রধান ৩টি মাধ্যম',
                contentEn: '1. Text (written information). 2. Graphics (photos, sketches, vector art). 3. Sound & Video (interactive moving images with sound). When interactive, it is called Interactive Multimedia.',
                contentBn: 'মাল্টিমিডিয়ার ৩টি প্রধান অঙ্গ হলো বর্ণ (Text), চিত্র (Graphics) এবং শব্দ ও ভিডিও (Sound & Video)।'
              }
            ],
            quiz: [
              {
                id: 'q-ssc5-1',
                questionEn: 'Which medium was historically the first digitized element of multimedia?',
                questionBn: 'কম্পিউটারের ইতিহাসে প্রথম কোন মাধ্যমটি ডিজিটাইজড হয়েছিল?',
                optionsEn: ['Sound', 'Video', 'Text / Words', '3D Graphics'],
                optionsBn: ['শব্দ বা অডিও', 'ভিডিও', 'বর্ণ বা টেক্সট', 'ত্রিমাত্রিক গ্রাফিক্স'],
                correctIndex: 2,
                explanationEn: 'Text was the very first medium used in computers.',
                explanationBn: 'কম্পিউটারে সর্বপ্রথম টেক্সট বা বর্ণ নিয়ে কাজের সূচনা হয়েছিল।'
              }
            ]
          }
        ]
      },
      {
        id: 'ssc-ch-6',
        moduleNumber: 6,
        titleEn: 'Chapter 6: Database Basics',
        titleBn: 'অধ্যায় ৬: ডাটাবেজ পরিচিতি ও ব্যবহার',
        descriptionEn: 'What is a database, tables, records, fields, primary keys, and searching information.',
        descriptionBn: 'ডাটাবেজ কী, টেবিল, রেকর্ড, ফিল্ড, প্রাইমারি কি এবং তথ্য অনুসন্ধানের উপায়।',
        lessons: [
          {
            id: 'ssc-6-1',
            lessonNumber: 9,
            titleEn: '6.1 Introduction to Database Systems',
            titleBn: '৬.১ ডাটাবেজ বা তথ্যভাণ্ডারের মৌলিক ধারণা',
            summaryEn: 'Relational databases, tables, records (rows), fields (columns), and primary keys.',
            summaryBn: 'ডাটাবেজ টেবিল, ফিল্ড (কলাম), রেকর্ড (সারি) ও প্রাইমারি কি-এর তাৎপর্য।',
            estimatedMinutes: 25,
            contentBlocks: [
              {
                type: 'text',
                titleEn: 'What is a Database?',
                titleBn: 'ডাটাবেজ কী?',
                contentEn: 'A Database is an organized collection of structured data stored electronically. Think of school student records: each column is a FIELD (Name, Roll, Class), and each row is a complete student RECORD.',
                contentBn: 'ডাটাবেজ হলো বিপুল পরিমাণ তথ্য সুশৃঙ্খলভাবে সাজিয়ে রাখার নিরাপদ ডিজিটাল ব্যবস্থা। যেমন একটি স্কুলের সকল শিক্ষার্থীর তথ্য সম্বলিত তালিকা।'
              }
            ],
            quiz: [
              {
                id: 'q-ssc6-1',
                questionEn: 'In a database table, what is each individual horizontal row called?',
                questionBn: 'ডাটাবেজ টেবিলে প্রতিটি আনুভূমিক সারিকে কী বলা হয়?',
                optionsEn: ['Field', 'Record', 'Index', 'Formula'],
                optionsBn: ['ফিল্ড', 'রেকর্ড (Record)', 'ইনডেক্স', 'ফর্মুলা'],
                correctIndex: 1,
                explanationEn: 'A row in a database table represents one full Record (e.g. one student’s full info).',
                explanationBn: 'টেবিলের প্রতিটি সারিকে রেকর্ড বলা হয়।'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'hsc-ict',
    titleEn: 'HSC ICT (Coming Soon - Phase 2)',
    titleBn: 'এইচএসসি আইসিটি (একাদশ-দ্বাদশ শ্রেণি)',
    category: 'upcoming',
    level: 'Higher Secondary (HSC)',
    levelBn: 'উচ্চ মাধ্যমিক (এইচএসসি)',
    taglineEn: 'Upcoming: Number systems, Boolean algebra, Web design (HTML), C programming, and SQL databases.',
    taglineBn: 'শীঘ্রই আসছে: সংখ্যা পদ্ধতি, ডিজিটাল লজিক গেইট, এইচটিএমএল, সি প্রোগ্রামিং ও এসকিউএল ডাটাবেজ।',
    descriptionEn: 'Comprehensive advanced ICT curriculum for HSC science, commerce, and arts students across Bangladesh.',
    descriptionBn: 'উচ্চ মাধ্যমিকের সকল বিভাগের শিক্ষার্থীদের জন্য প্রোগ্রামিং ও উন্নত আইসিটি সিলেবাস।',
    badge: 'Upcoming Syllabus',
    badgeColor: 'amber',
    modulesCount: 6,
    totalLessons: 24,
    estimatedHours: 35,
    prerequisitesEn: 'SSC ICT or Basic Computer knowledge.',
    prerequisitesBn: 'এসএসসি আইসিটি বা সমমানের জ্ঞান।',
    learningOutcomesEn: ['Binary/Hexadecimal conversions', 'Logic Gates simplification', 'HTML5 web pages', 'C programming algorithms'],
    learningOutcomesBn: ['বাইনারি-হেক্স রূপান্তর', 'লজিক গেইট সরলীকরণ', 'এইচটিএমএল ওয়েবপেজ', 'সি প্রোগ্রামিং'],
    modules: []
  },
  {
    id: 'jsc-ict',
    titleEn: 'JSC ICT (Junior Secondary Curriculum)',
    titleBn: 'জেএসসি আইসিটি (অষ্টম শ্রেণি)',
    category: 'upcoming',
    level: 'Secondary (SSC)',
    levelBn: 'নিম্ন মাধ্যমিক',
    taglineEn: 'Foundational computer hardware, software, networking, and safe cyber habits for Class 8.',
    taglineBn: 'অষ্টম শ্রেণির জন্য কম্পিউটার হার্ডওয়্যার, সফটওয়্যার, নেটওয়ার্কিং ও নিরাপদ সাইবার অভ্যাস।',
    descriptionEn: 'Introduction to networking, server concepts, top-level domains, and computer safety for middle school students.',
    descriptionBn: 'স্কুল শিক্ষার্থীদের জন্য কম্পিউটার নেটওয়ার্কের প্রাথমিক ধারণা ও ব্যবহার।',
    badge: 'Upcoming Syllabus',
    badgeColor: 'purple',
    modulesCount: 4,
    totalLessons: 10,
    estimatedHours: 10,
    prerequisitesEn: 'Primary school education.',
    prerequisitesBn: 'প্রাথমিক শিক্ষা সমাপ্তকারী।',
    learningOutcomesEn: ['Network topology basics', 'Internet protocols', 'Safe online communication'],
    learningOutcomesBn: ['নেটওয়ার্ক টপোলজি', 'ইন্টারনেট প্রোটোকল', 'অনলাইন সুরক্ষা'],
    modules: []
  }
];
