import React, { useState, useEffect } from 'react';
import { useStudent } from '../context/StudentContext';
import { COURSES_DATA } from '../data/coursesData';
import { Lesson, ModuleChapter, ContentBlock } from '../types';
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  FileText, 
  CheckCircle2, 
  HelpCircle, 
  Type, 
  Download, 
  Printer, 
  Lightbulb, 
  AlertTriangle, 
  Sparkles, 
  Menu, 
  X,
  Keyboard,
  ArrowRight,
  RotateCcw,
  Check,
  Layers,
  Terminal,
  Cpu,
  Monitor,
  TrendingUp,
  Clock,
  Target,
  Briefcase,
  PlayCircle,
  Eye,
  Award
} from 'lucide-react';
import { InteractiveSimulators } from './InteractiveSimulators';
import { TypingEngine } from './typing/TypingEngine';
import { AssessmentRunner } from './assessment/AssessmentRunner';
import { buildAssessmentConfig } from '../utils/assessmentUtils';

export const LessonPlayer: React.FC = () => {
  const { 
    language, 
    selectedCourseId, 
    selectedLessonId, 
    setSelectedLessonId, 
    setActiveView,
    enrollments,
    markLessonCompleted,
    bookmarks,
    toggleBookmark,
    notes,
    saveNote,
    isOfflineMode,
    setLastAccessedLesson,
    quizResults
  } = useStudent();

  // Find course and current lesson
  const currentCourse = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];
  
  // Find current lesson and module
  let currentModule: ModuleChapter | null = null;
  let currentLesson: Lesson | null = null;

  for (const m of currentCourse.modules) {
    const l = m.lessons.find(lesson => lesson.id === selectedLessonId);
    if (l) {
      currentModule = m;
      currentLesson = l;
      break;
    }
  }

  // Fallback if not found
  if (!currentLesson && currentCourse.modules[0]?.lessons[0]) {
    currentLesson = currentCourse.modules[0].lessons[0];
    currentModule = currentCourse.modules[0];
  }

  // State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showNotesDrawer, setShowNotesDrawer] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [showPrintView, setShowPrintView] = useState(false);
  const [activeStage, setActiveStage] = useState<'learn' | 'practice' | 'test' | 'review' | 'progress'>('learn');
  const [practiceDone, setPracticeDone] = useState(false);

  // Sync existing note and reset stage when lesson changes
  useEffect(() => {
    if (currentLesson) {
      const existing = notes.find(n => n.lessonId === currentLesson?.id);
      setNoteText(existing ? existing.text : '');
      // Automatically record last accessed lesson for Continue Learning persistence
      setLastAccessedLesson(currentCourse.id, currentLesson.id);
      setActiveStage('learn');
      setPracticeDone(false);
    }
  }, [currentLesson?.id, notes, currentCourse.id, setLastAccessedLesson]);

  if (!currentLesson || !currentModule) {
    return (
      <div className="p-12 text-center">
        <p className="text-slate-500">No lesson found. Please select a course from the catalog.</p>
        <button onClick={() => setActiveView('catalog')} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg">
          Go to Catalog
        </button>
      </div>
    );
  }

  // Flattened list of all lessons in this course for Prev/Next navigation
  const allLessons: Lesson[] = currentCourse.modules.flatMap(m => m.lessons);
  const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const isBookmarked = bookmarks.some(b => b.lessonId === currentLesson.id);
  const isCompleted = enrollments[currentCourse.id]?.completedLessonIds.includes(currentLesson.id);

  // Generic Reusable Assessment configuration and history
  const assessmentConfig = buildAssessmentConfig(currentCourse.id, currentLesson);
  const previousQuizResult = quizResults.find(q => q.lessonId === currentLesson.id);
  const hasTakenAssessment = Boolean(previousQuizResult);
  const isAssessmentPassed = previousQuizResult 
    ? previousQuizResult.percentage >= (assessmentConfig?.passingPercentage ?? 60) 
    : false;

  // Default learning objectives fallback
  const lessonObjectivesEn = currentLesson.objectivesEn || [
    'Understand fundamental concepts and industry terminology',
    'Recognize how hardware and software work together in this scenario',
    'Complete practical hands-on exercises in the interactive lab',
    'Validate learning with the end-of-lesson knowledge check'
  ];
  const lessonObjectivesBn = currentLesson.objectivesBn || [
    'মূল বিষয় ও প্রযুক্তিগত পারিভাষিক শব্দসমূহ অনুধাবন করা',
    'বাস্তব প্রয়োগ ও হার্ডওয়্যার-সফটওয়্যার কার্যপ্রণালী পর্যবেক্ষণ করা',
    'ইন্টারেক্টিভ ল্যাবে বাস্তব অনুশীলন সম্পন্ন করা',
    'কুইজের মাধ্যমে নিজের জ্ঞান যাচাই ও ভুল সংশোধন করা'
  ];

  const handleSaveNote = () => {
    if (!currentLesson) return;
    saveNote(currentCourse.id, currentLesson.id, noteText);
    setShowNotesDrawer(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col" id="lesson-player">
      
      {/* Top Sticky Header */}
      <header className="sticky top-16 z-30 bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('dashboard')}
            className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 flex items-center gap-1 text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>

          <div className="h-4 w-px bg-slate-200" />

          <div>
            <span className="text-[10px] font-bold text-emerald-700 block uppercase tracking-wider">
              {currentCourse.titleEn.split(':')[0]} • {currentModule.titleEn.split(':')[0]}
            </span>
            <h1 className="text-xs sm:text-sm font-extrabold text-slate-900 line-clamp-1">
              {language === 'en' ? currentLesson.titleEn : currentLesson.titleBn}
            </h1>
          </div>
        </div>

        {/* Right Tools: Font Size, Bookmark, Notes, Lesson List Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Font Size Toggle */}
          <button
            onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs flex items-center gap-1"
            title="Toggle Text Size"
          >
            <Type className="w-4 h-4" />
            <span className="font-mono font-bold text-[10px]">{fontSize === 'normal' ? 'A' : 'A+'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            onClick={() => toggleBookmark(currentCourse.id, currentLesson.id, currentLesson.titleEn)}
            className={`p-2 rounded-lg text-xs transition-colors ${
              isBookmarked 
                ? 'bg-amber-100 text-amber-800' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Bookmark this lesson"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600 text-amber-600' : ''}`} />
          </button>

          {/* Study Notes Drawer Toggle */}
          <button
            onClick={() => setShowNotesDrawer(!showNotesDrawer)}
            className={`p-2 rounded-lg text-xs transition-colors flex items-center gap-1 ${
              noteText 
                ? 'bg-emerald-100 text-emerald-800 font-bold' 
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="My Notes for this lesson"
          >
            <FileText className="w-4 h-4" />
            <span className="text-[11px] hidden md:inline">Notes</span>
          </button>

          {/* Print / Download Summary */}
          <button
            onClick={() => setShowPrintView(true)}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg text-xs hidden sm:flex items-center gap-1"
            title="Download / Print Lesson Summary"
          >
            <Download className="w-4 h-4" />
            <span className="text-[11px] hidden md:inline">Summary</span>
          </button>

          {/* Table of Contents Drawer Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 bg-slate-100 text-slate-800 hover:bg-slate-200 rounded-lg text-xs flex items-center gap-1.5 font-bold"
          >
            <Menu className="w-4 h-4" />
            <span className="text-[11px] hidden sm:inline">All Lessons</span>
          </button>
        </div>
      </header>

      {/* Main Container with Collapsible Course Outline Sidebar */}
      <div className="flex-1 flex max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 gap-8 relative">
        
        {/* Main Lesson Body */}
        <main className={`flex-1 max-w-3xl mx-auto space-y-6 pb-24 ${fontSize === 'large' ? 'text-base' : 'text-sm'}`}>
          
          {/* Offline Cached Notice */}
          {isOfflineMode && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Offline Ready: This lesson is cached on your device. You can read, practice, and take quizzes without an active internet connection.</span>
            </div>
          )}

          {/* 5-STAGE CORE LEARNING LOOP STEPPER */}
          <section className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3" id="learning-loop-stepper">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-extrabold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'en' ? 'Core Learning Loop' : 'লার্নিং লুপ'}</span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] text-slate-500 font-medium">
                  {language === 'en' 
                    ? 'LEARN → PRACTICE → TEST → REVIEW → PROGRESS' 
                    : 'শিখুন → অনুশীলন → পরীক্ষা → পর্যালোচনা → অগ্রগতি'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[11px]">
                <span className={`px-2.5 py-0.5 rounded-full font-bold border ${
                  isCompleted 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                }`}>
                  {isCompleted 
                    ? (language === 'en' ? '✓ Mastery Achieved' : '✓ পাঠ সম্পন্ন') 
                    : (language === 'en' ? 'Lesson in Progress' : 'পাঠ চলমান')}
                </span>
              </div>
            </div>

            {/* Stage Navigation Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
              {/* Stage 1: LEARN */}
              <button
                onClick={() => {
                  setActiveStage('learn');
                  document.getElementById('stage-learn')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                  activeStage === 'learn'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  1
                </div>
                <div className="min-w-0">
                  <span className="block font-bold leading-tight truncate">{language === 'en' ? 'Learn' : 'শিখুন'}</span>
                  <span className="text-[10px] text-slate-500 font-normal leading-tight hidden sm:block truncate">
                    {language === 'en' ? 'Concepts' : 'ধারণা'}
                  </span>
                </div>
              </button>

              {/* Stage 2: PRACTICE */}
              <button
                onClick={() => {
                  setActiveStage('practice');
                  document.getElementById('stage-practice')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                  activeStage === 'practice'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                    : practiceDone
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  practiceDone ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {practiceDone ? '✓' : '2'}
                </div>
                <div className="min-w-0">
                  <span className="block font-bold leading-tight truncate">{language === 'en' ? 'Practice' : 'অনুশীলন'}</span>
                  <span className="text-[10px] text-slate-500 font-normal leading-tight hidden sm:block truncate">
                    {language === 'en' ? 'Hands-on' : 'ল্যাব'}
                  </span>
                </div>
              </button>

              {/* Stage 3: TEST */}
              <button
                onClick={() => {
                  setActiveStage('test');
                  document.getElementById('stage-test')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                  activeStage === 'test'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                    : hasTakenAssessment
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  hasTakenAssessment ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {hasTakenAssessment ? '✓' : '3'}
                </div>
                <div className="min-w-0">
                  <span className="block font-bold leading-tight truncate">{language === 'en' ? 'Test' : 'পরীক্ষা'}</span>
                  <span className="text-[10px] text-slate-500 font-normal leading-tight hidden sm:block truncate">
                    {language === 'en' ? 'Timed Quiz' : 'কুইজ'}
                  </span>
                </div>
              </button>

              {/* Stage 4: REVIEW */}
              <button
                onClick={() => {
                  setActiveStage('review');
                  document.getElementById('stage-review')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                  activeStage === 'review'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
                  4
                </div>
                <div className="min-w-0">
                  <span className="block font-bold leading-tight truncate">{language === 'en' ? 'Review' : 'পর্যালোচনা'}</span>
                  <span className="text-[10px] text-slate-500 font-normal leading-tight hidden sm:block truncate">
                    {language === 'en' ? 'Answers' : 'উত্তর'}
                  </span>
                </div>
              </button>

              {/* Stage 5: PROGRESS */}
              <button
                onClick={() => {
                  setActiveStage('progress');
                  document.getElementById('stage-progress')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`col-span-2 sm:col-span-1 p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                  activeStage === 'progress'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-2xs'
                    : isCompleted
                    ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-semibold'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                  isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {isCompleted ? '★' : '5'}
                </div>
                <div className="min-w-0">
                  <span className="block font-bold leading-tight truncate">{language === 'en' ? 'Progress' : 'অগ্রগতি'}</span>
                  <span className="text-[10px] text-slate-500 font-normal leading-tight hidden sm:block truncate">
                    {language === 'en' ? 'Next Lesson' : 'পরবর্তী পাঠ'}
                  </span>
                </div>
              </button>
            </div>
          </section>

          {/* STAGE 1: LEARN (Reading Content, Objectives, Callouts, Examples) */}
          <section id="stage-learn" className="space-y-6">
            {/* Lesson Header Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Stage 1: Reading & Fundamentals</span>
                </span>
                <span>{currentLesson.estimatedMinutes} Mins Read</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {language === 'en' ? currentLesson.titleEn : currentLesson.titleBn}
              </h2>

              {/* Bilingual Subtitle */}
              <p className="text-xs sm:text-sm text-slate-500 font-serif">
                {language === 'en' ? currentLesson.titleBn : currentLesson.titleEn}
              </p>

              <p className="text-slate-600 leading-relaxed pt-1">
                {language === 'en' ? currentLesson.summaryEn : currentLesson.summaryBn}
              </p>

              {/* Learning Objectives Box */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  {language === 'en' ? 'Learning Objectives:' : 'এই পাঠের শিক্ষণীয় উদ্দেশ্যসমূহ:'}
                </span>
                <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                  {(language === 'en' ? lessonObjectivesEn : lessonObjectivesBn).map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sequential Content Blocks */}
            <div className="space-y-6">
              {currentLesson.contentBlocks.map((block: ContentBlock, blockIdx: number) => {
                // 1. Text Section Block
                if (block.type === 'text') {
                  return (
                    <div key={blockIdx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                      {block.titleEn && (
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {language === 'en' ? block.titleEn : block.titleBn || block.titleEn}
                        </h3>
                      )}
                      <div className="text-slate-700 leading-relaxed space-y-2 whitespace-pre-line">
                        {language === 'en' ? block.contentEn : block.contentBn || block.contentEn}
                      </div>
                    </div>
                  );
                }

                // 2. Callout / Tip / Important Concept Block
                if (block.type === 'callout') {
                  return (
                    <div 
                      key={blockIdx}
                      className="p-5 rounded-2xl border flex items-start gap-3.5 bg-amber-50/80 border-amber-300 text-amber-950 shadow-2xs"
                    >
                      <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-200/70 text-amber-900 px-2 py-0.5 rounded">
                            {language === 'en' ? 'Important Concept' : 'গুরুত্বপূর্ণ ধারণা'}
                          </span>
                          {block.titleEn && (
                            <h4 className="font-bold text-sm text-slate-900">
                              {language === 'en' ? block.titleEn : block.titleBn || block.titleEn}
                            </h4>
                          )}
                        </div>
                        <p className="leading-relaxed text-slate-800">
                          {language === 'en' ? block.contentEn : block.contentBn || block.contentEn}
                        </p>
                      </div>
                    </div>
                  );
                }

                // 3. Real-World Practical Example Block
                if (block.type === 'example') {
                  return (
                    <div 
                      key={blockIdx}
                      className="p-5 rounded-2xl border bg-gradient-to-br from-blue-50/80 to-indigo-50/50 border-blue-200 text-blue-950 space-y-3 shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                        <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
                          {language === 'en' ? 'Practical Real-World Example' : 'বাস্তব জীবনের প্রায়োগিক উদাহরণ'}
                        </span>
                      </div>

                      {block.titleEn && (
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                          {language === 'en' ? block.titleEn : block.titleBn || block.titleEn}
                        </h4>
                      )}

                      <div className="p-4 bg-white/95 rounded-xl border border-blue-100 text-xs text-slate-700 leading-relaxed whitespace-pre-line space-y-1 font-sans">
                        {language === 'en' ? block.contentEn : block.contentBn || block.contentEn}
                      </div>
                    </div>
                  );
                }

                // 4. Visual Diagram Block
                if (block.type === 'diagram') {
                  return (
                    <div key={blockIdx} className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xs">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                        <Layers className="w-4 h-4" />
                        <span>{language === 'en' ? block.titleEn : block.titleBn || block.titleEn}</span>
                      </div>

                      <p className="text-xs text-slate-300">
                        {language === 'en' ? block.contentEn : block.contentBn || block.contentEn}
                      </p>

                      {/* Step Cards if provided in extra.steps */}
                      {block.extra?.steps && Array.isArray(block.extra.steps) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-2">
                          {block.extra.steps.map((st: any, sIdx: number) => (
                            <div key={sIdx} className="p-3 bg-slate-800 rounded-xl border border-slate-700 space-y-1 text-center">
                              <span className="text-xs font-mono font-bold text-emerald-400">Step {sIdx + 1}: {st.name}</span>
                              <p className="text-[11px] text-slate-300">
                                {language === 'en' ? st.descEn : st.descBn || st.descEn}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // 5. Key Terms Block
                if (block.type === 'key_terms') {
                  return (
                    <div key={blockIdx} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span>{language === 'en' ? block.titleEn || 'Key Concepts' : block.titleBn || 'মূল ধারণাসমূহ'}</span>
                      </h3>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {language === 'en' ? block.contentEn : block.contentBn || block.contentEn}
                      </p>
                    </div>
                  );
                }

                // 6. Shortcut Table or Standard Table
                if (block.type === 'shortcut_table' || block.type === 'table') {
                  return (
                    <div key={blockIdx} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Keyboard className="w-4 h-4 text-emerald-600" />
                        <span>{language === 'en' ? block.titleEn : block.titleBn || block.titleEn}</span>
                      </h3>
                      <p className="text-xs text-slate-600">
                        {language === 'en' ? block.contentEn : block.contentBn || block.contentEn}
                      </p>
                    </div>
                  );
                }

                // 7. Step Guide
                if (block.type === 'step_guide') {
                  return (
                    <div key={blockIdx} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
                      <h3 className="text-base font-bold text-slate-900">
                        {language === 'en' ? block.titleEn : block.titleBn || block.titleEn}
                      </h3>
                      <div className="p-4 bg-slate-50 rounded-xl font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                        {language === 'en' ? block.contentEn : block.contentBn || block.contentEn}
                      </div>
                    </div>
                  );
                }

                return null;
              })}
            </div>
          </section>

          {/* STAGE 2: PRACTICE (Hands-on Interactive Lab & Completion Marker) */}
          <section id="stage-practice" className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Stage 2: Hands-on Practice</span>
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  {currentLesson.practice 
                    ? (language === 'en' ? currentLesson.practice.titleEn : currentLesson.practice.titleBn)
                    : (language === 'en' ? 'Interactive Skill Lab' : 'ইন্টারঅ্যাকটিভ দক্ষতা ল্যাব')}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'en'
                    ? 'Apply what you just read in a simulated hands-on environment before testing your knowledge.'
                    : 'পরীক্ষায় বসার আগে যা শিখলেন তা বাস্তব ইন্টারঅ্যাকটিভ পরিবেশে অনুশীলন করুন।'}
                </p>
              </div>

              <button
                onClick={() => setPracticeDone(!practiceDone)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-2xs ${
                  practiceDone
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {practiceDone ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>{language === 'en' ? 'Practice Completed ✓' : 'অনুশীলন সম্পন্ন ✓'}</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{language === 'en' ? 'Mark Practice Done' : 'অনুশীলন শেষ চিহ্নিত করুন'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Interactive Simulator / Hands-on Lab */}
            {currentLesson.practice && (
              <div className="space-y-3">
                {currentLesson.practice.type === 'typing_prompt' ? (
                  <TypingEngine
                    mode="embedded"
                    initialCategory="home_row"
                    titleOverride={language === 'en' ? currentLesson.practice.titleEn : currentLesson.practice.titleBn}
                  />
                ) : (
                  <InteractiveSimulators 
                    type={currentLesson.practice.type}
                    language={language}
                  />
                )}
              </div>
            )}
          </section>

          {/* STAGE 3: TEST (Generic Assessment System with MCQ & Typing) */}
          <section id="stage-test" className="space-y-4 pt-4 border-t border-slate-200">
            {assessmentConfig ? (
              <div className="p-6 sm:p-7 bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-2xl shadow-md space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 flex items-center gap-1.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>Stage 3: Knowledge & Skills Assessment</span>
                    </span>
                    <h4 className="text-xl font-black tracking-tight">
                      {language === 'en' ? assessmentConfig.titleEn : assessmentConfig.titleBn}
                    </h4>
                    <p className="text-xs text-emerald-100 max-w-xl">
                      {(language === 'en' ? assessmentConfig.descriptionEn : assessmentConfig.descriptionBn) || (language === 'en' 
                        ? 'Validate your understanding with timed MCQ questions and typing practical drills.' 
                        : 'টাইমড নৈর্ব্যক্তিক ও টাইপিং ব্যবহারিক পরীক্ষার মাধ্যমে আপনার জ্ঞান যাচাই করুন।')}
                    </p>
                  </div>

                  <button
                    onClick={() => setIsAssessmentOpen(true)}
                    className="px-6 py-3.5 bg-white text-emerald-900 hover:bg-emerald-50 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <HelpCircle className="w-4 h-4 text-emerald-700" />
                    <span>
                      {hasTakenAssessment
                        ? (language === 'en' ? 'Retake Assessment' : 'পুনরায় পরীক্ষা দিন')
                        : (language === 'en' ? 'Start Timed Assessment' : 'টাইমড পরীক্ষা শুরু করুন')}
                    </span>
                  </button>
                </div>

                {/* Assessment specs pill bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs border-t border-emerald-700/60">
                  <div className="p-2.5 bg-white/10 rounded-xl">
                    <span className="text-[10px] text-emerald-200 block uppercase font-medium">Questions</span>
                    <span className="font-extrabold text-white">{assessmentConfig.items.length} Items</span>
                  </div>
                  <div className="p-2.5 bg-white/10 rounded-xl">
                    <span className="text-[10px] text-emerald-200 block uppercase font-medium">Time Limit</span>
                    <span className="font-extrabold text-white flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {Math.round(assessmentConfig.timeLimitSeconds / 60)} Minutes
                    </span>
                  </div>
                  <div className="p-2.5 bg-white/10 rounded-xl">
                    <span className="text-[10px] text-emerald-200 block uppercase font-medium">Pass Threshold</span>
                    <span className="font-extrabold text-white">{assessmentConfig.passingPercentage}% Required</span>
                  </div>
                  <div className="p-2.5 bg-white/10 rounded-xl">
                    <span className="text-[10px] text-emerald-200 block uppercase font-medium">Assessment Types</span>
                    <span className="font-extrabold text-white truncate">
                      {assessmentConfig.items.some(i => i.type === 'typing_test') ? 'MCQ + Typing' : 'MCQ'}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5 bg-white border border-slate-200 rounded-2xl text-slate-500 text-xs text-center">
                {language === 'en' ? 'No formal quiz configured for this lesson.' : 'এই পাঠের জন্য কোনো আনুষ্ঠানিক কুইজ নির্ধারিত নেই।'}
              </div>
            )}
          </section>

          {/* STAGE 4: REVIEW (Answer Breakdown, Explanations & Retry) */}
          <section id="stage-review" className="space-y-4 pt-4 border-t border-slate-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Stage 4: Answer Review & Explanations
                  </span>
                </div>
                {hasTakenAssessment && (
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                    isAssessmentPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {isAssessmentPassed 
                      ? (language === 'en' ? 'Passed' : 'উত্তীর্ণ') 
                      : (language === 'en' ? 'Review Recommended' : 'পুনঃপর্যালোচনা প্রয়োজন')}
                  </span>
                )}
              </div>

              {hasTakenAssessment && previousQuizResult ? (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">
                        {language === 'en' ? 'Latest Assessment Performance' : 'সর্বশেষ পরীক্ষার ফলাফল'}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {language === 'en' ? 'Score' : 'প্রাপ্ত স্কোর'}: {previousQuizResult.score} / {previousQuizResult.totalQuestions} ({previousQuizResult.percentage}%)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsAssessmentOpen(true)}
                        className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Review Questions' : 'প্রশ্নাবলি পর্যালোচনা'}</span>
                      </button>
                      <button
                        onClick={() => setIsAssessmentOpen(true)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-2xs flex items-center gap-1.5"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Retry Quiz' : 'পুনরায় দিন'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-500 flex items-center justify-between gap-3">
                  <span>
                    {language === 'en' 
                      ? 'Take the Step 3 assessment to unlock comprehensive answer explanations and knowledge retention feedback.' 
                      : 'ধাপ ৩ এর পরীক্ষায় অংশগ্রহণ করলে বিস্তারিত উত্তরের পর্যালোচনা উন্মুক্ত হবে।'}
                  </span>
                  <button
                    onClick={() => {
                      setActiveStage('test');
                      setIsAssessmentOpen(true);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-xs shrink-0"
                  >
                    {language === 'en' ? 'Take Test' : 'পরীক্ষা দিন'}
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* STAGE 5: PROGRESS (Course Advancement & Completion) */}
          <section id="stage-progress" className="space-y-4 pt-4 border-t border-slate-200">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Stage 5: Lesson Mastery & Next Milestone
                  </span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {isCompleted ? (language === 'en' ? 'Completed' : 'সম্পন্ন') : (language === 'en' ? 'Incomplete' : 'অসম্পূর্ণ')}
                </span>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h4 className="font-extrabold text-emerald-950 text-sm">
                    {isCompleted 
                      ? (language === 'en' ? 'Lesson Completed! Keep up the momentum.' : 'পাঠ সম্পন্ন হয়েছে! দুর্দান্ত অগ্রগতি!')
                      : (language === 'en' ? 'Ready to complete this lesson?' : 'এই পাঠ সম্পন্ন করতে প্রস্তুত?')}
                  </h4>
                  <p className="text-xs text-emerald-800">
                    {language === 'en' 
                      ? 'Marking as completed updates your course progress bar and unlocks the next module.' 
                      : 'পাঠ সম্পন্ন চিহ্নিত করলে আপনার কোর্স অগ্রগতি সংরক্ষিত হবে।'}
                  </p>
                </div>

                <button
                  onClick={() => markLessonCompleted(currentCourse.id, currentLesson.id)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-2xs ${
                    isCompleted
                      ? 'bg-emerald-200 text-emerald-900 hover:bg-emerald-300'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isCompleted 
                      ? (language === 'en' ? 'Lesson Completed ✓' : 'পাঠ সম্পন্ন ✓') 
                      : (language === 'en' ? 'Mark Lesson as Completed' : 'পাঠ সম্পন্ন করুন')}
                  </span>
                </button>
              </div>

              {/* Next Lesson Preview */}
              {nextLesson && (
                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="text-slate-500 font-medium">
                    {language === 'en' ? 'Next Up:' : 'পরবর্তী পাঠ:'} <strong className="text-slate-800">{nextLesson.titleEn}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setSelectedLessonId(nextLesson.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-2xs"
                  >
                    <span>{language === 'en' ? 'Go to Next Lesson' : 'পরবর্তী পাঠে যান'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </section>

        </main>

        {/* Course Outline Drawer / Sidebar (Collapsible) */}
        {sidebarOpen && (
          <aside className="fixed inset-y-0 right-0 z-40 w-80 bg-white border-l border-slate-200 p-5 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div className="space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {language === 'en' ? 'Course Curriculum' : 'কোর্স পাঠ্যসূচি'}
                </h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {currentCourse.modules.map(mod => (
                  <div key={mod.id} className="space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {language === 'en' ? mod.titleEn : mod.titleBn}
                    </p>
                    <div className="space-y-1">
                      {mod.lessons.map(les => {
                        const isThisActive = les.id === currentLesson?.id;
                        const isDone = enrollments[currentCourse.id]?.completedLessonIds.includes(les.id);

                        return (
                          <button
                            key={les.id}
                            onClick={() => {
                              setSelectedLessonId(les.id);
                              setSidebarOpen(false);
                            }}
                            className={`w-full p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between ${
                              isThisActive
                                ? 'bg-emerald-50 text-emerald-950 font-bold border border-emerald-300'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span className="line-clamp-1">{language === 'en' ? les.titleEn : les.titleBn}</span>
                            {isDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            ) : (
                              <span className="text-[10px] text-slate-400 shrink-0">{les.estimatedMinutes}m</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
              >
                Close Menu
              </button>
            </div>
          </aside>
        )}

      </div>

      {/* Floating Notes Drawer (When Activated) */}
      {showNotesDrawer && (
        <div className="fixed bottom-20 right-6 z-40 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 space-y-3 animate-in slide-in-from-bottom duration-150">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold text-xs">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>{language === 'en' ? 'My Study Notes for this Lesson' : 'এই পাঠের জন্য আমার নোট'}</span>
            </div>
            <button onClick={() => setShowNotesDrawer(false)} className="text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          </div>

          <textarea
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            placeholder={language === 'en' ? 'Write key thoughts, definitions, or exam reminders...' : 'পরীক্ষার জন্য প্রয়োজনীয় নোট বা গুরুত্বপূর্ণ বাক্য লিখে রাখুন...'}
            className="w-full h-32 p-3 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none font-sans"
          />

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowNotesDrawer(false)}
              className="px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNote}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {/* Printable / Downloadable Friendly Modal */}
      {showPrintView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Printable Revision Sheet</span>
                <h3 className="text-base font-extrabold text-slate-900">{currentLesson.titleEn}</h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Sheet</span>
                </button>
                <button onClick={() => setShowPrintView(false)} className="text-slate-400 hover:text-slate-800 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-800 leading-relaxed font-sans">
              <div className="p-3 bg-slate-50 rounded-xl">
                <p className="font-bold text-slate-900">Summary:</p>
                <p>{currentLesson.summaryEn}</p>
              </div>

              <div>
                <p className="font-bold text-slate-900">Key Learning Objectives:</p>
                <ul className="list-disc pl-5 mt-1 space-y-0.5">
                  {lessonObjectivesEn.map((o, idx) => (
                    <li key={idx}>{o}</li>
                  ))}
                </ul>
              </div>

              {currentLesson.quiz && (
                <div className="space-y-2">
                  <p className="font-bold text-slate-900">Practice Review Questions:</p>
                  {currentLesson.quiz.map((q, idx) => (
                    <div key={idx} className="p-2 border rounded-lg bg-slate-50">
                      <p className="font-semibold">{idx + 1}. {q.questionEn}</p>
                      <p className="text-[11px] text-emerald-700 mt-1">Answer: {q.optionsEn[q.correctIndex]}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <footer className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          
          {/* Previous Lesson */}
          {prevLesson ? (
            <button
              onClick={() => setSelectedLessonId(prevLesson.id)}
              className="px-3.5 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{prevLesson.titleEn.split(':')[0]}</span>
              <span className="sm:hidden">Prev</span>
            </button>
          ) : (
            <div className="w-20" />
          )}

          {/* Mark Complete Checkbox / Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => markLessonCompleted(currentCourse.id, currentLesson.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{isCompleted ? (language === 'en' ? 'Completed' : 'সম্পন্ন হয়েছে') : (language === 'en' ? 'Mark as Done' : 'সম্পন্ন চিহ্নিত করুন')}</span>
            </button>
          </div>

          {/* Next Lesson */}
          {nextLesson ? (
            <button
              onClick={() => setSelectedLessonId(nextLesson.id)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span className="hidden sm:inline">{nextLesson.titleEn.split(':')[0]}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setActiveView('dashboard')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <span>{language === 'en' ? 'Finish to Dashboard' : 'ড্যাশবোর্ডে ফিরুন'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

        </div>
      </footer>

      {/* Generic Reusable Assessment Runner Modal */}
      {assessmentConfig && (
        <AssessmentRunner
          config={assessmentConfig}
          isOpen={isAssessmentOpen}
          onClose={() => setIsAssessmentOpen(false)}
        />
      )}

    </div>
  );
};
