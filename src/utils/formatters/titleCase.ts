export function toTitleCase(str: string): string {
  if (!str) return '';
  return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
}
