# Customer Booking and Stripe Checkout Lifecycle

1. **Service Selection**: Customer browses treatments and clicks "Book Treatment".
2. **Slot Selection**: Customer selects future date and available 1-hour time slot.
3. **Reservation Submission**: Frontend posts to `/api/appointments`.
4. **Admin Confirmation**: Salon concierge confirms the appointment in the Admin Suite.
5. **Stripe Checkout**: Once confirmed, "Pay Now" becomes active. Customer clicks to redirect to Stripe Checkout session.
6. **Payment Verification**: Stripe redirects customer to `/payment/success`. Server verifies transaction webhook.
