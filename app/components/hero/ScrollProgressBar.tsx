"use client";
import React from "react";

interface ScrollProgressBarProps {
  fillRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollProgressBar({ fillRef }: ScrollProgressBarProps) {
  return (
    <div className="absolute top-6 right-6 sm:top-10 sm:right-10 w-24 h-[2px] bg-zinc-800 overflow-hidden">
      <div
        ref={fillRef}
        className="w-full h-full bg-white origin-left will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
