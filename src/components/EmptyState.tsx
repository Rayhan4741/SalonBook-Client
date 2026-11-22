import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionHref,
  onAction,
}) => {
  return (
    <div className="bg-salon-card rounded-2xl border border-salon-border p-12 text-center max-w-md mx-auto my-8 shadow-soft">
      <div className="w-12 h-12 rounded-full bg-salon-blush/10 text-salon-blush flex items-center justify-center mx-auto mb-4">
        <Sparkles className="w-6 h-6" />
      </div>
      <h3 className="font-serif text-lg font-bold text-salon-charcoal mb-2">{title}</h3>
      <p className="text-xs text-salon-muted leading-relaxed mb-6 font-sans">{description}</p>
      {actionHref && actionText && (
        <Link
          href={actionHref}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover transition-all shadow-sm"
        >
          {actionText}
        </Link>
      )}
      {onAction && actionText && !actionHref && (
        <button
          onClick={onAction}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-salon-blush hover:bg-salon-blushHover transition-all shadow-sm"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
