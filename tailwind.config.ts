import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0f172a", // slate-900-ish
          soft: "#111827"     // gray-900
        },
        panel: {
          DEFAULT: "#111827",
          soft: "#0b1220",
          border: "#1f2937"
        },
        accent: {
          DEFAULT: "#10b981"
        }
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.25)"
      }
    }
  },
  plugins: []
} satisfies Config;
