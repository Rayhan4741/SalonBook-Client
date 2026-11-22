import React from 'react';
import { Star, Clock } from 'lucide-react';

export function ServiceRatingBadge({ rating = 4.9, reviews = 48, duration = 60 }: { rating?: number; reviews?: number; duration?: number }) {
  return (
    <div className="flex items-center gap-3 text-xs text-salon-muted">
      <div className="flex items-center gap-1 text-amber-400">
        <Star className="w-3.5 h-3.5 fill-amber-400" />
        <span className="font-semibold text-salon-creme">{rating.toFixed(1)}</span>
        <span className="text-salon-muted/60">({reviews})</span>
      </div>
      <span>•</span>
      <div className="flex items-center gap-1">
        <Clock className="w-3.5 h-3.5 text-salon-muted" />
        <span>{duration} min</span>
      </div>
    </div>
  );
}
