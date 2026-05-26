"use client";

import { useState } from "react";
import { type Color } from "@/lib/color";
import { checkContrast, readableForeground } from "@/lib/color";

interface ColorSwatchProps {
  color: Color;
  index: number;
  onRemove: (index: number) => void;
  showRemove: boolean;
}

export function ColorSwatch({
  color,
  index,
  onRemove,
  showRemove,
}: ColorSwatchProps) {
  const [copied, setCopied] = useState(false);
  const fg = readableForeground(color.hex);

  // WCAG against white and black
  const vsWhite = checkContrast(color.hex, "ffffff");
  const vsBlack = checkContrast(color.hex, "000000");

  function copyHex() {
    navigator.clipboard
      .writeText(`#${color.hex.toUpperCase()}`)
      .catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div
      className="group relative flex-1 min-w-[120px] rounded-xl overflow-hidden
                 border transition-transform duration-150 hover:-translate-y-1 cursor-pointer"
      style={{ borderColor: "var(--border)" }}
      onClick={copyHex}
    >
      {/* Color block */}
      <div
        className="h-36 flex flex-col justify-end p-3"
        style={{ backgroundColor: `#${color.hex}` }}
      >
        {/* Remove button */}
        {showRemove && (
          <button
            className="absolute top-2 right-2 w-5 h-5 rounded-full text-xs
                       opacity-0 group-hover:opacity-100 transition-opacity duration-150
                       flex items-center justify-center"
            style={{ backgroundColor: "rgba(0,0,0,0.3)", color: "#fff" }}
            onClick={(e) => {
              e.stopPropagation();
              onRemove(index);
            }}
            aria-label="Remove color"
          >
            ✕
          </button>
        )}

        {/* Hex label */}
        <div style={{ color: fg }}>
          <div className="text-xs font-medium tracking-wider opacity-90">
            {copied ? "copied!" : `#${color.hex.toUpperCase()}`}
          </div>
          <div className="text-[10px] opacity-55 mt-0.5">
            hsl({color.hsl.h}, {color.hsl.s}%, {color.hsl.l}%)
          </div>
        </div>
      </div>

      {/* Info panel */}
      <div style={{ backgroundColor: "var(--bg-secondary)" }} className="p-3">
        <div
          className="text-[9px] tracking-wider mb-1.5"
          style={{ color: "var(--text-muted)" }}
        >
          contrast
        </div>
        <div className="flex gap-1 flex-wrap">
          <WcagBadge
            label={`${vsWhite.level} on ◻`}
            pass={vsWhite.passesNormalText}
          />
          <WcagBadge
            label={`${vsBlack.level} on ◼`}
            pass={vsBlack.passesNormalText}
          />
        </div>
        <div className="text-[9px] mt-2" style={{ color: "var(--text-muted)" }}>
          click to copy
        </div>
      </div>
    </div>
  );
}

function WcagBadge({ label, pass }: { label: string; pass: boolean }) {
  return (
    <span
      className="text-[9px] px-1.5 py-0.5 rounded border tracking-wider"
      style={{
        backgroundColor: pass ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)",
        color: pass ? "#4ade80" : "#ef4444",
        borderColor: pass ? "rgba(74,222,128,0.2)" : "rgba(239,68,68,0.15)",
      }}
    >
      {label}
    </span>
  );
}
