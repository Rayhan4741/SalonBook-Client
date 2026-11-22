export function calculateServiceDiscount(originalPriceCents: number, discountPercent: number = 0) {
  if (!discountPercent || discountPercent <= 0) return { finalPrice: originalPriceCents, savings: 0 };
  const savings = Math.round((originalPriceCents * discountPercent) / 100);
  return {
    finalPrice: originalPriceCents - savings,
    savings,
  };
}
