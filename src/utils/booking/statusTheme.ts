export function getStatusColorClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'confirmed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    case 'pending': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
    case 'cancelled': return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    default: return 'text-salon-muted bg-salon-card border-salon-border';
  }
}
