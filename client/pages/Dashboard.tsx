import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { KPICard } from "@/components/KPICard";
import { SimplePDFExport } from "@/components/SimplePDFExport";
import { ProjectGallery } from "@/components/ProjectGallery";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { PremiumHeader } from "@/components/PremiumHeader";
import { PremiumKPICard } from "@/components/PremiumKPICard";
import { PremiumGallery } from "@/components/PremiumGallery";
import { giardino } from "@shared/giardino-data";
import { useScrollSync } from "@/hooks/use-scroll-sync";
import { useAutoScroll } from "@/hooks/use-auto-scroll";
import { useMobileGestures } from "@/hooks/use-mobile-gestures";
import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import {
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Home,
  ShoppingCart,
  Zap,
  Flower,
  Leaf,
  Crown,
} from "lucide-react";

// Paleta de cores GIARDINO - Baseado na Logo Oficial
const GIARDINO_COLORS = {
  primary: "#1F3B5E",      // Azul Marinho da Logo (Crown)
  accent: "#F4C430",       // Amarelo/Ouro das Flores
  secondary: "#2D5016",    // Verde das Folhas
  gold: "#F4C430",         // Ouro/Dourado (Flores)
  text: "#374151",         // Cinza Escuro para textos (legível)
  light: "#FFFFFF",        // Branco Puro
};

