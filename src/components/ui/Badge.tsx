import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'blue' | 'amber' | 'purple' | 'slate' | 'rose';
  size?: 'sm' | 'md';
  hasDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'sm',
  hasDot = false,
  className = '',
  ...props
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 font-bold',
    md: 'text-xs px-3 py-1 font-bold'
  };

  const variantStyles = {
    emerald: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
    blue: 'bg-blue-50 text-blue-800 border border-blue-200/80',
    amber: 'bg-amber-50 text-amber-900 border border-amber-200/80',
    purple: 'bg-purple-50 text-purple-900 border border-purple-200/80',
    slate: 'bg-slate-100 text-slate-800 border border-slate-200',
    rose: 'bg-rose-50 text-rose-800 border border-rose-200/80'
  };

  const dotColors = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
    slate: 'bg-slate-500',
    rose: 'bg-rose-500'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {hasDot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
