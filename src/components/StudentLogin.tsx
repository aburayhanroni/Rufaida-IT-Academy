import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Button, Input, Card, Badge } from './ui';
import { 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  CheckCircle2, 
  Check, 
  MapPin, 
  HelpCircle,
  GraduationCap
} from 'lucide-react';

const PRESET_DEMO_USERS = [
  {
    name: 'Tanvir Ahmed',
    nameBn: 'তানভীর আহমেদ',
    studentId: 'BD-2026-8921',
    district: 'Dhaka',
    track: 'Independent Learner (Basic Computer)',
    trackBn: 'স্বাধীন শিক্ষার্থী (বেসিক কম্পিউটার)'
  },
  {
    name: 'Nusrat Jahan',
    nameBn: 'নুসরাত জাহান',
    studentId: 'BD-2026-4410',
    district: 'Chattogram',
    track: 'SSC Candidate (Class 10 ICT)',
    trackBn: 'এসএসসি পরীক্ষার্থী (১০ম শ্রেণি আইসিটি)'
  },
  {
    name: 'Kamal Hossain',
    nameBn: 'কামাল হোসেন',
    studentId: 'BD-2026-1189',
    district: 'Rajshahi',
    track: 'Vocational Learner (MS Office & Typing)',
    trackBn: 'কর্মমুখী শিক্ষার্থী (অফিস ও টাইপিং)'
  }
];

export const StudentLogin: React.FC = () => {
  const { language, loginStudent, setActiveView, user } = useStudent();

  const [identifier, setIdentifier] = useState('BD-2026-8921');
  const [password, setPassword] = useState('••••••••');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError(language === 'en' ? 'Please enter your Student ID, Email, or Phone' : 'অনুগ্রহ করে আপনার শিক্ষার্থী আইডি, ইমেইল অথবা ফোন নম্বর দিন');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginStudent(identifier);
      setSuccessMessage(language === 'en' ? 'Login successful! Redirecting to your dashboard...' : 'লগইন সফল হয়েছে! ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...');
      setTimeout(() => {
        setActiveView('dashboard');
      }, 600);
    }, 400);
  };

  const handleQuickPreset = (preset: typeof PRESET_DEMO_USERS[0]) => {
    setIdentifier(preset.studentId);
    setPassword('••••••••');
    loginStudent(preset.studentId, preset.name, preset.district);
    setSuccessMessage(
      language === 'en'
        ? `Logged in as ${preset.name} (${preset.district})`
        : `${preset.name} হিসেবে লগইন সফল হয়েছে`
    );
    setTimeout(() => {
      setActiveView('dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center" id="student-login-page">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand & Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200/80 text-xs font-bold">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>{language === 'en' ? 'Rufaidah IT Academy Student Portal' : 'রুফাইদাহ্ আইটি একাডেমি শিক্ষার্থী পোর্টাল'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'en' ? 'Welcome Back, Learner' : 'স্বাগতম, শিক্ষার্থী'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            {language === 'en'
              ? 'Access your independent courses, typing statistics, and study notes.'
              : 'আপনার ব্যক্তিগত কোর্স, টাইপিং রেকর্ড এবং পড়ার নোট দেখতে লগইন করুন।'}
          </p>
        </div>

        {/* Main Login Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={language === 'en' ? 'Student ID / Email / Phone' : 'শিক্ষার্থী আইডি / ইমেইল / ফোন নম্বর'}
              placeholder="e.g. BD-2026-8921 or 01712-XXXXXX"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              leftIcon={<User className="w-4 h-4" />}
              error={error}
              required
            />

            <Input
              label={language === 'en' ? 'Password / Security PIN' : 'পাসওয়ার্ড / নিরাপত্তা পিন'}
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4" />}
              helperText={language === 'en' ? 'Default pin for evaluation: any 4+ chars' : 'মূল্যায়নের জন্য যেকোনো পিন দিতে পারেন'}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                <input type="checkbox" defaultChecked className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <span>{language === 'en' ? 'Remember on this browser' : 'এই ডিভাইসে মনে রাখুন'}</span>
              </label>
              <button
                type="button"
                onClick={() => setIdentifier('BD-2026-8921')}
                className="font-semibold text-emerald-700 hover:underline"
              >
                {language === 'en' ? 'Forgot ID?' : 'আইডি ভুলে গেছেন?'}
              </button>
            </div>

            <Button
              type="submit"
              variant="emerald"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {language === 'en' ? 'Sign In to Portal' : 'পোর্টালে প্রবেশ করুন'}
            </Button>
          </form>

          {/* Quick Demo Presets */}
          <div className="pt-5 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {language === 'en' ? 'Quick Demo Student Sign-In:' : 'এক-ক্লিকে ডেমো প্রোফাইল নির্বাচন:'}
              </span>
              <span className="text-[10px] text-emerald-600 font-semibold">1-Click</span>
            </div>

            <div className="space-y-2">
              {PRESET_DEMO_USERS.map((preset) => (
                <button
                  key={preset.studentId}
                  type="button"
                  onClick={() => handleQuickPreset(preset)}
                  className="w-full text-left p-3 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-emerald-50/60 hover:border-emerald-200 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-800">
                        {language === 'en' ? preset.name : preset.nameBn}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {preset.studentId}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {preset.district} • {language === 'en' ? preset.track : preset.trackBn}
                    </span>
                  </div>
                  <UserCheck className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Register Link */}
          <div className="pt-4 text-center border-t border-slate-100">
            <p className="text-xs text-slate-500">
              {language === 'en' ? "Don't have a Student ID yet?" : 'এখনো কোনো শিক্ষার্থী আইডি নেই?'}{' '}
              <button
                type="button"
                onClick={() => setActiveView('register')}
                className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                {language === 'en' ? 'Register Free as an Independent Learner' : 'বিনামূল্যে নতুন আইডি তৈরি করুন'}
              </button>
            </p>
          </div>

        </div>

        {/* Value Prop Banner */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-start gap-3 text-xs text-emerald-900">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {language === 'en'
              ? 'Independent-First Architecture: You do not need to belong to any school, college, or coaching center to study and earn certifications.'
              : 'স্বাধীন শিক্ষার্থী কাঠামো: কোনো স্কুল, কলেজ বা কোচিং সেন্টারের অনুমোদন ছাড়াই আপনি এককভাবে পড়াশোনা করে সনদ অর্জন করতে পারবেন।'}
          </p>
        </div>

      </div>
    </div>
  );
};
