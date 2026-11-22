import React from 'react';
export function TreatmentTag({ category }: { category: string }) {
  return <span className="inline-block text-[11px] font-semibold text-salon-muted bg-salon-card px-2.5 py-1 rounded-lg border border-salon-border">{category}</span>;
}
