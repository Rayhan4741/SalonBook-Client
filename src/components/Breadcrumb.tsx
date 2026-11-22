import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="flex items-center space-x-2 text-xs text-salon-muted mb-6">
      <Link href="/" className="hover:text-salon-gold flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>
      {items.map((it, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3 h-3 text-salon-muted/40" />
          {it.href ? (
            <Link href={it.href} className="hover:text-salon-gold">{it.label}</Link>
          ) : (
            <span className="text-salon-creme font-medium">{it.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
