import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Leaf,
  CalendarCheck2,
  Star,
  Clock,
  CheckCircle,
} from "lucide-react";
import { ServiceCard, ServiceItem } from "@/components/ServiceCard";

// Static categories for direct filtering
const CATEGORIES = [
  {
    name: "Haircut & Styling",
    count: "Precision Cut, Blowout & Style",
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80",
    href: "/services?category=Haircut+%26+Styling",
  },
  {
    name: "Hair Coloring",
    count: "Balayage, Highlights & Gloss",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80",
    href: "/services?category=Hair Coloring",
  },
  {
    name: "Hair Treatment",
    count: "Keratin, Detox & Scalp Spa",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    href: "/services?category=Hair Treatment",
  },
  {
    name: "Facial & Skincare",
    count: "Hydra-Glow, Microderm & Peel",
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
    href: "/services?category=Facial+%26+Skincare",
  },
  {
    name: "Makeup",
    count: "Bridal, Red Carpet & Editorial",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
    href: "/services?category=Makeup",
  },
  {
    name: "Manicure & Pedicure",
    count: "Rose Petal Spa & Gel Nails",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80",
    href: "/services?category=Manicure+%26+Pedicure",
  },
  {
    name: "Spa & Massage",
    count: "Aromatherapy, Deep Tissue & Stones",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=600&q=80",
    href: "/services?category=Spa+%26+Massage",
  },
];

async function getFeaturedServices(): Promise<ServiceItem[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const res = await fetch(`${apiUrl}/api/services?status=active&limit=6`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    return [];
  }
}

