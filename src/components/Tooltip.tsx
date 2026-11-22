import React, { useState } from 'react';
export function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-[10px] text-salon-dark bg-salon-gold rounded shadow-lg whitespace-nowrap z-50">
          {text}
        </div>
      )}
    </div>
  );
}
