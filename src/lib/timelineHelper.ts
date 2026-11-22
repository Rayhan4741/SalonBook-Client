export interface TimelineStep {
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export function getAppointmentSteps(status: string, paymentStatus: string): TimelineStep[] {
  return [
    { title: 'Requested', description: 'Treatment booked by guest', completed: true, current: false },
    { title: 'Confirmed', description: 'Reviewed & verified by salon concierge', completed: status === 'confirmed', current: status === 'pending' },
    { title: 'Payment', description: 'Processed via secure Stripe Checkout', completed: paymentStatus === 'paid', current: status === 'confirmed' && paymentStatus !== 'paid' },
    { title: 'Service Rendered', description: 'Luxury sanctuary experience completed', completed: false, current: status === 'confirmed' && paymentStatus === 'paid' }
  ];
}
