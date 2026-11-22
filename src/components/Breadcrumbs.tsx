import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  return (
    <nav className="flex items-center space-x-1.5 text-xs text-salon-muted mb-6">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={item.label}>
            {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-salon-border shrink-0" />}
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-salon-blush transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-salon-charcoal truncate">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
