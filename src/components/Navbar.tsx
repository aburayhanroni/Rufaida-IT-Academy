import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { 
  BookOpen, 
  Keyboard, 
  LayoutDashboard, 
  Globe2, 
  Wifi, 
  WifiOff, 
  User, 
  Building2, 
  Menu, 
  X,
  Search,
  CheckCircle2,
  Sparkles,
  GraduationCap,
  LogOut,
  ChevronRight,
  Plus
} from 'lucide-react';
import { Button } from './ui';
import { PWAInstallButton } from './PWAInstallButton';

export const Navbar: React.FC = () => {
  const { 
    user, 
    language, 
    setLanguage, 
    isOfflineMode, 
    toggleOfflineMode,
    activeView,
    setActiveView,
    setShowOrgModal,
    setShowAuthModal,
    enrollments,
    isAuthenticated,
    logoutStudent,
    setIsSearchOpen
  } = useStudent();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const enrolledCount = Object.keys(enrollments).length;

  const navigateTo = (view: any) => {
    setActiveView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-2.5 text-left group"
              id="brand-logo-btn"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-lg text-slate-900 tracking-tight">
                    {language === 'en' ? (
                      <>Rufaidah <span className="text-emerald-600 font-bold">IT Academy</span></>
                    ) : (
                      <>রুফাইদাহ্ <span className="text-emerald-600 font-bold">আইটি একাডেমি</span></>
                    )}
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200/70 rounded-full">
                    IT Academy
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden md:block">
                  {language === 'en' ? 'Empowering Digital Learning in Bangladesh' : 'ডিজিটাল স্কিল ও প্রযুক্তি শিক্ষা প্ল্যাটফর্ম'}
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            <button
              onClick={() => navigateTo('landing')}
              id="nav-home-btn"
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeView === 'landing'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {language === 'en' ? 'Home' : 'হোম'}
            </button>
            
            <button
              onClick={() => navigateTo('catalog')}
              id="nav-courses-btn"
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeView === 'catalog' || activeView === 'course_details'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              {language === 'en' ? 'Courses' : 'কোর্সসমূহ'}
            </button>

            <button
              onClick={() => navigateTo('my_courses')}
              id="nav-my-courses-btn"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeView === 'my_courses'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>{language === 'en' ? 'My Courses' : 'আমার কোর্স'}</span>
              {enrolledCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 font-mono rounded-full font-bold">
                  {enrolledCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigateTo('dashboard')}
              id="nav-dashboard-btn"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeView === 'dashboard'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-blue-600" />
              <span>{language === 'en' ? 'Dashboard' : 'ড্যাশবোর্ড'}</span>
            </button>

            <button
              onClick={() => navigateTo('typing')}
              id="nav-typing-btn"
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeView === 'typing'
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Keyboard className="w-4 h-4 text-amber-600" />
              <span>{language === 'en' ? 'Typing Master' : 'টাইপিং টুল'}</span>
            </button>
          </nav>

          {/* Right Controls: Search, Offline Simulator, Language Toggle, Student Identity / Auth */}
          <div className="hidden lg:flex items-center gap-2.5">
            
            {/* Quick Content Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              id="global-search-btn"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200/80"
              title="Search all course lessons, concepts, and quizzes (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>{language === 'en' ? 'Search...' : 'অনুসন্ধান...'}</span>
              <kbd className="px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-400 bg-white border border-slate-200 rounded">
                ⌘K
              </kbd>
            </button>

            {/* PWA Install Button */}
            <PWAInstallButton />

            {/* PWA / Offline Concept Simulator */}
            <button
              onClick={toggleOfflineMode}
              id="offline-toggle-btn"
              title={isOfflineMode ? "Simulating Offline Mode (Cached in browser)" : "Online / Connected to Cloud Sync"}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                isOfflineMode 
                  ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs' 
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isOfflineMode ? (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'en' ? 'Offline Ready' : 'অফলাইন মোড'}</span>
                </>
              ) : (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{language === 'en' ? 'Online' : 'অনলাইন'}</span>
                </>
              )}
            </button>

            {/* Bilingual Toggle */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              id="lang-toggle-btn"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Switch language between English and বাংলা"
            >
              <Globe2 className="w-3.5 h-3.5 text-slate-500" />
              <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
            </button>

            {/* Student Auth: Logged In Pill or Login/Register buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowAuthModal(true)}
                  id="student-identity-btn"
                  className="flex items-center gap-2 pl-2.5 pr-3.5 py-1.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs"
                >
                  <div className="w-6 h-6 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xs font-black">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold leading-tight line-clamp-1">{user.name}</p>
                    <p className="text-[10px] text-emerald-400 font-mono leading-none">{user.studentId}</p>
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateTo('login')}
                >
                  {language === 'en' ? 'Sign In' : 'লগইন'}
                </Button>
                <Button
                  variant="emerald"
                  size="sm"
                  onClick={() => navigateTo('register')}
                >
                  {language === 'en' ? 'Register Free' : 'নিবন্ধন'}
                </Button>
              </div>
            )}

          </div>

          {/* Mobile menu trigger button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="px-2.5 py-1 text-xs font-bold bg-slate-100 rounded-lg text-slate-700"
            >
              {language === 'en' ? 'বাংলা' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Offline Mode Banner Notice when Active */}
      {isOfflineMode && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 text-center text-xs text-amber-800 flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>
            {language === 'en'
              ? 'Offline Concept Mode active. Course lessons, notes, and the typing tool work without an active internet connection.'
              : 'অফলাইন মোড সক্রিয়। ইন্টারনেট সংযোগ ছাড়াই সকল পাঠ, নোট এবং টাইপিং টুল ব্যবহার করা যাবে।'}
          </span>
        </div>
      )}

      {/* Mobile Navigation Drawer / Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          
          {/* Mobile Student Profile / Login Header */}
          {isAuthenticated ? (
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900">{user.name}</p>
                  <p className="text-[11px] text-emerald-700 font-mono">{user.studentId} • {user.district}</p>
                </div>
              </div>
              <button
                onClick={() => { setShowAuthModal(true); setMobileMenuOpen(false); }}
                className="text-xs font-bold text-slate-500 hover:text-slate-900"
              >
                {language === 'en' ? 'Edit' : 'পরিবর্তন'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateTo('login')}
              >
                {language === 'en' ? 'Sign In' : 'লগইন'}
              </Button>
              <Button
                variant="emerald"
                size="sm"
                onClick={() => navigateTo('register')}
              >
                {language === 'en' ? 'Register Free' : 'নিবন্ধন'}
              </Button>
            </div>
          )}

          {/* Mobile Search Button */}
          <div className="pb-2 space-y-2">
            <PWAInstallButton variant="banner" />
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400" />
                <span>{language === 'en' ? 'Search courses, concepts, quizzes...' : 'কোর্স বা কুইজ খুঁজুন...'}</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-white rounded border border-slate-200">
                Search
              </span>
            </button>
          </div>

          {/* Nav Links */}
          <div className="space-y-1">
            <button
              onClick={() => navigateTo('landing')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between ${
                activeView === 'landing' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{language === 'en' ? 'Home' : 'হোম'}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('catalog')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between ${
                activeView === 'catalog' || activeView === 'course_details' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{language === 'en' ? 'Explore Courses' : 'সকল কোর্সসমূহ'}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('my_courses')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between ${
                activeView === 'my_courses' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>{language === 'en' ? 'My Courses' : 'আমার কোর্স'}</span>
                {enrolledCount > 0 && (
                  <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 font-mono rounded-full font-bold">
                    {enrolledCount}
                  </span>
                )}
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('dashboard')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between ${
                activeView === 'dashboard' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{language === 'en' ? 'Student Dashboard' : 'শিক্ষার্থী ড্যাশবোর্ড'}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={() => navigateTo('typing')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-between ${
                activeView === 'typing' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{language === 'en' ? 'Touch Typing Master' : 'টাচ টাইপিং অনুশীলন'}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Bottom offline and school connect */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
            <button
              onClick={toggleOfflineMode}
              className="flex items-center gap-1.5 text-slate-600 font-medium"
            >
              {isOfflineMode ? <WifiOff className="w-4 h-4 text-amber-600" /> : <Wifi className="w-4 h-4 text-emerald-600" />}
              <span>{isOfflineMode ? 'Offline Simulated' : 'Online Sync'}</span>
            </button>

            <button
              onClick={() => { setShowOrgModal(true); setMobileMenuOpen(false); }}
              className="text-emerald-700 font-bold"
            >
              {language === 'en' ? 'School/Org Connect' : 'প্রতিষ্ঠান যুক্ত করুন'}
            </button>
          </div>

        </div>
      )}

    </header>
  );
};
