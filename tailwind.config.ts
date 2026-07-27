import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        petrol: { DEFAULT: "#1F4E5F", 700: "#2C5F70" },
        ink: "#16242B",
        muted: "#5A6A70",
        gold: { DEFAULT: "#B8862F", light: "#E7C879" },
        // Page background — faint cool blue, not pure white.
        surface: "#F7FAFB",
        // One step deeper, so alternating sections stay distinguishable.
        soft: "#E9F1F3",
        sky: "#DCE7E5",
        line: "rgba(31,78,95,0.15)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "6px",
      },
      maxWidth: {
        content: "1120px",
      },
    },
  },
  plugins: [],
};

export default config;
