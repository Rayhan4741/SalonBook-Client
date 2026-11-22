export function getRemainingChars(text: string, maxLimit = 500): number {
  return Math.max(0, maxLimit - (text ? text.length : 0));
}
