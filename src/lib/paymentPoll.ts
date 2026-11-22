import { api } from './api';

export async function pollPaymentStatus(appointmentId: string, maxAttempts = 5, intervalMs = 2000): Promise<boolean> {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await api.get(`/api/appointments/${appointmentId}`);
      if (res.data?.success && res.data?.data?.paymentStatus === 'paid') {
        return true;
      }
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  return false;
}
