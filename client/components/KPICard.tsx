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
}

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  bgColor = "bg-gradient-to-br from-blue-50 to-blue-100",
  iconColor = "text-blue-600",
}: KPICardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-6 shadow-lg border-2 border-transparent transition-all hover:shadow-xl hover:scale-105 relative overflow-hidden",
        bgColor
      )}
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(244,196,48,0.05) 0%, rgba(255,255,255,0) 100%)"
      }}
    >
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-10 rounded-full"
           style={{ backgroundColor: "#F4C430", transform: "translate(50%, -50%)" }}></div>

      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight break-words">
            {typeof value === "number" ? formatCurrency(value) : value}
          </h3>
          {subtitle && <p className="text-xs text-gray-500 font-medium">{subtitle}</p>}
          {trend && (
            <div className={cn("text-sm font-bold mt-3 flex items-center gap-1", trend.isPositive ? "text-green-600" : "text-red-600")}>
              {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value).toFixed(1)}%
            </div>
          )}
        </div>
        {Icon && <Icon className={cn("w-12 h-12 flex-shrink-0 ml-4", iconColor)} strokeWidth={1.5} />}
      </div>
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
