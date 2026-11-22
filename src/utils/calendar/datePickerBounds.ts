export function getBookingDateBounds(maxDaysInAdvance = 60) {
  const min = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + maxDaysInAdvance);
  const max = maxDate.toISOString().split('T')[0];
  return { min, max };
}
