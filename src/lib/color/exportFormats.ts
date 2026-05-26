/**
 * exportFormats.ts
 * -----------------
 * Converts a palette (Color[]) into various export formats.
 * All functions return a string — the caller decides what to do
 * with it (copy to clipboard, trigger download, etc).
 */

import { type Color } from "./colorConvert";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ExportFormat =
  | "css"
  | "tailwind"
  | "json-tokens"
  | "scss"
  | "hex-list";

// ─── CSS Custom Properties ────────────────────────────────────────────────────

/**
 * Exports as CSS custom properties (design tokens).
 *
 * Output:
 *   :root {
 *     --color-1: #3b82f6;
 *     --color-2: #f6a93b;
 *   }
 */
export function toCssVariables(colors: Color[], prefix = "color"): string {
  const declarations = colors
    .map((c, i) => `  --${prefix}-${i + 1}: #${c.hex};`)
    .join("\n");
  return `:root {\n${declarations}\n}`;
}

// ─── Tailwind Config ──────────────────────────────────────────────────────────

/**
 * Exports as a Tailwind CSS config `colors` object.
 * Paste into tailwind.config.js → theme.extend.colors
 *
 * Output:
 *   palette: {
 *     1: '#3b82f6',
 *     2: '#f6a93b',
 *   }
 */
export function toTailwindConfig(colors: Color[], name = "palette"): string {
  const entries = colors.map((c, i) => `    ${i + 1}: '#${c.hex}',`).join("\n");
  return `// tailwind.config.js → theme.extend.colors\n${name}: {\n${entries}\n}`;
}

// ─── Design Tokens (JSON) ─────────────────────────────────────────────────────

/**
 * Exports as W3C Design Token Community Group format (JSON).
 * Compatible with Figma tokens, Style Dictionary, and Token Studio.
 *
 * Output:
 *   {
 *     "color": {
 *       "1": { "$value": "#3b82f6", "$type": "color" },
 *       ...
 *     }
 *   }
 */
export function toJsonTokens(colors: Color[], group = "color"): string {
  const tokens: Record<
    string,
    Record<string, { $value: string; $type: string }>
  > = {
    [group]: {},
  };
  colors.forEach((c, i) => {
    tokens[group][String(i + 1)] = { $value: `#${c.hex}`, $type: "color" };
  });
  return JSON.stringify(tokens, null, 2);
}

// ─── SCSS Variables ───────────────────────────────────────────────────────────

/**
 * Exports as SCSS variable declarations.
 *
 * Output:
 *   $color-1: #3b82f6;
 *   $color-2: #f6a93b;
 */
export function toScssVariables(colors: Color[], prefix = "color"): string {
  return colors.map((c, i) => `$${prefix}-${i + 1}: #${c.hex};`).join("\n");
}

// ─── Plain hex list ───────────────────────────────────────────────────────────

/**
 * Exports as a plain list of hex values, one per line.
 * Useful for copy-pasting into tools that accept raw hex.
 */
export function toHexList(colors: Color[]): string {
  return colors.map((c) => `#${c.hex}`).join("\n");
}

// ─── HSL list (human-readable) ────────────────────────────────────────────────

/**
 * Exports as a list of HSL values — useful for
 * designers who think in HSL space.
 */
export function toHslList(colors: Color[]): string {
  return colors
    .map((c) => `hsl(${c.hsl.h}, ${c.hsl.s}%, ${c.hsl.l}%)`)
    .join("\n");
}

// ─── Main dispatcher ──────────────────────────────────────────────────────────

export function exportPalette(
  colors: Color[],
  format: ExportFormat,
  name = "palette",
): string {
  switch (format) {
    case "css":
      return toCssVariables(colors, name);
    case "tailwind":
      return toTailwindConfig(colors, name);
    case "json-tokens":
      return toJsonTokens(colors, name);
    case "scss":
      return toScssVariables(colors, name);
    case "hex-list":
      return toHexList(colors);
    default:
      throw new Error(`Unknown export format: "${format}"`);
  }
}

// ─── Export format metadata (for building UI) ─────────────────────────────────

export const EXPORT_FORMAT_META: Record<
  ExportFormat,
  {
    label: string;
    description: string;
    fileExtension: string;
    mimeType: string;
  }
> = {
  css: {
    label: "CSS Variables",
    description: ":root { --color-1: ... }",
    fileExtension: ".css",
    mimeType: "text/css",
  },
  tailwind: {
    label: "Tailwind Config",
    description: "theme.extend.colors { }",
    fileExtension: ".js",
    mimeType: "text/javascript",
  },
  "json-tokens": {
    label: "Design Tokens",
    description: "W3C JSON token format",
    fileExtension: ".json",
    mimeType: "application/json",
  },
  scss: {
    label: "SCSS Variables",
    description: "$color-1: #hex;",
    fileExtension: ".scss",
    mimeType: "text/x-scss",
  },
  "hex-list": {
    label: "Hex List",
    description: "Plain #hex values",
    fileExtension: ".txt",
    mimeType: "text/plain",
  },
};
