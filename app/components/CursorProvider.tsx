"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface CursorContextValue {
  hoveredProject: string | null;
  setHoveredProject: (name: string | null) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const setHovered = useCallback((name: string | null) => {
    setHoveredProject(name);
  }, []);

  return (
    <CursorContext.Provider
      value={{ hoveredProject, setHoveredProject: setHovered }}
    >
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext() {
  const ctx = useContext(CursorContext);
  if (!ctx)
    throw new Error("useCursorContext must be used within <CursorProvider>");
  return ctx;
}

/** Derive a display name from an image path like "/images/axela.png" → "Axela" */
export function projectNameFromSrc(src: string): string {
  const filename = src.split("/").pop()?.split(".")[0] ?? "";
  return filename
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
