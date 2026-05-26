"use client";

import { useState } from "react";
import {
  type Color,
  type ExportFormat,
  exportPalette,
  EXPORT_FORMAT_META,
} from "@/lib/color";

interface ExportPanelProps {
  colors: Color[];
}

export function ExportPanel({ colors }: ExportPanelProps) {
  const [format, setFormat] = useState<ExportFormat>("css");
  const [copied, setCopied] = useState(false);

  const code = exportPalette(colors, format);

  function copyCode() {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // PNG download via Canvas API
  function downloadPng() {
    const SWATCH_W = 160;
    const SWATCH_H = 200;
    const INFO_H = 60;
    const canvas = document.createElement("canvas");
    canvas.width = SWATCH_W * colors.length;
    canvas.height = SWATCH_H + INFO_H;
    const ctx = canvas.getContext("2d")!;

    colors.forEach((color, i) => {
      const x = i * SWATCH_W;

      // Color block
      ctx.fillStyle = `#${color.hex}`;
      ctx.fillRect(x, 0, SWATCH_W, SWATCH_H);

      // Info panel
      ctx.fillStyle = "#1a1a2e";
      ctx.fillRect(x, SWATCH_H, SWATCH_W, INFO_H);

      // Hex text
      ctx.fillStyle = "#f0eeea";
      ctx.font = "bold 13px monospace";
      ctx.fillText(`#${color.hex.toUpperCase()}`, x + 12, SWATCH_H + 22);

      // HSL text
      ctx.fillStyle = "#6b6b80";
      ctx.font = "10px monospace";
      ctx.fillText(
        `hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`,
        x + 12,
        SWATCH_H + 42,
      );
    });

    // Trigger download
    const link = document.createElement("a");
    link.download = "palette.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Format tabs */}
      <div
        className="flex border-b overflow-x-auto"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--bg-secondary)",
        }}
      >
        {(
          Object.entries(EXPORT_FORMAT_META) as [
            ExportFormat,
            (typeof EXPORT_FORMAT_META)[ExportFormat],
          ][]
        ).map(([f, meta]) => (
          <button
            key={f}
            onClick={() => setFormat(f)}
            className="px-4 py-2.5 text-[10px] tracking-wider whitespace-nowrap
                         border-b-2 transition-all duration-150 flex-shrink-0"
            style={{
              color: format === f ? "var(--accent)" : "var(--text-muted)",
              borderColor: format === f ? "var(--accent)" : "transparent",
              backgroundColor:
                format === f ? "var(--accent-subtle)" : "transparent",
            }}
          >
            {meta.label}
          </button>
        ))}

        {/* Download PNG button — lives in the tab row */}
        <button
          onClick={downloadPng}
          className="ml-auto px-4 py-2.5 text-[10px] tracking-wider flex-shrink-0
                     transition-colors duration-150"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          ↓ png
        </button>
      </div>

      {/* Code display */}
      <div
        className="relative"
        style={{ backgroundColor: "var(--bg-surface)" }}
      >
        <pre
          className="p-4 text-xs leading-relaxed overflow-x-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          {code}
        </pre>
        <button
          onClick={copyCode}
          className="absolute top-3 right-3 text-[10px] tracking-wider px-2.5 py-1
                     rounded border transition-all duration-150"
          style={{
            backgroundColor: copied
              ? "rgba(74,222,128,0.1)"
              : "var(--bg-raised)",
            color: copied ? "#4ade80" : "var(--accent)",
            borderColor: copied
              ? "rgba(74,222,128,0.2)"
              : "var(--border-bright)",
          }}
        >
          {copied ? "copied ✓" : "copy"}
        </button>
      </div>
    </div>
  );
}
