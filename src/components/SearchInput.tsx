import React from 'react';
import { Search, X } from 'lucide-react';
export function SearchInput({ value, onChange, placeholder = 'Search...' }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-salon-muted" />
      <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full pl-9 pr-8 py-2 bg-salon-dark/60 border border-salon-gold/20 rounded-xl text-xs text-salon-creme focus:outline-none focus:border-salon-gold" />
      {value && <button onClick={() => onChange('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-salon-muted hover:text-salon-creme"><X className="w-3.5 h-3.5" /></button>}
    </div>
  );
}
