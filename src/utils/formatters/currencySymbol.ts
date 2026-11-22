export function getCurrencySymbol(currency = 'USD'): string {
  const map: Record<string, string> = { USD: '$', EUR: '€', GBP: '£' };
  return map[currency.toUpperCase()] || '$';
}
