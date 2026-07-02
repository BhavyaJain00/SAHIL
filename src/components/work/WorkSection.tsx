"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, videos, type PortfolioVideo } from "@/data/portfolio";
import { TextReveal } from "@/components/ui/Reveal";
import { SPRING_PILL } from "@/lib/motion";
import { WorkCard } from "./WorkCard";
import { WorkModal } from "./WorkModal";

export function WorkSection() {
  const [filter, setFilter] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<PortfolioVideo | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? videos : videos.filter((v) => v.category === filter)),
    [filter]
  );

  return (
    <section id="work" className="px-5 py-24 sm:px-8 lg:py-32">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            01 / Selected work
          </p>
          <TextReveal
            as="h2"
            text="WORK"
            className="font-display text-6xl font-extrabold uppercase leading-none tracking-tight sm:text-8xl"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const isActive = filter === category;
            return (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`relative rounded-full px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                  isActive ? "text-bg" : "text-muted hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", ...SPRING_PILL }}
                  />
                )}
                <span className="relative">{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-flow-dense grid-cols-2 gap-3 auto-rows-[150px] sm:auto-rows-[200px] lg:grid-cols-3 lg:gap-4 lg:auto-rows-[260px]"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((video, i) => (
            <WorkCard key={video.id} video={video} index={i} onSelect={setSelected} />
          ))}
        </AnimatePresence>
      </motion.div>

      <WorkModal video={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