const CHART_COLORS = [
  "#1F3B5E", // Azul marinho (Logo)
  "#2D5016", // Verde (Logo)
  "#F4C430", // Amarelo/Ouro (Logo)
  "#8B5CF6", // Roxo
  "#EC4899", // Rosa
  "#06B6D4", // Ciano
  "#6366F1", // Índigo
  "#10B981", // Verde esmeralda
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "revenue" | "costs" | "hr" | "viability" | "project"
  >("overview");

  // Refs para cada seção de aba
  const sectionRefs = useRef({
    overview: null as HTMLDivElement | null,
    revenue: null as HTMLDivElement | null,
    costs: null as HTMLDivElement | null,
    hr: null as HTMLDivElement | null,
    viability: null as HTMLDivElement | null,
    project: null as HTMLDivElement | null,
  });

  // ============================================
  // NOVOS HOOKS - FASE 1
  // ============================================

  // useScrollSync: detecta qual seção está visível durante scroll
  const { visibleSection } = useScrollSync({
    threshold: 0.3,
    rootMargin: "-50px 0px -50% 0px",
    onSectionChange: (sectionId) => {
      setActiveTab(sectionId);
    },
  });

  // useAutoScroll: fornece função para fazer scroll automático
  const { scrollToSection, scrollToActiveTab } = useAutoScroll({
    scrollBehavior: "smooth",
    offset: 0,
  });

  // useMobileGestures: detecta swipe left/right no mobile
  useMobileGestures({
    threshold: 50,
    currentSection: activeTab,
    onSwipeLeft: (nextSection) => {
      setActiveTab(nextSection);
      scrollToSection(nextSection);
    },
    onSwipeRight: (prevSection) => {
      setActiveTab(prevSection);
      scrollToSection(prevSection);
    },
  });

  // useKeyboardNavigation: detecta navegação por teclado
  useKeyboardNavigation({
    currentSection: activeTab,
    onNavigate: (nextSection) => {
      setActiveTab(nextSection);
      scrollToSection(nextSection);
    },
  });

  // Dados de receitas mensais
  const revenueData = [
    {
      name: "Residencial Senior",
      value: giardino.monthlyRevenue.residentialSenior.monthlyTotal,
      fill: CHART_COLORS[0],
    },
    {
      name: "Clube Life Style",
      value: giardino.monthlyRevenue.lifeStyleClubMembership.monthlyTotal,
      fill: CHART_COLORS[1],
    },
    {
      name: "Shopping/Mall",
      value: giardino.monthlyRevenue.shoppingMall.monthlyTotal,
      fill: CHART_COLORS[2],
    },
    {
      name: "Consumação",
      value: giardino.monthlyRevenue.consumption.monthlyTotal,
      fill: CHART_COLORS[3],
    },
  ];

  // Dados de custos
  const costData = [
    {
      name: "Recursos Humanos",
      value: giardino.hrCosts.housekeeping.monthlyTotal +
        giardino.hrCosts.culinary.monthlyTotal +
        giardino.hrCosts.laundry.monthlyTotal +
        giardino.hrCosts.cleaning.monthlyTotal +
        giardino.hrCosts.maintenance.monthlyTotal +
        giardino.hrCosts.beauty.monthlyTotal +
        giardino.hrCosts.reception.monthlyTotal +
        giardino.hrCosts.security.monthlyTotal +
        giardino.hrCosts.healthcare.monthlyTotal +
        giardino.hrCosts.administrative.monthlyTotal,
      fill: CHART_COLORS[4],
    },
    {
      name: "Custos Operacionais",
      value: giardino.residentialCosts.hosting.monthlyTotal +
        giardino.residentialCosts.meals.monthlyTotal +
        giardino.residentialCosts.sportsRecreation.monthlyTotal +
        giardino.residentialCosts.medicalCare.monthlyTotal +
        giardino.residentialCosts.therapies.monthlyTotal +
        giardino.residentialCosts.personalCare.monthlyTotal,
      fill: CHART_COLORS[1],
    },
    {
      name: "Financiamento",
      value: giardino.financing.monthlyPayment,
      fill: CHART_COLORS[5],
    },
    {
      name: "Juros do Financiamento",
      value: 500_000,
      fill: CHART_COLORS[3],
    },
  ];

  // Dados de fluxo de caixa projetado (12 meses)
  const monthlyOperatingCosts = giardino.summary.monthlyAnalysis.hrCosts + giardino.summary.monthlyAnalysis.residentialOperatingCosts;
  const monthlyFinancingCosts = giardino.summary.monthlyAnalysis.financingPayment + giardino.summary.monthlyAnalysis.estimatedMonthlyInterest;
  const totalMonthlyCosts = monthlyOperatingCosts + monthlyFinancingCosts;

  const cashFlowData = Array.from({ length: 12 }).map((_, i) => ({
    month: `Mês ${i + 1}`,
    receita: giardino.totalMonthlyRevenue,
    custos: totalMonthlyCosts,
    lucro: giardino.totalMonthlyRevenue - totalMonthlyCosts,
  }));

  // Dados de distribuição de vendas iniciais
  const salesDistribution = [
    {
      name: "Residencial Senior",
      value: giardino.sales.residentialSenior.total,
    },
    { name: "Time Share", value: giardino.sales.timeShare.total },
    { name: "Clube Life Style", value: giardino.sales.lifeStyleClub.total },
    { name: "Loteamento", value: giardino.sales.subdivision.total },
    { name: "Shopping/Mall", value: giardino.sales.mall.total },
  ];

  // Dados de RH por departamento
  const hrData = [
    {
      department: "Camareiras",
      count: 24,
      salary: 1_800,
      total: 43_200,
    },
    {
      department: "Cozinha",
      count: 26,
      salary: 1_800,
      total: 46_800,
    },
    {
      department: "Lavanderia",
      count: 10,
      salary: 1_800,
      total: 18_000,
    },
    {
      department: "Limpeza",
      count: 10,
      salary: 1_800,
      total: 18_000,
    },
    {
      department: "Manutenção",
      count: 8,
      salary: 2_200,
      total: 17_600,
    },
    {
      department: "Beleza",
      count: 5,
      salary: 2_000,
      total: 10_000,
    },
    {
      department: "Recepção",
      count: 6,
      salary: 1_800,
      total: 10_800,
    },
    {
      department: "Segurança",
      count: 12,
      salary: 1_800,
      total: 21_600,
    },
    {
      department: "Saúde",
      count: 8,
      salary: 3_000,
      total: 24_000,
    },
    {
      department: "Administrativo",
      count: 6,
      salary: 2_500,
      total: 15_000,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: GIARDINO_COLORS.light }}>
      {/* Header Premium com Logo - Mobile Optimized */}
      <PremiumHeader
        title="GIARDINO"
        subtitle="RESIDENCIAL SÊNIOR"
        description="Modelo de Investimento Premium"
        backgroundColor="#2C3E50"
        accentColor={GIARDINO_COLORS.accent}
        lightColor={GIARDINO_COLORS.light}
      >
        <SimplePDFExport />
      </PremiumHeader>


      {/* Content - Mobile Optimized */}
      <div id="dashboard-content" className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth bg-gradient-to-br from-slate-50 via-white to-slate-50 w-full">
        <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 md:px-6 py-4 md:py-8">
        {/* TAB: OVERVIEW - ALWAYS RENDERED */}
        <div
          id="tab-overview"
          data-section="overview"
          ref={(el) => {
            if (el) sectionRefs.current.overview = el;
          }}
          className="space-y-6 md:space-y-8 fade-in slide-in-up py-4 md:py-8"
        >
            {/* KPI Cards Luxury Premium - Mobile Optimized */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {/* Card 1: Receita Mensal */}
              <div
                className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
                style={{
                  backgroundColor: GIARDINO_COLORS.light,
                  borderLeftColor: GIARDINO_COLORS.primary
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: GIARDINO_COLORS.secondary }}>
                      RECEITA MENSAL
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.primary, wordWrap: "break-word" }}>
                      {formatCurrency(giardino.totalMonthlyRevenue)}
                    </h3>
                    <p className="text-xs text-gray-500">Faturamento/mês</p>
                  </div>
                  <DollarSign className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.primary }} />
                </div>
              </div>

              {/* Card 2: Total de Vendas */}
              <div
                className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
                style={{
                  backgroundColor: GIARDINO_COLORS.light,
                  borderLeftColor: GIARDINO_COLORS.secondary
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: GIARDINO_COLORS.primary }}>
                      TOTAL VENDAS
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.secondary, wordWrap: "break-word" }}>
                      {formatCurrency(giardino.totalSales)}
                    </h3>
                    <p className="text-xs text-gray-500">Capital inicial</p>
                  </div>
                  <ShoppingCart className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.secondary }} />
                </div>
              </div>

              {/* Card 3: Custos Mensais */}
              <div
                className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
                style={{
                  backgroundColor: GIARDINO_COLORS.light,
                  borderLeftColor: GIARDINO_COLORS.gold
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-bold mb-2 text-gray-600 tracking-wide">
                      CUSTOS MENSAIS
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.gold, wordWrap: "break-word" }}>
                      {formatCurrency(giardino.summary.monthlyAnalysis.hrCosts + giardino.summary.monthlyAnalysis.residentialOperatingCosts)}
                    </h3>
                    <p className="text-xs text-gray-500">RH + Operacional</p>
                  </div>
                  <Zap className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.gold }} />
                </div>
              </div>

              {/* Card 4: Lucro Líquido */}
              <div
                className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
                style={{
                  backgroundColor: GIARDINO_COLORS.light,
                  borderLeftColor: GIARDINO_COLORS.accent
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm sm:text-base font-bold mb-2 text-gray-600 tracking-wide">
                      LUCRO LÍQUIDO
                    </p>
                    <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.accent, wordWrap: "break-word" }}>
                      {formatCurrency(giardino.viability.monthlyNetProfit)}
                    </h3>
                    <p className="text-xs text-gray-500">Mensal (aprox.)</p>
                  </div>
                  <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.accent }} />
                </div>
              </div>
            </div>

            {/* Charts - Mobile Optimized */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {/* Distribuição de Receitas Mensais */}
              <div
                className="rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-t-4"
                style={{
                  backgroundColor: GIARDINO_COLORS.light,
                  borderTopColor: GIARDINO_COLORS.primary
                }}
              >
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: GIARDINO_COLORS.primary }}>
                    📊 Distribuição de Receitas
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">Contribuição de cada segmento na receita bruta mensal</p>
                </div>
                <ResponsiveContainer width="100%" height={380}>
                  <PieChart>
                    <Pie
                      data={revenueData}
                      cx="50%"
                      cy="40%"
                      labelLine={false}
                      label={({ name, value }) =>
                        `${name}: ${formatCurrency(value)}`
                      }
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "2px solid #1F3B5E",
                        borderRadius: "8px",
                        padding: "8px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                      }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: "12px", fontSize: "13px" }}
                      verticalAlign="bottom"
                      height={30}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Distribuição de Vendas Iniciais */}
              <div
                className="rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-t-4"
                style={{
                  backgroundColor: GIARDINO_COLORS.light,
                  borderTopColor: GIARDINO_COLORS.secondary
                }}
              >
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: GIARDINO_COLORS.secondary }}>
                    💰 Distribuição de Vendas
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">Capital distribuído por segmento</p>
                </div>
                <ResponsiveContainer width="100%" height={380}>
                  <PieChart>
                    <Pie
                      data={salesDistribution}
                      cx="50%"
                      cy="40%"
                      labelLine={false}
                      label={({ name, value }) =>
                        `${name}: ${formatCurrency(value)}`
                      }
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {salesDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "2px solid #2D5016",
                        borderRadius: "8px",
                        padding: "8px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                      }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: "12px", fontSize: "13px" }}
                      verticalAlign="bottom"
                      height={30}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Fluxo de Caixa Projetado */}
              <div
                className="rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-t-4 lg:col-span-2"
                style={{
                  backgroundColor: GIARDINO_COLORS.light,
                  borderTopColor: GIARDINO_COLORS.gold
                }}
              >
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: GIARDINO_COLORS.gold }}>
                    📈 Fluxo de Caixa Projetado (12 Meses)
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">Receita, custos e lucro mensal estimado</p>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "2px solid #F4C430",
                        borderRadius: "8px",
                        padding: "8px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="receita" stroke={CHART_COLORS[0]} strokeWidth={2} />
                    <Line type="monotone" dataKey="custos" stroke={CHART_COLORS[4]} strokeWidth={2} />
                    <Line type="monotone" dataKey="lucro" stroke={CHART_COLORS[2]} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        {/* TAB: REVENUE - ALWAYS RENDERED */}
        <div
          id="tab-revenue"
          data-section="revenue"
          ref={(el) => {
            if (el) sectionRefs.current.revenue = el;
          }}
          className="space-y-6 md:space-y-8 fade-in slide-in-up py-4 md:py-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Revenue Card 1 */}
            <div
              className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeftColor: GIARDINO_COLORS.primary
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: GIARDINO_COLORS.primary }}>
                    RESIDENCIAL SENIOR
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.primary, wordWrap: "break-word" }}>
                    {formatCurrency(giardino.monthlyRevenue.residentialSenior.monthlyTotal)}
                  </h3>
                  <p className="text-xs text-gray-500">/mês</p>
                </div>
                <Home className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.primary }} />
              </div>
            </div>

            {/* Revenue Card 2 */}
            <div
              className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeftColor: GIARDINO_COLORS.secondary
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: GIARDINO_COLORS.secondary }}>
                    SHOPPING/MALL
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.secondary, wordWrap: "break-word" }}>
                    {formatCurrency(giardino.monthlyRevenue.shoppingMall.monthlyTotal)}
                  </h3>
                  <p className="text-xs text-gray-500">/mês</p>
                </div>
                <ShoppingCart className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.secondary }} />
              </div>
            </div>

            {/* Revenue Card 3 */}
            <div
              className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeftColor: GIARDINO_COLORS.gold
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold mb-2 text-gray-600 tracking-wide">
                    CLUBE LIFE STYLE
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.gold, wordWrap: "break-word" }}>
                    {formatCurrency(giardino.monthlyRevenue.lifeStyleClubMembership.monthlyTotal)}
                  </h3>
                  <p className="text-xs text-gray-500">/mês</p>
                </div>
                <Flower className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.gold }} />
              </div>
            </div>

            {/* Revenue Card 4 - Consumação */}
            <div
              className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeftColor: GIARDINO_COLORS.accent
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: GIARDINO_COLORS.accent }}>
                    CONSUMAÇÃO
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.accent, wordWrap: "break-word" }}>
                    {formatCurrency(giardino.monthlyRevenue.consumption.monthlyTotal)}
                  </h3>
                  <p className="text-xs text-gray-500">/mês</p>
                </div>
                <ShoppingCart className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.accent }} />
              </div>
            </div>
          </div>

          {/* Revenue Table */}
          <div
            className="rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-t-4"
            style={{
              backgroundColor: GIARDINO_COLORS.light,
              borderTopColor: GIARDINO_COLORS.primary
            }}
          >
            <div className="mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: GIARDINO_COLORS.primary }}>
                Detalhamento de Receitas
              </h2>
              <p className="text-sm sm:text-base text-gray-600">Análise detalhada de todas as fontes de receita</p>
            </div>
            <ResponsiveTable
              data={[
                { segment: "Residencial Senior", monthly: giardino.monthlyRevenue.residentialSenior.monthlyTotal, annual: giardino.monthlyRevenue.residentialSenior.monthlyTotal * 12 },
                { segment: "Clube Life Style", monthly: giardino.monthlyRevenue.lifeStyleClubMembership.monthlyTotal, annual: giardino.monthlyRevenue.lifeStyleClubMembership.monthlyTotal * 12 },
                { segment: "Shopping/Mall", monthly: giardino.monthlyRevenue.shoppingMall.monthlyTotal, annual: giardino.monthlyRevenue.shoppingMall.monthlyTotal * 12 },
                { segment: "Consumação", monthly: giardino.monthlyRevenue.consumption.monthlyTotal, annual: giardino.monthlyRevenue.consumption.monthlyTotal * 12 },
              ]}
              columns={[
                { key: "segment", label: "Segmento", render: (v) => v },
                { key: "monthly", label: "Mensal", render: (v) => formatCurrency(v) },
                { key: "annual", label: "Anual", render: (v) => formatCurrency(v) },
              ]}
              headerTextColor={GIARDINO_COLORS.primary}
            />
          </div>
        </div>

        {/* TAB: COSTS - ALWAYS RENDERED */}
        <div
          id="tab-costs"
          data-section="costs"
          ref={(el) => {
            if (el) sectionRefs.current.costs = el;
          }}
          className="space-y-6 md:space-y-8 fade-in slide-in-up py-4 md:py-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {/* Cost Card 1 */}
            <div
              className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeftColor: GIARDINO_COLORS.gold
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: GIARDINO_COLORS.gold }}>
                    RH MENSAL
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.gold, wordWrap: "break-word" }}>
                    {formatCurrency(
                      giardino.hrCosts.housekeeping.monthlyTotal +
                      giardino.hrCosts.culinary.monthlyTotal +
                      giardino.hrCosts.laundry.monthlyTotal +
                      giardino.hrCosts.cleaning.monthlyTotal +
                      giardino.hrCosts.maintenance.monthlyTotal +
                      giardino.hrCosts.beauty.monthlyTotal +
                      giardino.hrCosts.reception.monthlyTotal +
                      giardino.hrCosts.security.monthlyTotal +
                      giardino.hrCosts.healthcare.monthlyTotal +
                      giardino.hrCosts.administrative.monthlyTotal
                    )}
                  </h3>
                  <p className="text-xs text-gray-500">Folha de pagamento</p>
                </div>
                <Users className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.gold }} />
              </div>
            </div>

            {/* Cost Card 2 */}
            <div
              className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeftColor: GIARDINO_COLORS.secondary
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: GIARDINO_COLORS.secondary }}>
                    OPERACIONAL
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.secondary, wordWrap: "break-word" }}>
                    {formatCurrency(
                      giardino.residentialCosts.hosting.monthlyTotal +
                      giardino.residentialCosts.meals.monthlyTotal +
                      giardino.residentialCosts.sportsRecreation.monthlyTotal +
                      giardino.residentialCosts.medicalCare.monthlyTotal +
                      giardino.residentialCosts.therapies.monthlyTotal +
                      giardino.residentialCosts.personalCare.monthlyTotal
                    )}
                  </h3>
                  <p className="text-xs text-gray-500">Serviços + Insumos</p>
                </div>
                <BarChart3 className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.secondary }} />
              </div>
            </div>

            {/* Cost Card 3 */}
            <div
              className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeftColor: GIARDINO_COLORS.accent
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold mb-2 text-gray-600 tracking-wide">
                    FINANCIAMENTO
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.accent, wordWrap: "break-word" }}>
                    {formatCurrency(giardino.financing.monthlyPayment)}
                  </h3>
                  <p className="text-xs text-gray-500">Parcela mensal</p>
                </div>
                <DollarSign className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.accent }} />
              </div>
            </div>

            {/* Cost Card 4 */}
            <div
              className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeftColor: GIARDINO_COLORS.primary
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: GIARDINO_COLORS.primary }}>
                    JUROS
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.primary, wordWrap: "break-word" }}>
                    {formatCurrency(500_000)}
                  </h3>
                  <p className="text-xs text-gray-500">Juros do financiamento</p>
                </div>
                <Zap className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.primary }} />
              </div>
            </div>
          </div>

          {/* Costs Breakdown Chart */}
          <div
            className="rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-t-4"
            style={{
              backgroundColor: GIARDINO_COLORS.light,
              borderTopColor: GIARDINO_COLORS.gold
            }}
          >
            <div className="mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: GIARDINO_COLORS.gold }}>
                Breakdown de Custos Operacionais
              </h2>
              <p className="text-sm sm:text-base text-gray-600">Distribuição dos custos principais</p>
            </div>
            <ResponsiveContainer width="100%" height={380}>
              <PieChart>
                <Pie
                  data={costData}
                  cx="50%"
                  cy="40%"
                  labelLine={false}
                  label={({ name, value }) =>
                    `${name}: ${formatCurrency(value)}`
                  }
                  outerRadius={90}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {costData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid #F4C430",
                    borderRadius: "8px",
                    padding: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "12px", fontSize: "13px" }}
                  verticalAlign="bottom"
                  height={30}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TAB: HR - ALWAYS RENDERED */}
        <div
          id="tab-hr"
          data-section="hr"
          ref={(el) => {
            if (el) sectionRefs.current.hr = el;
          }}
          className="space-y-6 md:space-y-8 fade-in slide-in-up py-4 md:py-8"
        >
          {/* HR Table */}
          <div
            className="rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-t-4"
            style={{
              backgroundColor: GIARDINO_COLORS.light,
              borderTopColor: GIARDINO_COLORS.secondary
            }}
          >
            <div className="mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: GIARDINO_COLORS.secondary }}>
                👥 Estrutura de Recursos Humanos
              </h2>
              <p className="text-sm sm:text-base text-gray-600">Distribuição de pessoal por departamento</p>
            </div>
            <ResponsiveTable
              data={hrData}
              columns={[
                { key: "department", label: "Departamento", render: (v) => v },
                { key: "count", label: "Quantidade", render: (v) => v },
                { key: "salary", label: "Salário/pessoa", render: (v) => formatCurrency(v) },
                { key: "total", label: "Total/mês", render: (v) => formatCurrency(v) },
              ]}
              headerTextColor={GIARDINO_COLORS.secondary}
            />
          </div>
        </div>

        {/* TAB: VIABILITY - ALWAYS RENDERED */}
        <div
          id="tab-viability"
          data-section="viability"
          ref={(el) => {
            if (el) sectionRefs.current.viability = el;
          }}
          className="space-y-6 md:space-y-8 fade-in slide-in-up py-4 md:py-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {/* Viability Card 1 */}
            <div
              className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeftColor: GIARDINO_COLORS.primary
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: GIARDINO_COLORS.primary }}>
                    ROI ANUAL
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.primary, wordWrap: "break-word" }}>
                    <span style={{ fontSize: "2rem" }}>
                      28%
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500">Retorno sobre investimento</p>
                </div>
                <TrendingUp className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.primary }} />
              </div>
            </div>

            {/* Viability Card 2 */}
            <div
              className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeftColor: GIARDINO_COLORS.secondary
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold mb-2 tracking-wide" style={{ color: GIARDINO_COLORS.secondary }}>
                    PAYBACK
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.secondary, wordWrap: "break-word" }}>
                    <span style={{ fontSize: "2rem" }}>
                      3.5
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500">Anos (período de retorno)</p>
                </div>
                <Leaf className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.secondary }} />
              </div>
            </div>

            {/* Viability Card 3 */}
            <div
              className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeftColor: GIARDINO_COLORS.gold
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold mb-2 text-gray-600 tracking-wide">
                    VPL 10 ANOS
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.gold, wordWrap: "break-word" }}>
                    {formatCurrency(150_000_000 + 100_000_000)}
                  </h3>
                  <p className="text-xs text-gray-500">Valor presente líquido</p>
                </div>
                <Crown className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.gold }} />
              </div>
            </div>

            {/* Viability Card 4 */}
            <div
              className="rounded-xl p-5 sm:p-6 md:p-7 shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 group hover:scale-105 cursor-pointer fade-in gradient-card hover-lift"
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeftColor: GIARDINO_COLORS.accent
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base font-bold mb-2 text-gray-600 tracking-wide">
                    TIR
                  </p>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: GIARDINO_COLORS.accent, wordWrap: "break-word" }}>
                    <span style={{ fontSize: "2rem" }}>
                      18%
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500">Taxa interna de retorno</p>
                </div>
                <Zap className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" style={{ color: GIARDINO_COLORS.accent }} />
              </div>
            </div>
          </div>

          {/* Key Indicators */}
          <div
            className="rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-t-4"
            style={{
              backgroundColor: GIARDINO_COLORS.light,
              borderTopColor: GIARDINO_COLORS.primary
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: GIARDINO_COLORS.primary }}>
              Indicadores Chave
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-600">
                <p className="text-sm sm:text-base font-semibold mb-2" style={{ color: GIARDINO_COLORS.primary }}>
                  Margem Operacional
                </p>
                <p className="text-2xl sm:text-3xl font-bold" style={{ color: GIARDINO_COLORS.primary }}>
                  35%
                </p>
                <p className="text-amber-600 text-xs mt-1">
                  Da receita bruta
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-l-4 border-green-600">
                <p className="text-sm sm:text-base font-semibold mb-2" style={{ color: GIARDINO_COLORS.secondary }}>
                  Crescimento Anual Esperado
                </p>
                <p className="text-2xl sm:text-3xl font-bold" style={{ color: GIARDINO_COLORS.secondary }}>
                  2% a.a.
                </p>
                <p className="text-green-600 text-xs mt-1">
                  Conservador e realista
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border-l-4 border-amber-600">
                <p className="text-sm sm:text-base font-semibold mb-2" style={{ color: GIARDINO_COLORS.gold }}>
                  Break-even
                </p>
                <p className="text-2xl sm:text-3xl font-bold" style={{ color: GIARDINO_COLORS.gold }}>
                  Mês 12
                </p>
                <p className="text-amber-600 text-xs mt-1">
                  Ao ano (financiamento)
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-600">
                <p className="text-sm sm:text-base font-semibold mb-2" style={{ color: "#8B5CF6" }}>
                  Risco Estimado
                </p>
                <p className="text-2xl sm:text-3xl font-bold" style={{ color: "#8B5CF6" }}>
                  Médio
                </p>
                <p className="text-purple-600 text-xs mt-1">
                  Mercado estável e demanda garantida
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-600 mt-4 italic">
              * Projeção com crescimento conservador de 2% a.a. e inflação de 3% a.a. nos custos. ROI calculado com base no investimento inicial de R$ 100M.
            </p>
          </div>

          {/* Financial Projection 10 Years */}
          <div
            className="rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-t-4"
            style={{
              backgroundColor: GIARDINO_COLORS.light,
              borderTopColor: GIARDINO_COLORS.secondary
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: GIARDINO_COLORS.secondary }}>
              Projeção Financeira 10 Anos
            </h2>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={cashFlowData}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={CHART_COLORS[0]} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS[2]} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={CHART_COLORS[2]} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "2px solid #2D5016",
                    borderRadius: "8px",
                    padding: "8px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                  }}
                />
                <Area type="monotone" dataKey="receita" stroke={CHART_COLORS[0]} fillOpacity={1} fill="url(#colorReceita)" />
                <Area type="monotone" dataKey="lucro" stroke={CHART_COLORS[2]} fillOpacity={1} fill="url(#colorLucro)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TAB: PROJECT - ALWAYS RENDERED */}
        <div
          id="tab-project"
          data-section="project"
          ref={(el) => {
            if (el) sectionRefs.current.project = el;
          }}
          className="space-y-6 md:space-y-8 fade-in slide-in-up py-4 md:py-8"
        >
          {/* Project Overview */}
          <div
            className="rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-t-4"
            style={{
              backgroundColor: GIARDINO_COLORS.light,
              borderTopColor: GIARDINO_COLORS.primary
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: GIARDINO_COLORS.primary }}>
              📍 Visão Geral do Projeto
            </h2>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Localização Estratégica</h3>
                <p className="text-gray-700">
                  Mogi das Cruzes, São Paulo — Acesso direto à Via Dutra, próximo ao eixo administrativo da região.
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="text-xl font-bold text-green-900 mb-2">Área Total</h3>
                <p className="text-gray-700">
                  258.900 m² — Espaço amplo para residencial, clube, loteamento e centro comercial.
                </p>
              </div>

              <div className="border-l-4 border-amber-600 pl-4">
                <h3 className="text-xl font-bold text-amber-900 mb-2">Fases de Desenvolvimento</h3>
                <ul className="text-gray-700 space-y-2">
                  <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Fase 1: Infraestrutura</h4>
                      <p>Preparação de terreno, acesso, utilidades (água, energia, gás, internet)</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Fase 2: Construção Residencial</h4>
                      <p>
                        Edifícios de Residencial Senior + Clube Life Style
                        <br />
                        • 6 parcelas: R$ 20.000.000/ano
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">Fase 3: Operação Integral</h4>
                      <p>
                        Gestão de Residencial Senior, Clube Life Style, Loteamento e Centro Comercial (shopping)
                        <br />
                        • Pagamento mensal: R$ 1.000.000 + juros
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Revenue Model */}
          <div
            className="rounded-xl shadow-lg p-4 sm:p-6 md:p-8 border-t-4"
            style={{
              backgroundColor: GIARDINO_COLORS.light,
              borderTopColor: GIARDINO_COLORS.gold
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: GIARDINO_COLORS.gold }}>
              💼 Modelo de Receitas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Revenue Stream 1 */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-600">
                <h3 className="text-lg font-bold text-blue-900 mb-2">Residencial Senior</h3>
                <p className="text-gray-700 mb-2">Aluguel mensal + serviços</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(giardino.monthlyRevenue.residentialSenior.monthlyTotal)}
                </p>
                <span className="text-xs text-blue-600">/mês</span>
              </div>

              {/* Revenue Stream 2 */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg border-l-4 border-amber-600">
                <h3 className="text-lg font-bold text-amber-900 mb-2">Clube Life Style</h3>
                <p className="text-gray-700 mb-2">Mensalidade de 6.000 membros</p>
                <p className="text-2xl font-bold text-amber-600">
                  {formatCurrency(giardino.monthlyRevenue.lifeStyleClubMembership.monthlyTotal)}
                </p>
                <span className="text-xs text-amber-600">/mês</span>
              </div>

              {/* Revenue Stream 3 */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-600">
                <h3 className="text-lg font-bold text-purple-900 mb-2">Shopping/Mall</h3>
                <p className="text-gray-700 mb-2">Aluguel de 250 lojas</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(giardino.monthlyRevenue.shoppingMall.monthlyTotal)}
                </p>
                <span className="text-xs text-purple-600">/mês</span>
              </div>

              {/* Revenue Stream 4 */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg border-l-4 border-pink-600">
                <h3 className="text-lg font-bold text-pink-900 mb-2">Consumação</h3>
                <p className="text-gray-700 mb-2">Bares, restaurantes e eventos</p>
                <p className="text-2xl font-bold text-pink-600">
                  {formatCurrency(giardino.monthlyRevenue.consumption.monthlyTotal)}
                </p>
                <span className="text-xs text-pink-600">/mês</span>
              </div>

              {/* Total Revenue */}
              <div className="p-4 sm:p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border-l-4 border-red-600 md:col-span-2">
                <h3 className="text-lg font-bold text-red-900 mb-2">Receita Total</h3>
                <p className="text-3xl font-bold text-red-600">
                  {formatCurrency(giardino.totalMonthlyRevenue)}
                </p>
                <span className="text-xs text-red-600">/mês</span>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className="mt-16">
            <ProjectGallery />
          </div>
        </div>
        </div>
      </div>

      {/* Footer Premium */}
      <div
        className="w-full py-12 mt-20 text-center"
        style={{ backgroundColor: GIARDINO_COLORS.primary }}
      >
        <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 md:px-6">
          <p
            className="text-lg font-bold mb-2"
            style={{ color: GIARDINO_COLORS.accent }}
          >
            🌿 GIARDINO — INVESTIMENTO PREMIUM 🌿
          </p>
          <p className="mb-2" style={{ color: `${GIARDINO_COLORS.light}cc` }}>
            Modelo de Investimento Residencial Senior + Clube Life Style
          </p>
          <p className="text-sm" style={{ color: `${GIARDINO_COLORS.light}aa` }}>
            © 2024 — Mogi das Cruzes, São Paulo | Área Total: 258.900 m²
          </p>
          <p className="text-xs mt-4" style={{ color: `${GIARDINO_COLORS.light}88` }}>
            Documento de Apresentação de Investimento — Confidencial
          </p>
        </div>
      </div>

    </div>
  );
}
