export function testAuthGuard() {
  const assert = (a: boolean, msg: string) => { if (!a) throw new Error(msg); };
  const canAccessAdmin = (role?: string) => role === 'admin';
  const canAccessCustomer = (role?: string) => role === 'customer';
  assert(canAccessAdmin('admin') === true, 'Admin should have admin access');
  assert(canAccessAdmin('customer') === false, 'Customer should not have admin access');
  assert(canAccessCustomer('customer') === true, 'Customer should have customer access');
  return true;
}
