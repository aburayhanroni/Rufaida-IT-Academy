import React from 'react';
import { Course } from '../types';
import { useStudent } from '../context/StudentContext';
import { Badge, Button, ProgressBar } from './ui';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Keyboard, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface CourseCardProps {
  course: Course;
  onViewDetails?: (courseId: string) => void;
  onStartCourse?: (courseId: string) => void;
  className?: string;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  onViewDetails,
  onStartCourse,
  className = ''
}) => {
  const { 
    language, 
    enrollments, 
    viewCourseDetails, 
    openEnrollmentModal, 
    setSelectedLessonId, 
    setActiveView, 
    setSelectedCourseId 
  } = useStudent();
  const enrollment = enrollments[course.id];
  const isEnrolled = !!enrollment;

  const handleDetailsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(course.id);
    } else {
      viewCourseDetails(course.id);
    }
  };

  const handleStartOrResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isEnrolled) {
      openEnrollmentModal(course);
      return;
    }
    setSelectedCourseId(course.id);

    // Pick last accessed lesson or first lesson
    const targetLessonId = enrollment?.lastAccessedLessonId || course.modules[0]?.lessons[0]?.id || '';
    setSelectedLessonId(targetLessonId);
    setActiveView('lesson');
  };

  const badgeVariant = course.badgeColor === 'emerald' ? 'emerald' : course.badgeColor === 'blue' ? 'blue' : 'slate';

  return (
    <div 
      onClick={handleDetailsClick}
      className={`group bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-xl hover:border-emerald-200/80 transition-all duration-300 flex flex-col justify-between cursor-pointer relative overflow-hidden ${className}`}
    >
      {/* Top Accent line on hover */}
      <div className="absolute top-0 inset-x-0 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-teal-500 transition-all" />

      {/* Top Metadata */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Badge variant={badgeVariant as any} size="sm" hasDot>
            {course.badge}
          </Badge>
          <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
            {language === 'en' ? course.level : course.levelBn}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors tracking-tight line-clamp-2">
            {language === 'en' ? course.titleEn : course.titleBn}
          </h3>
          <p className="text-xs text-slate-400 font-serif mt-0.5 line-clamp-1">
            {language === 'en' ? course.titleBn : course.titleEn}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
          {language === 'en' ? course.descriptionEn : course.descriptionBn}
        </p>

        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-center">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'en' ? 'Modules' : 'মডিউল'}
            </span>
            <span className="font-extrabold text-xs sm:text-sm text-slate-800 font-mono">
              {course.modulesCount}
            </span>
          </div>
          <div className="border-x border-slate-200/60">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'en' ? 'Lessons' : 'পাঠ'}
            </span>
            <span className="font-extrabold text-xs sm:text-sm text-slate-800 font-mono">
              {course.totalLessons}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'en' ? 'Duration' : 'সময়'}
            </span>
            <span className="font-extrabold text-xs sm:text-sm text-slate-800 font-mono">
              ~{course.estimatedHours}h
            </span>
          </div>
        </div>

        {/* Key Learning Highlights */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            {language === 'en' ? 'Key Learning Outcomes:' : 'শিক্ষণীয় বিষয়সমূহ:'}
          </span>
          <div className="space-y-1">
            {(language === 'en' ? course.learningOutcomesEn : course.learningOutcomesBn).slice(0, 3).map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Enrollment Progress if Enrolled */}
        {isEnrolled && (
          <div className="pt-2">
            <ProgressBar
              value={enrollment.progressPercent}
              label={language === 'en' ? 'Your Progress' : 'আপনার অগ্রগতি'}
              showPercent
              size="sm"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              {enrollment.completedLessonIds.length} of {course.totalLessons} {language === 'en' ? 'lessons completed' : 'টি পাঠ সম্পন্ন'}
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-6 border-t border-slate-100 flex items-center gap-2.5 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDetailsClick}
          className="flex-1"
        >
          {language === 'en' ? 'View Syllabus' : 'সিলেবাস দেখুন'}
        </Button>

        <Button
          variant="emerald"
          size="sm"
          onClick={handleStartOrResume}
          rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          className="flex-1"
        >
          {isEnrolled
            ? (language === 'en' ? 'Continue' : 'চালিয়ে যান')
            : (language === 'en' ? 'Start Free' : 'শুরু করুন')}
        </Button>
      </div>
    </div>
  );
};
