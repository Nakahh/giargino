import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

type ContextColor = "success" | "warning" | "neutral";

interface KPICardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  context: string;
  contextColor: ContextColor;
  progressValue: number;
  animateValue: boolean;
  className?: string;
}

const contextColorClasses: Record<ContextColor, string> = {
  success: "text-emerald-600",
  warning: "text-amber-600",
  neutral: "text-slate-500",
};

function useCountUp(target: number, animate: boolean, duration = 800) {
  const reduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(animate && !reduceMotion ? 0 : target);

  useEffect(() => {
    if (!animate || reduceMotion) {
      setCurrent(target);
      return;
    }

    let rafId = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setCurrent(target * eased);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCurrent(target);
      }
    };

    setCurrent(0);
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [target, animate, reduceMotion, duration]);

  return current;
}

function formatCount(value: number) {
  const fractionDigits = Number.isInteger(value) ? 0 : 2;
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: fractionDigits,
  }).format(value);
}

export function KPICard({
  icon,
  title,
  value,
  context,
  contextColor,
  progressValue,
  animateValue,
  className,
}: KPICardProps) {
  const reduceMotion = useReducedMotion();
  const numericValue = typeof value === "number" ? value : null;
  const animatedValue = useCountUp(numericValue ?? 0, animateValue && numericValue !== null);

  const displayValue =
    numericValue !== null
      ? formatCount(animateValue && !reduceMotion ? animatedValue : numericValue)
      : value;

  const clampedProgress = Math.max(0, Math.min(progressValue, 100));

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              boxShadow:
                "0 12px 30px rgba(15, 23, 42, 0.12), 0 0 0 1px rgba(244, 196, 48, 0.28)",
            }
      }
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-[rgba(244,196,48,0.30)]",
        "bg-white/90 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm",
        "transform-gpu will-change-transform",
        "transition-transform duration-300",
        "card-hover-premium",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgba(15, 23, 42, 0.05) 0%, rgba(15, 23, 42, 0) 100%)",
      }}
      aria-label={`${title}: ${displayValue}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/[0.03] via-transparent to-transparent" />

      <motion.div
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary"
        animate={reduceMotion ? undefined : { scale: [1, 1.03, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {icon}
      </motion.div>

      <div className="relative z-10 mt-5">
        <p className="text-sm font-semibold tracking-tight text-slate-600">{title}</p>

        <motion.h3
          className="mt-2 text-[3.5rem] font-bold leading-none tracking-tight text-slate-900 md:text-[3.5rem]"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
        >
          {displayValue}
        </motion.h3>

        <p className={cn("mt-3 text-xs font-medium tracking-wide", contextColorClasses[contextColor])}>
          {context}
        </p>

        <div className="mt-5">
          <Progress
            value={clampedProgress}
            className="h-1.5 rounded-full bg-slate-200/70"
          />
        </div>
      </div>
    </motion.article>
  );
}
