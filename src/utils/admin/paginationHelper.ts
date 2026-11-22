export function paginateArray<T>(items: T[], page: number, perPage: number): { data: T[]; totalPages: number; currentPage: number } {
  const totalPages = Math.ceil(items.length / perPage) || 1;
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const data = items.slice((currentPage - 1) * perPage, currentPage * perPage);
  return { data, totalPages, currentPage };
}
