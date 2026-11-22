"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/sign-in");
      } else if (user.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/customer");
      }
    }
  }, [user, loading, router]);

  return <LoadingSpinner message="Redirecting to your personalized sanctuary dashboard..." />;
}
