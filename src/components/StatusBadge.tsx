import React from 'react';

interface StatusBadgeProps {
  status: 'pending' | 'confirmed' | 'cancelled' | 'paid' | 'unpaid' | 'active' | 'inactive';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    confirmed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    cancelled: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    paid: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    unpaid: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    inactive: 'bg-salon-muted/10 text-salon-muted border-salon-muted/20',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.inactive}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
