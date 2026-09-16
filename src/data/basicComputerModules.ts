import { ModuleChapter } from '../types';

export const BASIC_COMPUTER_MODULES: ModuleChapter[] = [
  // ==================== MODULE 1 ====================
  {
    id: 'mod-1',
    moduleNumber: 1,
    titleEn: 'Module 1 — Computer Fundamentals',
    titleBn: 'মডিউল ১ — কম্পিউটার পরিচিতি ও ভিত্তি',
    descriptionEn: 'Learn what a computer is, the IPOS cycle, hardware vs software, and internal components like CPU, RAM, and Storage.',
    descriptionBn: 'কম্পিউটার কী, আইপিওএস সাইকেল, হার্ডওয়্যার বনাম সফটওয়্যার এবং সিপিইউ, র‍্যাম ও স্টোরেজের মূল ধারণা।',
    lessons: [
      {
        id: 'bc-1',
        lessonNumber: 1,
        titleEn: '1. What is a Computer & How It Works',
        titleBn: '১. কম্পিউটার কী এবং এটি কীভাবে কাজ করে?',
        summaryEn: 'Understanding the Input-Processing-Output-Storage (IPOS) cycle and types of modern computers.',
        summaryBn: 'কম্পিউটারের ইনপুট-প্রসেসিং-আউটপুট-স্টোরেজ চক্র এবং আধুনিক বিভিন্ন ধরণের কম্পিউটারের পরিচিতি।',
        estimatedMinutes: 20,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'Definition and Core Purpose',
            titleBn: 'সংজ্ঞা ও মূল উদ্দেশ্য',
            contentEn: 'A computer is an electronic machine that accepts raw data as input, processes it according to stored program instructions, produces meaningful output, and stores the results for future use.',
            contentBn: 'কম্পিউটার একটি দ্রুতগতির ইলেকট্রনিক যন্ত্র যা কাঁচা তথ্য (Data) ইনপুট হিসেবে গ্রহণ করে, নির্দেশ অনুযায়ী তা প্রক্রিয়াকরণ (Process) করে এবং ফলাফল বা আউটপুট প্রদান করে।'
          },
          {
            type: 'diagram',
            titleEn: 'The IPOS Cycle (How Every Computer Works)',
            titleBn: 'আইপিওএস চক্র (ইনপুট -> প্রসেসিং -> আউটপুট -> স্টোরেজ)',
            contentEn: 'Input (Keyboard, Mouse) -> Processing (CPU / Central Processing Unit) -> Output (Monitor, Printer) -> Storage (SSD, Hard Disk)',
            contentBn: 'ইনপুট (কীবোর্ড, মাউস) -> প্রসেসিং (সিপিইউ) -> আউটপুট (মনিটর, স্পিকার) -> স্টোরেজ (হার্ডডিস্ক, এসএসডি)',
            extra: {
              steps: [
                { name: 'Input', icon: 'keyboard', descEn: 'Data entered by user (keystrokes, mouse clicks)', descBn: 'ব্যবহারকারী কর্তৃক প্রদত্ত তথ্য বা নির্দেশনা' },
                { name: 'Process', icon: 'cpu', descEn: 'CPU calculates, compares, and logic-checks the data', descBn: 'প্রসেসর বা সিপিইউ হিসাব ও সিদ্ধান্ত গ্রহণ করে' },
                { name: 'Output', icon: 'monitor', descEn: 'Screen shows results, audio plays, or document prints', descBn: 'মনিটরে ফলাফল দেখা যায় বা প্রিন্ট হয়' },
                { name: 'Storage', icon: 'hard-drive', descEn: 'Saved permanently to SSD/HDD for later use', descBn: 'ভবিষ্যতে ব্যবহারের জন্য স্থায়ীভাবে সংরক্ষণ' }
              ]
            }
          },
          {
            type: 'key_terms',
            titleEn: 'Types of Computers',
            titleBn: 'কম্পিউটারের প্রধান ধরণসমূহ',
            contentEn: 'Desktop PC (stationary, high power), Laptop (portable with built-in battery), Tablet (touchscreen tablet), Smartphone (pocket computer).',
            contentBn: 'ডেস্কটপ (টেবিলে রেখে কাজের জন্য), ল্যাপটপ (বহনযোগ্য), ট্যাবলেট ও স্মার্টফোন (পকেট কম্পিউটার)।'
          },
          {
            type: 'callout',
            titleEn: 'Important Concept: Raw Data vs. Meaningful Information',
            titleBn: 'গুরুত্বপূর্ণ ধারণা: কাঁচা ডেটা বনাম অর্থপূর্ণ ইনফরমেশন',
            contentEn: 'Data consists of raw, unorganized facts and figures (e.g. 85, 92, 78). Information is processed data that provides clarity, meaning, and context (e.g. Average Score: 85% - Student Passed with Grade A). A computer exists to turn raw data into valuable information.',
            contentBn: 'ডেটা হলো অগোছালো কাঁচা উপাত্ত (যেমন: ৮৫, ৯২, ৭৮)। আর ইনফরমেশন হলো প্রক্রিয়াজাত তথ্য যা অর্থপূর্ণ সিদ্ধান্ত দেয় (যেমন: পরীক্ষার গড় নম্বর ৮৫%, শিক্ষার্থী এ-গ্রেড পেয়ে পাস করেছে)।'
          },
          {
            type: 'example',
            titleEn: 'Real-World Example: An ATM Cash Withdrawal',
            titleBn: 'বাস্তব জীবনের উদাহরণ: এটিএম বুথে টাকার হিসাব',
            contentEn: 'How the IPOS cycle operates when withdrawing money from a bank ATM:\n• Input: You insert your card and enter your 4-digit secret PIN on the keypad.\n• Processing: The internal processor verifies your credentials and checks your balance.\n• Output: The screen displays "Transaction Approved" and the mechanical dispenser gives you banknotes.\n• Storage: The server records the updated balance in the bank database permanently.',
            contentBn: 'এটিএম বুথ থেকে টাকা উত্তোলনের ক্ষেত্রে আইপিওএস চক্র:\n• ইনপুট: কার্ড প্রবেশ ও কিপ্যাডে ৪ সংখ্যার পিন প্রদান।\n• প্রসেসিং: কম্পিউটার পিন ও একাউন্ট ব্যালেন্স যাচাই করে।\n• আউটপুট: স্ক্রিনে সফল মেসেজ ও ক্যাশ নোট সরবরাহ।\n• স্টোরেজ: ব্যাংকের কেন্দ্রীয় সার্ভারে নতুন ব্যালেন্স স্থায়ীভাবে সংরক্ষণ।'
          }
        ],
        practice: {
          type: 'inside_pc',
          titleEn: 'Interactive: The Computer IPOS Inspector',
          titleBn: 'ইন্টারেক্টিভ: কম্পিউটারের কার্যপ্রক্রিয়া পর্যবেক্ষণ',
          descriptionEn: 'Click through each stage to observe how data flows from user input to CPU calculation, screen output, and persistent storage.',
          descriptionBn: 'ইনপুট থেকে প্রসেসর এবং মনিটরে ডেটা প্রবাহের ধাপগুলো পরীক্ষা করুন।'
        },
        quiz: [
          {
            id: 'q-bc1-1',
            questionEn: 'Which sequence correctly describes how a computer handles information?',
            questionBn: 'কম্পিউটার কোন ক্রমানুসারে তথ্য প্রক্রিয়াকরণ করে?',
            optionsEn: ['Output -> Input -> Storage -> Process', 'Input -> Processing -> Output -> Storage', 'Storage -> Output -> Input -> Process', 'Processing -> Input -> Output -> Storage'],
            optionsBn: ['আউটপুট -> ইনপুট -> স্টোরেজ -> প্রসেস', 'ইনপুট -> প্রসেসিং -> আউটপুট -> স্টোরেজ', 'স্টোরেজ -> আউটপুট -> ইনপুট -> প্রসেস', 'প্রসেসিং -> ইনপুট -> আউটপুট -> স্টোরেজ'],
            correctIndex: 1,
            explanationEn: 'Every computer receives Input first, the CPU Processes it, produces Output, and saves it in Storage (IPOS cycle).',
            explanationBn: 'কম্পিউটার প্রথমে ইনপুট নেয়, সিপিইউ দিয়ে প্রসেস করে, আউটপুট দেখায় এবং স্টোরেজে জমা রাখে।'
          },
          {
            id: 'q-bc1-2',
            questionEn: 'Which of the following is considered an Input device?',
            questionBn: 'নিচের কোনটি একটি ইনপুট ডিভাইস?',
            optionsEn: ['Monitor', 'Printer', 'Keyboard', 'Speaker'],
            optionsBn: ['মনিটর', 'প্রিন্টার', 'কীবোর্ড', 'স্পিকার'],
            correctIndex: 2,
            explanationEn: 'A keyboard sends signals and letters into the computer, making it an input device. Monitors and speakers are output devices.',
            explanationBn: 'কীবোর্ডের মাধ্যমে কম্পিউটারকে নির্দেশ দেওয়া হয়, তাই এটি ইনপুট ডিভাইস।'
          }
        ]
      },
      {
        id: 'bc-2',
        lessonNumber: 2,
        titleEn: '2. Hardware and Software',
        titleBn: '২. হার্ডওয়্যার এবং সফটওয়্যার',
        summaryEn: 'Understand the tangible physical parts you can touch vs the digital software programs that control the system.',
        summaryBn: 'স্পর্শ করা যায় এমন বাহ্যিক যন্ত্রাংশ (হার্ডওয়্যার) এবং ডিজিটাল প্রোগ্রামের (সফটওয়্যার) মধ্যকার পার্থক্য।',
        estimatedMinutes: 20,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'Hardware: The Physical Body',
            titleBn: 'হার্ডওয়্যার: কম্পিউটারের দৃশ্যমান দেহ',
            contentEn: 'Hardware refers to the physical, touchable components of a computer system. Examples include the monitor, keyboard, mouse, motherboard, SSD, and RAM modules.',
            contentBn: 'হার্ডওয়্যার হলো কম্পিউটারের যেসকল যন্ত্রপাতি চোখে দেখা যায় এবং স্পর্শ করা যায় (মনিটর, কীবোর্ড, মাউস, মাদারবোর্ড, হার্ডডিস্ক ও র‍্যাম)।'
          },
          {
            type: 'text',
            titleEn: 'Software: The Digital Soul',
            titleBn: 'সফটওয়্যার: কম্পিউটারের প্রাণ বা নির্দেশমালা',
            contentEn: 'Software is a set of digital instructions that tell the hardware what tasks to perform. Without software, hardware cannot function.',
            contentBn: 'সফটওয়্যার হলো ডিজিটাল নির্দেশ বা প্রোগ্রাম যা হার্ডওয়্যারকে পরিচালনা করে। সফটওয়্যার ছাড়া হার্ডওয়্যার অচল।'
          },
          {
            type: 'table',
            titleEn: 'System Software vs Application Software',
            titleBn: 'সিস্টেম সফটওয়্যার বনাম অ্যাপ্লিকেশন সফটওয়্যার',
            contentEn: 'System software controls the hardware (Windows, Linux, Android). Application software solves specific user tasks (MS Word, Chrome, VLC).',
            contentBn: 'সিস্টেম সফটওয়্যার পুরো কম্পিউটার নিয়ন্ত্রণ করে (উইন্ডোজ)। অ্যাপ্লিকেশন সফটওয়্যার ব্যবহারকারীর কাজ করে (এমএস ওয়ার্ড, ক্রোম)।'
          }
        ],
        quiz: [
          {
            id: 'q-bc2-1',
            questionEn: 'Which of the following is an example of Hardware?',
            questionBn: 'নিচের কোনটি হার্ডওয়্যারের উদাহরণ?',
            optionsEn: ['Google Chrome', 'Windows 11', 'Mouse', 'Microsoft Word'],
            optionsBn: ['গুগল ক্রোম', 'উইন্ডোজ ১১', 'মাউস', 'মাইক্রোসফট ওয়ার্ড'],
            correctIndex: 2,
            explanationEn: 'The mouse is a physical device you can hold in your hand, making it hardware.',
            explanationBn: 'মাউস একটি বাস্তব যন্ত্রাংশ যা হাত দিয়ে ধরা যায়, তাই এটি হার্ডওয়্যার।'
          }
        ]
      },
      {
        id: 'bc-3',
        lessonNumber: 3,
        titleEn: '3. CPU, RAM, and Storage',
        titleBn: '৩. সিপিইউ, র‍্যাম এবং স্টোরেজ',
        summaryEn: 'Demystifying the internal engine: the processor brain, high-speed RAM workspace, and persistent SSD/HDD storage.',
        summaryBn: 'কম্পিউটারের মস্তিষ্ক সিপিইউ, ক্ষণস্থায়ী মেমরি র‍্যাম এবং দীর্ঘস্থায়ী স্টোরেজের কার্যপদ্ধতি।',
        estimatedMinutes: 25,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'CPU: Central Processing Unit (The Brain)',
            titleBn: 'সিপিইউ: কেন্দ্রীয় প্রক্রিয়াকরণ অংশ (কম্পিউটারের মস্তিষ্ক)',
            contentEn: 'The CPU performs billions of mathematical and logical operations per second. Modern CPUs from Intel and AMD operate in Gigahertz (GHz).',
            contentBn: 'সিপিইউ প্রতি সেকেন্ডে কোটি কোটি গণনা ও সিদ্ধান্ত সম্পন্ন করে। ইন্টেল ও এএমডি বিশ্বের শীর্ষস্থানীয় সিপিইউ নির্মাতা।'
          },
          {
            type: 'text',
            titleEn: 'RAM: Random Access Memory (The Working Desk)',
            titleBn: 'র‍্যাম: অস্থায়ী মেমরি (কাজের টেবিল)',
            contentEn: 'RAM is temporary high-speed workspace. When you open an application, it loads into RAM. When you turn off your PC, all RAM data clears immediately (Volatile).',
            contentBn: 'র‍্যাম হলো পড়ার টেবিলের মতো। চলমান অ্যাপগুলো সাময়িকভাবে র‍্যামে অবস্থান করে। বিদ্যুৎ বন্ধ হলে এর সব ডেটা মুছে যায় (Volatile)।'
          },
          {
            type: 'text',
            titleEn: 'Storage: SSD and HDD (The Bookshelf)',
            titleBn: 'স্টোরেজ: হার্ডডিস্ক ও এসএসডি (স্থায়ী ড্রয়ার)',
            contentEn: 'Storage is non-volatile: files remain safe when the PC is turned off. Modern SSDs (Solid State Drives) are 5-10x faster than traditional magnetic HDDs.',
            contentBn: 'স্টোরেজে ফাইল স্থায়ীভাবে থাকে। আধুনিক এসএসডি পুরনো হার্ডডিস্কের চেয়ে বহু গুণ দ্রুতগতির।'
          },
          {
            type: 'callout',
            titleEn: 'Crucial Concept: RAM is Volatile, Storage is Permanent',
            titleBn: 'জরুরি মূলনীতি: র‍্যাম ক্ষণস্থায়ী, স্টোরেজ স্থায়ী',
            contentEn: 'Everything active on your screen (typing an essay, playing music) is running temporarily in high-speed RAM. Unless you save it to permanent Storage (SSD/HDD), a sudden power cut will erase all unsaved work instantly! Always press Ctrl + S frequently.',
            contentBn: 'স্ক্রিনে চলমান সব কাজ সাময়িকভাবে র‍্যামে অবস্থান করে। স্টোরেজে (হার্ডডিস্ক/এসএসডি) সেভ না করলে বিদ্যুৎ চলে যাওয়ার সাথে সাথে তা মুছে যাবে! তাই নিয়মিত Ctrl + S চেপে সেভ করার অভ্যাস করুন।'
          },
          {
            type: 'example',
            titleEn: 'Everyday Practical Analogy: The Chef and Kitchen Desk',
            titleBn: 'বাস্তব জীবনের উপমা: বাবুর্চি ও রান্নার টেবিল',
            contentEn: '• CPU is the Head Chef (calculating recipes and actively cooking).\n• RAM is the Cutting Board & Countertop (where ingredients for the current dish sit for rapid reaching).\n• Storage (SSD) is the Pantry & Refrigerator (where hundreds of ingredients are safely stored overnight).',
            contentBn: '• সিপিইউ হলো প্রধান বাবুর্চি (যে হিসাব ও রান্না পরিচালনা করে)।\n• র‍্যাম হলো কাটিং বোর্ড ও রান্নার টেবিল (যেখানে হাত বাড়ালেই প্রয়োজনীয় উপাদান পাওয়া যায়)।\n• স্টোরেজ হলো রেফ্রিজারেটর বা স্টোর রুম (যেখানে সব জিনিসপত্র স্থায়ীভাবে সংরক্ষিত থাকে)।'
          }
        ],
        practice: {
          type: 'inside_pc',
          titleEn: 'Interactive PC Component Explorer',
          titleBn: 'ইন্টারেক্টিভ পিসি পার্টস এক্সপ্লোরার',
          descriptionEn: 'Click on the Motherboard, CPU, RAM stick, and SSD to explore their roles and technical specifications.',
          descriptionBn: 'সিপিইউ, র‍্যাম ও এসএসডি-র ওপর ক্লিক করে ভেতরের কাঠামো ও কাজ দেখুন।'
        },
        quiz: [
          {
            id: 'q-bc3-1',
            questionEn: 'What happens to the data stored in RAM when you power off your computer?',
            questionBn: 'কম্পিউটার বন্ধ করলে র‍্যামের ডাটার কী হয়?',
            optionsEn: ['It is saved to Google Drive', 'It is permanently kept inside RAM', 'It is erased immediately because RAM is volatile', 'It is converted into a PDF file'],
            optionsBn: ['গুগল ড্রাইভে চলে যায়', 'র‍্যামের মধ্যে স্থায়ী থাকে', 'বিদ্যুৎ চলে গেলে সাথে সাথে মুছে যায়', 'পিডিএফ ফাইলে রূপান্তর হয়'],
            correctIndex: 2,
            explanationEn: 'RAM is volatile memory; it requires electrical power to hold data. When power cuts, all RAM data is cleared.',
            explanationBn: 'র‍্যাম একটি উদ্বায়ী (Volatile) মেমোরি। বিদ্যুৎ সংযোগ বিচ্ছিন্ন হলেই এর সমস্ত ডেটা মুছে যায়।'
          }
        ]
      }
    ]
  },

  // ==================== MODULE 2 ====================
  {
    id: 'mod-2',
    moduleNumber: 2,
    titleEn: 'Module 2 — Keyboard & Mouse',
    titleBn: 'মডিউল ২ — কীবোর্ড ও মাউস',
    descriptionEn: 'Master essential input skills: mouse ergonomics, clicks, scrolling, drag-and-drop, and universal keyboard shortcuts.',
    descriptionBn: 'মাউস ধরার সঠিক নিয়ম, ক্লিক, স্ক্রলিং, ড্র্যাগ-অ্যান্ড-ড্রপ এবং বহুল ব্যবহৃত কীবোর্ড শর্টকাট।',
    lessons: [
      {
        id: 'bc-4',
        lessonNumber: 4,
        titleEn: '4. Mouse Mastery: Clicks, Scrolls & Drags',
        titleBn: '৪. মাউসের ব্যবহার: ক্লিক, স্ক্রল ও ড্র্যাগ',
        summaryEn: 'How to hold a mouse, left click, right click, scroll wheel, and cursor states.',
        summaryBn: 'মাউস ধরার সঠিক নিয়ম, লেফট ক্লিক, রাইট ক্লিক ও স্ক্রল হুইলের সঠিক ব্যবহার।',
        estimatedMinutes: 20,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'The Mouse: Pointer on Screen',
            titleBn: 'মাউসের মৌলিক ব্যবহার',
            contentEn: 'The mouse moves the graphical arrow on screen. Left button selects or opens items. Right button displays contextual options. The middle scroll wheel navigates up and down documents.',
            contentBn: 'মাউস দিয়ে স্ক্রিনে কার্সর নিয়ন্ত্রণ করা হয়। বাম বাটন দিয়ে সিলেক্ট বা ওপেন, ডান বাটন দিয়ে অপশন মেনু এবং স্ক্রল হুইল দিয়ে পেজ উপরে-নিচে নেওয়া হয়।'
          },
          {
            type: 'step_guide',
            titleEn: 'Four Core Mouse Actions',
            titleBn: '৪টি অপরিহার্য মাউস অ্যাকশন',
            contentEn: '1. Single Left Click: Select an item.\n2. Double Left Click: Open a folder or app.\n3. Right Click: Open shortcut menu (Copy, Rename, Properties).\n4. Drag & Drop: Hold left button to relocate an item.',
            contentBn: '১. সিঙ্গেল ক্লিক: সিলেক্ট করা।\n২. ডাবল ক্লিক: ফাইল বা প্রোগ্রাম ওপেন করা।\n৩. রাইট ক্লিক: অপশন মেনু দেখা।\n৪. ড্র্যাগ অ্যান্ড ড্রপ: মাউস চেপে ধরে ফাইল সরানো।'
          }
        ],
        quiz: [
          {
            id: 'q-bc4-1',
            questionEn: 'Which mouse action brings up the options menu (like Rename, Copy, and Properties)?',
            questionBn: 'কোন মাউস ক্লিকের মাধ্যমে কপি, রিনেম ইত্যাদি অপশন মেনু পাওয়া যায়?',
            optionsEn: ['Single left click', 'Right click', 'Scroll wheel push', 'Triple click'],
            optionsBn: ['সিঙ্গেল লেফট ক্লিক', 'রাইট ক্লিক (ডান বাটন)', 'স্ক্রল হুইল চাপ', 'ট্রিপল ক্লিক'],
            correctIndex: 1,
            explanationEn: 'Right clicking any file or empty desktop area opens a context menu with options like Copy, Paste, and Rename.',
            explanationBn: 'যেকোনো ফাইলের ওপর রাইট ক্লিক করলে অপশন মেনু প্রদর্শিত হয়।'
          }
        ]
      },
      {
        id: 'bc-5',
        lessonNumber: 5,
        titleEn: '5. Keyboard Keys and Universal Shortcuts',
        titleBn: '৫. কীবোর্ড কীসমূহ এবং গুরুত্বপূর্ণ শর্টকাট',
        summaryEn: 'Enter, Backspace, Delete, Caps Lock, Shift, and vital shortcuts: Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+S.',
        summaryBn: 'এন্টার, ব্যাকস্পেস, ডিলিট, শিফট এবং অতি দরকারী শর্টকাট (কপি, পেস্ট, সেভ, আনডু) শিখুন।',
        estimatedMinutes: 25,
        contentBlocks: [
          {
            type: 'shortcut_table',
            titleEn: 'Essential Universal Shortcuts',
            titleBn: 'বিশ্বব্যাপী বহুল ব্যবহৃত কীবোর্ড শর্টকাট',
            contentEn: 'Ctrl+C = Copy, Ctrl+V = Paste, Ctrl+X = Cut, Ctrl+Z = Undo, Ctrl+S = Save, Ctrl+A = Select All, Alt+Tab = Switch Windows.',
            contentBn: 'Ctrl+C = কপি, Ctrl+V = পেস্ট, Ctrl+X = কাট, Ctrl+Z = আনডু, Ctrl+S = সেভ করা, Ctrl+A = সব সিলেক্ট করা, Alt+Tab = অন্য উইন্ডোতে যাওয়া।',
            extra: {
              shortcuts: [
                { keys: 'Ctrl + C', actionEn: 'Copy selected text or file', actionBn: 'সিলেক্ট করা লেখা বা ফাইল কপি করা' },
                { keys: 'Ctrl + V', actionEn: 'Paste copied item', actionBn: 'কপি করা জিনিস পেস্ট করা' },
                { keys: 'Ctrl + Z', actionEn: 'Undo accidental mistake', actionBn: 'ভুল হলে আগের অবস্থায় ফিরে আসা' },
                { keys: 'Ctrl + S', actionEn: 'Save current document instantly', actionBn: 'ডকুমেন্ট সংরক্ষণ বা সেভ করা' },
                { keys: 'Ctrl + A', actionEn: 'Select everything on screen', actionBn: 'সবকিছু একসাথে সিলেক্ট করা' },
                { keys: 'Alt + Tab', actionEn: 'Switch between open apps', actionBn: 'চালু থাকা বিভিন্ন অ্যাপে দ্রুত পরিবর্তন' }
              ]
            }
          }
        ],
        practice: {
          type: 'keyboard_shortcuts',
          titleEn: 'Interactive Shortcut Trainer',
          titleBn: 'ইন্টারেক্টিভ শর্টকাট প্র্যাকটিস ল্যাব',
          descriptionEn: 'Press the corresponding keys on your physical keyboard to trigger actions in our simulated terminal.',
          descriptionBn: 'কীবোর্ডের বাটন চেপে শর্টকাট পরীক্ষা করুন এবং পয়েন্ট অর্জন করুন।'
        },
        quiz: [
          {
            id: 'q-bc5-1',
            questionEn: 'If you accidentally delete a paragraph in MS Word, what shortcut restores it?',
            questionBn: 'ভুলবশত কোনো লেখা মুছে ফেললে তা ফেরাতে কোন শর্টকাট ব্যবহার করবেন?',
            optionsEn: ['Ctrl + P', 'Ctrl + S', 'Ctrl + Z', 'Ctrl + F'],
            optionsBn: ['Ctrl + P', 'Ctrl + S', 'Ctrl + Z (Undo)', 'Ctrl + F'],
            correctIndex: 2,
            explanationEn: 'Ctrl + Z triggers the Undo command, restoring your previous action instantly.',
            explanationBn: 'Ctrl + Z চাপলে যেকোনো ভুলের আগের অবস্থায় ফিরে যাওয়া যায় (Undo)।'
          }
        ]
      }
    ]
  },

  // ==================== MODULE 3 ====================
  {
    id: 'mod-3',
    moduleNumber: 3,
    titleEn: 'Module 3 — Typing Fundamentals',
    titleBn: 'মডিউল ৩ — টাইপিং ফান্ডামেন্টালস',
    descriptionEn: 'Learn touch typing posture, home row finger positioning (ASDF JKL;), tactile anchor bumps on F and J, and practice with our built-in typing tool.',
    descriptionBn: 'সঠিক নিয়মে বসা, হোম রো (ASDF JKL;), F এবং J কী-র দাগ চেনা এবং বিল্ট-ইন টাইপিং টুলের মাধ্যমে অনুশীলন।',
    lessons: [
      {
        id: 'bc-6',
        lessonNumber: 6,
        titleEn: '6. Touch Typing Posture & The Home Row',
        titleBn: '৬. টাইপিংয়ের সঠিক ভঙ্গি ও হোম রো পরিচিতি',
        summaryEn: 'Home row position (ASDF JKL;), the tactile bumps on F and J, touch typing posture, and building muscle memory.',
        summaryBn: 'হোম-রো (ASDF JKL;), এফ ও জে কী-র বাম্প, সোজা হয়ে বসার নিয়ম ও আঙুলের অবস্থান।',
        estimatedMinutes: 25,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'The Home Row: Your Fingers Base Station',
            titleBn: 'হোম-রো: আঙুল রাখার মূল অবস্থান',
            contentEn: 'Always place your left hand fingers on A-S-D-F and your right hand fingers on J-K-L-;. Notice the small raised bumps on F and J! You can locate them without looking down at the keyboard.',
            contentBn: 'বাম হাতের চার আঙুল থাকবে A, S, D, F কী-এর উপর এবং ডান হাতের চার আঙুল থাকবে J, K, L, ; কী-এর উপর। F এবং J কী-তে আঙুল দিয়ে স্পর্শ করলেই ছোট উঁচু দাগ (বাম্প) অনুভব করা যায়।'
          },
          {
            type: 'step_guide',
            titleEn: 'Touch Typing Rules for High Speed',
            titleBn: 'দ্রুত টাইপিংয়ের ৪টি সুবর্ণ নিয়ম',
            contentEn: '1. Do not look down at the keyboard; look at the screen.\n2. Each finger has a specific set of keys it is responsible for.\n3. Use both thumbs for the Spacebar.\n4. Accuracy always comes first; speed will follow naturally.',
            contentBn: '১. কীবোর্ডের দিকে না তাকিয়ে স্ক্রিনে তাকানোর অভ্যাস করুন।\n২. প্রতিটি আঙুলের জন্য নির্দিষ্ট কী বরাদ্দ থাকে।\n৩. স্পেসবারের জন্য বৃদ্ধাঙ্গুলি ব্যবহার করুন।\n৪. প্রথমে নির্ভুলভাবে টাইপ করুন, গতি নিজে থেকেই বেড়ে যাবে।'
          }
        ],
        quiz: [
          {
            id: 'q-bc6-1',
            questionEn: 'Which two keys on standard keyboards have small tactile bumps for index fingers?',
            questionBn: 'কোন দুটি কী-তে আঙুল দিয়ে চেনার জন্য ছোট উঁচু বাম্প থাকে?',
            optionsEn: ['A and L', 'F and J', 'C and M', 'G and H'],
            optionsBn: ['A এবং L', 'F এবং J', 'C এবং M', 'G এবং H'],
            correctIndex: 1,
            explanationEn: 'The F key (left index finger) and J key (right index finger) have tactile bumps so you can position your hands without looking.',
            explanationBn: 'F এবং J কী-তে আঙুলের স্পর্শে চেনার জন্য সামান্য উঁচু দাগ বা বাম্প থাকে।'
          }
        ]
      },
      {
        id: 'bc-7',
        lessonNumber: 7,
        titleEn: '7. Letter & Finger Practice with Built-in Typing Tool',
        titleBn: '৭. বিল্ট-ইন টাইপিং টুলের সাহায্যে অক্ষর ও আঙুল অনুশীলন',
        summaryEn: 'Hands-on practice: connect directly with the built-in typing tool to calculate real-time WPM, accuracy, errors, and set personal bests.',
        summaryBn: 'বিল্ট-ইন টাইপিং টুলের মাধ্যমে সরাসরি টাইপ করুন এবং লাইভ স্পিড (WPM) ও নির্ভুলতা যাচাই করুন।',
        estimatedMinutes: 25,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'Understanding WPM and Accuracy',
            titleBn: 'WPM এবং অ্যাকুরেসি বোঝার উপায়',
            contentEn: 'WPM stands for Words Per Minute (standardized to 5 keystrokes per word). Net WPM subtracts your error penalty. Professional data-entry standards require at least 30 to 40 WPM with 95%+ accuracy.',
            contentBn: 'WPM মানে Words Per Minute বা প্রতি মিনিটে শব্দের গতি। নির্ভুলতা ৯৫% এর উপরে রেখে গতি বাড়ানোর অনুশীলন করুন।'
          }
        ],
        practice: {
          type: 'typing_prompt',
          titleEn: 'Built-in Interactive Typing Practice',
          titleBn: 'বিল্ট-ইন ইন্টারেক্টিভ টাইপিং অনুশীলন',
          descriptionEn: 'Practice your Home Row keys directly below. The typing engine tracks your Net WPM, accuracy percentage, and awards personal bests!',
          descriptionBn: 'সরাসরি টাইপিং ইঞ্জিনের মাধ্যমে হোম রো কীসমূহ টাইপ করুন এবং লাইভ ফলাফল দেখুন।'
        },
        quiz: [
          {
            id: 'q-bc7-1',
            questionEn: 'What does WPM stand for in computer typing tests?',
            questionBn: 'টাইপিং পরীক্ষায় WPM এর পূর্ণরূপ কী?',
            optionsEn: ['Words Per Minute', 'Wireless Power Management', 'Windows Program Mode', 'Word Processing Module'],
            optionsBn: ['Words Per Minute (শব্দ প্রতি মিনিটে)', 'ওয়্যারলেস পাওয়ার', 'উইন্ডোজ প্রোগ্রাম মোড', 'ওয়ার্ড প্রসেসিং মডিউল'],
            correctIndex: 0,
            explanationEn: 'WPM stands for Words Per Minute, the universal measure of typing speed.',
            explanationBn: 'WPM দিয়ে প্রতি মিনিটে কত শব্দ টাইপ করা যায় তা পরিমাপ করা হয়।'
          }
        ]
      }
    ]
  },

  // ==================== MODULE 4 ====================
  {
    id: 'mod-4',
    moduleNumber: 4,
    titleEn: 'Module 4 — Files & Folders',
    titleBn: 'মডিউল ৪ — ফাইল ও ফোল্ডার',
    descriptionEn: 'Learn how files and folders work, naming conventions, organizing documents into structured directories, and understanding file extensions.',
    descriptionBn: 'ফাইল ও ফোল্ডারের পার্থক্য, ফোল্ডার তৈরি ও সাজানো এবং ফাইল এক্সটেনশন (.docx, .pdf ইত্যাদি) পরিচিতি।',
    lessons: [
      {
        id: 'bc-8',
        lessonNumber: 8,
        titleEn: '8. File and Folder Concepts',
        titleBn: '৮. ফাইল এবং ফোল্ডারের ধারণা',
        summaryEn: 'Creating, renaming, moving, and organizing files; understanding virtual drawers and paths.',
        summaryBn: 'ফাইল ও ফোল্ডার তৈরি, নাম পরিবর্তন, মুভ করা এবং গুছিয়ে রাখার পদ্ধতি।',
        estimatedMinutes: 20,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'What is a File vs What is a Folder?',
            titleBn: 'ফাইল ও ফোল্ডারের পার্থক্য',
            contentEn: 'A FILE is a single digital document, picture, or song. A FOLDER is a virtual container used to store and group multiple files together so your PC stays organized.',
            contentBn: 'ফাইল হলো নির্দিষ্ট কোনো তথ্য (চিঠি, গান, ছবি)। আর ফোল্ডার হলো ড্রয়ারের মতো যার মধ্যে অনেক ফাইল সাজিয়ে রাখা যায়।'
          },
          {
            type: 'step_guide',
            titleEn: 'Creating a New Folder in Windows',
            titleBn: 'উইন্ডোজে নতুন ফোল্ডার তৈরির নিয়ম',
            contentEn: '1. Right-click on any empty area of the desktop or in File Explorer.\n2. Hover over "New".\n3. Click "Folder".\n4. Type a descriptive name (e.g. "School Homework") and press Enter.',
            contentBn: '১. মাউসের রাইট বাটনে ক্লিক করুন।\n২. "New" অপশনে যান।\n৩. "Folder" এ ক্লিক করুন।\n৪. নাম লিখে কীবোর্ডের Enter চাপুন।'
          }
        ],
        practice: {
          type: 'file_organizer',
          titleEn: 'Interactive File Manager Simulator',
          titleBn: 'ইন্টারেক্টিভ ফাইল ম্যানেজার সিমুলেটর',
          descriptionEn: 'Practice creating folders, dragging files into categories, and renaming items in our virtual computer environment.',
          descriptionBn: 'ভার্চুয়াল কম্পিউটারে ফোল্ডার তৈরি এবং ফাইল ড্র্যাগ-অ্যান্ড-ড্রপ করে সাজিয়ে নেওয়ার প্র্যাকটিস।'
        },
        quiz: [
          {
            id: 'q-bc8-1',
            questionEn: 'Which is used as a container to organize multiple files together?',
            questionBn: 'একাধিক ফাইল একসাথে গুছিয়ে রাখার জন্য কোনটি ব্যবহার করা হয়?',
            optionsEn: ['A Folder', 'A Monitor', 'A USB Cable', 'A Power Supply'],
            optionsBn: ['ফোল্ডার (Folder)', 'মনিটর', 'ইউএসবি ক্যাবল', 'পাওয়ার সাপ্লাই'],
            correctIndex: 0,
            explanationEn: 'Folders hold and categorize multiple files so your computer stays organized.',
            explanationBn: 'ফোল্ডারের মধ্যে প্রয়োজনীয় ফাইলসমূহ আলাদা আলাদা ক্যাটাগরিতে গুছিয়ে রাখা হয়।'
          }
        ]
      },
      {
        id: 'bc-9',
        lessonNumber: 9,
        titleEn: '9. Common File Extensions',
        titleBn: '৯. বহুল ব্যবহৃত ফাইল এক্সটেনশনসমূহ',
        summaryEn: 'Understanding file types by their extension: .docx, .xlsx, .pdf, .jpg, .png, .mp4, and .mp3.',
        summaryBn: 'ফাইল এক্সটেনশন দেখে ফাইল চেনা: .docx, .pdf, .xlsx, .jpg, .mp4 ইত্যাদি।',
        estimatedMinutes: 20,
        contentBlocks: [
          {
            type: 'table',
            titleEn: 'Standard File Extensions Explained',
            titleBn: 'ফাইল এক্সটেনশন ও তাদের ব্যবহারের ক্ষেত্র',
            contentEn: '.docx (Word document), .pdf (Universal portable document), .xlsx (Excel spreadsheet), .pptx (PowerPoint slides), .jpg / .png (Images), .mp4 (Video), .mp3 (Audio).',
            contentBn: '.docx (ওয়ার্ড ডকুমেন্ট), .pdf (পিডিএফ ফাইল), .xlsx (এক্সেল হিসাব), .pptx (স্লাইড), .jpg/.png (ছবি), .mp4 (ভিডিও)।'
          }
        ],
        quiz: [
          {
            id: 'q-bc9-1',
            questionEn: 'Which file extension represents an official Portable Document Format readable on any device?',
            questionBn: 'যেকোনো ডিভাইসে অবিকল দেখার উপযোগী ডকুমেন্ট ফরম্যাট কোনটি?',
            optionsEn: ['.mp3', '.pdf', '.exe', '.png'],
            optionsBn: ['.mp3', '.pdf (PDF)', '.exe', '.png'],
            correctIndex: 1,
            explanationEn: '.pdf stands for Portable Document Format, widely used for books, resumes, and official documents.',
            explanationBn: '.pdf ফরম্যাটে ফাইল রাখলে যেকোনো ডিভাইসে কোনো ফন্ট বা ফরম্যাটিং নষ্ট হয় না।'
          }
        ]
      }
    ]
  },

  // ==================== MODULE 5 ====================
  {
    id: 'mod-5',
    moduleNumber: 5,
    titleEn: 'Module 5 — Operating System Basics',
    titleBn: 'মডিউল ৫ — অপারেটিং সিস্টেমের মূল ধারণা',
    descriptionEn: 'Understand the master software connecting user and hardware: Windows 10/11 navigation, Desktop, Taskbar, Start Menu, and window control buttons.',
    descriptionBn: 'অপারেটিং সিস্টেম কী, উইন্ডোজ ১০/১১ এর ডেস্কটপ, টাস্কবার, স্টার্ট মেনু এবং উইন্ডো নিয়ন্ত্রণ বাটনসমূহ।',
    lessons: [
      {
        id: 'bc-10',
        lessonNumber: 10,
        titleEn: '10. What is an Operating System?',
        titleBn: '১০. অপারেটিং সিস্টেম কী এবং এর প্রয়োজনীয়তা',
        summaryEn: 'Role of the OS as the master conductor between hardware, user, and programs.',
        summaryBn: 'অপারেটিং সিস্টেম কীভাবে কম্পিউটার হার্ডওয়্যার ও ব্যবহারকারীর মধ্যে সেতুবন্ধন হিসেবে কাজ করে।',
        estimatedMinutes: 20,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'The Operating System: Master Manager',
            titleBn: 'কম্পিউটারের মূল পরিচালক',
            contentEn: 'An Operating System (OS) is the foundational system software that manages computer hardware, system memory, file systems, and runs user applications.',
            contentBn: 'অপারেটিং সিস্টেম হলো মূল সফটওয়্যার যা কম্পিউটারের প্রসেসর, মেমরি এবং হার্ডওয়্যার পরিচালনা করে।'
          },
          {
            type: 'key_terms',
            titleEn: 'Major Operating Systems in the World',
            titleBn: 'বিশ্বের শীর্ষ অপারেটিং সিস্টেমসমূহ',
            contentEn: 'Microsoft Windows (most popular on laptops & PCs), Google Android (smartphones), Apple macOS & iOS, Linux (servers and coding).',
            contentBn: 'মাইক্রোসফট উইন্ডোজ (ল্যাপটপ ও পিসিতে জনপ্রিয়), গুগল অ্যান্ড্রয়েড (স্মার্টফোনে), অ্যাপল ম্যাকওএস এবং লিনাক্স।'
          }
        ],
        quiz: [
          {
            id: 'q-bc10-1',
            questionEn: 'Which of the following is an Operating System?',
            questionBn: 'নিচের কোনটি একটি অপারেটিং সিস্টেম?',
            optionsEn: ['Google Chrome', 'Microsoft Windows', 'VLC Media Player', 'Microsoft Excel'],
            optionsBn: ['গুগল ক্রোম', 'মাইক্রোসফট উইন্ডোজ', 'ভিএলসি প্লেয়ার', 'মাইক্রোসফট এক্সেল'],
            correctIndex: 1,
            explanationEn: 'Microsoft Windows is an Operating System. Chrome, VLC, and Excel are applications running on top of Windows.',
            explanationBn: 'মাইক্রোসফট উইন্ডোজ একটি পূর্ণাঙ্গ অপারেটিং সিস্টেম।'
          }
        ]
      },
      {
        id: 'bc-11',
        lessonNumber: 11,
        titleEn: '11. Windows Navigation & Control Buttons',
        titleBn: '১১. উইন্ডোজ নেভিগেশন ও উইন্ডো কন্ট্রোল বাটন',
        summaryEn: 'The Desktop, Taskbar, Start Menu, System Tray, File Explorer, and Minimize/Maximize/Close buttons.',
        summaryBn: 'ডেস্কটপ, টাস্কবার, স্টার্ট মেনু, ফাইল এক্সপ্লোরার এবং উইন্ডো নিয়ন্ত্রণ বাটনসমূহ।',
        estimatedMinutes: 20,
        contentBlocks: [
          {
            type: 'step_guide',
            titleEn: 'The Three Window Control Buttons (Top-Right)',
            titleBn: 'উপরের ডানে থাকা তিনটি উইন্ডো কন্ট্রোল বাটন',
            contentEn: '1. Minimize (_): Hides window to taskbar.\n2. Maximize / Restore (Square): Expands window to fill the entire monitor.\n3. Close (X): Completely terminates the running application.',
            contentBn: '১. মিনিমাইজ (_): উইন্ডোকে লুকিয়ে টাস্কবারে নামিয়ে রাখে।\n২. ম্যাক্সিমাইজ (চারকোনা): পুরো স্ক্রিনে বড় করে।\n৩. ক্লোজ (X): প্রোগ্রামটি পুরোপুরি বন্ধ করে দেয়।'
          }
        ],
        quiz: [
          {
            id: 'q-bc11-1',
            questionEn: 'What does the "X" button at the top-right corner of a window do?',
            questionBn: 'যেকোনো সফটওয়্যার উইন্ডোর উপরের ডানের "X" বাটনে ক্লিক করলে কী হয়?',
            optionsEn: ['Deletes the hard drive', 'Closes the program', 'Increases screen brightness', 'Prints the document'],
            optionsBn: ['হার্ডডিস্ক মুছে যায়', 'প্রোগ্রামটি বন্ধ হয়ে যায়', 'উজ্জ্বলতা বৃদ্ধি পায়', 'প্রিন্ট হয়'],
            correctIndex: 1,
            explanationEn: 'Clicking the X button closes the current window or program.',
            explanationBn: 'X বাটনে ক্লিক করলে রানিং উইন্ডোটি বন্ধ হয়ে যায়।'
          }
        ]
      }
    ]
  },

  // ==================== MODULE 6 ====================
  {
    id: 'mod-6',
    moduleNumber: 6,
    titleEn: 'Module 6 — Internet Basics',
    titleBn: 'মডিউল ৬ — ইন্টারনেট পরিচিতি ও ব্রাউজিং',
    descriptionEn: 'Explore the World Wide Web: web browsers like Google Chrome, smart Google searching, and professional communication with Gmail.',
    descriptionBn: 'ইন্টারনেট ও ওয়েব ব্রাউজার চালানো, প্রয়োজনীয় তথ্য খোঁজা এবং প্রফেশনাল ইমেইল আদান-প্রদান।',
    lessons: [
      {
        id: 'bc-12',
        lessonNumber: 12,
        titleEn: '12. Internet and Web Browser Basics',
        titleBn: '১২. ইন্টারনেট এবং ওয়েব ব্রাউজার পরিচিতি',
        summaryEn: 'What is the Internet? URLs, search engines like Google, tabs, and bookmarks.',
        summaryBn: 'ইন্টারনেট কী, ব্রাউজার ও সার্চ ইঞ্জিনের পার্থক্য, ট্যাব ও বুকমার্ক সংরক্ষণ।',
        estimatedMinutes: 25,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'Web Browsers: Your Window to the Web',
            titleBn: 'ওয়েবসাইট ও ওয়েব ব্রাউজার কী?',
            contentEn: 'The Internet is a global network of computers. A Web Browser (such as Google Chrome, Edge, Firefox) is the program used to view websites.',
            contentBn: 'ইন্টারনেট হলো বিশ্বজুড়ে কোটি কোটি কম্পিউটারের এক বিশাল জাল। আর ওয়েব ব্রাউজার হলো ওয়েবসাইট দেখার সফটওয়্যার (যেমন ক্রোম)।'
          },
          {
            type: 'text',
            titleEn: 'Understanding URLs',
            titleBn: 'ইউআরএল বা ওয়েবসাইটের ঠিকানা',
            contentEn: 'Every website has a unique address called a URL (Uniform Resource Locator), e.g., www.google.com. You type this into the browser address bar to visit that site directly.',
            contentBn: 'প্রতিটি ওয়েবসাইটের একটি নির্দিষ্ট ঠিকানা থাকে যাকে URL বলা হয়। অ্যাড্রেস বারে এই ঠিকানা লিখে এন্টার চাপলে পেজটি লোড হয়।'
          }
        ],
        quiz: [
          {
            id: 'q-bc12-1',
            questionEn: 'Which of the following is a popular web browser?',
            questionBn: 'নিচের কোনটি বহুল ব্যবহৃত ওয়েব ব্রাউজার?',
            optionsEn: ['Google Chrome', 'Microsoft Excel', 'Windows Notepad', 'Adobe Photoshop'],
            optionsBn: ['গুগল ক্রোম (Google Chrome)', 'এমএস এক্সেল', 'নোটপ্যাড', 'ফটোশপ'],
            correctIndex: 0,
            explanationEn: 'Google Chrome is a web browser used to explore web pages.',
            explanationBn: 'গুগল ক্রোম একটি বহুল ব্যবহৃত ওয়েব ব্রাউজার।'
          }
        ]
      },
      {
        id: 'bc-13',
        lessonNumber: 13,
        titleEn: '13. Email Basics (Gmail)',
        titleBn: '১৩. ইমেইল পরিচিতি এবং জিমেইল ব্যবহার',
        summaryEn: 'Creating professional emails: To, Subject line, writing polite body text, and attaching files with the paperclip.',
        summaryBn: 'To, Subject, বডি টেক্সট এবং ফাইল অ্যাটাচ (Attach) করে জিমেইলে চিঠি পাঠানোর নিয়ম।',
        estimatedMinutes: 25,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'Anatomy of an Email',
            titleBn: 'একটি ইমেইলের প্রধান অংশসমূহ',
            contentEn: '1. To: The recipient address.\n2. Subject: A clear, concise summary of your message.\n3. Body: The formal polite message.\n4. Attachments (Paperclip icon): Documents, CVs, or photos sent alongside.',
            contentBn: '১. To: প্রাপকের ঠিকানা।\n২. Subject: ইমেইলের মূল বিষয়বস্তু এক লাইনে।\n৩. Body: বিস্তারিত বক্তব্য বা আবেদন।\n৪. অ্যাটাচমেন্ট (কাগজের ক্লিপ আইকন): সিভি বা ছবি যুক্ত করা।'
          },
          {
            type: 'callout',
            titleEn: 'Pro Tip: Never Leave the Subject Line Blank!',
            titleBn: 'জরুরি পরামর্শ: কখনো সাবজেক্ট লাইন খালি রাখবেন না!',
            contentEn: 'Emails without a subject line appear unprofessional and frequently end up filtered into spam folders.',
            contentBn: 'চাকরি বা স্কুলের আবেদনে সাবজেক্ট না লিখলে তা স্প্যামে চলে যেতে পারে।'
          }
        ],
        quiz: [
          {
            id: 'q-bc13-1',
            questionEn: 'What does the paperclip icon in Gmail represent?',
            questionBn: 'জিমেইলে পেপারক্লিপ (কাগজের ক্লিপ) আইকনটিতে ক্লিক করলে কী করা যায়?',
            optionsEn: ['Delete email', 'Attach a file or document', 'Print screen', 'Send virus report'],
            optionsBn: ['ইমেইল মুছে ফেলা', 'ফাইল বা ছবি যুক্ত করা (Attach file)', 'প্রিন্ট করা', 'রিপোর্ট করা'],
            correctIndex: 1,
            explanationEn: 'The paperclip icon lets you attach resumes, PDF files, or photos to your email.',
            explanationBn: 'পেপারক্লিপ আইকন দিয়ে যেকোনো ফাইল ইমেইলে সংযুক্ত করা হয়।'
          }
        ]
      }
    ]
  },

  // ==================== MODULE 7 ====================
  {
    id: 'mod-7',
    moduleNumber: 7,
    titleEn: 'Module 7 — Microsoft Word',
    titleBn: 'মডিউল ৭ — মাইক্রোসফট ওয়ার্ড',
    descriptionEn: 'Learn word processing from scratch: document creation, typing text, font styling, bullet lists, alignment, and saving as PDF.',
    descriptionBn: 'মাইক্রোসফট ওয়ার্ডে নতুন ডকুমেন্ট তৈরি, ফন্ট সাইজ ও স্টাইল, বুলেট পয়েন্ট এবং পিডিএফ হিসেবে সংরক্ষণ।',
    lessons: [
      {
        id: 'bc-14',
        lessonNumber: 14,
        titleEn: '14. Microsoft Word Interface & Formatting',
        titleBn: '১৪. মাইক্রোসফট ওয়ার্ডের পরিচিতি ও ফরম্যাটিং',
        summaryEn: 'Creating documents, changing font size, Bold/Italic/Underline, text alignment, and margins.',
        summaryBn: 'ডকুমেন্ট তৈরি, ফন্ট পরিবর্তন, বোল্ড-ইটালিক-আন্ডারলাইন এবং টেক্সট অ্যালাইনমেন্ট।',
        estimatedMinutes: 30,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'What is Microsoft Word?',
            titleBn: 'মাইক্রোসফট ওয়ার্ড কী?',
            contentEn: 'Microsoft Word is the global standard application for drafting letters, resumes (CVs), reports, and official applications. The top tool container is called the Ribbon.',
            contentBn: 'এমএস ওয়ার্ড হলো বিশ্বের জনপ্রিয়তম ওয়ার্ড প্রসেসিং সফটওয়্যার। চিঠি, সিভি, পরীক্ষার অ্যাসাইনমেন্ট বা দরখাস্ত লেখার জন্য এটি ব্যবহার করা হয়।'
          },
          {
            type: 'table',
            titleEn: 'Common Text Formatting Buttons in Word',
            titleBn: 'ওয়ার্ডে বহুল ব্যবহৃত ফরম্যাটিং বাটন',
            contentEn: 'B (Bold - makes text thicker), I (Italic - tilts text), U (Underline), Font Size dropdown, Align Left / Center / Justify.',
            contentBn: 'B (বোল্ড বা মোটা করা), I (ইটালিক বা বাঁকা করা), U (আন্ডারলাইন বা নিচে দাগ), ফন্ট সাইজ এবং অ্যালাইনমেন্ট।'
          }
        ],
        practice: {
          type: 'word_editor_demo',
          titleEn: 'Simulated Word Formatting Lab',
          titleBn: 'ভার্চুয়াল ওয়ার্ড ফরম্যাটিং ল্যাব',
          descriptionEn: 'Try bolding, changing font sizes, and centering text in our mini editor to see live updates.',
          descriptionBn: 'লেখা বোল্ড, সেন্টারিং এবং বুলেট পয়েন্ট দিয়ে সরাসরি অনুশীলন করুন।'
        },
        quiz: [
          {
            id: 'q-bc14-1',
            questionEn: 'Which button is used to make text thicker and darker for headings?',
            questionBn: 'কোন অপশনের সাহায্যে লেখাকে মোটা ও গাঢ় (Bold) করা হয়?',
            optionsEn: ['Bold (B)', 'Italic (I)', 'Underline (U)', 'Strikethrough'],
            optionsBn: ['বোল্ড (B)', 'ইটালিক (I)', 'আন্ডারলাইন (U)', 'স্ট্রাইক-থ্রু'],
            correctIndex: 0,
            explanationEn: 'The Bold (B) button (or Ctrl+B) makes text thicker and stand out.',
            explanationBn: 'Bold বাটনে ক্লিক করলে বা Ctrl+B চাপলে লেখা গাঢ় হয়।'
          }
        ]
      },
      {
        id: 'bc-15',
        lessonNumber: 15,
        titleEn: '15. Page Setup, Bullet Points & PDF Export',
        titleBn: '১৫. পেজ সেটআপ, বুলেট পয়েন্ট ও পিডিএফ সেভ',
        summaryEn: 'Setting A4 paper size, 1-inch margins, inserting numbered/bullet lists, and saving documents as PDF.',
        summaryBn: 'A4 সাইজ পেজ নির্বাচন, মার্জিন ঠিক করা, বুলেট লিস্ট এবং পিডিএফ হিসেবে এক্সপোর্ট করা।',
        estimatedMinutes: 25,
        contentBlocks: [
          {
            type: 'step_guide',
            titleEn: 'How to Save Word File as PDF',
            titleBn: 'ওয়ার্ড ফাইলকে পিডিএফে সেভ করার নিয়ম',
            contentEn: '1. Click File -> Save As.\n2. Choose your destination folder.\n3. In "Save as type" dropdown, select PDF (*.pdf).\n4. Click Save. Your document is now universally readable on any phone or laptop.',
            contentBn: '১. File -> Save As এ যান।\n২. আপনার ফোল্ডার নির্বাচন করুন।\n৩. Save as type এ "PDF (*.pdf)" বেছে নিন।\n৪. Save বাটনে ক্লিক করুন।'
          }
        ],
        quiz: [
          {
            id: 'q-bc15-1',
            questionEn: 'Why is saving as PDF preferred when sending a CV or job application?',
            questionBn: 'চাকরির আবেদন বা সিভি পাঠানোর সময় পিডিএফ ফরম্যাট কেন সর্বোত্তম?',
            optionsEn: ['It makes file size 100 times larger', 'Formatting and fonts remain locked and identical on all devices', 'It deletes all punctuation', 'It requires specialized passwords'],
            optionsBn: ['ফাইলের আকার বড় করে', 'যেকোনো ডিভাইসে ফরম্যাটিং ও ফন্ট অবিকল ঠিক থাকে', 'সব দাঁড়ি-কমা মুছে দেয়', 'পাসওয়ার্ড দরকার হয়'],
            correctIndex: 1,
            explanationEn: 'PDF preserves exact typography and formatting so employers see the document exactly as you designed it.',
            explanationBn: 'পিডিএফ ফাইলে কোনো ডিভাইসেই ফন্ট বা ডিজাইন এলোমেলো হয় না।'
          }
        ]
      }
    ]
  },

  // ==================== MODULE 8 ====================
  {
    id: 'mod-8',
    moduleNumber: 8,
    titleEn: 'Module 8 — Microsoft Excel',
    titleBn: 'মডিউল ৮ — মাইক্রোসফট এক্সেল',
    descriptionEn: 'Understand spreadsheets: rows, columns, cells, data entry, basic formatting, and essential formulas like =SUM and =AVERAGE.',
    descriptionBn: 'স্প্রেডশিট পরিচিতি: রো, কলাম, সেল, ডেটা এন্ট্রি এবং =SUM, =AVERAGE ইত্যাদি সহজ সূত্রের হিসাব।',
    lessons: [
      {
        id: 'bc-16',
        lessonNumber: 16,
        titleEn: '16. Microsoft Excel Grid & Data Entry',
        titleBn: '১৬. মাইক্রোসফট এক্সেল গ্রিড ও ডেটা এন্ট্রি',
        summaryEn: 'Cells, rows, columns, cell addresses (A1, B5), entering numbers, text, and dates.',
        summaryBn: 'সেল, রো, কলাম, সেল অ্যাড্রেস (A1, B5) এবং সংখ্যা ও লেখার সঠিক ইনপুট।',
        estimatedMinutes: 25,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'The Grid: Columns, Rows, and Cells',
            titleBn: 'কলাম, রো এবং সেল',
            contentEn: 'Excel is organized as a grid. Columns run vertically with letters (A, B, C...). Rows run horizontally with numbers (1, 2, 3...). The box where they intersect is a CELL (e.g. B2).',
            contentBn: 'এক্সেল শিটে উপর থেকে নিচে অংশকে কলাম (A, B, C...) এবং পাশাপাশি অংশকে রো (1, 2, 3...) বলে। এদের মিলনস্থলকে "সেল" (Cell) বলা হয়।'
          }
        ],
        quiz: [
          {
            id: 'q-bc16-1',
            questionEn: 'What is the intersection of column C and row 4 called in Excel?',
            questionBn: 'এক্সেলে কলাম C এবং রো 4 এর মিলিত সেলটিকে কী নামে ডাকা হয়?',
            optionsEn: ['4C', 'C4', 'Cell 4', 'Row C'],
            optionsBn: ['4C', 'C4', 'সেল ৪', 'রো সি'],
            correctIndex: 1,
            explanationEn: 'Excel cell addresses always specify the column letter first, followed by row number: C4.',
            explanationBn: 'এক্সেলে আগে কলামের অক্ষর এবং পরে রো-র সংখ্যা বসে (C4)।'
          }
        ]
      },
      {
        id: 'bc-17',
        lessonNumber: 17,
        titleEn: '17. Essential Excel Calculations & Formulas',
        titleBn: '১৭. এক্সেলে হিসাব-নিকাশ ও প্রয়োজনীয় সূত্র',
        summaryEn: 'Golden rule of = sign, =SUM(), =AVERAGE(), AutoSum button, and simple budgets.',
        summaryBn: 'সমান চিহ্নের নিয়ম, =SUM, =AVERAGE এবং অটোসামের মাধ্যমে দ্রুত হিসাব সম্পন্ন করা।',
        estimatedMinutes: 30,
        contentBlocks: [
          {
            type: 'callout',
            titleEn: 'Golden Rule of Excel Formulas',
            titleBn: 'এক্সেল সূত্রের প্রধান নিয়ম',
            contentEn: 'Every calculation formula in Excel MUST begin with an equals sign (=). Example: =SUM(B2:B10) calculates the total of cells B2 through B10.',
            contentBn: 'এক্সেলে যেকোনো সূত্র বা ফর্মুলা লেখার আগে অবশ্যই সমান চিহ্ন (=) দিতে হয়। যেমন: =SUM(B2:B10) দিলে মোট যোগফল বের হবে।'
          }
        ],
        practice: {
          type: 'excel_formula',
          titleEn: 'Interactive Excel Formula Sandbox',
          titleBn: 'ইন্টারেক্টিভ এক্সেল ক্যালকুলেটর ল্যাব',
          descriptionEn: 'Enter test marks for Bangla, English, and Math to see the =SUM and =AVERAGE formula compute live!',
          descriptionBn: 'বাংলা, গণিত ও বিজ্ঞানের নম্বর ইনপুট দিয়ে লাইভ যোগফল ও গড় হিসাব দেখুন।'
        },
        quiz: [
          {
            id: 'q-bc17-1',
            questionEn: 'Every calculation formula in Microsoft Excel must begin with which character?',
            questionBn: 'এক্সেলে যেকোনো ফর্মুলা শুরু করার জন্য প্রথমে কোন চিহ্ন দিতে হয়?',
            optionsEn: ['Plus (+)', 'Hash (#)', 'Equals (=)', 'Asterisk (*)'],
            optionsBn: ['যোগ (+)', 'হ্যাশ (#)', 'সমান (=)', 'স্টার (*)'],
            correctIndex: 2,
            explanationEn: 'All Excel formulas start with = (e.g., =SUM, =AVERAGE).',
            explanationBn: 'এক্সেলে সব সময় সমান (=) চিহ্ন দিয়ে সূত্র শুরু করতে হয়।'
          }
        ]
      }
    ]
  },

  // ==================== MODULE 9 ====================
  {
    id: 'mod-9',
    moduleNumber: 9,
    titleEn: 'Module 9 — PowerPoint',
    titleBn: 'মডিউল ৯ — পাওয়ারপয়েন্ট',
    descriptionEn: 'Create clean, impactful presentation slides: adding titles, bullet hierarchy, inserting images, themes, and presenting with F5.',
    descriptionBn: 'পাওয়ারপয়েন্টে নতুন স্লাইড তৈরি, ছবি যোগ করা, ডিজাইন থিম এবং F5 চেপে ফুল স্ক্রিন প্রেজেন্টেশন প্রদর্শন।',
    lessons: [
      {
        id: 'bc-18',
        lessonNumber: 18,
        titleEn: '18. Presentation Design & Slide Creation',
        titleBn: '১৮. প্রেজেন্টেশন স্লাইড তৈরি ও ডিজাইন',
        summaryEn: 'Creating slides, layout choices, readable typography, bullet hierarchy, and avoiding walls of text.',
        summaryBn: 'নতুন স্লাইড তৈরি, সুন্দর লেআউট, বড় ফন্ট এবং সংক্ষিপ্ত তথ্য উপস্থাপনের নিয়ম।',
        estimatedMinutes: 25,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'Presenting Ideas Visually with Slides',
            titleBn: 'স্লাইডের মাধ্যমে বক্তব্য সুন্দরভাবে উপস্থাপন',
            contentEn: 'PowerPoint allows you to present topics clearly. Effective slides have large readable titles, 3-5 concise bullet points, and high quality imagery rather than long paragraphs.',
            contentBn: 'পাওয়ারপয়েন্টে কোনো বিষয় সহজে স্লাইডে উপস্থাপন করা যায়। স্লাইডে বড় বড় অনুচ্ছেদ না রেখে সংক্ষিপ্ত পয়েন্ট ও ছবি ব্যবহার করা শ্রেয়।'
          }
        ],
        quiz: [
          {
            id: 'q-bc18-1',
            questionEn: 'What makes a presentation slide effective and professional?',
            questionBn: 'একটি পেশাদার প্রেজেন্টেশন স্লাইডের প্রধান বৈশিষ্ট্য কী?',
            optionsEn: ['Packing 500 words on each slide', 'Large readable headings, 3-5 concise bullets, and clear imagery', 'Using 10 flashing animated colors', 'Removing all titles'],
            optionsBn: ['৫০০ শব্দের বড় অনুচ্ছেদ রাখা', 'বড় ও স্পষ্ট শিরোনাম, ৩-৫টি সংক্ষিপ্ত পয়েন্ট ও প্রাসঙ্গিক ছবি', '১০ রঙের ঝলকানি অ্যানিমেশন', 'কোনো শিরোনাম না দেওয়া'],
            correctIndex: 1,
            explanationEn: 'Clear hierarchy and concise bullet points make presentations easy to follow.',
            explanationBn: 'সহজে পড়ার উপযোগী ফন্ট ও সংক্ষেপ পয়েন্ট স্লাইডকে আকর্ষণীয় করে তোলে।'
          }
        ]
      },
      {
        id: 'bc-19',
        lessonNumber: 19,
        titleEn: '19. Media, Transitions & Fullscreen Slideshow (F5)',
        titleBn: '১৯. মিডিয়া যুক্তকরণ ও স্লাইডশো প্রদর্শন (F5)',
        summaryEn: 'Inserting images, gentle slide transitions, and presenting to an audience using F5.',
        summaryBn: 'স্লাইডে ছবি যুক্ত করা, ট্রানজিশন এবং F5 চেপে ফুল স্ক্রিন স্লাইডশো চালনা।',
        estimatedMinutes: 20,
        contentBlocks: [
          {
            type: 'key_terms',
            titleEn: 'Vital Shortcut: Fullscreen Presentation',
            titleBn: 'স্লাইড প্রদর্শনের বিশেষ শর্টকাট',
            contentEn: 'Press F5 to start the slide presentation from slide 1. Press ESC to end the slide show.',
            contentBn: 'কীবোর্ডের F5 চাপলে প্রথম স্লাইড থেকে ফুল স্ক্রিন শুরু হয়। আর ESC চাপলে বের হওয়া যায়।'
          }
        ],
        quiz: [
          {
            id: 'q-bc19-1',
            questionEn: 'Which key is pressed to start a full-screen slideshow in PowerPoint?',
            questionBn: 'পাওয়ারপয়েন্টে ফুল স্ক্রিন স্লাইডশো শুরু করতে কীবোর্ডের কোন বাটন চাপা হয়?',
            optionsEn: ['F1', 'F5', 'Ctrl + N', 'Shift + Esc'],
            optionsBn: ['F1', 'F5', 'Ctrl + N', 'Shift + Esc'],
            correctIndex: 1,
            explanationEn: 'F5 starts the presentation from the first slide.',
            explanationBn: 'F5 চাপলে প্রথম থেকে স্লাইডশো শুরু হয়।'
          }
        ]
      }
    ]
  },

  // ==================== MODULE 10 ====================
  {
    id: 'mod-10',
    moduleNumber: 10,
    titleEn: 'Module 10 — Digital Safety',
    titleBn: 'মডিউল ১০ — ডিজিটাল নিরাপত্তা',
    descriptionEn: 'Safeguard your digital life: creating strong passwords, recognizing phishing scams and fake links, and two-factor authentication.',
    descriptionBn: 'অনলাইন নিরাপত্তা, শক্তিশালী পাসওয়ার্ড তৈরি, ফিশিং বা ভুয়া লিংক শনাক্তকরণ এবং সাইবার সচেতনতা।',
    lessons: [
      {
        id: 'bc-20',
        lessonNumber: 20,
        titleEn: '20. Passwords & Two-Factor Authentication',
        titleBn: '২০. শক্তিশালী পাসওয়ার্ড ও টু-ফ্যাক্টর নিরাপত্তা',
        summaryEn: 'Rules for unbreakable passwords, password managers, and why you must never share OTPs with callers.',
        summaryBn: 'শক্তিশালী পাসওয়ার্ডের নিয়ম, ওটিপি (OTP) গোপন রাখা এবং একাউন্ট সুরক্ষিত করা।',
        estimatedMinutes: 25,
        contentBlocks: [
          {
            type: 'step_guide',
            titleEn: 'Rules for a Rock-Solid Password',
            titleBn: 'শক্তিশালী পাসওয়ার্ডের ৪টি বৈশিষ্ট্য',
            contentEn: '1. At least 10-12 characters long.\n2. Combine UPPERCASE, lowercase, numbers, and symbols (@, #, $).\n3. Never use your phone number, birthday, or name.\n4. Never share your password or SMS OTP with anyone, even if they claim to be from bKash or your bank!',
            contentBn: '১. কমপক্ষে ১০-১২ অক্ষরের হওয়া উচিত।\n২. বড় ও ছোট হাতের অক্ষর, সংখ্যা এবং চিহ্ন (@, #, $) মেশানো।\n৩. নিজের মোবাইল নম্বর বা জন্মতারিখ পরিহার করুন।\n৪. বিকাশ, নগদ বা ব্যাংক কর্মকর্তা পরিচয় দিয়ে চাইলেও ওটিপি (OTP) দেবেন না।'
          }
        ],
        quiz: [
          {
            id: 'q-bc20-1',
            questionEn: 'Which of the following is the strongest and safest password?',
            questionBn: 'নিচের কোনটি সবচেয়ে শক্তিশালী ও নিরাপদ পাসওয়ার্ড?',
            optionsEn: ['12345678', 'dhaka2024', 'Tr@in#Dhaka!98', 'password123'],
            optionsBn: ['12345678', 'dhaka2024', 'Tr@in#Dhaka!98', 'password123'],
            correctIndex: 2,
            explanationEn: 'Tr@in#Dhaka!98 combines uppercase, lowercase, special characters, numbers, and cannot be easily guessed.',
            explanationBn: 'এতে বড় ও ছোট হাত, চিহ্ন ও সংখ্যা থাকায় এটি অনুমান করা হ্যাকারের পক্ষে অসম্ভব।'
          }
        ]
      },
      {
        id: 'bc-21',
        lessonNumber: 21,
        titleEn: '21. Spotting Phishing Scams & Suspicious Links',
        titleBn: '২১. ফিশিং ও ভুয়া লিংক চেনার উপায়',
        summaryEn: 'Inspecting browser address bars, fake Facebook/lottery schemes, malware attachments, and safe downloading.',
        summaryBn: 'ব্রাউজার অ্যাড্রেস বার পরীক্ষা, ভুয়া লটারি ও প্রলোভন এড়ানো এবং নিরাপদ ব্রাউজিং।',
        estimatedMinutes: 25,
        contentBlocks: [
          {
            type: 'callout',
            titleEn: 'Watch Out for Phishing Links',
            titleBn: 'ভুয়া বা ফিশিং লিংক থেকে সাবধান!',
            contentEn: 'Scammers create fake login portals mimicking Facebook, Google, or banks. Always inspect the browser address bar for correct official spelling before typing your credentials.',
            contentBn: 'হ্যাকাররা দেখতে একই রকম ভুয়া লগইন পেজ তৈরি করে। কোনো লিংকে ক্লিক করে পাসওয়ার্ড দেওয়ার আগে ব্রাউজারের অ্যাড্রেস বারের বানান যাচাই করুন।'
          }
        ],
        quiz: [
          {
            id: 'q-bc21-1',
            questionEn: 'If an unexpected email states you won a lottery and asks for your bank password, what should you do?',
            questionBn: 'কোনো অচেনা ইমেইল থেকে লটারি জেতার দাবি করে ব্যাংক পাসওয়ার্ড চাইলে আপনার কী করা উচিত?',
            optionsEn: ['Send password immediately', 'Delete and report as phishing scam without sharing any secrets', 'Forward to all friends', 'Click all links inside'],
            optionsBn: ['পাসওয়ার্ড পাঠিয়ে দেওয়া', 'কোনো তথ্য না দিয়ে ইমেইলটি ডিলিট ও স্প্যাম রিপোর্ট করা', 'বন্ধুদের পাঠানো', 'সব লিংকে ক্লিক করা'],
            correctIndex: 1,
            explanationEn: 'Never share passwords or credentials. Legitimate organizations never request passwords via unsolicited emails.',
            explanationBn: 'কোনো বৈধ প্রতিষ্ঠান কখনোই ইমেইলে পাসওয়ার্ড জানতে চায় না।'
          }
        ]
      }
    ]
  },

  // ==================== MODULE 11 ====================
  {
    id: 'mod-11',
    moduleNumber: 11,
    titleEn: 'Module 11 — Practical Computer Tasks',
    titleBn: 'মডিউল ১১ — ব্যবহারিক কম্পিউটার টাস্ক',
    descriptionEn: 'Put your knowledge into action: hands-on office task workflow, document typing, file organizing, taking screenshots, and capstone checklist.',
    descriptionBn: 'বাস্তব জীবনের কাজ: ফোল্ডার সাজানো, দরখাস্ত টাইপ করা, স্ক্রিনশট নেওয়া এবং চূড়ান্ত ব্যবহারিক চেকলিস্ট।',
    lessons: [
      {
        id: 'bc-22',
        lessonNumber: 22,
        titleEn: '22. Practical Office Tasks & Portfolio Building',
        titleBn: '২২. প্র্যাকটিক্যাল অফিস টাস্ক ও পোর্টফোলিও তৈরি',
        summaryEn: 'Creating a designated learning folder, writing an official 100-word leave application, formatting, and saving as PDF.',
        summaryBn: 'ডেস্কটপে ফোল্ডার তৈরি, ১০০ শব্দের একটি আনুষ্ঠানিক আবেদনপত্র টাইপ ও পিডিএফ সেভ।',
        estimatedMinutes: 30,
        contentBlocks: [
          {
            type: 'step_guide',
            titleEn: 'The Capstone Challenge: 5 Real-world Steps',
            titleBn: 'কোর্স সমাপ্তির ৫টি বাস্তব অনুশীলন',
            contentEn: 'Task 1: Create a desktop folder named "My Learning Portfolio".\nTask 2: Open Word and type a formal 100-word leave application.\nTask 3: Make the subject line Bold and center the title.\nTask 4: Save the document as a PDF in your new folder.\nTask 5: Complete a 60-second typing test in our Typing Tool reaching 20+ WPM!',
            contentBn: '১. ডেস্কটপে "My Learning Portfolio" নামে নতুন ফোল্ডার তৈরি করুন।\n২. ওয়ার্ডে ১০০ শব্দের একটি আনুষ্ঠানিক আবেদনপত্র লিখুন।\n৩. সাবজেক্ট লাইনটি বোল্ড ও টাইটেল সেন্টার করুন।\n৪. ফাইলটি পিডিএফ হিসেবে আপনার ফোল্ডারে সেভ করুন।\n৫. আমাদের টাইপিং টুলে ৬০ সেকেন্ডের টেস্টে অংশ নিয়ে ২০+ WPM গতি অর্জন করুন।'
          }
        ],
        practice: {
          type: 'general',
          titleEn: 'Practical Capstone Checklist',
          titleBn: 'ব্যবহারিক ক্যাপস্টোন চেকলিস্ট',
          descriptionEn: 'Perform these tasks on your machine and check off each step to verify your ready-for-work proficiency.',
          descriptionBn: 'আপনার কম্পিউটারে কাজগুলো সম্পন্ন করে চেকলিস্ট পূরণ করুন।'
        },
        quiz: [
          {
            id: 'q-bc22-1',
            questionEn: 'What is the universal shortcut on modern Windows to capture an area screenshot?',
            questionBn: 'উইন্ডোজে নির্দিষ্ট অংশের স্ক্রিনশট নেওয়ার আধুনিক শর্টকাট কোনটি?',
            optionsEn: ['Ctrl + Alt + Delete', 'Windows Key + Shift + S', 'Ctrl + P', 'Alt + F4'],
            optionsBn: ['Ctrl + Alt + Delete', 'Windows Key + Shift + S (Snipping Tool)', 'Ctrl + P', 'Alt + F4'],
            correctIndex: 1,
            explanationEn: 'Windows Key + Shift + S opens the Snipping tool, letting you drag a box around any on-screen area.',
            explanationBn: 'Windows + Shift + S চাপলে স্নিপিং টুল অন হয় এবং কাঙ্ক্ষিত অংশের স্ক্রিনশট নেওয়া যায়।'
          }
        ]
      },
      {
        id: 'bc-23',
        lessonNumber: 23,
        titleEn: '23. Capstone Skill Verification & Next Steps',
        titleBn: '২৩. চূড়ান্ত দক্ষতা যাচাই ও ভবিষ্যৎ পথনির্দেশনা',
        summaryEn: 'Reviewing your course completion status, certificate eligibility, and continuing onto SSC ICT or freelance computer typing.',
        summaryBn: 'কোর্স সমাপ্তি পর্যালোচনা, সনদ অর্জনের যোগ্যতা এবং পরবর্তী ধাপ।',
        estimatedMinutes: 20,
        contentBlocks: [
          {
            type: 'text',
            titleEn: 'Congratulations on Completing the Fundamentals!',
            titleBn: 'অভিনন্দন! আপনি বেসিক কম্পিউটারে পারদর্শী হয়েছেন',
            contentEn: 'You have mastered the foundational computer essentials: hardware knowledge, touch typing, file management, Windows navigation, Internet communication, Word, Excel, PowerPoint, and cybersecurity hygiene.',
            contentBn: 'আপনি সফলভাবে কম্পিউটারের মূল বিষয়গুলো শিখেছেন: হার্ডওয়্যার, টাইপিং, ফাইল ও ফোল্ডার, উইন্ডোজ, ইন্টারনেট, ওয়ার্ড, এক্সেল, পাওয়ারপয়েন্ট ও সাইবার নিরাপত্তা।'
          }
        ],
        quiz: [
          {
            id: 'q-bc23-1',
            questionEn: 'What is the recommended habit to maintain typing speed and computer confidence?',
            questionBn: 'টাইপিং গতি ও কম্পিউটার দক্ষতা বজায় রাখার সর্বোত্তম উপায় কী?',
            optionsEn: ['Practice 10-15 minutes regularly with our built-in typing tool and apply skills to daily tasks', 'Never turn on computer again', 'Delete all documents', 'Forget password'],
            optionsBn: ['প্রতিদিন ১০-১৫ মিনিট টাইপিং অনুশীলন ও দৈনন্দিন কাজে কম্পিউটার ব্যবহার', 'আর কখনো কম্পিউটার না চালানো', 'সব ফাইল মুছে ফেলা', 'পাসওয়ার্ড ভুলে যাওয়া'],
            correctIndex: 0,
            explanationEn: 'Consistent daily practice of 10-15 minutes solidifies muscle memory and operational confidence.',
            explanationBn: 'নিয়মিত অল্প সময় হলেও টাইপিং চর্চা আঙুলের মেমোরি ধরে রাখতে সবচেয়ে কার্যকর।'
          }
        ]
      }
    ]
  }
];
