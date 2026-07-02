"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { TextReveal, FadeIn } from "@/components/ui/Reveal";
import { easeOutExpo, parallaxFactor } from "@/lib/motion";
import { experience, stats, tools } from "@/data/portfolio";

function StatNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  // Motion value renders straight to the DOM — no re-render per frame
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    // Newton's law of cooling: the count approaches its target
    // exponentially, dx/dt = −λ(x − target) — fast rise, asymptotic landing.
    const controls = animate(mv, value, { duration: 1.4, ease: easeOutExpo });
    return () => controls.stop();
  }, [inView, value, mv]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The backdrop word sits at depth z = 1.5; perspective projection makes it
  // lag the content plane by ±S·(1 − 1/z) across the section's scroll range.
  const deco = 360 * parallaxFactor(1.5);
  const yDeco = useTransform(scrollYProgress, [0, 1], [deco, -deco]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden border-t border-line px-5 py-24 sm:px-8 lg:py-36"
    >
      {/* Parallax background word */}
      <motion.div
        className="pointer-events-none absolute right-[-6%] top-1/4 select-none font-display text-[26vw] font-extrabold uppercase leading-none text-outline opacity-50"
        style={{ y: yDeco }}
        aria-hidden
      >
        EDIT
      </motion.div>

      <div className="relative grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20">
        <div className="self-start lg:sticky lg:top-28">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            02 / About
          </p>
          <TextReveal
            as="h2"
            text="THE EDITOR"
            className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-7xl"
          />
        </div>

        <div>
          <TextReveal
            as="p"
            text={experience.bio}
            stagger={0.015}
            className="text-[clamp(1.3rem,2.4vw,2rem)] font-medium leading-snug"
          />

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-10">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1}>
                <p className="font-display text-4xl font-extrabold sm:text-6xl">
                  <StatNumber value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  {stat.label}
                </p>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-14" delay={0.15}>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
              Toolkit
            </p>
            <div className="flex flex-wrap gap-2.5">
              {tools.map((tool) => (
                <span
                  key={tool}
                  data-cursor="link"
                  className="rounded-full border border-line px-4 py-2 text-sm text-ink/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  {tool}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
