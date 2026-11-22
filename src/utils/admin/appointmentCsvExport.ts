import { convertToCsv } from './csvExport';
export function exportAppointmentsCsv(appointments: any[]): void {
  const flattened = appointments.map(a => ({
    ID: a._id,
    Client: a.customerId?.name || 'Guest',
    Email: a.customerId?.email || 'N/A',
    Service: a.serviceId?.name || 'Treatment',
    Date: a.appointmentDate,
    Time: a.timeSlot,
    Status: a.status,
    Payment: a.paymentStatus,
    Amount: ((a.serviceId?.price || 0) / 100).toFixed(2),
  }));
  const csv = convertToCsv(flattened);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SalonBook_Appointments_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
