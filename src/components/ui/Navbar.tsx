"use client";

import { useState, useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
                  border-b ${scrolled ? "border-default" : "border-transparent"}`}
      style={{
        backgroundColor: scrolled ? "var(--bg-secondary)" : "transparent",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div
          className="font-display font-bold text-lg"
          style={{ color: "var(--text-primary)" }}
        >
          Palette<span style={{ color: "var(--accent)" }}>.</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/JdR2V/color-palette-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-wider transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            github ↗
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
