import React from 'react';
export function KeyboardShortcut({ combo }: { combo: string }) {
  return <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-salon-card border border-salon-border text-salon-muted shadow-sm">{combo}</kbd>;
}
