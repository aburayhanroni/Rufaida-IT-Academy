import React, { useState } from 'react';
import { useStudent } from '../context/StudentContext';
import { Button, Input, Select } from './ui';
import { 
  ShieldCheck, 
  ArrowRight, 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Check, 
  GraduationCap,
  AlertCircle
} from 'lucide-react';

const BD_DISTRICTS = [
  { value: 'Dhaka', label: 'Dhaka (ঢাকা)' },
  { value: 'Chattogram', label: 'Chattogram (চট্টগ্রাম)' },
  { value: 'Rajshahi', label: 'Rajshahi (রাজশাহী)' },
  { value: 'Khulna', label: 'Khulna (খুলনা)' },
  { value: 'Sylhet', label: 'Sylhet (সিলেট)' },
  { value: 'Barishal', label: 'Barishal (বরিশাল)' },
  { value: 'Rangpur', label: 'Rangpur (রংপুর)' },
  { value: 'Mymensingh', label: 'Mymensingh (ময়মনসিংহ)' },
  { value: 'Cumilla', label: 'Cumilla (কুমিল্লা)' },
  { value: 'Bogura', label: 'Bogura (বগুড়া)' },
  { value: 'Jashore', label: 'Jashore (যশোর)' },
  { value: 'Coxs Bazar', label: "Cox's Bazar (কক্সবাজার)" }
];

const TRACK_OPTIONS = [
  { value: 'basic_computer', label: 'Basic Computer Learner (নতুনদের জন্য)' },
  { value: 'ssc_ict', label: 'SSC ICT Candidate (৯ম-১০ম শ্রেণি)' },
  { value: 'hsc_ict', label: 'HSC Candidate (একাদশ-দ্বাদশ শ্রেণি)' },
  { value: 'independent', label: 'Independent Self-Learner / Professional' }
];

