import React, { useEffect } from 'react';
import { Clock, Pause, Play, AlertCircle } from 'lucide-react';
import { Language } from '../../types';

interface AssessmentTimerProps {
  timeRemaining: number | null; // null if untimed (will count elapsed time)
  elapsedSeconds: number;
  isPaused: boolean;
  onTogglePause?: () => void;
  language: Language;
  onTimeExpired?: () => void;
}

export const AssessmentTimer: React.FC<AssessmentTimerProps> = ({
  timeRemaining,
  elapsedSeconds,
  isPaused,
  onTogglePause,
  language,
  onTimeExpired
}) => {
  // Check if countdown expired
  useEffect(() => {
    if (timeRemaining !== null && timeRemaining <= 0) {
      onTimeExpired?.();
    }
  }, [timeRemaining, onTimeExpired]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(Math.max(0, totalSeconds) / 60);
    const secs = Math.max(0, totalSeconds) % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isCountdown = timeRemaining !== null;
  const displaySeconds = isCountdown ? (timeRemaining ?? 0) : elapsedSeconds;
  const isCritical = isCountdown && (timeRemaining ?? 0) <= 20;
  const isWarning = isCountdown && (timeRemaining ?? 0) <= 45 && !isCritical;

  return (
    <div 
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all shadow-2xs ${
        isCritical 
          ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse' 
          : isWarning
          ? 'bg-amber-50 border-amber-300 text-amber-800'
          : 'bg-slate-100/90 border-slate-200 text-slate-700'
      }`}
      id="assessment-timer-badge"
    >
      <Clock className={`w-3.5 h-3.5 ${isCritical ? 'text-rose-600' : isWarning ? 'text-amber-600' : 'text-slate-500'}`} />
      
      <span>
        {formatTime(displaySeconds)}
      </span>

      {isCountdown && (
        <span className="text-[10px] uppercase font-sans tracking-wider font-semibold opacity-75">
          {language === 'en' ? 'Left' : 'বাকি'}
        </span>
      )}

      {onTogglePause && (
        <button
          type="button"
          onClick={onTogglePause}
          className="ml-1 p-1 hover:bg-black/5 rounded-md transition-colors"
          title={isPaused ? "Resume Timer" : "Pause Timer"}
        >
          {isPaused ? <Play className="w-3 h-3 text-emerald-600" /> : <Pause className="w-3 h-3 text-slate-500" />}
        </button>
      )}

      {isCritical && (
        <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
      )}
    </div>
  );
};
