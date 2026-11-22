import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-semibold text-xs rounded-full transition-all disabled:opacity-60";
  const variants = {
    primary: "bg-salon-blush hover:bg-salon-blushHover text-white shadow-sm",
    secondary: "bg-salon-bg hover:bg-salon-border/60 text-salon-charcoal",
    outline: "border border-salon-border hover:border-salon-blush/60 text-salon-charcoal bg-transparent",
    danger: "bg-red-600 hover:bg-red-700 text-white",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], "px-5 py-2.5", className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};
