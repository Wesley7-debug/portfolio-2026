"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useLenis from "./hero/hooks/useLenis";
import AnimatedTextBlock from "./hero/AnimatedTextBlock";
import ScrollProgressBar from "./hero/ScrollProgressBar";
import MarqueeSection from "./hero/MarqueeSection";
import ProjectModal from "./ui/ProjectModal";
import { useCursorContext, projectNameFromSrc } from "./CursorProvider";
import Fall from "./Fall";
import { useLoadingState } from "./LoadingContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TEXT_BLOCKS = [
  "I'm a full-stack developer focused on building AI products and motion-rich web experiences with clean design, performance, and thoughtful interactions.",
  "I enjoy turning ambitious ideas into polished, user-centered products using modern technologies and attention to detail.",
  "Outside of coding, you'll find me watching anime 🎌, playing chess ♟️, and listening to classical music.",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const blocksWordsRef = useRef<HTMLSpanElement[][]>([[], [], []]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const { setHoveredProject } = useCursorContext();
  const { loaded } = useLoadingState();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Smooth scroll
  useLenis();

  // Cursor trail: expand on hover, shrink on leave
  const handleProjectHover = useCallback(
    (src: string | null) => {
      setHoveredProject(src ? projectNameFromSrc(src) : null);
    },
    [setHoveredProject],
  );

  // Modal: open on click only
  const handleProjectClick = useCallback((src: string) => {
    setModalImage(src);
  }, []);

  const handleModalClose = useCallback(() => {
    setModalImage(null);
    setHoveredProject(null);
  }, [setHoveredProject]);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- STAGGER & PROGRESS MATRICES ---
    const OVERLAP_COUNT = 4;

    const getWordProgress = (
      phaseProgress: number,
      wordIndex: number,
      totalWords: number,
    ) => {
      const totalLength = 1 + OVERLAP_COUNT / totalWords;
      const scale = Math.min(1, 1 / totalLength);
      const startTime = (wordIndex / totalWords) * scale;
      const endTime = startTime + (OVERLAP_COUNT / totalWords) * scale;

      if (phaseProgress < startTime) return 0;
      if (phaseProgress > endTime) return 1;

      return (phaseProgress - startTime) / (endTime - startTime);
    };

    const animateBlock = (
      outgoingIndex: number,
      incomingIndex: number,
      phaseProgress: number,
    ) => {
      const outgoingWords = blocksWordsRef.current[outgoingIndex];
      const incomingWords = blocksWordsRef.current[incomingIndex];

      outgoingWords.forEach((wordEl, idx) => {
        if (!wordEl) return;
        const progress = getWordProgress(
          phaseProgress,
          idx,
          outgoingWords.length,
        );
        gsap.set(wordEl, { yPercent: -progress * 100 });
      });

      incomingWords.forEach((wordEl, idx) => {
        if (!wordEl) return;
        const progress = getWordProgress(
          phaseProgress,
          idx,
          incomingWords.length,
        );
        gsap.set(wordEl, { yPercent: 100 - progress * 100 });
      });
    };

    blocksWordsRef.current[1].forEach(
      (w) => w && gsap.set(w, { yPercent: 100 }),
    );
    blocksWordsRef.current[2].forEach(
      (w) => w && gsap.set(w, { yPercent: 100 }),
    );

    // --- 5. SCROLLTRIGGER INSTANTIATION ---
    const mainScrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;

        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${progress})`;
        }

        if (progress <= 0.5) {
          const phase1Progress = progress / 0.5;
          animateBlock(0, 1, phase1Progress);
          blocksWordsRef.current[2].forEach(
            (w) => w && gsap.set(w, { yPercent: 100 }),
          );
        } else {
          const phase2Progress = (progress - 0.5) / 0.5;
          blocksWordsRef.current[0].forEach(
            (w) => w && gsap.set(w, { yPercent: -100 }),
          );
          animateBlock(1, 2, phase2Progress);
        }
      },
    });

    return () => {
      mainScrollTrigger.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative w-full h-[600vh] font-Inter bg-[#0a0a0a] text-white overflow-x-hidden select-none font-semibold"
      >
        <div className="fixed inset-0 w-full h-dvh min-h-dvh overflow-hidden flex flex-col justify-between pt-2 px-4 sm:pt-6 sm:px-10 pb-1.5 sm:pb-0 pointer-events-none z-10">
          {/* Scroll Progress Indicator */}
          <ScrollProgressBar fillRef={progressFillRef} />

          {/* Bottom Content Area */}
          <div
            ref={bottomRef}
            className="w-full mt-auto flex flex-col gap-1.5 sm:gap-2 md:gap-3"
          >
            {/* Animated Text Blocks */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-12 px-0 sm:px-2 md:px-6">
              {TEXT_BLOCKS.map((blockText, blockIdx) => (
                <div key={blockIdx} className="hero-text-block">
                  {blockIdx === 0 ? (
                    <Fall play={loaded} delay={0.25} color="#7c52ff">
                      <AnimatedTextBlock
                        text={blockText}
                        blockIndex={blockIdx}
                        wordsRef={blocksWordsRef}
                      />
                    </Fall>
                  ) : (
                    <AnimatedTextBlock
                      text={blockText}
                      blockIndex={blockIdx}
                      wordsRef={blocksWordsRef}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Velocity-Responsive Marquee — pointer-events-auto for hover */}
            <div className="pointer-events-auto hero-marquee -mt-2 sm:mt-0">
              <MarqueeSection
                onProjectClick={handleProjectClick}
                onProjectHover={handleProjectHover}
                scrollTargetRef={containerRef}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        isOpen={modalImage !== null}
        imageSrc={modalImage}
        onClose={handleModalClose}
      />
    </>
  );
}
