import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type FeatureColor = "accent" | "primary";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: number | string;
  color: FeatureColor;
  className?: string;
}

const colorMap: Record<
  FeatureColor,
  {
    gradient: string;
    glow: string;
    icon: string;
    badge: string;
  }
> = {
  accent: {
    gradient: "linear-gradient(135deg, rgba(244,196,48,0.08) 0%, rgba(244,196,48,0) 72%)",
    glow: "rgba(244,196,48,0.18)",
    icon: "text-accent",
    badge: "border-accent/20 bg-accent/10 text-primary",
  },
  primary: {
    gradient: "linear-gradient(135deg, rgba(31,59,94,0.08) 0%, rgba(31,59,94,0) 72%)",
    glow: "rgba(31,59,94,0.18)",
    icon: "text-primary",
    badge: "border-primary/20 bg-primary/10 text-primary",
  },
};

export function FeatureCard({
  icon,
  title,
  description,
  number,
  color,
  className,
}: FeatureCardProps) {
  const reduceMotion = useReducedMotion();
  const styles = colorMap[color];

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -6,
              boxShadow: `0 18px 40px rgba(15, 23, 42, 0.10), 0 0 0 1px ${styles.glow}`,
            }
      }
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "group relative min-h-[260px] overflow-hidden rounded-2xl border border-slate-200",
        "bg-white p-6 shadow-sm transition-transform duration-300",
        "transform-gpu will-change-transform",
        className
      )}
      style={{ backgroundImage: styles.gradient }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at top right, ${styles.glow} 0%, transparent 45%)`,
          }}
        />
      </div>

      <motion.div
        className={cn(
          "relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl",
          "bg-white/90 shadow-sm ring-1 ring-black/5",
          styles.icon
        )}
        animate={reduceMotion ? undefined : { scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={reduceMotion ? undefined : { rotate: 6, scale: 1.08 }}
      >
        {icon}
      </motion.div>

      <div className="relative z-10 mt-8 max-w-[90%]">
        <h3 className="text-[1.25rem] font-bold tracking-tight text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      </div>

      <div className="relative z-10 mt-8 flex justify-end">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
            styles.badge
          )}
        >
          {number}
        </span>
      </div>
    </motion.article>
  );
}
