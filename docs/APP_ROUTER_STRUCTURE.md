# Next.js 14 App Router Hierarchy

```
src/app/
├── layout.tsx                # Root layout with fonts, providers, toast
├── page.tsx                  # Landing page (Hero, Services, CTA, Testimonials)
├── services/
│   ├── page.tsx              # Service catalog with search, filter, sort
│   └── [id]/page.tsx         # Detailed service view with booking modal
├── sign-in/page.tsx          # Guest login form & Google OAuth
├── sign-up/page.tsx          # Guest registration form with validation
├── dashboard/
│   ├── customer/page.tsx     # Guest portal (Appointments, Profile, Payments)
│   └── admin/page.tsx        # Administration suite (Overview, Services, Bookings, Users, Revenue)
└── payment/
    ├── success/page.tsx      # Stripe Checkout confirmation & receipt
    └── cancel/page.tsx       # Stripe Checkout cancellation fallback
```
