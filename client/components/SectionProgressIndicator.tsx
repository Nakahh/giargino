import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProgressIndicatorProps {
  sections: string[];
  activeSection?: string;
  onSectionClick?: (section: string) => void;
  position?: "bottom" | "right" | "fixed-right";
  variant?: "dots" | "line" | "pills";
}

export function SectionProgressIndicator({
  sections,
  activeSection,
  onSectionClick,
  position = "fixed-right",
  variant = "dots",
}: SectionProgressIndicatorProps) {
  const currentIndex = useMemo(
    () => sections.indexOf(activeSection || sections[0]),
    [sections, activeSection]
  );

  const containerClass = {
    bottom: "fixed bottom-6 left-1/2 -translate-x-1/2 z-40",
    right: "fixed right-6 top-1/2 -translate-y-1/2 z-40",
    "fixed-right": "fixed right-6 bottom-20 z-40",
  }[position];

  const flexClass =
    position === "right" || position === "fixed-right"
      ? "flex flex-col gap-2 sm:gap-3"
      : "flex gap-2 sm:gap-3";

  return (
    <motion.div
      className={cn(containerClass, flexClass)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {variant === "dots" && (
        <div className="flex gap-2 sm:gap-3 items-center justify-center">
          {sections.map((section, index) => (
            <motion.button
              key={section}
              onClick={() => onSectionClick?.(section)}
              className={cn(
                "transition-all duration-300 rounded-full",
                "hover:scale-125 cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              )}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={
                index === currentIndex
                  ? {
                      scale: 1.3,
                      boxShadow:
                        "0 0 20px rgba(244, 196, 48, 0.8), 0 0 40px rgba(31, 59, 94, 0.3)",
                    }
                  : {
                      scale: 1,
                      boxShadow: "0 0 0px rgba(244, 196, 48, 0)",
                    }
              }
              transition={{ duration: 0.3 }}
              title={section}
            >
              <div
                className={cn(
                  "w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : "bg-gray-300 hover:bg-gray-400"
                )}
              />
            </motion.button>
          ))}
        </div>
      )}

      {variant === "line" && (
        <div className="relative flex gap-1 sm:gap-2">
          {sections.map((section, index) => (
            <motion.div
              key={section}
              className="w-6 sm:w-8 h-0.5 bg-gray-300 rounded-full"
              animate={
                index <= currentIndex
                  ? {
                      backgroundColor: "rgb(59, 130, 246)",
                      boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                    }
                  : {}
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      )}

      {variant === "pills" && (
        <div className="flex flex-col gap-1 sm:gap-2">
          {sections.map((section, index) => (
            <motion.button
              key={section}
              onClick={() => onSectionClick?.(section)}
              className={cn(
                "text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-semibold",
                "transition-all duration-300 cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              )}
              whileHover={{ scale: 1.05, x: 4 }}
              whileTap={{ scale: 0.95 }}
              animate={
                index === currentIndex
                  ? {
                      backgroundColor: "rgb(31, 59, 94)",
                      color: "white",
                      boxShadow:
                        "0 4px 12px rgba(31, 59, 94, 0.4), 0 0 20px rgba(244, 196, 48, 0.3)",
                    }
                  : {
                      backgroundColor: "rgba(209, 213, 219, 0.5)",
                      color: "rgb(75, 85, 99)",
                    }
              }
              transition={{ duration: 0.3 }}
            >
              {section}
            </motion.button>
          ))}
        </div>
      )}

      {/* Progress bar */}
      <motion.div
        className="absolute -left-4 sm:-left-5 top-0 w-0.5 h-full bg-gradient-to-b from-blue-600 via-purple-500 to-pink-500 rounded-full"
        initial={{ height: 0 }}
        animate={{
          height: `${((currentIndex + 1) / sections.length) * 100}%`,
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}
