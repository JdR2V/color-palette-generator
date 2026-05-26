"use client";

import { useEffect } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { ColorSwatch } from "@/components/palette/ColorSwatch";
import { HarmonySelector } from "@/components/palette/HarmonySelector";
import { ExportPanel } from "@/components/palette/ExportPanel";
import { ShareButton } from "@/components/palette/ShareButton";
import { usePalette } from "@/lib/hooks/usePalette";
import { type HarmonyType, HARMONY_META } from "@/lib/color";

export default function Home() {
  const {
    baseHex,
    harmonyType,
    palette,
    setBaseHex,
    setHarmonyType,
    randomize,
    addColor,
    removeColor,
  } = usePalette();

  // Read palette from URL on load (shareable URL support)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const palette = params.get("palette");
    if (palette) {
      const hexes = palette.split(",").filter((h) => /^[0-9a-f]{6}$/i.test(h));
      if (hexes.length > 0) {
        // Set first color as base, then add the rest manually
        setBaseHex(hexes[0]);
        // Note: addColor would be called here for a more complete
        // implementation — expand this as you develop the app
      }
    }
  }, []);

  return (
    <>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-24 pb-20">
        {/* ── HEADER ───────────────────────────────────────────────────── */}
        <div className="mb-12">
          <div
            className="flex items-center gap-3 mb-4 text-xs tracking-[0.2em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            <div
              className="w-6 h-px"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent), transparent)",
              }}
            />
            color theory engine
          </div>
          <h1
            className="font-display font-bold tracking-tight mb-3"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.5rem)",
              color: "var(--text-primary)",
            }}
          >
            Color Palette
            <br />
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              Generator
            </em>
          </h1>
          <p
            className="text-sm leading-relaxed max-w-md"
            style={{ color: "var(--text-secondary)" }}
          >
            Harmonious palettes from color theory — not random chance. Export to
            CSS, Tailwind, SCSS, and JSON tokens.
          </p>
        </div>

        {/* ── CONTROLS ─────────────────────────────────────────────────── */}
        <div
          className="rounded-2xl border p-6 mb-6"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          <div className="flex flex-wrap items-end gap-6 mb-6">
            {/* Base color picker */}
            <div>
              <div
                className="text-[9px] tracking-[0.18em] uppercase mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                base color
              </div>
              <div
                className="flex items-center gap-3 border rounded-lg px-3 py-2"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--bg-surface)",
                }}
              >
                <input
                  type="color"
                  value={`#${baseHex}`}
                  onChange={(e) => setBaseHex(e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent p-0"
                />
                <span
                  className="text-xs tracking-wider"
                  style={{ color: "var(--text-primary)" }}
                >
                  #{baseHex.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Randomize button */}
            <button
              onClick={randomize}
              className="text-xs px-4 py-2.5 rounded-lg border tracking-wider
                         transition-all duration-150 flex items-center gap-2"
              style={{
                backgroundColor: "var(--bg-surface)",
                color: "var(--text-secondary)",
                borderColor: "var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--accent)";
                e.currentTarget.style.color = "var(--accent)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.color = "var(--text-secondary)";
              }}
            >
              <span>⟳</span> random color
            </button>

            {/* Harmony info */}
            <div className="ml-auto text-right hidden md:block">
              <div
                className="text-xs font-medium mb-0.5"
                style={{ color: "var(--text-primary)" }}
              >
                {HARMONY_META[harmonyType].label}
              </div>
              <div
                className="text-[10px]"
                style={{ color: "var(--text-muted)" }}
              >
                {HARMONY_META[harmonyType].description}
              </div>
            </div>
          </div>

          {/* Harmony selector */}
          <div>
            <div
              className="text-[9px] tracking-[0.18em] uppercase mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              harmony type
            </div>
            <HarmonySelector value={harmonyType} onChange={setHarmonyType} />
          </div>
        </div>

        {/* ── PALETTE SWATCHES ─────────────────────────────────────────── */}
        <div className="flex gap-3 mb-4 overflow-x-auto pb-2">
          {palette.map((color, i) => (
            <ColorSwatch
              key={`${color.hex}-${i}`}
              color={color}
              index={i}
              onRemove={removeColor}
              showRemove={palette.length > 1}
            />
          ))}
        </div>

        {/* ── PALETTE ACTIONS ───────────────────────────────────────────── */}
        <div className="flex items-center gap-3 mb-8 flex-wrap">
          <ShareButton colors={palette} />
          <div
            className="text-[10px] tracking-wider"
            style={{ color: "var(--text-muted)" }}
          >
            {palette.length} color{palette.length !== 1 ? "s" : ""}
            {palette.length < 8 && " · click swatch to copy"}
          </div>
        </div>

        {/* ── EXPORT PANEL ─────────────────────────────────────────────── */}
        <div className="mb-4">
          <div
            className="text-[9px] tracking-[0.2em] uppercase mb-3 flex items-center gap-3"
            style={{ color: "var(--text-muted)" }}
          >
            <span>export</span>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "var(--border)" }}
            />
          </div>
          <ExportPanel colors={palette} />
        </div>
      </main>
    </>
  );
}
