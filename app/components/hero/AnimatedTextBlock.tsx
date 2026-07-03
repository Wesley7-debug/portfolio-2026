"use client";
import React from "react";

interface AnimatedTextBlockProps {
  text: string;
  blockIndex: number;
  wordsRef: React.MutableRefObject<HTMLSpanElement[][]>;
}

export default function AnimatedTextBlock({
  text,
  blockIndex,
  wordsRef,
}: AnimatedTextBlockProps) {
  return (
    <div className="relative w-full h-34.5 sm:h-31 md:h-35 overflow-hidden">
      <p className="text-[15px] sm:text-xl md:text-xl lg:text-[20px] font-light leading-7 sm:leading-9 md:leading-10 text-zinc-300 tracking-tight text-left flex flex-wrap gap-x-1.5 gap-y-1">
        {text.split(" ").map((word, wordIdx) => (
          <span
            key={wordIdx}
            className="relative inline-block overflow-hidden h-[1.5em] leading-[1.5em]"
          >
            <span
              ref={(el) => {
                if (el) wordsRef.current[blockIndex][wordIdx] = el;
              }}
              className="inline-block will-change-transform"
            >
              {word}
            </span>
          </span>
        ))}
      </p>
    </div>
  );
}
