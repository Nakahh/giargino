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
        "rounded-xl p-6 shadow-md border border-gray-200 transition-all hover:shadow-lg",
        bgColor
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">
            {typeof value === "number" ? formatCurrency(value) : value}
          </h3>
          {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
          {trend && (
            <div className={cn("text-xs font-semibold mt-2", trend.isPositive ? "text-green-600" : "text-red-600")}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        {Icon && <Icon className={cn("w-10 h-10", iconColor)} strokeWidth={1.5} />}
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
