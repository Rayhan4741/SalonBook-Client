import React from 'react';
export function PriceTag({ priceCents }: { priceCents: number }) {
  return (
    <div className="font-serif">
      <span className="text-sm text-salon-gold font-medium">$</span>
      <span className="text-xl font-bold text-salon-creme">{(priceCents / 100).toFixed(2)}</span>
    </div>
  );
}
