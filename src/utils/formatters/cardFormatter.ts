export function formatCardNumber(val: string): string {
  return val.replace(/\D/g, '').substring(0, 16).replace(/(\d{4})/g, '$1 ').trim();
}
