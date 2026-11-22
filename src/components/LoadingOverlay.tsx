import React from 'react';
import { Loader2 } from 'lucide-react';
export function LoadingOverlay({ message = 'Connecting to sanctuary...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
      <Loader2 className="w-8 h-8 text-salon-gold animate-spin" />
      <p className="text-xs font-serif tracking-widest text-salon-creme uppercase">{message}</p>
    </div>
  );
}
