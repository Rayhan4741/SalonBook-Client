export interface ServiceItem {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface AppointmentItem {
  _id: string;
  serviceId: ServiceItem;
  customerId: string;
  customerName?: string;
  customerEmail?: string;
  appointmentDate: string;
  timeSlot: string;
  message?: string;
  servicePrice: number;
  paymentStatus: "unpaid" | "paid";
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface TransactionItem {
  _id: string;
  appointmentId: {
    _id: string;
    serviceId: ServiceItem;
    appointmentDate: string;
    timeSlot: string;
  };
  customerId: string;
  amount: number;
  currency: string;
  stripeSessionId: string;
  status: "paid" | "failed";
  createdAt: string;
}
