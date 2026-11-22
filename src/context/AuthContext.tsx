"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient, signIn, signUp, signOut } from "@/lib/auth-client";
import { api } from "@/lib/api";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: "customer" | "admin";
  isBlocked: boolean;
  phone?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  token: string | null;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  signUpWithEmail: (data: { name: string; email: string; password: string; image?: string; phone?: string }) => Promise<boolean>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Load fresh profile from backend using cookie or stored token
  const fetchProfile = useCallback(async () => {
    try {
      const res = await api.get("/api/profile");
      if (res.data?.success && res.data?.data) {
        const u = res.data.data;
        setUser({
          id: u._id || u.id,
          name: u.name,
          email: u.email,
          image: u.image || "",
          role: u.role || "customer",
          isBlocked: !!u.isBlocked,
          phone: u.phone || "",
        });
      }
    } catch (err: any) {
      // If profile request failed and unauthorized, reset user
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("salonbook_token");
      if (savedToken) {
        setToken(savedToken);
      }
    }
    fetchProfile();
  }, [fetchProfile]);

  const signInWithEmail = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        toast.error(res.error.message || "Failed to sign in. Please verify your credentials.");
        setLoading(false);
        return false;
      }

      // If token provided by Better Auth or session
      if ((res.data as any)?.token) {
        const t = (res.data as any).token;
        setToken(t);
        localStorage.setItem("salonbook_token", t);
      }

      await fetchProfile();
      toast.success("Welcome back to SalonBook!");
      return true;
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred during sign in.");
      setLoading(false);
      return false;
    }
  };

  const signUpWithEmail = async (data: {
    name: string;
    email: string;
    password: string;
    image?: string;
    phone?: string;
  }): Promise<boolean> => {
    try {
      setLoading(true);
      const res = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        image: data.image || "",
      });

      if (res.error) {
        toast.error(res.error.message || "Registration failed. Please check the information provided.");
        setLoading(false);
        return false;
      }

      if ((res.data as any)?.token) {
        const t = (res.data as any).token;
        setToken(t);
        localStorage.setItem("salonbook_token", t);
      }

      await fetchProfile();
      toast.success("Account created successfully! Welcome to SalonBook.");
      return true;
    } catch (err: any) {
      toast.error(err.message || "Failed to create account.");
      setLoading(false);
      return false;
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/dashboard`,
      });
    } catch (err: any) {
      toast.error("Google sign-in could not be initiated.");
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (e) {
      // Ignore network errors during sign out
    } finally {
      setUser(null);
      setToken(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("salonbook_token");
      }
      toast.success("Signed out successfully.");
      router.push("/");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        token,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        logout,
        refreshProfile: fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
