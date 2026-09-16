import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Course } from '../types';
import { Button, Badge } from './ui';
import { 
  X, 
  ShieldCheck, 
  BookOpen, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Award,
  Calendar,
  UserCheck,
  Check
} from 'lucide-react';

interface EnrollmentConfirmModalProps {
  course: Course | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (courseId: string) => void;
}

export const EnrollmentConfirmModal: React.FC<EnrollmentConfirmModalProps> = ({
  course,
  isOpen,
  onClose,
  onSuccess
}) => {
  const { 
    language, 
    user, 
    enrollments, 
    enrollCourse, 
    setSelectedCourseId, 
    setSelectedLessonId, 
    setActiveView 
  } = useStudent();

  const [confirmed, setConfirmed] = useState(false);
  const [createdEnrollmentId, setCreatedEnrollmentId] = useState('');

  if (!isOpen || !course) return null;

  const existingEnrollment = enrollments[course.id];
  const isAlreadyEnrolled = !!existingEnrollment;

  const handleConfirmEnrollment = () => {
    const newEnrollment = enrollCourse(course.id);
    setCreatedEnrollmentId(newEnrollment?.id || `ENR-${user.studentId}-${course.id}`);
    setConfirmed(true);
    if (onSuccess) {
      onSuccess(course.id);
    }
  };

  const handleStartFirstLesson = () => {
    const targetLessonId = existingEnrollment?.lastAccessedLessonId || course.modules[0]?.lessons[0]?.id || '';
    setSelectedCourseId(course.id);
    setSelectedLessonId(targetLessonId);
    setActiveView('lesson');
    handleClose();
  };

  const handleGoToMyCourses = () => {
    setActiveView('my_courses');
    handleClose();
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200"
      id="enrollment-confirmation-dialog"
    >
      <div 
        className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">
                {confirmed 
                  ? (language === 'en' ? 'Enrollment Confirmed!' : 'ভর্তি সফল হয়েছে!')
                  : (language === 'en' ? 'Confirm Course Enrollment' : 'কোর্স ভর্তি নিশ্চিতকরণ')}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {language === 'en' ? 'Independent Student Learning Record' : 'স্বাধীন শিক্ষার্থীর ব্যক্তিগত রেকর্ড'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-xl hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {!confirmed ? (
            <>
              {/* If already enrolled banner */}
              {isAlreadyEnrolled && (
                <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3 text-xs text-blue-900">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">
                      {language === 'en' ? 'Already Enrolled in this Course' : 'আপনি ইতিমধ্যে এই কোর্সে নিবন্ধিত'}
                    </span>
                    <span className="text-blue-700">
                      {language === 'en' 
                        ? `Your current status is ${existingEnrollment.status.toUpperCase()} with ${existingEnrollment.progressPercent}% progress.`
                        : `আপনার বর্তমান স্ট্যাটাস: ${existingEnrollment.status} (অগ্রগতি: ${existingEnrollment.progressPercent}%)।`}
                    </span>
                  </div>
                </div>
              )}

              {/* 1. Student Identity (Independent Learner) */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {language === 'en' ? 'Learner Identity' : 'শিক্ষার্থী পরিচিতি'}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <UserCheck className="w-3 h-3" />
                    {language === 'en' ? 'Independent Learner' : 'স্বাধীন শিক্ষার্থী'}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h4 className="text-sm font-black text-slate-900">
                      {language === 'en' ? user.name : user.nameBn || user.name}
                    </h4>
                    <span className="text-xs text-slate-500 font-mono">
                      ID: {user.studentId} • {user.district}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block font-mono">
                      {language === 'en' ? 'Account Type' : 'অ্যাকাউন্ট ধরণ'}
                    </span>
                    <span className="text-xs font-semibold text-slate-700 capitalize">
                      {user.accountType}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Target Course Details */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Badge variant={course.badgeColor === 'emerald' ? 'emerald' : 'blue'} size="sm" hasDot>
                      {course.badge}
                    </Badge>
                    <h4 className="text-base font-black text-slate-900 mt-1.5 leading-snug">
                      {language === 'en' ? course.titleEn : course.titleBn}
                    </h4>
                    <p className="text-xs text-slate-500 font-serif mt-0.5">
                      {language === 'en' ? course.titleBn : course.titleEn}
                    </p>
                  </div>
                </div>

                {/* Course Quick Stats */}
                <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50/80 rounded-xl border border-slate-100 text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">
                      {language === 'en' ? 'Modules' : 'মডিউল'}
                    </span>
                    <span className="font-extrabold text-slate-800">
                      {course.modulesCount}
                    </span>
                  </div>
                  <div className="border-x border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-bold">
                      {language === 'en' ? 'Lessons' : 'পাঠ'}
                    </span>
                    <span className="font-extrabold text-slate-800">
                      {course.totalLessons}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-bold">
                      {language === 'en' ? 'Duration' : 'সময়'}
                    </span>
                    <span className="font-extrabold text-slate-800">
                      ~{course.estimatedHours}h
                    </span>
                  </div>
                </div>
              </div>

              {/* 3. Enrollment Terms & Independence Assurance */}
              <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100/90 space-y-2 text-xs text-emerald-950">
                <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{language === 'en' ? 'Instant Self-Enrollment Guarantee' : 'তাত্ক্ষণিক উন্মুক্ত ভর্তি নিশ্চয়তা'}</span>
                </div>
                <ul className="space-y-1.5 text-emerald-800/90 pl-5 list-disc text-[11px] leading-relaxed">
                  <li>
                    {language === 'en' 
                      ? '100% Free: No fees, tuition, or hidden subscriptions.' 
                      : '১০০% ফ্রি: কোনো ফি বা লুকানো খরচ নেই।'}
                  </li>
                  <li>
                    {language === 'en'
                      ? 'Independent Record: All lesson progress, typing stats, and quiz scores belong strictly to your Student ID.'
                      : 'ব্যক্তিগত রেকর্ড: আপনার সকল অগ্রগতি ও কুইজ স্কোর ব্যক্তিগত স্টুডেন্ট আইডিতে যুক্ত হবে।'}
                  </li>
                  <li>
                    {language === 'en'
                      ? 'No Institution Required: School or coaching affiliation is completely optional.'
                      : 'কোনো শিক্ষাপ্রতিষ্ঠানের অনুমোদন ছাড়াই পড়া শুরু করা যায়।'}
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleClose}
                  className="flex-1"
                >
                  {language === 'en' ? 'Cancel' : 'বাতিল'}
                </Button>

                <Button
                  variant="emerald"
                  size="md"
                  onClick={isAlreadyEnrolled ? handleStartFirstLesson : handleConfirmEnrollment}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="flex-1"
                >
                  {isAlreadyEnrolled
                    ? (language === 'en' ? 'Continue Course' : 'পড়াশোনা শুরু করুন')
                    : (language === 'en' ? 'Confirm Free Enrollment' : 'ভর্তি সম্পন্ন করুন')}
                </Button>
              </div>
            </>
          ) : (
            /* 4. Success State */
            <div className="py-4 space-y-5 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto animate-in zoom-in-50 duration-300">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">
                  {language === 'en' ? 'Enrollment Confirmed!' : 'কোর্সে ভর্তি নিশ্চিত হয়েছে!'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'en'
                    ? 'Your active learning record has been registered to your Student ID.'
                    : 'আপনার নতুন অধ্যয়ন রেকর্ড সফলভাবে সক্রিয় করা হয়েছে।'}
                </p>
              </div>

              {/* Enrollment Receipt Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                  <span className="text-slate-400 font-mono text-[11px]">
                    {language === 'en' ? 'Enrollment Ref ID:' : 'ভর্তি রেফারেন্স:'}
                  </span>
                  <span className="font-mono font-bold text-slate-800 text-[11px]">
                    {createdEnrollmentId}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'en' ? 'Course:' : 'কোর্স:'}</span>
                  <span className="font-bold text-slate-800">
                    {language === 'en' ? course.titleEn : course.titleBn}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'en' ? 'Status:' : 'স্ট্যাটাস:'}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                    ACTIVE
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500">{language === 'en' ? 'Student ID:' : 'শিক্ষার্থী আইডি:'}</span>
                  <span className="font-mono text-slate-700">{user.studentId}</span>
                </div>
              </div>

              {/* Next Steps Buttons */}
              <div className="space-y-2 pt-2">
                <Button
                  variant="emerald"
                  size="lg"
                  onClick={handleStartFirstLesson}
                  leftIcon={<Play className="w-4 h-4 fill-white" />}
                  className="w-full"
                >
                  {language === 'en' ? 'Start Learning Lesson 1' : '১ম পাঠ শুরু করুন'}
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={handleGoToMyCourses}
                  className="w-full"
                >
                  {language === 'en' ? 'View in My Courses' : 'আমার কোর্সে দেখুন'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
