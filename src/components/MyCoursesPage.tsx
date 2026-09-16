import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { COURSES_DATA } from '../data/coursesData';
import { CourseEnrollment, EnrollmentStatus } from '../types';
import { Button, Badge, ProgressBar, Tabs } from './ui';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Sparkles, 
  Layers, 
  Award,
  Search,
  Plus,
  ShieldCheck,
  UserCheck,
  AlertCircle,
  RotateCcw,
  XCircle,
  PauseCircle,
  ChevronRight
} from 'lucide-react';

export const MyCoursesPage: React.FC = () => {
  const { 
    language, 
    user, 
    enrollments, 
    updateEnrollmentStatus,
    setActiveView, 
    setSelectedCourseId, 
    setSelectedLessonId, 
    viewCourseDetails 
  } = useStudent();

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed' | 'other'>('all');

  // Find all enrolled courses from COURSES_DATA
  const enrolledCoursesList = COURSES_DATA.filter(course => !!enrollments[course.id]);

  // Filter based on tab
  const filteredCourses = enrolledCoursesList.filter(course => {
    const enrollment = enrollments[course.id];
    const status = enrollment?.status || 'active';

    if (activeTab === 'active') return status === 'active';
    if (activeTab === 'completed') return status === 'completed';
    if (activeTab === 'other') return status === 'cancelled' || status === 'suspended';
    return true;
  });

  const activeCount = enrolledCoursesList.filter(c => (enrollments[c.id]?.status || 'active') === 'active').length;
  const completedCount = enrolledCoursesList.filter(c => enrollments[c.id]?.status === 'completed').length;
  const otherCount = enrolledCoursesList.filter(c => {
    const s = enrollments[c.id]?.status;
    return s === 'cancelled' || s === 'suspended';
  }).length;

  // Overall calculations
  const totalCompletedLessons = (Object.values(enrollments) as CourseEnrollment[]).reduce(
    (acc: number, curr: CourseEnrollment) => acc + (curr?.completedLessonIds?.length || 0), 
    0
  );
  
  const avgProgress = enrolledCoursesList.length > 0
    ? Math.round(
        enrolledCoursesList.reduce((acc, c) => acc + (enrollments[c.id]?.progressPercent || 0), 0) / enrolledCoursesList.length
      )
    : 0;

  const handleResumeCourse = (courseId: string) => {
    const enrollment = enrollments[courseId];
    // If cancelled or suspended, reactivate first so student can continue
    if (enrollment?.status === 'cancelled' || enrollment?.status === 'suspended') {
      updateEnrollmentStatus(courseId, 'active', 'Reactivated by student');
    }

    const course = COURSES_DATA.find(c => c.id === courseId);
    const targetLessonId = enrollment?.lastAccessedLessonId || course?.modules[0]?.lessons[0]?.id || '';
    
    setSelectedCourseId(courseId);
    setSelectedLessonId(targetLessonId);
    setActiveView('lesson');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-in fade-in duration-200" id="my-courses-page">
      
      {/* 1. Header Section */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Student ID: {user.studentId}
                </span>
                <span className="text-xs text-slate-400">• {user.district}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {language === 'en' ? 'My Learning Journey' : 'আমার অধ্যয়ন ও কোর্সসমূহ'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                {language === 'en'
                  ? 'Track your active courses, continue where you left off, and review completed lessons.'
                  : 'আপনার নিবন্ধিত কোর্সসমূহের অগ্রগতি দেখুন এবং যেখানে থেমেছিলেন সেখান থেকে আবার শুরু করুন।'}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Button
                variant="outline"
                size="md"
                onClick={() => setActiveView('dashboard')}
              >
                {language === 'en' ? 'View Dashboard' : 'ড্যাশবোর্ড'}
              </Button>
              <Button
                variant="emerald"
                size="md"
                leftIcon={<Plus className="w-4 h-4" />}
                onClick={() => setActiveView('catalog')}
              >
                {language === 'en' ? 'Explore More Courses' : 'নতুন কোর্স খুঁজুন'}
              </Button>
            </div>

          </div>

          {/* Aggregate Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {language === 'en' ? 'Enrolled Courses' : 'নিবন্ধিত কোর্স'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-0.5 block">
                {enrolledCoursesList.length}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {language === 'en' ? 'Active Status' : 'চলমান অবস্থা'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-emerald-700 font-mono mt-0.5 block">
                {activeCount}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {language === 'en' ? 'Completed Status' : 'সম্পন্ন অবস্থা'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-blue-700 font-mono mt-0.5 block">
                {completedCount}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {language === 'en' ? 'Lessons Finished' : 'সম্পন্ন পাঠ'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-700 font-mono mt-0.5 block">
                {totalCompletedLessons}
              </span>
            </div>
          </div>

          {/* Conceptual Architecture Callout */}
          <div className="mt-6 p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-emerald-950">
                  {language === 'en' ? 'Phase 1 Independent Enrollment Architecture' : '১ম পর্যায়: স্বাধীন শিক্ষার্থী মডেল'}
                </span>
                <p className="text-emerald-800 text-[11px] mt-0.5">
                  {language === 'en' 
                    ? 'Learner (' + user.name + ') → Enrollment Entity (Self-directed) → Course. No institutional dependence.'
                    : 'শিক্ষার্থী (' + user.name + ') → এনরোলমেন্ট রেকর্ড → কোর্স। কোনো প্রতিষ্ঠানের ওপর নির্ভরশীলতা নেই।'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-800 bg-white/80 px-3 py-1.5 rounded-xl border border-emerald-200">
              <span>Student</span>
              <ChevronRight className="w-3 h-3 text-emerald-500" />
              <span className="text-emerald-900 font-black">Enrollment</span>
              <ChevronRight className="w-3 h-3 text-emerald-500" />
              <span>Course</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Course List Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <Tabs
            variant="pills"
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as any)}
            tabs={[
              { id: 'all', label: language === 'en' ? 'All Enrolled' : 'সকল কোর্স', count: enrolledCoursesList.length },
              { id: 'active', label: language === 'en' ? 'Active' : 'চলমান (Active)', count: activeCount },
              { id: 'completed', label: language === 'en' ? 'Completed' : 'সম্পন্ন (Completed)', count: completedCount },
              { id: 'other', label: language === 'en' ? 'Cancelled / Suspended' : 'বাতিল / স্থগিত', count: otherCount }
            ]}
          />

          <span className="text-xs text-slate-400">
            {filteredCourses.length} {language === 'en' ? 'courses displayed' : 'টি কোর্স দেখানো হচ্ছে'}
          </span>
        </div>

        {/* Course Cards Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCourses.map(course => {
              const enrollment = enrollments[course.id];
              const progress = enrollment?.progressPercent || 0;
              const status: EnrollmentStatus = enrollment?.status || (progress === 100 ? 'completed' : 'active');
              const isCompleted = status === 'completed';

              // Find the last accessed lesson title if any
              let lastLessonTitle = '';
              if (enrollment?.lastAccessedLessonId) {
                for (const mod of course.modules) {
                  const found = mod.lessons.find(l => l.id === enrollment.lastAccessedLessonId);
                  if (found) {
                    lastLessonTitle = language === 'en' ? found.titleEn : found.titleBn;
                    break;
                  }
                }
              }

              return (
                <div
                  key={course.id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Top Row: Status badge & ID */}
                    <div className="flex items-center justify-between gap-2">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${
                        status === 'completed'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : status === 'cancelled'
                          ? 'bg-slate-100 text-slate-600 border-slate-200'
                          : status === 'suspended'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          status === 'completed' ? 'bg-blue-600' :
                          status === 'cancelled' ? 'bg-slate-400' :
                          status === 'suspended' ? 'bg-amber-500' :
                          'bg-emerald-500 animate-pulse'
                        }`} />
                        {status.toUpperCase()}
                      </span>

                      <span className="text-[11px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                        {enrollment?.enrolledAt ? `Enrolled: ${enrollment.enrolledAt}` : 'Enrolled'}
                      </span>
                    </div>

                    {/* Title & Conceptual Chain */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        {language === 'en' ? course.titleEn : course.titleBn}
                      </h3>
                      <p className="text-xs text-slate-500 font-serif mt-0.5">
                        {language === 'en' ? course.titleBn : course.titleEn}
                      </p>

                      <div className="mt-2 text-[10px] font-mono text-slate-400 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 flex items-center justify-between">
                        <span>Ref ID:</span>
                        <span className="font-bold text-slate-700 truncate max-w-[200px]">
                          {enrollment?.id || `ENR-${user.studentId}-${course.id}`}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-1">
                      <ProgressBar
                        value={progress}
                        label={language === 'en' ? 'Course Progress' : 'কোর্স অগ্রগতি'}
                        showPercent
                        variant={isCompleted ? 'emerald' : 'blue'}
                      />
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>
                          {enrollment?.completedLessonIds?.length || 0} of {course.totalLessons} {language === 'en' ? 'lessons completed' : 'টি পাঠ সম্পন্ন'}
                        </span>
                        <span>{course.estimatedHours} {language === 'en' ? 'hours' : 'ঘণ্টা'}</span>
                      </div>
                    </div>

                    {/* Last accessed lesson banner */}
                    {lastLessonTitle && status === 'active' && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                        <Play className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 fill-emerald-600" />
                        <div className="text-xs">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                            {language === 'en' ? 'Current Lesson' : 'বর্তমান পাঠ'}:
                          </span>
                          <span className="font-bold text-slate-800 line-clamp-1">{lastLessonTitle}</span>
                        </div>
                      </div>
                    )}

                    {/* Status switcher for lifecycle testing */}
                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {language === 'en' ? 'Enrollment Status:' : 'এনরোলমেন্ট স্ট্যাটাস:'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium italic">
                          {enrollment?.statusReason || 'Independent self-enrollment'}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {(['active', 'completed', 'cancelled', 'suspended'] as const).map(st => (
                          <button
                            key={st}
                            onClick={() => updateEnrollmentStatus(course.id, st)}
                            className={`text-[10px] font-bold py-1 px-1 rounded transition-colors uppercase truncate ${
                              status === st
                                ? 'bg-slate-900 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                            title={`Change status to ${st}`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-6 border-t border-slate-100 flex items-center gap-3 mt-6">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewCourseDetails(course.id)}
                      className="flex-1"
                    >
                      {language === 'en' ? 'Syllabus' : 'সিলেবাস'}
                    </Button>

                    <Button
                      variant="emerald"
                      size="sm"
                      onClick={() => handleResumeCourse(course.id)}
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      className="flex-1"
                    >
                      {status === 'cancelled' || status === 'suspended'
                        ? (language === 'en' ? 'Reactivate' : 'পুনরায় চালু')
                        : isCompleted
                        ? (language === 'en' ? 'Review Lessons' : 'পুনরাবৃত্তি করুন')
                        : (language === 'en' ? 'Continue Learning' : 'চালিয়ে যান')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              {activeTab === 'completed'
                ? (language === 'en' ? 'No Completed Courses Yet' : 'এখনো কোনো সম্পন্ন কোর্স নেই')
                : (language === 'en' ? 'No Enrolled Courses Found' : 'কোনো নিবন্ধিত কোর্স পাওয়া যায়নি')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
              {language === 'en'
                ? 'Browse our flagship courses in Basic Computer Skills and SSC ICT to start building real, verified skills.'
                : 'আমাদের বেসিক কম্পিউটার ও এসএসসি আইসিটি কোর্সগুলোতে ভর্তি হয়ে শেখা শুরু করুন।'}
            </p>
            <Button
              variant="emerald"
              size="md"
              onClick={() => setActiveView('catalog')}
            >
              {language === 'en' ? 'Discover Courses' : 'নতুন কোর্স খুঁজুন'}
            </Button>
          </div>
        )}

      </div>

    </div>
  );
};
