import type { Config } from "tailwindcss";
import daisyui from "daisyui";

interface CustomConfig extends Config {
    daisyui: {
        themes?: string[] | boolean;
    };
}

const config: CustomConfig = {
    darkMode: "class", // Ensure dark mode is controlled by the `dark` class
    content: [
        "./src/**/*.{js,ts,jsx,tsx}", // Adjust this path to match your project structure
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
    daisyui: {
        themes: false, // Disable DaisyUI's theming system
    },
} 

export default config;