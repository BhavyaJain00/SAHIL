"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextReveal } from "@/components/ui/Reveal";
import { useLoaded } from "@/components/ui/LoadProvider";
import { easeOutExpo, parallaxFactor, pendulumPeriod } from "@/lib/motion";
import { site, stats } from "@/data/portfolio";

// One viewport-height of scroll travel, distributed by perspective projection:
// a layer at depth z lags the content plane by S·(1 − 1/z).
const SCROLL_TRAVEL = 800;
const Z_BACKDROP = 1.6; // the giant outline word sits "behind" the page
const Z_TITLE = 1.25; // the headline block is just off the content plane

export function Hero() {
  const loaded = useLoaded();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(
    scrollYProgress,
    [0, 1],
    [0, SCROLL_TRAVEL * parallaxFactor(Z_BACKDROP)]
  );
  const yTitle = useTransform(
    scrollYProgress,
    [0, 1],
    [0, SCROLL_TRAVEL * parallaxFactor(Z_TITLE)]
  );
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [firstName, lastName] = site.name.split(" ");

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden px-5 pb-10 sm:px-8"
    >
      {/* Parallax background layer */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: yBg }} aria-hidden>
        <div className="absolute right-[-10%] top-[8%] select-none font-display text-[38vw] font-extrabold uppercase leading-none text-outline opacity-60">
          {site.brand.split(" ")[0]}
        </div>
        <div className="absolute left-1/2 top-1/3 h-[60vh] w-[60vw] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-[120px]" />
      </motion.div>

      <motion.div style={{ y: yTitle, opacity: fade }} className="relative">
        <motion.div
          className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span>{site.role} — VFX & Motion</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
            Available for work
          </span>
        </motion.div>

        <h1 className="font-display font-extrabold uppercase leading-[0.85] tracking-[-0.02em]">
          <TextReveal
            as="span"
            text={firstName}
            active={loaded}
            delay={0.15}
            className="block text-[clamp(4rem,16vw,14rem)]"
          />
          <TextReveal
            as="span"
            text={lastName}
            active={loaded}
            delay={0.28}
            className="block text-[clamp(4rem,16vw,14rem)] text-accent"
          />
        </h1>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:items-end">
          <motion.p
            className="max-w-md text-base leading-relaxed text-muted sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.8, ease: easeOutExpo }}
          >
            {site.tagline}.
          </motion.p>

          <motion.div
            className="flex items-end justify-between gap-6 sm:justify-end sm:gap-10"
            initial={{ opacity: 0, y: 24 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8, ease: easeOutExpo }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-bold sm:text-4xl">
                  {stat.value}
                  <span className="text-accent">{stat.suffix}</span>
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#work"
        className="absolute bottom-10 right-5 hidden flex-col items-center gap-3 sm:right-8 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        aria-label="Scroll to work"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted [writing-mode:vertical-lr]">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-line">
          {/* Sweep period = a 60cm pendulum: T = 2π√(L/g) ≈ 1.55s; sinusoidal
              easing ≈ simple harmonic motion along the track. */}
          <motion.span
            className="absolute left-0 top-0 h-1/2 w-full bg-accent"
            animate={{ y: ["-100%", "220%"] }}
            transition={{ duration: pendulumPeriod(0.6), repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
