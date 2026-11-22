export function isPastDate(dateString: string): boolean {
  const [year, month, day] = dateString.split("-").map(Number);
  if (!year || !month || !day) return false;
  const targetDate = new Date(year, month - 1, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return targetDate < today;
}

export function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}
