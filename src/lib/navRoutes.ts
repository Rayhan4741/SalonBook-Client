export interface NavRoute {
  label: string;
  href: string;
  roles?: ('admin' | 'customer')[];
}

export const appNavRoutes: NavRoute[] = [
  { label: 'Sanctuary', href: '/' },
  { label: 'Treatments', href: '/services' },
  { label: 'Customer Lounge', href: '/dashboard/customer', roles: ['customer'] },
  { label: 'Admin Suite', href: '/dashboard/admin', roles: ['admin'] },
];

export function getAuthorizedNav(role?: string) {
  return appNavRoutes.filter((r) => {
    if (!r.roles) return true;
    return role && r.roles.includes(role as any);
  });
}
