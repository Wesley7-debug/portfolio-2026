"use client";
import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import type Lenis from "lenis";

interface LenisContextValue {
  setInstance: (lenis: Lenis | null) => void;
  pause: () => void;
  resume: () => void;
}

const LenisContext = createContext<LenisContextValue | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  const setInstance = useCallback((lenis: Lenis | null) => {
    lenisRef.current = lenis;
  }, []);

  const pause = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const resume = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  return (
    <LenisContext.Provider value={{ setInstance, pause, resume }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenisContext() {
  const ctx = useContext(LenisContext);
  if (!ctx)
    throw new Error("useLenisContext must be used within <LenisProvider>");
  return ctx;
}
