export function exportTransactionsToCsv(transactions: any[], filename: string = "salonbook-transactions.csv"): void {
  if (!transactions || transactions.length === 0) return;

  const headers = ["Transaction ID", "Date", "Service", "Amount", "Currency", "Stripe Session ID", "Status"];
  const rows = transactions.map((t) => [
    t._id,
    new Date(t.createdAt).toISOString(),
    `"${(t.appointmentId?.serviceId?.serviceName || "Service").replace(/"/g, '""')}"`,
    t.amount,
    t.currency,
    t.stripeSessionId,
    t.status,
  ]);

  const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
