"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "./Preloader";

// Silence THREE.Clock deprecation warnings generated internally by React Three Fiber
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    if (
      args[0] &&
      typeof args[0] === "string" &&
      args[0].includes("THREE.Clock: This module has been deprecated")
    ) {
      return;
    }
    originalWarn(...args);
  };
}

const LoadContext = createContext(false);

export function useLoaded() {
  return useContext(LoadContext);
}

export function LoadProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const el = document.documentElement;
    const previous = el.style.overflow;
    el.style.overflow = "hidden";
    return () => {
      el.style.overflow = previous;
    };
  }, [loaded]);

  return (
    <LoadContext.Provider value={loaded}>
      <AnimatePresence>
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      </AnimatePresence>
      {children}
    </LoadContext.Provider>
  );
}
