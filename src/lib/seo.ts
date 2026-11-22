export function getSalonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: 'SalonBook Luxury Sanctuary',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=1200',
    telephone: '+1-212-555-0198',
    email: 'concierge@salonbook.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '482 Madison Avenue, Suite 7A',
      addressLocality: 'New York',
      addressRegion: 'NY',
      postalCode: '10022',
      addressCountry: 'US'
    },
    priceRange: '$$$$'
  };
}
