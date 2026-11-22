# SalonBook — Luxury Salon & Wellness Appointment Booking Platform (Client)

A modern, high-aesthetic web application for luxury salon treatment discovery, real-time appointment booking, and verified Stripe Checkout payments. Designed for discerning salon clientele and salon administrators.

- **Author**: Rayhan Alam Towhid
- **Email**: rayhanalamtowhid@gmail.com
- **Client Repository**: [https://github.com/Rayhan4741/SalonBook-Client](https://github.com/Rayhan4741/SalonBook-Client)
- **Server Repository**: [https://github.com/Rayhan4741/SalonBook-Server](https://github.com/Rayhan4741/SalonBook-Server)
- **Live Website**: [https://salonbook-client.vercel.app](https://salonbook-client.vercel.app)

---

## 🌟 Important Features

### 1. Customer Experience
- **Curated Treatment Menu**: Explore active salon treatments with rich photography, service descriptions, durations, and pricing.
- **Search & Filter & Sort**: Real-time search by service name, instant category filtering (Haircut & Styling, Hair Coloring, Hair Treatment, Facial & Skincare, Makeup, Manicure & Pedicure, Spa & Massage), and price sorting (Low to High, High to Low).
- **Service Details & Interactive Booking**: View comprehensive treatment rituals with medical-grade hygiene standards. Real-time calendar date picker and slot selection with collision protection against double-booking.
- **Customer Dashboard**:
  - **Overview**: Real-time metrics for Total Requests, Pending, Confirmed, and Cancelled appointments.
  - **My Appointments**: Comprehensive list with service details, request date, appointment status badges, and payment status.
  - **Cancellation**: Customers can cancel their own pending appointment requests with one click.
  - **Stripe Checkout**: One-click "Pay Now" for confirmed appointments with immediate redirection to Stripe Checkout.
  - **Profile Management**: Update full name, phone number, and avatar via file upload (ImgBB) or direct image URL.

### 2. Administrator Suite
- **Executive Analytics Overview**: Live statistics tracking total registered customers, active treatment catalog, appointment request pipeline, confirmed sessions, and total revenue.
- **Service Catalog Management**: Add, update, delete, and toggle active/inactive status. Full image upload capability directly integrated with ImgBB.
- **Appointment Review**: Confirm pending appointment requests or cancel sessions. Strict security ensures only pending appointments can be confirmed.
- **User Governance**: View registered clientele details, monitor customer status, and block/unblock users with instant permission enforcement.
- **Stripe Verified Transactions**: View immutable payment records with customer details, appointment references, amounts, and Stripe Checkout Session IDs. CSV export feature included.

### 3. Security & Architecture
- **Better Auth & JWT Verification**: Secure session management and JSON Web Token verification across all protected routes.
- **Strict Role-Based Access Control (RBAC)**: Dedicated layouts and server-side authorization ensuring customers and admins cannot access unauthorized routes.
- **Double Booking Collision Prevention**: Prevents scheduling conflicts on identical dates and time slots.
- **Fully Responsive Luxury Aesthetic**: Warm blush, rich charcoal, soft cream, and gold accents designed for desktop, tablet, and mobile screens.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Better Auth (`better-auth/react`)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Payment Processing**: Stripe Checkout
- **Image Hosting**: ImgBB API

---

## 📋 Required Environment Variables

Create a `.env.local` file in the root of the `client` directory. **Only variable names are shown below; never commit actual secrets:**

```env
# URL of the running backend Express server
NEXT_PUBLIC_API_URL=http://localhost:5000

# Base URL of the client application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Better Auth endpoint on backend
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:5000
```

> **Note**: For production on Vercel, set `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL` to your live Render backend URL (e.g., `https://salonbook-server.onrender.com`).

---

## 🚀 Installation & Local Setup

### Prerequisites
- Node.js (v18.x or v20.x recommended)
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone https://github.com/Rayhan4741/SalonBook-Client.git
cd SalonBook-Client
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Ensure `NEXT_PUBLIC_API_URL` points to your active server instance (default: `http://localhost:5000`).

### Step 4: Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Step 5: Production Build & Validation
```bash
npm run build
npm start
```

---

## 🔐 Default Administrative Credentials (For Evaluation)

- **Admin Email**: `admin@salonbook.com`
- **Admin Password**: `Admin1234!`
