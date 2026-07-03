"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface SectionLabelProps {
  label: string;
  animate?: boolean;
  delay?: number;
}

export default function SectionLabel({
  label,
  animate = false,
  delay = 0,
}: SectionLabelProps) {
  const dotRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!animate) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay });

      // Dot scales up from nothing
      tl.fromTo(
        dotRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      );

      // Text slides in from the left, as if dot "spit it out"
      tl.fromTo(
        textRef.current,
        { x: -24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        "-=0.1",
      );
    });

    return () => ctx.revert();
  }, [animate, delay]);

  return (
    <div className="flex items-center space-x-1.5 text-[#7c52ff] font-semibold uppercase tracking-widest text-[9px]">
      <span ref={dotRef} className="section-dot">
        ●
      </span>
      <span ref={textRef} className="section-label-text">
        {label}
      </span>
    </div>
  );
}
