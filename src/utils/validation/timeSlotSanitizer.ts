export function normalizeTimeSlot(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/, ' ');
}
