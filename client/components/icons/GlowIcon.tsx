import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type GlowIntensity = "soft" | "medium" | "strong";

export interface GlowIconProps {
  icon: LucideIcon;
  glowColor: string;
  intensity?: GlowIntensity;
  label?: string;
  className?: string;
  iconClassName?: string;
}

const INTENSITY_MAP = {
  soft: {
    blur: 10,
    spread: 0.35,
    shadow: 18,
    opacity: 0.7,
  },
  medium: {
    blur: 16,
    spread: 0.45,
    shadow: 28,
    opacity: 0.8,
  },
  strong: {
    blur: 24,
    spread: 0.55,
    shadow: 38,
    opacity: 0.9,
  },
} as const;

export function GlowIcon({
  icon: Icon,
  glowColor,
  intensity = "soft",
  label,
  className,
  iconClassName,
}: GlowIconProps) {
  const reduceMotion = useReducedMotion();
  const preset = INTENSITY_MAP[intensity];

  const filterStyle: CSSProperties = {
    color: glowColor,
    filter: `drop-shadow(0 0 ${preset.blur}px ${glowColor}) drop-shadow(0 0 ${
      preset.shadow
    }px ${glowColor}55)`,
  };

  return (
    <motion.span
      className={cn(
        "inline-flex shrink-0 items-center justify-center align-middle",
        "will-change-transform",
        className
      )}
      style={filterStyle}
      animate={
        reduceMotion
          ? undefined
          : {
              opacity: [1, preset.opacity, 1],
              scale: [1, 1.02, 1],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <Icon
        size={32}
        strokeWidth={2}
        focusable="false"
        aria-hidden={label ? undefined : true}
        className={cn("shrink-0", iconClassName)}
        style={{ color: glowColor }}
      />
    </motion.span>
  );
}
