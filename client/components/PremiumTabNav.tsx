import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

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
      className="bg-white sticky top-0 z-10 shadow-lg overflow-x-auto transition-all duration-300"
      style={{
        background: `linear-gradient(180deg, ${lightColor} 0%, ${lightColor}dd 100%)`,
        backdropFilter: "blur(8px)",
        borderBottom: `3px solid ${accentColor}20`,
      }}
    >
      <div className="max-w-7xl mx-auto px-1 sm:px-2 md:px-6">
        <div
          ref={tabsContainerRef}
          className="flex gap-1 md:gap-2 overflow-x-auto scrollbar-hide py-2 md:py-0"
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              ref={activeTab === tab.id ? activeTabButtonRef : null}
              onClick={() => onTabChange(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative px-3 sm:px-4 md:px-6 py-2.5 md:py-4 text-xs sm:text-sm md:text-base font-bold border-b-3 transition-all duration-300 whitespace-nowrap flex-shrink-0 rounded-t-lg group"
              style={
                activeTab === tab.id
                  ? {
                      backgroundColor: primaryColor,
                      borderColor: accentColor,
                      color: lightColor,
                      boxShadow: `0 4px 12px ${primaryColor}30`,
                    }
                  : {
                      color: "#4b5563",
                      borderColor: "transparent",
                    }
              }
            >
              <span className="relative z-10">{tab.label}</span>

              {/* Animated underline indicator */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${accentColor}, transparent)`,
                }}
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: activeTab === tab.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                layoutId={`tab-indicator-${tab.id}`}
              />

              {/* Hover effect background */}
              <motion.div
                className="absolute inset-0 rounded-t-lg opacity-0 group-hover:opacity-5"
                style={{
                  backgroundColor: primaryColor,
                }}
                animate={{
                  opacity: activeTab === tab.id ? 0 : 0.05,
                }}
              />
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
