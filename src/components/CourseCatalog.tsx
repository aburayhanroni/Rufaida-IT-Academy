import React, { useState } from 'react';
import { COURSES_DATA } from '../data/coursesData';
import { Course } from '../types';
import { useStudent } from '../context/StudentContext';
import { 
  Search, 
  BookOpen, 
  Clock, 
  Keyboard, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles,
  Filter,
  GraduationCap,
  Layers
} from 'lucide-react';
import { CourseCard } from './CourseCard';
import { CourseDetailModal } from './CourseDetailModal';

export const CourseCatalog: React.FC = () => {
  const { 
    language, 
    enrollments, 
    enrollCourse, 
    setActiveView, 
    setSelectedCourseId, 
    setSelectedLessonId, 
    viewCourseDetails 
  } = useStudent();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'basic_computer' | 'ssc_ict' | 'upcoming'>('all');
  const [selectedModalCourse, setSelectedModalCourse] = useState<Course | null>(null);

  const filteredCourses = COURSES_DATA.filter(course => {
    const matchesCategory = activeCategory === 'all' || course.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesTitle = 
      course.titleEn.toLowerCase().includes(query) ||
      course.titleBn.toLowerCase().includes(query) ||
      course.descriptionEn.toLowerCase().includes(query) ||
      course.descriptionBn.toLowerCase().includes(query);

    const matchesLessons = course.modules.some(mod =>
      mod.lessons.some(l => 
        l.titleEn.toLowerCase().includes(query) || 
        l.titleBn.toLowerCase().includes(query)
      )
    );

    return matchesCategory && (matchesTitle || matchesLessons);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-in fade-in duration-200" id="course-catalog-view">
      
      {/* Catalog Title & Search Header */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200/80 uppercase tracking-wider">
                {language === 'en' ? 'Phase 1 Standard Curriculum' : '১ম পর্যায়ের জাতীয় পাঠ্যক্রম'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-2">
              {language === 'en' ? 'Course Discovery & Learning Tracks' : 'সকল কোর্স ও শিক্ষাক্রম'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              {language === 'en'
                ? 'High-quality foundational courses designed for independent learners in Bangladesh. Enroll for free and own your learning record forever.'
                : 'বাংলাদেশের সকল শিক্ষার্থীদের জন্য উন্মুক্ত মানসম্পন্ন কোর্স। সম্পূর্ণ বিনামূল্যে ভর্তি হয়ে নিজের শেখার অগ্রগতি নিজেই সংরক্ষণ করুন।'}
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={language === 'en' ? 'Search courses, lessons, topics...' : 'কোর্স বা পাঠের নাম দিয়ে খুঁজুন...'}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-xs"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'all', labelEn: 'All Courses', labelBn: 'সকল কোর্স' },
            { id: 'basic_computer', labelEn: 'Basic Computer Skills', labelBn: 'বেসিক কম্পিউটার' },
            { id: 'ssc_ict', labelEn: 'NCTB SSC ICT (Class 9-10)', labelBn: 'এসএসসি আইসিটি (৯ম-১০ম)' },
            { id: 'upcoming', labelEn: 'Upcoming Tracks', labelBn: 'আসন্ন পাঠ্যক্রম' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {language === 'en' ? cat.labelEn : cat.labelBn}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onViewDetails={(courseId) => viewCourseDetails(courseId)}
          />
        ))}
      </div>

      {/* Empty State if filter yields no courses */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 max-w-md mx-auto p-8 space-y-4">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">
            {language === 'en' ? 'No matching courses found' : 'কোনো কোর্স খুঁজে পাওয়া যায়নি'}
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'en' ? 'Try searching for "Computer", "ICT", "Keyboard", or reset filters.' : 'অন্য শব্দ দিয়ে অনুসন্ধান করুন বা ফিল্টার পরিবর্তন করুন।'}
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
            className="text-xs font-bold text-emerald-700 hover:underline"
          >
            {language === 'en' ? 'Reset all filters' : 'ফিল্টার রিসেট করুন'}
          </button>
        </div>
      )}

      {/* Detail Modal support if needed */}
      {selectedModalCourse && (
        <CourseDetailModal
          course={selectedModalCourse}
          onClose={() => setSelectedModalCourse(null)}
          onStartLesson={(lessonId) => {
            setSelectedCourseId(selectedModalCourse.id);
            setSelectedLessonId(lessonId);
            setActiveView('lesson');
            setSelectedModalCourse(null);
          }}
        />
      )}

    </div>
  );
};
