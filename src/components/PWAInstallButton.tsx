import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useStudent } from '../context/StudentContext';
import { Download, Smartphone, X, CheckCircle2 } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'navbar' | 'banner' | 'card';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  variant = 'navbar',
  className = '' 
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const { language } = useStudent();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  // If already running as an installed standalone PWA, hide
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      setIsInstalling(true);
      try {
        await install();
      } finally {
        setIsInstalling(false);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  if (!isInstallable && !isIOS) {
    // In standard desktop browsers where beforeinstallprompt hasn't fired or PWA is already cached
    return null;
  }

  if (variant === 'banner') {
    return (
      <>
        <div className={`bg-gradient-to-r from-emerald-700 to-teal-800 text-white px-4 py-2.5 rounded-2xl shadow-sm flex items-center justify-between gap-3 text-xs ${className}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Smartphone className="w-4 h-4 text-emerald-200" />
            </div>
            <div>
              <p className="font-extrabold text-white text-xs sm:text-sm leading-tight">
                {language === 'en' ? 'Install Rufaidah IT Academy App' : 'রুফাইদাহ্ আইটি একাডেমি অ্যাপ ইন্সটল করুন'}
              </p>
              <p className="text-[11px] text-emerald-100">
                {language === 'en' ? 'One-tap launch • Works with no internet • 0 data' : 'ইন্টারনেট ছাড়াই কাজ করবে • কোনো ডেটা খরচ হবে না'}
              </p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            disabled={isInstalling}
            className="px-3.5 py-1.5 bg-white hover:bg-emerald-50 text-emerald-900 rounded-xl font-bold text-xs shrink-0 shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isIOS ? (language === 'en' ? 'iOS Guide' : 'আইফোন গাইড') : (language === 'en' ? 'Install App' : 'ইন্সটল')}</span>
          </button>
        </div>

        {/* iOS Safari Guide Modal */}
        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {language === 'en' ? 'Install on iPhone / iPad' : 'আইফোন / আইপ্যাডে ইন্সটল করুন'}
                  </h3>
                </div>
                <button 
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                  <p>
                    {language === 'en' 
                      ? 'Tap the Share button in Safari bottom bar (the box with an upward arrow).' 
                      : 'সাফারি ব্রাউজারের নিচের শেয়ার বাটনে (তীরচিহ্নযুক্ত বক্স) ট্যাপ করুন।'}
                  </p>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                  <p>
                    {language === 'en' 
                      ? 'Scroll down and select "Add to Home Screen".' 
                      : 'নিচে স্ক্রল করে "Add to Home Screen" অপশন বেছে নিন।'}
                  </p>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                  <p>
                    {language === 'en' 
                      ? 'Tap "Add" in top right. Rufaidah IT Academy will appear on your home screen!' 
                      : 'উপরে ডানে "Add" চাপুন। হোম স্ক্রিনে অ্যাপ আইকন তৈরি হয়ে যাবে!'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
              >
                {language === 'en' ? 'Got It' : 'বুঝেছি'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Navbar button default
  return (
    <>
      <button
        onClick={handleInstallClick}
        disabled={isInstalling}
        id="pwa-install-header-btn"
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-2xs ${className}`}
        title={language === 'en' ? 'Install Progressive Web App for offline access' : 'অফলাইনে পড়তে অ্যাপ ইন্সটল করুন'}
      >
        <Download className="w-3.5 h-3.5 text-emerald-600" />
        <span className="hidden sm:inline">
          {isIOS 
            ? (language === 'en' ? 'Install' : 'ইন্সটল') 
            : (language === 'en' ? 'Install App' : 'অ্যাপ ইন্সটল')}
        </span>
      </button>

      {/* iOS Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  {language === 'en' ? 'Install on iOS' : 'আইফোনে ইন্সটল করুন'}
                </h3>
              </div>
              <button 
                onClick={() => setShowIOSGuide(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                {language === 'en' 
                  ? '1. Tap Share button in Safari.' 
                  : '১. সাফারির নিচে শেয়ার বাটনে ট্যাপ করুন।'}
              </p>
              <p>
                {language === 'en' 
                  ? '2. Tap "Add to Home Screen".' 
                  : '২. "Add to Home Screen" নির্বাচন করুন।'}
              </p>
              <p>
                {language === 'en' 
                  ? '3. Tap "Add". The app will open in fullscreen mode.' 
                  : '৩. "Add" চাপুন। অ্যাপটি সরাসরি ওপেন হবে।'}
              </p>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
            >
              {language === 'en' ? 'Close' : 'বন্ধ করুন'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
