"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, ArrowLeft, RefreshCw, Calendar } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

function PaymentCancelContent() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointment_id");

  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-sm">
        <XCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-salon-charcoal">
          Checkout Was Cancelled
        </h1>
        <p className="text-xs text-salon-muted leading-relaxed font-sans">
          Your payment session was cancelled. No charges were made to your card, and your appointment remains preserved in confirmed status.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-salon-card border border-salon-border shadow-soft text-xs text-left space-y-2">
        <div className="flex items-center gap-2 text-salon-charcoal font-semibold">
          <Calendar className="w-4 h-4 text-salon-blush" />
          <span>Need to reschedule or retry?</span>
        </div>
        <p className="text-salon-muted leading-relaxed">
          You can return to your dashboard at any time to complete payment for your confirmed booking or contact the salon concierge.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          href="/dashboard/customer?tab=appointments"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover shadow-sm transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Return to Appointments</span>
        </Link>
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-salon-charcoal bg-salon-bg hover:bg-salon-border/50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading..." />}>
      <PaymentCancelContent />
    </Suspense>
  );
}

