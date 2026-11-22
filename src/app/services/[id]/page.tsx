"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Sparkles,
  ArrowLeft,
  CalendarCheck2,
  ShieldCheck,
  Award,
  Leaf,
  AlertCircle,
} from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { BookingModal } from "@/components/BookingModal";
import { ServiceItem } from "@/components/ServiceCard";
import { shareLink } from "@/lib/share";
import toast from "react-hot-toast";

export default function ServiceDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [service, setService] = useState<ServiceItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);

  // Protected route check: Unauthenticated users redirected to sign in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push(`/sign-in?redirect=/services/${id}`);
    }
  }, [user, authLoading, id, router]);

  useEffect(() => {
    if (!id) return;
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await api.get(`/api/services/${id}`);
        if (res.data?.success && res.data?.data) {
          setService(res.data.data);
        } else {
          setError("Service not found or no longer available.");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Invalid service ID or service is unavailable.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (authLoading || (loading && !error)) {
    return <LoadingSpinner message="Retrieving service experience details..." />;
  }

  if (error || !service) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-salon-charcoal mb-2">Service Unavailable</h2>
        <p className="text-xs text-salon-muted leading-relaxed mb-6 font-sans">
          {error || "The requested salon service could not be located or has been archived."}
        </p>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>
      </div>
    );
  }

  const isInactive = service.status === "inactive";
  const isAdmin = user?.role === "admin";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Breadcrumb & Share */}
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-semibold text-salon-muted hover:text-salon-blush transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to All Services</span>
        </Link>

        <button
          type="button"
          onClick={async () => {
            const shared = await shareLink(service.serviceName, service.description, window.location.href);
            if (shared) toast.success("Treatment link copied or shared!");
          }}
          className="px-3 py-1.5 rounded-xl border border-salon-border text-xs font-semibold text-salon-charcoal hover:bg-salon-card transition-colors"
        >
          Share Treatment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Service Image */}
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-salon-border shadow-card bg-salon-bg">
            <img
              src={service.image}
              alt={service.serviceName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/95 backdrop-blur-sm text-salon-charcoal shadow-sm">
                {service.category}
              </span>
            </div>
            {isInactive && (
              <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                Service Currently Inactive
              </div>
            )}
          </div>

          {/* Service Guarantee Badges */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-salon-card p-4 rounded-2xl border border-salon-border text-center shadow-soft">
              <ShieldCheck className="w-5 h-5 text-salon-blush mx-auto mb-1.5" />
              <p className="text-xs font-bold text-salon-charcoal">Clean & Safe</p>
              <p className="text-[10px] text-salon-muted">Medical-Grade Hygiene</p>
            </div>
            <div className="bg-salon-card p-4 rounded-2xl border border-salon-border text-center shadow-soft">
              <Award className="w-5 h-5 text-salon-blush mx-auto mb-1.5" />
              <p className="text-xs font-bold text-salon-charcoal">Master Artisans</p>
              <p className="text-[10px] text-salon-muted">Top Rated Stylists</p>
            </div>
            <div className="bg-salon-card p-4 rounded-2xl border border-salon-border text-center shadow-soft">
              <Leaf className="w-5 h-5 text-salon-blush mx-auto mb-1.5" />
              <p className="text-xs font-bold text-salon-charcoal">Organic Rituals</p>
              <p className="text-[10px] text-salon-muted">Cruelty-Free Formulas</p>
            </div>
          </div>
        </div>

        {/* Right: Service Details & Booking Action Box */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-salon-card rounded-3xl border border-salon-border p-6 sm:p-8 shadow-card space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-salon-blush text-xs font-semibold uppercase tracking-widest mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{service.category}</span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-salon-charcoal leading-snug">
                {service.serviceName}
              </h1>
            </div>

            {/* Price and Duration Highlight */}
            <div className="p-4 rounded-2xl bg-salon-bg border border-salon-border flex items-center justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-wider font-semibold text-salon-muted">Treatment Fee</p>
                <p className="font-serif text-2xl font-bold text-salon-charcoal">{formatPrice(service.price)}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-wider font-semibold text-salon-muted">Session Length</p>
                <div className="flex items-center gap-1 text-sm font-bold text-salon-charcoal justify-end">
                  <Clock className="w-4 h-4 text-salon-blush" />
                  <span>{service.duration} mins</span>
                </div>
              </div>
            </div>

            {/* Full Treatment Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold tracking-wider uppercase text-salon-charcoal">Experience Overview</h3>
              <p className="text-xs text-salon-muted leading-relaxed font-sans whitespace-pre-line">
                {service.description}
              </p>
            </div>

            {/* Booking Rules & Action Button */}
            <div className="pt-4 border-t border-salon-border space-y-3">
              {isInactive ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs text-center font-medium">
                  This treatment is currently archived and cannot accept new appointment reservations.
                </div>
              ) : isAdmin ? (
                <div className="p-4 rounded-2xl bg-salon-bg border border-salon-border text-salon-muted text-xs text-center">
                  <p className="font-semibold text-salon-charcoal mb-1">Administrator Notice</p>
                  <span>Admins cannot book customer appointments. Manage this service from the Admin Dashboard.</span>
                  <div className="mt-3">
                    <Link
                      href="/dashboard/admin?tab=services"
                      className="inline-block text-xs font-semibold text-salon-blush hover:underline"
                    >
                      Manage in Admin Dashboard →
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full py-4 px-6 rounded-full text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover shadow-card hover:shadow-hover transition-all flex items-center justify-center gap-2"
                  >
                    <CalendarCheck2 className="w-4 h-4" />
                    <span>Book Appointment Now</span>
                  </button>
                  <div className="flex items-center justify-center gap-2 text-[11px] text-salon-muted pt-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Book online now • Pay securely via <strong className="text-salon-charcoal">Stripe Checkout</strong> after confirmation</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {service && (
        <BookingModal
          service={service}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />
      )}
    </div>
  );
}
