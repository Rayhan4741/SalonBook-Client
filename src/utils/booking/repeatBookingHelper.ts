export function constructRebookUrl(serviceId: string): string {
  return `/services/${serviceId}?rebook=true`;
}
