"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "./Preloader";

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
