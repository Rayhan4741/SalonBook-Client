import React from 'react';
export function ShimmerPlaceholder({ className = 'h-6 w-full' }: { className?: string }) {
  return <div className={`animate-pulse bg-salon-card/40 rounded-xl ${className}`} />;
}
