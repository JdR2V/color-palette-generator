/**
 * colorConvert.ts
 * ---------------
 * Conversions between HEX, RGB, and HSL color spaces.
 * All functions are pure — no side effects, no state.
 *
 * HSL is the working space for all color theory calculations.
 * RGB/HEX are used for display and export only.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RGB {
  r: number; // 0–255
  g: number; // 0–255
  b: number; // 0–255
}

export interface HSL {
  h: number; // 0–360  (hue, degrees on the color wheel)
  s: number; // 0–100  (saturation, percent)
  l: number; // 0–100  (lightness, percent)
}

export interface Color {
  hex: string;
  rgb: RGB;
  hsl: HSL;
}

// ─── HEX helpers ──────────────────────────────────────────────────────────────

/**
 * Normalize a hex string to the full 6-character lowercase form.
 * Accepts: #abc, #aabbcc, abc, aabbcc
 */
export function normalizeHex(hex: string): string {
  const clean = hex.replace(/^#/, "");
  if (clean.length === 3) {
    return clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  if (clean.length === 6) return clean.toLowerCase();
  throw new Error(`Invalid hex color: "${hex}"`);
}

export function hexToRgb(hex: string): RGB {
  const clean = normalizeHex(hex);
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  return [r, g, b]
    .map((v) => Math.round(v).toString(16).padStart(2, "0"))
    .join("");
}

// ─── RGB ↔ HSL ────────────────────────────────────────────────────────────────

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;

  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));

    switch (max) {
      case rn:
        h = ((gn - bn) / delta) % 6;
        break;
      case gn:
        h = (bn - rn) / delta + 2;
        break;
      case bn:
        h = (rn - gn) / delta + 4;
        break;
    }

    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  return {
    h,
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const sn = s / 100;
  const ln = l / 100;

  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// ─── Convenience: HEX ↔ HSL ───────────────────────────────────────────────────

export function hexToHsl(hex: string): HSL {
  return rgbToHsl(hexToRgb(hex));
}

export function hslToHex(hsl: HSL): string {
  return rgbToHex(hslToRgb(hsl));
}

// ─── Build a full Color object from any starting point ────────────────────────

export function colorFromHex(hex: string): Color {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  return { hex: normalizeHex(hex), rgb, hsl };
}

export function colorFromHsl(hsl: HSL): Color {
  const rgb = hslToRgb(hsl);
  const hex = rgbToHex(rgb);
  return { hex, rgb, hsl };
}

// ─── Utility: wrap hue to 0–360 ───────────────────────────────────────────────

export function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}
