import type { Config } from "tailwindcss";
import daisyui from "daisyui"

export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all files within the src directory
    "./src/app/**/*.{js,ts,jsx,tsx}", // Ensure app-specific files are included
    "./src/Components/**/*.{js,ts,jsx,tsx}", // Include the Components directory within src
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;
