export function testValidationHelper() {
  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isValidPhone = (p: string) => /^\+?[0-9\s\-\(\)]{7,20}$/.test(p);
  const assert = (a: boolean, msg: string) => { if (!a) throw new Error(msg); };
  assert(isValidEmail('guest@salon.com') === true, 'Valid email rejected');
  assert(isValidEmail('invalid-email') === false, 'Invalid email accepted');
  assert(isValidPhone('+1 (555) 019-2834') === true, 'Valid phone rejected');
  return true;
}
