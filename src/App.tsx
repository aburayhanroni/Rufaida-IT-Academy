import React from 'react';
import { StudentProvider, useStudent } from './context/StudentContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetailsPage } from './components/CourseDetailsPage';
import { MyCoursesPage } from './components/MyCoursesPage';
import { LessonPlayer } from './components/LessonPlayer';
import { TypingTool } from './components/TypingTool';
import { StudentLogin } from './components/StudentLogin';
import { StudentRegister } from './components/StudentRegister';
import { StudentAuthModal } from './components/StudentAuthModal';
import { FutureOrgModal } from './components/FutureOrgModal';
import { EnrollmentConfirmModal } from './components/EnrollmentConfirmModal';
import { ContentSearchModal } from './components/ContentSearchModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { GraduationCap, ShieldCheck, Heart, Globe2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    activeView, 
    language, 
    showEnrollmentModal, 
    courseToEnroll, 
    closeEnrollmentModal 
  } = useStudent();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Offline Status & Reconnection Alerts */}
      <OfflineIndicator />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Routed Content View */}
      <main className="flex-1" id="main-content-region">
        {activeView === 'landing' && <LandingPage />}
        {activeView === 'dashboard' && <Dashboard />}
        {activeView === 'catalog' && <CourseCatalog />}
        {activeView === 'course_details' && <CourseDetailsPage />}
        {activeView === 'my_courses' && <MyCoursesPage />}
        {activeView === 'lesson' && <LessonPlayer />}
        {activeView === 'typing' && <TypingTool />}
        {activeView === 'login' && <StudentLogin />}
        {activeView === 'register' && <StudentRegister />}
      </main>

      {/* Global Modals */}
      <StudentAuthModal />
      <FutureOrgModal />
      <ContentSearchModal />
      <EnrollmentConfirmModal
        course={courseToEnroll}
        isOpen={showEnrollmentModal}
        onClose={closeEnrollmentModal}
      />

      {/* Footer (hidden when actively in lesson view to maximize study screen space) */}
      {activeView !== 'lesson' && (
        <footer className="bg-white border-t border-slate-200 mt-16 py-10 text-slate-500 text-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">
                  {language === 'en' ? 'Rufaidah IT Academy' : 'রুফাইদাহ্ আইটি একাডেমি'}
                </p>
                <p className="text-[11px] text-slate-400">
                  {language === 'en' 
                    ? 'Empowering students and future IT professionals with digital skills' 
                    : 'ডিজিটাল দক্ষতা ও তথ্যপ্রযুক্তি শিক্ষায় শিক্ষার্থীদের নির্ভরযোগ্য মাধ্যম'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {language === 'en' ? 'Independent-First Architecture' : 'স্বাধীন শিক্ষার্থী মডেল'}
              </span>
              <span>•</span>
              <span>{language === 'en' ? 'NCTB Aligned Curriculum' : 'জাতীয় শিক্ষাক্রম অনুসরণে'}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-blue-500" />
                Bilingual (English & বাংলা)
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Phase 1 Platform Foundation • 2026
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StudentProvider>
      <AppContent />
    </StudentProvider>
  );
}
