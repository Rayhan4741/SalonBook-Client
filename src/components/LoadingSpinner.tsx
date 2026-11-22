import React from "react";
import { Sparkles } from "lucide-react";

export const LoadingSpinner: React.FC<{ message?: string }> = ({
  message = "Loading salon experiences...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-salon-border border-t-salon-blush animate-spin"></div>
        <Sparkles className="w-5 h-5 text-salon-blush animate-pulse" />
      </div>
      <p className="mt-4 text-xs font-medium tracking-wide text-salon-muted font-sans">
        {message}
      </p>
    </div>
  );
};
