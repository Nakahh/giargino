import type { AnimatedIconProps } from "@/components/icons/AnimatedIcon";

export type IconContext = "kpi" | "feature" | "benefit" | "process";

export type IconPreset = Pick<
  AnimatedIconProps,
  "size" | "color" | "animation" | "hoverAnimation" | "duration"
>;

export const ICON_PRESETS: Record<IconContext, IconPreset> = {
  kpi: {
    size: 48,
    color: "#F4C430",
    animation: "pulse",
    hoverAnimation: true,
    duration: 3000,
  },
  feature: {
    size: 32,
    color: "#1F3B5E",
    animation: "bounce",
    hoverAnimation: true,
    duration: 600,
  },
  benefit: {
    size: 48,
    color: "#2D5016",
    animation: "pulse",
    hoverAnimation: true,
    duration: 3000,
  },
  process: {
    size: 32,
    color: "#1F3B5E",
    animation: "rotate",
    hoverAnimation: false,
    duration: 8000,
  },
} as const;

export function getIconPreset(context: IconContext): IconPreset {
  return ICON_PRESETS[context];
}
