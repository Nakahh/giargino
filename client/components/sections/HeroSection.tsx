"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, BarChart3, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroAction = {
  label: string;
  action: () => void;
};

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaPrimary?: HeroAction;
  ctaSecondary?: HeroAction;
  backgroundColor?: string;
  accentColor?: string;
}

const DEFAULT_TITLE = "Gestão de Patrimônio Premium";
const DEFAULT_SUBTITLE =
  "Acompanhe patrimônio, risco e oportunidades em uma leitura visual precisa, sofisticada e direta.";

const DEFAULT_PRIMARY: HeroAction = {
  label: "Explorar dashboard",
  action: () => {},
};

const DEFAULT_SECONDARY: HeroAction = {
  label: "Ver visão executiva",
  action: () => {},
};

const NAVY = "#1F3B5E";
const SOFT_PANEL = "rgba(255, 255, 255, 0.55)";

export default function HeroSection({
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  ctaPrimary = DEFAULT_PRIMARY,
  ctaSecondary = DEFAULT_SECONDARY,
  backgroundColor = "#F8FAFC",
  accentColor = "#F4C430",
}: HeroSectionProps) {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -28]
  );

  const glowLeftY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : -42]
  );

  const glowRightY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 34]
  );

  const visualY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, shouldReduceMotion ? 0 : 20]
  );

  return (
    <motion.section
      ref={ref}
      aria-labelledby="hero-title"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "relative isolate overflow-hidden rounded-[2rem] border border-white/40",
        "min-h-[300px] md:min-h-[420px] xl:min-h-[480px]",
        "shadow-[0_24px_80px_rgba(15,23,42,0.12)]"
      )}
      style={{ backgroundColor }}
    >
      {/* Premium background layers */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.75)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(244,196,48,0.16),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(31,59,94,0.16),transparent_26%),radial-gradient(circle_at_50%_100%,rgba(45,80,22,0.08),transparent_32%)]" />

        <motion.div
          className="absolute -left-24 top-10 h-64 w-64 rounded-full blur-3xl"
          style={{
            y: glowLeftY,
            background: `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`,
          }}
        />
        <motion.div
          className="absolute -right-20 bottom-0 h-72 w-72 rounded-full blur-3xl"
          style={{
            y: glowRightY,
            background:
              "radial-gradient(circle, rgba(31,59,94,0.14) 0%, transparent 72%)",
          }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-8 sm:px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-12 lg:py-10">
        {/* Copy */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/50 px-3 py-1 backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" style={{ color: accentColor }} />
            <span className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-slate-600">
              Inteligência patrimonial
            </span>
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-[12ch] text-[2.4rem] font-bold leading-[0.92] tracking-[-0.04em] text-slate-900 sm:text-[3.25rem] lg:text-[4rem]"
          >
            {title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="mt-5 max-w-xl text-[1rem] font-normal leading-8 text-slate-600 sm:text-[1.125rem] lg:text-[1.25rem]"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.6,
              type: "spring",
              stiffness: 220,
              damping: 20,
            }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.button
              type="button"
              onClick={ctaPrimary.action}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      scale: 1.02,
                      boxShadow:
                        "0 18px 40px rgba(31,59,94,0.18), 0 0 0 1px rgba(244,196,48,0.18)",
                    }
              }
              whileTap={{ scale: 0.98 }}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3",
                "text-sm font-semibold text-white outline-none",
                "shadow-[0_10px_30px_rgba(31,59,94,0.18)]",
                "transition-transform will-change-transform",
                "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              )}
              style={{
                backgroundImage: `linear-gradient(135deg, ${NAVY} 0%, ${accentColor} 100%)`,
              }}
            >
              {ctaPrimary.label}
              <ArrowRight className="h-4 w-4" />
            </motion.button>

            <button
              type="button"
              onClick={ctaSecondary.action}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-2 py-3",
                "text-sm font-medium text-slate-700 transition-colors",
                "hover:text-slate-950"
              )}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
              {ctaSecondary.label}
            </button>
          </motion.div>

          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/45 px-3 py-2 backdrop-blur-sm">
              <ShieldCheck className="h-4 w-4" style={{ color: accentColor }} />
              <span>Leitura executiva em tempo real</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/45 px-3 py-2 backdrop-blur-sm">
              <BarChart3 className="h-4 w-4" style={{ color: accentColor }} />
              <span>Dados organizados com narrativa visual</span>
            </div>
          </div>
        </div>

        {/* Visual / chart placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          style={{ y: visualY }}
          className="relative"
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-[28px] border border-white/50 p-4 sm:p-5",
              "bg-white/55 shadow-[0_18px_60px_rgba(15,23,42,0.12)] backdrop-blur-xl"
            )}
            style={{ background: SOFT_PANEL }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.45)_0%,transparent_42%),radial-gradient(circle_at_top_right,rgba(244,196,48,0.18),transparent_24%)]" />

            <div className="relative z-10">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.26em] text-slate-500">
                    Visual principal
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Espaço reservado para gráfico ou imagem
                  </p>
                </div>

                <div
                  className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-3 py-1.5 text-xs font-medium text-slate-600"
                  style={{
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
                  }}
                >
                  <Sparkles className="h-3.5 w-3.5" style={{ color: accentColor }} />
                  Premium
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/60 bg-white/55 p-3 backdrop-blur-sm">
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-slate-500">
                    Patrimônio
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    R$ 18,4M
                  </p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "68%",
                        backgroundImage: `linear-gradient(90deg, ${NAVY} 0%, ${accentColor} 100%)`,
                      }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/60 bg-white/55 p-3 backdrop-blur-sm">
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-slate-500">
                    Liquidez
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    84%
                  </p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "84%",
                        backgroundImage: `linear-gradient(90deg, ${accentColor} 0%, ${NAVY} 100%)`,
                      }}
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/60 bg-white/55 p-3 backdrop-blur-sm">
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-slate-500">
                    Projeção
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    +12,5%
                  </p>
                  <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: "76%",
                        backgroundImage: `linear-gradient(90deg, ${NAVY} 0%, ${accentColor} 100%)`,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[24px] border border-slate-900/5 bg-slate-950/92 p-4 text-white shadow-[0_12px_40px_rgba(15,23,42,0.18)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.24em] text-white/55">
                      Curva de performance
                    </p>
                    <p className="mt-1 text-sm font-medium text-white/90">
                      Estrutura pronta para gráfico, área ou imagem
                    </p>
                  </div>
                  <div
                    className="rounded-full px-3 py-1 text-[0.7rem] font-medium"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: accentColor,
                    }}
                  >
                    Atualizado agora
                  </div>
                </div>

                <div className="mt-5 flex h-28 items-end gap-2">
                  {[36, 56, 44, 76, 58, 92, 68].map((height, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scaleY: 0.8 }}
                      animate={{ opacity: 1, scaleY: 1 }}
                      transition={{
                        duration: 0.45,
                        delay: 0.65 + index * 0.05,
                        ease: "easeOut",
                      }}
                      className="flex-1 origin-bottom rounded-t-lg"
                      style={{
                        height: `${height}%`,
                        backgroundImage: `linear-gradient(180deg, rgba(255,255,255,0.95) 0%, ${accentColor} 100%)`,
                        boxShadow: "0 10px 30px rgba(244,196,48,0.12)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
