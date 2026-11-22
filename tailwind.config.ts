import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        salon: {
          bg: "#FAF7F5",       // Warm ivory background
          card: "#FFFFFF",     // Clean neutral surface
          border: "#EFE8E3",   // Subtle warm border
          charcoal: "#1F1D1D", // Deep charcoal text
          muted: "#6E6966",    // Muted charcoal body text
          blush: "#D9777F",    // Muted rose / blush accent
          blushHover: "#C65F67",
          blushLight: "#FDF2F2",
          gold: "#C59B27",     // Premium gold accent
          goldLight: "#FBF7ED",
          darkSurface: "#191716",
        },
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(27, 22, 20, 0.05)",
        card: "0 10px 30px -4px rgba(27, 22, 20, 0.08)",
        hover: "0 20px 40px -6px rgba(27, 22, 20, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
