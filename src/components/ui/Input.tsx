import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  helperText,
  error,
  leftIcon,
  rightIcon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full text-left">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-bold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full bg-white border ${
            error ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'
          } rounded-xl py-2.5 ${leftIcon ? 'pl-10' : 'pl-3.5'} ${
            rightIcon ? 'pr-10' : 'pr-3.5'
          } text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-xs disabled:bg-slate-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3.5 text-slate-400 flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-[11px] text-slate-400">{helperText}</p>}
    </div>
  );
};
