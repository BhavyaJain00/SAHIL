"use client";

import { TextReveal, FadeIn } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { contact, site } from "@/data/portfolio";

export function Footer() {
  const mail = contact.find((c) => c.label === "Gmail") ?? contact[0];

  return (
    <footer id="contact" className="relative overflow-hidden border-t border-line px-5 pb-8 pt-24 sm:px-8 lg:pt-36">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
        04 / Contact
      </p>

      <h2 className="font-display font-extrabold uppercase leading-[0.85] tracking-[-0.02em]">
        <TextReveal as="span" text="LET’S MAKE" className="block text-[clamp(3rem,10vw,9rem)]" />
        <TextReveal
          as="span"
          text="SOMETHING GREAT"
          delay={0.12}
          className="block text-[clamp(3rem,10vw,9rem)] text-accent"
        />
      </h2>

      <FadeIn className="mt-12" delay={0.2}>
        <Magnetic strength={0.3}>
          <a
            href={mail.href}
            className="group inline-flex items-center gap-4 rounded-full border border-ink/60 px-8 py-4 font-mono text-xs uppercase tracking-[0.25em] transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-bg"
          >
            Get in touch
            <span
              aria-hidden
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            >
              ↗
            </span>
          </a>
        </Magnetic>
      </FadeIn>

      <div className="mt-20 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
        {contact.map((item, i) => (
          <FadeIn key={item.label} delay={i * 0.08}>
            <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              {item.label}
            </p>
            <a
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="group relative inline-block h-[1.3em] overflow-hidden font-display text-lg font-semibold uppercase"
            >
              <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
                {item.value}
              </span>
              <span
                aria-hidden
                className="absolute left-0 top-full block text-accent transition-transform duration-300 ease-out group-hover:-translate-y-full"
              >
                {item.value}
              </span>
            </a>
          </FadeIn>
        ))}
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        <span>
          © 2026 {site.brand.split(" ")[0]} — {site.name}
        </span>
        <span>{site.role} & Storyteller</span>
        <a href="#top" className="transition-colors duration-300 hover:text-accent">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
