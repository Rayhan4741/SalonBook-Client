import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
export function CopyLinkPill({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-salon-card border border-salon-border text-salon-muted hover:text-salon-charcoal">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
      <span>{copied ? 'Copied' : 'Share Treatment'}</span>
    </button>
  );
}
