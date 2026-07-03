"use client";
import React, { useRef, useCallback, type RefObject } from "react";
import useMarqueeScroll from "./hooks/useMarqueeScroll";

const MARQUEE_IMAGES = [
  "/images/axela.png",
  "/images/lofti.png",
  "/images/snk.png",
  "/images/true-id.png",
  "/images/star-seed.png",
  "/images/yarny.png",
  "/images/zentry.png",
  "/images/spylt.png",
];

interface MarqueeSectionProps {
  onProjectClick: (src: string) => void;
  onProjectHover: (src: string | null) => void;
  scrollTargetRef?: RefObject<HTMLElement | null>;
}

export default function MarqueeSection({
  onProjectClick,
  onProjectHover,
  scrollTargetRef,
}: MarqueeSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const hoveredRef = useRef<string | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const img = target.closest<HTMLImageElement>("img[data-project-src]");
      if (img) {
        const src = img.dataset.projectSrc;
        if (src) onProjectClick(src);
      }
    },
    [onProjectClick],
  );

  const handleMouseOver = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const img = target.closest<HTMLImageElement>("img[data-project-src]");
      if (img) {
        const src = img.dataset.projectSrc;
        if (src && src !== hoveredRef.current) {
          hoveredRef.current = src;
          onProjectHover(src);
        }
      }
    },
    [onProjectHover],
  );

  const handleMouseOut = useCallback(
    (e: React.MouseEvent) => {
      const target = e.target as HTMLElement;
      const img = target.closest<HTMLImageElement>("img[data-project-src]");
      if (img && hoveredRef.current) {
        hoveredRef.current = null;
        onProjectHover(null);
      }
    },
    [onProjectHover],
  );

  useMarqueeScroll(trackRef, scrollTargetRef);

  return (
    <div className="w-screen -ml-6 sm:-ml-10 overflow-hidden bg-[#0a0a0a] pb-1 sm:pb-10 pt-1">
      <div
        ref={trackRef}
        className="flex items-center gap-6 whitespace-nowrap will-change-transform"
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {MARQUEE_IMAGES.map((src, idx) => (
          <div
            key={idx}
            className="inline-block w-48 h-28 sm:w-64 sm:h-36 rounded-xl overflow-hidden bg-zinc-900 shrink-0 border border-zinc-800 cursor-pointer"
          >
            <img
              src={src}
              data-project-src={src}
              alt={`Project ${idx + 1}`}
              className="w-full h-full object-cover grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
