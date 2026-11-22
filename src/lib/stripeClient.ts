import { api } from './api';

export async function initiateStripeCheckout(appointmentId: string): Promise<string> {
  const res = await api.post('/api/payments/checkout-session', { appointmentId });
  if (res.data?.success && res.data?.url) {
    return res.data.url;
  }
  throw new Error(res.data?.message || 'Failed to initialize Stripe Checkout session');
}
