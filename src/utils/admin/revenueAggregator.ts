export function aggregateRevenueByMonth(transactions: any[]): Record<string, number> {
  const months: Record<string, number> = {};
  for (const t of transactions) {
    if (t.status === 'succeeded') {
      const date = new Date(t.createdAt || Date.now());
      const key = date.toLocaleString('default', { month: 'short' });
      months[key] = (months[key] || 0) + (t.amount || 0);
    }
  }
  return months;
}
