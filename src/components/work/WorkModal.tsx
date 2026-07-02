"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { PortfolioVideo } from "@/data/portfolio";
import { SPRING_MODAL } from "@/lib/motion";

const ASPECT_CLASS: Record<PortfolioVideo["aspect"], string> = {
  "16/9": "w-[min(94vw,1080px)] aspect-video",
  "9/16": "h-[min(78svh,760px)] aspect-[9/16]",
  "1/1": "w-[min(90vw,600px)] aspect-square",
};

type WorkModalProps = {
  video: PortfolioVideo | null;
  onClose: () => void;
};

/**
 * The clicked grid card expands into this full view via the shared
 * `work-<id>` layoutId — the "grid to modal" transition.
 */
export function WorkModal({ video, onClose }: WorkModalProps) {
  useEffect(() => {
    if (!video) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const el = document.documentElement;
    const previous = el.style.overflow;
    el.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      el.style.overflow = previous;
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          key={video.id}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-5 p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { delay: 0.15 } }}
          role="dialog"
          aria-modal="true"
          aria-label={video.title}
        >
          <div className="absolute inset-0 bg-bg/90 backdrop-blur-md" onClick={onClose} />

          <button
            onClick={onClose}
            className="absolute right-5 top-5 z-10 flex items-center gap-2 rounded-full border border-line bg-bg/60 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink backdrop-blur-sm transition-colors duration-300 hover:border-accent hover:text-accent sm:right-8 sm:top-8"
          >
            Close ✕
          </button>

          <motion.div
            layoutId={`work-${video.id}`}
            // Card→modal morph on a ζ = 0.85 oscillator: arrives with energy,
            // settles without a visible bounce.
            transition={{ type: "spring", ...SPRING_MODAL }}
            className={`relative max-h-[78svh] overflow-hidden rounded-lg bg-black ring-1 ring-line ${
              ASPECT_CLASS[video.aspect]
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={video.file}
              autoPlay
              muted
              controls
              loop
              playsInline
              className="h-full w-full object-contain"
            />
          </motion.div>

          <motion.div
            className="relative flex w-[min(94vw,1080px)] items-baseline justify-between gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-display text-lg font-bold uppercase sm:text-2xl">{video.title}</h3>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              {video.category} · {video.aspect}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
