import React from 'react';

export function SkeletonLoader({ rows = 3, height = 'h-12' }: { rows?: number; height?: string }) {
  return (
    <div className="space-y-3 w-full animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={`w-full bg-salon-card/40 border border-salon-gold/10 rounded-xl ${height}`} />
      ))}
    </div>
  );
}
