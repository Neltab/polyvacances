import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          darker: "#312163",
          dark: "#5531A7",
          DEFAULT: "#9251F7",
          light: "#C696FC",
          lighter: "#EFE2F9",
          lightest: "#F8F2FC",
        },
        secondary: {
          darker: "#1F2347",
          dark: "#2A337E",
          DEFAULT: "#516CF7",
          light: "#D1FFEA",
          lighter: "#E1E7FE",
          lightest: "#F5F7FF",
        },
        grey: {
          darkest: "#232339",
          darker: "#2E2E48",
          dark: "#47516B",
          DEFAULT: "#79819A",
          light: "#ACB1C3",
          lighter: "#D9DFE8",
          lightest: "#E2E6EE",
          lightest2: "#F7F9FC",
        },
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
      },
      boxShadow: {
        DEFAULT: "2px 4px 11px rgba(232, 239, 249, 0.98);",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config