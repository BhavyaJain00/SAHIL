"use client";

import { useRef } from "react";
import { motion, useSpring } from "framer-motion";
import { SPRING_MAGNET, gaussianFalloff } from "@/lib/motion";

type MagneticProps = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

/**
 * Magnetic attraction modeled as a Gaussian field around the element's
 * center: pull(r) = strength · e^(−r²/2σ²) · r̂ — strongest engagement near
 * the center, smoothly fading with distance (no hard edge). Release snaps
 * back on an underdamped spring (ζ = 0.35), i.e. Hooke's law F = −kx with
 * low damping, so it wobbles once before settling.
 */
export function Magnetic({ children, className, strength = 0.5 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const x = useSpring(0, SPRING_MAGNET);
  const y = useSpring(0, SPRING_MAGNET);

  const handleMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    if (!rectRef.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
    const rect = rectRef.current;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const r = Math.hypot(dx, dy);
    const sigma = Math.max(rect.width, rect.height); // field width tied to element size
    const pull = strength * gaussianFalloff(r, sigma);
    x.set(dx * pull);
    y.set(dy * pull);
  };

  const reset = () => {
    rectRef.current = null;
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className ?? "inline-block"}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
