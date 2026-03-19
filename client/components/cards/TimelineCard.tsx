import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineCardProps {
  number: number | string;
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  delay?: number;
}

export function TimelineCard({
  number,
  title,
  description,
  icon,
  className,
  delay = 0,
}: TimelineCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm",
        "transition-transform duration-300",
        "transform-gpu will-change-transform",
        className
      )}
    >
      <div className="absolute left-6 top-6 h-[calc(100%-3rem)] w-px bg-gradient-to-b from-accent/40 via-slate-200 to-transparent" />

      <div className="relative z-10 flex items-start gap-4 pl-4">
        <div className="flex flex-shrink-0 flex-col items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-primary">
            {number}
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/5 text-primary">
            {icon}
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
    </motion.article>
  );
}
