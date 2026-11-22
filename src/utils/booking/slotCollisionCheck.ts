export function isSlotTaken(slot: string, bookedSlots: string[]): boolean {
  return bookedSlots.includes(slot);
}
