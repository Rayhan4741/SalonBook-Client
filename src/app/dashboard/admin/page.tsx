"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LayoutDashboard,
  Scissors,
  Calendar,
  Users,
  CreditCard,
  User,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Ban,
  Unlock,
  Search,
  Sparkles,
  ShieldCheck,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { formatPrice, formatDate } from "@/lib/utils";
import { ImageUpload } from "@/components/ImageUpload";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import toast from "react-hot-toast";

const SERVICE_CATEGORIES = [
  "Haircut & Styling",
  "Hair Coloring",
  "Hair Treatment",
  "Facial & Skincare",
  "Makeup",
  "Manicure & Pedicure",
  "Spa & Massage",
];

function AdminDashboardContent() {
  const { user, loading: authLoading, refreshProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "overview";

  const [activeTab, setActiveTab] = useState<string>(initialTab);

  // Stats
  const [stats, setStats] = useState<any>({
    totalCustomers: 0,
    totalActiveServices: 0,
    totalAppointments: 0,
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    totalRevenue: 0,
    successfulPaymentsCount: 0,
  });

  // Services State
  const [services, setServices] = useState<any[]>([]);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState({
    serviceName: "",
    category: "Haircut & Styling",
    description: "",
    price: "",
    duration: "",
    image: "",
    status: "active",
  });
  const [submittingService, setSubmittingService] = useState(false);

  // Appointments State
  const [appointments, setAppointments] = useState<any[]>([]);
  const [apptFilter, setApptFilter] = useState("all");
  const [apptSearch, setApptSearch] = useState("");

  // Users State
  const [usersList, setUsersList] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState("");

  // Transactions State
  const [transactions, setTransactions] = useState<any[]>([]);

  // Profile State
  const [adminName, setAdminName] = useState("");
  const [adminPhone, setAdminPhone] = useState("");
  const [adminImage, setAdminImage] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  const [loadingData, setLoadingData] = useState(true);

  // Access Control: Admin only
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/sign-in");
      } else if (user.role !== "admin") {
        toast.error("Administrator access required.");
        router.push("/dashboard/customer");
      } else {
        setAdminName(user.name || "");
        setAdminPhone(user.phone || "");
        setAdminImage(user.image || "");
      }
    }
  }, [user, authLoading, router]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoadingData(true);
      const [dashRes, servRes, apptRes, usersRes, txRes] = await Promise.all([
        api.get("/api/dashboard/admin"),
        api.get("/api/services?status=all&limit=100"),
        api.get("/api/admin/appointments"),
        api.get("/api/admin/users"),
        api.get("/api/admin/transactions"),
      ]);

      if (dashRes.data?.success) setStats(dashRes.data.data.stats || {});
      if (servRes.data?.success) setServices(servRes.data.data || []);
      if (apptRes.data?.success) setAppointments(apptRes.data.data || []);
      if (usersRes.data?.success) setUsersList(usersRes.data.data || []);
      if (txRes.data?.success) setTransactions(txRes.data.data || []);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to load admin records.");
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);

  // Service Management Handlers
  const openNewServiceModal = () => {
    setEditingServiceId(null);
    setServiceForm({
      serviceName: "",
      category: "Haircut & Styling",
      description: "",
      price: "",
      duration: "",
      image: "",
      status: "active",
    });
    setServiceModalOpen(true);
  };

  const openEditServiceModal = (s: any) => {
    setEditingServiceId(s._id);
    setServiceForm({
      serviceName: s.serviceName,
      category: s.category,
      description: s.description,
      price: s.price.toString(),
      duration: s.duration.toString(),
      image: s.image,
      status: s.status,
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.serviceName || !serviceForm.description || !serviceForm.price || !serviceForm.duration || !serviceForm.image) {
      toast.error("Please complete all required fields and upload an image.");
      return;
    }

    try {
      setSubmittingService(true);
      const payload = {
        serviceName: serviceForm.serviceName.trim(),
        category: serviceForm.category,
        description: serviceForm.description.trim(),
        price: Number(serviceForm.price),
        duration: Number(serviceForm.duration),
        image: serviceForm.image.trim(),
        status: serviceForm.status,
      };

      if (editingServiceId) {
        await api.patch(`/api/services/${editingServiceId}`, payload);
        toast.success("Service updated successfully!");
      } else {
        await api.post("/api/services", payload);
        toast.success("New service created successfully!");
      }

      setServiceModalOpen(false);
      fetchDashboardData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save service.");
    } finally {
      setSubmittingService(false);
    }
  };

  const handleDeleteService = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove '${name}'? If appointments exist, it will be safely deactivated.`)) return;
    try {
      const res = await api.delete(`/api/services/${id}`);
      if (res.data?.success) {
        toast.success(res.data.message || "Service removed.");
        fetchDashboardData();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to remove service.");
    }
  };

  // Appointment Actions
  const handleConfirmAppt = async (id: string) => {
    try {
      const res = await api.patch(`/api/admin/appointments/${id}/confirm`);
      if (res.data?.success) {
        toast.success("Appointment has been confirmed.");
        fetchDashboardData();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to confirm appointment.");
    }
  };

  const handleCancelAppt = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this appointment?")) return;
    try {
      const res = await api.patch(`/api/admin/appointments/${id}/cancel`);
      if (res.data?.success) {
        toast.success("Appointment has been cancelled.");
        fetchDashboardData();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to cancel appointment.");
    }
  };

  // User Actions (Block / Unblock)
  const handleBlockUser = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to block '${name}' from accessing the platform?`)) return;
    try {
      const res = await api.patch(`/api/admin/users/${id}/block`);
      if (res.data?.success) {
        toast.success(`User '${name}' has been blocked.`);
        fetchDashboardData();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to block user.");
    }
  };

  const handleUnblockUser = async (id: string, name: string) => {
    try {
      const res = await api.patch(`/api/admin/users/${id}/unblock`);
      if (res.data?.success) {
        toast.success(`User '${name}' has been unblocked.`);
        fetchDashboardData();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to unblock user.");
    }
  };

  // Admin Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSavingProfile(true);
      const res = await api.patch("/api/profile", {
        name: adminName.trim(),
        phone: adminPhone.trim(),
        image: adminImage,
      });
      if (res.data?.success) {
        toast.success("Admin profile updated.");
        await refreshProfile();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  if (authLoading || (loadingData && services.length === 0)) {
    return <LoadingSpinner message="Initializing Administrator Control Suite..." />;
  }

  // Filtered appointments
  const filteredAppointments = appointments.filter((a) => {
    const matchStatus = apptFilter === "all" || a.status === apptFilter;
    const matchSearch =
      !apptSearch.trim() ||
      a.customerName?.toLowerCase().includes(apptSearch.toLowerCase()) ||
      a.customerEmail?.toLowerCase().includes(apptSearch.toLowerCase()) ||
      a.serviceId?.serviceName?.toLowerCase().includes(apptSearch.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Filtered users
  const filteredUsers = usersList.filter((u) => {
    return (
      !userSearch.trim() ||
      u.name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email?.toLowerCase().includes(userSearch.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Admin Title Header */}
      <div className="bg-salon-card rounded-3xl border border-salon-border p-6 sm:p-8 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-salon-gold text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Master Administration Suite</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-salon-charcoal mt-1">
            SalonBook Control Console
          </h1>
          <p className="text-xs text-salon-muted font-sans mt-0.5">
            Manage salon services, appointments, registered customers, and Stripe payment transactions.
          </p>
        </div>

        <button
          onClick={openNewServiceModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Admin Navigation Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-salon-card rounded-2xl border border-salon-border p-3 shadow-soft space-y-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "overview" ? "bg-salon-blush text-white shadow-sm" : "text-salon-charcoal hover:bg-salon-bg"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("services")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "services" ? "bg-salon-blush text-white shadow-sm" : "text-salon-charcoal hover:bg-salon-bg"
              }`}
            >
              <Scissors className="w-4 h-4" />
              <span>Manage Services</span>
              <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-salon-bg text-salon-charcoal font-bold">
                {services.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("appointments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "appointments" ? "bg-salon-blush text-white shadow-sm" : "text-salon-charcoal hover:bg-salon-bg"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Manage Appointments</span>
              {stats.pending > 0 && (
                <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                  {stats.pending}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "users" ? "bg-salon-blush text-white shadow-sm" : "text-salon-charcoal hover:bg-salon-bg"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Manage Users</span>
            </button>

            <button
              onClick={() => setActiveTab("transactions")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "transactions" ? "bg-salon-blush text-white shadow-sm" : "text-salon-charcoal hover:bg-salon-bg"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Transactions</span>
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                activeTab === "profile" ? "bg-salon-blush text-white shadow-sm" : "text-salon-charcoal hover:bg-salon-bg"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Admin Profile</span>
            </button>
          </div>
        </div>

        {/* Dynamic Admin Content View */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stat Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="bg-salon-card p-5 rounded-2xl border border-salon-border shadow-soft">
                  <p className="text-[11px] font-semibold text-salon-muted uppercase">Registered Guests</p>
                  <p className="font-serif text-2xl font-bold text-salon-charcoal mt-1">
                    {stats.totalCustomers}
                  </p>
                </div>

                <div className="bg-salon-card p-5 rounded-2xl border border-salon-border shadow-soft">
                  <p className="text-[11px] font-semibold text-salon-muted uppercase">Active Treatments</p>
                  <p className="font-serif text-2xl font-bold text-salon-charcoal mt-1">
                    {stats.totalActiveServices}
                  </p>
                </div>

                <div className="bg-salon-card p-5 rounded-2xl border border-salon-border shadow-soft">
                  <p className="text-[11px] font-semibold text-amber-700 uppercase">Pending Requests</p>
                  <p className="font-serif text-2xl font-bold text-amber-600 mt-1">
                    {stats.pending}
                  </p>
                </div>

                <div className="bg-salon-card p-5 rounded-2xl border border-salon-border shadow-soft">
                  <p className="text-[11px] font-semibold text-emerald-700 uppercase">Confirmed</p>
                  <p className="font-serif text-2xl font-bold text-emerald-600 mt-1">
                    {stats.confirmed}
                  </p>
                </div>

                <div className="bg-salon-card p-5 rounded-2xl border border-salon-border shadow-soft col-span-2">
                  <p className="text-[11px] font-semibold text-salon-muted uppercase">Verified Stripe Revenue</p>
                  <p className="font-serif text-3xl font-bold text-salon-charcoal mt-1">
                    {formatPrice(stats.totalRevenue)}
                  </p>
                  <p className="text-[10px] text-emerald-600 font-semibold mt-1">
                    {stats.successfulPaymentsCount} Completed Transactions
                  </p>
                </div>
              </div>

              {/* Recent Appointments Table */}
              <div className="bg-salon-card rounded-2xl border border-salon-border p-6 shadow-soft space-y-4">
                <h3 className="font-serif text-lg font-bold text-salon-charcoal">
                  Recent Booking Requests
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-salon-border text-salon-muted uppercase text-[10px] tracking-wider">
                        <th className="pb-3">Customer</th>
                        <th className="pb-3">Service</th>
                        <th className="pb-3">Date & Time</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-salon-border/60">
                      {appointments.slice(0, 5).map((a) => (
                        <tr key={a._id} className="hover:bg-salon-bg/50">
                          <td className="py-3 font-semibold text-salon-charcoal">
                            {a.customerName || a.customerEmail}
                          </td>
                          <td className="py-3 text-salon-charcoal">
                            {a.serviceId?.serviceName || "Service"}
                          </td>
                          <td className="py-3 text-salon-muted">
                            {formatDate(a.appointmentDate)} • {a.timeSlot}
                          </td>
                          <td className="py-3 font-bold text-salon-charcoal">
                            {formatPrice(a.servicePrice)}
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                a.status === "confirmed"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : a.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-stone-100 text-stone-600"
                              }`}
                            >
                              {a.status}
                            </span>
                          </td>
                          <td className="py-3">
                            {a.status === "pending" && (
                              <button
                                onClick={() => handleConfirmAppt(a._id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-semibold"
                              >
                                Confirm
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAGE SERVICES */}
          {activeTab === "services" && (
            <div className="bg-salon-card rounded-2xl border border-salon-border p-6 shadow-soft space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-salon-charcoal">Salon Services</h3>
                  <p className="text-xs text-salon-muted">
                    Create, update, deactivate, and maintain treatment catalog.
                  </p>
                </div>
                <button
                  onClick={openNewServiceModal}
                  className="px-4 py-2 rounded-xl bg-salon-blush text-white text-xs font-semibold hover:bg-salon-blushHover flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-salon-border text-salon-muted uppercase text-[10px] tracking-wider">
                      <th className="pb-3">Image</th>
                      <th className="pb-3">Service Name</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3">Duration</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-salon-border/60">
                    {services.map((s) => (
                      <tr key={s._id} className="hover:bg-salon-bg/50">
                        <td className="py-3">
                          <img
                            src={s.image}
                            alt={s.serviceName}
                            className="w-12 h-12 rounded-xl object-cover border border-salon-border"
                          />
                        </td>
                        <td className="py-3 font-semibold text-salon-charcoal max-w-xs truncate">
                          {s.serviceName}
                        </td>
                        <td className="py-3 text-salon-muted">{s.category}</td>
                        <td className="py-3 font-bold text-salon-charcoal">{formatPrice(s.price)}</td>
                        <td className="py-3 text-salon-muted">{s.duration} mins</td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              s.status === "active"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-stone-200 text-stone-600"
                            }`}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td className="py-3 text-right space-x-2">
                          <button
                            onClick={() => openEditServiceModal(s)}
                            className="p-1.5 rounded-lg border border-salon-border hover:bg-salon-bg text-salon-charcoal"
                            title="Edit Service"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(s._id, s.serviceName)}
                            className="p-1.5 rounded-lg border border-red-200 hover:bg-red-50 text-red-600"
                            title="Delete / Deactivate Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: MANAGE APPOINTMENTS */}
          {activeTab === "appointments" && (
            <div className="bg-salon-card rounded-2xl border border-salon-border p-6 shadow-soft space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-salon-charcoal">
                  All Appointment Bookings
                </h3>
                <p className="text-xs text-salon-muted">
                  Confirm pending customer bookings or cancel conflicting slots.
                </p>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-salon-muted absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search guest or service..."
                    value={apptSearch}
                    onChange={(e) => setApptSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-salon-border text-xs focus:outline-none focus:border-salon-blush"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-salon-muted">Filter Status:</span>
                  <select
                    value={apptFilter}
                    onChange={(e) => setApptFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-salon-border text-xs focus:outline-none focus:border-salon-blush"
                  >
                    <option value="all">All Appointments</option>
                    <option value="pending">Pending Only</option>
                    <option value="confirmed">Confirmed Only</option>
                    <option value="cancelled">Cancelled Only</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-salon-border text-salon-muted uppercase text-[10px] tracking-wider">
                      <th className="pb-3">Guest Details</th>
                      <th className="pb-3">Service</th>
                      <th className="pb-3">Scheduled Date</th>
                      <th className="pb-3">Slot</th>
                      <th className="pb-3">Price</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3">Payment</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-salon-border/60">
                    {filteredAppointments.map((a) => {
                      const isPending = a.status === "pending";
                      const isConfirmed = a.status === "confirmed";
                      return (
                        <tr key={a._id} className="hover:bg-salon-bg/50">
                          <td className="py-3">
                            <p className="font-semibold text-salon-charcoal">{a.customerName || "Customer"}</p>
                            <p className="text-[11px] text-salon-muted">{a.customerEmail}</p>
                          </td>
                          <td className="py-3 font-semibold text-salon-charcoal">
                            {a.serviceId?.serviceName || "Service"}
                          </td>
                          <td className="py-3 text-salon-muted">{formatDate(a.appointmentDate)}</td>
                          <td className="py-3 text-salon-muted">{a.timeSlot}</td>
                          <td className="py-3 font-bold text-salon-charcoal">{formatPrice(a.servicePrice)}</td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                isConfirmed
                                  ? "bg-emerald-100 text-emerald-800"
                                  : isPending
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-stone-100 text-stone-600"
                              }`}
                            >
                              {a.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                a.paymentStatus === "paid"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-stone-100 text-stone-600"
                              }`}
                            >
                              {a.paymentStatus}
                            </span>
                          </td>
                          <td className="py-3 text-right space-x-1">
                            {isPending && (
                              <button
                                onClick={() => handleConfirmAppt(a._id)}
                                className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-semibold text-[11px]"
                              >
                                Confirm
                              </button>
                            )}
                            {(isPending || isConfirmed) && (
                              <button
                                onClick={() => handleCancelAppt(a._id)}
                                className="px-2.5 py-1 rounded-lg bg-stone-100 text-red-600 hover:bg-red-50 font-semibold text-[11px]"
                              >
                                Cancel
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MANAGE USERS */}
          {activeTab === "users" && (
            <div className="bg-salon-card rounded-2xl border border-salon-border p-6 shadow-soft space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-salon-charcoal">
                  Registered Customers
                </h3>
                <p className="text-xs text-salon-muted">
                  View guest profiles and manage system access or blocking rules.
                </p>
              </div>

              {/* Search Users */}
              <div className="relative max-w-sm">
                <Search className="w-4 h-4 text-salon-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search customer name or email..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-salon-border text-xs focus:outline-none focus:border-salon-blush"
                />
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-salon-border text-salon-muted uppercase text-[10px] tracking-wider">
                      <th className="pb-3">User</th>
                      <th className="pb-3">Email</th>
                      <th className="pb-3">Phone</th>
                      <th className="pb-3">Role</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-salon-border/60">
                    {filteredUsers.map((u) => {
                      const isTargetAdmin = u.role === "admin";
                      const isBlocked = !!u.isBlocked;
                      return (
                        <tr key={u._id} className="hover:bg-salon-bg/50">
                          <td className="py-3 flex items-center gap-2.5">
                            {u.image ? (
                              <img
                                src={u.image}
                                alt={u.name}
                                className="w-8 h-8 rounded-full object-cover border border-salon-border"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-salon-blush/10 text-salon-blush flex items-center justify-center font-bold text-xs">
                                {u.name?.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <span className="font-semibold text-salon-charcoal">{u.name}</span>
                          </td>
                          <td className="py-3 text-salon-muted">{u.email}</td>
                          <td className="py-3 text-salon-muted">{u.phone || "—"}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-stone-100 text-stone-700">
                              {u.role}
                            </span>
                          </td>
                          <td className="py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                isBlocked ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
                              }`}
                            >
                              {isBlocked ? "Blocked" : "Active"}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            {!isTargetAdmin && (
                              isBlocked ? (
                                <button
                                  onClick={() => handleUnblockUser(u._id, u.name)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-semibold"
                                >
                                  Unblock
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleBlockUser(u._id, u.name)}
                                  className="px-2.5 py-1 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold"
                                >
                                  Block
                                </button>
                              )
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: TRANSACTIONS */}
          {activeTab === "transactions" && (
            <div className="bg-salon-card rounded-2xl border border-salon-border p-6 shadow-soft space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-salon-charcoal">
                  Payment Ledger (Stripe Verified)
                </h3>
                <p className="text-xs text-salon-muted">
                  Immutable record of payments processed via Stripe Checkout and verified by Webhooks.
                </p>
              </div>

              {transactions.length === 0 ? (
                <EmptyState
                  title="No Transactions Recorded"
                  description="Transactions will appear here automatically when guests complete verified Stripe Checkout sessions."
                />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-salon-border text-salon-muted uppercase text-[10px] tracking-wider">
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Service Treatment</th>
                        <th className="pb-3">Amount</th>
                        <th className="pb-3">Currency</th>
                        <th className="pb-3">Stripe Session ID</th>
                        <th className="pb-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-salon-border/60">
                      {transactions.map((t) => (
                        <tr key={t._id} className="hover:bg-salon-bg/50">
                          <td className="py-3 text-salon-muted">
                            {new Date(t.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 font-semibold text-salon-charcoal">
                            {t.appointmentId?.serviceId?.serviceName || "Salon Treatment"}
                          </td>
                          <td className="py-3 font-bold text-salon-charcoal">
                            {formatPrice(t.amount)}
                          </td>
                          <td className="py-3 uppercase text-salon-muted">{t.currency}</td>
                          <td className="py-3 font-mono text-[11px] text-stone-500 truncate max-w-[160px]" title={t.stripeSessionId}>
                            {t.stripeSessionId}
                          </td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800">
                              {t.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: ADMIN PROFILE */}
          {activeTab === "profile" && (
            <div className="bg-salon-card rounded-2xl border border-salon-border p-6 sm:p-8 shadow-soft space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-salon-charcoal">
                  Administrator Profile
                </h3>
                <p className="text-xs text-salon-muted">
                  Update administrative contact credentials and executive avatar.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-xs font-semibold text-salon-charcoal mb-1.5">
                    Admin Name
                  </label>
                  <input
                    type="text"
                    required
                    value={adminName}
                    onChange={(e) => setAdminName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-salon-border bg-salon-bg text-xs text-salon-charcoal focus:outline-none focus:border-salon-blush"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-salon-charcoal mb-1.5">
                    Admin Email (Read-Only)
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
                    Direct Phone Line
                  </label>
                  <input
                    type="tel"
                    value={adminPhone}
                    onChange={(e) => setAdminPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-salon-border bg-salon-bg text-xs text-salon-charcoal focus:outline-none focus:border-salon-blush"
                  />
                </div>

                <div className="pt-2">
                  <ImageUpload
                    label="Executive Avatar Photo (ImgBB upload or URL)"
                    initialUrl={adminImage}
                    onUploaded={(url) => setAdminImage(url)}
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
                        <span>Updating Profile...</span>
                      </>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Add / Update Service Modal */}
      {serviceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-salon-charcoal/50 backdrop-blur-sm">
          <div className="bg-salon-card rounded-3xl border border-salon-border max-w-lg w-full p-6 shadow-card space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-salon-border pb-3">
              <h3 className="font-serif text-lg font-bold text-salon-charcoal">
                {editingServiceId ? "Update Salon Service" : "Add New Salon Service"}
              </h3>
              <button
                onClick={() => setServiceModalOpen(false)}
                className="text-salon-muted hover:text-salon-charcoal text-xs font-semibold"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-salon-charcoal mb-1">Service Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Signature Botanical Blowout"
                  value={serviceForm.serviceName}
                  onChange={(e) => setServiceForm({ ...serviceForm, serviceName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-salon-border text-xs focus:outline-none focus:border-salon-blush"
                />
              </div>

              <div>
                <label className="block font-semibold text-salon-charcoal mb-1">Category</label>
                <select
                  value={serviceForm.category}
                  onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-salon-border text-xs focus:outline-none focus:border-salon-blush"
                >
                  {SERVICE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-salon-charcoal mb-1">Price ($ USD)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    placeholder="65"
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({ ...serviceForm, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-salon-border text-xs focus:outline-none focus:border-salon-blush"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-salon-charcoal mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    placeholder="60"
                    value={serviceForm.duration}
                    onChange={(e) => setServiceForm({ ...serviceForm, duration: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-salon-border text-xs focus:outline-none focus:border-salon-blush"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-salon-charcoal mb-1">Status</label>
                <select
                  value={serviceForm.status}
                  onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-salon-border text-xs focus:outline-none focus:border-salon-blush"
                >
                  <option value="active">Active (Available for booking)</option>
                  <option value="inactive">Inactive (Hidden from public booking)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-salon-charcoal mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed treatment description and technique..."
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-salon-border text-xs focus:outline-none focus:border-salon-blush"
                />
              </div>

              {/* Service Image actual upload */}
              <div>
                <ImageUpload
                  label="Service Image (Upload actual image file via ImgBB)"
                  initialUrl={serviceForm.image}
                  onUploaded={(url) => setServiceForm({ ...serviceForm, image: url })}
                  allowManualUrl={true}
                />
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(false)}
                  className="w-1/3 py-2 rounded-xl bg-salon-bg text-salon-charcoal font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingService}
                  className="w-2/3 py-2 rounded-xl bg-salon-blush text-white font-semibold hover:bg-salon-blushHover shadow-sm flex items-center justify-center gap-2"
                >
                  {submittingService ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>{editingServiceId ? "Update Service" : "Create Service"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading administrator console..." />}>
      <AdminDashboardContent />
    </Suspense>
  );
}

