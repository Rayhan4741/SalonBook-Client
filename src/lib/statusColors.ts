export function getAppointmentStatusBadgeClass(status: string): string {
  switch (status?.toLowerCase()) {
    case "confirmed":
      return "bg-emerald-100 text-emerald-800 border border-emerald-200";
    case "pending":
      return "bg-amber-100 text-amber-800 border border-amber-200";
    case "cancelled":
      return "bg-stone-200 text-stone-700 border border-stone-300";
    default:
      return "bg-stone-100 text-stone-700";
  }
}

export function getPaymentStatusBadgeClass(status: string): string {
  switch (status?.toLowerCase()) {
    case "paid":
      return "bg-blue-100 text-blue-800 border border-blue-200";
    case "unpaid":
      return "bg-stone-100 text-stone-700 border border-stone-200";
    default:
      return "bg-stone-100 text-stone-700";
  }
}
