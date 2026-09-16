import React from 'react';
import { GenericAssessmentItem, Language } from '../../types';
import { CheckCircle2, Circle } from 'lucide-react';

interface MCQAssessmentViewProps {
  item: GenericAssessmentItem;
  selectedOptionIndex: number | undefined;
  onSelectOption: (index: number) => void;
  language: Language;
  disabled?: boolean;
  questionNumber: number;
}

export const MCQAssessmentView: React.FC<MCQAssessmentViewProps> = ({
  item,
  selectedOptionIndex,
  onSelectOption,
  language,
  disabled = false,
  questionNumber
}) => {
  const options = language === 'en' 
    ? (item.optionsEn || []) 
    : (item.optionsBn || item.optionsEn || []);

  return (
    <div className="space-y-6" id={`assessment-mcq-item-${item.id}`}>
      {/* Question Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            {item.type === 'true_false' 
              ? (language === 'en' ? 'True / False' : 'সত্য / মিথ্যা')
              : (language === 'en' ? `Question ${questionNumber}` : `প্রশ্ন ${questionNumber}`)}
          </span>
          {item.points && (
            <span className="text-[11px] font-medium text-slate-400">
              {item.points} {language === 'en' ? 'Points' : 'পয়েন্ট'}
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {language === 'en' ? item.promptEn : item.promptBn || item.promptEn}
        </h3>

        {language === 'en' && item.promptBn && (
          <p className="text-xs sm:text-sm text-slate-500 font-serif leading-relaxed">
            {item.promptBn}
          </p>
        )}
      </div>

      {/* Options List */}
      <div className="space-y-3" role="radiogroup" aria-label={item.promptEn}>
        {options.map((optionText, idx) => {
          const isSelected = selectedOptionIndex === idx;
          const letter = String.fromCharCode(65 + idx);

          return (
            <button
              key={idx}
              type="button"
              disabled={disabled}
              onClick={() => onSelectOption(idx)}
              className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between gap-3 text-xs sm:text-sm ${
                isSelected
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
              } ${disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
            >
              <div className="flex items-center gap-3.5">
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                  isSelected 
                    ? 'bg-emerald-600 text-white shadow-2xs' 
                    : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                }`}>
                  {letter}
                </span>
                <span className="leading-relaxed">{optionText}</span>
              </div>

              <div className="shrink-0">
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-300" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
