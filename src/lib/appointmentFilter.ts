export function filterAppointmentsByTab(appointments: any[], tab: string) {
  if (tab === 'all') return appointments;
  if (tab === 'pending') return appointments.filter((a) => a.status === 'pending');
  if (tab === 'confirmed') return appointments.filter((a) => a.status === 'confirmed');
  if (tab === 'cancelled') return appointments.filter((a) => a.status === 'cancelled');
  if (tab === 'unpaid') return appointments.filter((a) => a.paymentStatus === 'unpaid' && a.status !== 'cancelled');
  if (tab === 'paid') return appointments.filter((a) => a.paymentStatus === 'paid');
  return appointments;
}
