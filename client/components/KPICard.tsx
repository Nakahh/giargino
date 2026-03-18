import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  bgColor?: string;
  iconColor?: string;
  accentColor?: string;
}

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  bgColor = "bg-white",
  iconColor = "text-amber-600",
  accentColor = "border-amber-400",
}: KPICardProps) {
  return (
    <div
      className={cn(
        "rounded-lg p-8 shadow-lg border-l-4 transition-all duration-300 hover:shadow-2xl hover:scale-105 transform",
        bgColor,
        accentColor
      )}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">{title}</p>
        </div>
        {Icon && <Icon className={cn("w-8 h-8 opacity-70", iconColor)} strokeWidth={1.5} />}
      </div>

      <div className="space-y-2">
        <h3 className="text-4xl font-bold text-slate-900 font-serif">
          {typeof value === "number" ? formatCurrency(value) : value}
        </h3>
        {subtitle && <p className="text-sm text-slate-600 font-medium">{subtitle}</p>}
      </div>

      {trend && (
        <div className={cn("text-sm font-bold mt-4 pt-4 border-t border-slate-100 flex items-center gap-2", trend.isPositive ? "text-emerald-600" : "text-red-600")}>
          <span className="text-lg">{trend.isPositive ? "↑" : "↓"}</span>
          <span>{Math.abs(trend.value)}% vs mês anterior</span>
        </div>
      )}
    </div>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
