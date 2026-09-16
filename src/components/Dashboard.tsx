import React, { useState, useMemo } from 'react';
import { useStudent } from '../context/StudentContext';
import { COURSES_DATA } from '../data/coursesData';
import { CourseProgressRecord, ModuleProgress } from '../types';
import { 
  Flame, 
  BookOpen, 
  Keyboard, 
  Award, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Bookmark, 
  FileText, 
  Clock, 
  Sparkles,
  User,
  Building2,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Trash2,
  Search,
  Target,
  Zap,
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { 
  calculateOverallProgress, 
  determineRecommendedActivities 
} from '../services/progressService';

export const Dashboard: React.FC = () => {
  const { 
    user, 
    language, 
    enrollments, 
    typingStats, 
    quizResults,
    quizAttempts,
    completedActivities,
    lastVisitedLesson,
    continueLearningState,
    streakInfo,
    courseProgressRecords,
    bookmarks, 
    removeBookmark,
    notes,
    deleteNote,
    setActiveView, 
    setSelectedCourseId, 
    setSelectedLessonId,
    setLastVisitedLessonRecord,
    setIsSearchOpen,
    setShowOrgModal,
    setShowAuthModal,
    viewCourseDetails
  } = useStudent();

  const [activeShelfTab, setActiveShelfTab] = useState<'bookmarks' | 'notes' | 'activity'>('bookmarks');
  const [expandedCourseModules, setExpandedCourseModules] = useState<Record<string, boolean>>({
    'basic-computer': true
  });

  // Calculate high-level aggregated progress metrics
  const overallProgress = useMemo(() => {
    return calculateOverallProgress(COURSES_DATA, enrollments);
  }, [enrollments]);

  // Contextual recommended activities
  const recommendations = useMemo(() => {
    return determineRecommendedActivities(COURSES_DATA, enrollments, quizAttempts, typingStats);
  }, [enrollments, quizAttempts, typingStats]);

  const totalModulesCount = useMemo(() => {
    return COURSES_DATA.reduce((acc, c) => acc + c.modules.length, 0);
  }, []);

  const completedModulesCount = useMemo(() => {
    return (Object.values(courseProgressRecords) as CourseProgressRecord[]).reduce((acc, rec) => {
      const list = Object.values(rec.moduleProgress || {}) as ModuleProgress[];
      return acc + list.filter(m => m.isCompleted).length;
    }, 0);
  }, [courseProgressRecords]);

  const averageQuizScore = useMemo(() => {
    if (quizResults.length === 0) return 0;
    return Math.round(quizResults.reduce((acc, q) => acc + q.percentage, 0) / quizResults.length);
  }, [quizResults]);

  const toggleCourseModules = (courseId: string) => {
    setExpandedCourseModules(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const handleResumeLesson = (courseId: string, lessonId: string) => {
    setSelectedCourseId(courseId);
    setSelectedLessonId(lessonId);
    setLastVisitedLessonRecord(courseId, lessonId);
    setActiveView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const enrolledCourseIds = Object.keys(enrollments);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200" id="student-dashboard">
      
      {/* 1. Top Student Learning Identity Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -top-10 w-48 h-48 rounded-full bg-teal-500/10 blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Identity & Ownership */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg shadow-emerald-950/50">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {language === 'en' ? 'Independent Learner' : 'স্বাধীন শিক্ষার্থী'}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-300 mt-1">
                <span className="font-mono text-emerald-400 font-semibold">{user.studentId}</span>
                <span>•</span>
                <span>{user.district}, Bangladesh</span>
                <span>•</span>
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="text-emerald-400 hover:text-emerald-300 underline font-medium"
                >
                  {language === 'en' ? 'Edit Profile' : 'প্রোফাইল পরিবর্তন'}
                </button>
              </div>

              {/* Institution status badge */}
              <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-slate-400">
                  {user.connectedInstitution ? (
                    <span className="text-emerald-400 flex items-center gap-1 font-medium">
                      <Building2 className="w-3.5 h-3.5" /> Connected: {user.connectedInstitution.name}
                    </span>
                  ) : (
                    <span className="text-slate-400 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" /> 
                      {language === 'en' ? 'No School Lock-in (100% Student-Owned)' : 'কোনো স্কুলে সীমাবদ্ধ নয়'}
                    </span>
                  )}
                </span>
                <button
                  onClick={() => setShowOrgModal(true)}
                  className="text-[11px] px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md border border-slate-700 transition-colors"
                >
                  {language === 'en' ? 'School Link' : 'প্রতিষ্ঠান লিংক'}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar (Streak + Overall Progress) */}
          <div className="flex items-center gap-4 sm:gap-6 bg-slate-800/90 p-4 sm:p-5 rounded-2xl border border-slate-700/80 shrink-0">
            {/* Learning Streak */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Flame className="w-6 h-6 fill-amber-500 text-amber-500 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black text-white font-mono">{streakInfo.currentStreakDays}</span>
                  <span className="text-xs text-slate-300 font-semibold">{language === 'en' ? 'Days' : 'দিন'}</span>
                </div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                  {language === 'en' ? 'Learning Streak' : 'অধ্যয়ন ধারাবাহিকতা'}
                </span>
              </div>
            </div>

            <div className="h-9 w-px bg-slate-700" />

            {/* Overall Progress */}
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                  {overallProgress.overallPercent}%
                </span>
              </div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">
                {language === 'en' ? 'Total Progress' : 'সার্বিক অগ্রগতি'}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Quick Search & Jump Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Search className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">
              {language === 'en' ? 'Search Across All Course Content' : 'সকল কোর্সের বিষয়বস্তু অনুসন্ধান'}
            </p>
            <p className="text-[11px] text-slate-400">
              {language === 'en' ? 'Find specific lessons, concepts, quizzes, and definitions' : 'যেকোনো পাঠ, কনসেপ্ট বা কুইজ দ্রুত খুঁজুন'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="w-full sm:w-auto px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-slate-200"
        >
          <span>{language === 'en' ? 'Open Search...' : 'সার্চ করুন...'}</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white border border-slate-300 rounded text-slate-500">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* 3. Prominent "Continue Learning" & Last Visited Lesson State */}
      {continueLearningState.hasActiveState && continueLearningState.nextLesson ? (
        <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-7 shadow-xs space-y-4 relative overflow-hidden" id="continue-learning-card">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700">
                {language === 'en' ? 'Continue Where You Left Off' : 'যেখান থেকে পড়া থামিয়েছিলেন'}
              </span>
            </div>

            {continueLearningState.lastVisited && (
              <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Last activity:' : 'সর্বশেষ সেশন:'} {continueLearningState.lastVisited.lessonTitle.split(':')[0]}</span>
              </span>
            )}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <span>{continueLearningState.courseTitle}</span>
                <span>•</span>
                <span className="text-slate-500 font-semibold">{continueLearningState.moduleTitle}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                {language === 'en' 
                  ? continueLearningState.nextLesson.titleEn 
                  : continueLearningState.nextLesson.titleBn}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                {language === 'en' 
                  ? continueLearningState.nextLesson.summaryEn 
                  : continueLearningState.nextLesson.summaryBn}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {continueLearningState.nextLesson.estimatedMinutes} mins
                </span>
                <span>•</span>
                <span>{continueLearningState.nextLesson.quiz ? `${continueLearningState.nextLesson.quiz.length} MCQs Assessment` : 'Interactive Lesson'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleResumeLesson(continueLearningState.courseId, continueLearningState.nextLesson!.id)}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm transition-all shadow-md shadow-emerald-200 flex items-center gap-2.5 group whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                <span>{language === 'en' ? 'Resume Lesson' : 'পাঠ শুরু করুন'}</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback if all finished or brand new */
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                {language === 'en' ? 'Ready to Start Learning?' : 'নতুন পাঠ শুরু করতে প্রস্তুত?'}
              </p>
              <p className="text-xs text-slate-500">
                {language === 'en' ? 'Explore our digital curriculum courses to begin.' : 'শুরু করতে কোর্স ক্যাটালগ থেকে কোর্স বেছে নিন।'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveView('catalog')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold"
          >
            {language === 'en' ? 'Browse Catalog' : 'কোর্স ক্যাটালগ'}
          </button>
        </div>
      )}

      {/* 4. Aggregated Learning Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Lessons Completed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Lessons Done</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {overallProgress.completedLessons}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              / {overallProgress.totalLessons}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {language === 'en' ? 'Across all enrollments' : 'সকল কোর্সের পাঠ'}
          </p>
        </div>

        {/* Modules/Chapters Completed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Chapters Finished</span>
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {completedModulesCount}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              / {totalModulesCount}
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {language === 'en' ? 'Fully mastered modules' : 'সম্পূর্ণ মডিউল'}
          </p>
        </div>

        {/* Average Quiz Score */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Quiz Average</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {averageQuizScore}%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {quizAttempts.length} {language === 'en' ? 'total quiz attempts' : 'কুইজ চেষ্টা'}
          </p>
        </div>

        {/* Typing Speed */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Typing Speed</span>
            <Keyboard className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {typingStats.wpm}
            </span>
            <span className="text-xs text-slate-500 font-bold">WPM</span>
            <span className="text-xs text-emerald-600 font-mono font-bold ml-1">
              ({typingStats.accuracy}%)
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            {typingStats.drillsCompleted} {language === 'en' ? 'practice sessions' : 'টি অনুশীলন সম্পন্ন'}
          </p>
        </div>
      </div>

      {/* 5. Main Dashboard Layout: Left (Courses & Modules) + Right (Typing & Quiz & Recommendations) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Enrolled Courses with Granular Module/Chapter Progress */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                {language === 'en' ? 'My Courses & Chapter Progress' : 'আমার কোর্স ও অধ্যায়ভিত্তিক অগ্রগতি'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'en' ? 'Track lesson completion and module mastery' : 'প্রতিটি মডিউল ও পাঠের বিস্তারিত অগ্রগতি'}
              </p>
            </div>
            <button
              onClick={() => setActiveView('catalog')}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
            >
              <span>{language === 'en' ? 'Browse More' : 'আরও কোর্স'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {enrolledCourseIds.length === 0 ? (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">
                {language === 'en' ? 'You have not enrolled in any courses yet.' : 'আপনি এখনো কোনো কোর্সে ভর্তি হননি।'}
              </p>
              <button
                onClick={() => setActiveView('catalog')}
                className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                {language === 'en' ? 'Explore Curriculum' : 'কোর্স ক্যাটালগ দেখুন'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {enrolledCourseIds.map(courseId => {
                const course = COURSES_DATA.find(c => c.id === courseId);
                const enr = enrollments[courseId];
                const progressRec = courseProgressRecords[courseId];
                const isExpanded = expandedCourseModules[courseId] ?? false;

                if (!course || !enr) return null;

                return (
                  <div 
                    key={course.id}
                    className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs"
                  >
                    {/* Course Summary Card */}
                    <div className="p-5 sm:p-6 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                              {course.badge}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              {enr.completedLessonIds.length} / {course.totalLessons} Lessons Done
                            </span>
                            {enr.status === 'completed' && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Completed
                              </span>
                            )}
                          </div>
                          <h4 className="font-extrabold text-slate-900 text-base sm:text-lg">
                            {language === 'en' ? course.titleEn : course.titleBn}
                          </h4>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => viewCourseDetails(course.id)}
                            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                          >
                            {language === 'en' ? 'Syllabus' : 'সিলেবাস'}
                          </button>
                          <button
                            onClick={() => {
                              const targetLessonId = enr.lastAccessedLessonId || course.modules[0]?.lessons[0]?.id;
                              handleResumeLesson(course.id, targetLessonId);
                            }}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                          >
                            <span>{language === 'en' ? 'Study' : 'অধ্যয়ন'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Course Progress Bar */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 font-medium">
                            {progressRec ? `${progressRec.completedLessonsCount} of ${progressRec.totalLessons} lessons completed` : 'Progress'}
                          </span>
                          <span className="font-bold text-emerald-700 font-mono">
                            {progressRec ? `${progressRec.progressPercent}%` : `${enr.progressPercent}%`}
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                            style={{ width: `${progressRec ? progressRec.progressPercent : enr.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Expand / Collapse Module Breakdown toggle */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => toggleCourseModules(course.id)}
                          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                        >
                          <span>{language === 'en' ? 'Chapter & Module Breakdown' : 'অধ্যায়ভিত্তিক মডিউল বিবরণী'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {course.modules.length} {language === 'en' ? 'Modules' : 'টি মডিউল'}
                        </span>
                      </div>
                    </div>

                    {/* Expandable Module / Chapter List */}
                    {isExpanded && progressRec && progressRec.moduleProgress && (
                      <div className="bg-slate-50/70 border-t border-slate-100 p-5 space-y-3">
                        {(Object.values(progressRec.moduleProgress) as ModuleProgress[]).map((modProgress) => {
                          const originalModule = course.modules.find(m => m.id === modProgress.moduleId);

                          return (
                            <div 
                              key={modProgress.moduleId}
                              className="bg-white rounded-2xl border border-slate-200/80 p-4 space-y-2.5"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                      Module {modProgress.moduleNumber}
                                    </span>
                                    {modProgress.isCompleted && (
                                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                        Completed
                                      </span>
                                    )}
                                  </div>
                                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                                    {language === 'en' ? modProgress.titleEn : modProgress.titleBn}
                                  </h5>
                                </div>
                                <span className="font-mono text-xs font-bold text-slate-700 shrink-0">
                                  {modProgress.completedLessons} / {modProgress.totalLessons}
                                </span>
                              </div>

                              {/* Mini progress bar */}
                              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-emerald-500 rounded-full transition-all"
                                  style={{ width: `${modProgress.progressPercent}%` }}
                                />
                              </div>

                              {/* Lesson items list */}
                              {originalModule && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                                  {originalModule.lessons.map(les => {
                                    const isDone = enr.completedLessonIds.includes(les.id);
                                    const quizScore = enr.quizScores?.[les.id];

                                    return (
                                      <button
                                        key={les.id}
                                        onClick={() => handleResumeLesson(course.id, les.id)}
                                        className={`p-2 rounded-xl text-left text-xs transition-colors flex items-center justify-between gap-2 ${
                                          isDone 
                                            ? 'bg-emerald-50/50 text-slate-800 hover:bg-emerald-50' 
                                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                                        }`}
                                      >
                                        <div className="flex items-center gap-2 min-w-0">
                                          {isDone ? (
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                          ) : (
                                            <div className="w-3.5 h-3.5 rounded-full border border-slate-300 shrink-0" />
                                          )}
                                          <span className="truncate text-[11px] font-semibold">
                                            {language === 'en' ? les.titleEn : les.titleBn}
                                          </span>
                                        </div>

                                        {quizScore !== undefined ? (
                                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 shrink-0">
                                            {quizScore}%
                                          </span>
                                        ) : (
                                          <span className="text-[10px] text-slate-400 shrink-0">
                                            {les.estimatedMinutes}m
                                          </span>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Personal Learning Shelf: Bookmarks, Personal Notes, Activity Stream */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4" id="learning-shelf">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveShelfTab('bookmarks')}
                  className={`text-xs font-bold pb-1 flex items-center gap-1.5 transition-colors ${
                    activeShelfTab === 'bookmarks' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? `Bookmarks (${bookmarks.length})` : `বুকমার্ক (${bookmarks.length})`}</span>
                </button>
                <button
                  onClick={() => setActiveShelfTab('notes')}
                  className={`text-xs font-bold pb-1 flex items-center gap-1.5 transition-colors ${
                    activeShelfTab === 'notes' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{language === 'en' ? `Personal Notes (${notes.length})` : `ব্যক্তিগত নোট (${notes.length})`}</span>
                </button>
                <button
                  onClick={() => setActiveShelfTab('activity')}
                  className={`text-xs font-bold pb-1 flex items-center gap-1.5 transition-colors ${
                    activeShelfTab === 'activity' ? 'text-emerald-700 border-b-2 border-emerald-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>{language === 'en' ? 'Activity Log' : 'কাজের বিবরণী'}</span>
                </button>
              </div>

              <span className="text-[11px] text-slate-400">
                {language === 'en' ? 'Saved Locally & Synced' : 'লোকাল মেমরিতে সংরক্ষিত'}
              </span>
            </div>

            {/* Shelf Content */}
            {activeShelfTab === 'bookmarks' && (
              bookmarks.length === 0 ? (
                <div className="py-8 text-center space-y-1">
                  <Bookmark className="w-6 h-6 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-400 italic">No bookmarks saved yet. Click the bookmark icon inside any lesson to save it for quick revision.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {bookmarks.map((bm, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100/80 rounded-2xl text-xs transition-colors">
                      <div className="flex items-center gap-2.5">
                        <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-800 block">{bm.lessonTitle}</span>
                          <span className="text-[10px] text-slate-400">{bm.bookmarkedAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleResumeLesson(bm.courseId, bm.lessonId)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-[11px] transition-colors"
                        >
                          Open
                        </button>
                        <button
                          onClick={() => removeBookmark(bm.courseId, bm.lessonId)}
                          className="text-slate-400 hover:text-red-600 transition-colors p-1"
                          title="Remove bookmark"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}

            {activeShelfTab === 'notes' && (
              notes.length === 0 ? (
                <div className="py-8 text-center space-y-1">
                  <FileText className="w-6 h-6 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-400 italic">No personal notes created yet. Click "Notes" while studying any lesson to write down summaries and formulas.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notes.map((n) => (
                    <div key={n.id} className="p-4 bg-amber-50/70 border border-amber-200/70 rounded-2xl text-xs space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span className="font-bold text-amber-900 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-amber-700" />
                          <span>Lesson Note</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span>{n.updatedAt}</span>
                          <button
                            onClick={() => deleteNote(n.id)}
                            className="text-slate-400 hover:text-red-600 transition-colors"
                            title="Delete note"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-800 text-[12px] leading-relaxed font-sans">{n.text}</p>
                      <button
                        onClick={() => handleResumeLesson(n.courseId, n.lessonId)}
                        className="text-emerald-700 hover:underline font-bold text-[11px] flex items-center gap-1 pt-1"
                      >
                        <span>Open Lesson</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )
            )}

            {activeShelfTab === 'activity' && (
              completedActivities.length === 0 ? (
                <p className="text-xs text-slate-400 italic py-6 text-center">No recorded activities yet.</p>
              ) : (
                <div className="space-y-2.5">
                  {completedActivities.slice(0, 6).map((act) => (
                    <div key={act.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs gap-3">
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-800">
                          {language === 'en' ? act.title : (act.titleBn || act.title)}
                        </p>
                        {act.details && (
                          <p className="text-[11px] text-slate-500">{act.details}</p>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 shrink-0 font-medium">{act.timestamp}</span>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

        </div>

        {/* Right 1 Column: Recommended Next Activity, Typing Performance & Quiz Results */}
        <div className="space-y-6">
          
          {/* Recommended Next Activity */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white rounded-3xl border border-emerald-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {language === 'en' ? 'Recommended Next Steps' : 'পরবর্তী পদক্ষেপের পরামর্শ'}
                </h4>
                <p className="text-[10px] text-slate-500">
                  {language === 'en' ? 'Tailored to your current progress' : 'আপনার অগ্রগতির ভিত্তিতে নির্ধারিত'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {recommendations.map((rec) => (
                <div 
                  key={rec.id}
                  className="p-3.5 bg-white rounded-2xl border border-emerald-100 shadow-2xs space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                      {rec.badge || (rec.type === 'next_lesson' ? 'Next Lesson' : rec.type === 'quiz_review' ? 'Knowledge Check' : 'Skill Boost')}
                    </span>
                  </div>

                  <p className="font-bold text-slate-900 text-xs">
                    {language === 'en' ? rec.titleEn : rec.titleBn}
                  </p>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {language === 'en' ? rec.descriptionEn : rec.descriptionBn}
                  </p>

                  <button
                    onClick={() => {
                      if (rec.type === 'typing_practice') {
                        setActiveView('typing');
                      } else if (rec.courseId && rec.lessonId) {
                        handleResumeLesson(rec.courseId, rec.lessonId);
                      }
                    }}
                    className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors text-center block mt-1"
                  >
                    {language === 'en' ? rec.actionTextEn : rec.actionTextBn}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Typing Performance Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Keyboard className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {language === 'en' ? 'Typing Performance' : 'টাইপিং দক্ষতা'}
                  </h4>
                  <p className="text-[10px] text-slate-400">Touch Typing System</p>
                </div>
              </div>

              <button
                onClick={() => setActiveView('typing')}
                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold transition-colors"
              >
                {language === 'en' ? 'Practice' : 'অনুশীলন'}
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Current Speed</span>
                <span className="text-2xl font-black text-slate-900 font-mono">{typingStats.wpm}</span>
                <span className="text-[10px] text-slate-500 block">WPM</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Accuracy</span>
                <span className="text-2xl font-black text-emerald-600 font-mono">{typingStats.accuracy}%</span>
                <span className="text-[10px] text-slate-500 block">Average</span>
              </div>
            </div>

            {/* Personal Best Callout */}
            {typingStats.personalBest && (
              <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-2xl text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    Personal Best Record
                  </span>
                  <span className="text-[10px] text-slate-400">{typingStats.personalBest.achievedAt}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 truncate pr-2">{typingStats.personalBest.drillTitle}</span>
                  <span className="font-mono font-black text-amber-900 shrink-0">
                    {typingStats.personalBest.wpm} WPM ({typingStats.personalBest.accuracy}%)
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-1.5 pt-1 text-xs text-slate-600">
              <div className="flex justify-between text-[11px]">
                <span>Completed Drills:</span>
                <span className="font-bold font-mono">{typingStats.drillsCompleted} sessions</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span>Total Practice Time:</span>
                <span className="font-bold font-mono">{typingStats.totalPracticeMinutes} minutes</span>
              </div>
            </div>

            <button
              onClick={() => setActiveView('typing')}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors text-center block"
            >
              {language === 'en' ? 'Open Full Typing Master' : 'টাইপিং মাস্টার চালু করুন'}
            </button>
          </div>

          {/* Recent Quiz Attempts & Results */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm">
                    {language === 'en' ? 'Recent Quiz Results' : 'সাম্প্রতিক কুইজ ফলাফল'}
                  </h4>
                  <p className="text-[10px] text-slate-400">Knowledge Mastery & Scores</p>
                </div>
              </div>
            </div>

            {quizResults.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-4 text-center">
                {language === 'en' ? 'No quizzes completed yet. Complete lessons to test yourself.' : 'এখনো কোনো কুইজ সম্পন্ন করা হয়নি।'}
              </p>
            ) : (
              <div className="space-y-2.5">
                {quizResults.slice(0, 4).map((qr, idx) => (
                  <div key={qr.id || idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs gap-3">
                    <div className="space-y-0.5">
                      <p className="font-bold text-slate-800 line-clamp-1">{qr.quizTitle}</p>
                      <p className="text-[10px] text-slate-400">{qr.date} • {qr.score}/{qr.total} Correct</p>
                    </div>
                    <span className={`font-mono font-extrabold text-xs px-2.5 py-1 rounded-xl shrink-0 ${
                      qr.percentage >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {qr.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Independent Account Notice */}
          <div className="p-5 bg-slate-50 rounded-3xl border border-slate-200 text-xs text-slate-600 space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-bold">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>{language === 'en' ? 'Phase 1: Student-Owned Record' : 'শিক্ষার্থী-মালিকানাধীন অগ্রগতি'}</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {language === 'en'
                ? 'Your learning streak, quiz attempts, and certificates are saved with your independent student identity. You can pause anytime and continue exactly where you stopped.'
                : 'আপনার অগ্রগতি, কুইজের ফলাফল ও স্টাডি নোট আপনার নিজস্ব লার্নিং অ্যাকাউন্টে স্থায়ীভাবে সংরক্ষিত থাকে।'}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
