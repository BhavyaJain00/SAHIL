"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SPRING_DOT, SPRING_RING } from "@/lib/motion";

type CursorVariant = "default" | "link" | "play" | "hidden";

/**
 * Custom cursor as two coupled oscillators tracking the pointer:
 * the dot is critically damped (ζ = 1 — fastest possible settle with zero
 * overshoot), the ring is underdamped (ζ = 0.65) so it trails and
 * overshoots by e^(−πζ/√(1−ζ²)) ≈ 7% before locking on.
 * Elements can opt into variants via data-cursor="play" etc.; plain links
 * and buttons get the enlarged "link" ring automatically.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>("hidden");

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const dotX = useSpring(mx, SPRING_DOT);
  const dotY = useSpring(my, SPRING_DOT);
  const ringX = useSpring(mx, SPRING_RING);
  const ringY = useSpring(my, SPRING_RING);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      const target = e.target as Element | null;
      const tagged = target?.closest<HTMLElement>("[data-cursor]");
      let nextVariant: CursorVariant = "default";
      if (tagged) {
        nextVariant = (tagged.dataset.cursor as CursorVariant) ?? "link";
      } else if (target?.closest("a, button")) {
        nextVariant = "link";
      }
      setVariant((prev) => (prev !== nextVariant ? nextVariant : prev));
    };
    const onLeave = () => setVariant("hidden");
    const onEnter = () => setVariant("default");

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [mx, my]);

  if (!enabled) return null;

  const ring = {
    default: { width: 36, height: 36, opacity: 1 },
    link: { width: 56, height: 56, opacity: 1 },
    play: { width: 88, height: 88, opacity: 1 },
    hidden: { width: 36, height: 36, opacity: 0 },
  }[variant];

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: variant === "hidden" || variant === "play" ? 0 : 1 }}
      />
      <motion.div
        className={`pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full ${
          variant === "play"
            ? "bg-accent text-bg"
            : "border border-ink/50 mix-blend-difference"
        }`}
        style={{ x: ringX, y: ringY }}
        animate={ring}
        transition={{ type: "spring", ...SPRING_RING }}
      >
        {variant === "play" && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Play</span>
        )}
      </motion.div>
    </>
  );
}
