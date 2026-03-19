import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { KPICard } from "@/components/cards";
import { fadeInUp, contentStaggerVariants } from "@/lib/animation-helpers";

type KPIItem = {
  icon?: React.ReactNode;
  title: string;
  value: string | number;
  context?: string;
  progress?: number;
  trend?: "up" | "down" | "neutral";
};

interface KPISectionProps {
  title: string;
  subtitle?: string;
  kpis: KPIItem[];
  layout?: "grid-4" | "grid-3";
  className?: string;
}

const gridLayouts = {
  "grid-4": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  "grid-3": "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
} as const;

export function KPISection({
  title,
  subtitle,
  kpis,
  layout = "grid-4",
  className,
}: KPISectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={cn("relative px-4 py-16 sm:px-6 md:px-8 md:py-24 lg:px-12", className)}
      id="kpi-section"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-slate-600 max-w-2xl">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Grid com stagger */}
        <motion.div
          variants={contentStaggerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className={cn("grid gap-6 md:gap-8", gridLayouts[layout])}
        >
          {kpis.map((kpi, idx) => (
            <motion.div
              key={`${kpi.title}-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: "easeOut",
              }}
            >
              <KPICard
                icon={kpi.icon || null}
                title={kpi.title}
                value={kpi.value}
                context={kpi.context || ""}
                contextColor={kpi.trend === "up" ? "success" : kpi.trend === "down" ? "warning" : "neutral"}
                progressValue={kpi.progress || 50}
                animateValue={typeof kpi.value === "number"}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
