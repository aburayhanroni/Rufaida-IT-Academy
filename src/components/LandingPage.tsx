import React from 'react';
import { useStudent } from '../context/StudentContext';
import { 
  Keyboard, 
  BookOpen, 
  GraduationCap, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  Laptop, 
  Users, 
  Layers,
  MapPin
} from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { Button, Badge } from './ui';
import { CourseCard } from './CourseCard';

export const LandingPage: React.FC = () => {
  const { 
    language, 
    setActiveView, 
    setSelectedCourseId, 
    setSelectedLessonId, 
    enrollCourse, 
    enrollments, 
    setShowOrgModal,
    viewCourseDetails 
  } = useStudent();

  const handleStartBeginnerBasic = () => {
    enrollCourse('basic-computer');
    setSelectedCourseId('basic-computer');
    setSelectedLessonId('bc-1');
    setActiveView('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-20 py-8 sm:py-14 animate-in fade-in duration-200" id="landing-page-root">
      
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-extrabold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{language === 'en' ? 'Rufaidah IT Academy • Digital Learning Bangladesh' : 'রুফাইদাহ্ আইটি একাডেমি • ডিজিটাল প্রযুক্তি শিক্ষা'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
            {language === 'en' ? (
              <>
                A Scalable Learning Ecosystem for{' '}
                <span className="text-emerald-600">Every Student</span> in Bangladesh
              </>
            ) : (
              <>
                বাংলাদেশের প্রতিটি শিক্ষার্থীর জন্য একটি{' '}
                <span className="text-emerald-600">উন্মুক্ত ও আধুনিক</span> শিখন প্ল্যাটফর্ম
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {language === 'en'
              ? 'Master foundational digital literacy, touch typing, and NCTB board curricula with your personal student identity — free, open, and independent of any single school or institution.'
              : 'প্রাথমিক কম্পিউটার শিক্ষা থেকে শুরু করে টাচ টাইপিং ও জাতীয় শিক্ষাক্রম (NCTB)। নিজের স্বতন্ত্র স্টুডেন্ট প্রোফাইল নিয়ে যেকোনো স্থান থেকে শিখুন সম্পূর্ণ স্বাধীনভাবে।'}
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Button
              variant="emerald"
              size="lg"
              onClick={() => setActiveView('catalog')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {language === 'en' ? 'Explore All Courses' : 'সকল কোর্স দেখুন'}
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setActiveView('dashboard')}
            >
              {language === 'en' ? 'Open Student Portal' : 'শিক্ষার্থী ড্যাশবোর্ড'}
            </Button>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => setActiveView('typing')}
              leftIcon={<Keyboard className="w-4 h-4 text-emerald-600" />}
            >
              {language === 'en' ? 'Touch Typing Master' : 'টাইপিং প্র্যাকটিস'}
            </Button>
          </div>

          {/* Quick Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {language === 'en' ? '100% Free Tuition' : 'সম্পূর্ণ বিনামূল্যে'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {language === 'en' ? 'Independent Student ID' : 'ব্যক্তিগত শিক্ষার্থী আইডি'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              {language === 'en' ? 'NCTB Curriculum Aligned' : 'এনসিটিবি পাঠ্যক্রম অনুমোদিত'}
            </span>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 max-w-4xl mx-auto p-4 sm:p-5 bg-white border border-slate-200/90 rounded-3xl shadow-xs text-center">
          <div className="p-3">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'en' ? 'Curriculums' : 'পাঠ্যক্রম'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-slate-900 font-mono mt-0.5 block">2 Ready</span>
          </div>
          <div className="p-3 border-l border-slate-100">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'en' ? 'Interactive Lessons' : 'ইন্টারেক্টিভ পাঠ'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono mt-0.5 block">28+ Lessons</span>
          </div>
          <div className="p-3 border-l border-slate-100">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'en' ? 'Districts Reached' : 'জেলা কভারেজ'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-blue-600 font-mono mt-0.5 block">64 Districts</span>
          </div>
          <div className="p-3 border-l border-slate-100">
            <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider block">
              {language === 'en' ? 'Access' : 'প্রবেশাধিকার'}
            </span>
            <span className="text-xl sm:text-2xl font-black text-amber-600 font-mono mt-0.5 block">Open & Free</span>
          </div>
        </div>

        {/* Beginner 3-Step Guided Pathway */}
        <div className="mt-8 max-w-4xl mx-auto p-5 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/80 rounded-3xl shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2.5 py-0.5 rounded-full inline-block">
                {language === 'en' ? 'Complete Beginner Path' : 'নতুন শিক্ষার্থীদের সহজ শুরু'}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900">
                {language === 'en' ? 'First Time on a Computer? Start in 3 Easy Steps' : 'কম্পিউটারে প্রথমবার? এই ৩টি ধাপে শুরু করুন'}
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              {language === 'en' ? 'Zero technical knowledge required' : 'পূর্ব অভিজ্ঞতার প্রয়োজন নেই'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">1</span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-2">
                  {language === 'en' ? 'What is a Computer?' : 'কম্পিউটার কী?'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'en' ? 'Learn basic components, screen, mouse, and power.' : 'মনিটর, মাউস, কীবোর্ড ও সিপিইউ পরিচিতি।'}
                </p>
              </div>
              <button
                onClick={handleStartBeginnerBasic}
                className="mt-2 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>{language === 'en' ? 'Start Lesson 1' : '১ম পাঠ শুরু করুন'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">2</span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-2">
                  {language === 'en' ? 'Practice Touch Typing' : 'টাচ টাইপিং শিখুন'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'en' ? 'Place fingers on the home row keys (ASDF JKL;).' : 'কীবোর্ডে সঠিক আঙুল বসিয়ে দ্রুত টাইপ করুন।'}
                </p>
              </div>
              <button
                onClick={() => setActiveView('typing')}
                className="mt-2 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>{language === 'en' ? 'Open Typing Master' : 'টাইপিং শুরু করুন'}</span>
                <Keyboard className="w-3 h-3 text-emerald-400" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-emerald-100 shadow-2xs space-y-2 flex flex-col justify-between">
              <div>
                <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center">3</span>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-2">
                  {language === 'en' ? 'Track Your Progress' : 'অগ্রগতি পর্যবেক্ষণ'}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'en' ? 'Review daily streak, quiz results, and lesson notes.' : 'কুইজের স্কোর ও ব্যক্তিগত পড়ার নোট দেখুন।'}
                </p>
              </div>
              <button
                onClick={() => setActiveView('dashboard')}
                className="mt-2 w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <span>{language === 'en' ? 'View Dashboard' : 'ড্যাশবোর্ড দেখুন'}</span>
                <ArrowRight className="w-3 h-3 text-emerald-700" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Architecture Guarantees (Independent-First Model) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'en' ? 'Core Architecture Principle' : 'মৌলিক স্থাপত্য দর্শন'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === 'en'
                ? 'One Account. One Personal Learning Identity.'
                : 'একটি অ্যাকাউন্ট। একটি স্থায়ী লার্নিং আইডেন্টিটি।'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'A student does not start from zero every time they change classes, coaching centers, or schools. Your typing records, lesson notes, and test certificates belong to YOU forever.'
                : 'প্রতিটি স্কুলের জন্য আলাদা অ্যাকাউন্ট নয়। একজন শিক্ষার্থী স্বাধীনভাবে শিখবে, পরবর্তীতে স্কুল বা কোচিং সেন্টার চাইলেই তার ব্যক্তিগত প্রগ্রেসের সাথে সংযোগ স্থাপন করতে পারবে।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-800">
            <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
              <GraduationCap className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-sm text-white">
                {language === 'en' ? 'Independent Learners' : 'স্বাধীন শিক্ষার্থী'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'en' ? 'Learn at your own pace anywhere in Bangladesh without requiring school admission.' : 'কোনো প্রাতিষ্ঠানিক বাধ্যবাধকতা ছাড়াই যেকোনো জেলা থেকে নিজে নিজে শেখা।'}
              </p>
            </div>

            <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
              <Building2 className="w-6 h-6 text-teal-400" />
              <h4 className="font-bold text-sm text-white">
                {language === 'en' ? 'Schools & Colleges' : 'স্কুল ও কলেজ সংযোগ'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'en' ? 'Link your student ID to your school lab or class without losing existing progress.' : 'শিক্ষক বা প্রতিষ্ঠান প্রদত্ত কোড দিয়ে ক্লাসে যুক্ত হয়ে অ্যাসাইনমেন্ট জমা দেওয়া।'}
              </p>
            </div>

            <div className="p-5 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
              <Laptop className="w-6 h-6 text-blue-400" />
              <h4 className="font-bold text-sm text-white">
                {language === 'en' ? 'NCTB & Digital Skills' : 'বাস্তব আইসিটি দক্ষতা'}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {language === 'en' ? 'Not just theory — interactive simulators for Windows, files, Word, and Excel.' : 'শুধু মুখস্থ নয় — ইন্টারঅ্যাকটিভ সিমুলেটর ও টাইপিং মাস্টারি।'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The 5-Step Learning Loop */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            {language === 'en' ? 'Pedagogical Model' : 'শিক্ষণ পদ্ধতি'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {language === 'en' ? 'The Guided 5-Step Learning Loop' : '৫-ধাপের পরিপূর্ণ শিখন প্রক্রিয়া'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {language === 'en' ? 'We reject passive video-watching. Every lesson forces active retention and tactile practice.' : 'শুধু নিষ্ক্রিয় ভিডিও নয়, প্রতিটি পাঠে রয়েছে সক্রিয় অংশগ্রহণ ও অনুশীলন।'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5">
          {[
            { step: '1', title: 'LEARN', descEn: 'Bilingual bite-sized concept sections with visual diagrams', descBn: 'চিত্রসহ সহজ ভাষায় ব্যাখ্যাকৃত ধারণা' },
            { step: '2', title: 'PRACTICE', descEn: 'Interactive in-browser tools & "Try It Now" challenges', descBn: 'ব্রাউজারেই বাস্তব অনুশীলন ও ল্যাব' },
            { step: '3', title: 'TEST', descEn: 'Immediate MCQ quizzes with detailed explanations', descBn: 'ব্যাখ্যামূলক কুইজ ও জ্ঞান যাচাই' },
            { step: '4', title: 'REVIEW', descEn: 'Revision summaries, personal notes, & error correction', descBn: 'ভুল সংশোধন ও রিভিশন শিট' },
            { step: '5', title: 'PROGRESS', descEn: 'Streak counters, speed metrics, & verified records', descBn: 'ধারাবাহিকতা ও প্রোফাইল স্কোর' }
          ].map(item => (
            <div key={item.step} className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs space-y-2 relative">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-mono font-extrabold text-xs">
                {item.step}
              </span>
              <h4 className="font-extrabold text-slate-900 text-sm tracking-wide">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'en' ? item.descEn : item.descBn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Featured Courses Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {language === 'en' ? 'Phase 1 Curriculums' : '১ম পর্যায়ের পাঠ্যক্রম'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              {language === 'en' ? 'Featured Foundational Courses' : 'প্রধান কোর্সসমূহ'}
            </h2>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveView('catalog')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            {language === 'en' ? 'View All Courses' : 'সব কোর্স দেখুন'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {COURSES_DATA.slice(0, 2).map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onViewDetails={(courseId) => viewCourseDetails(courseId)}
            />
          ))}
        </div>
      </section>

      {/* 5. First-Class Typing Tool Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-3xl p-8 sm:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold">
              <Keyboard className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Built-in Typing Master V1' : 'বিল্ট-ইন টাচ টাইপিং মাস্টার'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === 'en' ? 'Master Touch Typing Before You Code' : 'কীবোর্ড না দেখে টাইপ করার দক্ষতা অর্জন করুন'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              {language === 'en'
                ? 'Learn proper finger placement with our tactile virtual keyboard, real-time WPM calculation, accuracy tracking, and sound feedback. Designed for beginners in Bangladesh.'
                : 'হোম রো থেকে শুরু করে পুরো প্যারাগ্রাফ টাইপিং। রিয়েল-টাইম স্পিড (WPM), এক্যুরেসি ও অডিও ফিডব্যাক সহ নিয়মিত প্র্যাকটিস করুন।'}
            </p>
          </div>

          <Button
            variant="secondary"
            size="lg"
            onClick={() => setActiveView('typing')}
            leftIcon={<Keyboard className="w-4 h-4 text-emerald-700" />}
            className="bg-white text-emerald-900 hover:bg-emerald-50 shrink-0"
          >
            {language === 'en' ? 'Launch Typing Tool' : 'টাইপিং মাস্টার চালু করুন'}
          </Button>
        </div>
      </section>

      {/* 6. Institutional Readiness Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 bg-white border border-slate-200/90 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-base">
                {language === 'en' ? 'Are you an ICT Teacher, School Head, or Coaching Director?' : 'আপনি কি কোনো স্কুল, কলেজ বা কোচিং সেন্টারের শিক্ষক?'}
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'en'
                  ? 'Explore how Phase 2 enables class assignments and student monitoring without duplicating student accounts.'
                  : 'পরবর্তী ধাপে কীভাবে ব্যক্তিগত আইডি বজায় রেখে স্কুল বা কোচিং ক্লাসে যুক্ত হওয়া যাবে তা দেখুন।'}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={() => setShowOrgModal(true)}
            className="shrink-0"
          >
            {language === 'en' ? 'Preview Organization Blueprint' : 'ব্লুপ্রিন্ট দেখুন'}
          </Button>
        </div>
      </section>

    </div>
  );
};
