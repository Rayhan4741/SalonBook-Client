export function generateBreadcrumbSchema(serviceName: string, serviceUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://salonbook.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://salonbook.app/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: serviceName,
        item: serviceUrl,
      },
    ],
  };
}
