export const SALON_CATEGORIES = [
  "All",
  "Haircut & Styling",
  "Hair Coloring",
  "Hair Treatment",
  "Facial & Skincare",
  "Makeup",
  "Manicure & Pedicure",
  "Spa & Massage",
] as const;

export type SalonCategory = (typeof SALON_CATEGORIES)[number];
