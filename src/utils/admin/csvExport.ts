export function convertToCsv(data: Record<string, any>[]): string {
  if (!data || !data.length) return '';
  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(h => JSON.stringify(obj[h] ?? '')).join(','));
  return [headers.join(','), ...rows].join('\r\n');
}
