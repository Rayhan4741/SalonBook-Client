import React, { useEffect } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-salon-charcoal/50 backdrop-blur-sm animate-in fade-in">
      <div className="bg-salon-card rounded-3xl border border-salon-border max-w-lg w-full p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between border-b border-salon-border pb-3">
          <h3 className="font-serif text-lg font-bold text-salon-charcoal">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full text-salon-muted hover:text-salon-charcoal">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
