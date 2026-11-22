import React from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export function ErrorBoundaryView({ reset }: { reset?: () => void }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-4">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <h2 className="text-2xl font-serif font-bold text-salon-creme mb-2">Unexpected Complication</h2>
      <p className="text-sm text-salon-muted max-w-md mb-6">
        An unexpected error occurred while rendering this view. Your session and bookings remain secure.
      </p>
      <div className="flex gap-4">
        {reset && (
          <button onClick={reset} className="px-5 py-2.5 rounded-full bg-salon-gold text-salon-dark font-medium text-xs flex items-center gap-2">
            <RefreshCw className="w-3.5 h-3.5" /> Try Again
          </button>
        )}
        <Link href="/" className="px-5 py-2.5 rounded-full border border-salon-gold/30 text-salon-creme text-xs">
          Return Home
        </Link>
      </div>
    </div>
  );
}
