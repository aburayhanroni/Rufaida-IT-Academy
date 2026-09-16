import React, { useEffect, useState } from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { useStudent } from '../context/StudentContext';
import { WifiOff, Wifi, CheckCircle2, ShieldCheck } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isBrowserOnline = useOnlineStatus();
  const { isOfflineMode, language } = useStudent();
  const [showOnlineToast, setShowOnlineToast] = useState(false);
  const [wasOffline, setWasOffline] = useState(false);

  const effectivelyOffline = !isBrowserOnline || isOfflineMode;

  useEffect(() => {
    if (effectivelyOffline) {
      setWasOffline(true);
    } else if (wasOffline) {
      // Just reconnected
      setShowOnlineToast(true);
      const timer = setTimeout(() => {
        setShowOnlineToast(false);
        setWasOffline(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [effectivelyOffline, wasOffline]);

  return (
    <>
      {/* Persistent top notification bar when offline */}
      {effectivelyOffline && (
        <div 
          id="offline-status-banner"
          role="status"
          aria-live="polite"
          className="bg-amber-600 text-white text-xs px-4 py-1.5 flex items-center justify-between shadow-xs transition-all animate-in slide-in-from-top-1"
        >
          <div className="flex items-center gap-2 max-w-4xl mx-auto w-full">
            <WifiOff className="w-3.5 h-3.5 shrink-0 text-amber-200" />
            <span className="font-semibold">
              {!isBrowserOnline 
                ? (language === 'en' ? 'You are offline.' : 'আপনি অফলাইনে আছেন।') 
                : (language === 'en' ? 'Offline Concept Mode active.' : 'অফলাইন মোড সক্রিয় রয়েছে।')}
            </span>
            <span className="text-amber-100 hidden sm:inline">
              {language === 'en' 
                ? 'All lesson progress, quizzes, typing scores, and notes are securely saved locally.' 
                : 'সব লেসন প্রগ্রেস, কুইজ স্কোর, টাইপিং ও নোট আপনার ডিভাইসেই সংরক্ষিত হচ্ছে।'}
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider bg-amber-700/80 px-2 py-0.5 rounded text-amber-100 shrink-0">
            {language === 'en' ? 'Local Storage' : 'লোকাল মেমরি'}
          </span>
        </div>
      )}

      {/* Online reconnection toast */}
      {showOnlineToast && !effectivelyOffline && (
        <div 
          id="online-reconnected-toast"
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-emerald-700 text-white text-xs px-4 py-3 rounded-2xl shadow-xl border border-emerald-500/30 flex items-center gap-2.5 animate-in slide-in-from-bottom-2 fade-in"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
          <div>
            <p className="font-extrabold text-sm">
              {language === 'en' ? 'Back Online' : 'পুনরায় অনলাইন'}
            </p>
            <p className="text-emerald-100 text-[11px]">
              {language === 'en' ? 'Local progress is preserved and ready.' : 'আপনার অফলাইন প্রগ্রেস বহাল রয়েছে।'}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
