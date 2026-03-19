import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type SectionId = "overview" | "revenue" | "costs" | "hr" | "viability" | "project";

interface SectionPositionIndicatorProps {
  activeSection: SectionId;
  primaryColor?: string;
  accentColor?: string;
  onNavigate?: (sectionId: SectionId) => void;
}

const SECTION_BASE = [
  { id: "overview", emoji: "📊" },
  { id: "revenue", emoji: "💰" },
  { id: "costs", emoji: "📉" },
  { id: "hr", emoji: "👥" },
  { id: "viability", emoji: "✓" },
  { id: "project", emoji: "🏢" },
];

export function SectionPositionIndicator({
  activeSection,
  primaryColor = "#1F3B5E",
  accentColor = "#F4C430",
  onNavigate,
}: SectionPositionIndicatorProps) {
  const { t } = useTranslation();

  const SECTIONS = SECTION_BASE.map(section => ({
    ...section,
    label: t(`ui.sections.${section.id}`)
  }));
  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const totalSections = SECTIONS.length;
  const progressPercent = ((currentIndex + 1) / totalSections) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
    >
      <div className="flex flex-col items-end gap-3">
        {/* Indicador de progresso circular */}
        <div className="relative w-20 h-20 md:w-24 md:h-24">
          {/* Background circle */}
          <svg className="w-full h-full drop-shadow-lg">
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill={primaryColor}
              opacity="0.1"
            />
            <circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke={primaryColor}
              strokeWidth="2"
              opacity="0.3"
            />

            {/* Progress circle */}
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke={accentColor}
              strokeWidth="3"
              strokeDasharray={`${(progressPercent / 100) * 2 * Math.PI * 48} ${2 * Math.PI * 48}`}
              strokeLinecap="round"
              initial={{ strokeDashoffset: `${2 * Math.PI * 48}` }}
              animate={{
                strokeDashoffset: `${(1 - progressPercent / 100) * 2 * Math.PI * 48}`,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              key={`section-${activeSection}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl mb-1">
                {SECTIONS[currentIndex].emoji}
              </div>
              <div
                className="text-xs md:text-sm font-bold leading-tight"
                style={{ color: primaryColor }}
              >
                {currentIndex + 1}/{totalSections}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Label e breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-3 md:p-4 border-l-4 w-max max-w-xs"
          style={{ borderLeftColor: accentColor }}
        >
          <div className="text-xs md:text-sm font-semibold mb-2" style={{ color: primaryColor }}>
            {SECTIONS[currentIndex].label}
          </div>

          {/* Mini navigation */}
          <div className="flex gap-1 flex-wrap">
            {SECTIONS.map((section, idx) => (
              <motion.button
                key={section.id}
                onClick={() => onNavigate?.(section.id as SectionId)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "w-6 h-6 md:w-7 md:h-7 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer",
                  idx === currentIndex
                    ? "text-white shadow-md"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                )}
                style={
                  idx === currentIndex
                    ? { backgroundColor: accentColor }
                    : undefined
                }
                title={section.label}
              >
                {idx + 1}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
