import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { 
  Keyboard, 
  RotateCcw, 
  Trophy, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  Flame, 
  Info,
  Sparkles,
  Maximize2,
  Minimize2,
  ChevronDown
} from 'lucide-react';
import { useStudent } from '../../context/StudentContext';
import { 
  TYPING_DRILLS, 
  KEYBOARD_FINGER_MAP, 
  TypingDrill, 
  TypingCategory,
  SUPPORTED_KEYBOARD_LAYOUTS,
  KeyboardLayoutDefinition 
} from '../../data/typingLessons.ts';
import { TypingSessionResult } from '../../types';

export interface TypingEngineProps {
  mode?: 'standalone' | 'embedded';
  initialCategory?: TypingCategory;
  initialDrillId?: string;
  onCompleteDrill?: (result: TypingSessionResult) => void;
  showKeyboard?: boolean;
  showFingerGuide?: boolean;
  titleOverride?: string;
}

const KEYBOARD_ROWS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.']
];

export const TypingEngine: React.FC<TypingEngineProps> = ({
  mode = 'standalone',
  initialCategory = 'home_row',
  initialDrillId,
  onCompleteDrill,
  showKeyboard: defaultShowKeyboard = true,
  showFingerGuide: defaultShowFingerGuide = true,
  titleOverride
}) => {
  const { language, typingStats, recordTypingSession } = useStudent();

  const [selectedCategory, setSelectedCategory] = useState<TypingCategory>(initialCategory);
  const [activeDrillIndex, setActiveDrillIndex] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [showKeyboard, setShowKeyboard] = useState<boolean>(defaultShowKeyboard);
  const [showFingerGuide, setShowFingerGuide] = useState<boolean>(defaultShowFingerGuide);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [lastSessionResult, setLastSessionResult] = useState<TypingSessionResult | null>(null);
  const [showLayoutArchitectureModal, setShowLayoutArchitectureModal] = useState<boolean>(false);
  const [selectedLayoutId, setSelectedLayoutId] = useState<string>('qwerty_en');

  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Filter drills based on active category
  const filteredDrills = useMemo(() => {
    return TYPING_DRILLS.filter(d => d.category === selectedCategory);
  }, [selectedCategory]);

  // Set initial drill if initialDrillId is passed
  useEffect(() => {
    if (initialDrillId) {
      const idx = filteredDrills.findIndex(d => d.id === initialDrillId);
      if (idx !== -1) {
        setActiveDrillIndex(idx);
      }
    }
  }, [initialDrillId, filteredDrills]);

  const currentDrill: TypingDrill = filteredDrills[activeDrillIndex] || filteredDrills[0] || TYPING_DRILLS[0];
  const targetText = currentDrill.text;
  const isTimed = !!currentDrill.timedSeconds;
  const timeLimit = currentDrill.timedSeconds || 0;

  // Sound effects generator
  const playFeedbackSound = useCallback((type: 'click' | 'error' | 'complete') => {
    if (!soundEnabled) return;
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(540, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'error') {
        osc.frequency.setValueAtTime(160, ctx.currentTime);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === 'complete') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // Audio might be blocked by browser policy until gesture
    }
  }, [soundEnabled]);

  // Reset drill state
  const resetDrill = useCallback(() => {
    setUserInput('');
    setStartTime(null);
    setElapsedSeconds(0);
    setIsCompleted(false);
    setErrorsCount(0);
    setLastSessionResult(null);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  useEffect(() => {
    resetDrill();
  }, [activeDrillIndex, selectedCategory, resetDrill]);

  // Timer loop
  useEffect(() => {
    if (startTime && !isCompleted) {
      timerRef.current = setInterval(() => {
        const seconds = Math.floor((Date.now() - startTime) / 1000);
        setElapsedSeconds(seconds);

        // Check timed test timeout
        if (isTimed && seconds >= timeLimit) {
          handleFinishSession(true);
        }
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, isCompleted, isTimed, timeLimit]);

  // Finish session handler
  const handleFinishSession = useCallback((forcedTimeout = false) => {
    if (isCompleted) return;
    setIsCompleted(true);
    playFeedbackSound('complete');

    const totalSeconds = elapsedSeconds > 0 ? elapsedSeconds : 1;
    const minutes = totalSeconds / 60;
    const totalChars = userInput.length;
    const words = totalChars / 5;
    const grossWpm = Math.round(words / minutes) || 0;
    const netWpm = Math.max(0, Math.round((words - (errorsCount / 5)) / minutes));
    const accuracy = totalChars > 0 
      ? Math.max(0, Math.round(((totalChars - errorsCount) / totalChars) * 100)) 
      : 100;

    const resultStatus = recordTypingSession(
      currentDrill.titleEn,
      netWpm,
      accuracy,
      errorsCount,
      minutes,
      currentDrill.category,
      totalSeconds
    );

    const sessionRes: TypingSessionResult = {
      drillId: currentDrill.id,
      drillTitle: currentDrill.titleEn,
      category: currentDrill.category,
      wpm: grossWpm,
      netWpm,
      accuracy,
      errorCount: errorsCount,
      totalKeystrokes: totalChars,
      durationSeconds: totalSeconds,
      isNewPersonalBest: resultStatus.isNewPersonalBest,
      completedAt: new Date().toISOString()
    };

    setLastSessionResult(sessionRes);
    if (onCompleteDrill) {
      onCompleteDrill(sessionRes);
    }
  }, [
    isCompleted, 
    elapsedSeconds, 
    userInput.length, 
    errorsCount, 
    currentDrill, 
    recordTypingSession, 
    playFeedbackSound, 
    onCompleteDrill
  ]);

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCompleted) return;
    const val = e.target.value;

    if (!startTime) {
      setStartTime(Date.now());
    }

    const currentLen = val.length;
    const prevLen = userInput.length;

    // Detect if new character typed was an error
    if (currentLen > prevLen) {
      const typedChar = val[currentLen - 1];
      const targetChar = targetText[currentLen - 1];
      if (typedChar !== targetChar) {
        setErrorsCount(prev => prev + 1);
        playFeedbackSound('error');
      } else {
        playFeedbackSound('click');
      }
    }

    setUserInput(val);

    // If completed target text
    if (val.length >= targetText.length) {
      handleFinishSession();
    }
  };

  // Metrics calculations for live display
  const effectiveMinutes = elapsedSeconds > 0 ? elapsedSeconds / 60 : 0.01;
  const liveGrossWpm = startTime ? Math.round((userInput.length / 5) / effectiveMinutes) : 0;
  const liveAccuracy = userInput.length > 0
    ? Math.max(0, Math.round(((userInput.length - errorsCount) / userInput.length) * 100))
    : 100;

  const currentChar = targetText[userInput.length] || '';
  const currentKeyLookup = currentChar.toLowerCase();
  const fingerGuide = KEYBOARD_FINGER_MAP[currentKeyLookup] || { 
    finger: currentChar === ' ' ? 'Thumb' : 'Finger', 
    hand: 'both', 
    color: 'border-slate-300 bg-slate-100' 
  };

  const progressPercent = Math.min(100, Math.round((userInput.length / targetText.length) * 100));
  const timeRemaining = isTimed ? Math.max(0, timeLimit - elapsedSeconds) : null;

  return (
    <div className={`flex flex-col bg-white border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden ${mode === 'standalone' ? 'p-5 sm:p-6' : 'p-4'}`}>
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 shadow-xs">
            <Keyboard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                {titleOverride || (language === 'en' ? 'Interactive Typing Engine' : 'ইন্টারেক্টিভ টাইপিং ইঞ্জিন')}
              </h2>
              <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-100/80 text-emerald-800 rounded-full">
                {currentDrill.level}
              </span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-1">
              {language === 'en' ? currentDrill.titleEn : currentDrill.titleBn}
            </p>
          </div>
        </div>

        {/* Toolbar actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Sound toggle */}
          <button
            id="typing-sound-toggle-btn"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl text-xs font-semibold border transition-all ${
              soundEnabled 
                ? 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/70' 
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
            title={soundEnabled ? 'Mute key clicks' : 'Unmute key clicks'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Keyboard toggle */}
          <button
            id="typing-keyboard-toggle-btn"
            onClick={() => setShowKeyboard(!showKeyboard)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              showKeyboard 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Keyboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{showKeyboard ? (language === 'en' ? 'Hide Keyboard' : 'কীবোর্ড লুকান') : (language === 'en' ? 'Show Keyboard' : 'কীবোর্ড দেখুন')}</span>
          </button>

          {/* Reset button */}
          <button
            id="typing-reset-btn"
            onClick={resetDrill}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            title={language === 'en' ? 'Reset Drill' : 'রিসেট করুন'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Bangla & Multi-layout architecture badge */}
          <button
            id="typing-layout-architecture-btn"
            onClick={() => setShowLayoutArchitectureModal(true)}
            className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            title="View Multi-language & Bangla Typing Architecture"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">Layouts</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-amber-200">EN</span>
          </button>
        </div>
      </div>

      {/* Category selector tabs (in standalone mode or when requested) */}
      <div className="pt-3 pb-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
        {[
          { key: 'home_row', labelEn: 'Home Row', labelBn: 'হোম রো' },
          { key: 'keyboard_practice', labelEn: 'Keyboard Practice', labelBn: 'কীবোর্ড প্র্যাকটিস' },
          { key: 'letters', labelEn: 'Letters', labelBn: 'অক্ষর ড্রিল' },
          { key: 'words', labelEn: 'Words', labelBn: 'শব্দ ড্রিল' },
          { key: 'sentences', labelEn: 'Sentences', labelBn: 'বাক্য ড্রিল' },
          { key: 'timed_test', labelEn: 'Timed Test', labelBn: 'টাইমড টেস্ট' },
          { key: 'bangla_preview', labelEn: 'Bangla Prep', labelBn: 'বাংলা প্রস্তুতি' }
        ].map(cat => {
          const isActive = selectedCategory === cat.key;
          return (
            <button
              key={cat.key}
              id={`typing-cat-btn-${cat.key}`}
              onClick={() => {
                setSelectedCategory(cat.key as TypingCategory);
                setActiveDrillIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all text-xs ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-xs font-semibold'
                  : 'bg-slate-100/80 hover:bg-slate-200/70 text-slate-600'
              }`}
            >
              {language === 'en' ? cat.labelEn : cat.labelBn}
            </button>
          );
        })}
      </div>

      {/* Drill Selector dropdown if category has multiple drills */}
      {filteredDrills.length > 1 && (
        <div className="py-2 flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium whitespace-nowrap">
            {language === 'en' ? 'Select Drill:' : 'পাঠ নির্বাচন:'}
          </span>
          <select
            id="typing-drill-select"
            value={activeDrillIndex}
            onChange={(e) => setActiveDrillIndex(Number(e.target.value))}
            className="flex-1 max-w-md py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30"
          >
            {filteredDrills.map((d, i) => (
              <option key={d.id} value={i}>
                {i + 1}. {language === 'en' ? d.titleEn : d.titleBn} ({d.level})
              </option>
            ))}
          </select>
          <span className="text-xs text-slate-400 font-mono">
            {activeDrillIndex + 1}/{filteredDrills.length}
          </span>
        </div>
      )}

      {/* Pedagogical instruction prompt */}
      <div className="my-2 p-3 bg-slate-50/90 border border-slate-200/80 rounded-xl flex items-start gap-2.5 text-xs text-slate-600">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div className="flex-1 leading-relaxed">
          <span className="font-semibold text-slate-800">
            {language === 'en' ? 'Posture & Technique Tip: ' : 'সঠিক টাইপিং কৌশল: '}
          </span>
          {language === 'en' ? currentDrill.descriptionEn : currentDrill.descriptionBn}
          {currentDrill.banglaPhoneticHint && (
            <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 text-emerald-800 font-medium">
              <span className="text-slate-500">{language === 'en' ? 'Bengali Translation:' : 'বাংলা অর্থ / উচ্চারণ:'} </span>
              {currentDrill.banglaPhoneticHint}
            </div>
          )}
        </div>
      </div>

      {/* Live Stats Scoreboard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
        {/* WPM */}
        <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>WPM</span>
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
            {liveGrossWpm}
          </div>
          <span className="text-[10px] text-slate-400">Target: {currentDrill.targetWpm} WPM</span>
        </div>

        {/* Accuracy */}
        <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === 'en' ? 'Accuracy' : 'সঠিকতা'}</span>
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono mt-0.5">
            {liveAccuracy}%
          </div>
          <span className="text-[10px] text-slate-400">Target: 95%+</span>
        </div>

        {/* Errors */}
        <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
            <span>{language === 'en' ? 'Errors' : 'ভুল'}</span>
          </div>
          <div className="text-2xl font-black text-rose-600 font-mono mt-0.5">
            {errorsCount}
          </div>
          <span className="text-[10px] text-slate-400">{language === 'en' ? 'Mistakes' : 'টি ভুল হয়েছে'}</span>
        </div>

        {/* Time / Countdown */}
        <div className="p-3 bg-slate-50 border border-slate-200/70 rounded-xl text-center">
          <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>{isTimed ? (language === 'en' ? 'Time Left' : 'বাকি সময়') : (language === 'en' ? 'Time' : 'সময়')}</span>
          </div>
          <div className={`text-2xl font-black font-mono mt-0.5 ${isTimed && (timeRemaining || 0) <= 10 ? 'text-rose-600 animate-pulse' : 'text-slate-900'}`}>
            {isTimed ? `${timeRemaining}s` : `${elapsedSeconds}s`}
          </div>
          <span className="text-[10px] text-slate-400">
            {isTimed ? `${timeLimit}s Test` : (language === 'en' ? 'Self-paced' : 'স্বাভাবিক')}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-3">
        <div 
          className="bg-emerald-600 h-full transition-all duration-150 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Interactive Typing Stage & Visual Feedback Display */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="relative p-5 bg-white rounded-xl border-2 border-slate-200 hover:border-emerald-300 focus-within:border-emerald-500 transition-all cursor-text min-h-[120px] flex flex-col justify-center shadow-inner"
      >
        {/* Hidden Accessible Real Input */}
        <input
          ref={inputRef}
          id="typing-active-input-element"
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="opacity-0 absolute inset-0 w-full h-full cursor-text pointer-events-auto"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          autoFocus
          disabled={isCompleted}
        />

        {/* Formatted Target Text with character-by-character coloring */}
        <div className="font-mono text-base sm:text-lg leading-relaxed select-none tracking-wide text-left break-words">
          {targetText.split('').map((char, index) => {
            const isTyped = index < userInput.length;
            const isCurrent = index === userInput.length;
            const isCorrect = isTyped && userInput[index] === char;
            const isMistake = isTyped && userInput[index] !== char;

            let charClass = "text-slate-400"; // default upcoming
            if (isCorrect) {
              charClass = "text-emerald-700 bg-emerald-100/60 font-medium rounded-xs";
            } else if (isMistake) {
              charClass = "text-white bg-rose-600 font-bold rounded-xs";
            }

            return (
              <span
                key={index}
                className={`relative transition-colors ${charClass} ${
                  isCurrent 
                    ? 'border-b-3 border-amber-500 bg-amber-100/80 text-slate-900 font-bold animate-pulse' 
                    : ''
                }`}
              >
                {char === ' ' ? (isMistake ? '␣' : ' ') : char}
                {isCurrent && (
                  <span className="absolute -top-1 left-0 w-full h-full bg-amber-400/20 pointer-events-none rounded-xs" />
                )}
              </span>
            );
          })}
        </div>

        {/* Input prompt hint when idle */}
        {!startTime && userInput.length === 0 && (
          <div className="absolute inset-x-0 bottom-2 text-center pointer-events-none">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-xs animate-bounce">
              {language === 'en' ? 'Click here or press any key to start typing...' : 'টাইপ শুরু করতে এখানে ক্লিক করে যেকোনো কী চাপুন...'}
            </span>
          </div>
        )}
      </div>

      {/* Next Key & Recommended Finger Guide Banner */}
      {showFingerGuide && currentChar && !isCompleted && (
        <div className="mt-3 p-3 bg-emerald-50/70 border border-emerald-200/90 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">
              {language === 'en' ? 'Next Key:' : 'পরবর্তী কী:'}
            </span>
            <kbd className="px-2.5 py-1 bg-white border border-slate-300 rounded font-mono font-black text-emerald-800 text-sm shadow-xs">
              {currentChar === ' ' ? 'Spacebar' : currentChar.toUpperCase()}
            </kbd>
          </div>
          <div className="flex items-center gap-2 text-slate-800 font-medium">
            <span>{language === 'en' ? 'Recommended Finger:' : 'আঙুলের নির্দেশিকা:'}</span>
            <span className="font-bold px-2.5 py-1 bg-white border border-emerald-300 rounded-lg text-emerald-800 shadow-xs">
              {fingerGuide.finger} ({fingerGuide.hand.toUpperCase()})
            </span>
          </div>
        </div>
      )}

      {/* Visual Interactive Keyboard with Tactile Bump Indicators */}
      {showKeyboard && (
        <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2.5 select-none shadow-md">
          <div className="flex items-center justify-between text-[11px] text-slate-400 pb-1 border-b border-slate-800">
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              <Keyboard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Tactile Bump & Finger Zone Guide</span>
            </span>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-blue-300">
                <span className="w-2 h-2 rounded-full bg-blue-400" /> Index
              </span>
              <span className="flex items-center gap-1 text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Middle
              </span>
              <span className="flex items-center gap-1 text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-400" /> Ring
              </span>
              <span className="flex items-center gap-1 text-pink-300">
                <span className="w-2 h-2 rounded-full bg-pink-400" /> Pinky
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 items-center pt-1">
            {KEYBOARD_ROWS.map((row, rIdx) => (
              <div key={rIdx} className="flex gap-1 sm:gap-1.5 justify-center w-full">
                {row.map(k => {
                  const isExpected = currentKeyLookup === k;
                  const isHomeBump = k === 'f' || k === 'j';

                  let keyBg = "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700";
                  if (isExpected) {
                    keyBg = "bg-amber-400 text-slate-950 font-black ring-4 ring-amber-300 scale-105 shadow-lg z-10 animate-bounce";
                  }

                  return (
                    <div
                      key={k}
                      className={`h-8 w-8 sm:h-10 sm:w-10 rounded-lg border flex flex-col items-center justify-center font-mono text-xs font-bold transition-all relative ${keyBg}`}
                    >
                      <span>{k.toUpperCase()}</span>
                      {/* Tactile Raised Bump Indicator for F and J */}
                      {isHomeBump && (
                        <div 
                          className="w-2.5 h-0.5 bg-amber-400 rounded-full mt-0.5" 
                          title="Tactile index finger anchor bump" 
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Spacebar Row */}
            <div className="flex justify-center w-full pt-1">
              <div
                className={`h-8 sm:h-9 w-60 sm:w-72 rounded-lg border flex items-center justify-center font-mono text-xs font-semibold transition-all ${
                  currentChar === ' '
                    ? 'bg-amber-400 text-slate-950 font-black ring-4 ring-amber-300 scale-105 shadow-lg animate-pulse'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                SPACEBAR (Left / Right Thumbs)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal / Scorecard with Personal Best Notification */}
      {isCompleted && lastSessionResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4">
            
            {/* Trophy or Personal Best Icon */}
            <div className="relative mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shadow-inner">
              <Trophy className="w-8 h-8" />
              {lastSessionResult.isNewPersonalBest && (
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-amber-500 text-white font-black text-[10px] rounded-full uppercase tracking-wider shadow-sm animate-bounce">
                  NEW PB!
                </span>
              )}
            </div>

            {/* Title & Celebration */}
            <div>
              {lastSessionResult.isNewPersonalBest ? (
                <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-bold mb-2">
                  🏆 New Personal Best Speed Achieved!
                </div>
              ) : null}
              <h3 className="text-xl font-extrabold text-slate-900">
                {language === 'en' ? 'Drill Completed!' : 'টাইপিং ড্রিল সম্পন্ন হয়েছে!'}
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                {currentDrill.titleEn}
              </p>
            </div>

            {/* Result Stats Grid */}
            <div className="grid grid-cols-3 gap-2.5 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="text-center">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Speed</span>
                <span className="text-2xl font-black text-emerald-600 font-mono">{lastSessionResult.netWpm}</span>
                <span className="text-[10px] text-slate-500 block font-medium">Net WPM</span>
              </div>
              <div className="border-x border-slate-200 text-center px-2">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Accuracy</span>
                <span className="text-2xl font-black text-slate-800 font-mono">{lastSessionResult.accuracy}%</span>
                <span className="text-[10px] text-slate-500 block font-medium">Correctness</span>
              </div>
              <div className="text-center">
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Errors</span>
                <span className="text-2xl font-black text-rose-600 font-mono">{lastSessionResult.errorCount}</span>
                <span className="text-[10px] text-slate-500 block font-medium">Mistakes</span>
              </div>
            </div>

            {/* Performance analysis commentary */}
            <div className="text-xs text-slate-600 bg-emerald-50/70 border border-emerald-100 p-3 rounded-xl">
              {lastSessionResult.netWpm >= currentDrill.targetWpm ? (
                language === 'en' 
                  ? `Great work! You reached your target speed of ${currentDrill.targetWpm} WPM. Keep practicing to solidify your muscle memory.`
                  : `চমৎকার! আপনি সফলভাবে লক্ষ্যমাত্রা ${currentDrill.targetWpm} WPM অর্জন করেছেন। নিয়মিত অনুশীলনে দক্ষতা স্থায়ী হবে।`
              ) : (
                language === 'en'
                  ? `Good effort! You typed at ${lastSessionResult.netWpm} WPM. Focus on accuracy first; speed naturally follows precision.`
                  : `ভালো প্রচেষ্টা! গতি ছিল ${lastSessionResult.netWpm} WPM। আগে নির্ভুলতার দিকে খেয়াল রাখুন, গতি আপনা থেকেই বৃদ্ধি পাবে।`
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2.5 pt-2">
              <button
                id="typing-try-again-btn"
                onClick={resetDrill}
                className="flex-1 py-2.5 border border-slate-200 hover:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'en' ? 'Try Again' : 'আবার করুন'}</span>
              </button>

              <button
                id="typing-next-drill-btn"
                onClick={() => {
                  if (activeDrillIndex < filteredDrills.length - 1) {
                    setActiveDrillIndex(prev => prev + 1);
                  } else {
                    resetDrill();
                  }
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>{language === 'en' ? 'Next Drill' : 'পরবর্তী পাঠ'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multi-layout and Bangla Architecture Information Modal */}
      {showLayoutArchitectureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Keyboard Layouts & Bangla Architecture
                  </h3>
                  <p className="text-xs text-slate-500">
                    Engineered for seamless bilingual touch typing progression
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLayoutArchitectureModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-600 leading-relaxed">
                The typing engine is architected with a pluggable layout matrix. English QWERTY is currently the active standard engine. Bangla Avro Phonetic and Bangla Bijoy/National standards are pre-structured for Phase 2 integration.
              </p>

              <div className="space-y-2">
                {SUPPORTED_KEYBOARD_LAYOUTS.map(layout => (
                  <div
                    key={layout.id}
                    className={`p-3 rounded-xl border text-xs flex flex-col gap-1 transition-all ${
                      layout.isReady 
                        ? 'bg-emerald-50/60 border-emerald-200 text-slate-800' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{layout.name}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        layout.isReady 
                          ? 'bg-emerald-600 text-white' 
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {layout.isReady ? 'Active Engine' : 'Phase 2 Architecture Ready'}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">
                      {language === 'en' ? layout.descriptionEn : layout.descriptionBn}
                    </p>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Note: {layout.notes}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowLayoutArchitectureModal(false)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
export default TypingEngine;
