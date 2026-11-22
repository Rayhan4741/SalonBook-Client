export function calculateTotalWithTax(subtotal: number, taxRate: number = 0.08875): { subtotal: number; tax: number; total: number } {
  const tax = Math.round(subtotal * taxRate * 100) / 100;
  const total = Math.round((subtotal + tax) * 100) / 100;
  return { subtotal, tax, total };
}
