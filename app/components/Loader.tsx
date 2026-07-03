import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({
  onRevealStart,
  onComplete,
}: {
  onRevealStart?: () => void;
  onComplete?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const counter = { value: 0 };
    const scaleDuration = 1.4;
    // Edit these percentages to tune the handoff during the scale animation.
    const revealStartPercent = 0;
    const opacityFadeStartPercent = 0.5;
    const opacityFadeEndPercent = 1;
    const revealStartTime = scaleDuration * revealStartPercent;
    const opacityFadeStartTime = scaleDuration * opacityFadeStartPercent;
    const revealDuration =
      scaleDuration * (opacityFadeEndPercent - opacityFadeStartPercent);

    const tl = gsap.timeline();

    // 1. Initial State: Hide text slightly lower for the slide-up entrance
    gsap.set(textRef.current, { opacity: 0, y: 40 });

    // 2. Slide the text up and fade it in at the very start
    tl.to(
      textRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      0,
    );

    // 3. Fill the loader bar and increment the counter
    tl.to(
      fillRef.current,
      {
        width: "100%",
        duration: 2.8,
        ease: "power2.inOut",
      },
      0,
    );

    tl.to(
      counter,
      {
        value: 100,
        duration: 2.8,
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.floor(counter.value));
        },
      },
      0,
    );

    // 4. Fade out text right before scaling up
    tl.to(
      textRef.current,
      {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in",
      },
      "-=0.3",
    );

    // 5. Ultimate Smooth Scaling + Flattening Tilt
    // Uses a deep 'expo.inOut' for an ultra-premium, ultra-smooth scaling curve
    tl.addLabel("scaleStart", ">-=0.1");

    tl.to(
      boxRef.current,
      {
        scale: 150,
        rotation: 0, // Animates back to horizontal from -6deg
        duration: scaleDuration,
        ease: "expo.inOut",
      },
      "scaleStart",
    );

    tl.call(
      () => {
        if (onRevealStart) onRevealStart();
      },
      undefined,
      `scaleStart+=${revealStartTime}`,
    );

    // 6. Keep the hero behind the loader, then fade the loader across the
    // editable scale percentage window above.
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: revealDuration,
        ease: "power2.out",
        onComplete: () => {
          if (containerRef.current) {
            containerRef.current.style.pointerEvents = "none";
          }
          if (onComplete) onComplete();
        },
      },
      `scaleStart+=${opacityFadeStartTime}`,
    );
  }, [onRevealStart, onComplete]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "#7c52ff", // Custom purple color requested
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "serif", // Swapped to a serif font closer to Screenshot (48).png
      }}
    >
      {/* Progress Bar Container */}
      <div
        ref={boxRef}
        style={{
          position: "relative",
          width: "240px",
          height: "12px",
          backgroundColor: "#3a3a3a",
          transform: "rotate(-6deg)", // Starts slanted
          overflow: "hidden",
          transformOrigin: "center center", // Ensures smooth rotation pivot point
        }}
      >
        {/* Inner Black Loading Fill */}
        <div
          ref={fillRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "0%",
            backgroundColor: "#000000",
          }}
        />
      </div>

      {/* Loading Text Component */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          bottom: "12%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          color: "#000000",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "40px",
            fontSize: "11px",
            letterSpacing: "0.2em",
            fontFamily: "Sora",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          <span>Loading...</span>
          <span>{progress}</span>
        </div>
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "normal",
            lineHeight: "1.2",
            margin: 0,
          }}
        >
          Building Digital
          <br />
          Experiences{" "}
        </h1>
      </div>
    </div>
  );
}
