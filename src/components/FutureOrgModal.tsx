import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { X, Building2, School, GraduationCap, CheckCircle2, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';

export const FutureOrgModal: React.FC = () => {
  const { showOrgModal, setShowOrgModal, language, user, switchUser } = useStudent();
  const [accessCode, setAccessCode] = useState('');
  const [connectedMessage, setConnectedMessage] = useState<string | null>(null);

  if (!showOrgModal) return null;

  const handleConnectSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessCode.trim()) return;

    // Simulate connecting an institution without losing independent data
    const orgName = accessCode.toUpperCase().includes('DHAKA') 
      ? 'Dhaka Residential Model College'
      : accessCode.toUpperCase().includes('RAJSHAHI')
      ? 'Rajshahi Collegiate School ICT Lab'
      : 'Apex ICT Coaching Center, Chattogram';

    switchUser({
      connectedInstitution: {
        id: 'inst_01',
        name: orgName,
        type: 'school',
        joinedDate: '2026-09'
      }
    });

    setConnectedMessage(orgName);
  };

  const handleDisconnect = () => {
    switchUser({ connectedInstitution: null });
    setConnectedMessage(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden"
        id="future-org-modal"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">
                {language === 'en' ? 'Institutional Link & Schools (Phase 2)' : 'শিক্ষা প্রতিষ্ঠান ও কোচিং লিংক (পরবর্তী ধাপ)'}
              </h3>
              <p className="text-xs text-slate-300">
                {language === 'en' ? 'Seamless integration without separate accounts' : 'ব্যক্তিগত আইডি বজায় রেখেই প্রতিষ্ঠানে যুক্ত হওয়া'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setShowOrgModal(false)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Architecture Guarantee */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'en' ? 'Core Architecture Principle:' : 'মূল স্থাপত্য নীতি:'}</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              {language === 'en'
                ? 'We never create duplicate student accounts for different institutions. Your personal learning history, course enrollments, typing records, and quiz scores always stay with your unique National Student ID.'
                : 'বিভিন্ন স্কুল বা কোচিং সেন্টারের জন্য আলাদা অ্যাকাউন্ট খোলার প্রয়োজন নেই। আপনার লার্নিং হিস্ট্রি, টাইপিং রেকর্ড ও কুইজের মার্কস আপনার নিজস্ব স্টুডেন্ট আইডিতেই চিরকাল সংরক্ষিত থাকবে।'}
            </p>
          </div>

          {/* Connected Status */}
          {user.connectedInstitution ? (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">Currently Linked Institution:</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full">
                  Active Link
                </span>
              </div>
              <div className="flex items-center gap-3">
                <School className="w-6 h-6 text-emerald-600" />
                <div>
                  <p className="font-bold text-slate-900 text-sm">{user.connectedInstitution.name}</p>
                  <p className="text-xs text-slate-500">Shared progress with teacher • Personal account preserved</p>
                </div>
              </div>
              <button
                onClick={handleDisconnect}
                className="text-xs text-rose-600 hover:underline font-medium block"
              >
                Disconnect and return to 100% Independent status
              </button>
            </div>
          ) : (
            <form onSubmit={handleConnectSimulate} className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                {language === 'en' ? 'Simulate Joining with School / Class Code:' : 'স্কুল বা শিক্ষক প্রদত্ত কোড দিয়ে যুক্ত হোন:'}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={accessCode}
                    onChange={e => setAccessCode(e.target.value)}
                    placeholder="e.g. DHAKA-COLL-ICT or RAJSHAHI-2026"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors whitespace-nowrap"
                >
                  {language === 'en' ? 'Link School' : 'সংযুক্ত করুন'}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                {language === 'en'
                  ? 'Try entering "DHAKA-ICT" or "RAJSHAHI" to preview how school-assigned courses will appear on your dashboard.'
                  : 'পরীক্ষা করতে "DHAKA-ICT" লিখে সংযুক্ত করুন।'}
              </p>
            </form>
          )}

          {/* Phase 2 Ecosystem Blueprint */}
          <div className="border-t border-slate-100 pt-4 space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              {language === 'en' ? 'Phase 2 Ecosystem Architecture:' : 'পরবর্তী ধাপের সার্বিক পরিকাঠামো:'}
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <GraduationCap className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800">Learners</p>
                <p className="text-[10px] text-slate-500">Independent or Enrolled</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <School className="w-4 h-4 text-teal-600 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800">Schools/Colleges</p>
                <p className="text-[10px] text-slate-500">Classes & Monitoring</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <Building2 className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <p className="text-[11px] font-bold text-slate-800">Coaching Centers</p>
                <p className="text-[10px] text-slate-500">Tests & Scholarships</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowOrgModal(false)}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors"
          >
            {language === 'en' ? 'Close Preview' : 'বন্ধ করুন'}
          </button>
        </div>
      </div>
    </div>
  );
};
