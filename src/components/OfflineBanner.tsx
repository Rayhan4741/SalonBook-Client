import React, { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';
export function OfflineBanner() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  if (online) return null;
  return (
    <div className="bg-amber-500 text-stone-900 py-1.5 px-4 text-xs font-semibold text-center flex items-center justify-center gap-2">
      <WifiOff className="w-3.5 h-3.5" />
      <span>You are currently offline. Changes will sync when reconnected.</span>
    </div>
  );
}
