'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="h-12 w-12 text-negative" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary mb-2">
          Something went wrong!
        </h2>
        <p className="text-text-secondary mb-6">
          {error.message || 'An unexpected error occurred while loading CryptoPulse.'}
        </p>
        <button
          onClick={reset}
          className="btn-primary inline-flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
