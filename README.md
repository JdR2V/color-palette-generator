# Random Color Palette Generator / Generador de colores aleatorio

# 🎨 Color Palette Generator v2

> Generate harmonious color palettes from color theory — not random chance.
> Export to CSS, Tailwind, SCSS, and JSON tokens.

[![Live Demo](https://img.shields.io/badge/Live_Demo-00c7b7?style=for-the-badge&logo=vercel&logoColor=white)](https://jdr2v.github.io/color-palette-generator/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-f0eeea?style=for-the-badge)](LICENSE)

---

## What is this?

Most color palette generators give you random colors. This one gives you colors
that **actually work together** — derived from real color theory relationships
computed in HSL space.

Built for designers, illustrators, game developers, and anyone who's ever stared
at a screen wondering why their colors feel *off*.

---

## Features

- **6 harmony types** — Complementary, Analogous, Triadic, Split-Complementary,
  Tetradic, Monochromatic
- **Random color generator** — one click, new base color with full harmony applied
- **Custom palette builder** — add individual random colors one by one, remove any swatch
- **WCAG contrast checker** — AA / AAA compliance badges on every color pair
- **Export formats** — CSS custom properties, Tailwind config, SCSS variables, JSON tokens
- **PNG download** — export the full palette as an image via Canvas API
- **Shareable URL** — every palette encoded in the URL, copy and share instantly
- **Light / dark theme** — toggle with a switch, persists via localStorage,
  no flash on load

---

## Color theory — how it works

The engine operates entirely in **HSL color space** — hue values are degrees
on the color wheel (0–360°), making harmonic relationships simple arithmetic:
Complementary       → H + 180°
Analogous           → H - 30°, H, H + 30°
Triadic             → H, H + 120°, H + 240°
Split-Complementary → H, H + 150°, H + 210°
Tetradic            → H, H + 90°, H + 180°, H + 270°
Monochromatic       → H fixed · L: 20%, 35%, 50%, 65%, 80%

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Color engine | Custom TypeScript (HSL math, Canvas API) |
| Deployment | GitHub Pages |
| CI/CD | GitHub Actions |

---

## Getting started

```bash
git clone https://github.com/JdR2V/color-palette-generator.git
cd color-palette-generator
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---
## Project structure

```
src/
├── app/
│   ├── layout.tsx          ← Root layout, theme provider, fonts
│   ├── page.tsx            ← Main app — assembles all components
│   └── globals.css         ← Design tokens (light + dark theme)
├── components/
│   ├── ui/
│   │   ├── Navbar.tsx
│   │   └── ThemeToggle.tsx
│   └── palette/
│       ├── ColorSwatch.tsx      ← Individual color card + WCAG badges
│       ├── HarmonySelector.tsx  ← Harmony type picker
│       ├── ExportPanel.tsx      ← Code export + PNG download
│       └── ShareButton.tsx      ← URL encoder
└── lib/
    ├── color/
    │   ├── colorConvert.ts  ← HEX ↔ RGB ↔ HSL
    │   ├── colorTheory.ts   ← 6 harmony generators
    │   ├── wcag.ts          ← Contrast ratio + WCAG levels
    │   ├── exportFormats.ts ← CSS, Tailwind, SCSS, JSON export
    │   └── imageExtract.ts  ← Canvas API dominant color extraction
    ├── context/
    │   └── ThemeContext.tsx ← Light/dark theme state + toggle
    ├── hooks/
    │   └── usePalette.ts    ← All palette state in one custom hook
    └── theme-script.ts      ← Flash-prevention inline script
```
---

## Deployment

Every push to `main` triggers GitHub Actions:
1. `npm ci` — clean install
2. `npm run build` — static export to `./out`
3. Deploy `./out` to `gh-pages` branch
4. GitHub Pages serves from `gh-pages`

Live at **[jdr2v.github.io/color-palette-generator](https://jdr2v.github.io/color-palette-generator/)**

---

## License

MIT © [JdR2V](https://github.com/JdR2V)
