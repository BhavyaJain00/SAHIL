"use client";

import { memo, useCallback, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { PortfolioVideo } from "@/data/portfolio";
import { SPRING_MODAL, easeOutExpo } from "@/lib/motion";
import { useLoaded } from "@/components/ui/LoadProvider";
import { Tilt } from "@/components/ui/Tilt";

type WorkCardProps = {
  video: PortfolioVideo;
  index: number;
  onSelect: (video: PortfolioVideo) => void;
  /** AnimatePresence mode="popLayout" measures exiting children through this ref (React 19 ref-as-prop). */
  ref?: React.Ref<HTMLElement>;
};

const SPAN_CLASS: Record<NonNullable<PortfolioVideo["span"]> | "default", string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  normal: "col-span-2",
  square: "",
  default: "",
};

export const WorkCard = memo(function WorkCard({ video, index, onSelect, ref }: WorkCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const loaded = useLoaded();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  const isSourceActive = loaded && inView;

  const play = useCallback(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const stop = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
  }, []);

  return (
    <motion.article
      ref={ref}
      layout
      layoutId={`work-${video.id}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3, ease: easeOutExpo } }}
      // Near-critically damped spring (ζ = 0.85) for entrance and layout
      // reflow; the per-index delay cascades the grid like falling dominoes.
      transition={{ type: "spring", ...SPRING_MODAL, delay: index * 0.04 }}
      className={`group relative overflow-hidden rounded-md bg-bg-soft ring-1 ring-line cursor-none ${
        SPAN_CLASS[video.span ?? "default"]
      }`}
      data-cursor="play"
      onMouseEnter={play}
      onMouseLeave={stop}
      onClick={() => onSelect(video)}
    >
      <Tilt className="absolute inset-0 h-full w-full overflow-hidden" maxRotate={12}>
        <div ref={containerRef} className="absolute inset-0 h-full w-full">
          {isSourceActive && (
            <video
              ref={videoRef}
              src={`${video.file}#t=0.1`}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover brightness-[0.65] grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:brightness-100 group-hover:grayscale-0"
            />
          )}
        </div>

        {/* Bottom gradient for legibility */}
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-bg/90 to-transparent pointer-events-none" />

        <div 
          className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.2em] text-ink/60 select-none"
          style={{ transform: "translateZ(30px)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <div 
          className="absolute right-3 top-3 rounded-full border border-line bg-bg/50 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 select-none"
          style={{ transform: "translateZ(30px)" }}
        >
          {video.category}
        </div>

        <div 
          className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 select-none"
          style={{ transform: "translateZ(45px)" }}
        >
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide sm:text-base">
            {video.title}
          </h3>
          <span
            aria-hidden
            className="translate-y-2 font-mono text-xs text-accent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            ↗
          </span>
        </div>
      </Tilt>
    </motion.article>
  );
});
