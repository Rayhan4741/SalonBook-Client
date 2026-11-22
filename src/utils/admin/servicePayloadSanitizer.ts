export function sanitizeServicePayload(raw: any) {
  return {
    name: (raw.name || '').trim(),
    description: (raw.description || '').trim(),
    category: (raw.category || 'Hair').trim(),
    price: Math.round(Number(raw.price) * 100), // convert dollars to cents
    duration: Number(raw.duration) || 60,
    image: raw.image || '',
    isActive: raw.isActive !== false,
  };
}
