export const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'icloud.com'];
export function suggestEmailDomain(input: string): string[] {
  const atIdx = input.indexOf('@');
  if (atIdx === -1) return [];
  const query = input.slice(atIdx + 1);
  return commonDomains.filter(d => d.startsWith(query)).map(d => input.slice(0, atIdx + 1) + d);
}
