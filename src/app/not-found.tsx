import React from "react";
import Link from "next/link";
import { Sparkles, ArrowLeft, Home, Calendar } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md w-full space-y-6">
        {/* Luxury Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-serif tracking-widest uppercase bg-salon-blush/10 text-salon-blush border border-salon-blush/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Error 404 • Destination Unknown</span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="font-serif text-5xl sm:text-6xl font-bold text-salon-charcoal">
            404
          </h1>
          <h2 className="font-serif text-2xl font-bold text-salon-charcoal">
            Page Not Found
          </h2>
          <p className="text-xs sm:text-sm text-salon-muted leading-relaxed font-sans max-w-sm mx-auto">
            The treatment ritual, dashboard suite, or page you are seeking cannot be located in our sanctuary.
          </p>
        </div>

        {/* Helpful Navigation Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover shadow-soft transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Sanctuary</span>
          </Link>

          <Link
            href="/services"
            className="w-full sm:w-auto px-6 py-3 rounded-full text-xs font-semibold text-salon-charcoal bg-salon-card hover:bg-salon-bg border border-salon-border shadow-soft transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Explore Treatments</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
