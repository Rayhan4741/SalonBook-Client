"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Filter, SlidersHorizontal, X, Sparkles } from "lucide-react";
import { ServiceCard, ServiceItem } from "@/components/ServiceCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import { api } from "@/lib/api";

const CATEGORIES = [
  "All",
  "Haircut & Styling",
  "Hair Coloring",
  "Hair Treatment",
  "Facial & Skincare",
  "Makeup",
  "Manicure & Pedicure",
  "Spa & Massage",
];

function BrowseServicesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get("category") || "All";
  const initialSearch = searchParams.get("search") || "";

  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const [search, setSearch] = useState<string>(initialSearch);
  const [category, setCategory] = useState<string>(initialCategory);
  const [sort, setSort] = useState<string>("newest");

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      params.append("status", "active");

      if (category && category !== "All") {
        params.append("category", category);
      }

      if (search && search.trim()) {
        params.append("search", search.trim());
      }

      if (sort && sort !== "newest") {
        params.append("sort", sort);
      }

      const res = await api.get(`/api/services?${params.toString()}`);
      if (res.data?.success) {
        setServices(res.data.data || []);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load services from the salon database.");
    } finally {
      setLoading(false);
    }
  }, [category, search, sort]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchServices();
  };

  const handleResetFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("newest");
    router.push("/services");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Title & Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 text-salon-blush text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curated Treatment Menu</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-salon-charcoal">
          Browse Salon & Wellness Services
        </h1>
        <p className="text-xs sm:text-sm text-salon-muted leading-relaxed">
          Explore our complete collection of precision hair artistry, advanced dermal facials, restorative massages, and luxury nail treatments.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-salon-card rounded-2xl border border-salon-border p-4 sm:p-6 shadow-soft space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search className="w-4 h-4 text-salon-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search treatment by name (e.g. Balayage, Keratin, Facial)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-salon-border bg-salon-bg text-xs text-salon-charcoal focus:outline-none focus:border-salon-blush transition-colors"
            />
          </form>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-salon-muted" />
            <span className="text-xs text-salon-muted font-medium">Sort By:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2.5 rounded-xl border border-salon-border bg-salon-bg text-xs text-salon-charcoal focus:outline-none focus:border-salon-blush"
            >
              <option value="newest">Featured & Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="duration_asc">Duration: Shortest First</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-salon-border/60">
          <span className="text-xs font-semibold text-salon-charcoal mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-salon-blush" />
            Category:
          </span>
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-salon-blush text-white shadow-sm font-semibold"
                    : "bg-salon-bg text-salon-charcoal hover:bg-salon-border/50"
                }`}
              >
                {cat}
              </button>
            );
          })}

          {(category !== "All" || search || sort !== "newest") && (
            <button
              onClick={handleResetFilters}
              className="ml-auto inline-flex items-center gap-1 text-xs text-salon-blush hover:underline font-semibold"
            >
              <X className="w-3.5 h-3.5" />
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* Services List / States */}
      {loading ? (
        <LoadingSpinner message="Loading authentic salon services from database..." />
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-center text-xs max-w-md mx-auto">
          <p className="font-semibold mb-1">Unable to load services</p>
          <p>{error}</p>
          <button
            onClick={fetchServices}
            className="mt-3 px-4 py-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-800 font-semibold"
          >
            Retry
          </button>
        </div>
      ) : services.length === 0 ? (
        <EmptyState
          title="No Matching Services Found"
          description="We couldn't find any salon services matching your current search or category filter. Try refining your criteria or resetting filters."
          actionText="Reset All Filters"
          onAction={handleResetFilters}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between mb-6 text-xs text-salon-muted">
            <p>
              Showing <span className="font-semibold text-salon-charcoal">{services.length}</span> active treatments
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BrowseServicesPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading salon services catalog..." />}>
      <BrowseServicesContent />
    </Suspense>
  );
}

