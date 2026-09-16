import React, { useEffect, useRef } from 'react';
import { useStudent } from '../context/StudentContext';
import { 
  Search, 
  X, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  Keyboard, 
  ArrowRight,
  ExternalLink,
  Flame
} from 'lucide-react';

export const ContentSearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    navigateToContentMatch,
    language
  } = useStudent();

  const inputRef = useRef<HTMLInputElement>(null);

  // Auto focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isSearchOpen]);

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const getBadgeForType = (type: string) => {
    switch (type) {
      case 'concept':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <Sparkles className="w-3 h-3 text-amber-600" />
            Concept Callout
          </span>
        );
      case 'quiz':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
            <HelpCircle className="w-3 h-3 text-purple-600" />
            Quiz & Assessment
          </span>
        );
      case 'practice':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Keyboard className="w-3 h-3 text-emerald-600" />
            Practical Lab
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
            <BookOpen className="w-3 h-3 text-blue-600" />
            Lesson
          </span>
        );
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsSearchOpen(false);
      }}
      id="content-search-overlay"
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Header Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'en'
                ? "Search lessons, concepts, hardware, formulas, quizzes..."
                : "পাঠ, কনসেপ্ট, হার্ডওয়্যার, ফর্মুলা বা কুইজ খুঁজুন..."
            }
            className="flex-1 bg-transparent border-none text-slate-900 text-sm sm:text-base font-semibold focus:outline-hidden placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-1 text-[10px] font-mono font-bold text-slate-400 bg-slate-100 border border-slate-200 rounded-lg">
            ESC
          </kbd>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="sm:hidden p-1.5 text-slate-500 hover:text-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5">
          {searchQuery.trim().length === 0 ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-800">
                  {language === 'en' ? 'Search Across All Courses' : 'সকল কোর্সে তথ্য খুঁজুন'}
                </p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  {language === 'en' 
                    ? 'Find lessons, key concept callouts, practical tasks, and quiz questions instantly.' 
                    : 'যেকোনো পাঠ, গুরুত্বপূর্ণ কনসেপ্ট বা কুইজের প্রশ্ন মুহূর্তেই খুঁজে নিন।'}
                </p>
              </div>

              {/* Quick Suggestion Pills */}
              <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
                {['CPU & RAM', 'IPOS Model', 'Home Row', 'VLOOKUP', 'Operating System'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full text-xs font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <p className="text-sm font-bold text-slate-700">
                {language === 'en' ? `No results found for "${searchQuery}"` : `"${searchQuery}" এর জন্য কোনো ফলাফল পাওয়া যায়নি`}
              </p>
              <p className="text-xs text-slate-400">
                {language === 'en' 
                  ? 'Try searching for generic terms like "computer", "keyboard", "software", or "mouse".' 
                  : '"কম্পিউটার", "কীবোর্ড", "সফটওয়্যার" ইত্যাদি দিয়ে পুনরায় চেষ্টা করুন।'}
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between px-2 pb-1 text-[11px] text-slate-400 font-medium">
                <span>{searchResults.length} {language === 'en' ? 'matches found' : 'টি ফলাফল পাওয়া গেছে'}</span>
                <span>Click to open lesson</span>
              </div>

              {searchResults.map((res) => (
                <div
                  key={`${res.courseId}-${res.lessonId}-${res.matchType}-${res.title.slice(0, 10)}`}
                  onClick={() => navigateToContentMatch(res)}
                  className="group p-3.5 rounded-2xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 cursor-pointer transition-all space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      {getBadgeForType(res.matchType)}
                      <span className="text-[11px] text-slate-400 font-medium">
                        {res.courseTitle}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {language === 'en' ? res.title : (res.titleBn || res.title)}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {language === 'en' ? res.snippet : (res.snippetBn || res.snippet)}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>Search index spans courses, modules, and assessment items</span>
          <span className="hidden sm:inline-block">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
};
