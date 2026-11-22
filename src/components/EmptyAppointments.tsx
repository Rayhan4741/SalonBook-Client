import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
export function EmptyAppointmentsView() {
  return (
    <div className="p-12 text-center rounded-2xl border border-dashed border-salon-gold/20 bg-salon-card/20">
      <Calendar className="w-10 h-10 mx-auto text-salon-muted/40 mb-3" />
      <h3 className="font-serif text-lg font-bold text-salon-creme mb-1">No Reservations Found</h3>
      <p className="text-xs text-salon-muted max-w-sm mx-auto mb-6">You currently have no scheduled appointments in this category.</p>
      <Link href="/services" className="inline-flex px-5 py-2.5 rounded-full bg-salon-gold text-salon-dark text-xs font-bold uppercase tracking-wider">
        Explore Treatments
      </Link>
    </div>
  );
}
