"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { experience, tools, contact, site, stats } from "@/data/portfolio";

const MiniScene = dynamic(
  () => import("@/components/three/MiniScene").then((m) => m.MiniScene),
  { ssr: false }
);

export function CreatorProfile() {
  return (
    <section id="about" className="relative px-5 md:px-10 py-20 md:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-cyan-500/[0.03] blur-[100px] pointer-events-none" />

      {/* Section divider */}
      <div className="max-w-6xl mx-auto mb-16">
        <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-1 h-6 rounded-full bg-gradient-to-b from-purple-500 to-cyan-400" />
            <p className="text-xs font-semibold text-purple-400/80 uppercase tracking-[0.2em]">
              About the Creator
            </p>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Behind the{" "}
            <span className="text-gradient">Lens</span>
          </h2>
        </motion.div>

        {/* 3D Floating Element */}
        <div className="absolute top-16 right-10 w-[300px] h-[300px] hidden xl:block opacity-60 pointer-events-none">
          <MiniScene />
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-20">
          {/* Left column — Profile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {/* Profile card */}
            <div className="flex items-start gap-5 mb-8 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-purple-500/20">
                {site.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">
                  {site.name}
                </h3>
                <p className="text-sm text-purple-400/80 mb-2">{site.role}</p>
                <div className="flex gap-4">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="text-sm font-bold text-white/90 tabular-nums">
                        {s.value}{s.suffix}
                      </p>
                      <p className="text-[10px] text-white/30 uppercase">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-base md:text-lg text-white/50 leading-relaxed mb-8">
              {experience.bio}
            </p>

            {/* Capabilities */}
            <div>
              <p className="text-xs font-semibold text-white/25 uppercase tracking-wider mb-4">
                What I Bring to the Table
              </p>
              <div className="grid grid-cols-2 gap-3">
                {experience.offers.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                    className="group flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 hover:bg-purple-500/[0.04] transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-400/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-purple-400"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right column — Toolkit */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="sticky top-24 p-6 rounded-2xl bg-gradient-to-b from-white/[0.03] to-white/[0.01] border border-white/[0.06]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-400/10 flex items-center justify-center">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-cyan-400"
                  >
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <p className="text-sm font-semibold text-white/60 uppercase tracking-wider">
                  Creative Stack
                </p>
              </div>
              <div className="space-y-2">
                {tools.map((tool, i) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.06 }}
                    className="group flex items-center gap-4 px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/30 hover:bg-purple-500/[0.04] transition-all cursor-default"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 group-hover:scale-125 transition-transform shadow-sm shadow-purple-500/50" />
                    <span className="text-sm font-medium text-white/50 group-hover:text-white/80 transition-colors">
                      {tool}
                    </span>
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400/60" />
                  </motion.div>
                ))}
              </div>

              {/* Availability badge */}
              <div className="mt-6 pt-5 border-t border-white/[0.06]">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
                  </span>
                  <span className="text-xs font-medium text-white/40">
                    Available for new projects
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ConnectSection() {
  return (
    <section id="contact" className="relative px-5 md:px-10 py-20 md:py-28 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-purple-500/[0.05] blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section divider */}
        <div className="mb-16">
          <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        </div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-purple-500/50" />
            <p className="text-xs font-semibold text-purple-400/80 uppercase tracking-[0.2em]">
              Get in Touch
            </p>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-purple-500/50" />
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            Let&apos;s{" "}
            <span className="text-gradient">Connect</span>
          </h2>
          <p className="mt-4 text-white/35 text-base max-w-md mx-auto">
            Ready to create something extraordinary? Let&apos;s bring your vision to life.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-4 md:gap-5 max-w-4xl mx-auto">
          {contact.map((item, i) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group relative block p-7 md:p-8 rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-purple-500/40"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)",
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/5" />

              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-400/10 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-purple-500/10 transition-all duration-300 border border-white/[0.06]">
                  {item.label === "Instagram" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-400">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  )}
                  {item.label === "Gmail" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-400">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <polyline points="22,4 12,13 2,4" />
                    </svg>
                  )}
                  {item.label === "WhatsApp" && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-400">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  )}
                </div>

                <p className="text-[11px] font-semibold text-white/25 uppercase tracking-[0.15em] group-hover:text-purple-400/70 transition-colors">
                  {item.label}
                </p>
                <p className="mt-2 font-display text-xl font-bold text-white/80 group-hover:text-white transition-colors">
                  {item.value}
                </p>

                {/* Arrow */}
                <div className="absolute top-7 right-0 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a
            href="mailto:contact@fluxedit.com"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95 transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Start a Project
          </a>
        </motion.div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center shadow-sm shadow-purple-500/20">
                <span className="text-[10px] font-bold text-white">F</span>
              </div>
              <div>
                <p className="text-xs font-medium text-white/30">{site.brand}</p>
                <p className="text-[10px] text-white/15">
                  Crafted by {site.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {contact.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-white/20 hover:text-purple-400 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <p className="text-[11px] text-white/15">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
