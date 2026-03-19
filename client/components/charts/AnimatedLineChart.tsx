import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Area,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";
import { cn } from "@/lib/utils";

type RevenuePoint = {
  month: string;
  revenue: number;
};

type AnimatedLineChartProps = {
  className?: string;
  data?: RevenuePoint[];
  title?: string;
  subtitle?: string;
};

const GIARDINO_COLORS = {
  navy: "#1F3B5E",
  green: "#2D5016",
  gold: "#F4C430",
  border: "rgba(31, 59, 94, 0.12)",
  grid: "rgba(31, 59, 94, 0.08)",
  glass: "rgba(255, 255, 255, 0.72)",
};

const DEFAULT_DATA: RevenuePoint[] = [
  { month: "Jan", revenue: 420000 },
  { month: "Fev", revenue: 515000 },
  { month: "Mar", revenue: 610000 },
  { month: "Abr", revenue: 725000 },
  { month: "Mai", revenue: 840000 },
  { month: "Jun", revenue: 910000 },
  { month: "Jul", revenue: 980000 },
  { month: "Ago", revenue: 1080000 },
  { month: "Set", revenue: 1175000 },
  { month: "Out", revenue: 1265000 },
  { month: "Nov", revenue: 1360000 },
  { month: "Dez", revenue: 1485000 },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  const abs = Math.abs(value);

  if (abs >= 1_000_000_000) return `R$ ${(value / 1_000_000_000).toFixed(1)}B`;
  if (abs >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `R$ ${(value / 1_000).toFixed(0)}K`;

  return formatCurrency(value);
}

function GlassTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  const value = Number(payload[0]?.value ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border border-white/30 bg-white/80 px-4 py-3 shadow-2xl backdrop-blur-xl"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.72) 100%)",
        boxShadow:
          "0 12px 40px rgba(31, 59, 94, 0.14), inset 0 1px 0 rgba(255,255,255,0.7)",
      }}
    >
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1F3B5E]/70">
        Receita mensal
      </div>
      <div className="text-sm font-semibold text-[#1F3B5E]">{label}</div>
      <div className="mt-1 text-lg font-bold text-[#2D5016]">
        {formatCurrency(value)}
      </div>
    </motion.div>
  );
}

export function AnimatedLineChart({
  className,
  data = DEFAULT_DATA,
  title = "Receita em 12 meses",
  subtitle = "Evolução de faturamento com entrada suave, área sutil e linguagem visual premium.",
}: AnimatedLineChartProps) {
  const reduceMotion = useReducedMotion();

  const totals = React.useMemo(() => {
    const total = data.reduce((sum, item) => sum + item.revenue, 0);
    const peak = Math.max(...data.map((item) => item.revenue));
    const average = total / Math.max(data.length, 1);

    return { total, peak, average };
  }, [data]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("grid gap-6 xl:grid-cols-[1.55fr_0.85fr]", className)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: reduceMotion ? 0 : 0.8,
          delay: 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_18px_70px_rgba(31,59,94,0.12)] backdrop-blur-xl md:p-7"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,196,48,0.12),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(31,59,94,0.08),transparent_40%)]" />
        <div className="relative z-10 mb-5 flex flex-col gap-2 md:mb-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F4C430]/20 bg-white/65 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1F3B5E]/75 shadow-sm backdrop-blur">
            Dados Giardino
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#1F3B5E] md:text-3xl">
            {title}
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-[15px]">
            {subtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: 0.1,
          }}
          className="relative z-10 h-[320px] w-full md:h-[390px]"
          style={{ transformOrigin: "left center" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 16, right: 10, left: -14, bottom: 6 }}
            >
              <defs>
                <linearGradient id="giardinoLineStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={GIARDINO_COLORS.navy} />
                  <stop offset="100%" stopColor={GIARDINO_COLORS.gold} />
                </linearGradient>

                <linearGradient id="giardinoAreaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="8%"
                    stopColor={GIARDINO_COLORS.navy}
                    stopOpacity={0.24}
                  />
                  <stop
                    offset="60%"
                    stopColor={GIARDINO_COLORS.gold}
                    stopOpacity={0.08}
                  />
                  <stop offset="100%" stopColor={GIARDINO_COLORS.gold} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="4 8"
                stroke={GIARDINO_COLORS.grid}
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={12}
                tick={{
                  fill: "rgba(31, 59, 94, 0.72)",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                width={72}
                tickFormatter={formatCompactCurrency}
                tick={{
                  fill: "rgba(31, 59, 94, 0.62)",
                  fontSize: 11,
                  fontWeight: 500,
                }}
              />

              <Tooltip content={<GlassTooltip />} cursor={{ stroke: "rgba(244,196,48,0.35)", strokeWidth: 1 }} />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="transparent"
                fill="url(#giardinoAreaFill)"
                isAnimationActive={!reduceMotion}
                animationDuration={1500}
                animationEasing="ease-out"
              />

              <Line
                type="monotone"
                dataKey="revenue"
                name="Receita"
                stroke="url(#giardinoLineStroke)"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={false}
                activeDot={{
                  r: 7,
                  fill: GIARDINO_COLORS.gold,
                  stroke: "#ffffff",
                  strokeWidth: 2,
                }}
                isAnimationActive={!reduceMotion}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      <motion.aside
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          duration: reduceMotion ? 0 : 0.7,
          delay: 0.1,
        }}
        className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_18px_70px_rgba(31,59,94,0.12)] backdrop-blur-xl md:p-7"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,59,94,0.06),transparent_36%),radial-gradient(circle_at_top,rgba(244,196,48,0.12),transparent_42%)]" />

        <div className="relative z-10">
          <div className="mb-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2D5016]">
              Leitura rápida
            </div>
            <h4 className="mt-2 text-xl font-semibold tracking-tight text-[#1F3B5E]">
              Performance premium
            </h4>
          </div>

          <div className="grid gap-3">
            {[
              {
                label: "Receita acumulada",
                value: formatCurrency(totals.total),
                accent: GIARDINO_COLORS.navy,
              },
              {
                label: "Pico mensal",
                value: formatCurrency(totals.peak),
                accent: GIARDINO_COLORS.green,
              },
              {
                label: "Média mensal",
                value: formatCurrency(totals.average),
                accent: GIARDINO_COLORS.gold,
              },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: 0.15 + index * 0.08,
                }}
                className="rounded-2xl border border-white/50 bg-white/70 p-4 shadow-sm backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {item.label}
                    </div>
                    <div className="mt-2 text-lg font-bold text-[#1F3B5E]">
                      {item.value}
                    </div>
                  </div>

                  <span
                    className="mt-1 h-3 w-3 rounded-full shadow-[0_0_0_6px_rgba(244,196,48,0.08)]"
                    style={{ backgroundColor: item.accent }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.35 }}
            className="mt-4 rounded-2xl border border-[#F4C430]/20 bg-gradient-to-br from-white/80 to-white/55 p-4 backdrop-blur-md"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1F3B5E]/70">
              Insight
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A linha foi desenhada para crescer com ritmo elegante, reforçando a
              narrativa de solidez financeira e sofisticação visual.
            </p>
          </motion.div>
        </div>
      </motion.aside>
    </motion.section>
  );
}
