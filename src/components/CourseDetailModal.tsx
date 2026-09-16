import React, { useState } from 'react';
import { Course } from '../types';
import { useStudent } from '../context/StudentContext';
import { 
  X, 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Award, 
  Play, 
  HelpCircle, 
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Keyboard,
  ArrowRight
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onStartLesson: (lessonId: string) => void;
}

export const CourseDetailModal: React.FC<CourseDetailModalProps> = ({
  course,
  onClose,
  onStartLesson
}) => {
  const { language, enrollments, enrollCourse } = useStudent();
  const [openModuleIndex, setOpenModuleIndex] = useState<number>(0);

  if (!course) return null;

  const enrollment = enrollments[course.id];
  const isEnrolled = !!enrollment;

  const handleEnrollAndStart = () => {
    if (!isEnrolled) {
      enrollCourse(course.id);
    }
    const firstLessonId = course.modules[0]?.lessons[0]?.id;
    if (firstLessonId) {
      onStartLesson(firstLessonId);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        id="course-detail-modal"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {course.badge}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-800 text-slate-300">
              {language === 'en' ? course.level : course.levelBn}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {language === 'en' ? course.titleEn : course.titleBn}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            {language === 'en' ? course.taglineEn : course.taglineBn}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-slate-300">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              {course.totalLessons} {language === 'en' ? 'Structured Lessons' : 'পাঠসমূহ'}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              {course.estimatedHours} {language === 'en' ? 'Estimated Hours' : 'ঘণ্টা পাঠদান'}
            </span>
            {course.hasTypingIntegration && (
              <span className="flex items-center gap-1.5 text-emerald-300">
                <Keyboard className="w-4 h-4" />
                {language === 'en' ? 'Built-in Typing Engine' : 'টাইপিং টুল সংযুক্ত'}
              </span>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Overview & Outcomes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {language === 'en' ? 'What You Will Learn' : 'এই কোর্স থেকে আপনি কী শিখবেন'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(language === 'en' ? course.learningOutcomesEn : course.learningOutcomesBn).map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Accordion */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {language === 'en' ? 'Syllabus & Lesson Modules' : 'পাঠ্যসূচি ও মডিউল'}
              </h4>
              <span className="text-xs text-slate-400">
                {course.modules.length} {language === 'en' ? 'Modules' : 'মডিউল'}
              </span>
            </div>

            <div className="space-y-2">
              {course.modules.map((mod, modIdx) => {
                const isOpen = openModuleIndex === modIdx;
                return (
                  <div key={mod.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setOpenModuleIndex(isOpen ? -1 : modIdx)}
                      className="w-full p-3.5 bg-slate-50/70 hover:bg-slate-100 flex items-center justify-between text-left transition-colors"
                    >
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">
                          {language === 'en' ? mod.titleEn : mod.titleBn}
                        </p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {mod.lessons.length} {language === 'en' ? 'Lessons' : 'টি পাঠ'}
                        </p>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                    </button>

                    {isOpen && (
                      <div className="p-3 divide-y divide-slate-100 space-y-1 bg-white">
                        {mod.lessons.map(lesson => {
                          const isDone = enrollment?.completedLessonIds.includes(lesson.id);
                          return (
                            <div key={lesson.id} className="pt-2 pb-2 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2.5">
                                {isDone ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
                                )}
                                <div>
                                  <p className="font-medium text-slate-800">
                                    {language === 'en' ? lesson.titleEn : lesson.titleBn}
                                  </p>
                                  <p className="text-[10px] text-slate-400">
                                    {lesson.estimatedMinutes} mins • {lesson.quiz ? `${lesson.quiz.length} MCQs` : 'Practice'}
                                  </p>
                                </div>
                              </div>

                              {isEnrolled && (
                                <button
                                  onClick={() => { onStartLesson(lesson.id); onClose(); }}
                                  className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 rounded text-[11px] font-semibold text-slate-700 transition-colors"
                                >
                                  {language === 'en' ? 'Open' : 'খুলুন'}
                                </button>
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
          </div>

          {/* Independent Enrollment Guarantee */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">
                {language === 'en' ? 'Open Student Access:' : 'উন্মুক্ত শিক্ষা সুবিধা:'}
              </span>{' '}
              {language === 'en'
                ? 'Anyone in Bangladesh can enroll freely. Later, you may also receive this course through your school or teacher without losing any of your existing notes or progress.'
                : 'বাংলাদেশের যেকোনো শিক্ষার্থী বিনামূল্যে এই কোর্সে যুক্ত হতে পারেন। ভবিষ্যতে কোনো শিক্ষক বা স্কুল এই কোর্স অ্যাসাইন করলেও পূর্বের অগ্রগতি অক্ষুণ্ণ থাকবে।'}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-bold block uppercase">Cost</span>
            <span className="text-sm font-extrabold text-emerald-600">
              {language === 'en' ? 'Free Self-Enrollment' : 'বিনামূল্যে ভর্তি'}
            </span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700"
            >
              {language === 'en' ? 'Close' : 'বন্ধ করুন'}
            </button>

            <button
              onClick={handleEnrollAndStart}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>
                {isEnrolled 
                  ? (language === 'en' ? 'Continue Course' : 'কোর্সে প্রবেশ করুন') 
                  : (language === 'en' ? 'Enroll & Start Learning' : 'ভর্তি হয়ে শুরু করুন')}
              </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
