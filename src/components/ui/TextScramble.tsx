"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const GLYPHS = "0123456789!@#$%^&*()_+~|}{[]:;?><,./-=";

interface TextScrambleProps {
  text: string;
  className?: string;
  duration?: number; // total duration of the animation in ms
  trigger?: "hover" | "load" | "scroll";
}

/**
 * High-performance text scramble effect.
 * Animates text characters from randomized glyphs back to the original text.
 * Triggers on hover, page load, or when scrolled into view.
 */
export function TextScramble({
  text,
  className,
  duration = 800,
  trigger = "hover",
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);

  const startScramble = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    const length = text.length;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Solve resolved character index linearly based on progress
      const resolvedCount = Math.floor(progress * length);

      let scrambled = "";
      for (let i = 0; i < length; i++) {
        if (i < resolvedCount) {
          scrambled += text[i];
        } else if (text[i] === " ") {
          scrambled += " ";
        } else {
          // Keep the original case spacing/structure, select random glyph
          scrambled += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplayText(scrambled);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayText(text);
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(tick);
  }, [text, duration, isAnimating]);

  useEffect(() => {
    if (trigger === "load") {
      startScramble();
    } else if (trigger === "scroll" && typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startScramble();
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
      return () => observer.disconnect();
    }
  }, [trigger, startScramble]);

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      startScramble();
    }
  };

  return (
    <span
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      className={className}
      style={{ display: "inline-block" }}
    >
      {displayText}
    </span>
  );
}
