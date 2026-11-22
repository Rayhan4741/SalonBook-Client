import React from 'react';
import { User } from 'lucide-react';
export function UserAvatar({ src, name, size = 'w-9 h-9' }: { src?: string; name?: string; size?: string }) {
  if (src) {
    return <img src={src} alt={name || 'User'} className={`${size} rounded-full object-cover border border-salon-gold/30`} />;
  }
  const initial = name ? name.charAt(0).toUpperCase() : 'G';
  return (
    <div className={`${size} rounded-full bg-salon-gold/10 border border-salon-gold/30 flex items-center justify-center text-salon-gold font-serif font-bold text-xs`}>
      {initial}
    </div>
  );
}
