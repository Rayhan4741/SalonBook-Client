import React from "react";
import Link from "next/link";
import { Sparkles, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-salon-darkSurface text-[#DCD7D4] pt-16 pb-12 border-t border-[#2D2A28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-salon-blush/20 border border-salon-blush/40 flex items-center justify-center text-salon-blush">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Salon<span className="text-salon-blush">Book</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-sans">
              Experience the pinnacle of luxury wellness and personalized beauty treatments. Dedicated artisans creating timeless styling and rejuvenating self-care rituals.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-salon-blush hover:bg-stone-700 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-salon-blush hover:bg-stone-700 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-stone-400 hover:text-salon-blush hover:bg-stone-700 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-serif">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-salon-blush transition-colors">
                  Home Sanctuary
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-salon-blush transition-colors">
                  Explore Treatments
                </Link>
              </li>
              <li>
                <Link href="/services?category=Haircut+%26+Styling" className="hover:text-salon-blush transition-colors">
                  Hair & Styling
                </Link>
              </li>
              <li>
                <Link href="/services?category=Facial+%26+Skincare" className="hover:text-salon-blush transition-colors">
                  Facial & Skincare
                </Link>
              </li>
              <li>
                <Link href="/services?category=Spa+%26+Massage" className="hover:text-salon-blush transition-colors">
                  Spa & Wellness
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours & Schedule */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-serif">Opening Hours</h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-salon-blush shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Monday — Friday</p>
                  <p>9:00 AM – 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-salon-blush shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Saturday</p>
                  <p>9:00 AM – 7:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-salon-blush shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Sunday</p>
                  <p>10:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Studio Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white font-serif">Salon Studio</h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-salon-blush shrink-0 mt-0.5" />
                <span>482 Madison Avenue, Suite 7A, Manhattan, NY 10022</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-salon-blush shrink-0" />
                <span>+1 (212) 555-0198</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-salon-blush shrink-0" />
                <span>concierge@salonbook.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} SalonBook Platform Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Booking Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
