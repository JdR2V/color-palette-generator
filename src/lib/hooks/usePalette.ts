"use client";

import { useState, useCallback } from "react";
import {
  type Color,
  type HarmonyType,
  type ExportFormat,
  generateHarmony,
  colorFromHex,
} from "@/lib/color";

// Helper: generate a random hex color
function randomHex(): string {
  return Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");
}

interface PaletteState {
  baseHex: string;
  harmonyType: HarmonyType;
  palette: Color[];
  exportFormat: ExportFormat;
}

interface PaletteActions {
  setBaseHex: (hex: string) => void;
  setHarmonyType: (type: HarmonyType) => void;
  randomize: () => void;
  addColor: (hex: string) => void;
  removeColor: (index: number) => void;
  setExportFormat: (format: ExportFormat) => void;
  generateFromBase: () => void;
}

export function usePalette(): PaletteState & PaletteActions {
  const [baseHex, setBaseHexRaw] = useState<string>("3b82f6");
  const [harmonyType, setHarmonyTypeRaw] = useState<HarmonyType>("triadic");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("css");

  // Derive the palette from base + harmony type
  const [palette, setPalette] = useState<Color[]>(
    () => generateHarmony("3b82f6", "triadic").colors,
  );

  // When base or harmony changes, regenerate the palette
  const generateFromBase = useCallback(() => {
    const result = generateHarmony(baseHex, harmonyType);
    setPalette(result.colors);
  }, [baseHex, harmonyType]);

  function setBaseHex(hex: string) {
    const clean = hex.replace("#", "");
    setBaseHexRaw(clean);
    // Immediately regenerate with new base
    const result = generateHarmony(clean, harmonyType);
    setPalette(result.colors);
  }

  function setHarmonyType(type: HarmonyType) {
    setHarmonyTypeRaw(type);
    // Immediately regenerate with new harmony
    const result = generateHarmony(baseHex, type);
    setPalette(result.colors);
  }

  // Generate a completely random base color
  function randomize() {
    const hex = randomHex();
    setBaseHexRaw(hex);
    const result = generateHarmony(hex, harmonyType);
    setPalette(result.colors);
  }

  // Add a custom color to the palette (manual builder)
  function addColor(hex: string) {
    const clean = hex.replace("#", "");
    if (palette.length >= 8) return; // max 8 swatches
    setPalette((prev) => [...prev, colorFromHex(clean)]);
  }

  // Remove a color by index
  function removeColor(index: number) {
    if (palette.length <= 1) return; // always keep at least 1
    setPalette((prev) => prev.filter((_, i) => i !== index));
  }

  return {
    baseHex,
    harmonyType,
    palette,
    exportFormat,
    setBaseHex,
    setHarmonyType,
    randomize,
    addColor,
    removeColor,
    setExportFormat,
    generateFromBase,
  };
}
