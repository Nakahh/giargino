import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type IconBadgeSize = "sm" | "md" | "lg";

export interface IconBadgeProps {
  icon: LucideIcon;
  backgroundColor: string;
  iconColor: string;
  size?: IconBadgeSize;
  label?: string;
  className?: string;
}

function splitClassOrCss(
  value: string,
  property: "color" | "backgroundColor"
): { className?: string; style?: CSSProperties } {
  const looksLikeUtilityClass =
    value.includes(" ") ||
    /^(bg|text|stroke|fill|ring|border|shadow|from|via|to)-/.test(value) ||
    /^(hover|focus|active|dark|group-hover|peer-hover):/.test(value);

  if (looksLikeUtilityClass) {
    return { className: value };
  }

  return { style: { [property]: value } as CSSProperties };
}

const SIZE_MAP = {
  sm: { box: "h-10 w-10", icon: 18, radius: "rounded-full" },
  md: { box: "h-12 w-12", icon: 22, radius: "rounded-2xl" },
  lg: { box: "h-16 w-16", icon: 28, radius: "rounded-3xl" },
} as const;

export function IconBadge({
  icon: Icon,
  backgroundColor,
  iconColor,
  size = "md",
  label,
  className,
}: IconBadgeProps) {
  const reduceMotion = useReducedMotion();
  const badge = SIZE_MAP[size];

  const bg = splitClassOrCss(backgroundColor, "backgroundColor");
  const fg = splitClassOrCss(iconColor, "color");

  return (
    <motion.div
      className={cn(
        "inline-flex items-center justify-center overflow-hidden",
        "shadow-sm ring-1 ring-black/5",
        "transform-gpu will-change-transform",
        "transition-shadow duration-300",
        badge.box,
        badge.radius,
        className
      )}
      style={bg.style}
      whileHover={
        reduceMotion
          ? { scale: 1.01 }
          : {
              y: -3,
              scale: 1.03,
              boxShadow: "0 18px 40px rgba(15, 23, 42, 0.16)",
              transition: { duration: 0.2, ease: "easeOut" },
            }
      }
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <Icon
        size={badge.icon}
        strokeWidth={2}
        focusable="false"
        aria-hidden={label ? undefined : true}
        className={cn(fg.className)}
        style={fg.style}
      />
    </motion.div>
  );
}
