import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type AnimatedIconAnimation = "pulse" | "rotate" | "bounce" | "none";

export interface AnimatedIconProps {
  icon: LucideIcon;
  size?: 32 | 48 | 64;
  color?: string;
  animation?: AnimatedIconAnimation;
  hoverAnimation?: boolean;
  duration?: number;
  label?: string;
  className?: string;
  iconClassName?: string;
}

function splitClassOrCss(
  value: string,
  property: "color" | "backgroundColor" | "borderColor"
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

export function AnimatedIcon({
  icon: Icon,
  size = 32,
  color = "#1F3B5E",
  animation = "pulse",
  hoverAnimation = true,
  duration = 3000,
  label,
  className,
  iconClassName,
}: AnimatedIconProps) {
  const reduceMotion = useReducedMotion();

  const colorResolved = splitClassOrCss(color, "color");
  const isInteractive = hoverAnimation && !reduceMotion;

  const animate =
    reduceMotion || animation === "none"
      ? undefined
      : animation === "pulse"
        ? { opacity: [1, 0.7, 1], scale: [1, 1.03, 1] }
        : animation === "rotate"
          ? { rotate: 360 }
          : undefined;

  const transition =
    reduceMotion || animation === "none"
      ? undefined
      : animation === "pulse"
        ? {
            duration: duration / 1000,
            repeat: Infinity,
            ease: "easeInOut",
          }
        : animation === "rotate"
          ? {
              duration: duration / 1000,
              repeat: Infinity,
              ease: "linear",
            }
          : undefined;

  const whileHover =
    animation === "bounce"
      ? {
          y: [0, -4, 0],
          scale: 1.05,
          filter: "brightness(1.08)",
          transition: { duration: 0.55, ease: "easeOut" },
        }
      : isInteractive
        ? {
            scale: 1.05,
            filter: "brightness(1.08)",
            transition: { duration: 0.2, ease: "easeOut" },
          }
        : undefined;

  return (
    <motion.span
      className={cn(
        "inline-flex shrink-0 items-center justify-center align-middle",
        "will-change-transform",
        className
      )}
      animate={animate}
      transition={transition}
      whileHover={whileHover}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      style={{ lineHeight: 0 }}
    >
      <Icon
        size={size}
        strokeWidth={2}
        focusable="false"
        aria-hidden={label ? undefined : true}
        className={cn("shrink-0", colorResolved.className, iconClassName)}
        style={colorResolved.style}
      />
    </motion.span>
  );
}
