export function downloadAppointmentSummary(appointment: any) {
  const summary = [
    '========================================',
    '       SALONBOOK LUXURY SANCTUARY       ',
    '         APPOINTMENT RECEIPT            ',
    '========================================',
    'ID: ' + appointment._id,
    'Client: ' + (appointment.customerId?.name || 'Valued Guest'),
    'Email: ' + (appointment.customerId?.email || 'N/A'),
    'Treatment: ' + (appointment.serviceId?.name || 'Salon Ritual'),
    'Date: ' + appointment.appointmentDate,
    'Time: ' + appointment.timeSlot,
    'Status: ' + (appointment.status || '').toUpperCase(),
    'Payment: ' + (appointment.paymentStatus || '').toUpperCase(),
    'Amount: $' + ((appointment.serviceId?.price || 0) / 100).toFixed(2),
    '========================================',
    'Thank you for visiting SalonBook Sanctuary.'
  ].join('\n');

  const blob = new Blob([summary], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SalonBook_Receipt_${appointment._id}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
