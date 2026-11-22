export interface PasswordScore {
  score: number; // 0 to 4
  label: "Very Weak" | "Weak" | "Fair" | "Good" | "Strong";
  color: string;
}

export function evaluatePasswordStrength(password: string): PasswordScore {
  let score = 0;
  if (!password) return { score: 0, label: "Very Weak", color: "bg-stone-300" };

  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 1:
      return { score: 1, label: "Weak", color: "bg-red-500" };
    case 2:
      return { score: 2, label: "Fair", color: "bg-amber-500" };
    case 3:
      return { score: 3, label: "Good", color: "bg-blue-500" };
    case 4:
      return { score: 4, label: "Strong", color: "bg-emerald-500" };
    default:
      return { score: 0, label: "Very Weak", color: "bg-stone-300" };
  }
}
