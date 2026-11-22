import React from 'react';
import { Sparkles } from 'lucide-react';
export function LuxuryBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-serif tracking-wider uppercase bg-salon-gold/10 border border-salon-gold/30 text-salon-gold">
      <Sparkles className="w-3 h-3" />
      <span>{text}</span>
    </span>
  );
}
