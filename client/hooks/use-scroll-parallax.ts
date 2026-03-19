import { useEffect, useRef } from "react";

export function useScrollParallax() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const parallaxElements = containerRef.current?.querySelectorAll(
        "[data-parallax]"
      );

      parallaxElements?.forEach((element) => {
        const speedStr = (element as HTMLElement).dataset.parallax || "0.5";
        const speed = parseFloat(speedStr);

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const distance = scrollY - elementTop;

        // Apply parallax transform with performance optimization
        const transform = distance * speed;
        (element as HTMLElement).style.setProperty(
          "--scroll-y",
          `${transform}px`
        );

        // Apply blur effect based on scroll
        const blurAmount = Math.abs(distance) / 100;
        if (blurAmount < 10) {
          (element as HTMLElement).style.filter = `blur(${Math.min(
            blurAmount,
            5
          )}px)`;
        }
      });
    };

    // Use passive event listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { containerRef };
}
