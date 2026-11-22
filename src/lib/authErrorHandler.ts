export function humanizeAuthError(err: any): string {
  const msg = err?.response?.data?.message || err?.message || '';
  if (msg.includes('INVALID_EMAIL_OR_PASSWORD') || msg.includes('Invalid credentials')) {
    return 'Invalid email address or password provided. Please double-check your credentials.';
  }
  if (msg.includes('USER_ALREADY_EXISTS') || msg.includes('duplicate')) {
    return 'An account already exists under this email address. Please sign in instead.';
  }
  if (msg.includes('BLOCKED')) {
    return 'Your account has been suspended by administration. Please reach out to customer care.';
  }
  return msg || 'Authentication request could not be completed. Please try again.';
}
