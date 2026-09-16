import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'maroon' | 'emerald' | 'stone' | 'rose';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'stone',
  className = '',
}) => {
  const variantStyles = {
    gold: 'bg-gold-100 text-gold-900 border-gold-300/80',
    maroon: 'bg-brand-50 text-brand-900 border-brand-200',
    emerald: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    stone: 'bg-stone-100 text-stone-700 border-stone-200',
    rose: 'bg-rose-50 text-rose-800 border-rose-200',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

