export function filterServicesBySearch(services: any[], query: string, category: string) {
  return services.filter(s => {
    const matchQ = !query || s.name.toLowerCase().includes(query.toLowerCase());
    const matchC = !category || category === 'All' || s.category === category;
    return matchQ && matchC;
  });
}
