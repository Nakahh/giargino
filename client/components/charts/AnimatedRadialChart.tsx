import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import type { TooltipProps } from "recharts";
import { cn } from "@/lib/utils";

type RadialItem = {
  name: string;
  value: number;
  color: string;
  description?: string;
};

type AnimatedRadialChartProps = {
  className?: string;
  data?: RadialItem[];
  title?: string;
  subtitle?: string;
};

const GIARDINO_COLORS = {
  navy: "#1F3B5E",
  green: "#2D5016",
  gold: "#F4C430",
  border: "rgba(31, 59, 94, 0.12)",
  glass: "rgba(255, 255, 255, 0.72)",
};

const DEFAULT_DATA: RadialItem[] = [
  {
    name: "Receita recorrente",
    value: 38,
    color: GIARDINO_COLORS.navy,
    description: "Contratos estáveis e previsíveis",
  },
  {
    name: "Operações",
    value: 27,
    color: GIARDINO_COLORS.green,
    description: "Custos e manutenção otimizada",
  },
  {
    name: "Expansão",
    value: 20,
    color: GIARDINO_COLORS.gold,
    description: "Projetos em fase de crescimento",
  },
  {
    name: "Reserva estratégica",
    value: 15,
    color: "#6B7280",
    description: "Base de segurança financeira",
  },
];

function formatPercent(value: number) {
  return `${value.toFixed(0)}%`;
}

function formatCurrencyLike(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function GlassTooltip({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;

  const entry = payload[0]?.payload as RadialItem | undefined;
  const percent = (payload[0]?.percent ?? 0) * 100;

  if (!entry) return null;

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
      <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1F3B5E]/70">
        Distribuição radial
      </div>
      <div className="mt-1 text-sm font-semibold text-[#1F3B5E]">{entry.name}</div>
      <div className="mt-2 flex items-center justify-between gap-6">
        <div className="text-lg font-bold text-[#2D5016]">
          {formatPercent(percent)}
        </div>
        <div className="text-sm font-medium text-slate-600">
          {formatCurrencyLike(entry.value)}
        </div>
      </div>
    </motion.div>
  );
}

export function AnimatedRadialChart({
  className,
  data = DEFAULT_DATA,
  title = "Distribuição radial",
  subtitle = "Donut premium com setores em sequência, tooltip percentual e legenda lateral refinada.",
}: AnimatedRadialChartProps) {
  const reduceMotion = useReducedMotion();

  const total = React.useMemo(
    () => data.reduce((sum, item) => sum + item.value, 0),
    [data],
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
      className={cn("grid gap-6 xl:grid-cols-[1.25fr_0.85fr]", className)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.985 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduceMotion ? 0 : 0.8, delay: 0.05 }}
        className="relative overflow-hidden rounded-3xl border border-white/50 bg-white/70 p-5 shadow-[0_18px_70px_rgba(31,59,94,0.12)] backdrop-blur-xl md:p-7"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,196,48,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(31,59,94,0.08),transparent_36%)]" />

        <div className="relative z-10 mb-5 flex flex-col gap-2 md:mb-6">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#F4C430]/20 bg-white/65 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#1F3B5E]/75 shadow-sm backdrop-blur">
            Leitura setorial
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-[#1F3B5E] md:text-3xl">
            {title}
          </h3>
          <p className="max-w-2xl text-sm leading-6 text-slate-600 md:text-[15px]">
            {subtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.1 }}
          className="relative z-10 h-[320px] w-full md:h-[390px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<GlassTooltip />} />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={82}
                outerRadius={128}
                paddingAngle={4}
                startAngle={90}
                endAngle={-270}
                cornerRadius={14}
                stroke="rgba(255,255,255,0.9)"
                strokeWidth={2}
                isAnimationActive={!reduceMotion}
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-out"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
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
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,59,94,0.05),transparent_32%),radial-gradient(circle_at_top_left,rgba(244,196,48,0.1),transparent_40%)]" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#2D5016]">
              Legenda lateral
            </div>
            <h4 className="mt-2 text-xl font-semibold tracking-tight text-[#1F3B5E]">
              Mix total: {formatCurrencyLike(total)}
            </h4>
          </div>

          <ul className="grid gap-3">
            {data.map((item, index) => {
              const percent = (item.value / Math.max(total, 1)) * 100;

              return (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.55,
                    delay: 0.12 + index * 0.08,
                  }}
                  className="rounded-2xl border border-white/50 bg-white/70 p-4 shadow-sm backdrop-blur-md"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full shadow-[0_0_0_6px_rgba(244,196,48,0.08)]"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold text-[#1F3B5E]">
                            {item.name}
                          </div>
                          <div className="mt-1 text-xs leading-5 text-slate-500">
                            {item.description}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-bold text-[#2D5016]">
                            {formatPercent(percent)}
                          </div>
                          <div className="text-xs text-slate-500">
                            {formatCurrencyLike(item.value)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, delay: 0.35 }}
            className="mt-4 rounded-2xl border border-[#F4C430]/20 bg-gradient-to-br from-white/80 to-white/55 p-4 backdrop-blur-md"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1F3B5E]/70">
              Direção visual
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              O donut mantém o centro vazio para reforçar leveza e destacar a leitura
              dos setores com foco em percentual.
            </p>
          </motion.div>
        </div>
      </motion.aside>
    </motion.section>
  );
}
