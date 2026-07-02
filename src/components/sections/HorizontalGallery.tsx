"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { videos } from "@/data/portfolio";
import { TextReveal } from "@/components/ui/Reveal";

/**
 * Scroll-driven Horizontal Gallery.
 * Pins the viewport using CSS sticky positioning over a tall container (320vh)
 * and translates a wide film track horizontally based on the vertical scroll progression.
 * Displays all videos across multiple aspect ratios (16/9, 9/16, 1/1) like an editor's timeline.
 */
function HorizontalGalleryCard({ item, index }: { item: typeof videos[number]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "250px" }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const play = () => {
    videoRef.current?.play().catch(() => {});
  };

  const stop = () => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 2.0;
  };

  return (
    <div
      ref={cardRef}
      style={{ aspectRatio: item.aspect }}
      className="group relative h-[36vh] sm:h-[45vh] shrink-0 overflow-hidden rounded-md bg-bg-soft ring-1 ring-line"
      data-cursor="play"
      onMouseEnter={play}
      onMouseLeave={stop}
    >
      {/* Widescreen / vertical / square video (mounted dynamically on viewport intersection) */}
      {inView ? (
        <video
          ref={videoRef}
          src={`${item.file}#t=2.0`}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-60 brightness-[0.7] grayscale transition-all duration-700 group-hover:scale-104 group-hover:opacity-90 group-hover:brightness-100 group-hover:grayscale-0"
        />
      ) : (
        <div className="absolute inset-0 h-full w-full bg-bg-soft/50 animate-pulse" />
      )}

      {/* Film frame overlay graphics */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6 pointer-events-none z-10">
        <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-ink/40">
          CLIP // 0{index + 1}
        </div>
        <div>
          <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-wide text-ink drop-shadow-md">
            {item.title}
          </h3>
          <p className="mt-1 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-accent font-semibold">
            {item.category}
          </p>
        </div>
      </div>
    </div>
  );
}

export function HorizontalGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);

  // Track the scroll of the entire container height
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const calculateScrollRange = () => {
      const trackWidth = el.scrollWidth;
      const viewWidth = window.innerWidth;
      // Scroll range is the overflow width of the track plus extra end padding
      setScrollRange(Math.max(0, trackWidth - viewWidth + 120));
    };

    // Calculate layout on mount and window resize
    calculateScrollRange();
    window.addEventListener("resize", calculateScrollRange);

    // Run fallback check after short delay in case video elements render late
    const timer = setTimeout(calculateScrollRange, 600);

    return () => {
      window.removeEventListener("resize", calculateScrollRange);
      clearTimeout(timer);
    };
  }, []);

  // Map vertical scroll progress to dynamic horizontal translation pixels
  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  return (
    <section ref={containerRef} className="relative h-[500vh] border-t border-line bg-bg-soft/10">
      {/* Sticky container that fills viewport during scroll */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-5 sm:px-8">
        
        {/* Header Title with reveal effect */}
        <div className="mb-10 max-w-xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            01.5 / Cut Showcase
          </p>
          <TextReveal
            as="h2"
            text="PORTFOLIO STREAMS"
            className="font-display text-4xl font-extrabold uppercase leading-none tracking-tight sm:text-6xl"
          />
        </div>

        {/* Scrolling track wrapper */}
        <div className="relative flex items-center">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-6 sm:gap-8 pr-[30vw]">
            {videos.map((item, index) => (
              <HorizontalGalleryCard key={item.id} item={item} index={index} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
