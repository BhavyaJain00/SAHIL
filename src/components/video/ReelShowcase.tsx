"use client";

import { useRef, useMemo, useCallback, useState, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { videos, categories } from "@/data/portfolio";
import { StreamCard } from "./HoverVideoCard";

const CategoryRow = memo(function CategoryRow({
  category,
  items,
}: {
  category: string;
  items: typeof videos;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const t = setTimeout(checkScroll, 150);
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => {
      clearTimeout(t);
      el.removeEventListener("scroll", checkScroll);
    };
  }, [checkScroll, items]);

  const scroll = useCallback((dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -450 : 450, behavior: "smooth" });
  }, []);

  return (
    <div className="mb-12 md:mb-16">
      {/* Row header */}
      <div className="flex items-baseline justify-between mb-5 px-5 md:px-10">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-cyan-400" />
          <h2 className="font-display text-xl md:text-2xl font-bold text-white">
            {category}
          </h2>
        </div>
        <span className="text-xs font-medium text-white/25 hover:text-purple-400 transition-colors cursor-pointer group flex items-center gap-1">
          Explore All
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="group-hover:translate-x-0.5 transition-transform"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>

      {/* Carousel */}
      <div className="relative group/carousel">
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-0 bottom-0 z-10 w-14 bg-gradient-to-r from-[#0a0a0f] to-transparent flex items-center justify-start pl-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </div>
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-0 bottom-0 z-10 w-14 bg-gradient-to-l from-[#0a0a0f] to-transparent flex items-center justify-end pr-2 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide px-5 md:px-10 pb-4"
        >
          {items.map((video, i) => (
            <StreamCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
});

export function ContentRows() {
  const [filter, setFilter] = useState<string>("All");

  const groupedByCategory = useMemo(() => {
    const cats = categories.filter((c) => c !== "All");
    return cats
      .map((cat) => ({
        category: cat,
        items: videos.filter((v) => v.category === cat),
      }))
      .filter((g) => g.items.length > 0);
  }, []);

  const filteredFlat = useMemo(
    () => (filter === "All" ? videos : videos.filter((v) => v.category === filter)),
    [filter]
  );

  return (
    <section id="work" className="relative pt-6 pb-16">
      {/* Section divider */}
      <div className="mx-5 md:mx-10 mb-8">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      {/* Category pills */}
      <div className="sticky top-[68px] z-30 mb-10 py-4 px-5 md:px-10 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="flex gap-2.5 overflow-x-auto scrollbar-hide max-w-6xl">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`relative flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                filter === cat
                  ? "bg-white text-[#0a0a0f] shadow-lg shadow-white/10"
                  : "bg-white/[0.05] text-white/40 hover:bg-white/[0.1] hover:text-white/70 border border-white/[0.06]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {filter === "All" ? (
          <motion.div
            key="all-rows"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {groupedByCategory.map((group) => (
              <CategoryRow
                key={group.category}
                category={group.category}
                items={group.items}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <CategoryRow category={filter} items={filteredFlat} />
          </motion.div>
        )}
      </AnimatePresence>

      {filteredFlat.length === 0 && (
        <div className="text-center py-24">
          <p className="text-sm text-white/30">No content in this category</p>
        </div>
      )}
    </section>
  );
}
