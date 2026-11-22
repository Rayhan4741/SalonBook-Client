"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sparkles, Menu, X, User as UserIcon, LogOut, LayoutDashboard, Calendar, ShieldCheck } from "lucide-react";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getDashboardLink = () => {
    if (user?.role === "admin") return "/dashboard/admin";
    return "/dashboard/customer";
  };

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-salon-bg/95 backdrop-blur-md border-b border-salon-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-salon-blush/10 border border-salon-blush/30 flex items-center justify-center text-salon-blush group-hover:bg-salon-blush group-hover:text-white transition-all duration-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight text-salon-charcoal">
                Salon<span className="text-salon-blush">Book</span>
              </span>
              <span className="block text-[10px] tracking-widest uppercase text-salon-muted font-sans font-medium">
                Luxury & Wellness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium tracking-wide transition-colors ${
                isActive("/") ? "text-salon-blush font-semibold" : "text-salon-charcoal hover:text-salon-blush"
              }`}
            >
              Home
            </Link>
            <Link
              href="/services"
              className={`text-sm font-medium tracking-wide transition-colors ${
                isActive("/services") ? "text-salon-blush font-semibold" : "text-salon-charcoal hover:text-salon-blush"
              }`}
            >
              Browse Services
            </Link>
            {user && (
              <Link
                href={getDashboardLink()}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  pathname.startsWith("/dashboard")
                    ? "text-salon-blush font-semibold"
                    : "text-salon-charcoal hover:text-salon-blush"
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* User Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 px-3 py-1.5 rounded-full border border-salon-border bg-salon-card hover:border-salon-blush/40 transition-all shadow-sm"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-salon-border"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-salon-blush/10 text-salon-blush flex items-center justify-center font-bold text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-xs font-semibold text-salon-charcoal leading-tight truncate max-w-[120px]">
                      {user.name}
                    </p>
                    <span className="text-[10px] font-medium uppercase tracking-wider text-salon-muted">
                      {user.role}
                    </span>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div
                    onMouseLeave={() => setDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-salon-card rounded-2xl shadow-card border border-salon-border py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="px-4 py-2 border-b border-salon-border/60">
                      <p className="text-xs font-semibold text-salon-charcoal">{user.name}</p>
                      <p className="text-[11px] text-salon-muted truncate">{user.email}</p>
                      {user.role === "admin" && (
                        <span className="inline-flex items-center gap-1 mt-1 text-[10px] bg-salon-gold/10 text-salon-gold px-2 py-0.5 rounded-full font-medium">
                          <ShieldCheck className="w-3 h-3" /> Admin Privileges
                        </span>
                      )}
                    </div>
                    <Link
                      href={getDashboardLink()}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-salon-charcoal hover:bg-salon-bg transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-salon-muted" />
                      Dashboard
                    </Link>
                    <Link
                      href={user.role === "admin" ? "/dashboard/admin?tab=appointments" : "/dashboard/customer?tab=appointments"}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-salon-charcoal hover:bg-salon-bg transition-colors"
                    >
                      <Calendar className="w-4 h-4 text-salon-muted" />
                      Appointments
                    </Link>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/sign-in"
                  className="px-4 py-2 text-xs font-semibold text-salon-charcoal hover:text-salon-blush transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover rounded-full transition-all shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-salon-charcoal hover:text-salon-blush focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-salon-card border-b border-salon-border px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-salon-charcoal hover:text-salon-blush"
          >
            Home
          </Link>
          <Link
            href="/services"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-salon-charcoal hover:text-salon-blush"
          >
            Browse Services
          </Link>
          {user ? (
            <>
              <Link
                href={getDashboardLink()}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-salon-blush"
              >
                Dashboard ({user.role})
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full text-left py-2 text-sm font-medium text-red-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-salon-charcoal border border-salon-border rounded-xl"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-sm font-medium text-white bg-salon-blush rounded-xl"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
