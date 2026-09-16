import React, { useState, useEffect, useRef } from 'react';
import { GenericAssessmentItem, Language } from '../../types';
import { Keyboard, CheckCircle2, AlertTriangle, RotateCcw, Zap, Target } from 'lucide-react';

interface TypingAssessmentViewProps {
  item: GenericAssessmentItem;
  onRecordResult: (result: {
    typedText: string;
    wpm: number;
    accuracy: number;
    errorCount: number;
    isPassed: boolean;
  }) => void;
  language: Language;
  disabled?: boolean;
  questionNumber: number;
}

export const TypingAssessmentView: React.FC<TypingAssessmentViewProps> = ({
  item,
  onRecordResult,
  language,
  disabled = false,
  questionNumber
}) => {
  const targetText = item.targetText || 'Quick brown fox jumps over the lazy dog.';
  const targetWpm = item.targetWpm || 20;
  const minAccuracy = item.minAccuracy || 85;

  const [inputVal, setInputVal] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Focus automatically on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, [item.id]);

  // Handle typing input
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (disabled || hasSubmitted) return;
    const value = e.target.value;

    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }

    setInputVal(value);

    // Auto-detect completion if full target length reached
    if (value.length >= targetText.length) {
      const finishTime = Date.now();
      setEndTime(finishTime);
      completeAssessment(value, startTime || finishTime, finishTime);
    }
  };

  const calculateStats = (currentTyped: string, start: number | null, end: number | null) => {
    if (!start) return { wpm: 0, accuracy: 100, errors: 0 };
    const durationMin = Math.max(0.05, ((end || Date.now()) - start) / 60000);
    
    let errors = 0;
    for (let i = 0; i < currentTyped.length; i++) {
      if (currentTyped[i] !== targetText[i]) {
        errors++;
      }
    }

    const words = currentTyped.length / 5;
    const grossWpm = Math.round(words / durationMin);
    const accuracy = currentTyped.length > 0 
      ? Math.max(0, Math.round(((currentTyped.length - errors) / currentTyped.length) * 100))
      : 100;

    return { wpm: grossWpm, accuracy, errors };
  };

  const currentStats = calculateStats(inputVal, startTime, endTime);

  const completeAssessment = (typed: string, start: number, end: number) => {
    setHasSubmitted(true);
    const finalStats = calculateStats(typed, start, end);
    const passed = finalStats.wpm >= targetWpm && finalStats.accuracy >= minAccuracy;
    
    onRecordResult({
      typedText: typed,
      wpm: finalStats.wpm,
      accuracy: finalStats.accuracy,
      errorCount: finalStats.errors,
      isPassed: passed
    });
  };

  const handleManualDone = () => {
    const finish = Date.now();
    setEndTime(finish);
    completeAssessment(inputVal, startTime || finish, finish);
  };

  const handleReset = () => {
    setInputVal('');
    setStartTime(null);
    setEndTime(null);
    setHasSubmitted(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  return (
    <div className="space-y-6" id={`assessment-typing-item-${item.id}`}>
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
              <Keyboard className="w-3 h-3 text-amber-600" />
              <span>{language === 'en' ? `Typing Assessment (Task ${questionNumber})` : `টাইপিং পরীক্ষা (টাস্ক ${questionNumber})`}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-emerald-600" />
              <span>Goal: {targetWpm} WPM</span>
            </span>
            <span>•</span>
            <span>Min: {minAccuracy}% Acc</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-slate-900 leading-snug">
          {language === 'en' ? item.promptEn : item.promptBn || item.promptEn}
        </h3>

        {language === 'en' && item.promptBn && (
          <p className="text-xs text-slate-500 font-serif">{item.promptBn}</p>
        )}
      </div>

      {/* Target Passage Box with Character Highlighting */}
      <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 font-mono text-sm leading-relaxed tracking-wide select-none">
        <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1">
          <Zap className="w-3 h-3" />
          <span>{language === 'en' ? 'Target Passage to Type:' : 'নিচের অংশটি হুবহু টাইপ করুন:'}</span>
        </div>

        <p className="font-medium">
          {targetText.split('').map((char, index) => {
            let color = 'text-slate-400';
            let bg = '';
            if (index < inputVal.length) {
              if (inputVal[index] === char) {
                color = 'text-emerald-400 font-bold';
              } else {
                color = 'text-rose-400 font-bold';
                bg = 'bg-rose-950/60 rounded px-0.5';
              }
            } else if (index === inputVal.length) {
              bg = 'bg-emerald-500/30 text-white border-b-2 border-emerald-400 animate-pulse';
            }

            return (
              <span key={index} className={`${color} ${bg}`}>
                {char}
              </span>
            );
          })}
        </p>
      </div>

      {/* Live Input Field */}
      <div className="space-y-2">
        <textarea
          ref={inputRef}
          value={inputVal}
          onChange={handleChange}
          disabled={disabled || hasSubmitted}
          placeholder={language === 'en' ? 'Click here and begin typing the passage above...' : 'এখানে ক্লিক করে উপরের টেক্সটটি টাইপ করা শুরু করুন...'}
          className="w-full h-28 p-4 rounded-xl border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none bg-white text-slate-900"
        />

        {/* Live Metrics Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div className="flex items-center gap-4 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Speed</span>
              <span className="font-extrabold text-sm text-slate-900">{currentStats.wpm} WPM</span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Accuracy</span>
              <span className={`font-extrabold text-sm ${currentStats.accuracy >= minAccuracy ? 'text-emerald-600' : 'text-amber-600'}`}>
                {currentStats.accuracy}%
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Errors</span>
              <span className="font-extrabold text-sm text-rose-600">{currentStats.errors}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!hasSubmitted ? (
              <button
                type="button"
                onClick={handleManualDone}
                disabled={inputVal.trim().length === 0}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-lg text-xs font-bold transition-colors"
              >
                {language === 'en' ? 'Submit Typing Result' : 'টাইপিং ফলাফল জমা দিন'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-1.5 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{language === 'en' ? 'Try Again' : 'পুনরায় চেষ্টা'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Immediate Result Feedback Banner */}
        {hasSubmitted && (
          <div className={`p-4 rounded-xl border flex items-center justify-between gap-3 text-xs ${
            currentStats.wpm >= targetWpm && currentStats.accuracy >= minAccuracy
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <div className="flex items-center gap-2.5">
              {currentStats.wpm >= targetWpm && currentStats.accuracy >= minAccuracy ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              )}
              <div>
                <p className="font-bold">
                  {currentStats.wpm >= targetWpm && currentStats.accuracy >= minAccuracy
                    ? (language === 'en' ? '✓ Typing Target Achieved!' : '✓ টাইপিং লক্ষ্যমাত্রা অর্জিত হয়েছে!')
                    : (language === 'en' ? 'Needs Improvement' : 'আরও অনুশীলনের প্রয়োজন')}
                </p>
                <p className="text-[11px] opacity-90">
                  {language === 'en'
                    ? `Achieved ${currentStats.wpm} WPM with ${currentStats.accuracy}% accuracy.`
                    : `${currentStats.wpm} WPM গতি এবং ${currentStats.accuracy}% নির্ভুলতা অর্জিত হয়েছে।`}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="text-xs font-bold underline hover:opacity-80 shrink-0"
            >
              {language === 'en' ? 'Retype' : 'পুনরায় টাইপ'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
