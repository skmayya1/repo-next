"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false); // Default to light mode

    useEffect(() => {
        // Check for saved theme in localStorage
        const savedTheme = localStorage.getItem("theme");

        // Check for system preference
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        // Set the initial theme
        if (savedTheme === "dark" || (savedTheme === null && systemPrefersDark)) {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        } else {
            setDarkMode(false);
            document.documentElement.classList.remove("dark");
        }
    }, []);

    useEffect(() => {
        // Update the theme in localStorage and the document
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="border md:p-1.5 p-1 rounded-lg border-[#584B53] dark:border-zinc-700 antialiased dark:opacity-90 dark:hover:bg-[#2c2b2b]"
        >
            {darkMode ? <Moon size={22} /> : <Sun size={22} />}
        </button>
    );
}