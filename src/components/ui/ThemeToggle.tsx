"use client";

import { useTheme } from "@/lib/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="relative w-12 h-6 rounded-full border border-default
                 transition-colors duration-300 focus:outline-none
                 focus-visible:ring-2 focus-visible:ring-accent"
      style={{
        backgroundColor:
          theme === "dark" ? "var(--accent)" : "var(--bg-raised)",
      }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-primary
                   flex items-center justify-center text-xs transition-transform duration-300"
        style={{
          transform: theme === "dark" ? "translateX(24px)" : "translateX(0)",
          backgroundColor: "var(--bg-primary)",
        }}
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
