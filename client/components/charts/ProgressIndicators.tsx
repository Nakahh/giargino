import * as React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ProgressIndicator = {
  label: string;
  achieved: number;
  target: number;
  achievedLabel?: string;
  targetLabel?: string;
  accent: string;
  note?: string;
};

type ProgressIndicatorsProps = {
  className?: string;
  items?: ProgressIndicator[];
  title?: string;
  subtitle?: string;
};

const GIARDINO_COLORS = {
  navy: "#1F3B5E",
  green: "#2D5016",
  gold: "#F4C430",
  border: "rgba(31, 59, 94, 0.12)",
  grid: "rgba(31, 59, 94, 0.08)",
};

const DEFAULT_ITEMS: ProgressIndicator[] = [
  {
    label: "Meta de receita",
    achieved: 12_800_000,
    target: 15_000_000,
    achievedLabel: "Realizado",
    targetLabel: "Meta",
    accent: GIARDINO_COLORS.navy,
    note: "Acompanhamento do faturamento mensal",
  },
  {
    label: "Meta de ocupação",
    achieved: 84,
    target: 90,
    achievedLabel: "Realizado",
    targetLabel: "Meta",
    accent: GIARDINO_COLORS.green,
    note: "Ocupação estimada da operação",
  },
  {
    label: "Meta comercial",
    achieved: 67,
    target: 75,
    achievedLabel: "Realizado",
    targetLabel: "Meta",
    accent: GIARDINO_COLORS.gold,
    note: "Conversão do funil comercial",
  },
  {
    label: "Entrega no prazo",
    achieved: 93,
    target: 100,
    achievedLabel: "Realizado",
    targetLabel: "Meta",
    accent: "#6B7280",
    note: "Cumprimento do cronograma",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
  }).format(value);
}

function toPercent(achieved: number, target: number) {
  if (!target) return 0;
  return Math.min((achieved / target) * 100, 100);
}

function useAnimatedCounter(target: number, enabled: boolean) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [value, setValue] = React.useState(0);

  useMotionValueEvent(rounded, "change", setValue);

  React.useEffect(() => {
    const controls = animate(motionValue, target, {
      duration: enabled ? 1.5 : 0,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => controls.stop();
  }, [motionValue, target, enabled]);

  return value;
}

function ProgressBarCard({
  item,
  index,
  reduceMotion,
}: {
  item: ProgressIndicator;
  index: number;
  reduceMotion: boolean;
}) {
  const progress = toPercent(item.achieved, item.target);
  const animatedPercent = useAnimatedCounter(progress, !reduceMotion);

  const isCurrency = item.achieved >= 1000 || item.target >= 1000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.6,
        delay: 0.08 + index * 0.08,
      }}
      className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_18px_60px_rgba(31,59,94,0.10)] backdrop-blur-xl"
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,59,94,0.05),transparent_35%),radial-gradient(circle_at_top_right,rgba(244,196,48,0.12),transparent_38%)]" />

      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
              {item.label}
            </div>
            <div className="mt-2 text-3xl font-bold tracking-tight text-[#1F3B5E]">
              {animatedPercent}%
            </div>
          </div>

          <span
            className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full shadow-[0_0_0_6px_rgba(244,196,48,0.08)]"
            style={{ backgroundColor: item.accent }}
          />
        </div>

        <div className="grid gap-2 text-sm">
          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">{item.targetLabel ?? "Meta"}</span>
            <span className="font-semibold text-[#1F3B5E]">
              {isCurrency ? formatCurrency(item.target) : `${formatNumber(item.target)}%`}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">{item.achievedLabel ?? "Realizado"}</span>
            <span className="font-semibold text-[#2D5016]">
              {isCurrency ? formatCurrency(item.achieved) : `${formatNumber(item.achieved)}%`}
            </span>
          </div>
        </div>

        <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-[rgba(31,59,94,0.08)]">
          <motion.div
            initial={{ width: "0%" }}
            whileInView={{ width: `${progress}%` }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduceMotion ? 0 : 1.5,
              delay: 0.08 + index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full rounded-full"
            style={{
              backgroundImage: `linear-gradient(90deg, ${item.accent} 0%, ${GIARDINO_COLORS.gold} 100%)`,
              boxShadow: `0 0 12px rgba(244,196,48,0.16)`,
            }}
          />
        </div>

        <p className="mt-3 text-sm leading-6 text-slate-600">
          {item.note ?? "Meta acompanhada com refinamento visual e leitura objetiva."}
        </p>
      </div>
    </motion.div>
  );
}

export function ProgressIndicators({
  className,
  items = DEFAULT_ITEMS,
  title = "Progress Indicators",
  subtitle = "Meta vs realizado com barras em gradiente, contador animado e entrada stagger de 1.5s.",
}: ProgressIndicatorsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("grid gap-6", className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduceMotion ? 0 : 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_18px_70px_rgba(31,59,94,0.12)] backdrop-blur-xl md:p-7"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,196,48,0.12),transparent_35%),linear-gradient(180deg,rgba(31,59,94,0.04),transparent_28%)]" />

        <div className="relative z-10 mb-5 flex flex-col gap-2 md:mb-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1F3B5E]/15 bg-white/65 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1F3B5E]/75 shadow-sm backdrop-blur">
            Performance
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#1F3B5E] md:text-3xl">
            {title}
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-[15px]">
            {subtitle}
          </p>
        </div>

        <div className="relative z-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item, index) => (
            <ProgressBarCard
              key={item.label}
              item={item}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
