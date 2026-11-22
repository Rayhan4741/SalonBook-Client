import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
export function NotificationBanner({ type = 'success', message }: { type?: 'success' | 'error'; message: string }) {
  const isErr = type === 'error';
  return (
    <div className={`flex items-center gap-2 p-3 rounded-xl border text-xs ${isErr ? 'bg-rose-500/10 border-rose-500/20 text-rose-300' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'}`}>
      {isErr ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
      <span>{message}</span>
    </div>
  );
}
