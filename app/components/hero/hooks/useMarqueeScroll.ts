import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";

export default function useMarqueeScroll(
  trackRef: RefObject<HTMLDivElement | null>,
  scrollRef?: RefObject<HTMLElement | null>,
) {
  const velocityRef = useRef(0);
  const positionRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const scrollTarget = window;

    // Duplicate items for seamless loop
    const originalItems = Array.from(track.children);
    originalItems.forEach((item) => {
      track.appendChild(item.cloneNode(true));
    });

    const baseSpeed = 1.5;
    const smoothVelocity = { current: 0 };

    const ticker = () => {
      smoothVelocity.current +=
        (velocityRef.current - smoothVelocity.current) * 0.05;
      const currentSpeed = baseSpeed + smoothVelocity.current * 9;
      positionRef.current -= currentSpeed;

      const halfWidth = track.scrollWidth / 2;
      if (Math.abs(positionRef.current) >= halfWidth) {
        positionRef.current = 0;
      }

      gsap.set(track, { x: positionRef.current });
      velocityRef.current *= 0.92;
    };

    const handleWheel = (event: WheelEvent) => {
      if (
        scrollRef?.current &&
        !scrollRef.current.contains(event.target as Node)
      ) {
        return;
      }

      const boost = Math.min(1.2, Math.abs(event.deltaY) / 50);
      velocityRef.current = Math.min(3, velocityRef.current + boost);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      gsap.ticker.remove(ticker);
    };
  }, [trackRef, scrollRef]);

  return velocityRef;
}
