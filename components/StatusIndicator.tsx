'use client';

import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  variant: 'positive' | 'negative' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export function StatusIndicator({ variant, children, className }: StatusIndicatorProps) {
  const variantClasses = {
    positive: 'text-positive bg-green-500/10 border-green-500/20',
    negative: 'text-negative bg-red-500/10 border-red-500/20',
    neutral: 'text-text-secondary bg-gray-500/10 border-gray-500/20'
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium border',
      variantClasses[variant],
      className
    )}>
      {children}
    </span>
  );
}
