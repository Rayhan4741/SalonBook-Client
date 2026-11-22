export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event] ${eventName}:`, params);
  }
}
