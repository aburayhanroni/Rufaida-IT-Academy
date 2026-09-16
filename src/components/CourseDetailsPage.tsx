import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { COURSES_DATA } from '../data/coursesData';
import { Button, Badge, ProgressBar } from './ui';
import { 
  ChevronLeft, 
  BookOpen, 
  Clock, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  Keyboard, 
  Laptop, 
  Award,
  ChevronDown,
  ChevronUp,
  Share2,
  Check
} from 'lucide-react';

export const CourseDetailsPage: React.FC = () => {
  const { 
    language, 
    selectedCourseId, 
    setSelectedCourseId,
    setActiveView, 
    setSelectedLessonId, 
    enrollments, 
    enrollCourse,
    openEnrollmentModal,
    updateEnrollmentStatus,
    user
  } = useStudent();

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1': true,
    'mod-2': true,
    'ssc-ch-1': true,
    'ssc-ch-2': true
  });
  const [copiedLink, setCopiedLink] = useState(false);

  // Find selected course or fallback to first course
  const course = COURSES_DATA.find(c => c.id === selectedCourseId) || COURSES_DATA[0];
  const enrollment = enrollments[course.id];
  const isEnrolled = !!enrollment;

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const handleEnrollOrResume = () => {
    if (!isEnrolled) {
      openEnrollmentModal(course);
      return;
    }
    const targetLessonId = enrollment?.lastAccessedLessonId || course.modules[0]?.lessons[0]?.id || '';
    setSelectedCourseId(course.id);
    setSelectedLessonId(targetLessonId);
    setActiveView('lesson');
  };

  const handleStartSpecificLesson = (lessonId: string) => {
    if (!isEnrolled) {
      openEnrollmentModal(course);
      return;
    }
    setSelectedCourseId(course.id);
    setSelectedLessonId(lessonId);
    setActiveView('lesson');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const badgeVariant = course.badgeColor === 'emerald' ? 'emerald' : course.badgeColor === 'blue' ? 'blue' : 'purple';

  return (
    <div className="min-h-screen bg-slate-50 pb-20 animate-in fade-in duration-200" id="course-details-page">
      
      {/* 1. Top Breadcrumb & Actions Bar */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={() => setActiveView('catalog')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{language === 'en' ? 'Back to All Courses' : 'সকল কোর্সে ফিরুন'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? (language === 'en' ? 'Copied!' : 'কপি হয়েছে!') : (language === 'en' ? 'Share' : 'শেয়ার')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Hero Header Section */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Info Column */}
            <div className="lg:col-span-8 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={badgeVariant as any} size="md" hasDot>
                  {course.badge}
                </Badge>
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {language === 'en' ? course.level : course.levelBn}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {language === 'en' ? '100% Free' : 'সম্পূর্ণ বিনামূল্যে'}
                </span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                  {language === 'en' ? course.titleEn : course.titleBn}
                </h1>
                <p className="text-sm sm:text-base text-slate-500 font-serif mt-1">
                  {language === 'en' ? course.titleBn : course.titleEn}
                </p>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
                {language === 'en' ? course.descriptionEn : course.descriptionBn}
              </p>

              {/* Tagline */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {language === 'en' ? course.taglineEn : course.taglineBn}
                </p>
              </div>

              {/* Course Features Pills */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-2">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  {course.modulesCount} {language === 'en' ? 'Structured Modules' : 'টি পূর্ণাঙ্গ মডিউল'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  {course.totalLessons} {language === 'en' ? 'Bilingual Lessons' : 'টি পাঠ'}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  ~{course.estimatedHours} {language === 'en' ? 'Hours of Learning' : 'ঘণ্টা'}
                </span>
                {course.hasTypingIntegration && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                      <Keyboard className="w-4 h-4" />
                      {language === 'en' ? 'Touch Typing Integrated' : 'টাচ টাইপিং অন্তর্ভুক্ত'}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Right Sticky Enrollment Card */}
            <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm">
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {language === 'en' ? 'Tuition & Access' : 'ভর্তি ও অ্যাক্সেস'}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">
                    {language === 'en' ? 'Free' : 'বিনামূল্যে'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {language === 'en' ? 'for all students in Bangladesh' : 'সকল শিক্ষার্থীর জন্য'}
                  </span>
                </div>
              </div>

              {/* Progress & Enrollment Record if Enrolled */}
              {isEnrolled && (
                <div className="space-y-3 p-4 bg-white rounded-2xl border border-slate-200">
                  {/* Status & ID Badge */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        {language === 'en' ? 'Enrollment Status' : 'ভর্তি অবস্থা'}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 font-bold text-xs px-2 py-0.5 rounded-md mt-0.5 ${
                        enrollment.status === 'completed' 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : enrollment.status === 'cancelled'
                          ? 'bg-slate-100 text-slate-600 border border-slate-200'
                          : enrollment.status === 'suspended'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          enrollment.status === 'completed' ? 'bg-blue-600' :
                          enrollment.status === 'cancelled' ? 'bg-slate-400' :
                          enrollment.status === 'suspended' ? 'bg-amber-500' :
                          'bg-emerald-500 animate-pulse'
                        }`} />
                        {enrollment.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">
                        {language === 'en' ? 'Enrolled Date' : 'ভর্তির তারিখ'}
                      </span>
                      <span className="text-xs font-mono text-slate-600 font-semibold">
                        {enrollment.enrolledAt}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[9px] uppercase font-bold">Ref Record ID:</span>
                    <span className="text-slate-700 font-bold truncate block">{enrollment.id || `ENR-${user.studentId}-${course.id}`}</span>
                  </div>

                  <ProgressBar
                    value={enrollment.progressPercent}
                    label={language === 'en' ? 'Your Progress' : 'আপনার অগ্রগতি'}
                    showPercent
                    variant={enrollment.status === 'completed' ? 'emerald' : 'blue'}
                  />
                  <p className="text-xs text-slate-500 flex items-center justify-between">
                    <span>{enrollment.completedLessonIds.length} of {course.totalLessons} {language === 'en' ? 'lessons completed' : 'টি পাঠ সম্পন্ন'}</span>
                    <span>{enrollment.progressPercent}%</span>
                  </p>

                  {/* Status test selector */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {language === 'en' ? 'Lifecycle Status (Phase 1 Model)' : 'লাইফসাইকেল স্ট্যাটাস (১ম পর্যায়)'}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {(['active', 'completed', 'cancelled', 'suspended'] as const).map(st => (
                        <button
                          key={st}
                          onClick={() => updateEnrollmentStatus(course.id, st)}
                          className={`text-[10px] font-bold px-2 py-1 rounded transition-colors uppercase ${
                            enrollment.status === st
                              ? 'bg-slate-900 text-white'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-2.5">
                <Button
                  variant="emerald"
                  size="lg"
                  onClick={handleEnrollOrResume}
                  className="w-full"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  {isEnrolled
                    ? (enrollment?.status === 'cancelled' || enrollment?.status === 'suspended'
                        ? (language === 'en' ? 'Reactivate & Resume' : 'পুনরায় চালু করুন')
                        : (language === 'en' ? 'Continue Learning' : 'পড়াশোনা চালিয়ে যান'))
                    : (language === 'en' ? 'Enroll in Course (Free)' : 'বিনামূল্যে কোর্সে ভর্তি হন')}
                </Button>

                {isEnrolled && (
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setActiveView('my_courses')}
                    className="w-full"
                  >
                    {language === 'en' ? 'Go to My Courses' : 'আমার কোর্সে দেখুন'}
                  </Button>
                )}
              </div>

              {/* Value Guarantees */}
              <div className="space-y-2.5 pt-4 border-t border-slate-200 text-xs text-slate-600">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'en' ? 'Independent Student ID record' : 'ব্যক্তিগত স্টুডেন্ট আইডি রেকর্ড'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Laptop className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'en' ? 'In-browser interactive labs & tests' : 'ব্রাউজারে বাস্তব ল্যাব ও কুইজ'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'en' ? 'Digital Completion Certificate' : 'ডিজিটাল সমাপ্তি সনদ'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Main Content: What You'll Learn, Prerequisites, and Curriculum Accordion */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* What You'll Learn Box */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <span>{language === 'en' ? 'What You Will Learn' : 'এই কোর্স থেকে যা শিখবেন'}</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(language === 'en' ? course.learningOutcomesEn : course.learningOutcomesBn).map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 bg-slate-50/70 rounded-2xl border border-slate-100 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete Syllabus & Curriculum Accordion */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {language === 'en' ? 'Course Curriculum & Syllabus' : 'কোর্স কারিকুলাম ও সিলেবাস'}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {course.modulesCount} {language === 'en' ? 'modules' : 'টি মডিউল'} • {course.totalLessons} {language === 'en' ? 'lessons' : 'টি পাঠ'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const allOpen: Record<string, boolean> = {};
                      course.modules.forEach(m => { allOpen[m.id] = true; });
                      setExpandedModules(allOpen);
                    }}
                    className="text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    {language === 'en' ? 'Expand All' : 'সব খুলুন'}
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    onClick={() => setExpandedModules({})}
                    className="text-xs font-semibold text-slate-500 hover:underline"
                  >
                    {language === 'en' ? 'Collapse All' : 'সব বন্ধ করুন'}
                  </button>
                </div>
              </div>

              {/* Modules List */}
              <div className="space-y-4">
                {course.modules.map((mod, modIdx) => {
                  const isOpen = !!expandedModules[mod.id];
                  const completedInMod = mod.lessons.filter(l => enrollment?.completedLessonIds.includes(l.id)).length;

                  return (
                    <div key={mod.id} className="border border-slate-200 rounded-2xl overflow-hidden transition-all">
                      {/* Module Header Toggle */}
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full p-4 sm:p-5 bg-slate-50 hover:bg-slate-100/80 transition-colors flex items-center justify-between text-left gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Module {modIdx + 1}
                            </span>
                            {completedInMod > 0 && (
                              <span className="text-[11px] font-semibold text-emerald-600">
                                {completedInMod}/{mod.lessons.length} {language === 'en' ? 'completed' : 'সম্পন্ন'}
                              </span>
                            )}
                          </div>
                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                            {language === 'en' ? mod.titleEn : mod.titleBn}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {language === 'en' ? mod.descriptionEn : mod.descriptionBn}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-medium text-slate-400 hidden sm:inline">
                            {mod.lessons.length} {language === 'en' ? 'lessons' : 'টি পাঠ'}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-slate-500" />
                          )}
                        </div>
                      </button>

                      {/* Lessons inside Module */}
                      {isOpen && (
                        <div className="divide-y divide-slate-100 bg-white">
                          {mod.lessons.map((lesson, lIdx) => {
                            const isDone = enrollment?.completedLessonIds.includes(lesson.id);

                            return (
                              <div
                                key={lesson.id}
                                className="p-4 sm:p-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="mt-0.5 shrink-0">
                                    {isDone ? (
                                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                                        <Check className="w-3.5 h-3.5" />
                                      </div>
                                    ) : (
                                      <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold">
                                        {lIdx + 1}
                                      </div>
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                                      {language === 'en' ? lesson.titleEn : lesson.titleBn}
                                    </h4>
                                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                      {language === 'en' ? lesson.summaryEn : lesson.summaryBn}
                                    </p>
                                    <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {lesson.estimatedMinutes} mins
                                      </span>
                                      {lesson.practice && (
                                        <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                          <Laptop className="w-3 h-3" />
                                          Interactive Lab
                                        </span>
                                      )}
                                      {lesson.quiz && lesson.quiz.length > 0 && (
                                        <span className="text-blue-600 font-semibold flex items-center gap-1">
                                          <HelpCircle className="w-3 h-3" />
                                          Quiz Check
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>

                                <div className="sm:self-center shrink-0">
                                  <Button
                                    size="xs"
                                    variant={isDone ? 'outline' : 'primary'}
                                    onClick={() => handleStartSpecificLesson(lesson.id)}
                                  >
                                    {isDone 
                                      ? (language === 'en' ? 'Review' : 'পুনরাবৃত্তি') 
                                      : (language === 'en' ? 'Start Lesson' : 'পাঠ শুরু করুন')}
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Prerequisites & Requirements */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                {language === 'en' ? 'Prerequisites & Requirements' : 'পূর্বশর্ত ও প্রয়োজনীয়তা'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {language === 'en' ? course.prerequisitesEn : course.prerequisitesBn}
              </p>
              <ul className="space-y-2 text-xs text-slate-600 list-disc pl-5">
                <li>{language === 'en' ? 'Access to a desktop, laptop, or mobile browser' : 'ডেস্কটপ, ল্যাপটপ বা স্মার্টফোনে ইন্টারনেট ব্রাউজার'}</li>
                <li>{language === 'en' ? 'Eagerness to practice with hands-on labs and typing drills' : 'বাস্তব অনুশীলন ও কুইজে অংশ নেওয়ার আগ্রহ'}</li>
                <li>{language === 'en' ? 'No prior fees or tuition required — fully open for Bangladesh students' : 'কোনো ফি বা টিউশন চার্জ প্রযোজ্য নয় — সম্পূর্ণ উন্মুক্ত'}</li>
              </ul>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* National Student Identity Guarantee Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 space-y-4 shadow-md">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'en' ? 'Independent Learner Guarantee' : 'স্বাধীন শিক্ষার্থীর অধিকার'}</span>
              </div>
              <h4 className="text-base font-black">
                {language === 'en' ? 'Your Progress Belongs to You' : 'আপনার শেখার অগ্রগতি আপনার নিজের'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'en'
                  ? 'All completed lessons, typing speed benchmarks, and quiz scores are tied to your personal National Learner ID. You can later connect to a school or teacher class without losing anything.'
                  : 'সকল সম্পন্ন পাঠ, টাইপিং স্পিড রেকর্ড এবং কুইজ স্কোর আপনার নিজস্ব শিক্ষার্থী আইডিতে স্থায়ী থাকবে। পরবর্তীতে যেকোনো স্কুল বা শিক্ষকের সাথে যুক্ত হলেও এটি সংরক্ষিত থাকবে।'}
              </p>
            </div>

            {/* NCTB Alignment Notice */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>{language === 'en' ? 'Curriculum Standard' : 'পাঠ্যক্রম মানদণ্ড'}</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900">
                {language === 'en' ? 'NCTB & Industry Standard' : 'জাতীয় শিক্ষাক্রম ও বাস্তব দক্ষতা'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'en'
                  ? 'Crafted strictly to bridge academic board syllabus requirements with practical computing tools used in offices, freelance jobs, and higher education.'
                  : 'জাতীয় শিক্ষাক্রমের অধ্যায়ের সাথে বাস্তব অফিসের কাজ ও কর্মক্ষেত্রের ডিজিটাল দক্ষতার মেলবন্ধন।'}
              </p>
            </div>

            {/* Bottom Quick CTA */}
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl space-y-3 text-center">
              <h4 className="font-extrabold text-sm text-emerald-950">
                {language === 'en' ? 'Ready to begin?' : 'শিখতে প্রস্তুত?'}
              </h4>
              <p className="text-xs text-emerald-800">
                {language === 'en' ? 'Jump into the first interactive lesson right now.' : 'প্রথম পাঠটি এখনই শুরু করুন।'}
              </p>
              <Button
                variant="emerald"
                size="md"
                onClick={handleEnrollOrResume}
                className="w-full"
              >
                {language === 'en' ? 'Start Course' : 'কোর্স শুরু করুন'}
              </Button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