export const StudentRegister: React.FC = () => {
  const { language, registerStudent, setActiveView } = useStudent();

  const [name, setName] = useState('');
  const [nameBn, setNameBn] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [track, setTrack] = useState('basic_computer');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formAlert, setFormAlert] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredId, setRegisteredId] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = language === 'en' ? 'Full name is required' : 'পূর্ণ নাম দেওয়া আবশ্যক';
    } else if (name.trim().length < 2) {
      newErrors.name = language === 'en' ? 'Name must be at least 2 characters' : 'নাম কমপক্ষে ২ অক্ষরের হতে হবে';
    }

    if (phone.trim()) {
      const cleanPhone = phone.replace(/[\s-]/g, '');
      const bdPhoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
      if (!bdPhoneRegex.test(cleanPhone)) {
        newErrors.phone = language === 'en' 
          ? 'Enter valid 11-digit Bangladesh phone (e.g. 01712345678)' 
          : 'সঠিক ১১ সংখ্যার বাংলাদেশি মোবাইল নম্বর দিন (যেমন: ০১৭১২৩৪৫৬৭৮)';
      }
    }

    if (email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.email = language === 'en' ? 'Enter a valid email address' : 'সঠিক ইমেইল ঠিকানা দিন';
      }
    }

    if (!password) {
      newErrors.password = language === 'en' ? 'Please set a security PIN/password' : 'একটি পিন বা পাসওয়ার্ড দিন';
    } else if (password.length < 4) {
      newErrors.password = language === 'en' ? 'PIN/password must be at least 4 characters' : 'পিন বা পাসওয়ার্ড কমপক্ষে ৪ অক্ষরের হতে হবে';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormAlert(null);

    if (!validateForm()) {
      setFormAlert(
        language === 'en' 
          ? 'Please correct the highlighted fields before submitting.' 
          : 'অনুগ্রহ করে লাল চিহ্নিত তথ্যগুলো সংশোধন করুন।'
      );
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const newId = `BD-2026-${randomNum}`;

      registerStudent({
        name: name.trim(),
        nameBn: nameBn.trim() || undefined,
        district,
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        studentClass: track
      });

      setRegisteredId(newId);
      setIsSubmitting(false);

      // Auto-redirect to My Courses
      setTimeout(() => {
        setActiveView('my_courses');
      }, 1500);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center" id="student-register-page">
      <div className="max-w-lg w-full space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200/80 text-xs font-bold shadow-2xs">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>{language === 'en' ? 'Rufaidah IT Academy Registration' : 'রুফাইদাহ্ আইটি একাডেমি শিক্ষার্থী নিবন্ধন'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'en' ? 'Create Your Student ID' : 'আপনার শিক্ষার্থী আইডি তৈরি করুন'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            {language === 'en'
              ? 'Join free as an independent learner. Your learning achievements stay with you anywhere in Bangladesh.'
              : 'সম্পূর্ণ বিনামূল্যে যেকোনো জেলা থেকে যুক্ত হোন। আপনার সব অর্জন আপনার নিজস্ব আইডিতে স্থায়ী থাকবে।'}
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          
          {registeredId ? (
            <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">
                  {language === 'en' ? 'Student Registration Successful!' : 'শিক্ষার্থী নিবন্ধন সম্পন্ন হয়েছে!'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'en' ? 'Your National Learner ID has been generated:' : 'আপনার জাতীয় শিক্ষার্থী আইডি:'}
                </p>
                <div className="py-2.5 px-5 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xl font-extrabold tracking-wider inline-block mt-2 shadow-inner">
                  {registeredId}
                </div>
              </div>
              <div className="p-3.5 bg-emerald-50 text-emerald-800 rounded-2xl text-xs flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {language === 'en' 
                    ? 'Pre-enrolled in Basic Computer Literacy & Touch Typing.' 
                    : 'বেসিক কম্পিউটার ও টাইপিং কোর্সে স্বয়ংক্রিয়ভাবে যুক্ত করা হয়েছে।'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {language === 'en' ? 'Taking you to your courses dashboard...' : 'কোর্স ড্যাশবোর্ডে নিয়ে যাওয়া হচ্ছে...'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
              {formAlert && (
                <div 
                  role="alert" 
                  className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold rounded-2xl flex items-center gap-2 animate-in fade-in"
                >
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{formAlert}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label={language === 'en' ? 'Full Name (English) *' : 'পূর্ণ নাম (ইংরেজি) *'}
                  placeholder="e.g. Tanvir Ahmed"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                  }}
                  leftIcon={<User className="w-4 h-4" />}
                  error={errors.name}
                  required
                />

                <Input
                  label={language === 'en' ? 'Full Name (Bangla - Optional)' : 'পূর্ণ নাম (বাংলা - ঐচ্ছিক)'}
                  placeholder="যেমন: তানভীর আহমেদ"
                  value={nameBn}
                  onChange={(e) => setNameBn(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Select
                  label={language === 'en' ? 'Home District' : 'নিজ জেলা'}
                  options={BD_DISTRICTS}
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />

                <Select
                  label={language === 'en' ? 'Learning Track' : 'পড়ার বিষয় বা শ্রেণি'}
                  options={TRACK_OPTIONS}
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label={language === 'en' ? 'Mobile Phone (Optional)' : 'মোবাইল নম্বর (ঐচ্ছিক)'}
                  placeholder="01712-345678"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                  }}
                  leftIcon={<Phone className="w-4 h-4" />}
                  error={errors.phone}
                  type="tel"
                />

                <Input
                  label={language === 'en' ? 'Email Address (Optional)' : 'ইমেইল ঠিকানা (ঐচ্ছিক)'}
                  type="email"
                  placeholder="student@mail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  leftIcon={<Mail className="w-4 h-4" />}
                  error={errors.email}
                />
              </div>

              <Input
                label={language === 'en' ? 'Create Password / PIN *' : 'পাসওয়ার্ড বা গোপন পিন *'}
                type="password"
                placeholder="At least 4 characters"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                }}
                leftIcon={<Lock className="w-4 h-4" />}
                error={errors.password}
                helperText={language === 'en' ? 'Used to access your learning records across any device' : 'যেকোনো ডিভাইস থেকে আপনার পড়ার রেকর্ডে ঢুকতে এই পিন ব্যবহার করবেন'}
                required
              />

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-2.5 text-[11px] text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {language === 'en'
                    ? 'No institution approval needed. You will immediately be enrolled in Basic Computer & SSC ICT courses.'
                    : 'কোনো শিক্ষাপ্রতিষ্ঠানের সুপারিশের প্রয়োজন নেই। নিবন্ধন শেষে সাথে সাথে বেসিক কম্পিউটার ও এসএসসি আইসিটি কোর্সে যুক্ত হবেন।'}
                </span>
              </div>

              <Button
                type="submit"
                variant="emerald"
                size="lg"
                className="w-full mt-2"
                isLoading={isSubmitting}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {language === 'en' ? 'Complete Registration' : 'নিবন্ধন সম্পন্ন করুন'}
              </Button>
            </form>
          )}

          {/* Login Link */}
          {!registeredId && (
            <div className="pt-4 text-center border-t border-slate-100">
              <p className="text-xs text-slate-500">
                {language === 'en' ? 'Already have an existing Student ID?' : 'ইতিমধ্যেই আইডি আছে?'}{' '}
                <button
                  type="button"
                  onClick={() => setActiveView('login')}
                  className="font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                >
                  {language === 'en' ? 'Sign In' : 'লগইন করুন'}
                </button>
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
