"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site, stats } from "@/data/portfolio";

export function StreamNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Browse", href: "#work" },
    { label: "Creator", href: "#about" },
    { label: "Connect", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0f]/95 backdrop-blur-2xl shadow-lg shadow-black/30 border-b border-white/[0.04]"
          : "bg-gradient-to-b from-[#0a0a0f]/70 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-5 md:px-10 h-[68px]">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center overflow-hidden shadow-md shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-shadow">
            <span className="font-display text-sm font-bold text-white relative z-10">
              F
            </span>
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 group-hover:to-white/30 transition-all" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight hidden sm:block">
            <span className="text-white">{site.brand.split(" ")[0]}</span>
            <span className="text-gradient ml-1.5">
              {site.brand.split(" ")[1]}
            </span>
          </span>
        </a>

        {/* Center nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative px-4 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Stats — cleaner */}
          <div className="hidden lg:flex items-center gap-5 mr-2">
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className="text-xs font-bold text-white/80 tabular-nums">
                  {s.value}
                  {s.suffix}
                </span>
                <span className="text-[10px] text-white/25 uppercase">
                  {s.label}
                </span>
                {i < stats.length - 1 && (
                  <span className="ml-3 w-px h-3 bg-white/10" />
                )}
              </div>
            ))}
          </div>

          {/* Search icon */}
          <button className="w-10 h-10 rounded-xl border border-white/[0.08] flex items-center justify-center hover:border-purple-500/40 hover:bg-purple-500/[0.06] transition-all">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="text-white/50"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Profile avatar */}
          <a
            href="#contact"
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
          >
            {site.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
