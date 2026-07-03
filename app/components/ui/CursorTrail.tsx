// "use client";

// import { useEffect, useRef, useMemo } from "react";
// import gsap from "gsap";
// import { useCursorContext } from "../CursorProvider";

// /** Repeat "NAME * " enough times so 2 copies fill well beyond the pill */
// function buildMarqueeText(name: string): string {
//   const segment = `${name.toUpperCase()} * `;
//   return segment.repeat(10);
// }

// export default function CursorTrail() {
//   const circleRef = useRef<HTMLDivElement>(null);
//   const innerRef = useRef<HTMLDivElement>(null);
//   const { hoveredProject } = useCursorContext();

//   const marqueeText = useMemo(
//     () => (hoveredProject ? buildMarqueeText(hoveredProject) : ""),
//     [hoveredProject],
//   );

//   // Track mouse position
//   useEffect(() => {
//     const circle = circleRef.current;
//     if (!circle) return;

//     const xSet = gsap.quickTo(circle, "x", {
//       duration: 0.2,
//       ease: "power3.out",
//     });
//     const ySet = gsap.quickTo(circle, "y", {
//       duration: 0.2,
//       ease: "power3.out",
//     });

//     const handleMouseMove = (e: MouseEvent) => {
//       const w = circle.offsetWidth;
//       xSet(e.clientX - w / 2);
//       ySet(e.clientY - 8);
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   // Expand / shrink the pill
//   useEffect(() => {
//     const circle = circleRef.current;
//     if (!circle) return;

//     if (hoveredProject) {
//       gsap.to(circle, {
//         width: 180,
//         duration: 0.35,
//         ease: "power3.out",
//       });
//     } else {
//       gsap.to(circle, {
//         width: 16,
//         duration: 0.35,
//         ease: "power3.out",
//       });
//     }
//   }, [hoveredProject]);

//   // GSAP marquee — animate the inner div x infinitely
//   useEffect(() => {
//     const inner = innerRef.current;
//     if (!inner || !hoveredProject) return;

//     // Wait for layout, then measure one copy
//     const span = inner.firstElementChild as HTMLSpanElement;
//     if (!span) return;

//     const oneCopyWidth = span.offsetWidth + 32; // + pr-8 gap
//     let pos = 0;

//     const ticker = () => {
//       pos -= 1.5;
//       if (Math.abs(pos) >= oneCopyWidth) pos = 0;
//       gsap.set(inner, { x: pos });
//     };

//     gsap.ticker.add(ticker);
//     return () => {
//       gsap.ticker.remove(ticker);
//     };
//   }, [hoveredProject, marqueeText]);

//   return (
//     <div
//       ref={circleRef}
//       className="pointer-events-none fixed top-0 left-0 z-999 h-4 rounded-full will-change-transform overflow-hidden flex items-center"
//       style={{ backgroundColor: "#7c52ff", width: 16 }}
//     >
//       {hoveredProject && (
//         <div
//           ref={innerRef}
//           className="flex whitespace-nowrap font-bold font-Sora lowercase"
//         >
//           <span className="text-[10px] font-medium text-black tracking-widest select-none pr-8">
//             {marqueeText}
//           </span>
//           <span className="text-[10px] font-medium text-black tracking-widest select-none pr-8">
//             {marqueeText}
//           </span>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useRef, useMemo } from "react";
import gsap from "gsap";
import { useCursorContext } from "../CursorProvider";

/** Repeat "NAME * " enough times so 2 copies fill well beyond the pill */
function buildMarqueeText(name: string): string {
  const segment = `${name.toUpperCase()} * `;
  return segment.repeat(10);
}

export default function CursorTrail() {
  const circleRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { hoveredProject } = useCursorContext();

  const marqueeText = useMemo(
    () => (hoveredProject ? buildMarqueeText(hoveredProject) : ""),
    [hoveredProject],
  );

  // Track mouse position
  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    gsap.set(circle, { xPercent: -50, yPercent: -50 });

    const xSet = gsap.quickTo(circle, "x", {
      duration: 0.2,
      ease: "power3.out",
    });
    const ySet = gsap.quickTo(circle, "y", {
      duration: 0.2,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      xSet(e.clientX);
      ySet(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Expand / shrink the pill
  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    if (hoveredProject) {
      gsap.to(circle, {
        width: 180,
        duration: 0.35,
        ease: "power3.out",
      });
    } else {
      gsap.to(circle, {
        width: 16,
        duration: 0.35,
        ease: "power3.out",
      });
    }
  }, [hoveredProject]);

  // GSAP marquee — animate the inner div x infinitely
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner || !hoveredProject) return;

    // Wait for layout, then measure one copy
    const span = inner.firstElementChild as HTMLSpanElement;
    if (!span) return;

    const oneCopyWidth = span.offsetWidth + 32; // + pr-8 gap
    let pos = 0;

    const ticker = () => {
      pos -= 1.5;
      if (Math.abs(pos) >= oneCopyWidth) pos = 0;
      gsap.set(inner, { x: pos });
    };

    gsap.ticker.add(ticker);
    return () => {
      gsap.ticker.remove(ticker);
    };
  }, [hoveredProject, marqueeText]);

  return (
    <div
      ref={circleRef}
      className="pointer-events-none fixed top-0 left-0 z-999 h-4 rounded-full will-change-transform overflow-hidden flex items-center"
      style={{ backgroundColor: "#7c52ff", width: 16 }}
    >
      {hoveredProject && (
        <div
          ref={innerRef}
          className="flex whitespace-nowrap font-bold font-Sora lowercase"
        >
          <span className="text-[10px] font-medium text-black tracking-widest select-none pr-8">
            {marqueeText}
          </span>
          <span className="text-[10px] font-medium text-black tracking-widest select-none pr-8">
            {marqueeText}
          </span>
        </div>
      )}
    </div>
  );
}
