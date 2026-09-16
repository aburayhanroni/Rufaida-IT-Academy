import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="space-y-1.5 w-full text-left">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-bold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`w-full appearance-none bg-white border ${
            error ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20'
          } rounded-xl py-2.5 pl-3.5 pr-10 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 transition-all shadow-xs disabled:bg-slate-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3 pointer-events-none" />
      </div>
      {error && <p className="text-[11px] text-rose-600 font-medium">{error}</p>}
      {!error && helperText && <p className="text-[11px] text-slate-400">{helperText}</p>}
    </div>
  );
};
