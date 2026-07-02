"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SPRING_TEXT, easeOutExpo } from "@/lib/motion";

const TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
  span: motion.span,
} as const;

type TextRevealProps = {
  text: string;
  as?: keyof typeof TAGS;
  className?: string;
  delay?: number;
  stagger?: number;
  /** When provided the reveal is driven by this flag; otherwise it fires on scroll into view. */
  active?: boolean;
};

/**
 * Splits text into words and slides each one up out of an overflow mask.
 * Each word is an underdamped oscillator (ζ = 0.72) released toward
 * equilibrium — it overshoots the baseline by ~4% and settles, instead of
 * gliding in on a bezier.
 */
export function TextReveal({
  text,
  as = "div",
  className,
  delay = 0,
  stagger = 0.045,
  active,
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const Tag = TAGS[as];

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : stagger, delayChildren: delay } },
  };

  const word: Variants = reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.4 } },
      }
    : {
        hidden: { y: "115%" },
        visible: { y: "0%", transition: { type: "spring", ...SPRING_TEXT } },
      };

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      {...(active === undefined
        ? { whileInView: "visible", viewport: { once: true, margin: "-12% 0px" } }
        : { animate: active ? "visible" : "hidden" })}
    >
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden py-[0.1em] -my-[0.1em] align-bottom mr-[0.25em]"
        >
          <motion.span className="inline-block" variants={word}>
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

/** Fade + rise on exponential decay — dx/dt = −λx, so it lands asymptotically. */
export function FadeIn({ children, className, delay = 0, y = 28 }: FadeInProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}
