export function sanitizeGuestNotes(notes: string): string {
  return (notes || '').substring(0, 500).trim();
}
