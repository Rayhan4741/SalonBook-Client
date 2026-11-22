import { convertToCsv } from './csvExport';
export function exportCustomersCsv(customers: any[]): void {
  const flattened = customers.map(c => ({
    ID: c._id,
    Name: c.name,
    Email: c.email,
    Role: c.role,
    Blocked: c.isBlocked ? 'YES' : 'NO',
    Created: c.createdAt || 'N/A',
  }));
  const csv = convertToCsv(flattened);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `SalonBook_Customers_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
