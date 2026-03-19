import { useEffect, useRef, useCallback } from "react";

export type SectionType =
  | "overview"
  | "revenue"
  | "costs"
  | "hr"
  | "viability"
  | "project";

interface UseSectionScrollOptions {
  onSectionChange?: (section: SectionType) => void;
  threshold?: number;
  isMobile?: boolean;
}

export function useSectionScroll({
  onSectionChange,
  threshold = 0.3,
  isMobile = false,
}: UseSectionScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollTimeRef = useRef<number>(0);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id.replace("tab-", "") as SectionType;
          // Add debounce to prevent rapid changes
          const now = Date.now();
          if (now - lastScrollTimeRef.current > 300) {
            onSectionChange?.(sectionId);
            lastScrollTimeRef.current = now;
          }
        }
      });
    },
    [onSectionChange]
  );

  useEffect(() => {
    if (!isMobile) return;

    // Create intersection observer for mobile auto-scroll
    const options: IntersectionObserverInit = {
      root: document.getElementById("dashboard-content"),
      threshold: threshold,
      rootMargin: "-50px 0px -50% 0px",
    };

    observerRef.current = new IntersectionObserver(
      handleIntersection,
      options
    );

    // Observe all sections
    const sections = document.querySelectorAll("[data-section]");
    sections.forEach((section) => {
      observerRef.current?.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleIntersection, threshold, isMobile]);

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: SectionType) => {
    const element = document.getElementById(`tab-${sectionId}`);
    if (element) {
      const container = document.getElementById("dashboard-content");
      if (container) {
        // Clear any pending scroll timeouts
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Use requestAnimationFrame for smooth scroll
        scrollTimeoutRef.current = setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    }
  }, []);

  return { scrollToSection };
}
