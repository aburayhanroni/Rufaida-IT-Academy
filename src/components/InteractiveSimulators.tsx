import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  HardDrive, 
  MemoryStick, 
  Monitor, 
  Keyboard as KeyIcon, 
  Folder, 
  FileText, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Check, 
  Sparkles, 
  CornerDownLeft,
  RotateCcw
} from 'lucide-react';
import { Language } from '../types';

interface SimulatorProps {
  type: string;
  language: Language;
  onSuccess?: () => void;
}

export const InteractiveSimulators: React.FC<SimulatorProps> = ({ type, language, onSuccess }) => {

  // 1. Inside PC Component Inspector
  if (type === 'inside_pc') {
    return <InsidePCSimulator language={language} onSuccess={onSuccess} />;
  }

  // 2. Keyboard Shortcut Trainer
  if (type === 'keyboard_shortcuts') {
    return <ShortcutTrainerSimulator language={language} onSuccess={onSuccess} />;
  }

  // 3. File Organizer Simulator
  if (type === 'file_organizer') {
    return <FileOrganizerSimulator language={language} onSuccess={onSuccess} />;
  }

  // 4. Excel Formula Sandbox
  if (type === 'excel_formula') {
    return <ExcelFormulaSimulator language={language} onSuccess={onSuccess} />;
  }

  // 5. Word Formatting Lab
  if (type === 'word_editor_demo') {
    return <WordFormattingSimulator language={language} onSuccess={onSuccess} />;
  }

  // Default fallback
  return (
    <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
      <Sparkles className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
      <h4 className="font-bold text-slate-800 text-sm">
        {language === 'en' ? 'Practical Skill Challenge' : 'বাস্তব অনুশীলন চ্যালেঞ্জ'}
      </h4>
      <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
        {language === 'en'
          ? 'Perform this task on your actual computer: open your applications, practice the concepts covered in this lesson, and proceed to the quiz!'
          : 'আপনার কম্পিউটারে এই পাঠের বিষয়গুলো নিজে নিজে চর্চা করুন এবং এরপর কুইজে অংশ নিন!'}
      </p>
    </div>
  );
};

