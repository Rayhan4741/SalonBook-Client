import React from 'react';
export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
      {eyebrow && <span className="text-[11px] font-bold uppercase tracking-widest text-salon-blush">{eyebrow}</span>}
      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-charcoal">{title}</h2>
      {subtitle && <p className="text-xs sm:text-sm text-salon-muted leading-relaxed font-sans">{subtitle}</p>}
    </div>
  );
}
