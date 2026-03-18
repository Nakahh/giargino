import { useState } from "react";
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
import { DashboardHeader } from "@/components/DashboardHeader";
import { giardino } from "@shared/giardino-data";
import {
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Home,
  ShoppingCart,
  Zap,
  TrendingDown,
  Activity,
  PieChart as PieChartIcon,
} from "lucide-react";

const COLORS = [
  "#D4A574", // warm sand/tan
  "#8B7355", // rich brown
  "#C9B896", // soft taupe
  "#9B8B7A", // muted brown
  "#A68560", // warm tan
  "#7A6F64", // deep brown
  "#C4A576", // golden tan
  "#917D6D", // cool brown
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

  // Dados de receitas mensais
  const revenueData = [
    {
      name: "Residencial Senior",
      value: giardino.monthlyRevenue.residentialSenior.monthlyTotal,
      fill: COLORS[0],
    },
    {
      name: "Hospedagem",
      value: giardino.monthlyRevenue.hospitality.monthlyTotal,
      fill: COLORS[1],
    },
    {
      name: "Clube Life Style",
      value: giardino.monthlyRevenue.lifeStyleClubMembership.monthlyTotal,
      fill: COLORS[2],
    },
    {
      name: "Bares/Restaurantes",
      value: giardino.monthlyRevenue.barsRestaurantShops.monthlyTotal,
      fill: COLORS[3],
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
      fill: COLORS[4],
    },
    {
      name: "Custos Operacionais",
      value: giardino.residentialCosts.hosting.monthlyTotal +
        giardino.residentialCosts.meals.monthlyTotal +
        giardino.residentialCosts.sportsRecreation.monthlyTotal +
        giardino.residentialCosts.medicalCare.monthlyTotal +
        giardino.residentialCosts.therapies.monthlyTotal +
        giardino.residentialCosts.personalCare.monthlyTotal,
      fill: COLORS[5],
    },
    {
      name: "Financiamento",
      value: giardino.financing.monthlyPayment,
      fill: COLORS[6],
    },
    {
      name: "Juros",
      value: 500_000, // aprox
      fill: COLORS[7],
    },
  ];

  // Dados de fluxo de caixa projetado (12 meses)
  const cashFlowData = Array.from({ length: 12 }).map((_, i) => ({
    month: `Mês ${i + 1}`,
    receita: giardino.totalMonthlyRevenue,
    custos:
      469_000 + 4_320_000 + giardino.financing.monthlyPayment + 500_000,
    lucro:
      giardino.totalMonthlyRevenue -
      (469_000 + 4_320_000 + giardino.financing.monthlyPayment + 500_000),
  }));

  // Dados de distribuição de receitas iniciais
  const salesDistribution = [
    {
      name: "Residencial Senior",
      value: giardino.sales.residentialSenior.total,
    },
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
      count: 10,
      salary: 1_800,
      total: 18_000,
    },
    {
      department: "Beleza",
      count: 36,
      salary: 1_800,
      total: 64_800,
    },
    {
      department: "Recepção",
      count: 10,
      salary: 1_800,
      total: 18_000,
    },
    {
      department: "Segurança",
      count: 24,
      salary: 3_000,
      total: 72_000,
    },
    {
      department: "Saúde",
      count: 30,
      salary: 3_000,
      total: 90_000,
    },
    {
      department: "Administrativo",
      count: 18,
      salary: 5_000,
      total: 90_000,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-slate-50">
      {/* Premium Header */}
      <DashboardHeader />

      {/* Navigation Tabs - Premium Styling */}
      <div className="bg-white border-b-2 border-amber-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: "overview", label: "Visão Geral", icon: "📊" },
              { id: "revenue", label: "Receitas", icon: "💰" },
              { id: "costs", label: "Custos", icon: "📈" },
              { id: "hr", label: "Recursos Humanos", icon: "👥" },
              { id: "viability", label: "Viabilidade", icon: "🎯" },
              { id: "project", label: "Sobre o Projeto", icon: "🏢" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as
                      | "overview"
                      | "revenue"
                      | "costs"
                      | "hr"
                      | "viability"
                      | "project"
                  )
                }
                className={`px-6 py-4 font-semibold border-b-3 transition-all duration-300 whitespace-nowrap text-sm ${
                  activeTab === tab.id
                    ? "border-amber-500 text-amber-700 bg-amber-50"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* TAB: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-10">
            {/* KPI Cards Section with Premium Design */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 font-serif">Indicadores Principais (KPIs)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                  title="Receita Mensal Bruta"
                  value={giardino.totalMonthlyRevenue}
                  subtitle="Faturamento total"
                  icon={DollarSign}
                  bgColor="bg-white"
                  iconColor="text-amber-600"
                  accentColor="border-l-amber-500"
                />
                <KPICard
                  title="Total de Vendas Iniciais"
                  value={giardino.totalSales}
                  subtitle="Capital captado"
                  icon={ShoppingCart}
                  bgColor="bg-white"
                  iconColor="text-amber-600"
                  accentColor="border-l-amber-500"
                />
                <KPICard
                  title="Custos Mensais"
                  value={469_000 + 4_320_000}
                  subtitle="RH + Operacional"
                  icon={Zap}
                  bgColor="bg-white"
                  iconColor="text-amber-600"
                  accentColor="border-l-amber-500"
                />
                <KPICard
                  title="Lucro Líquido Estimado"
                  value={
                    giardino.totalMonthlyRevenue -
                    (469_000 + 4_320_000 + 1_000_000 + 500_000)
                  }
                  subtitle="Mensal (aprox)"
                  icon={TrendingUp}
                  bgColor="bg-white"
                  iconColor="text-emerald-600"
                  accentColor="border-l-emerald-500"
                  trend={{ value: 12, isPositive: true }}
                />
              </div>
            </div>

            {/* Charts Section - Premium Design */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Distribuição de Receitas Mensais */}
              <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                <div className="flex items-center gap-3 mb-6">
                  <PieChartIcon className="w-6 h-6 text-amber-600" />
                  <h2 className="text-xl font-bold text-slate-900 font-serif">
                    Distribuição de Receitas
                  </h2>
                </div>
                <p className="text-sm text-slate-600 mb-6">Composição mensal por segmento de receita</p>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                      outerRadius={90}
                      fill="#D4A574"
                      dataKey="value"
                    >
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "2px solid #D4A574",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Capital Inicial por Segmento */}
              <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-6 h-6 text-amber-600" />
                  <h2 className="text-xl font-bold text-slate-900 font-serif">
                    Capital Inicial por Segmento
                  </h2>
                </div>
                <p className="text-sm text-slate-600 mb-6">Distribuição de investimento inicial total</p>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="name"
                      stroke="#8b7355"
                      style={{ fontSize: "12px", fontWeight: "500" }}
                    />
                    <YAxis stroke="#8b7355" />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "2px solid #D4A574",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="value" fill="#D4A574" radius={[12, 12, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Fluxo de Caixa Projetado - 12 Meses */}
            <div className="bg-white rounded-lg shadow-lg p-8 border border-amber-100">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
                <h2 className="text-xl font-bold text-slate-900 font-serif">
                  Fluxo de Caixa Projetado - 12 Meses
                </h2>
              </div>
              <p className="text-sm text-slate-600 mb-6">Projeção de receita, custos e lucro mensal</p>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={cashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#8b7355" style={{ fontSize: "12px" }} />
                  <YAxis stroke="#8b7355" />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "2px solid #D4A574",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  <Area
                    type="monotone"
                    dataKey="receita"
                    stackId="1"
                    stroke="#8B7355"
                    fill="#C9B896"
                    name="Receita Total"
                    opacity={0.7}
                  />
                  <Area
                    type="monotone"
                    dataKey="custos"
                    stackId="2"
                    stroke="#A68560"
                    fill="#C4A576"
                    name="Custos Totais"
                    opacity={0.7}
                  />
                  <Area
                    type="monotone"
                    dataKey="lucro"
                    stackId="3"
                    stroke="#2d5016"
                    fill="#10B981"
                    name="Lucro Líquido"
                    opacity={0.7}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB: REVENUE */}
        {activeTab === "revenue" && (
          <div className="space-y-10">
            {/* Revenue Overview */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-lg shadow-lg p-8 border border-amber-100">
              <div className="flex items-center gap-3 mb-6">
                <DollarSign className="w-6 h-6 text-amber-600" />
                <h2 className="text-2xl font-bold text-slate-900 font-serif">
                  Análise Detalhada de Receitas
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Chart */}
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Receitas Mensais por Segmento
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#8b7355" style={{ fontSize: "12px", fontWeight: "500" }} />
                      <YAxis stroke="#8b7355" />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                        contentStyle={{ backgroundColor: "#fff", border: "2px solid #D4A574", borderRadius: "8px" }}
                      />
                      <Bar dataKey="value" fill="#D4A574" radius={[12, 12, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Summary Cards */}
                <div className="space-y-3">
                  {revenueData.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border-l-4 shadow hover:shadow-lg transition"
                      style={{ borderColor: item.fill }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                        <span className="font-semibold text-slate-700">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 text-lg">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg shadow-lg">
                    <span className="font-bold text-amber-900">Total Mensal</span>
                    <span className="font-bold text-amber-900 text-xl">{formatCurrency(giardino.totalMonthlyRevenue)}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Revenue Table */}
              <div className="overflow-x-auto mt-8">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100 border-b-2 border-amber-300">
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wide">Segmento</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-slate-900 uppercase tracking-wide">Unidades</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-slate-900 uppercase tracking-wide">Valor Unit.</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-slate-900 uppercase tracking-wide">Total Mensal</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-slate-900 uppercase tracking-wide">% do Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-amber-100 hover:bg-amber-50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900">Residencial Senior</td>
                      <td className="px-6 py-4 text-center text-slate-700">240 unidades</td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900">{formatCurrency(35_000)}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{formatCurrency(8_400_000)}</td>
                      <td className="px-6 py-4 text-right font-semibold text-emerald-600">61.2%</td>
                    </tr>
                    <tr className="border-b border-amber-100 hover:bg-amber-50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900">Hospedagem (All Inclusive)</td>
                      <td className="px-6 py-4 text-center text-slate-700">80 unidades</td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900">{formatCurrency(1_000)}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{formatCurrency(756_000)}</td>
                      <td className="px-6 py-4 text-right font-semibold text-blue-600">5.5%</td>
                    </tr>
                    <tr className="border-b border-amber-100 hover:bg-amber-50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900">Clube Life Style</td>
                      <td className="px-6 py-4 text-center text-slate-700">6.000 títulos</td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900">{formatCurrency(500)}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{formatCurrency(3_000_000)}</td>
                      <td className="px-6 py-4 text-right font-semibold text-purple-600">21.9%</td>
                    </tr>
                    <tr className="border-b-2 border-amber-300 hover:bg-amber-50 transition bg-amber-50">
                      <td className="px-6 py-4 font-bold text-slate-900">Bares/Restaurantes/Lojas</td>
                      <td className="px-6 py-4 text-center text-slate-700">~350 pessoas/dia</td>
                      <td className="px-6 py-4 text-right font-medium text-slate-900">{formatCurrency(150)}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{formatCurrency(1_575_000)}</td>
                      <td className="px-6 py-4 text-right font-semibold text-orange-600">11.5%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: COSTS */}
        {activeTab === "costs" && (
          <div className="space-y-10">
            <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg shadow-lg p-8 border border-orange-100">
              <div className="flex items-center gap-3 mb-6">
                <TrendingDown className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-bold text-slate-900 font-serif">
                  Análise de Custos Operacionais
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">
                    Distribuição de Custos
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={costData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) =>
                          `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={90}
                        fill="#A68560"
                        dataKey="value"
                      >
                        {costData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-3">
                  {costData.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border-l-4 shadow hover:shadow-lg transition"
                      style={{ borderColor: item.fill }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                        <span className="font-semibold text-slate-700">{item.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 text-lg">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg">
                    <span className="font-bold text-white">Total Mensal</span>
                    <span className="font-bold text-white text-xl">{formatCurrency(469_000 + 4_320_000 + 1_000_000 + 500_000)}</span>
                  </div>
                </div>
              </div>

              {/* Detailed Costs Table */}
              <div className="overflow-x-auto mt-8">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100 border-b-2 border-orange-300">
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wide">Categoria de Custo</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-slate-900 uppercase tracking-wide">Valor Mensal</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-slate-900 uppercase tracking-wide">% do Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-orange-100 hover:bg-orange-50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900">Recursos Humanos</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{formatCurrency(469_000)}</td>
                      <td className="px-6 py-4 text-right font-semibold text-blue-600">5.8%</td>
                    </tr>
                    <tr className="border-b border-orange-100 hover:bg-orange-50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900">Custos Operacionais Residenciais</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{formatCurrency(4_320_000)}</td>
                      <td className="px-6 py-4 text-right font-semibold text-blue-600">53.4%</td>
                    </tr>
                    <tr className="border-b border-orange-100 hover:bg-orange-50 transition">
                      <td className="px-6 py-4 font-medium text-slate-900">Pagamento Financiamento (CAPEX - 10 anos)</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{formatCurrency(1_000_000)}</td>
                      <td className="px-6 py-4 text-right font-semibold text-orange-600">12.3%</td>
                    </tr>
                    <tr className="border-b-2 border-orange-300 hover:bg-orange-50 transition bg-orange-50">
                      <td className="px-6 py-4 font-bold text-slate-900">Juros do Financiamento (~6% a.a.)</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{formatCurrency(500_000)}</td>
                      <td className="px-6 py-4 text-right font-semibold text-orange-600">6.2%</td>
                    </tr>
                    <tr className="bg-red-50">
                      <td className="px-6 py-4 font-bold text-red-900 text-lg">TOTAL CUSTOS MENSAIS</td>
                      <td className="px-6 py-4 text-right font-bold text-red-900 text-lg">{formatCurrency(469_000 + 4_320_000 + 1_000_000 + 500_000)}</td>
                      <td className="px-6 py-4 text-right font-bold text-red-900 text-lg">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: HR */}
        {activeTab === "hr" && (
          <div className="space-y-10">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg p-8 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-slate-900 font-serif">
                  Recursos Humanos - Estrutura Completa
                </h2>
              </div>

              <div className="mb-8 bg-white rounded-lg p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Distribuição por Departamento
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={hrData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="department"
                      stroke="#8b7355"
                      style={{ fontSize: "11px", fontWeight: "500" }}
                      angle={-45}
                      textAnchor="end"
                      height={120}
                    />
                    <YAxis stroke="#8b7355" />
                    <Tooltip contentStyle={{ backgroundColor: "#fff", border: "2px solid #D4A574", borderRadius: "8px" }} />
                    <Bar
                      dataKey="count"
                      fill="#D4A574"
                      name="Número de Funcionários"
                      radius={[12, 12, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* HR Table - Detailed */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100 border-b-2 border-blue-300">
                      <th className="px-6 py-4 text-left text-sm font-bold text-slate-900 uppercase tracking-wide">Departamento</th>
                      <th className="px-6 py-4 text-center text-sm font-bold text-slate-900 uppercase tracking-wide">Qtd.</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-slate-900 uppercase tracking-wide">Salário Unit.</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-slate-900 uppercase tracking-wide">Total Mensal</th>
                      <th className="px-6 py-4 text-right text-sm font-bold text-slate-900 uppercase tracking-wide">Total Anual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hrData.map((dept, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-blue-100 hover:bg-blue-50 transition"
                      >
                        <td className="px-6 py-4 font-semibold text-slate-900">{dept.department}</td>
                        <td className="px-6 py-4 text-center font-bold text-slate-900">{dept.count}</td>
                        <td className="px-6 py-4 text-right text-slate-700">{formatCurrency(dept.salary)}</td>
                        <td className="px-6 py-4 text-right font-bold text-slate-900">{formatCurrency(dept.total)}</td>
                        <td className="px-6 py-4 text-right font-bold text-blue-600">{formatCurrency(dept.total * 12)}</td>
                      </tr>
                    ))}
                    <tr className="bg-blue-100 border-t-2 border-blue-300">
                      <td className="px-6 py-4 font-bold text-blue-900">TOTAL</td>
                      <td className="px-6 py-4 text-center font-bold text-blue-900 text-lg">{hrData.reduce((sum, d) => sum + d.count, 0)}</td>
                      <td className="px-6 py-4"></td>
                      <td className="px-6 py-4 text-right font-bold text-blue-900 text-lg">{formatCurrency(hrData.reduce((sum, d) => sum + d.total, 0))}</td>
                      <td className="px-6 py-4 text-right font-bold text-blue-900 text-lg">{formatCurrency(hrData.reduce((sum, d) => sum + d.total, 0) * 12)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: VIABILITY */}
        {activeTab === "viability" && (
          <div className="space-y-10">
            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-lg shadow-lg p-8 border border-emerald-100">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
                <h2 className="text-2xl font-bold text-slate-900 font-serif">
                  Análise de Viabilidade Econômica
                </h2>
              </div>

              {/* Viability KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <KPICard
                  title="Lucro Mensal"
                  value={
                    giardino.totalMonthlyRevenue -
                    (469_000 + 4_320_000 + 1_000_000 + 500_000)
                  }
                  subtitle="Após custos operacionais"
                  icon={TrendingUp}
                  bgColor="bg-white"
                  iconColor="text-emerald-600"
                  accentColor="border-l-emerald-500"
                />
                <KPICard
                  title="Lucro Anual"
                  value={
                    (giardino.totalMonthlyRevenue -
                      (469_000 + 4_320_000 + 1_000_000 + 500_000)) *
                    12
                  }
                  subtitle="Projeção 12 meses"
                  icon={Activity}
                  bgColor="bg-white"
                  iconColor="text-emerald-600"
                  accentColor="border-l-emerald-500"
                />
                <KPICard
                  title="Taxa de Lucratividade"
                  value="71.6%"
                  subtitle="Margem operacional"
                  icon={BarChart3}
                  bgColor="bg-white"
                  iconColor="text-amber-600"
                  accentColor="border-l-amber-500"
                />
                <KPICard
                  title="Payback"
                  value="~13 meses"
                  subtitle="Retorno do investimento"
                  icon={Home}
                  bgColor="bg-white"
                  iconColor="text-amber-600"
                  accentColor="border-l-amber-500"
                />
              </div>

              {/* Análise Detalhada */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Fluxo Mensal */}
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">
                      Fluxo Financeiro Mensal
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                        <span className="text-blue-800 font-medium">
                          Receita Bruta
                        </span>
                        <span className="text-blue-900 font-bold text-lg">
                          {formatCurrency(giardino.totalMonthlyRevenue)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                        <span className="text-blue-800 font-medium">
                          RH + Operacional
                        </span>
                        <span className="text-red-600 font-bold">
                          -{formatCurrency(469_000 + 4_320_000)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-blue-200">
                        <span className="text-blue-800 font-medium">
                          Financiamento + Juros
                        </span>
                        <span className="text-red-600 font-bold">
                          -{formatCurrency(1_500_000)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-3 bg-green-100 px-3 py-2 rounded border border-green-300">
                        <span className="text-green-900 font-bold">
                          LUCRO LÍQUIDO
                        </span>
                        <span className="text-green-900 font-bold text-xl">
                          {formatCurrency(
                            giardino.totalMonthlyRevenue -
                              (469_000 + 4_320_000 + 1_500_000)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Investimento Inicial */}
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <h3 className="text-lg font-bold text-purple-900 mb-4">
                      Investimento Inicial
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-purple-200">
                        <span className="text-purple-800 font-medium">
                          Entrada (Proposta Dinho)
                        </span>
                        <span className="text-purple-900 font-bold">
                          {formatCurrency(30_000_000)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-purple-200">
                        <span className="text-purple-800 font-medium">
                          6 Parcelas anuais
                        </span>
                        <span className="text-purple-900 font-bold">
                          {formatCurrency(20_000_000)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-purple-200">
                        <span className="text-purple-800 font-medium">
                          Total a Pagar
                        </span>
                        <span className="text-purple-900 font-bold">
                          {formatCurrency(150_000_000)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-3 border-b border-purple-200">
                        <span className="text-purple-800 font-medium">
                          Financiamento
                        </span>
                        <span className="text-purple-900 font-bold">
                          {formatCurrency(100_000_000)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-3 bg-purple-200 px-3 py-2 rounded border border-purple-300">
                        <span className="text-purple-900 font-bold">
                          CAPEX TOTAL
                        </span>
                        <span className="text-purple-900 font-bold text-xl">
                          {formatCurrency(150_000_000 + 100_000_000)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Indicadores Chave */}
                <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                  <h3 className="text-lg font-bold text-amber-900 mb-4">
                    Indicadores Econômicos Principais
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded border border-amber-100">
                      <p className="text-amber-700 text-sm font-medium mb-1">
                        ROI Mensal
                      </p>
                      <p className="text-amber-900 font-bold text-2xl">7.44M</p>
                      <p className="text-amber-600 text-xs mt-1">
                        Retorno mensal
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-amber-100">
                      <p className="text-amber-700 text-sm font-medium mb-1">
                        ROI Anual
                      </p>
                      <p className="text-amber-900 font-bold text-2xl">89.2M</p>
                      <p className="text-amber-600 text-xs mt-1">
                        Retorno anual
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-amber-100">
                      <p className="text-amber-700 text-sm font-medium mb-1">
                        Payback
                      </p>
                      <p className="text-amber-900 font-bold text-2xl">~13m</p>
                      <p className="text-amber-600 text-xs mt-1">
                        Meses até recuperar
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-amber-100">
                      <p className="text-amber-700 text-sm font-medium mb-1">
                        Margem Líquida
                      </p>
                      <p className="text-amber-900 font-bold text-2xl">71.6%</p>
                      <p className="text-amber-600 text-xs mt-1">
                        Lucratividade
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-amber-100">
                      <p className="text-amber-700 text-sm font-medium mb-1">
                        Break-Even
                      </p>
                      <p className="text-amber-900 font-bold text-2xl">~11m</p>
                      <p className="text-amber-600 text-xs mt-1">
                        Ponto de equilíbrio
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded border border-amber-100">
                      <p className="text-amber-700 text-sm font-medium mb-1">
                        Taxa Juros
                      </p>
                      <p className="text-amber-900 font-bold text-2xl">6%</p>
                      <p className="text-amber-600 text-xs mt-1">
                        Ao ano (financiamento)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: PROJECT */}
        {activeTab === "project" && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                GIARDINO - Projeto Completo
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Residencial Senior + Clube Life Style + Loteamento + Shopping
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Descrição do Projeto */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Visão Geral
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      O projeto GIARDINO é um complexo residencial de luxo
                      voltado para idosos e lifestyle premium, localizado em
                      Mogi das Cruzes, São Paulo. Combina habitação
                      especializada com serviços de wellness, clube social e
                      shopping, criando um ecossistema completo de alta
                      qualidade de vida.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Segmentos do Projeto
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex-shrink-0 mt-1">
                          1
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Residencial Senior + SPA
                          </p>
                          <p className="text-sm text-gray-600">
                            240 unidades - Pacote all-inclusive com cuidados
                            especializados
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-bold text-sm flex-shrink-0 mt-1">
                          2
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Hospedagem Turística
                          </p>
                          <p className="text-sm text-gray-600">
                            80 unidades - Hotel de luxo integrado ao complexo
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-purple-100 text-purple-600 font-bold text-sm flex-shrink-0 mt-1">
                          3
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Clube Life Style
                          </p>
                          <p className="text-sm text-gray-600">
                            6.000 membros com acesso a 360 dias/ano
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex-shrink-0 mt-1">
                          4
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Loteamento Residencial
                          </p>
                          <p className="text-sm text-gray-600">
                            400 terrenos de 500m² com acesso ao clube
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-sm flex-shrink-0 mt-1">
                          5
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900">
                            Centro Comercial
                          </p>
                          <p className="text-sm text-gray-600">
                            Shopping com 250+ lojas, alimentação, cinemas
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Números Chave */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Números Principais
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                        <span className="font-medium text-blue-900">
                          Total de Unidades Residenciais
                        </span>
                        <span className="font-bold text-blue-900 text-lg">
                          320
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                        <span className="font-medium text-green-900">
                          Membros do Clube
                        </span>
                        <span className="font-bold text-green-900 text-lg">
                          6.000
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                        <span className="font-medium text-purple-900">
                          Total de Funcionários
                        </span>
                        <span className="font-bold text-purple-900 text-lg">
                          204
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                        <span className="font-medium text-orange-900">
                          Áreas Comerciais
                        </span>
                        <span className="font-bold text-orange-900 text-lg">
                          250+
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200">
                        <span className="font-medium text-amber-900">
                          Investimento Total
                        </span>
                        <span className="font-bold text-amber-900 text-lg">
                          R$ 250M
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Facilities & Serviços
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Spa & Wellness",
                        "Piscinas",
                        "Academia 24h",
                        "Quadras Esportivas",
                        "Restaurante",
                        "Cabeleireiro",
                        "Centro Médico",
                        "Home Care 24h",
                        "Terapias",
                        "Fisioterapia",
                        "Consultas Médicas",
                        "Concierge",
                      ].map((service) => (
                        <div
                          key={service}
                          className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                        >
                          <p className="text-sm font-medium text-gray-700">
                            ✓ {service}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline de Fases */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 border border-blue-200 mb-8">
                <h3 className="text-xl font-bold text-blue-900 mb-6">
                  Estrutura de Investimento
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">
                        1
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">
                        Proposta Inicial (Dinho)
                      </h4>
                      <p className="text-blue-800 text-sm">
                        R$ 150.000.000 - Entrada + 6 parcelas anuais
                      </p>
                      <p className="text-blue-700 text-xs mt-1">
                        • Entrada: R$ 30.000.000
                        <br />
                        • 6 parcelas: R$ 20.000.000/ano
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">
                        2
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900">
                        Financiamento Complementar
                      </h4>
                      <p className="text-blue-800 text-sm">
                        R$ 100.000.000 - CAPEX com 6% a.a.
                      </p>
                      <p className="text-blue-700 text-xs mt-1">
                        • Prazo: 120 meses (10 anos)
                        <br />
                        • Pagamento mensal: R$ 1.000.000 + juros
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modelo de Receitas */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                  <h3 className="text-lg font-bold text-green-900 mb-4">
                    Receitas Iniciais (Vendas)
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-green-200">
                      <span className="text-green-800">Residencial Senior</span>
                      <span className="font-bold text-green-900">R$ 160M</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-green-200">
                      <span className="text-green-800">Clube Life Style</span>
                      <span className="font-bold text-green-900">R$ 300M</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-green-200">
                      <span className="text-green-800">Loteamento</span>
                      <span className="font-bold text-green-900">R$ 144M</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-green-200">
                      <span className="text-green-800">Shopping/Mall</span>
                      <span className="font-bold text-green-900">R$ 2.6M</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 bg-green-200 px-3 py-2 rounded">
                      <span className="text-green-900 font-bold">TOTAL</span>
                      <span className="font-bold text-green-900 text-lg">
                        R$ 606.6M
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg p-6 border border-amber-200">
                  <h3 className="text-lg font-bold text-amber-900 mb-4">
                    Receitas Mensais Recorrentes
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                      <span className="text-amber-800">Residencial</span>
                      <span className="font-bold text-amber-900">R$ 8.4M</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                      <span className="text-amber-800">Hospedagem</span>
                      <span className="font-bold text-amber-900">R$ 756k</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                      <span className="text-amber-800">Clube</span>
                      <span className="font-bold text-amber-900">R$ 3.0M</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b border-amber-200">
                      <span className="text-amber-800">Comércios</span>
                      <span className="font-bold text-amber-900">R$ 1.575M</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 bg-amber-200 px-3 py-2 rounded">
                      <span className="text-amber-900 font-bold">TOTAL</span>
                      <span className="font-bold text-amber-900 text-lg">
                        R$ 13.7M
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Premium Footer */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-slate-300 py-12 mt-20 border-t-2 border-amber-400">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            {/* Branding */}
            <div>
              <h3 className="text-xl font-bold text-amber-400 font-serif mb-2">GIARDINO</h3>
              <p className="text-sm text-slate-400">Residencial Senior + Clube Lifestyle</p>
            </div>

            {/* Location */}
            <div>
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Localização</h4>
              <p className="text-sm text-slate-400">Mogi das Cruzes, São Paulo</p>
              <p className="text-xs text-slate-500 mt-1">Área total: 258.900 m²</p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Projeto</h4>
              <p className="text-sm text-slate-400">Modelo de Investimento Premium</p>
              <p className="text-xs text-slate-500 mt-1">Versão 2024</p>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-8">
            <p className="text-center text-sm text-slate-400">
              © 2024 GIARDINO - Projeto de Investimento Residencial Senior + Clube Life Style
            </p>
            <p className="text-center text-xs text-slate-500 mt-2">
              Documento de investimento confidencial | Mogi das Cruzes, São Paulo
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
