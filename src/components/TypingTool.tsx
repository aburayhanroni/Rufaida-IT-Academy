import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { 
  Keyboard as KeyIcon, 
  Trophy, 
  Flame, 
  Target, 
  Clock, 
  History, 
  Award, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
  BarChart3,
  Globe2,
  ShieldCheck
} from 'lucide-react';
import { TypingCategory } from '../data/typingLessons';
import { TypingEngine } from './typing/TypingEngine';

export const TypingTool: React.FC = () => {
  const { language, typingStats, setActiveView } = useStudent();
  const [activeCategory, setActiveCategory] = useState<TypingCategory>('home_row');
  const [activeTab, setActiveTab] = useState<'practice' | 'progress'>('practice');

  // Skill level calculator based on personal best WPM
  const pbWpm = typingStats.personalBest?.wpm || 0;
  const pbAccuracy = typingStats.personalBest?.accuracy || 0;

  const getTypingRank = (wpm: number) => {
    if (wpm >= 60) return { title: 'Typing Master', titleBn: 'টাইপিং মাস্টার', color: 'text-purple-700 bg-purple-100 border-purple-300', nextGoal: 75, progress: 100 };
    if (wpm >= 40) return { title: 'Advanced Typist', titleBn: 'অগ্রগামী টাইপিস্ট', color: 'text-blue-700 bg-blue-100 border-blue-300', nextGoal: 60, progress: Math.round(((wpm - 40) / 20) * 100) };
    if (wpm >= 25) return { title: 'Intermediate', titleBn: 'মধ্যবর্তী স্তর', color: 'text-emerald-700 bg-emerald-100 border-emerald-300', nextGoal: 40, progress: Math.round(((wpm - 25) / 15) * 100) };
    if (wpm >= 15) return { title: 'Novice Typist', titleBn: 'শিক্ষানবিস টাইপিস্ট', color: 'text-amber-700 bg-amber-100 border-amber-300', nextGoal: 25, progress: Math.round(((wpm - 15) / 10) * 100) };
    return { title: 'Beginner', titleBn: 'শুরুর স্তর', color: 'text-slate-700 bg-slate-100 border-slate-300', nextGoal: 15, progress: Math.round((wpm / 15) * 100) };
  };

  const currentRank = getTypingRank(pbWpm);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <KeyIcon className="w-3.5 h-3.5" />
                {language === 'en' ? 'Touch Typing Academy' : 'টাচ টাইপিং একাডেমি'}
              </span>
              <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-xs font-medium rounded-full">
                English (Bangla Ready)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {language === 'en' ? 'Build Accurate Typing Muscle Memory' : 'সঠিক নিয়মে দ্রুত টাইপিংয়ে দক্ষ হয়ে উঠুন'}
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Master the home row, anchor bumps on F and J, and develop touch typing confidence with step-by-step drills and timed tests.'
                : 'হোম রো-এর F এবং J কী-এর মাধ্যমে আঙুলের সঠিক অবস্থান শিখুন এবং ঘড়ি ধরে স্পিড টেস্টে অংশ নিন।'}
            </p>
          </div>

          {/* Personal Best Card in Hero */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-w-[220px] shrink-0">
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/10 text-xs">
              <span className="flex items-center gap-1.5 text-amber-300 font-bold uppercase tracking-wider text-[11px]">
                <Trophy className="w-3.5 h-3.5" />
                {language === 'en' ? 'Personal Best' : 'ব্যক্তিগত সেরা'}
              </span>
              <span className="text-[10px] text-slate-300">{typingStats.personalBest?.achievedAt || 'Ready'}</span>
            </div>

            <div className="grid grid-cols-2 gap-3 py-3">
              <div>
                <span className="text-3xl font-black font-mono text-white leading-none block">
                  {pbWpm}
                </span>
                <span className="text-[10px] text-emerald-300 font-semibold uppercase mt-0.5 block">Net WPM</span>
              </div>
              <div className="border-l border-white/10 pl-3">
                <span className="text-3xl font-black font-mono text-emerald-400 leading-none block">
                  {pbAccuracy}%
                </span>
                <span className="text-[10px] text-slate-300 font-semibold uppercase mt-0.5 block">Accuracy</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-slate-300">{language === 'en' ? 'Rank:' : 'র‍্যাংক:'}</span>
              <span className="font-bold text-amber-300">{language === 'en' ? currentRank.title : currentRank.titleBn}</span>
            </div>
          </div>
        </div>

        {/* Decorative background flare */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main View Mode Selector (Practice Arena vs. Progress Analytics) */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-1">
        <div className="flex items-center gap-2">
          <button
            id="typing-tab-practice-btn"
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'practice'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <KeyIcon className="w-4 h-4" />
            <span>{language === 'en' ? 'Typing Arena' : 'টাইপিং এরিনা'}</span>
          </button>

          <button
            id="typing-tab-progress-btn"
            onClick={() => setActiveTab('progress')}
            className={`px-4 py-2 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'progress'
                ? 'border-emerald-600 text-emerald-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>{language === 'en' ? 'Personal Best & Progress' : 'ব্যক্তিগত রেকর্ড ও অগ্রগতি'}</span>
          </button>
        </div>

        <button
          onClick={() => setActiveView('courses')}
          className="text-xs font-semibold text-slate-500 hover:text-slate-900 flex items-center gap-1"
        >
          <span>{language === 'en' ? 'Back to Courses' : 'কোর্সে ফিরে যান'}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {activeTab === 'practice' ? (
        /* Reusable Independent Typing Engine (Configured in Standalone mode) */
        <div className="space-y-6">
          <TypingEngine
            mode="standalone"
            initialCategory={activeCategory}
            showKeyboard={true}
            showFingerGuide={true}
          />

          {/* Course Synergy Callout (Connecting to Basic Computer Course Module 3) */}
          <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {language === 'en' ? 'Module 3: Typing Fundamentals' : 'মডিউল ৩: টাইপিং ফান্ডামেন্টালস'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'en' 
                    ? 'This interactive typing engine is built directly into your Basic Computer course lessons.'
                    : 'এই ইন্টারেক্টিভ টাইপিং ইঞ্জিনটি বেসিক কম্পিউটার কোর্সের মডিউল ৩ পাঠে সরাসরি যুক্ত রয়েছে।'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveView('courses')}
              className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shadow-xs"
            >
              {language === 'en' ? 'View Course Lessons' : 'কোর্স পাঠ দেখুন'}
            </button>
          </div>
        </div>
      ) : (
        /* Progress & Personal Best Analytics View */
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Key Metric Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Personal Best Speed */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Personal Best</span>
                <Trophy className="w-4 h-4 text-amber-500" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 font-mono">{pbWpm}</span>
                <span className="text-xs text-slate-500 font-bold">WPM</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                {typingStats.personalBest?.drillTitle || 'Home Row Anchor Keys'}
              </p>
            </div>

            {/* Lifetime Accuracy */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Lifetime Accuracy</span>
                <Target className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-emerald-700 font-mono">{typingStats.accuracy}%</span>
                <span className="text-xs text-slate-500 font-bold">Avg</span>
              </div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">
                High precision touch typing
              </p>
            </div>

            {/* Drills Completed */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Drills Practiced</span>
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 font-mono">{typingStats.drillsCompleted}</span>
                <span className="text-xs text-slate-500 font-bold">Sessions</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Total Practice: {typingStats.totalPracticeMinutes} minutes
              </p>
            </div>

            {/* Current Rank Tier */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-xs font-bold uppercase tracking-wider">Typing Rank</span>
                <Award className="w-4 h-4 text-purple-500" />
              </div>
              <div className="mt-2">
                <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${currentRank.color}`}>
                  {language === 'en' ? currentRank.title : currentRank.titleBn}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Next Rank Target: {currentRank.nextGoal} WPM
              </p>
            </div>
          </div>

          {/* Level Progress Bar Card */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">
                {language === 'en' ? 'Progression to Next Rank:' : 'পরবর্তী র‍্যাংকের পথে অগ্রগতি:'}
              </span>
              <span className="font-mono font-bold text-emerald-700">
                {currentRank.progress}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${currentRank.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>Beginner (0 WPM)</span>
              <span>Intermediate (25 WPM)</span>
              <span>Advanced (40 WPM)</span>
              <span>Master (60+ WPM)</span>
            </div>
          </div>

          {/* Milestone Achievements Grid */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{language === 'en' ? 'Touch Typing Milestones' : 'টাইপিং মাইলফলক ও অর্জন'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {[
                { 
                  titleEn: 'Home Row Pioneer', 
                  titleBn: 'হোম রো পথিকৃৎ', 
                  descEn: 'Complete home row anchor practice on F and J', 
                  descBn: 'F ও J কী-র দাগ চিনে প্রথম ড্রিল সম্পন্ন', 
                  unlocked: typingStats.drillsCompleted >= 1 
                },
                { 
                  titleEn: 'Speedster 20+ WPM', 
                  titleBn: 'গতি অর্জন ২০+ WPM', 
                  descEn: 'Achieve 20 Net WPM in any drill or test', 
                  descBn: 'যেকোনো ড্রিলে ২০ WPM বা তদুর্ধ্ব গতি অর্জন', 
                  unlocked: pbWpm >= 20 
                },
                { 
                  titleEn: 'Precision Virtuoso', 
                  titleBn: 'নিখুঁত টাইপিস্ট', 
                  descEn: 'Maintain 95%+ accuracy in 3 consecutive drills', 
                  descBn: 'টানা তিনটি ড্রিলে ৯৫% বা তার বেশি নির্ভুলতা', 
                  unlocked: pbAccuracy >= 95 
                },
                { 
                  titleEn: 'Sprint Racer', 
                  titleBn: 'স্প্রিন্ট বিজয়ী', 
                  descEn: 'Complete the 30-Second or 60-Second Timed Test', 
                  descBn: 'টাইমড টেস্ট সম্পন্ন করা', 
                  unlocked: typingStats.history.some(h => (h.category === 'timed_test' || h.drillName.includes('Test')))
                },
                { 
                  titleEn: 'Patience & Practice', 
                  titleBn: 'অধ্যবসায়ী শিক্ষার্থী', 
                  descEn: 'Log at least 30 minutes of typing practice', 
                  descBn: 'কমপক্ষে ৩০ মিনিট টাইপিং অনুশীলন সম্পন্ন', 
                  unlocked: typingStats.totalPracticeMinutes >= 30 
                },
                { 
                  titleEn: 'Speed Master 35+ WPM', 
                  titleBn: 'স্পিড মাস্টার ৩৫+ WPM', 
                  descEn: 'Reach 35 WPM to qualify for professional typing', 
                  descBn: 'পেশাদার টাইপিংয়ের মানদণ্ডে ৩৫ WPM গতি অর্জন', 
                  unlocked: pbWpm >= 35 
                }
              ].map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                    m.unlocked
                      ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                      : 'bg-slate-50/60 border-slate-200 text-slate-400 opacity-75'
                  }`}
                >
                  <div className={`p-2 rounded-lg shrink-0 ${m.unlocked ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">
                      {language === 'en' ? m.titleEn : m.titleBn}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {language === 'en' ? m.descEn : m.descBn}
                    </p>
                    <span className={`text-[10px] font-bold uppercase mt-1 inline-block ${m.unlocked ? 'text-emerald-700' : 'text-slate-400'}`}>
                      {m.unlocked ? (language === 'en' ? 'Unlocked' : 'অর্জিত') : (language === 'en' ? 'In Progress' : 'চলমান')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session History Log Table */}
          <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <History className="w-4 h-4 text-slate-600" />
                <span>{language === 'en' ? 'Recent Typing Sessions' : 'সাম্প্রতিক টাইপিং সেশন ইতিহাস'}</span>
              </h3>
              <span className="text-xs text-slate-400">
                {typingStats.history.length} {language === 'en' ? 'records' : 'টি রেকর্ড'}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Drill Title</th>
                    <th className="py-2.5 px-3 text-center">Net WPM</th>
                    <th className="py-2.5 px-3 text-center">Accuracy</th>
                    <th className="py-2.5 px-3 text-center">Errors</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {typingStats.history.map((h, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 px-3 text-slate-400">{h.date}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">{h.drillName}</td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-emerald-700">{h.wpm}</td>
                      <td className="py-2.5 px-3 text-center font-mono">{h.accuracy}%</td>
                      <td className="py-2.5 px-3 text-center font-mono text-slate-500">{h.errors ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default TypingTool;
