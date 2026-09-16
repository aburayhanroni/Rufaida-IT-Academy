import React, { useState, useEffect, useRef } from 'react';
import { 
  AssessmentConfig, 
  AssessmentSubmissionResult, 
  AssessmentItemResult, 
  GenericAssessmentItem, 
  Language 
} from '../../types';
import { useStudent } from '../../context/StudentContext';
import { AssessmentTimer } from './AssessmentTimer';
import { MCQAssessmentView } from './MCQAssessmentView';
import { TypingAssessmentView } from './TypingAssessmentView';
import { AssessmentReview } from './AssessmentReview';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  HelpCircle, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface AssessmentRunnerProps {
  config: AssessmentConfig;
  isOpen?: boolean;
  mode?: 'modal' | 'embedded';
  onClose?: () => void;
  onComplete?: (result: AssessmentSubmissionResult) => void;
}

export const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({
  config,
  isOpen = true,
  mode = 'modal',
  onClose,
  onComplete
}) => {
  const { language, recordQuizResult, markLessonCompleted } = useStudent();

  const [status, setStatus] = useState<'intro' | 'in_progress' | 'review'>('in_progress');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(
    config.timeLimitSeconds ?? null
  );
  const [isPaused, setIsPaused] = useState(false);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<AssessmentSubmissionResult | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer effect
  useEffect(() => {
    if (status !== 'in_progress' || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
      if (timeRemaining !== null) {
        setTimeRemaining(prev => {
          if (prev === null) return null;
          if (prev <= 1) {
            handleTimeExpired();
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, isPaused, timeRemaining]);

  if (!isOpen) return null;

  const currentItem = config.items[currentIndex];
  const totalItems = config.items.length;
  const answeredCount = Object.keys(answers).length;
  const passingPercentage = config.passingPercentage ?? 60;

  const handleTimeExpired = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    handleSubmitAssessment();
  };

  const handleAnswerMCQ = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentItem.id]: optionIndex
    }));
  };

  const handleAnswerTyping = (result: {
    typedText: string;
    wpm: number;
    accuracy: number;
    errorCount: number;
    isPassed: boolean;
  }) => {
    setAnswers(prev => ({
      ...prev,
      [currentItem.id]: result
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Last question reached
      setShowConfirmSubmit(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSubmitAssessment = () => {
    setShowConfirmSubmit(false);
    if (timerRef.current) clearInterval(timerRef.current);

    let correctCount = 0;
    const itemResults: AssessmentItemResult[] = config.items.map(item => {
      const userAns = answers[item.id];
      let isCorrect = false;
      let score = 0;
      let metadata: any = undefined;

      if (item.type === 'mcq' || item.type === 'true_false') {
        isCorrect = userAns !== undefined && userAns === item.correctIndex;
        score = isCorrect ? (item.points || 1) : 0;
      } else if (item.type === 'typing_test') {
        const typingRes = userAns as {
          wpm: number;
          accuracy: number;
          errorCount: number;
          isPassed: boolean;
        } | undefined;

        if (typingRes) {
          isCorrect = typingRes.isPassed;
          metadata = {
            wpm: typingRes.wpm,
            accuracy: typingRes.accuracy,
            errorCount: typingRes.errorCount
          };
          score = isCorrect ? (item.points || 1) : 0;
        }
      }

      if (isCorrect) correctCount++;

      return {
        itemId: item.id,
        type: item.type,
        userAnswer: userAns,
        correctAnswer: item.type === 'mcq' || item.type === 'true_false' ? item.correctIndex : item.targetText,
        isCorrect,
        score,
        maxScore: item.points || 1,
        feedbackEn: item.explanationEn,
        feedbackBn: item.explanationBn,
        metadata
      };
    });

    const scorePercentage = Math.round((correctCount / totalItems) * 100);
    const isPassed = scorePercentage >= passingPercentage;

    const finalResult: AssessmentSubmissionResult = {
      assessmentId: config.id,
      courseId: config.courseId,
      lessonId: config.lessonId,
      totalQuestions: totalItems,
      correctCount,
      scorePercentage,
      isPassed,
      timeSpentSeconds: elapsedSeconds,
      itemResults,
      submittedAt: new Date().toISOString()
    };

    setSubmissionResult(finalResult);
    setStatus('review');

    // Record in global student context
    recordQuizResult({
      quizTitle: language === 'en' ? config.titleEn : config.titleBn,
      courseId: config.courseId,
      lessonId: config.lessonId,
      score: correctCount,
      total: totalItems,
      percentage: scorePercentage,
      answers: itemResults.map(ir => ({
        questionId: ir.itemId,
        userSelected: typeof ir.userAnswer === 'number' ? ir.userAnswer : (ir.isCorrect ? 0 : -1),
        correctIndex: typeof ir.correctAnswer === 'number' ? ir.correctAnswer : 0
      }))
    });

    // Mark lesson complete if passed
    if (isPassed) {
      markLessonCompleted(config.courseId, config.lessonId);
    }

    onComplete?.(finalResult);
  };

  const handleRetry = () => {
    setAnswers({});
    setCurrentIndex(0);
    setElapsedSeconds(0);
    setTimeRemaining(config.timeLimitSeconds ?? null);
    setIsPaused(false);
    setShowConfirmSubmit(false);
    setSubmissionResult(null);
    setStatus('in_progress');
  };

  // Content rendering based on status
  const modalContent = (
    <div 
      className={`bg-white rounded-3xl w-full flex flex-col transition-all overflow-hidden ${
        mode === 'modal'
          ? 'max-w-3xl shadow-2xl border border-slate-100 max-h-[92vh]'
          : 'border border-slate-200 shadow-xs'
      }`}
      id={`assessment-runner-${config.id}`}
    >
      {/* 1. Header Bar */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between gap-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">
              {language === 'en' ? 'Step 3: Core Knowledge Assessment' : '৩য় ধাপ: জ্ঞান ও দক্ষতা যাচাই'}
            </span>
            <h3 className="font-extrabold text-sm sm:text-base text-white line-clamp-1">
              {language === 'en' ? config.titleEn : config.titleBn}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer Badge (During In-Progress) */}
          {status === 'in_progress' && (
            <AssessmentTimer
              timeRemaining={timeRemaining}
              elapsedSeconds={elapsedSeconds}
              isPaused={isPaused}
              onTogglePause={() => setIsPaused(p => !p)}
              language={language}
              onTimeExpired={handleTimeExpired}
            />
          )}

          {mode === 'modal' && onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Close Assessment"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Sub-Navigation / Question Jump Bar (In-Progress) */}
      {status === 'in_progress' && (
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between gap-3 text-xs">
          {/* Question Nav Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {config.items.map((item, idx) => {
              const isCurrent = idx === currentIndex;
              const isAnswered = answers[item.id] !== undefined;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 rounded-lg font-mono text-xs font-bold transition-all flex items-center justify-center relative ${
                    isCurrent
                      ? 'bg-slate-900 text-white shadow-xs scale-105'
                      : isAnswered
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                  title={`Question ${idx + 1}`}
                >
                  {idx + 1}
                  {isAnswered && !isCurrent && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-slate-500 font-mono shrink-0">
            <span className="font-bold text-slate-800">{answeredCount}</span>/{totalItems}{' '}
            <span className="font-sans text-[11px] hidden sm:inline">
              {language === 'en' ? 'answered' : 'উত্তর সম্পন্ন'}
            </span>
          </div>
        </div>
      )}

      {/* 3. Main Assessment Area */}
      <div className="p-6 sm:p-8 overflow-y-auto flex-1">
        {status === 'in_progress' && currentItem && (
          <div className="space-y-6">
            {/* Dispatch item view based on generic type */}
            {(currentItem.type === 'mcq' || currentItem.type === 'true_false') && (
              <MCQAssessmentView
                item={currentItem}
                selectedOptionIndex={answers[currentItem.id]}
                onSelectOption={handleAnswerMCQ}
                language={language}
                questionNumber={currentIndex + 1}
              />
            )}

            {currentItem.type === 'typing_test' && (
              <TypingAssessmentView
                item={currentItem}
                onRecordResult={handleAnswerTyping}
                language={language}
                questionNumber={currentIndex + 1}
              />
            )}

            {/* Extensible placeholder for future assessment types */}
            {currentItem.type !== 'mcq' && 
             currentItem.type !== 'true_false' && 
             currentItem.type !== 'typing_test' && (
              <div className="p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-300 text-center space-y-2">
                <Sparkles className="w-8 h-8 text-slate-400 mx-auto" />
                <h4 className="font-bold text-slate-700">Generic Assessment: {currentItem.type}</h4>
                <p className="text-xs text-slate-500">{currentItem.promptEn}</p>
              </div>
            )}
          </div>
        )}

        {/* REVIEW SCREEN */}
        {status === 'review' && submissionResult && (
          <AssessmentReview
            result={submissionResult}
            items={config.items}
            assessmentTitle={language === 'en' ? config.titleEn : config.titleBn}
            passingPercentage={passingPercentage}
            language={language}
            onRetry={handleRetry}
            onContinue={() => {
              if (onClose) onClose();
            }}
            onClose={onClose}
          />
        )}
      </div>

      {/* 4. Action Bar Footer (During In-Progress) */}
      {status === 'in_progress' && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 border border-slate-300 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>{language === 'en' ? 'Previous' : 'পূর্ববর্তী'}</span>
          </button>

          <div className="flex items-center gap-3">
            {answeredCount < totalItems && (
              <span className="text-[11px] text-amber-700 hidden sm:inline">
                {totalItems - answeredCount} {language === 'en' ? 'remaining' : 'টি বাকি'}
              </span>
            )}

            {currentIndex < totalItems - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>{language === 'en' ? 'Next Question' : 'পরবর্তী প্রশ্ন'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitAssessment}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'en' ? 'Submit Assessment' : 'পরীক্ষা জমা দিন'}</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Unanswered confirmation warning modal overlay */}
      {showConfirmSubmit && answeredCount < totalItems && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-2xs">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full space-y-4 border border-slate-200 shadow-xl">
            <div className="flex items-center gap-2.5 text-amber-600">
              <AlertCircle className="w-5 h-5" />
              <h4 className="font-bold text-slate-900 text-sm">
                {language === 'en' ? 'Unanswered Questions' : 'অনুরোধ পর্যালোচনা'}
              </h4>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {language === 'en'
                ? `You still have ${totalItems - answeredCount} unanswered questions. Are you ready to submit your assessment?`
                : `আপনার এখনও ${totalItems - answeredCount}টি প্রশ্ন অনুত্তরিত রয়েছে। আপনি কি এখন জমা দিতে চান?`}
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmSubmit(false)}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
              >
                {language === 'en' ? 'Return to Quiz' : 'ফিরে যান'}
              </button>
              <button
                type="button"
                onClick={handleSubmitAssessment}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg"
              >
                {language === 'en' ? 'Yes, Submit' : 'হ্যাঁ, জমা দিন'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  if (mode === 'modal') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
        {modalContent}
      </div>
    );
  }

  return modalContent;
};
