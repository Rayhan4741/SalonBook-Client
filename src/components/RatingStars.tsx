import React from 'react';
import { Star } from 'lucide-react';
export function RatingStars({ rating = 5 }: { rating?: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'fill-amber-400' : 'text-stone-300'}`} />
      ))}
    </div>
  );
}
