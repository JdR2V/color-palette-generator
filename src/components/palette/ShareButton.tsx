"use client";

import { useState } from "react";
import { type Color } from "@/lib/color";

interface ShareButtonProps {
  colors: Color[];
}

export function ShareButton({ colors }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  function share() {
    // Encode palette as comma-separated hex values in the URL
    const hexes = colors.map((c) => c.hex).join(",");
    const url = `${window.location.origin}?palette=${hexes}`;
    navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={share}
      className="text-xs px-4 py-2 rounded-lg border tracking-wider
                 transition-all duration-150"
      style={{
        backgroundColor: copied ? "rgba(74,222,128,0.1)" : "var(--bg-surface)",
        color: copied ? "#4ade80" : "var(--text-secondary)",
        borderColor: copied ? "rgba(74,222,128,0.2)" : "var(--border)",
      }}
    >
      {copied ? "link copied ✓" : "share palette ↗"}
    </button>
  );
}
