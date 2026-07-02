"use client";

import { useRef, useState, useCallback, memo } from "react";
import { motion } from "framer-motion";
import type { PortfolioVideo } from "@/data/portfolio";

interface StreamCardProps {
  video: PortfolioVideo;
  index: number;
}

export const StreamCard = memo(function StreamCard({ video, index }: StreamCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const play = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => {});
    setActive(true);
  }, []);

  const stop = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    setActive(false);
    cancelAnimationFrame(rafRef.current);
    // Reset tilt with CSS transition
    if (cardRef.current) {
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
      cardRef.current.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
    }
  }, []);

  // Throttled with rAF — no React state for tilt
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tiltX = (y - 0.5) * -16;
      const tiltY = (x - 0.5) * 16;
      card.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.06,1.06,1.06)`;
      card.style.boxShadow = `0 20px 50px rgba(139,92,246,0.2), ${tiltY * 0.4}px ${tiltX * -0.4}px 15px rgba(6,182,212,0.08)`;
    });
  }, []);

  const width =
    video.aspect === "9/16"
      ? "clamp(200px, 16vw, 260px)"
      : video.aspect === "1/1"
        ? "clamp(260px, 20vw, 340px)"
        : "clamp(320px, 28vw, 440px)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative flex-shrink-0 cursor-none"
      style={{ width, perspective: "800px" }}
      onMouseEnter={play}
      onMouseLeave={stop}
      onMouseMove={active ? handleMouseMove : undefined}
      onTouchStart={play}
      onTouchEnd={stop}
    >
      <div
        ref={cardRef}
        className={`relative w-full overflow-hidden rounded-xl bg-[#141420] will-change-transform ${
          active ? "z-20 ring-2 ring-purple-500/50" : "ring-1 ring-white/[0.08]"
        }`}
        style={{
          aspectRatio: video.aspect.replace("/", " / "),
          transformStyle: "preserve-3d",
          transition: "transform 0.15s ease-out, box-shadow 0.3s ease, ring-color 0.3s ease",
        }}
      >
        {/* Shimmer loading */}
        {!loaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#141420] via-[#1e1e35] to-[#141420] animate-pulse" />
        )}

        {/* Video — preload=none for perf, loads on first hover */}
        <video
          ref={videoRef}
          src={video.file}
          muted
          loop
          playsInline
          preload="none"
          onLoadedData={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-[filter] duration-700 ease-out ${
            active
              ? "brightness-110 saturate-110 scale-105"
              : "brightness-[0.55] saturate-[0.4]"
          }`}
        />

        {/* Gradient */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${active ? "opacity-30" : "opacity-70"}`}
          style={{
            background: "linear-gradient(to top, rgba(10,10,15,0.95) 0%, rgba(10,10,15,0.3) 40%, transparent 100%)",
          }}
        />

        {/* Top badges */}
        <div className="absolute top-0 left-0 right-0 p-3 flex items-start justify-between">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/90 backdrop-blur-md shadow-lg shadow-purple-500/30 transition-opacity duration-200 ${
              active ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-[10px] font-semibold text-white tracking-wide uppercase">
              Playing
            </span>
          </div>
          <div className="px-2 py-1 rounded-md bg-black/50 backdrop-blur-md">
            <span className="text-[10px] font-medium text-white/60 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Play icon */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            active ? "opacity-0 scale-75" : "opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-xl flex items-center justify-center border border-white/20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-0.5">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3.5">
          <p className={`font-display text-sm font-semibold truncate transition-colors duration-300 ${active ? "text-white" : "text-white/80"}`}>
            {video.title}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1 h-1 rounded-full bg-purple-400" />
            <p className="text-[11px] text-white/40 truncate">{video.category}</p>
          </div>
        </div>

        {/* Progress bar */}
        {active && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-xl origin-left animate-progress"
            style={{ background: "linear-gradient(90deg, #8b5cf6, #06b6d4)" }}
          />
        )}
      </div>
    </motion.article>
  );
});
