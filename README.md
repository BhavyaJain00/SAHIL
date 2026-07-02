# FLUX® — Sahil Lunia, Video Editor Portfolio

A cinematic, editorial-style portfolio. Near-black canvas, bone-white type, signal-orange accent — built around motion.

## Motion system

Every animation derives from a physical or mathematical model, centralized in `src/lib/motion.ts`:

| Effect | Model |
| --- | --- |
| Preloader counter | Logistic S-curve (Verhulst equation `dP/dt = rP(1 − P/K)`) |
| Curtain exit, fades, stat counters | Exponential decay (`x(t) = 1 − e^(−λt)`, Newton's law of cooling) |
| Text reveals, letters, modal morph, nav, filter pill | Damped harmonic oscillator (`m·ẍ + c·ẋ + k·x = 0`), tuned by damping ratio ζ per role — ζ = 1 critically damped nav/cursor dot, ζ ≈ 0.72 text with ~4% overshoot, ζ ≈ 0.35 wobbly magnetic release |
| Magnetic buttons | Gaussian attraction field `e^(−r²/2σ²)` + Hooke's-law spring return |
| Parallax (hero, about) | Perspective projection — a layer at depth z lags by `S·(1 − 1/z)` |
| Scroll cue | Simple harmonic motion with a 60 cm pendulum's period `T = 2π√(L/g)` |

- **Preloader** — FLUX wordmark rises letter by letter with a 0–100 counter, then the whole screen lifts away as a curtain mask-reveal into the hero
- **Text reveals** — headings and paragraphs slide up out of overflow masks, staggered per word (`TextReveal` / `FadeIn` in `src/components/ui/Reveal.tsx`)
- **Micro-interactions** — magnetic buttons, rolling nav links, hover color/scale shifts, animated filter pill, custom cursor that morphs into a PLAY badge over videos
- **Grid-to-modal** — clicking a work card expands it into a full player via a shared layout animation (framer-motion `layoutId`), instead of opening a new page
- **Hover-to-play** — grid videos stay grayscale stills until hovered, then play in color

All motion respects `prefers-reduced-motion`.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Add more videos

1. Drop `.mp4` files into `public/assets/`
2. Add an entry in `src/data/portfolio.ts`:

```ts
{
  id: "my-clip",
  file: asset("my-video.mp4"),
  title: "My Video Title",
  category: "Trending Now",
  aspect: "16/9", // or "9/16" or "1/1"
  span: "wide",   // optional: "wide" | "tall" | "square" | "normal"
}
```

## Stack

Next.js 16 (Turbopack) · Framer Motion · Tailwind CSS 4 · Fonts: Syne / Inter / IBM Plex Mono
