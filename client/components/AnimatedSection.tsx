import { ReactNode, useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { sectionVariants } from "@/hooks/use-animations";

interface AnimatedSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: ReactNode;
  enableParallax?: boolean;
  enableBlur?: boolean;
  gradient?: boolean;
}

export function AnimatedSection({
  id,
  children,
  className = "",
  title,
  icon,
  enableParallax = true,
  enableBlur = true,
  gradient = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [isInView, setIsInView] = useState(false);

  // Parallax effect
  const y = useTransform(scrollY, [0, 1000], [0, enableParallax ? 100 : 0]);
  const opacity = useTransform(
    scrollY,
    [0, 200, 500],
    [0, 0.5, enableBlur ? 1 : 1]
  );
  const blur = useTransform(
    scrollY,
    [0, 300, 500],
    [10, 5, enableBlur ? 0 : 0]
  );

  // Intersection Observer para detectar quando seção está visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.section
      ref={ref}
      id={`tab-${id}`}
      data-section={id}
      initial="initial"
      whileInView="animate"
      viewport={{ once: false, amount: 0.2 }}
      variants={sectionVariants}
      style={{
        y: enableParallax ? y : 0,
        opacity: isInView ? 1 : opacity,
        filter: enableBlur ? blur : "blur(0px)",
      }}
      className={`min-h-screen scroll-mt-20 py-6 md:py-12 px-2 sm:px-4 md:px-6 ${
        gradient
          ? "bg-gradient-to-br from-slate-50 via-transparent to-slate-50"
          : ""
      } ${className}`}
    >
      {/* Seção Snap Point */}
      <div className="max-w-7xl mx-auto">
        {title && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 md:mb-12"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-2">
              {icon && (
                <motion.div
                  className="text-2xl md:text-4xl"
                  animate={isInView ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {icon}
                </motion.div>
              )}
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {title}
              </h2>
            </div>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
