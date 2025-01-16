"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check and set the theme from localStorage when the component mounts
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
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
            className="border p-1.5 rounded-lg border-[#584B53] dark:border-zinc-700 antialiased dark:opacity-90"
        >
            {darkMode ? <Moon size={22} /> : <Sun size={22} />}
        </button>
    );
}
