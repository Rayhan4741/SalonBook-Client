export function generateIcsCalendarEvent(appointment: any): string {
  const title = appointment.serviceId?.name || 'Salon Appointment';
  const desc = 'Luxury treatment at SalonBook Sanctuary';
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${desc}`,
    `DTSTART:${appointment.appointmentDate.replace(/-/g, '')}T090000Z`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}
