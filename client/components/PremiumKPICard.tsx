import { type ComponentType, type SVGProps } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/hooks/use-currency";

type Trend = {
  direction: "up" | "down";
  percentage: number;
};

type IconType = ComponentType<SVGProps<SVGSVGElement>>;
type Variant = "default" | "gradient" | "glass";

interface PremiumKPICardProps {
  icon: IconType;
  label: string;
  value: number | string;
  trend?: Trend;
  color?: string;
  backgroundColor?: string;
  variant?: Variant;
  delay?: number;
  className?: string;
}

const EASE_IN_OUT_CUBIC = [0.645, 0.045, 0.355, 1] as const;

export function PremiumKPICard({
  icon: Icon,
  label,
  value,
  trend,
  color = "#1F3B5E",
  backgroundColor = "rgba(255,255,255,0.78)",
  variant = "default",
  delay = 0,
  className,
}: PremiumKPICardProps) {
  const { formatCurrency } = useCurrency();
  const reduceMotion = useReducedMotion();

  const formattedValue = typeof value === "number" ? formatCurrency(value) : value;
  const isUp = trend?.direction === "up";

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { scale: 1.02, y: -4 }}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.3, delay, ease: EASE_IN_OUT_CUBIC }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/60",
        "p-4 md:p-6 shadow-sm transform-gpu will-change-transform",
        "transition-all duration-300 ease-in-out hover:shadow-2xl",
        variant === "glass" && "glass-effect-premium backdrop-blur-md",
        variant === "gradient" && "bg-gradient-to-br from-white via-white to-slate-50",
        variant === "default" && "bg-white",
        className
      )}
      style={{
        borderLeftWidth: 4,
        borderLeftColor: color,
        backgroundColor,
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at top left, ${color}22 0%, transparent 45%)`,
        }}
      />

      <div className="relative z-10 flex items-start gap-4">
        <motion.div
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/80 shadow-sm ring-1 ring-black/5"
          whileHover={reduceMotion ? undefined : { rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.3, ease: EASE_IN_OUT_CUBIC }}
          style={{ color }}
        >
          <Icon className="h-8 w-8" strokeWidth={1.8} />
        </motion.div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-500">{label}</p>

          <div
            className="mt-1 bg-clip-text text-[2.5rem] font-bold leading-none tracking-tight text-transparent md:text-[3rem]"
            style={{
              backgroundImage:
                variant === "gradient"
                  ? `linear-gradient(135deg, ${color} 0%, #F4C430 100%)`
                  : `linear-gradient(135deg, ${color} 0%, #0F172A 100%)`,
            }}
          >
            {formattedValue}
          </div>

          {trend && (
            <div
              className={cn(
                "mt-3 flex items-center gap-1 text-sm font-semibold",
                isUp ? "text-emerald-600" : "text-rose-600"
              )}
            >
              {isUp ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              <span>
                {isUp ? "+" : "-"}
                {Math.abs(trend.percentage).toFixed(1)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
