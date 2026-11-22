# Client Troubleshooting Guide

- **404 on /api/customer/dashboard**: Fixed by adding dual endpoint alias on backend.
- **Missing Tailwind styles**: Clear `.next` cache and restart `npm run dev`.
- **Stripe redirect loop**: Verify `NEXT_PUBLIC_API_URL` points to active port 5000.
