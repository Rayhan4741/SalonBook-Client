import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-salon-card border border-salon-gold/20 p-6 rounded-2xl max-w-md w-full shadow-2xl">
        <div className="flex items-center gap-3 text-salon-gold mb-3">
          <AlertCircle className="w-6 h-6 text-amber-400" />
          <h3 className="text-lg font-serif font-bold text-salon-creme">{title}</h3>
        </div>
        <p className="text-sm text-salon-muted mb-6">{description}</p>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-xl text-sm font-medium border border-salon-border text-salon-muted hover:text-salon-creme">
            {cancelLabel}
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-xl text-sm font-medium bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
