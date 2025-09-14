'use client';

import { Bell, BellOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertToggleProps {
  active: boolean;
  onToggle: () => void;
  label: string;
  variant?: 'active' | 'inactive';
}

export function AlertToggle({ active, onToggle, label, variant }: AlertToggleProps) {
  const Icon = active ? Bell : BellOff;

  return (
    <button
      onClick={onToggle}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
        active 
          ? 'bg-accent/20 text-accent border border-accent/30' 
          : 'bg-surface text-text-secondary border border-gray-700 hover:bg-gray-700'
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );
}
