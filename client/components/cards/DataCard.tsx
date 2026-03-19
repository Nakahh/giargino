import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type DataCardColor = "accent" | "primary" | "success" | "warning";

interface DataCardProps {
  metric: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: DataCardColor;
  className?: string;
}

const colorStyles: Record<DataCardColor, { dot: string; icon: string; change: string }> = {
  accent: {
    dot: "bg-accent",
    icon: "text-accent",
    change: "text-amber-700 bg-amber-50",
  },
  primary: {
    dot: "bg-primary",
    icon: "text-primary",
    change: "text-slate-700 bg-slate-100",
  },
  success: {
    dot: "bg-emerald-500",
    icon: "text-emerald-600",
    change: "text-emerald-700 bg-emerald-50",
  },
  warning: {
    dot: "bg-amber-500",
    icon: "text-amber-600",
    change: "text-amber-800 bg-amber-50",
  },
};

export function DataCard({
  metric,
  value,
  change,
  icon,
  color,
  className,
}: DataCardProps) {
  const reduceMotion = useReducedMotion();
  const styles = colorStyles[color];

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      className={cn(
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-200",
        "transform-gpu will-change-transform",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            {metric}
          </p>
          <div className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </div>
        </div>

        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50", styles.icon)}>
          {icon}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", styles.change)}>
          {change}
        </span>
        <span className={cn("h-2 w-2 rounded-full", styles.dot)} />
      </div>
    </motion.article>
  );
}
