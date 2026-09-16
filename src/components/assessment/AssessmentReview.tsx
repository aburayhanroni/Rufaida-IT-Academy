import React, { useState } from 'react';
import { 
  AssessmentSubmissionResult, 
  GenericAssessmentItem, 
  Language 
} from '../../types';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Lightbulb, 
  Filter, 
  Clock, 
  Zap, 
  Keyboard, 
  Check, 
  X 
} from 'lucide-react';

interface AssessmentReviewProps {
  result: AssessmentSubmissionResult;
  items: GenericAssessmentItem[];
  assessmentTitle: string;
  passingPercentage: number;
  language: Language;
  onRetry: () => void;
  onContinue: () => void;
  onClose?: () => void;
}

export const AssessmentReview: React.FC<AssessmentReviewProps> = ({
  result,
  items,
  assessmentTitle,
  passingPercentage,
  language,
  onRetry,
  onContinue,
  onClose
}) => {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'correct'>('all');

  const formatSeconds = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins}m ${remaining}s`;
  };

  const isPassed = result.scorePercentage >= passingPercentage;

  // Filter items
  const filteredItemResults = result.itemResults.filter(itemRes => {
    if (filter === 'incorrect') return !itemRes.isCorrect;
    if (filter === 'correct') return itemRes.isCorrect;
    return true;
  });

  const incorrectCount = result.itemResults.filter(r => !r.isCorrect).length;

  return (
    <div className="space-y-6" id="assessment-review-view">
      {/* 1. Overall Score & Result Summary Hero */}
      <div className={`p-6 sm:p-8 rounded-3xl border text-center relative overflow-hidden transition-all ${
        isPassed 
          ? 'bg-gradient-to-b from-emerald-50 to-white border-emerald-200' 
          : 'bg-gradient-to-b from-amber-50 to-white border-amber-200'
      }`}>
        <div className="max-w-md mx-auto space-y-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto shadow-sm ${
            isPassed 
              ? 'bg-emerald-600 text-white' 
              : 'bg-amber-500 text-white'
          }`}>
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className={`inline-block text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full border mb-2 ${
              isPassed 
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                : 'bg-amber-100 text-amber-800 border-amber-300'
            }`}>
              {isPassed 
                ? (language === 'en' ? 'PASSED ASSESSMENT' : 'পরীক্ষায় উত্তীর্ণ') 
                : (language === 'en' ? 'RETRY RECOMMENDED' : 'পুনঃমূল্যায়ন প্রয়োজন')}
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              {assessmentTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isPassed
                ? (language === 'en' ? 'Great mastery! This score is recorded to your student profile.' : 'চমৎকার পারফরম্যান্স! আপনার লার্নিং প্রোফাইলে ফলাফল যুক্ত হয়েছে।')
                : (language === 'en' ? `You need ${passingPercentage}% to pass. Review explanations below and retry.` : `পাস করতে ন্যূনতম ${passingPercentage}% প্রয়োজন। নিচের সঠিক উত্তর পর্যালোচনা করুন।`)}
            </p>
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-3 gap-3 pt-2 font-mono">
            <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">
                {language === 'en' ? 'Score' : 'নম্বর'}
              </span>
              <span className={`text-xl sm:text-2xl font-black ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
                {result.scorePercentage}%
              </span>
              <span className="text-[10px] text-slate-400 block">
                {result.correctCount}/{result.totalQuestions}
              </span>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">
                {language === 'en' ? 'Time Spent' : 'ব্যয়িত সময়'}
              </span>
              <span className="text-xl sm:text-2xl font-black text-slate-800">
                {formatSeconds(result.timeSpentSeconds)}
              </span>
              <span className="text-[10px] text-slate-400 block">
                {language === 'en' ? 'Duration' : 'স্থিতিকাল'}
              </span>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
              <span className="text-[10px] text-slate-400 block uppercase font-sans font-bold">
                {language === 'en' ? 'Result' : 'ফলাফল'}
              </span>
              <span className={`text-xl sm:text-2xl font-black ${isPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
                {isPassed ? 'PASS' : 'REDO'}
              </span>
              <span className="text-[10px] text-slate-400 block">
                Pass mark: {passingPercentage}%
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={onRetry}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all flex items-center gap-2 shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Retry Quiz' : 'পুনরায় পরীক্ষা দিন'}</span>
            </button>

            <button
              type="button"
              onClick={onContinue}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <span>{language === 'en' ? 'Continue Course & Next Lesson' : 'পরবর্তী পাঠে এগিয়ে যান'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Detailed Item-by-Item Review Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {language === 'en' ? 'Answer Key & Concept Review' : 'উত্তরপত্র ও বিস্তারিত ব্যাখ্যা পর্যালোচনা'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'en' 
                ? 'Review every question, examine why answers are correct, and reinforce your learning.' 
                : 'প্রতিটি প্রশ্নের ব্যাখ্যা দেখে ভুলগুলো শুধরে নিন।'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                filter === 'all' 
                  ? 'bg-white text-slate-900 shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'en' ? `All (${result.totalQuestions})` : `সবগুলো (${result.totalQuestions})`}
            </button>

            <button
              type="button"
              onClick={() => setFilter('incorrect')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                filter === 'incorrect' 
                  ? 'bg-rose-50 text-rose-800 shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'en' ? `Incorrect (${incorrectCount})` : `ভুল (${incorrectCount})`}
            </button>

            <button
              type="button"
              onClick={() => setFilter('correct')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                filter === 'correct' 
                  ? 'bg-emerald-50 text-emerald-800 shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {language === 'en' ? `Correct (${result.correctCount})` : `সঠিক (${result.correctCount})`}
            </button>
          </div>
        </div>

        {/* List of Questions with explanations */}
        <div className="space-y-4">
          {filteredItemResults.map((itemRes, index) => {
            const item = items.find(it => it.id === itemRes.itemId);
            if (!item) return null;

            const isCorrect = itemRes.isCorrect;
            const originalIndex = items.findIndex(it => it.id === item.id) + 1;

            return (
              <div 
                key={item.id}
                className={`p-5 rounded-2xl border transition-all space-y-4 bg-white ${
                  isCorrect 
                    ? 'border-slate-200' 
                    : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isCorrect 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {isCorrect ? '✓' : '✕'}
                    </span>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      {item.type === 'typing_test'
                        ? (language === 'en' ? `Typing Assessment ${originalIndex}` : `টাইপিং টেস্ট ${originalIndex}`)
                        : (language === 'en' ? `Question ${originalIndex}` : `প্রশ্ন ${originalIndex}`)}
                    </span>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isCorrect 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {isCorrect 
                      ? (language === 'en' ? 'Correct' : 'সঠিক') 
                      : (language === 'en' ? 'Incorrect' : 'ভুল')}
                  </span>
                </div>

                {/* Prompt */}
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {language === 'en' ? item.promptEn : item.promptBn || item.promptEn}
                  </h4>
                  {language === 'en' && item.promptBn && (
                    <p className="text-xs text-slate-500 font-serif">{item.promptBn}</p>
                  )}
                </div>

                {/* MCQ Review Breakdown */}
                {item.type === 'mcq' || item.type === 'true_false' ? (
                  <div className="space-y-2">
                    {(language === 'en' ? item.optionsEn || [] : item.optionsBn || item.optionsEn || []).map((opt, optIdx) => {
                      const isUserChoice = itemRes.userAnswer === optIdx;
                      const isTargetCorrect = item.correctIndex === optIdx;

                      let optClass = 'bg-slate-50 border-slate-200 text-slate-700';
                      if (isTargetCorrect) {
                        optClass = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold';
                      } else if (isUserChoice && !isTargetCorrect) {
                        optClass = 'bg-rose-50 border-rose-400 text-rose-950 font-semibold';
                      }

                      return (
                        <div 
                          key={optIdx}
                          className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${optClass}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-md bg-white/80 border text-slate-600 flex items-center justify-center font-bold text-[10px] shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          <div className="shrink-0 flex items-center gap-1.5 text-xs">
                            {isUserChoice && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/70 border border-slate-200">
                                {language === 'en' ? 'Your Answer' : 'আপনার উত্তর'}
                              </span>
                            )}
                            {isTargetCorrect && (
                              <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>{language === 'en' ? 'Correct Answer' : 'সঠিক উত্তর'}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : item.type === 'typing_test' ? (
                  /* Typing Assessment Breakdown */
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center text-slate-700">
                      <span>Target Goal:</span>
                      <span className="font-bold">{item.targetWpm || 20} WPM • {item.minAccuracy || 85}% Accuracy</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-900">
                      <span>Achieved Result:</span>
                      <span className={`font-bold ${isCorrect ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {itemRes.metadata?.wpm ?? 0} WPM • {itemRes.metadata?.accuracy ?? 0}% Accuracy
                      </span>
                    </div>
                  </div>
                ) : null}

                {/* Explanation Callout */}
                {(item.explanationEn || item.explanationBn) && (
                  <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs space-y-1 text-blue-950">
                    <div className="flex items-center gap-1.5 font-bold text-blue-900">
                      <Lightbulb className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{language === 'en' ? 'Concept Explanation:' : 'ধারণাগত ব্যাখ্যা:'}</span>
                    </div>
                    <p className="leading-relaxed">
                      {language === 'en' ? item.explanationEn : item.explanationBn || item.explanationEn}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
