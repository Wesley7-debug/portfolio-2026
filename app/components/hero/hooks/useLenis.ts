import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useLenisContext } from "../../LenisProvider";

export default function useLenis() {
  const { setInstance } = useLenisContext();

  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    setInstance(lenis);

    return () => {
      setInstance(null);
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, [setInstance]);
}
