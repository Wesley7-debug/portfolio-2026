"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";

interface HoverUnderlineProps {
  children: React.ReactNode;
  color?: string;
  height?: string;
  duration?: number;
  className?: string;
}

const HoverUnderline: React.FC<HoverUnderlineProps> = ({
  children,
  color = "bg-white",
  height = "h-[0.2px]",
  duration = 0.5,
  className = "",
}) => {
  const underlineRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (underlineRef.current) {
      gsap.to(underlineRef.current, {
        scaleX: 1,
        transformOrigin: "left",
        duration,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (underlineRef.current) {
      gsap.to(underlineRef.current, {
        scaleX: 0,
        transformOrigin: "right",
        duration,
        ease: "power2.out",
      });
    }
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <span
        ref={underlineRef}
        className={`${color} ${height} absolute left-0 bottom-0 w-full origin-right scale-x-0`}
      ></span>
    </div>
  );
};

export default HoverUnderline;
