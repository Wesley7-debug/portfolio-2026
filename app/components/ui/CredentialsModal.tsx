"use client";
import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import PositionColumn from "../header/PositionColumn";
import RecognitionColumn from "../header/RecognitionColumn";
import BrandsColumn from "../header/BrandsColumn";
import ConnectColumn from "../header/ConnectColumn";
import { useLenisContext } from "../LenisProvider";

interface CredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MOBILE_COLUMNS = [
  // IntroColumn,
  PositionColumn,
  RecognitionColumn,
  BrandsColumn,
  ConnectColumn,
];

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
      className="fixed inset-x-0 top-17 bottom-0 z-999 bg-[#0a0a0a] flex flex-col lg:hidden overflow-y-auto"
      style={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
    >
      {/* Content — fits within remaining height, no scroll */}
      <div
        ref={contentRef}
        className="flex-1 flex flex-col justify-between px-4 pb-6 pt-0.5 sm:px-6 sm:pb-8 sm:pt-1"
      >
        <div className="grid grid-cols-1 min-h-[calc(100vh-76px)] max-w-3xl mx-auto w-full">
          {MOBILE_COLUMNS.map((Column, idx) => (
            <div
              key={idx}
              ref={(el) => {
                columnsRef.current[idx] = el;
              }}
              className="text-[18px] md:text-[16px] py-0.5"
            >
              <Column />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
