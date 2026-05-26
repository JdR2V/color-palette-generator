/**
 * wcag.ts
 * --------
 * WCAG 2.1 contrast ratio calculations.
 *
 * Used to display AA / AAA compliance badges on each color pair
 * in the palette — especially useful for UI designers choosing
 * text and background color combinations.
 *
 * Spec: https://www.w3.org/TR/WCAG21/#contrast-minimum
 */

import { type RGB, hexToRgb } from "./colorConvert";

// ─── Types ────────────────────────────────────────────────────────────────────

export type WcagLevel = "AAA" | "AA" | "AA Large" | "Fail";

export interface ContrastResult {
  ratio: number; // e.g. 4.52
  ratioLabel: string; // e.g. "4.52:1"
  level: WcagLevel;
  passesNormalText: boolean; // AA: ratio >= 4.5
  passesLargeText: boolean; // AA Large: ratio >= 3.0
  passesEnhanced: boolean; // AAA: ratio >= 7.0
}

// ─── Relative luminance ───────────────────────────────────────────────────────

/**
 * Convert an 8-bit channel value (0–255) to its linear light contribution.
 * This is the sRGB linearisation step defined by WCAG.
 */
function linearise(channel: number): number {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Relative luminance of an RGB color (0 = black, 1 = white).
 */
export function relativeLuminance({ r, g, b }: RGB): number {
  return 0.2126 * linearise(r) + 0.7152 * linearise(g) + 0.0722 * linearise(b);
}

// ─── Contrast ratio ───────────────────────────────────────────────────────────

/**
 * WCAG contrast ratio between two colors.
 * Always returns a value >= 1 (lighter color luminance on top).
 */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = relativeLuminance(hexToRgb(hex1));
  const l2 = relativeLuminance(hexToRgb(hex2));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Full contrast analysis between two hex colors.
 * Returns ratio, formatted label, and WCAG compliance levels.
 */
export function checkContrast(hex1: string, hex2: string): ContrastResult {
  const ratio = contrastRatio(hex1, hex2);
  const rounded = Math.round(ratio * 100) / 100;

  const passesEnhanced = ratio >= 7.0;
  const passesNormalText = ratio >= 4.5;
  const passesLargeText = ratio >= 3.0;

  let level: WcagLevel;
  if (passesEnhanced) level = "AAA";
  else if (passesNormalText) level = "AA";
  else if (passesLargeText) level = "AA Large";
  else level = "Fail";

  return {
    ratio: rounded,
    ratioLabel: `${rounded}:1`,
    level,
    passesNormalText,
    passesLargeText,
    passesEnhanced,
  };
}

// ─── Readable foreground picker ───────────────────────────────────────────────

/**
 * Given a background hex color, returns either '#ffffff' or '#000000'
 * — whichever has the higher contrast ratio against the background.
 * Useful for deciding whether to render light or dark text on a swatch.
 */
export function readableForeground(
  backgroundHex: string,
): "#ffffff" | "#000000" {
  const againstWhite = contrastRatio(backgroundHex, "ffffff");
  const againstBlack = contrastRatio(backgroundHex, "000000");
  return againstWhite >= againstBlack ? "#ffffff" : "#000000";
}
