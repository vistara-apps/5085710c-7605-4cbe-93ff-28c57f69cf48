'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface FrameButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
}

export function FrameButton({ 
  variant = 'primary', 
  children, 
  onClick, 
  disabled = false,
  icon: Icon,
  className 
}: FrameButtonProps) {
  const baseClasses = 'inline-flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-blue-600 disabled:hover:bg-primary',
    secondary: 'bg-surface text-text-primary border border-gray-700 hover:bg-gray-700 disabled:hover:bg-surface'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses[variant], className)}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
}
