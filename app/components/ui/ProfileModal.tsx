"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useLenisContext } from "../LenisProvider";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

export default function ProfileModal({
  isOpen,
  onClose,
  imageSrc,
}: ProfileModalProps) {
  const { pause, resume } = useLenisContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      document.body.style.overflow = "hidden";
      pause();
    } else if (isVisible) {
      setIsClosing(true);
      document.body.style.overflow = "";
      resume();
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
      }, 400);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "";
      resume();
    };
  }, [isOpen, isVisible, pause, resume]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md ${
        isClosing ? "animate-backdrop-out" : "animate-backdrop-in"
      }`}
      role="dialog"
      aria-modal="true"
      onClick={handleOverlayClick}
    >
      <div
        className={`relative w-full max-w-3xl h-auto max-h-[85vh] sm:max-h-[80vh] bg-[#111111]/95 border border-white/10 rounded-2xl text-white overflow-hidden p-6 md:p-10 shadow-2xl flex flex-col justify-center gap-4 font-[family-name:var(--font-Sora)] ${
          isClosing ? "animate-clip-reveal-close" : "animate-clip-reveal-open"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end shrink-0 absolute top-2 right-2 z-30">
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors text-xs tracking-widest uppercase font-mono p-4"
          >
            Close [−]
          </button>
        </div>

        <div className="w-full flex items-center justify-center min-h-[240px] sm:min-h-[320px] rounded-2xl overflow-hidden bg-[#0a0a0a]">
          <img
            src={imageSrc}
            alt="Eugene Fidelis"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