// ==================== 1. INSIDE PC SIMULATOR ====================
const InsidePCSimulator: React.FC<{ language: Language; onSuccess?: () => void }> = ({ language }) => {
  const [selectedPart, setSelectedPart] = useState<'cpu' | 'ram' | 'storage' | 'input' | 'output'>('cpu');

  const parts = {
    cpu: {
      nameEn: 'Central Processing Unit (CPU)',
      nameBn: 'কেন্দ্রীয় প্রক্রিয়াকরণ অংশ (সিপিইউ)',
      roleEn: 'The brain of the computer. Performs billions of calculations every second.',
      roleBn: 'কম্পিউটারের মস্তিষ্ক। প্রতি সেকেন্ডে কোটি কোটি গাণিতিক ও যৌক্তিক সিদ্ধান্ত গ্রহণ করে।',
      analogyEn: 'Analogy: The master chef in a restaurant kitchen who cooks all orders.',
      analogyBn: 'উপমা: রেস্তোরাঁর প্রধান বাবুর্চি যিনি সব খাবারের নির্দেশ অনুযায়ী রান্না করেন।'
    },
    ram: {
      nameEn: 'Random Access Memory (RAM)',
      nameBn: 'র‍্যান্ডম অ্যাক্সেস মেমরি (র‍্যাম)',
      roleEn: 'High-speed temporary workspace. All running apps live here. Erased when powered off.',
      roleBn: 'উচ্চগতির অস্থায়ী মেমরি। যেকোনো চালু থাকা সফটওয়্যার এখানে থাকে। বিদ্যুৎ গেলে সব মুছে যায়।',
      analogyEn: 'Analogy: The study table surface where you lay open books while reading.',
      analogyBn: 'উপমা: পড়ার টেবিল যেখানে বই খোলা রেখে পড়াশোনা করা হয়।'
    },
    storage: {
      nameEn: 'Storage (SSD / Hard Disk)',
      nameBn: 'স্থায়ী স্টোরেজ (এসএসডি / হার্ডডিস্ক)',
      roleEn: 'Non-volatile long-term cabinet. Keeps your Windows, photos, and files forever.',
      roleBn: 'দীর্ঘস্থায়ী তথ্যভাণ্ডার। বিদ্যুৎ চলে গেলেও ফাইল ও উইন্ডোজ নিরাপদে জমা থাকে।',
      analogyEn: 'Analogy: The bookshelf or filing cabinet where books are kept safe overnight.',
      analogyBn: 'উপমা: পড়ার ঘরের আলমারি বা বুকশেলফ যেখানে বই সংরক্ষিত থাকে।'
    },
    input: {
      nameEn: 'Input Devices (Keyboard & Mouse)',
      nameBn: 'ইনপুট ডিভাইস (কীবোর্ড ও মাউস)',
      roleEn: 'Translates human actions into electronic signals that the CPU can understand.',
      roleBn: 'মানুষের নির্দেশনা ও টাইপিংকে কম্পিউটারের বোধগম্য ডিজিটাল সংকেতে রূপান্তর করে।',
      analogyEn: 'Analogy: Your ears and eyes that receive information from the outside world.',
      analogyBn: 'উপমা: কান ও চোখ যার মাধ্যমে আপনি তথ্য গ্রহণ করেন।'
    },
    output: {
      nameEn: 'Output Devices (Monitor & Speakers)',
      nameBn: 'আউটপুট ডিভাইস (মনিটর ও স্পিকার)',
      roleEn: 'Displays the processed results visually or acoustically for the human user.',
      roleBn: 'প্রসেসর থেকে প্রাপ্ত প্রক্রিয়াজাত ফলাফল স্ক্রিনে প্রদর্শন বা শব্দ আকারে শোনায়।',
      analogyEn: 'Analogy: Your mouth and hands that express thoughts to others.',
      analogyBn: 'উপমা: মুখ ও হাত যার মাধ্যমে নিজের বক্তব্য প্রকাশ করা হয়।'
    }
  };

  return (
    <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
            {language === 'en' ? 'Interactive Visualizer' : 'ইন্টারেক্টিভ ভিজ্যুয়ালাইজার'}
          </span>
          <h4 className="text-sm font-bold text-white">
            {language === 'en' ? 'Click Components to Inspect the Internal Workflow' : 'যন্ত্রাংশে ক্লিক করে ভেতরের কার্যপ্রণালী দেখুন'}
          </h4>
        </div>
      </div>

      {/* Component Buttons Grid */}
      <div className="grid grid-cols-5 gap-2">
        <button
          onClick={() => setSelectedPart('input')}
          className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
            selectedPart === 'input' 
              ? 'bg-emerald-600/30 border-emerald-400 text-white shadow-sm' 
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          <KeyIcon className="w-5 h-5 text-emerald-400" />
          <span className="text-[11px] font-bold">1. Input</span>
        </button>

        <button
          onClick={() => setSelectedPart('cpu')}
          className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
            selectedPart === 'cpu' 
              ? 'bg-blue-600/30 border-blue-400 text-white shadow-sm' 
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-5 h-5 text-blue-400 animate-pulse" />
          <span className="text-[11px] font-bold">2. CPU</span>
        </button>

        <button
          onClick={() => setSelectedPart('ram')}
          className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
            selectedPart === 'ram' 
              ? 'bg-purple-600/30 border-purple-400 text-white shadow-sm' 
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          <MemoryStick className="w-5 h-5 text-purple-400" />
          <span className="text-[11px] font-bold">3. RAM</span>
        </button>

        <button
          onClick={() => setSelectedPart('storage')}
          className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
            selectedPart === 'storage' 
              ? 'bg-amber-600/30 border-amber-400 text-white shadow-sm' 
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          <HardDrive className="w-5 h-5 text-amber-400" />
          <span className="text-[11px] font-bold">4. Disk</span>
        </button>

        <button
          onClick={() => setSelectedPart('output')}
          className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 ${
            selectedPart === 'output' 
              ? 'bg-teal-600/30 border-teal-400 text-white shadow-sm' 
              : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Monitor className="w-5 h-5 text-teal-400" />
          <span className="text-[11px] font-bold">5. Output</span>
        </button>
      </div>

      {/* Selected Component Details */}
      <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2 text-xs animate-in fade-in duration-150">
        <div className="flex items-center justify-between">
          <h5 className="font-bold text-emerald-400 text-sm">
            {language === 'en' ? parts[selectedPart].nameEn : parts[selectedPart].nameBn}
          </h5>
          <span className="text-[10px] px-2 py-0.5 bg-slate-700 text-slate-300 rounded font-mono">
            Status: Active
          </span>
        </div>
        <p className="text-slate-200 leading-relaxed">
          {language === 'en' ? parts[selectedPart].roleEn : parts[selectedPart].roleBn}
        </p>
        <div className="p-2.5 bg-slate-900/60 rounded-lg text-emerald-300 border border-emerald-500/20 font-medium text-[11px]">
          {language === 'en' ? parts[selectedPart].analogyEn : parts[selectedPart].analogyBn}
        </div>
      </div>
    </div>
  );
};

// ==================== 2. SHORTCUT TRAINER SIMULATOR ====================
const ShortcutTrainerSimulator: React.FC<{ language: Language; onSuccess?: () => void }> = ({ language }) => {
  const [activeShortcutIndex, setActiveShortcutIndex] = useState(0);
  const [completedList, setCompletedList] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const targets = [
    { keys: 'Ctrl + C', keyCombo: ['Control', 'c'], labelEn: 'Copy Document', labelBn: 'ডকুমেন্ট কপি করুন' },
    { keys: 'Ctrl + V', keyCombo: ['Control', 'v'], labelEn: 'Paste Content', labelBn: 'কন্টেন্ট পেস্ট করুন' },
    { keys: 'Ctrl + Z', keyCombo: ['Control', 'z'], labelEn: 'Undo Mistake', labelBn: 'ভুল আগের অবস্থায় ফিরিয়ে আনুন' },
    { keys: 'Ctrl + S', keyCombo: ['Control', 's'], labelEn: 'Save File Now', labelBn: 'ফাইল সেভ করুন' }
  ];

  const current = targets[activeShortcutIndex] || targets[0];

  const simulatePress = (keys: string) => {
    setFeedback(`Success! Pressed ${keys}`);
    if (!completedList.includes(keys)) {
      setCompletedList(prev => [...prev, keys]);
    }
    setTimeout(() => {
      setFeedback(null);
      if (activeShortcutIndex < targets.length - 1) {
        setActiveShortcutIndex(prev => prev + 1);
      }
    }, 900);
  };

  return (
    <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
            {language === 'en' ? 'Interactive Lab' : 'ইন্টারেক্টিভ ল্যাব'}
          </span>
          <h4 className="text-sm font-bold text-white">
            {language === 'en' ? 'Shortcut Key Reaction Trainer' : 'শর্টকাট কী অনুশীলন'}
          </h4>
        </div>
        <span className="text-xs text-slate-400 font-mono">
          {completedList.length} / {targets.length} completed
        </span>
      </div>

      <div className="p-5 bg-slate-800 rounded-xl border border-slate-700 text-center space-y-3">
        <p className="text-xs text-slate-300">
          {language === 'en' ? 'Action to perform:' : 'যে কাজটি করতে হবে:'}
        </p>
        <p className="text-base font-bold text-white">
          {language === 'en' ? current.labelEn : current.labelBn}
        </p>

        {/* Big Key Indicator */}
        <div className="inline-flex items-center gap-2 p-3 bg-slate-950 rounded-xl border border-amber-500/40 shadow-inner">
          <kbd className="px-3 py-1.5 bg-slate-800 border border-slate-600 rounded text-amber-400 font-mono font-bold text-sm shadow-xs">
            Ctrl
          </kbd>
          <span className="text-slate-500 font-bold">+</span>
          <kbd className="px-3 py-1.5 bg-slate-800 border border-slate-600 rounded text-amber-400 font-mono font-bold text-sm shadow-xs">
            {current.keys.split('+')[1].trim()}
          </kbd>
        </div>

        {feedback && (
          <p className="text-xs font-bold text-emerald-400 animate-bounce">
            {feedback}
          </p>
        )}

        <div className="pt-2 flex flex-wrap justify-center gap-2">
          {targets.map((t, idx) => (
            <button
              key={t.keys}
              onClick={() => simulatePress(t.keys)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                completedList.includes(t.keys)
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600'
                  : idx === activeShortcutIndex
                  ? 'bg-amber-500 text-slate-950 font-extrabold ring-2 ring-amber-300'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {t.keys}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==================== 3. FILE ORGANIZER SIMULATOR ====================
const FileOrganizerSimulator: React.FC<{ language: Language; onSuccess?: () => void }> = ({ language }) => {
  const [folders, setFolders] = useState([
    { id: 'f-school', name: 'School Documents (স্কুল ফাইল)', files: ['SSC_Syllabus.pdf'] },
    { id: 'f-photos', name: 'Photos (ছবিসমূহ)', files: ['Bangabandhu_Bridge.jpg'] }
  ]);
  const [unfiled, setUnfiled] = useState(['My_Computer_Notes.docx', 'BioData_Rahim.docx']);
  const [newFolderName, setNewFolderName] = useState('');

  const createFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;
    setFolders(prev => [
      ...prev,
      { id: `f-${Date.now()}`, name: newFolderName.trim(), files: [] }
    ]);
    setNewFolderName('');
  };

  const moveFileToFolder = (fileName: string, targetFolderId: string) => {
    setUnfiled(prev => prev.filter(f => f !== fileName));
    setFolders(prev =>
      prev.map(folder =>
        folder.id === targetFolderId
          ? { ...folder, files: [...folder.files, fileName] }
          : folder
      )
    );
  };

  return (
    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
            {language === 'en' ? 'Windows File Explorer Simulator' : 'ফাইল এক্সপ্লোরার সিমুলেটর'}
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            {language === 'en' ? 'Organize Your Desktop Files' : 'ফাইল ফোল্ডারে সাজিয়ে রাখুন'}
          </h4>
        </div>
      </div>

      {/* Unfiled Files on Desktop */}
      <div className="p-3 bg-slate-50 border border-dashed border-slate-300 rounded-xl space-y-2">
        <span className="font-bold text-slate-600 block">
          {language === 'en' ? 'Unorganized Files on Desktop:' : 'ডেস্কটপে ছড়িয়ে থাকা ফাইল:'}
        </span>
        {unfiled.length === 0 ? (
          <p className="text-emerald-600 font-semibold flex items-center gap-1.5 py-1">
            <Check className="w-4 h-4" />
            {language === 'en' ? 'All files are neatly organized in folders!' : 'সব ফাইল সফলভাবে ফোল্ডারে সাজানো হয়েছে!'}
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {unfiled.map(file => (
              <div key={file} className="p-2 bg-white rounded-lg border border-slate-200 shadow-xs flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-500" />
                <span className="font-mono font-medium text-slate-800">{file}</span>
                <span className="text-slate-400 text-[10px]">→ Move to:</span>
                {folders.map(f => (
                  <button
                    key={f.id}
                    onClick={() => moveFileToFolder(file, f.id)}
                    className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[10px] font-semibold border border-emerald-200"
                  >
                    {f.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Folder Structure */}
      <div className="grid grid-cols-2 gap-3">
        {folders.map(folder => (
          <div key={folder.id} className="p-3 bg-amber-50/50 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <Folder className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span className="truncate">{folder.name}</span>
            </div>
            <div className="space-y-1 pl-4 border-l-2 border-amber-200">
              {folder.files.length === 0 ? (
                <span className="text-slate-400 italic text-[11px]">Empty folder</span>
              ) : (
                folder.files.map(f => (
                  <div key={f} className="flex items-center gap-1.5 text-slate-700 font-mono text-[11px]">
                    <FileText className="w-3 h-3 text-slate-500" />
                    <span>{f}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create New Folder */}
      <form onSubmit={createFolder} className="flex gap-2">
        <input
          type="text"
          value={newFolderName}
          onChange={e => setNewFolderName(e.target.value)}
          placeholder={language === 'en' ? 'New folder name (e.g. Invoices)' : 'নতুন ফোল্ডারের নাম'}
          className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{language === 'en' ? 'Add Folder' : 'ফোল্ডার তৈরি'}</span>
        </button>
      </form>
    </div>
  );
};

// ==================== 4. EXCEL FORMULA SIMULATOR ====================
const ExcelFormulaSimulator: React.FC<{ language: Language; onSuccess?: () => void }> = ({ language }) => {
  const [bangla, setBangla] = useState(85);
  const [english, setEnglish] = useState(78);
  const [ict, setIct] = useState(92);

  const sum = bangla + english + ict;
  const average = Math.round((sum / 3) * 10) / 10;

  return (
    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
            {language === 'en' ? 'Interactive Spreadsheet Grid' : 'স্প্রেডশিট ফর্মুলা ল্যাব'}
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            {language === 'en' ? 'SSC Marks Sheet with =SUM and =AVERAGE' : 'নম্বরপত্র ও স্বয়ংক্রিয় গড় নির্ণয়'}
          </h4>
        </div>
      </div>

      {/* Spreadsheet Table */}
      <div className="overflow-x-auto border border-slate-300 rounded-xl">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300 text-[11px]">
              <th className="p-2 border-r border-slate-300 w-10"></th>
              <th className="p-2 border-r border-slate-300">A (Subject)</th>
              <th className="p-2 border-r border-slate-300">B (Marks)</th>
              <th className="p-2">Formula Calculation</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-200">
              <td className="p-2 bg-slate-50 font-mono text-slate-400 font-bold border-r border-slate-300">1</td>
              <td className="p-2 text-left pl-4 font-semibold text-slate-800 border-r border-slate-300">Bangla (বাংলা)</td>
              <td className="p-2 border-r border-slate-300">
                <input
                  type="number"
                  value={bangla}
                  onChange={e => setBangla(Number(e.target.value))}
                  className="w-16 text-center border rounded p-1 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </td>
              <td className="p-2 text-slate-400 font-mono text-[11px]">Cell B1</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-2 bg-slate-50 font-mono text-slate-400 font-bold border-r border-slate-300">2</td>
              <td className="p-2 text-left pl-4 font-semibold text-slate-800 border-r border-slate-300">English (ইংরেজি)</td>
              <td className="p-2 border-r border-slate-300">
                <input
                  type="number"
                  value={english}
                  onChange={e => setEnglish(Number(e.target.value))}
                  className="w-16 text-center border rounded p-1 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </td>
              <td className="p-2 text-slate-400 font-mono text-[11px]">Cell B2</td>
            </tr>
            <tr className="border-b border-slate-200">
              <td className="p-2 bg-slate-50 font-mono text-slate-400 font-bold border-r border-slate-300">3</td>
              <td className="p-2 text-left pl-4 font-semibold text-slate-800 border-r border-slate-300">ICT (তথ্যপ্রযুক্তি)</td>
              <td className="p-2 border-r border-slate-300">
                <input
                  type="number"
                  value={ict}
                  onChange={e => setIct(Number(e.target.value))}
                  className="w-16 text-center border rounded p-1 font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />
              </td>
              <td className="p-2 text-slate-400 font-mono text-[11px]">Cell B3</td>
            </tr>
            <tr className="bg-emerald-50/70 font-bold border-b border-slate-200">
              <td className="p-2 bg-slate-100 font-mono text-slate-500 border-r border-slate-300">4</td>
              <td className="p-2 text-left pl-4 text-emerald-900">Total Marks (মোট নম্বর)</td>
              <td className="p-2 text-emerald-700 font-extrabold text-sm border-r border-slate-300">{sum}</td>
              <td className="p-2 text-emerald-800 font-mono text-xs">=SUM(B1:B3)</td>
            </tr>
            <tr className="bg-blue-50/70 font-bold">
              <td className="p-2 bg-slate-100 font-mono text-slate-500 border-r border-slate-300">5</td>
              <td className="p-2 text-left pl-4 text-blue-900">Average (গড় নম্বর)</td>
              <td className="p-2 text-blue-700 font-extrabold text-sm border-r border-slate-300">{average}</td>
              <td className="p-2 text-blue-800 font-mono text-xs">=AVERAGE(B1:B3)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-slate-500">
        {language === 'en'
          ? 'Notice: In Excel, when you modify the numbers in cells B1, B2, or B3, the formulas in rows 4 and 5 instantly update the totals automatically.'
          : 'লক্ষ করুন: যেকোনো বিষয়ে নম্বর পরিবর্তন করলেই এক্সেলে স্বয়ংক্রিয়ভাবে মোট নম্বর ও গড় হিসাব পরিবর্তিত হচ্ছে।'}
      </p>
    </div>
  );
};

// ==================== 5. WORD FORMATTING SIMULATOR ====================
const WordFormattingSimulator: React.FC<{ language: Language; onSuccess?: () => void }> = ({ language }) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');
  const [fontSize, setFontSize] = useState<number>(16);

  return (
    <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
            {language === 'en' ? 'Microsoft Word Mini Ribbon' : 'ওয়ার্ড ফরম্যাটিং ল্যাব'}
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            {language === 'en' ? 'Formatting a Formal Leave Application' : 'দরখাস্ত ফরম্যাটিং অনুশীলন'}
          </h4>
        </div>
      </div>

      {/* Mini Ribbon Toolbar */}
      <div className="p-2 bg-slate-100 rounded-xl border border-slate-200 flex items-center gap-2">
        <button
          onClick={() => setIsBold(!isBold)}
          className={`px-3 py-1 rounded font-bold transition-colors ${
            isBold ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'
          }`}
        >
          B
        </button>
        <button
          onClick={() => setIsItalic(!isItalic)}
          className={`px-3 py-1 rounded italic font-serif font-bold transition-colors ${
            isItalic ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'
          }`}
        >
          I
        </button>
        <div className="h-5 w-px bg-slate-300 mx-1" />
        <button
          onClick={() => setAlignment('left')}
          className={`px-2 py-1 rounded text-xs ${alignment === 'left' ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-700'}`}
        >
          Left
        </button>
        <button
          onClick={() => setAlignment('center')}
          className={`px-2 py-1 rounded text-xs ${alignment === 'center' ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-700'}`}
        >
          Center
        </button>
        <button
          onClick={() => setAlignment('right')}
          className={`px-2 py-1 rounded text-xs ${alignment === 'right' ? 'bg-slate-900 text-white font-bold' : 'bg-white text-slate-700'}`}
        >
          Right
        </button>
        <div className="h-5 w-px bg-slate-300 mx-1" />
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-slate-500 font-semibold">Size:</span>
          <button
            onClick={() => setFontSize(Math.max(12, fontSize - 2))}
            className="px-2 py-0.5 bg-white border rounded hover:bg-slate-200 font-bold"
          >
            -
          </button>
          <span className="font-mono font-bold w-6 text-center">{fontSize}px</span>
          <button
            onClick={() => setFontSize(Math.min(28, fontSize + 2))}
            className="px-2 py-0.5 bg-white border rounded hover:bg-slate-200 font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Simulated Document Sheet */}
      <div 
        className="p-6 bg-white rounded-xl border border-slate-300 shadow-inner min-h-[140px] space-y-2 transition-all"
        style={{
          fontWeight: isBold ? 'bold' : 'normal',
          fontStyle: isItalic ? 'italic' : 'normal',
          textAlign: alignment,
          fontSize: `${fontSize}px`
        }}
      >
        <p className="font-semibold text-slate-900">
          {language === 'en' ? 'Subject: Application for 3 Days Leave of Absence' : 'বিষয়: ৩ দিনের ছুটির জন্য আবেদন'}
        </p>
        <p className="text-slate-700 text-[13px] leading-relaxed">
          {language === 'en'
            ? 'Sir, with due respect, I beg to state that I could not attend classes from 12th to 14th instant on account of fever. I pray and hope that you would kindly grant me leave of absence for those days.'
            : 'বিনীত নিবেদন এই যে, অসুস্থতার কারণে আমি গত ১২ থেকে ১৪ তারিখ পর্যন্ত ক্লাসে উপস্থিত হতে পারিনি। অতএব অনুগ্রহপূর্বক উক্ত দিনগুলোর ছুটি মঞ্জুর করিতে আজ্ঞা হয়।'}
        </p>
      </div>
    </div>
  );
};
