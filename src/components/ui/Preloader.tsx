"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { site } from "@/data/portfolio";
import { SPRING_TEXT, easeInOutExpo, logistic } from "@/lib/motion";

// Loader progress follows the Verhulst logistic equation dP/dt = rP(1 − P/K):
// slow start, rapid middle, asymptotic finish — how loading actually feels.
const COUNTER_EASE = logistic(9, 0.5);

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion();

  // Motion values write straight to the DOM — no React re-renders at 60fps
  const progress = useMotionValue(0);
  const counterText = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));
  const lineScale = useTransform(progress, (v) => v / 100);

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(onComplete, 350);
      return () => clearTimeout(t);
    }
    const controls = animate(progress, 100, {
      duration: 1.9,
      ease: COUNTER_EASE,
      onComplete: () => onComplete(),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const letters = site.brand.split(" ")[0].split(""); // "FLUX"

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-5 py-6 sm:px-8"
      exit={{ y: "-100%" }}
      // Curtain lifts on an exponential in-out (2^±20t): accelerates like a
      // released mass, decelerates asymptotically at the top.
      transition={{ duration: 0.9, ease: easeInOutExpo }}
      aria-hidden
    >
      {/* Accent edge that trails the curtain as it lifts */}
      <div className="absolute left-0 top-full h-[14vh] w-full bg-accent" />

      <motion.div
        className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.6 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <span>{site.name}</span>
        <span>Portfolio — 2026</span>
      </motion.div>

      <motion.div
        className="flex items-baseline justify-center"
        exit={{ opacity: 0, transition: { duration: 0.25 } }}
      >
        <div className="flex overflow-hidden py-[0.1em] font-display text-[clamp(4rem,16vw,11rem)] font-extrabold uppercase leading-none tracking-tight">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ y: "110%" }}
              // Each letter is an underdamped oscillator (ζ = 0.72) released
              // toward its baseline — slight overshoot, then settle.
              animate={{
                y: "0%",
                transition: { delay: 0.15 + i * 0.08, type: "spring", ...SPRING_TEXT },
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>
        <motion.span
          className="font-display text-2xl text-accent sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.7, duration: 0.4 } }}
        >
          ®
        </motion.span>
      </motion.div>

      <motion.div
        className="flex items-end justify-between"
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Loading reel
        </span>
        <motion.span className="font-mono text-5xl tabular-nums text-ink sm:text-6xl">
          {counterText}
        </motion.span>
      </motion.div>

      {/* Progress line */}
      <motion.div
        className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
        style={{ scaleX: lineScale }}
      />
    </motion.div>
  );
}
