import React from "react";
import { Sparkles } from "lucide-react";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  centered = true,
}) => {
  return (
    <div className={`space-y-3 ${centered ? "text-center max-w-2xl mx-auto" : "max-w-xl"}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 text-salon-blush text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{badge}</span>
        </span>
      )}
      <h1 className="font-serif text-3xl sm:text-4xl font-bold text-salon-charcoal">{title}</h1>
      {description && <p className="text-xs sm:text-sm text-salon-muted leading-relaxed font-sans">{description}</p>}
    </div>
  );
};
