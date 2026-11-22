"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CreditCard,
  User,
  LayoutDashboard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  Loader2,
  Trash2,
} from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, formatDate } from "@/lib/utils";
import { ImageUpload } from "@/components/ImageUpload";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { printAppointmentReceipt } from "@/lib/receipt";
import toast from "react-hot-toast";

function CustomerDashboardContent() {
  const { user, loading: authLoading, refreshProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, cancelled: 0 });
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [payingAppointmentId, setPayingAppointmentId] = useState<string | null>(null);

  // Profile Form state
  const [profileName, setProfileName] = useState("");
  const [profilePhone, setProfilePhone] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  // Selected appointment details modal
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);

  // Protected check
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/sign-in");
      } else if (user.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        setProfileName(user.name || "");
        setProfilePhone(user.phone || "");
        setProfileImage(user.image || "");
      }
    }
  }, [user, authLoading, router]);

  const loadCustomerData = useCallback(async () => {
    try {
      setLoadingData(true);
      const [dashRes, apptRes] = await Promise.all([
        api.get("/api/dashboard/customer"),
        api.get("/api/appointments/my"),
      ]);

      if (dashRes.data?.success) {
        setStats(dashRes.data.data.stats || { total: 0, pending: 0, confirmed: 0, cancelled: 0 });
      }

      if (apptRes.data?.success) {
        setAppointments(apptRes.data.data || []);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load dashboard data.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (user && user.role === "customer") {
      loadCustomerData();
    }
  }, [user, loadCustomerData]);

  // Cancel pending appointment
  const handleCancelAppointment = async (id: string) => {
    if (!confirm("Are you sure you wish to cancel this pending appointment reservation?")) return;

    try {
      const res = await api.patch(`/api/appointments/${id}/cancel`);
      if (res.data?.success) {
        toast.success("Appointment reservation has been cancelled.");
        loadCustomerData();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to cancel appointment.");
    }
  };

  // Pay Now with Stripe Checkout
  const handlePayNow = async (appointmentId: string) => {
    try {
      setPayingAppointmentId(appointmentId);
      const res = await api.post("/api/payments/checkout-session", { appointmentId });

      if (res.data?.success && res.data?.url) {
        toast.loading("Redirecting to secure Stripe Checkout...");
        window.location.href = res.data.url;
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Unable to initialize Stripe Checkout session.");
    } finally {
      setPayingAppointmentId(null);
    }
  };

  // Update profile
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      const res = await api.patch("/api/profile", {
        name: profileName.trim(),
        phone: profilePhone.trim(),
        image: profileImage,
      });

      if (res.data?.success) {
        toast.success("Your profile has been updated.");
        await refreshProfile();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  if (authLoading || (loadingData && appointments.length === 0)) {
    return <LoadingSpinner message="Preparing your personal SalonBook sanctuary..." />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Welcome Header */}
      <div className="bg-salon-card rounded-3xl border border-salon-border p-6 sm:p-8 shadow-soft mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-16 h-16 rounded-2xl object-cover border border-salon-border shadow-sm"
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-salon-blush/10 text-salon-blush flex items-center justify-center font-bold text-xl border border-salon-blush/20">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="inline-flex items-center gap-1.5 text-salon-blush text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guest Portal</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-salon-charcoal">
              Welcome, {user?.name}
            </h1>
            <p className="text-xs text-salon-muted font-sans mt-0.5">{user?.email}</p>
          </div>
        </div>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover shadow-sm transition-all"
        >
          <span>Book New Treatment</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Layout: Sidebar & Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-salon-card rounded-2xl border border-salon-border p-3 shadow-soft space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "overview"
                  ? "bg-salon-blush text-white shadow-sm"
                  : "text-salon-charcoal hover:bg-salon-bg"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("appointments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "appointments"
                  ? "bg-salon-blush text-white shadow-sm"
                  : "text-salon-charcoal hover:bg-salon-bg"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>My Appointments</span>
              {stats.pending > 0 && (
                <span className="ml-auto px-2 py-0.5 text-[10px] rounded-full bg-amber-100 text-amber-800 font-bold">
                  {stats.pending}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "profile"
                  ? "bg-salon-blush text-white shadow-sm"
                  : "text-salon-charcoal hover:bg-salon-bg"
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </button>
          </div>
        </div>

        {/* Content Panel */}
        <div className="lg:col-span-9 space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-salon-card p-5 rounded-2xl border border-salon-border shadow-soft">
                  <p className="text-xs text-salon-muted font-medium">Total Bookings</p>
                  <p className="font-serif text-2xl font-bold text-salon-charcoal mt-1">
                    {stats.total}
                  </p>
                </div>

                <div className="bg-salon-card p-5 rounded-2xl border border-salon-border shadow-soft">
                  <p className="text-xs text-amber-700 font-medium">Pending</p>
                  <p className="font-serif text-2xl font-bold text-amber-600 mt-1">
                    {stats.pending}
                  </p>
                </div>

                <div className="bg-salon-card p-5 rounded-2xl border border-salon-border shadow-soft">
                  <p className="text-xs text-emerald-700 font-medium">Confirmed</p>
                  <p className="font-serif text-2xl font-bold text-emerald-600 mt-1">
                    {stats.confirmed}
                  </p>
                </div>

                <div className="bg-salon-card p-5 rounded-2xl border border-salon-border shadow-soft">
                  <p className="text-xs text-stone-500 font-medium">Cancelled</p>
                  <p className="font-serif text-2xl font-bold text-stone-500 mt-1">
                    {stats.cancelled}
                  </p>
                </div>
              </div>

              {/* Recent Appointments Preview */}
              <div className="bg-salon-card rounded-2xl border border-salon-border p-6 shadow-soft space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-salon-charcoal">
                    Recent Appointment Requests
                  </h3>
                  <button
                    onClick={() => setActiveTab("appointments")}
                    className="text-xs font-semibold text-salon-blush hover:underline"
                  >
                    View All →
                  </button>
                </div>

                {appointments.length === 0 ? (
                  <EmptyState
                    title="No Bookings Yet"
                    description="You haven't requested any salon services yet. Explore our treatments to book your first experience."
                    actionText="Browse Treatment Menu"
                    actionHref="/services"
                  />
                ) : (
                  <div className="divide-y divide-salon-border/60">
                    {appointments.slice(0, 3).map((appt) => (
                      <div key={appt._id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={appt.serviceId?.image || "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=200&q=80"}
                            alt={appt.serviceId?.serviceName || "Salon Service"}
                            className="w-14 h-14 rounded-xl object-cover border border-salon-border"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-salon-charcoal">
                              {appt.serviceId?.serviceName || "Service"}
                            </h4>
                            <p className="text-[11px] text-salon-muted">
                              {formatDate(appt.appointmentDate)} • {appt.timeSlot}
                            </p>
                            <span className="text-xs font-bold text-salon-charcoal mt-1 inline-block">
                              {formatPrice(appt.servicePrice)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              appt.status === "confirmed"
                                ? "bg-emerald-100 text-emerald-800"
                                : appt.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-stone-100 text-stone-600"
                            }`}
                          >
                            {appt.status}
                          </span>

                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              appt.paymentStatus === "paid"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-stone-100 text-stone-600"
                            }`}
                          >
                            {appt.paymentStatus}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: MY APPOINTMENTS */}
          {activeTab === "appointments" && (
            <div className="bg-salon-card rounded-2xl border border-salon-border p-6 shadow-soft space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-serif text-xl font-bold text-salon-charcoal">
                    My Scheduled Appointments
                  </h3>
                  <p className="text-xs text-salon-muted font-sans mt-0.5">
                    Track booking confirmations, process Stripe payments, and manage pending appointments.
                  </p>
                </div>
                <span className="text-xs font-semibold text-salon-muted">
                  Total: {appointments.length} records
                </span>
              </div>

              {appointments.length === 0 ? (
                <EmptyState
                  title="No Appointments Scheduled"
                  description="You do not have any pending or confirmed salon appointments at this time."
                  actionText="Book a Treatment Now"
                  actionHref="/services"
                />
              ) : (
                <div className="space-y-4">
                  {appointments.map((appt) => {
                    const isPending = appt.status === "pending";
                    const isConfirmed = appt.status === "confirmed";
                    const isCancelled = appt.status === "cancelled";
                    const isPaid = appt.paymentStatus === "paid";
                    const canPay = isConfirmed && !isPaid;

                    return (
                      <div
                        key={appt._id}
                        className="p-5 rounded-2xl border border-salon-border bg-salon-bg hover:border-salon-blush/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                      >
                        {/* Service & Time Info */}
                        <div className="flex items-start gap-4">
                          <img
                            src={appt.serviceId?.image || "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=200&q=80"}
                            alt={appt.serviceId?.serviceName || "Service"}
                            className="w-16 h-16 rounded-xl object-cover border border-salon-border shadow-sm shrink-0"
                          />
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-salon-blush">
                              {appt.serviceId?.category || "Salon"}
                            </span>
                            <h4 className="font-serif text-base font-bold text-salon-charcoal">
                              {appt.serviceId?.serviceName || "Service Treatment"}
                            </h4>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-salon-muted pt-0.5">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-salon-blush" />
                                {formatDate(appt.appointmentDate)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-salon-blush" />
                                {appt.timeSlot}
                              </span>
                            </div>
                            <p className="text-xs text-salon-charcoal font-bold pt-1">
                              Fee: {formatPrice(appt.servicePrice)}
                            </p>
                          </div>
                        </div>

                        {/* Status Badges & Action Controls */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 shrink-0">
                          <div className="flex items-center gap-2">
                            {/* Appointment Status Badge */}
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                isConfirmed
                                  ? "bg-emerald-100 text-emerald-800"
                                  : isPending
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-stone-200 text-stone-700"
                              }`}
                            >
                              {appt.status}
                            </span>

                            {/* Payment Status Badge */}
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                isPaid
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-stone-200 text-stone-700"
                              }`}
                            >
                              {appt.paymentStatus}
                            </span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 w-full lg:w-auto">
                            {/* View details */}
                            <button
                              onClick={() => setSelectedAppointment(appt)}
                              className="px-3 py-1.5 rounded-xl border border-salon-border text-xs font-semibold text-salon-charcoal hover:bg-salon-card transition-colors"
                            >
                              Details
                            </button>

                            {/* Cancel Pending appointment only */}
                            {isPending && (
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] text-amber-700 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200">
                                  Awaiting Salon Confirmation to Pay
                                </span>
                                <button
                                  onClick={() => handleCancelAppointment(appt._id)}
                                  className="px-3 py-1.5 rounded-xl border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>Cancel</span>
                                </button>
                              </div>
                            )}

                            {/* Pay Now for confirmed and unpaid only */}
                            {canPay && (
                              <button
                                onClick={() => handlePayNow(appt._id)}
                                disabled={payingAppointmentId === appt._id}
                                className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-1.5 animate-pulse"
                                title="Pay securely with Stripe Checkout"
                              >
                                {payingAppointmentId === appt._id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <CreditCard className="w-3.5 h-3.5" />
                                )}
                                <span>Pay Now (Stripe)</span>
                              </button>
                            )}

                            {isPaid && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>Paid</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => printAppointmentReceipt(appt)}
                                  className="px-2.5 py-1 rounded-xl border border-salon-border text-[11px] font-semibold text-salon-charcoal hover:bg-salon-card transition-colors"
                                >
                                  Receipt
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MY PROFILE */}
          {activeTab === "profile" && (
            <div className="bg-salon-card rounded-2xl border border-salon-border p-6 sm:p-8 shadow-soft space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-salon-charcoal">
                  My Profile & Preferences
                </h3>
                <p className="text-xs text-salon-muted font-sans mt-0.5">
                  Update your personal details and contact preferences.
                </p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-semibold text-salon-charcoal mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-salon-border bg-salon-bg text-xs text-salon-charcoal focus:outline-none focus:border-salon-blush"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-salon-charcoal mb-1.5">
                    Email Address (Read-Only)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ""}
                    className="w-full px-4 py-2.5 rounded-xl border border-salon-border bg-stone-100 text-xs text-stone-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-salon-charcoal mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-salon-border bg-salon-bg text-xs text-salon-charcoal focus:outline-none focus:border-salon-blush"
                  />
                </div>

                {/* Profile Image via ImgBB */}
                <div className="pt-2">
                  <ImageUpload
                    label="Profile Photo (Upload new photo or provide direct URL)"
                    initialUrl={profileImage}
                    onUploaded={(url) => setProfileImage(url)}
                    allowManualUrl={true}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover shadow-sm transition-all flex items-center gap-2"
                  >
                    {savingProfile ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving Changes...</span>
                      </>
                    ) : (
                      <span>Save Profile Changes</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-salon-charcoal/50 backdrop-blur-sm">
          <div className="bg-salon-card rounded-3xl border border-salon-border max-w-md w-full p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-salon-border pb-3">
              <h3 className="font-serif text-lg font-bold text-salon-charcoal">
                Appointment Details
              </h3>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="text-salon-muted hover:text-salon-charcoal text-xs font-semibold"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <p className="text-salon-muted">Service</p>
                <p className="font-bold text-salon-charcoal text-sm">
                  {selectedAppointment.serviceId?.serviceName || "Salon Treatment"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-salon-muted">Date</p>
                  <p className="font-semibold text-salon-charcoal">
                    {formatDate(selectedAppointment.appointmentDate)}
                  </p>
                </div>
                <div>
                  <p className="text-salon-muted">Time Slot</p>
                  <p className="font-semibold text-salon-charcoal">{selectedAppointment.timeSlot}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-salon-muted">Appointment Status</p>
                  <span className="font-bold uppercase text-[11px] text-salon-charcoal">
                    {selectedAppointment.status}
                  </span>
                </div>
                <div>
                  <p className="text-salon-muted">Payment Status</p>
                  <span className="font-bold uppercase text-[11px] text-salon-charcoal">
                    {selectedAppointment.paymentStatus}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-salon-muted">Price Locked</p>
                <p className="font-serif text-base font-bold text-salon-charcoal">
                  {formatPrice(selectedAppointment.servicePrice)}
                </p>
              </div>

              {selectedAppointment.message && (
                <div>
                  <p className="text-salon-muted">Customer Notes</p>
                  <p className="p-3 bg-salon-bg rounded-xl border border-salon-border text-salon-charcoal mt-1">
                    {selectedAppointment.message}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedAppointment(null)}
                className="w-full py-2.5 rounded-xl bg-salon-bg text-salon-charcoal text-xs font-semibold hover:bg-salon-border/50"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CustomerDashboardPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading customer dashboard..." />}>
      <CustomerDashboardContent />
    </Suspense>
  );
}

