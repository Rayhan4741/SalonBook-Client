"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Calendar, Clock, ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import { api } from "@/lib/api";
import { formatPrice, formatDate } from "@/lib/utils";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { copyToClipboard } from "@/lib/clipboard";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const appointmentId = searchParams.get("appointment_id");
  const sessionId = searchParams.get("session_id");

  const [paymentData, setPaymentData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!appointmentId) {
      setError("No appointment reference provided.");
      setLoading(false);
      return;
    }

    const verifyStatus = async () => {
      try {
        setLoading(true);
        // Verified backend lookup with session_id fallback
        const query = sessionId ? `?session_id=${encodeURIComponent(sessionId)}` : "";
        const res = await api.get(`/api/payments/appointment/${appointmentId}${query}`);
        if (res.data?.success) {
          setPaymentData(res.data.data);
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to retrieve verified payment details.");
      } finally {
        setLoading(false);
      }
    };

    verifyStatus();
  }, [appointmentId]);

  if (loading) {
    return <LoadingSpinner message="Verifying Stripe payment confirmation with salon ledger..." />;
  }

  const appt = paymentData?.appointment;
  const transaction = paymentData?.transaction;

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="bg-salon-card rounded-3xl border border-salon-border shadow-card p-8 sm:p-10 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
            Payment Confirmed
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-salon-charcoal mt-3">
            Thank You for Your Reservation
          </h1>
          <p className="text-xs text-salon-muted max-w-md mx-auto mt-2 leading-relaxed">
            Your appointment payment has been securely verified and booked in the SalonBook schedule.
          </p>
        </div>

        {appt && (
          <div className="bg-salon-bg rounded-2xl border border-salon-border p-6 text-left space-y-4 text-xs">
            <div className="border-b border-salon-border/60 pb-3 flex justify-between items-start">
              <div>
                <p className="text-salon-muted">Confirmed Treatment</p>
                <h3 className="font-serif text-base font-bold text-salon-charcoal">
                  {appt.serviceId?.serviceName || "Salon Experience"}
                </h3>
              </div>
              <div className="text-right">
                <p className="text-salon-muted">Paid Amount</p>
                <p className="font-serif text-lg font-bold text-salon-charcoal">
                  {formatPrice(appt.servicePrice)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-salon-blush" />
                <div>
                  <p className="text-[10px] text-salon-muted">Appointment Date</p>
                  <p className="font-semibold text-salon-charcoal">{formatDate(appt.appointmentDate)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-salon-blush" />
                <div>
                  <p className="text-[10px] text-salon-muted">Time Slot</p>
                  <p className="font-semibold text-salon-charcoal">{appt.timeSlot}</p>
                </div>
              </div>
            </div>

            {/* Transaction Reference */}
            <div className="pt-2 border-t border-salon-border/60 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-salon-muted gap-1">
              <span>Stripe Reference ID:</span>
              <button
                type="button"
                onClick={() => copyToClipboard(transaction?.stripeSessionId || sessionId || "", "Reference ID copied!")}
                className="font-mono text-salon-charcoal hover:text-salon-blush truncate max-w-xs text-left"
                title="Click to copy"
              >
                {transaction?.stripeSessionId || sessionId || "Verified via Stripe"}
              </button>
            </div>
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard/customer?tab=appointments"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover shadow-sm transition-all"
          >
            <span>View in My Appointments</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-semibold text-salon-charcoal bg-salon-bg hover:bg-salon-border/40 transition-colors"
          >
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Verifying Stripe payment confirmation..." />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