export default async function HomePage() {
  const featuredServices = await getFeaturedServices();

  return (
    <div className="space-y-24 pb-20">
      {/* SECTION 1: HERO / BANNER */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-salon-blush/10 border border-salon-blush/30 text-salon-blush text-xs font-semibold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Premier Salon & Luxury Spa</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-salon-charcoal leading-[1.12]">
                Artisanal Beauty & <br className="hidden sm:inline" />
                <span className="italic font-normal text-salon-blush">Unmatched Relaxation</span>
              </h1>

              <p className="text-base sm:text-lg text-salon-muted max-w-xl font-sans leading-relaxed">
                Step into a serene sanctuary tailored to your individuality. Discover tailored precision haircuts, luminous color palettes, rejuvenating facials, and soothing spa therapies.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold text-white bg-salon-blush hover:bg-salon-blushHover shadow-card hover:shadow-hover transition-all duration-300"
                >
                  <span>Explore Salon Services</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-sm font-semibold text-salon-charcoal bg-salon-card border border-salon-border hover:border-salon-blush/50 transition-all shadow-soft"
                >
                  <span>Join SalonBook</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-salon-border/70 grid grid-cols-3 gap-6 text-salon-charcoal">
                <div>
                  <p className="font-serif text-2xl font-bold text-salon-charcoal">4.9 / 5</p>
                  <p className="text-xs text-salon-muted font-medium">Customer Rating</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-salon-charcoal">10,000+</p>
                  <p className="text-xs text-salon-muted font-medium">Appointments Booked</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-salon-charcoal">100%</p>
                  <p className="text-xs text-salon-muted font-medium">Organic Products</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-card border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80"
                    alt="Luxury Salon Experience"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-salon-charcoal/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-salon-blushLight">
                      Exclusive Experience
                    </span>
                    <p className="font-serif text-lg font-bold">The Signature Glow Sanctuary</p>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -left-6 bg-salon-card p-4 rounded-2xl shadow-hover border border-salon-border flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <CalendarCheck2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-salon-charcoal">Instant Online Booking</p>
                    <p className="text-[10px] text-salon-muted">Zero Wait Time • Safe Stripe Payments</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED SERVICES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-salon-blush text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Treatments</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-charcoal">
              Featured Salon Services
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold text-salon-blush hover:text-salon-blushHover group"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Service Grid from MongoDB */}
        {featuredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-salon-card rounded-2xl border border-salon-border p-8">
            <p className="text-xs text-salon-muted font-medium mb-3">
              Services are currently being loaded from the database. Please visit the services directory.
            </p>
            <Link
              href="/services"
              className="inline-block text-xs font-semibold text-salon-blush hover:underline"
            >
              Browse Salon Services Directory
            </Link>
          </div>
        )}
      </section>

      {/* SECTION 3: SERVICE CATEGORIES */}
      <section className="bg-salon-card border-y border-salon-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-salon-blush">
              Curated Collections
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-charcoal mt-2">
              Explore by Service Category
            </h2>
            <p className="text-xs sm:text-sm text-salon-muted mt-3">
              Find exactly what you desire from our comprehensive suites of hair, skin, nail, and wellness treatments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group relative rounded-2xl overflow-hidden border border-salon-border bg-salon-bg hover:shadow-card hover:border-salon-blush/40 transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-salon-charcoal/80 via-salon-charcoal/30 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-serif text-base font-bold group-hover:text-salon-blush transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-stone-300 mt-0.5">{cat.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE SALONBOOK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-bold tracking-widest text-salon-blush">
            The SalonBook Difference
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-charcoal mt-2">
            Why Our Guests Adore Us
          </h2>
          <p className="text-xs sm:text-sm text-salon-muted mt-3">
            Every appointment is crafted with thoughtful care, unmatched artistry, and clinical hygiene standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-salon-card p-6 rounded-2xl border border-salon-border shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-salon-blush/10 text-salon-blush flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-salon-charcoal mb-2">Master Stylists</h3>
            <p className="text-xs text-salon-muted leading-relaxed font-sans">
              Award-winning colorists and licensed aestheticians dedicated to crafting looks that elevate your personal aura.
            </p>
          </div>

          <div className="bg-salon-card p-6 rounded-2xl border border-salon-border shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-salon-blush/10 text-salon-blush flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-salon-charcoal mb-2">Organic & Clean</h3>
            <p className="text-xs text-salon-muted leading-relaxed font-sans">
              We exclusively utilize botanical, cruelty-free, and ammonia-free products that nurture both hair and scalp health.
            </p>
          </div>

          <div className="bg-salon-card p-6 rounded-2xl border border-salon-border shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-salon-blush/10 text-salon-blush flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-salon-charcoal mb-2">Pristine Hygiene</h3>
            <p className="text-xs text-salon-muted leading-relaxed font-sans">
              Hospital-grade autoclave sterilization for all precision instruments and sanitized private consultation suites.
            </p>
          </div>

          <div className="bg-salon-card p-6 rounded-2xl border border-salon-border shadow-soft hover:shadow-card transition-all">
            <div className="w-12 h-12 rounded-xl bg-salon-blush/10 text-salon-blush flex items-center justify-center mb-4">
              <CalendarCheck2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-salon-charcoal mb-2">Effortless Booking</h3>
            <p className="text-xs text-salon-muted leading-relaxed font-sans">
              Real-time slot availability, instant confirmation alerts, and secure digital Stripe card checkout.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4B: CUSTOMER TESTIMONIALS */}
      <section className="bg-salon-bg border-y border-salon-border/60 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-salon-blush">
              Guest Praise
            </span>
            <h2 className="font-serif text-3xl font-bold text-salon-charcoal mt-2">
              Stories of Transformation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-salon-card p-7 rounded-2xl border border-salon-border shadow-soft space-y-4">
              <div className="flex gap-1 text-salon-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-salon-gold" />
                ))}
              </div>
              <p className="text-xs text-salon-charcoal leading-relaxed italic font-serif">
                "The Sun-Kissed Balayage is legitimately the finest hair color work I have ever received in New York. The salon atmosphere feels like a European private club."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80"
                  alt="Elena Vance"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-salon-charcoal">Elena Vance</p>
                  <p className="text-[10px] text-salon-muted">Editorial Director</p>
                </div>
              </div>
            </div>

            <div className="bg-salon-card p-7 rounded-2xl border border-salon-border shadow-soft space-y-4">
              <div className="flex gap-1 text-salon-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-salon-gold" />
                ))}
              </div>
              <p className="text-xs text-salon-charcoal leading-relaxed italic font-serif">
                "Booking through SalonBook was effortless. Confirmed within minutes, seamless checkout via Stripe, and the Hydra-Luxe Facial gave me radiant skin for weeks."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Julian Mercer"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-salon-charcoal">Julian Mercer</p>
                  <p className="text-[10px] text-salon-muted">Architect</p>
                </div>
              </div>
            </div>

            <div className="bg-salon-card p-7 rounded-2xl border border-salon-border shadow-soft space-y-4">
              <div className="flex gap-1 text-salon-gold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-salon-gold" />
                ))}
              </div>
              <p className="text-xs text-salon-charcoal leading-relaxed italic font-serif">
                "The Japanese Head Spa and Aromatherapy deep tissue massage melted months of desk fatigue away. There is no other wellness retreat like SalonBook."
              </p>
              <div className="flex items-center gap-3 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
                  alt="Sophia Chen"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-salon-charcoal">Sophia Chen</p>
                  <p className="text-[10px] text-salon-muted">Creative Strategist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: FINAL BOOKING CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-salon-charcoal text-white p-8 sm:p-14 lg:p-20 shadow-card">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="inline-flex items-center gap-2 text-salon-blush text-xs font-semibold tracking-widest uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Reserve Your Moment</span>
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Ready to elevate your self-care ritual?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl font-sans">
              Choose your preferred date, select your artisan stylist, and experience timeless elegance at SalonBook.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover transition-all shadow-card"
              >
                <span>Book an Appointment Today</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sign-in"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-xs font-semibold text-white border border-stone-700 hover:bg-stone-800 transition-colors"
              >
                <span>Access Member Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
