"use client";

import React, { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

interface FallProps {
  children: ReactNode;
  delay?: number;
  color?: string;
  play?: boolean;
  className?: string;
}

export default function Fall({
  children,
  delay = 0,
  color = "#7c52ff",
  play = true,
  className,
}: FallProps) {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const hasPlayed = useRef(false);

  useEffect(() => {
    if (!play || hasPlayed.current || !elementRef.current || !textRef.current) {
      return;
    }

    hasPlayed.current = true;

    const element = elementRef.current;
    const originalText = textRef.current;

    const ctx = gsap.context(() => {
      let colorBoxes: HTMLDivElement[] = [];

      const split = new SplitText(originalText, { type: "words" });
      const words = split.words as HTMLElement[];

      colorBoxes = words.map((word: HTMLElement) => {
        gsap.set(word, {
          display: "inline-block",
          position: "relative",
        });

        const wordRect = word.getBoundingClientRect();

        const colorBox = document.createElement("div");
        colorBox.style.position = "absolute";
        colorBox.style.top = "0";
        colorBox.style.left = "50%";
        colorBox.style.transform = "translateX(-50%)";
        colorBox.style.zIndex = "10";
        colorBox.style.width = `${wordRect.width * 1.1}px`;
        colorBox.style.height = `${wordRect.height * 0.9}px`;
        colorBox.style.background = color;
        colorBox.style.borderRadius = ".5vw";
        colorBox.style.pointerEvents = "none";

        word.appendChild(colorBox);

        return colorBox;
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(element, { opacity: 1 });
        colorBoxes.forEach((box) => {
          box.style.display = "none";
        });
        return;
      }

      const tl = gsap.timeline({
        delay,
        onStart: () => {
          gsap.set(element, { opacity: 1 });
        },
        onComplete: () => {
          colorBoxes.forEach((box) => {
            box.style.display = "none";
          });
        },
      });

      tl.to(colorBoxes, {
        y: () => gsap.utils.random(1200, 1600),
        x: () => gsap.utils.random(-150, 150),
        rotation: () => gsap.utils.random(-360, 360),
        duration: 1,
        ease: "power2.in",
        stagger: 0.02,
      });
    }, elementRef);

    return () => ctx.revert();
  }, [delay, color, play]);

  return (
    <div ref={elementRef} className={className} style={{ opacity: 0 }}>
      <div ref={textRef}>{children}</div>
    </div>
  );
}
