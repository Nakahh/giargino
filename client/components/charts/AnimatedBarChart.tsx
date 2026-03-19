import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";
import { cn } from "@/lib/utils";

type MonthlyBarPoint = {
  month: string;
  receita: number;
  custos: number;
  lucro: number;
};

type AnimatedBarChartProps = {
  className?: string;
  data?: MonthlyBarPoint[];
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

const DEFAULT_DATA: MonthlyBarPoint[] = [
  { month: "Jan", receita: 820000, custos: 410000, lucro: 410000 },
  { month: "Fev", receita: 870000, custos: 430000, lucro: 440000 },
  { month: "Mar", receita: 920000, custos: 445000, lucro: 475000 },
  { month: "Abr", receita: 995000, custos: 460000, lucro: 535000 },
  { month: "Mai", receita: 1065000, custos: 490000, lucro: 575000 },
  { month: "Jun", receita: 1135000, custos: 515000, lucro: 620000 },
  { month: "Jul", receita: 1190000, custos: 520000, lucro: 670000 },
  { month: "Ago", receita: 1260000, custos: 545000, lucro: 715000 },
  { month: "Set", receita: 1320000, custos: 570000, lucro: 750000 },
  { month: "Out", receita: 1385000, custos: 600000, lucro: 785000 },
  { month: "Nov", receita: 1450000, custos: 620000, lucro: 830000 },
  { month: "Dez", receita: 1520000, custos: 650000, lucro: 870000 },
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

  const items = payload.filter((entry) => entry.value !== undefined);

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
        Comparativo mensal
      </div>
      <div className="text-sm font-semibold text-[#1F3B5E]">{label}</div>

      <div className="mt-3 grid gap-2">
        {items.map((item) => (
          <div key={String(item.dataKey)} className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: String(item.color ?? GIARDINO_COLORS.navy) }}
              />
              <span className="text-xs text-slate-600">{item.name}</span>
            </div>
            <span className="text-sm font-bold text-[#2D5016]">
              {formatCurrency(Number(item.value ?? 0))}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function AnimatedBarChart({
  className,
  data = DEFAULT_DATA,
  title = "Comparativo mensal",
  subtitle = "Receita, custos e lucro com barras arredondadas, stagger de entrada e foco por série no hover.",
}: AnimatedBarChartProps) {
  const reduceMotion = useReducedMotion();
  const [activeSeries, setActiveSeries] = React.useState<
    "receita" | "custos" | "lucro" | null
  >(null);

  const series = React.useMemo(
    () => [
      {
        key: "receita" as const,
        label: "Receita",
        color: GIARDINO_COLORS.navy,
        gradientId: "giardinoBarReceita",
        animationBegin: 0,
      },
      {
        key: "custos" as const,
        label: "Custos",
        color: GIARDINO_COLORS.green,
        gradientId: "giardinoBarCustos",
        animationBegin: 250,
      },
      {
        key: "lucro" as const,
        label: "Lucro",
        color: GIARDINO_COLORS.gold,
        gradientId: "giardinoBarLucro",
        animationBegin: 500,
      },
    ],
    [],
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("grid gap-6 xl:grid-cols-[1.45fr_0.95fr]", className)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.05 }}
        className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_18px_70px_rgba(31,59,94,0.12)] backdrop-blur-xl md:p-7"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(31,59,94,0.08),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(244,196,48,0.1),transparent_36%)]" />

        <div className="relative z-10 mb-5 flex flex-col gap-2 md:mb-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#1F3B5E]/15 bg-white/65 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1F3B5E]/75 shadow-sm backdrop-blur">
            Dashboard premium
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#1F3B5E] md:text-3xl">
            {title}
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-[15px]">
            {subtitle}
          </p>
        </div>

        <div className="relative z-10 mb-4 flex flex-wrap gap-2">
          {series.map((item) => (
            <button
              key={item.key}
              type="button"
              onMouseEnter={() => setActiveSeries(item.key)}
              onMouseLeave={() => setActiveSeries(null)}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.1 }}
          className="relative z-10 h-[340px] w-full md:h-[420px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 16, right: 8, left: -12, bottom: 6 }}
              barCategoryGap="22%"
            >
              <defs>
                <linearGradient id="giardinoBarReceita" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GIARDINO_COLORS.navy} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={GIARDINO_COLORS.navy} stopOpacity={0.58} />
                </linearGradient>

                <linearGradient id="giardinoBarCustos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GIARDINO_COLORS.green} stopOpacity={0.95} />
                  <stop offset="100%" stopColor={GIARDINO_COLORS.green} stopOpacity={0.58} />
                </linearGradient>

                <linearGradient id="giardinoBarLucro" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={GIARDINO_COLORS.gold} stopOpacity={0.98} />
                  <stop offset="100%" stopColor={GIARDINO_COLORS.gold} stopOpacity={0.62} />
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

              <Tooltip content={<GlassTooltip />} cursor={{ fill: "rgba(244,196,48,0.08)" }} />

              {series.map((item) => (
                <Bar
                  key={item.key}
                  dataKey={item.key}
                  name={item.label}
                  fill={`url(#${item.gradientId})`}
                  radius={[14, 14, 14, 14]}
                  barSize={18}
                  opacity={activeSeries && activeSeries !== item.key ? 0.32 : 1}
                  onMouseEnter={() => setActiveSeries(item.key)}
                  onMouseLeave={() => setActiveSeries(null)}
                  isAnimationActive={!reduceMotion}
                  animationDuration={1000}
                  animationBegin={item.animationBegin}
                  animationEasing="ease-out"
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      <motion.aside
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.1 }}
        className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_18px_70px_rgba(31,59,94,0.12)] backdrop-blur-xl md:p-7"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,196,48,0.08),transparent_30%),radial-gradient(circle_at_top,rgba(31,59,94,0.08),transparent_42%)]" />

        <div className="relative z-10">
          <div className="mb-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2D5016]">
              Série em destaque
            </div>
            <h4 className="mt-2 text-xl font-semibold tracking-tight text-[#1F3B5E]">
              Hover com foco suave
            </h4>
          </div>

          <div className="grid gap-3">
            {[
              {
                label: "Receita",
                value: formatCurrency(data[data.length - 1]?.receita ?? 0),
                accent: GIARDINO_COLORS.navy,
                note: "Base operacional",
              },
              {
                label: "Custos",
                value: formatCurrency(data[data.length - 1]?.custos ?? 0),
                accent: GIARDINO_COLORS.green,
                note: "Controle e eficiência",
              },
              {
                label: "Lucro",
                value: formatCurrency(data[data.length - 1]?.lucro ?? 0),
                accent: GIARDINO_COLORS.gold,
                note: "Resultado líquido",
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
                  <div className="min-w-0">
                    <div className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {item.label}
                    </div>
                    <div className="mt-2 text-lg font-bold text-[#1F3B5E]">
                      {item.value}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">{item.note}</div>
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
              Direção de arte
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A série ativa ganha protagonismo no hover, mantendo a leitura limpa e a
              composição sofisticada mesmo em telas menores.
            </p>
          </motion.div>
        </div>
      </motion.aside>
    </motion.section>
  );
}
