export function canCustomerCancel(status: string): boolean {
  return status === 'pending';
}
