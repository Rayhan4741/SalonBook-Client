import { Metadata } from 'next';

export function constructMetadata({
  title = 'SalonBook — Luxury Salon & Wellness Sanctuary',
  description = 'Experience haute coiffure, bespoke aesthetic rituals, and restorative wellness therapies.',
  image = '/og-image.jpg',
}: {
  title?: string;
  description?: string;
  image?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}
