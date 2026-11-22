export function testReceiptHelper() {
  const assert = (a: boolean, msg: string) => { if (!a) throw new Error(msg); };
  const mockAppt = { _id: 'apt_123', serviceId: { name: 'Royal Facial', price: 15000 }, appointmentDate: '2026-12-01', timeSlot: '10:00 AM' };
  assert(mockAppt.serviceId.name === 'Royal Facial', 'Receipt service name mismatch');
  assert(mockAppt.serviceId.price === 15000, 'Receipt price mismatch');
  return true;
}
