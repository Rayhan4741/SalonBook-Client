export function canReschedule(status: string): boolean {
  return status === 'pending' || status === 'confirmed';
}
