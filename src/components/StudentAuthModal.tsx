import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { X, ShieldCheck, UserCheck, Sparkles, MapPin, Mail, Award, Check } from 'lucide-react';

const PRESET_STUDENTS = [
  {
    name: 'Tanvir Ahmed',
    nameBn: 'তানভীর আহমেদ',
    studentId: 'BD-2026-8921',
    email: 'tanvir.learner@bdmail.com',
    district: 'Dhaka',
    descEn: 'Independent self-learner studying computer basics from home',
    descBn: 'বাড়ি থেকে কম্পিউটার শেখা স্বাধীন শিক্ষার্থী'
  },
  {
    name: 'Nusrat Jahan',
    nameBn: 'নুসরাত জাহান',
    studentId: 'BD-2026-4410',
    email: 'nusrat.jahan@bdmail.com',
    district: 'Chattogram',
    descEn: 'Class 10 candidate preparing for SSC ICT board exams',
    descBn: 'এসএসসি আইসিটি পরীক্ষার প্রস্তুতি নেওয়া দশম শ্রেণির শিক্ষার্থী'
  },
  {
    name: 'Kamal Hossain',
    nameBn: 'কামাল হোসেন',
    district: 'Rajshahi',
    studentId: 'BD-2026-1189',
    email: 'kamal.hossain@bdmail.com',
    descEn: 'Working professional learning MS Word, Excel & typing skills',
    descBn: 'অফিস ওয়ার্ড, এক্সেল ও টাইপিং শেখা চাকুরিজীবী শিক্ষার্থী'
  }
];

export const StudentAuthModal: React.FC = () => {
  const { user, switchUser, language, showAuthModal, setShowAuthModal } = useStudent();
  const [editingName, setEditingName] = useState(user.name);
  const [editingDistrict, setEditingDistrict] = useState(user.district);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!showAuthModal) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    switchUser({
      name: editingName,
      district: editingDistrict
    });
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowAuthModal(false);
    }, 900);
  };

  const selectPreset = (preset: typeof PRESET_STUDENTS[0]) => {
    switchUser({
      name: preset.name,
      nameBn: preset.nameBn,
      studentId: preset.studentId,
      email: preset.email,
      district: preset.district
    });
    setEditingName(preset.name);
    setEditingDistrict(preset.district);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowAuthModal(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden"
        id="student-identity-modal"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="font-bold text-base">
                {language === 'en' ? 'Student Learning Identity' : 'শিক্ষার্থীর ব্যক্তিগত শিখন প্রোফাইল'}
              </h3>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {language === 'en' 
                ? 'One single identity across all courses, schools, and teachers' 
                : 'একটিমাত্র অ্যাকাউন্টে সকল কোর্স, স্কুল ও শিক্ষকের পাঠ সংরক্ষণ'}
            </p>
          </div>
          <button 
            onClick={() => setShowAuthModal(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-700/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Identity Ownership Badge */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <UserCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950">
              <span className="font-bold">
                {language === 'en' ? 'Independent-First Architecture:' : 'স্বতন্ত্র শিক্ষার্থী নীতি:'}
              </span>{' '}
              {language === 'en'
                ? 'You own your learning journey. Even if you join a school or coaching class later, your history, typing speed, and certificates remain yours.'
                : 'আপনার শিক্ষার মালিকানা সম্পূর্ণ আপনার। ভবিষ্যতে কোনো স্কুল বা কোচিং সেন্টারে যুক্ত হলেও আপনার আগের শেখার অগ্রগতি ও সার্টিফিকেট অপরিবর্তিত থাকবে।'}
            </div>
          </div>

          {/* Current ID Card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                {language === 'en' ? 'National Learner ID' : 'জাতীয় লার্নার আইডি'}
              </span>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full">
                {language === 'en' ? 'Independent' : 'স্বতন্ত্র শিক্ষার্থী'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center font-extrabold text-lg">
                {user.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-base">{user.name}</p>
                <p className="font-mono text-xs text-emerald-700 font-semibold">{user.studentId}</p>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> {user.district}, Bangladesh
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {user.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Switch Demo Profile */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              {language === 'en' ? 'Quick Switch Demo Profiles:' : 'ডেমো প্রোফাইল পরিবর্তন করুন:'}
            </label>
            <div className="grid grid-cols-1 gap-2">
              {PRESET_STUDENTS.map(p => (
                <button
                  key={p.studentId}
                  onClick={() => selectPreset(p)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                    user.studentId === p.studentId
                      ? 'border-emerald-500 bg-emerald-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <span className="font-bold text-slate-900">{language === 'en' ? p.name : p.nameBn}</span>
                    <span className="text-slate-400 font-mono ml-2">({p.district})</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {language === 'en' ? p.descEn : p.descBn}
                    </p>
                  </div>
                  {user.studentId === p.studentId && (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Edit Custom Name Form */}
          <form onSubmit={handleSave} className="space-y-3 pt-2 border-t border-slate-100">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {language === 'en' ? 'Your Full Name' : 'আপনার নাম'}
                </label>
                <input
                  type="text"
                  value={editingName}
                  onChange={e => setEditingName(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  {language === 'en' ? 'District in Bangladesh' : 'জেলা'}
                </label>
                <select
                  value={editingDistrict}
                  onChange={e => setEditingDistrict(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Dhaka">Dhaka (ঢাকা)</option>
                  <option value="Chattogram">Chattogram (চট্টগ্রাম)</option>
                  <option value="Rajshahi">Rajshahi (রাজশাহী)</option>
                  <option value="Khulna">Khulna (খুলনা)</option>
                  <option value="Sylhet">Sylhet (সিলেট)</option>
                  <option value="Barishal">Barishal (বরিশাল)</option>
                  <option value="Rangpur">Rangpur (রংপুর)</option>
                  <option value="Mymensingh">Mymensingh (ময়মনসিংহ)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  {language === 'en' ? 'Updated Successfully!' : 'আপডেট সম্পন্ন হয়েছে!'}
                </>
              ) : (
                language === 'en' ? 'Save Profile' : 'তথ্য সংরক্ষণ করুন'
              )}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
