export function calculateRevenueMetrics(transactions: any[]) {
  const successful = transactions.filter((t) => t.status === 'succeeded');
  const totalCents = successful.reduce((acc, t) => acc + (t.amount || 0), 0);
  const avgCents = successful.length > 0 ? Math.round(totalCents / successful.length) : 0;
  return {
    totalRevenue: totalCents,
    transactionCount: successful.length,
    averageOrderValue: avgCents,
  };
}
