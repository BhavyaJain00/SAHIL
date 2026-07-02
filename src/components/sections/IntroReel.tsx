"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { site, videos } from "@/data/portfolio";

const SceneCanvas = dynamic(
  () => import("@/components/three/SceneCanvas").then((m) => m.SceneCanvas),
  { ssr: false }
);

export function HeroBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const featuredVideo = videos.find((v) => v.aspect === "16/9") || videos[0];

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (ready && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [ready]);

  return (
    <section id="home" className="relative h-[90vh] md:h-screen flex items-end overflow-hidden">
      {/* Background video — deep layer */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          src={featuredVideo.file}
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-110"
          style={{ filter: "brightness(0.5) saturate(0.6)" }}
        />
      </div>

      {/* 3D Scene overlay */}
      <div className="absolute inset-0 z-[1] opacity-70">
        <SceneCanvas />
      </div>

      {/* Gradient overlays — cinematic layers */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-[#0a0a0f]/20" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0a0a0f]/80 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[2] bg-gradient-to-t from-[#0a0a0f] to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full px-5 md:px-10 pb-20 md:pb-28 max-w-5xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/[0.08] mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="text-xs font-semibold text-cyan-300 uppercase tracking-[0.15em]">
              Featured Creator
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(3rem,10vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.02em]"
            style={{
              textShadow: "0 0 80px rgba(139, 92, 246, 0.3), 0 0 40px rgba(6, 182, 212, 0.15)",
            }}
          >
            <span className="text-white">{site.name.split(" ")[0]}</span>
            <br />
            <span className="text-gradient">{site.name.split(" ")[1]}</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 max-w-xl text-base md:text-lg text-white/45 leading-relaxed"
          >
            {site.tagline}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-[#0a0a0f] font-bold text-sm hover:bg-white/95 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Now
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/[0.08] backdrop-blur-xl text-white font-semibold text-sm border border-white/[0.12] hover:bg-white/[0.15] hover:border-white/[0.2] transition-all hover:scale-105 active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              More Info
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="mt-12 flex items-center gap-3"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center p-1"
            >
              <div className="w-1 h-1.5 rounded-full bg-white/40" />
            </motion.div>
            <span className="text-[11px] text-white/20 uppercase tracking-wider">
              Scroll to explore
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
