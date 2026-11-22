import toast from "react-hot-toast";

export async function copyToClipboard(text: string, label: string = "Copied to clipboard!"): Promise<boolean> {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(label);
      return true;
    } catch {
      toast.error("Failed to copy to clipboard.");
      return false;
    }
  }
  return false;
}
