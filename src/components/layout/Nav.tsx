"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Magnetic } from "@/components/ui/Magnetic";
import { useLoaded } from "@/components/ui/LoadProvider";
import { SPRING_NAV } from "@/lib/motion";
import { site } from "@/data/portfolio";
import { TextScramble } from "@/components/ui/TextScramble";

const LINKS = [
  { label: "3D Tour", href: "/tour.html" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function RollLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group relative block font-mono text-xs uppercase tracking-[0.25em]"
    >
      <TextScramble text={label} trigger="hover" className="text-ink transition-colors duration-200 group-hover:text-accent" />
    </a>
  );
}

export function Nav() {
  const loaded = useLoaded();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const nextHidden = y > lastY.current && y > 140;
    setHidden((prev) => (prev !== nextHidden ? nextHidden : prev));
    lastY.current = y;
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 mix-blend-difference"
      initial={{ y: "-110%" }}
      animate={{ y: hidden ? "-110%" : loaded ? "0%" : "-110%" }}
      // Critically damped (ζ = 1): fastest slide with zero bounce
      transition={{ type: "spring", ...SPRING_NAV }}
    >
      <nav className="flex items-center justify-between px-5 py-5 text-ink sm:px-8">
        <Magnetic strength={0.25}>
          <a href="#top" className="font-display text-lg font-bold uppercase tracking-tight group">
            <TextScramble text={site.brand.split(" ")[0]} trigger="hover" />
            <span className="text-accent transition-transform duration-300 group-hover:rotate-12 inline-block ml-0.5">®</span>
          </a>
        </Magnetic>

        <div className="flex items-center gap-7 sm:gap-10">
          {LINKS.map((link, i) => (
            <div key={link.href} className="flex items-baseline gap-1.5">
              <span className="font-mono text-[9px] text-muted">0{i + 1}</span>
              <RollLink {...link} />
            </div>
          ))}
        </div>
      </nav>
    </motion.header>
  );
}
