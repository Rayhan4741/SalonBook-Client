# Stripe Checkout Client Redirection Flow

1. User clicks "Pay Now ($XX.XX)" on confirmed appointment.
2. Client sends `POST /api/payments/checkout-session` with `appointmentId`.
3. Server returns signed Stripe Checkout URL.
4. Client navigates to Stripe Checkout hosted page.
5. On completion, Stripe redirects to `/payment/success?session_id=cs_test_...`.
