import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  tabTransitionVariants,
  tapFeedbackVariants,
  microInteractionVariants,
} from "@/hooks/use-animations";

interface Tab {
  id: string;
  label: string;
}

interface PremiumTabNavProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  primaryColor?: string;
  accentColor?: string;
  lightColor?: string;
}

export function PremiumTabNav({
  tabs,
  activeTab,
  onTabChange,
  primaryColor = "#1F3B5E",
  accentColor = "#F4C430",
  lightColor = "#FFFFFF",
}: PremiumTabNavProps) {
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const activeTabButtonRef = useRef<HTMLButtonElement>(null);

  // Auto-scroll para a aba ativa no mobile
  useEffect(() => {
    if (activeTabButtonRef.current && tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const button = activeTabButtonRef.current;

      setTimeout(() => {
        button.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }, 0);
    }
  }, [activeTab]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn(
        "sticky top-0 z-50 overflow-x-auto transition-all duration-300 shadow-lg",
        "md:shadow-xl"
      )}
      style={{
        background: `linear-gradient(180deg, ${lightColor} 0%, ${lightColor}f5 100%)`,
        backdropFilter: "blur(12px)",
        borderBottom: `2px solid ${accentColor}30`,
      }}
    >
      <div className="max-w-7xl mx-auto px-0">
        <div
          ref={tabsContainerRef}
          className={cn(
            "flex gap-0.5 md:gap-1 overflow-x-auto scrollbar-hide",
            "py-1 md:py-0 px-1 sm:px-2 md:px-0"
          )}
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              ref={activeTab === tab.id ? activeTabButtonRef : null}
              onClick={() => onTabChange(tab.id)}
              variants={tapFeedbackVariants}
              whileHover="whileHover"
              whileTap="whileTap"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.05,
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              className={cn(
                "relative px-2 sm:px-3 md:px-5 py-2 md:py-3 text-xs sm:text-sm md:text-base",
                "font-bold transition-all duration-300 whitespace-nowrap flex-shrink-0",
                "rounded-lg md:rounded-none group overflow-hidden"
              )}
              style={
                activeTab === tab.id
                  ? {
                      backgroundColor: primaryColor,
                      borderColor: accentColor,
                      color: lightColor,
                      boxShadow: `0 4px 16px ${primaryColor}40, 0 0 20px ${accentColor}30`,
                    }
                  : {
                      color: "#6b7280",
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                    }
              }
            >
              {/* Premium glow effect + glassmorphism */}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute inset-0 rounded-lg md:rounded-none blur-md"
                  style={{
                    background: `radial-gradient(circle at center, ${accentColor}40, transparent)`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}

              <span className="relative z-10 block">{tab.label}</span>

              {/* Animated underline indicator */}
              <motion.div
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-1 md:h-0.5 rounded-t-lg",
                  "bg-gradient-to-r"
                )}
                style={{
                  backgroundImage: `linear-gradient(90deg, ${accentColor}, ${accentColor}60, transparent)`,
                }}
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: activeTab === tab.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Hover effect background - mobile friendly */}
              <motion.div
                className="absolute inset-0 rounded-lg md:rounded-none opacity-0"
                style={{
                  backgroundColor: primaryColor,
                }}
                animate={{
                  opacity: activeTab === tab.id ? 0.05 : 0,
                }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
