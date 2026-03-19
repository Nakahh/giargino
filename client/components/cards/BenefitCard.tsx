import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

export function BenefitCard({
  icon,
  title,
  description,
  className,
  delay = 0,
}: BenefitCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className={cn(
        "group relative aspect-[1/1.1] overflow-hidden rounded-2xl border border-slate-200",
        "bg-white p-6 shadow-sm transition-transform duration-300",
        "transform-gpu will-change-transform",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent" />
        <div className="absolute right-[-20%] top-[-20%] h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary"
        animate={reduceMotion ? undefined : { scale: [1, 1.04, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        whileHover={reduceMotion ? undefined : { rotate: 12, scale: 1.08 }}
      >
        {icon}
      </motion.div>

      <div className="relative z-10 mt-8">
        <h3 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </motion.article>
  );
}
