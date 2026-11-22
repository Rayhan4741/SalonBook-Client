import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-salon-gold/20 border border-salon-gold/30 text-salon-gold hover:bg-salon-gold hover:text-salon-dark transition-all">
      <ArrowUp className="w-4 h-4" />
    </button>
  );
}
