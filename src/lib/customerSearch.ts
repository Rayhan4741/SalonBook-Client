export function searchCustomerList(customers: any[], query: string) {
  if (!query || !query.trim()) return customers;
  const q = query.toLowerCase().trim();
  return customers.filter((c) =>
    (c.name && c.name.toLowerCase().includes(q)) ||
    (c.email && c.email.toLowerCase().includes(q)) ||
    (c.phone && c.phone.toLowerCase().includes(q))
  );
}
