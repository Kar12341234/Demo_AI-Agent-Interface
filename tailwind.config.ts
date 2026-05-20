import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 42px rgba(34, 211, 238, 0.18)",
        panel: "0 24px 80px rgba(2, 6, 23, 0.36)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["Menlo", "Consolas", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
