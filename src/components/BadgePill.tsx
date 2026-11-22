import React from 'react';
export function BadgePill({ label, variant = 'gold' }: { label: string; variant?: 'gold' | 'blush' | 'emerald' }) {
  const map = {
    gold: 'bg-salon-gold/10 text-salon-gold border-salon-gold/30',
    blush: 'bg-salon-blush/10 text-salon-blush border-salon-blush/30',
    emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30',
  };
  return <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${map[variant]}`}>{label}</span>;
}
