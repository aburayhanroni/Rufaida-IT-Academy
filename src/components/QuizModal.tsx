import React, { useState } from 'react';
import { QuizQuestion, Language } from '../types';
import { useStudent } from '../context/StudentContext';
import { 
  X, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
  quizTitle: string;
  courseId: string;
  lessonId: string;
  onQuizCompleted?: (scorePercent: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  questions,
  quizTitle,
  courseId,
  lessonId,
  onQuizCompleted
}) => {
  const { language, recordQuizResult, markLessonCompleted } = useStudent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen || !questions || questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const selectedChoice = selectedAnswers[currentIndex];
  const isCorrect = selectedChoice === currentQ.correctIndex;

  const handleSelect = (index: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return; // already answered
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: index }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setIsFinished(true);

    let correctCount = 0;
    const answerRecords = questions.map((q, idx) => {
      const userChoice = selectedAnswers[idx] ?? -1;
      if (userChoice === q.correctIndex) correctCount++;
      return {
        questionId: q.id,
        userSelected: userChoice,
        correctIndex: q.correctIndex
      };
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    recordQuizResult({
      quizTitle,
      courseId,
      lessonId,
      score: correctCount,
      total: questions.length,
      percentage,
      answers: answerRecords
    });

    if (percentage >= 50) {
      markLessonCompleted(courseId, lessonId);
    }

    if (onQuizCompleted) {
      onQuizCompleted(percentage);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setIsFinished(false);
  };

  const scoreCount = Object.entries(selectedAnswers).filter(
    ([idx, ans]) => ans === questions[Number(idx)]?.correctIndex
  ).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        id="lesson-quiz-modal"
      >
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm line-clamp-1">{quizTitle}</h3>
              <p className="text-[11px] text-slate-400">
                {language === 'en' ? 'Knowledge Assessment' : 'মূল্যায়ন পরীক্ষা'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!isFinished ? (
            <>
              {/* Progress Counter */}
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold text-emerald-700">
                  {language === 'en' 
                    ? `Question ${currentIndex + 1} of ${questions.length}` 
                    : `প্রশ্ন ${currentIndex + 1} / ${questions.length}`}
                </span>
                <div className="flex gap-1.5">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-5 h-1.5 rounded-full ${
                        i === currentIndex
                          ? 'bg-emerald-600'
                          : selectedAnswers[i] !== undefined
                          ? 'bg-slate-400'
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900 leading-snug">
                  {language === 'en' ? currentQ.questionEn : currentQ.questionBn}
                </h4>
                {language === 'en' && currentQ.questionBn && (
                  <p className="text-xs text-slate-500 font-serif">
                    {currentQ.questionBn}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {(language === 'en' ? currentQ.optionsEn : currentQ.optionsBn).map((opt, optIdx) => {
                  const isThisSelected = selectedChoice === optIdx;
                  const isThisCorrect = optIdx === currentQ.correctIndex;

                  let btnStyle = "border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800";
                  if (selectedChoice !== undefined) {
                    if (isThisCorrect) {
                      btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-bold";
                    } else if (isThisSelected && !isThisCorrect) {
                      btnStyle = "bg-rose-50 border-rose-500 text-rose-950 font-bold";
                    } else {
                      btnStyle = "opacity-50 border-slate-200";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(optIdx)}
                      disabled={selectedChoice !== undefined}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>

                      {selectedChoice !== undefined && isThisCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {selectedChoice !== undefined && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {showExplanation && (
                <div className={`p-4 rounded-xl border text-xs space-y-1 animate-in fade-in duration-150 ${
                  isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}>
                  <p className="font-bold">
                    {isCorrect 
                      ? (language === 'en' ? '✓ Correct Answer!' : '✓ সঠিক উত্তর!') 
                      : (language === 'en' ? '✕ Review Explanation:' : '✕ সঠিক ব্যাখ্যার পর্যালোচনা:')}
                  </p>
                  <p className="leading-relaxed">
                    {language === 'en' ? currentQ.explanationEn : currentQ.explanationBn}
                  </p>
                </div>
              )}
            </>
          ) : (
            /* Result Screen */
            <div className="py-4 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Award className="w-9 h-9" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-slate-900">
                  {language === 'en' ? 'Quiz Completed!' : 'কুইজ সম্পন্ন হয়েছে!'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  {language === 'en' ? 'Your test result is recorded to your student profile' : 'ফলাফল আপনার লার্নিং প্রোফাইলে সংরক্ষিত হয়েছে'}
                </p>
              </div>

              {/* Score Metric */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 max-w-xs mx-auto space-y-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase">
                  {language === 'en' ? 'Final Score' : 'প্রাপ্ত নম্বর'}
                </span>
                <p className="text-3xl font-extrabold text-emerald-600">
                  {scoreCount} / {questions.length}
                </p>
                <p className="text-xs font-semibold text-slate-700">
                  {Math.round((scoreCount / questions.length) * 100)}% Accuracy
                </p>
              </div>

              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                {scoreCount === questions.length
                  ? (language === 'en' ? 'Outstanding mastery! You got every question correct.' : 'অসাধারণ! আপনি প্রতিটি প্রশ্নের সঠিক উত্তর দিয়েছেন।')
                  : (language === 'en' ? 'Great effort! Lesson progress has been saved.' : 'খুব ভালো প্রচেষ্টা! পাঠ সম্পন্ন হিসেবে রেকর্ড করা হয়েছে।')}
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          {!isFinished ? (
            <>
              <span className="text-xs text-slate-500">
                {selectedChoice === undefined 
                  ? (language === 'en' ? 'Select an answer to continue' : 'অগ্রসর হতে একটি অপশন বেছে নিন')
                  : (language === 'en' ? 'Ready for next question' : 'পরবর্তী প্রশ্নের জন্য প্রস্তুত')}
              </span>
              <button
                onClick={handleNext}
                disabled={selectedChoice === undefined}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>{currentIndex < questions.length - 1 ? (language === 'en' ? 'Next Question' : 'পরবর্তী প্রশ্ন') : (language === 'en' ? 'See Results' : 'ফলাফল দেখুন')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={resetQuiz}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Retake Quiz' : 'পুনরায় কুইজ দিন'}</span>
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <span>{language === 'en' ? 'Continue Course' : 'পড়া চালিয়ে যান'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
