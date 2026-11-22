import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "SalonBook — Luxury Salon Appointment Booking Platform",
  description:
    "Curated luxury salon services, precision hair styling, radiant skincare rituals, and seamless online appointment booking.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-salon-bg text-salon-charcoal antialiased">
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#FFFFFF",
                color: "#1F1D1D",
                border: "1px solid #EFE8E3",
                borderRadius: "16px",
                fontSize: "13px",
                boxShadow: "0 10px 30px -4px rgba(27, 22, 20, 0.08)",
              },
              success: {
                iconTheme: {
                  primary: "#D9777F",
                  secondary: "#FFFFFF",
                },
              },
            }}
          />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
