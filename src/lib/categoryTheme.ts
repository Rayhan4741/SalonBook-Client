export const categoryThemeMap: Record<string, { label: string; badge: string; border: string }> = {
  Hair: { label: 'Haute Coiffure', badge: 'bg-amber-500/10 text-amber-300', border: 'border-amber-500/20' },
  Skin: { label: 'Dermal Aesthetics', badge: 'bg-emerald-500/10 text-emerald-300', border: 'border-emerald-500/20' },
  Nails: { label: 'Manicure Artistry', badge: 'bg-rose-500/10 text-rose-300', border: 'border-rose-500/20' },
  Spa: { label: 'Holistic Wellness', badge: 'bg-indigo-500/10 text-indigo-300', border: 'border-indigo-500/20' },
  Default: { label: 'Bespoke Ritual', badge: 'bg-salon-gold/10 text-salon-gold', border: 'border-salon-gold/20' }
};

export function getCategoryTheme(cat: string) {
  return categoryThemeMap[cat] || categoryThemeMap.Default;
}
