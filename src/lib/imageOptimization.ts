export const allowedImageHosts = ['images.unsplash.com', 'i.ibb.co', 'res.cloudinary.com'];

export function isSafeImageUrl(url: string): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return allowedImageHosts.includes(parsed.hostname) || parsed.hostname.endsWith('ibb.co');
  } catch {
    return false;
  }
}
