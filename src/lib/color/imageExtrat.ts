/**
 * imageExtract.ts
 * ----------------
 * Extracts dominant colors from an uploaded image using the browser's
 * Canvas API. No external libraries — runs entirely client-side.
 *
 * Algorithm:
 *   1. Draw the image onto a canvas (downscaled for performance)
 *   2. Read every pixel's RGBA data
 *   3. Cluster similar colors using a simplified median-cut approach
 *   4. Return the N most visually distinct colors
 *
 * NOTE: This file must only be imported in browser contexts
 * (i.e. inside onMount in Svelte, or in a +page.svelte, not +page.server.ts)
 */

import { type Color, colorFromHex, rgbToHex } from "./colorConvert";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Pixel {
  r: number;
  g: number;
  b: number;
}

// ─── Config ───────────────────────────────────────────────────────────────────

/** Downsample the image to this width before pixel analysis (performance) */
const SAMPLE_WIDTH = 100;

/** Skip pixels below this "colorfulness" threshold (greys and near-blacks) */
const MIN_SATURATION = 15;
const MIN_LIGHTNESS = 8;
const MAX_LIGHTNESS = 92;

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Extract `count` dominant colors from an image File or Blob.
 * Returns a Promise<Color[]> — call this inside an async handler.
 *
 * @example
 * const input = document.querySelector('input[type=file]');
 * input.addEventListener('change', async (e) => {
 *   const file = e.target.files[0];
 *   const colors = await extractColors(file, 5);
 *   console.log(colors.map(c => c.hex));
 * });
 */
export async function extractColors(
  source: File | Blob | string, // string = image URL
  count = 5,
): Promise<Color[]> {
  const pixels = await samplePixels(source);
  const filtered = pixels.filter(isColorful);
  if (filtered.length === 0) return [];

  const clusters = medianCut(filtered, count);
  const dominant = clusters
    .map(averageColor)
    .sort((a, b) => colorfulness(b) - colorfulness(a));

  return dominant.map((p) => colorFromHex(rgbToHex(p)));
}

// ─── Step 1: sample pixels from the image ─────────────────────────────────────

async function samplePixels(source: File | Blob | string): Promise<Pixel[]> {
  const url = typeof source === "string" ? source : URL.createObjectURL(source);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const scale = SAMPLE_WIDTH / img.width;
      const width = SAMPLE_WIDTH;
      const height = Math.round(img.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      const { data } = ctx.getImageData(0, 0, width, height);
      const pixels: Pixel[] = [];

      for (let i = 0; i < data.length; i += 4) {
        const a = data[i + 3];
        if (a < 128) continue; // skip transparent pixels
        pixels.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
      }

      if (typeof source !== "string") URL.revokeObjectURL(url);
      resolve(pixels);
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = url;
  });
}

// ─── Step 2: filter out near-greys and near-blacks/whites ─────────────────────

function isColorful({ r, g, b }: Pixel): boolean {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Lightness (0–100)
  const l = ((max + min) / 2 / 255) * 100;
  if (l < MIN_LIGHTNESS || l > MAX_LIGHTNESS) return false;

  // Saturation (0–100) — skip near-grey pixels
  const s =
    l < 50 ? (delta / (max + min)) * 100 : (delta / (510 - max - min)) * 100;
  return s >= MIN_SATURATION;
}

// ─── Step 3: median cut color quantization ────────────────────────────────────

/**
 * Simplified median cut algorithm.
 * Recursively splits the pixel set along its widest color channel
 * until we have `targetCount` buckets.
 */
function medianCut(pixels: Pixel[], targetCount: number): Pixel[][] {
  if (targetCount <= 1 || pixels.length === 0) return [pixels];

  const channel = widestChannel(pixels);
  const sorted = [...pixels].sort((a, b) => a[channel] - b[channel]);
  const mid = Math.floor(sorted.length / 2);

  const half = Math.floor(targetCount / 2);
  return [
    ...medianCut(sorted.slice(0, mid), half),
    ...medianCut(sorted.slice(mid), targetCount - half),
  ];
}

/** Find which RGB channel has the greatest range in this pixel set */
function widestChannel(pixels: Pixel[]): "r" | "g" | "b" {
  const channels: Array<"r" | "g" | "b"> = ["r", "g", "b"];
  let widest: "r" | "g" | "b" = "r";
  let maxRange = 0;

  for (const ch of channels) {
    const values = pixels.map((p) => p[ch]);
    const range = Math.max(...values) - Math.min(...values);
    if (range > maxRange) {
      maxRange = range;
      widest = ch;
    }
  }

  return widest;
}

// ─── Step 4: average each cluster into one representative color ───────────────

function averageColor(pixels: Pixel[]): Pixel {
  if (pixels.length === 0) return { r: 128, g: 128, b: 128 };
  const sum = pixels.reduce(
    (acc, p) => ({ r: acc.r + p.r, g: acc.g + p.g, b: acc.b + p.b }),
    { r: 0, g: 0, b: 0 },
  );
  return {
    r: Math.round(sum.r / pixels.length),
    g: Math.round(sum.g / pixels.length),
    b: Math.round(sum.b / pixels.length),
  };
}

// ─── Sort helper: colorfulness score ──────────────────────────────────────────

/** Simple colorfulness score for sorting (higher = more vivid) */
function colorfulness({ r, g, b }: Pixel): number {
  return Math.max(r, g, b) - Math.min(r, g, b);
}
