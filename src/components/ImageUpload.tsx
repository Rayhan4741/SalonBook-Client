"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { api } from "@/lib/api";
import toast from "react-hot-toast";

interface ImageUploadProps {
  label: string;
  initialUrl?: string;
  onUploaded: (url: string) => void;
  allowManualUrl?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  label,
  initialUrl = "",
  onUploaded,
  allowManualUrl = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>(initialUrl);
  const [manualUrl, setManualUrl] = useState<string>(initialUrl);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate mime type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a JPEG, PNG, or WebP image file.");
      toast.error("Invalid file format.");
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit. Please upload a smaller image.");
      toast.error("File exceeds 5MB limit.");
      return;
    }

    // Create instant local preview
    const localPreview = URL.createObjectURL(file);
    setPreviewUrl(localPreview);

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", file);

      const res = await api.post("/api/uploads/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.success && res.data?.url) {
        setPreviewUrl(res.data.url);
        setManualUrl(res.data.url);
        onUploaded(res.data.url);
        toast.success("Image successfully uploaded!");
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to upload image to ImgBB.";
      setError(msg);
      toast.error(msg);
    } finally {
      setUploading(false);
    }
  };

  const handleManualUrlApply = () => {
    if (!manualUrl.trim()) return;
    setPreviewUrl(manualUrl.trim());
    onUploaded(manualUrl.trim());
    toast.success("Image URL applied.");
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-salon-charcoal">{label}</label>

      {/* Upload Drag/Click Zone */}
      <div
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all ${
          uploading
            ? "bg-salon-bg border-salon-blush/40 cursor-wait"
            : "border-salon-border hover:border-salon-blush/60 bg-salon-card"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          disabled={uploading}
        />

        {previewUrl ? (
          <div className="flex flex-col sm:flex-row items-center gap-4 text-left">
            <img
              src={previewUrl}
              alt="Upload preview"
              className="w-20 h-20 rounded-xl object-cover border border-salon-border shadow-sm shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-salon-charcoal">
                {uploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 text-salon-blush animate-spin" />
                    <span>Uploading image...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Image Ready</span>
                  </>
                )}
              </div>
              <p className="text-[11px] text-salon-muted truncate mt-0.5">
                Click to choose another photo (Max 5MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="py-4">
            <div className="w-10 h-10 rounded-full bg-salon-blush/10 text-salon-blush flex items-center justify-center mx-auto mb-2">
              <UploadCloud className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-salon-charcoal">
              Click to browse or drop image file
            </p>
            <p className="text-[10px] text-salon-muted mt-1">JPEG, PNG, or WebP up to 5MB</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-[11px] text-red-600 flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>{error}</span>
        </p>
      )}

      {/* Manual URL input option (Required for profile image) */}
      {allowManualUrl && (
        <div className="pt-1">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Or enter direct image URL (e.g. https://...)"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-xl border border-salon-border text-xs text-salon-charcoal focus:outline-none focus:border-salon-blush"
            />
            <button
              type="button"
              onClick={handleManualUrlApply}
              className="px-3 py-1.5 rounded-xl bg-salon-bg text-salon-charcoal border border-salon-border hover:bg-salon-border/40 text-xs font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
