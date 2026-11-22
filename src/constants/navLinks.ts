export interface NavItem {
  label: string;
  href: string;
  requiresAuth?: boolean;
}

export const MAIN_NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Browse Services", href: "/services" },
];

export const FOOTER_TREATMENT_LINKS: NavItem[] = [
  { label: "Hair & Styling", href: "/services?category=Haircut+%26+Styling" },
  { label: "Facial & Skincare", href: "/services?category=Facial+%26+Skincare" },
  { label: "Spa & Wellness", href: "/services?category=Spa+%26+Massage" },
  { label: "Hair Coloring", href: "/services?category=Hair Coloring" },
];
