"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useLenisContext } from "../LenisProvider";
import type { ProjectData } from "../../types/project";
import { getProjectByImage, projects } from "../../data/projects";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc?: string | null;
}

const defaultProject = projects[0];

export default function ProjectModal({
  isOpen,
  onClose,
  imageSrc,
}: ProjectModalProps) {
  const [activeImageSrc, setActiveImageSrc] = useState<string | null>(null);
  const project: ProjectData = useMemo(() => {
    if (activeImageSrc) {
      const found = getProjectByImage(activeImageSrc);
      if (found) return found;
    }
    return defaultProject;
  }, [activeImageSrc]);
  const { pause, resume } = useLenisContext();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // ── Open / Close animation lifecycle ──
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsClosing(false);
      if (imageSrc) setActiveImageSrc(imageSrc);
      document.body.style.overflow = "hidden";
      pause();
    } else if (isVisible) {
      setIsClosing(true);
      document.body.style.overflow = "";
      resume();
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsClosing(false);
        setActiveImageSrc(null);
      }, 400); // match close animation duration
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "";
      resume();
    };
  }, [isOpen, isVisible, imageSrc, pause, resume]);

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
      {/* Container fits beautifully inside max 85vh / 80vh limits without internal scrolling */}
      <div
        className={`relative w-full max-w-5xl h-auto max-h-[85vh] sm:max-h-[80vh] bg-[#111111]/95 border border-white/10 rounded-2xl text-white overflow-hidden p-6 md:p-10 shadow-2xl flex flex-col justify-between gap-4 font-[family-name:var(--font-Sora)] ${
          isClosing ? "animate-clip-reveal-close" : "animate-clip-reveal-open"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Integrated custom Close Button wrapper */}
        <div className="flex justify-end shrink-0 absolute top-2 right-2 z-30">
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors text-xs tracking-widest uppercase font-mono p-4"
          >
            Close [−]
          </button>
        </div>

        {/* Decorative Spark Icon */}
        <div className="text-purple-400 shrink-0 mt-4 sm:mt-0 hidden sm:block">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2V22M2 12H22M19.07 4.93L4.93 19.07M19.07 19.07L4.93 4.93"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Upper Layout Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center min-h-0">
          {/* Main Description Block (Increased Text Scaling for Large Displays) */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col gap-3">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-1 font-[family-name:var(--font-Inter)]">
                {project.title}
              </h2>
              <p className="text-[10px] tracking-widest text-purple-400 font-bold uppercase font-[family-name:var(--font-Inter)]">
                {project.category}
              </p>
            </div>
            <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-white/70 font-light max-w-xl">
              {project.description}
            </p>
            {/* Framework tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 text-[10px] lg:text-xs bg-white/5 border border-white/10 text-white/80 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Desktop Preview - Replaced with a space-saving flat horizontal box box */}
          <div className="md:col-span-6 lg:col-span-7 w-full border border-white/5 rounded-xl overflow-hidden bg-[#0A0A0A] aspect-video max-h-[150px] sm:max-h-[200px] flex items-center justify-center shadow-inner">
            <img
              src={project.image}
              alt={`${project.title} Preview`}
              className="w-full h-full object-cover opacity-90"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
        </div>

        {/* Lower Layout Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pt-4 border-t border-white/5 items-start">
          {/* Core Features Container */}
          <div className="md:col-span-7 flex flex-col gap-2">
            {project.features.map((feature, idx) => {
              const [title, desc] = feature.split(": ");
              return (
                <div key={idx} className="flex items-start gap-2">
                  <div className="mt-0.5 text-purple-400 shrink-0">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="w-3 h-3"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div className="text-[11px] sm:text-xs leading-tight">
                    <span className="font-semibold text-white/90">
                      {title}:
                    </span>
                    <span className="text-white/40 font-light hidden sm:inline">
                      {" "}
                      {desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Links Footer Column */}
          <div className="md:col-span-5 flex flex-row md:flex-col justify-between md:justify-start gap-3 text-xs font-light pt-2 md:pt-0 border-t border-white/5 md:border-t-0 w-full">
            {project.liveUrl ? (
              <div>
                <p className="text-[9px] tracking-wider text-white/40 uppercase mb-0.5">
                  Live Site ↗
                </p>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 md:text-white/80 hover:text-white underline underline-offset-2 transition-colors break-all font-mono"
                >
                  {project.liveUrl.replace("https://", "")}
                </a>
              </div>
            ) : (
              <div>
                <p className="text-[9px] tracking-wider text-white/40 uppercase mb-0.5">
                  Live Site ↗
                </p>
                <span className="text-white/30 font-mono">—</span>
              </div>
            )}

            {project.githubUrl ? (
              <div>
                <p className="text-[9px] tracking-wider text-white/40 uppercase mb-0.5">
                  Repository ↗
                </p>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-400 md:text-white/80 hover:text-white underline underline-offset-2 transition-colors break-all font-mono"
                >
                  GitHub
                </a>
              </div>
            ) : (
              <div>
                <p className="text-[9px] tracking-wider text-white/40 uppercase mb-0.5">
                  Repository ↗
                </p>
                <span className="text-white/30 font-mono">Private</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
