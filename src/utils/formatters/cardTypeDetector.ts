export function detectCardType(numberStr: string): 'visa' | 'mastercard' | 'amex' | 'generic' {
  const clean = numberStr.replace(/\D/g, '');
  if (/^4/.test(clean)) return 'visa';
  if (/^5[1-5]/.test(clean)) return 'mastercard';
  if (/^3[47]/.test(clean)) return 'amex';
  return 'generic';
}
