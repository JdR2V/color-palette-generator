/**
 * colorTheory.ts
 * ---------------
 * Generates harmonious color palettes from a single base color
 * using classical color theory relationships.
 *
 * All math operates in HSL space — hue values are degrees on
 * the color wheel (0–360°), wrapped with modulo arithmetic.
 *
 * Each harmony function returns a Color[] array where index 0
 * is always the base color, and the rest are the derived colors.
 */

import {
  type Color,
  type HSL,
  colorFromHex,
  colorFromHsl,
  wrapHue,
} from "./colorConvert";

// ─── Types ────────────────────────────────────────────────────────────────────

export type HarmonyType =
  | "complementary"
  | "analogous"
  | "triadic"
  | "split-complementary"
  | "tetradic"
  | "monochromatic";

export interface HarmonyResult {
  type: HarmonyType;
  label: string;
  description: string;
  colors: Color[];
}

// ─── Internal helper ──────────────────────────────────────────────────────────

/**
 * Derive a color by rotating the hue of a base HSL color.
 * Saturation and lightness are preserved unless overridden.
 */
function rotate(
  base: HSL,
  degrees: number,
  overrides: Partial<HSL> = {},
): Color {
  return colorFromHsl({
    h: wrapHue(base.h + degrees),
    s: base.s,
    l: base.l,
    ...overrides,
  });
}

// ─── Harmony functions ────────────────────────────────────────────────────────

/**
 * COMPLEMENTARY
 * Two colors directly opposite on the color wheel (180° apart).
 * High contrast, vibrant — use one as dominant, one as accent.
 *
 *   base ──────── base + 180°
 */
export function complementary(hex: string): HarmonyResult {
  const base = colorFromHex(hex);
  return {
    type: "complementary",
    label: "Complementary",
    description: "Two opposite colors — high contrast, bold accent.",
    colors: [base, rotate(base.hsl, 180)],
  };
}

/**
 * ANALOGOUS
 * Three colors adjacent on the wheel (30° steps).
 * Harmonious and natural — like colors found in sunsets or foliage.
 *
 *   base - 30° ── base ── base + 30°
 */
export function analogous(hex: string): HarmonyResult {
  const base = colorFromHex(hex);
  return {
    type: "analogous",
    label: "Analogous",
    description: "Three neighboring colors — harmonious and calm.",
    colors: [rotate(base.hsl, -30), base, rotate(base.hsl, 30)],
  };
}

/**
 * TRIADIC
 * Three colors evenly spaced around the wheel (120° apart).
 * Balanced and vibrant — all three colors compete equally.
 *
 *   base ── base + 120° ── base + 240°
 */
export function triadic(hex: string): HarmonyResult {
  const base = colorFromHex(hex);
  return {
    type: "triadic",
    label: "Triadic",
    description: "Three evenly spaced colors — vibrant and balanced.",
    colors: [base, rotate(base.hsl, 120), rotate(base.hsl, 240)],
  };
}

/**
 * SPLIT-COMPLEMENTARY
 * The base color + the two colors flanking its complement (150° and 210°).
 * Nearly as much contrast as complementary, but softer and more nuanced.
 *
 *   base ── base + 150° ── base + 210°
 */
export function splitComplementary(hex: string): HarmonyResult {
  const base = colorFromHex(hex);
  return {
    type: "split-complementary",
    label: "Split-Complementary",
    description:
      "Base + two colors flanking its complement — contrast with nuance.",
    colors: [base, rotate(base.hsl, 150), rotate(base.hsl, 210)],
  };
}

/**
 * TETRADIC (Square)
 * Four colors evenly spaced at 90° intervals.
 * Rich and complex — works best when one color dominates.
 *
 *   base ── base + 90° ── base + 180° ── base + 270°
 */
export function tetradic(hex: string): HarmonyResult {
  const base = colorFromHex(hex);
  return {
    type: "tetradic",
    label: "Tetradic",
    description:
      "Four colors at 90° intervals — rich, complex, use one as dominant.",
    colors: [
      base,
      rotate(base.hsl, 90),
      rotate(base.hsl, 180),
      rotate(base.hsl, 270),
    ],
  };
}

/**
 * MONOCHROMATIC
 * Five variations of the same hue — hue is fixed, lightness and
 * saturation are stepped across the range.
 * Elegant and cohesive — great for UI design systems.
 *
 *   base hue, L: 20% ── 35% ── 50% ── 65% ── 80%
 */
export function monochromatic(hex: string): HarmonyResult {
  const base = colorFromHex(hex);
  const { h } = base.hsl;

  // Five steps across lightness, keeping saturation strong
  const steps = [20, 35, 50, 65, 80].map((l) =>
    colorFromHsl({ h, s: Math.max(base.hsl.s, 40), l }),
  );

  return {
    type: "monochromatic",
    label: "Monochromatic",
    description: "One hue, five lightness steps — elegant and cohesive.",
    colors: steps,
  };
}

// ─── Main dispatcher ──────────────────────────────────────────────────────────

/**
 * Generate a palette for any harmony type from a base hex color.
 *
 * @example
 * const palette = generateHarmony('#3b82f6', 'triadic');
 * palette.colors.forEach(c => console.log(c.hex)); // → ['3b82f6', 'f6a93b', 'a93bf6']
 */
export function generateHarmony(hex: string, type: HarmonyType): HarmonyResult {
  switch (type) {
    case "complementary":
      return complementary(hex);
    case "analogous":
      return analogous(hex);
    case "triadic":
      return triadic(hex);
    case "split-complementary":
      return splitComplementary(hex);
    case "tetradic":
      return tetradic(hex);
    case "monochromatic":
      return monochromatic(hex);
    default:
      throw new Error(`Unknown harmony type: "${type}"`);
  }
}

// ─── Metadata (useful for building UI selectors) ──────────────────────────────

export const HARMONY_META: Record<
  HarmonyType,
  {
    label: string;
    description: string;
    count: number;
  }
> = {
  complementary: {
    label: "Complementary",
    description: "Opposite colors — bold contrast",
    count: 2,
  },
  analogous: {
    label: "Analogous",
    description: "Neighboring colors — calm and natural",
    count: 3,
  },
  triadic: {
    label: "Triadic",
    description: "Evenly spaced — vibrant and balanced",
    count: 3,
  },
  "split-complementary": {
    label: "Split-Complementary",
    description: "Base + complement neighbors — nuanced",
    count: 3,
  },
  tetradic: {
    label: "Tetradic",
    description: "Four at 90° — rich and complex",
    count: 4,
  },
  monochromatic: {
    label: "Monochromatic",
    description: "One hue, five steps — elegant and clean",
    count: 5,
  },
};
