"use client";
import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import IntroColumn from "../header/IntroColumn";
import PositionColumn from "../header/PositionColumn";
import ConnectColumn from "../header/ConnectColumn";
import { useLenisContext } from "../LenisProvider";

interface CredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOBILE_COLUMNS = [IntroColumn, PositionColumn, ConnectColumn];

export default function CredentialsModal({
  isOpen,
  onClose,
}: CredentialsModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const { pause, resume } = useLenisContext();

  const animateIn = useCallback(() => {
    const tl = gsap.timeline();

    // Overlay fade in
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
    );

    // Content slide up
    tl.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      "-=0.2",
    );

    // Stagger columns
    tl.fromTo(
      columnsRef.current.filter(Boolean),
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
      },
      "-=0.25",
    );
  }, []);

  const animateOut = useCallback((callback: () => void) => {
    const tl = gsap.timeline({
      onComplete: callback,
    });

    tl.to(columnsRef.current.filter(Boolean), {
      y: -12,
      opacity: 0,
      duration: 0.2,
      stagger: 0.03,
      ease: "power2.in",
    });

    tl.to(
      contentRef.current,
      { y: 20, opacity: 0, duration: 0.3, ease: "power2.in" },
      "-=0.1",
    );

    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.3, ease: "power2.in" },
      "-=0.15",
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      pause();
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          animateIn();
        });
      });
    } else {
      resume();
      document.body.style.overflow = "";
    }

    return () => {
      resume();
      document.body.style.overflow = "";
    };
  }, [isOpen, animateIn, pause, resume]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        animateOut(onClose);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, animateOut]);

  const handleClose = () => {
    animateOut(onClose);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-999 bg-[#0a0a0a] flex flex-col lg:hidden h-screen"
      style={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      {/* Close Button */}
      <div className="flex justify-end p-6 shrink-0">
        <button
          onClick={handleClose}
          className="text-zinc-400 hover:text-white transition-colors text-xs tracking-widest uppercase font-mono"
        >
          Close [−]
        </button>
      </div>

      {/* Content — fits within remaining height, no scroll */}
      <div
        ref={contentRef}
        className="flex-1 flex flex-col justify-center px-6 pb-12"
      >
        <div className="grid grid-cols-1 gap-y-8 max-w-lg mx-auto w-full">
          {MOBILE_COLUMNS.map((Column, idx) => (
            <div
              key={idx}
              ref={(el) => {
                columnsRef.current[idx] = el;
              }}
              className="text-[13px]"
            >
              <Column />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
