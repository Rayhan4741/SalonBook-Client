# SalonBook — Next.js Client Frontend

Luxury salon appointment booking web application for **SalonBook — Salon Appointment Booking Platform**. Built with Next.js, React, TypeScript, Tailwind CSS, Better Auth, and Stripe.

---

## 🌟 Features & User Journeys

- **Editorial Luxury Aesthetic**: Warm ivory background (`#FAF7F5`), deep charcoal text, and muted rose/blush accents (`#D9777F`) with refined typography.
- **Dynamic Service Catalog**: Real-time browsing, instant live search, category filtering, and price sorting (Low to High, High to Low).
- **Protected Service Details**: Full treatment description, duration, pricing, and conflict-checked booking modal.
- **Interactive Appointment Booking**: Date selection (past dates prevented), predefined time slot grid, snapshot price lock, and atomic conflict prevention.
- **Comprehensive Guest Dashboard**:
  - Real-time booking statistics (Total, Pending, Confirmed, Cancelled).
  - Appointment list with status badges and request timestamps.
  - One-click cancellation for pending reservations.
  - Direct integration with Stripe Checkout for confirmed reservations.
  - Personal profile editor with ImgBB photo upload and phone updates.
  - Printable official appointment receipts.
- **Administrative Control Suite**:
  - Real-time revenue aggregation and booking analytics.
  - Service catalog management (CRUD, image upload via ImgBB, active/inactive status toggle).
  - Appointment confirmation and cancellation management with slot conflict safeguards.
  - Customer directory with account blocking/unblocking controls.
  - Immutable Stripe-verified payment transaction ledger with CSV export.
- **Verified Payment Handling**:
  - Dedicated `/payment/success` page fetching verified status from backend.
  - Safe `/payment/cancel` page preserving appointment integrity.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Better Auth React Client (`better-auth/react`)
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **HTTP Client**: Axios with JWT/Session bearer interceptors

---

## 📋 Environment Variables

Create `.env.local` inside `client/` following `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000
```

---

## 🚀 Installation & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Next.js Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 🔗 Repository & Live Deployment Links

- **Client Repository**: [SalonBook Client Repository](https://github.com/Rayhan4741/SalonBook)
- **Server Repository**: [SalonBook Server Repository](https://github.com/Rayhan4741/SalonBook)
- **Live Deployment Platform**: [SalonBook Live Application](https://salonbook.vercel.app)
