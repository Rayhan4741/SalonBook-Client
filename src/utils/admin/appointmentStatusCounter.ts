export function countAppointmentsByStatus(appointments: any[]) {
  return appointments.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}
