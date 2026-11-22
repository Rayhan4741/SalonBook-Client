import React from "react";
import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export interface ServiceItem {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  status: "active" | "inactive";
}

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="group bg-salon-card rounded-2xl overflow-hidden border border-salon-border hover:border-salon-blush/40 transition-all duration-300 hover:shadow-card flex flex-col h-full">
      {/* Service Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-salon-bg">
        <img
          src={service.image}
          alt={service.serviceName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase bg-white/90 backdrop-blur-sm text-salon-charcoal shadow-sm">
            {service.category}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-salon-charcoal text-white shadow-md">
            {formatPrice(service.price)}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-salon-muted text-xs mb-2">
            <Clock className="w-3.5 h-3.5 text-salon-blush" />
            <span>{service.duration} mins treatment</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-salon-charcoal group-hover:text-salon-blush transition-colors line-clamp-1">
            {service.serviceName}
          </h3>

          <p className="mt-2 text-xs text-salon-muted line-clamp-2 leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4 mt-4 border-t border-salon-border/60">
          <Link
            href={`/services/${service._id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-salon-charcoal bg-salon-bg hover:bg-salon-blush hover:text-white transition-all duration-200"
          >
            <span>View Details & Book</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
