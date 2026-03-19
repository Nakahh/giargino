import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MobileOptimizedSectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  id?: string;
  dataSection?: string;
  fullHeight?: boolean;
  backgroundColor?: string;
}

export function MobileOptimizedSection({
  children,
  className,
  title,
  subtitle,
  id,
  dataSection,
  fullHeight = false,
  backgroundColor,
}: MobileOptimizedSectionProps) {
  return (
    <motion.div
      id={id}
      data-section={dataSection}
      className={cn(
        "w-full",
        fullHeight ? "min-h-screen" : "auto",
        "py-4 sm:py-6 md:py-8 lg:py-10",
        "px-2 sm:px-4 md:px-6 lg:px-8",
        "transition-all duration-300",
        "scroll-smooth",
        className
      )}
      style={{
        backgroundColor: backgroundColor,
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      {/* Mobile-friendly header */}
      {(title || subtitle) && (
        <motion.div
          className="mb-4 sm:mb-6 md:mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {title && (
            <h2
              className={cn(
                "font-bold leading-tight mb-1 sm:mb-2",
                "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
                "text-gray-900"
              )}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <p
              className={cn(
                "text-sm sm:text-base md:text-lg",
                "text-gray-600",
                "font-medium"
              )}
            >
              {subtitle}
            </p>
          )}
          {title && (
            <div className="h-0.5 w-12 sm:w-16 bg-gradient-to-r from-blue-600 to-purple-600 mt-2 sm:mt-3 rounded-full" />
          )}
        </motion.div>
      )}

      {/* Content wrapper with responsive spacing */}
      <div className="w-full">
        {children}
      </div>
    </motion.div>
  );
}
