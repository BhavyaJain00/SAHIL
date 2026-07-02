"use client";

import { FadeIn, TextReveal } from "@/components/ui/Reveal";
import { experience } from "@/data/portfolio";

export function Services() {
  return (
    <section className="border-t border-line px-5 py-24 sm:px-8 lg:py-32">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
        03 / Services
      </p>
      <TextReveal
        as="h2"
        text="WHAT I DO"
        className="mb-14 font-display text-5xl font-extrabold uppercase leading-none tracking-tight sm:text-7xl"
      />

      <div>
        {experience.offers.map((offer, i) => (
          <FadeIn key={offer} delay={i * 0.06}>
            <div
              data-cursor="link"
              className="group flex items-center justify-between gap-6 border-t border-line py-7 transition-colors duration-300 last:border-b hover:bg-ink/[0.03] md:py-9"
            >
              <div className="flex items-baseline gap-5 sm:gap-8">
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight transition-[transform,color] duration-300 group-hover:translate-x-3 group-hover:text-accent sm:text-4xl md:text-5xl">
                  {offer}
                </h3>
              </div>
              <span
                aria-hidden
                className="-translate-x-2 text-2xl text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:text-3xl"
              >
                ↗
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
