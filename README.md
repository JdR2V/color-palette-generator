# Random Color Palette Generator / Generador de colores aleatorio

# 🎨 Color Palette Generator v2

> Generate beautiful, theoretically grounded color palettes — powered by color theory, not random chance.

[![Live Demo](https://img.shields.io/badge/Live_Demo-00c7b7?style=for-the-badge&logo=netlify&logoColor=white)](https://newcolorpalette.netlify.app/)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-ff3e00?style=for-the-badge&logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-f0eeea?style=for-the-badge)](LICENSE)

---

## What is this?

Most color palette generators give you random colors. This one gives you colors that
**actually work together** — because they're derived from real color theory relationships:
complementary, analogous, triadic, split-complementary, and more.

Built for designers, illustrators, game developers, and anyone who's ever stared at a
screen wondering why their colors feel *off*.

This is a full rewrite of [v1](https://newcolorpalette.netlify.app/) — rebuilt from scratch
in SvelteKit + TypeScript with a proper color theory engine under the hood.

---

## Features

### ✅ Done
- Generate palettes up to 6 colors
- Add and remove individual swatches
- Export palette as `.png`
- Bilingual interface (English / Spanish)
- Responsive design

### 🚧 In progress (v2)
- **Color theory engine** — generate harmonious palettes from a base color using:
  - Complementary (opposite on the wheel)
  - Analogous (neighbors — 30° apart)
  - Triadic (120° apart — balanced and vibrant)
  - Split-complementary (base + two colors adjacent to its complement)
  - Tetradic / Square (four colors evenly spaced)
  - Monochromatic (same hue, varying lightness and saturation)
- **Extract palette from image** — upload any image and pull the dominant colors using the Canvas API
- **Export to multiple formats:**
  - PNG (existing)
  - CSS custom properties (`--color-primary: #3b82f6`)
  - Tailwind config object
  - Figma-compatible tokens (JSON)
  - Adobe ASE (planned)
- **Save palettes** — persist favourites to a backend with a shareable URL
- **Contrast checker** — WCAG AA/AAA compliance at a glance for every color pair
- Full SvelteKit + TypeScript rewrite

### 📋 Planned
- Color blindness simulator (deuteranopia, protanopia, tritanopia)
- Gradient generator from any two palette colors
- Community gallery of saved palettes

---

## Color theory — how it works

The engine works entirely in **HSL color space** (Hue, Saturation, Lightness), which maps
directly onto the color wheel and makes harmonic relationships trivial to compute.

```
Given a base color with hue H:

Complementary      → H + 180°
Analogous          → H - 30°, H, H + 30°
Triadic            → H, H + 120°, H + 240°
Split-complementary→ H, H + 150°, H + 210°
Tetradic           → H, H + 90°, H + 180°, H + 270°
Monochromatic      → H (fixed), S and L varied in steps
```

All hue values are modulo 360° to wrap around the wheel correctly.
The engine converts between RGB ↔ HSL ↔ HEX as needed for display and export.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | SvelteKit |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Color engine | Custom (HSL math, Canvas API) |
| Backend (palette saving) | Node.js + Express |
| Database | PostgreSQL + Prisma |
| Image processing | Canvas API (browser-native) |
| Deployment | GitHub Pages (frontend) · Railway (backend) |
| CI/CD | GitHub Actions |

---

## Getting started

```bash
# Clone the repo
git clone https://github.com/JdR2V/color-palette-generator.git
cd color-palette-generator

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Environment variables

Create a `.env` file in the root:

```env
# Only needed for palette saving feature
DATABASE_URL=postgresql://user:password@localhost:5432/palettes
```

---

## Project structure

```
src/
├── lib/
│   ├── color/
│   │   ├── colorTheory.ts      # HSL harmony engine
│   │   ├── colorConvert.ts     # RGB ↔ HSL ↔ HEX conversions
│   │   ├── imageExtract.ts     # Canvas API dominant color extraction
│   │   └── wcag.ts             # Contrast ratio calculations
│   ├── components/
│   │   ├── Swatch.svelte
│   │   ├── PaletteGrid.svelte
│   │   ├── HarmonyPicker.svelte
│   │   ├── ExportPanel.svelte
│   │   └── ImageUpload.svelte
│   └── stores/
│       └── palette.ts          # Svelte store for palette state
├── routes/
│   ├── +page.svelte            # Main app
│   └── palette/[id]/           # Shared palette view
└── app.html
```

---

## Why I built this

I come from a game development and multimedia production background, where
color theory is practical knowledge — not just aesthetic preference. Bad color
choices break immersion in games and make interfaces feel wrong even when
users can't articulate why.

Most palette tools are either too simple (random colors) or too complex
(full-blown design system managers). This sits in the middle: **principled but fast**.

---

## Contributing

Issues and PRs welcome. If you find a bug in the color math or want to add a
new harmony type, open an issue first so we can discuss the approach.

---

## License

MIT © [JdR2V](https://github.com/JdR2V)
//

Un generador de colores aleatorio simple. Permite crear paletas de hasta 6 colores. Puedes añadir y quitar colores. También puedes descargar la paleta en un archivo .png.
