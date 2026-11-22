"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { X, Calendar, Clock, MessageSquare, AlertCircle, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";

const TIME_SLOTS = [
  "09:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 01:00 PM",
  "02:00 PM - 03:00 PM",
  "03:00 PM - 04:00 PM",
  "04:00 PM - 05:00 PM",
  "05:00 PM - 06:00 PM",
  "06:00 PM - 07:00 PM",
];

interface BookingModalProps {
  service: {
    _id: string;
    serviceName: string;
    price: number;
    duration: number;
    status: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  service,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { user } = useAuth();
  const router = useRouter();

  // Get minimum date (today YYYY-MM-DD)
  const todayStr = new Date().toISOString().split("T")[0];

  const [appointmentDate, setAppointmentDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!user) {
      toast.error("Please sign in to schedule an appointment.");
      router.push(`/sign-in?redirect=/services/${service._id}`);
      return;
    }

    if (user.role === "admin") {
      toast.error("Administrator accounts cannot book customer appointments.");
      return;
    }

    if (!appointmentDate) {
      setErrorMessage("Please select a valid upcoming appointment date.");
      return;
    }

    if (!timeSlot) {
      setErrorMessage("Please select one of our available treatment time slots.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/api/appointments", {
        serviceId: service._id,
        appointmentDate,
        timeSlot,
        message,
      });

      if (res.data?.success) {
        toast.success("Appointment request submitted successfully! Pending confirmation.");
        onClose();
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/dashboard/customer?tab=appointments");
        }
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to schedule appointment. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-salon-charcoal/50 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-salon-card rounded-3xl shadow-card border border-salon-border overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-salon-border flex items-center justify-between bg-salon-bg/50">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-salon-blush">
              Schedule Appointment
            </span>
            <h3 className="font-serif text-lg font-bold text-salon-charcoal truncate max-w-sm">
              {service.serviceName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-salon-muted hover:text-salon-charcoal hover:bg-salon-border/40 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Summary Box */}
          <div className="p-3.5 rounded-2xl bg-salon-bg border border-salon-border flex items-center justify-between text-xs">
            <div>
              <p className="text-salon-muted">Estimated Duration</p>
              <p className="font-semibold text-salon-charcoal">{service.duration} Minutes</p>
            </div>
            <div className="text-right">
              <p className="text-salon-muted">Treatment Fee</p>
              <p className="font-bold text-salon-charcoal text-sm">{formatPrice(service.price)}</p>
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-xs font-semibold text-salon-charcoal mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-salon-blush" />
              Appointment Date
            </label>
            <input
              type="date"
              min={todayStr}
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-salon-border bg-salon-card text-xs text-salon-charcoal focus:outline-none focus:border-salon-blush transition-colors"
            />
          </div>

          {/* Time Slot Selection */}
          <div>
            <label className="block text-xs font-semibold text-salon-charcoal mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-salon-blush" />
              Select Available Time Slot
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => {
                const isSelected = timeSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-medium border text-center transition-all ${
                      isSelected
                        ? "bg-salon-blush text-white border-salon-blush shadow-sm font-semibold"
                        : "bg-salon-card border-salon-border text-salon-charcoal hover:border-salon-blush/50"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Message */}
          <div>
            <label className="block text-xs font-semibold text-salon-charcoal mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-salon-blush" />
              Special Notes or Requests (Optional)
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any allergies, styling preferences, or special requests..."
              className="w-full px-3.5 py-2 rounded-xl border border-salon-border bg-salon-card text-xs text-salon-charcoal focus:outline-none focus:border-salon-blush transition-colors"
            />
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="w-1/3 py-2.5 px-4 rounded-xl text-xs font-semibold text-salon-muted bg-salon-bg hover:bg-salon-border/50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-2/3 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-60"
            >
              {loading ? (
                <span>Confirming Availability...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Request Booking</span>
                </>
              )}
            </button>
          </div>

          {/* Stripe Security Notice */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-salon-muted pt-2 border-t border-salon-border/50">
            <CreditCard className="w-3.5 h-3.5 text-[#635BFF]" />
            <span>Secure payment via <strong className="text-salon-charcoal">Stripe Checkout</strong> upon concierge confirmation</span>
          </div>
        </form>
      </div>
    </div>
  );
};
