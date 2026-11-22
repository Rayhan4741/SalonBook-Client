"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import toast from "react-hot-toast";

function SignInContent() {
  const { user, signInWithEmail, signInWithGoogle, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // If already logged in, redirect based on role
  useEffect(() => {
    if (user) {
      if (redirectPath) {
        router.push(redirectPath);
      } else if (user.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/customer");
      }
    }
  }, [user, redirectPath, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      setSubmitting(true);
      const success = await signInWithEmail(email.trim(), password);
      if (success) {
        // Redirection will be triggered by useEffect upon user state update
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-salon-card rounded-3xl border border-salon-border shadow-card p-8 sm:p-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-salon-blush/10 text-salon-blush flex items-center justify-center mx-auto mb-3">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-salon-charcoal">
            Welcome to SalonBook
          </h1>
          <p className="text-xs text-salon-muted font-sans">
            Sign in to manage your appointments, payments, and beauty rituals.
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-salon-charcoal mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-salon-blush" />
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. guest@salonbook.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-salon-border bg-salon-bg text-xs text-salon-charcoal focus:outline-none focus:border-salon-blush transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-salon-charcoal mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-salon-blush" />
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-salon-border bg-salon-bg text-xs text-salon-charcoal focus:outline-none focus:border-salon-blush transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-salon-muted hover:text-salon-charcoal"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || authLoading}
            className="w-full py-3 px-6 rounded-full text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover shadow-card hover:shadow-hover transition-all flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-salon-border"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-wider text-salon-muted">
            <span className="bg-salon-card px-2">Or continue with</span>
          </div>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={() => signInWithGoogle()}
          className="w-full py-2.5 px-4 rounded-full border border-salon-border bg-salon-card hover:bg-salon-bg text-xs font-semibold text-salon-charcoal transition-all flex items-center justify-center gap-2 shadow-soft"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.99 0 12s.45 3.85 1.24 5.42l4.04-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Footer Link */}
        <p className="text-center text-xs text-salon-muted pt-2">
          New to SalonBook?{" "}
          <Link href="/sign-up" className="text-salon-blush font-semibold hover:underline">
            Create an Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading sign-in portal..." />}>
      <SignInContent />
    </Suspense>
  );
}

