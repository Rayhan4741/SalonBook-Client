export function evaluatePasswordStrength(pwd: string): { score: number; label: string } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const labels = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Excellent'];
  return { score, label: labels[Math.min(score, 4)] };
}
