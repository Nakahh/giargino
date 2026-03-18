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
import { ProjectGalleryPDF } from "@/components/ProjectGalleryPDF";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { giardino } from "@shared/giardino-data";
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

// Paleta de cores GIARDINO
const GIARDINO_COLORS = {
  primary: "#1F3B5E",
  accent: "#F4C430",
  secondary: "#2D5016",
  gold: "#F4C430",
  text: "#374151",
  light: "#FFFFFF",
};

const CHART_COLORS = [
  "#1F3B5E",
  "#2D5016",
  "#F4C430",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#6366F1",
  "#10B981",
];

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// Componente de Legenda Customizada para PDF
function PDFLegend({ items, layout = "horizontal" }: { items: any[]; layout?: "horizontal" | "vertical" }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
        padding: "15px 0",
        backgroundColor: "#f9fafb",
        borderRadius: "4px",
        marginTop: "15px",
      }}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            fontWeight: "500",
          }}
        >
          <div
            style={{
              width: "14px",
              height: "14px",
              backgroundColor: item.color || "#ccc",
              borderRadius: "2px",
            }}
          />
          <span style={{ color: "#374151" }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export interface PDFWrapperProps {
  forPDF?: boolean;
}

export function PDFWrapper({ forPDF = false }: PDFWrapperProps) {
  // Dados de receitas
  const revenueData = [
    {
      name: "Residencial Senior",
      value: giardino.monthlyRevenue.residentialSenior.monthlyTotal,
      fill: CHART_COLORS[0],
    },
    {
      name: "Hospedagem",
      value: giardino.monthlyRevenue.hospitality.monthlyTotal,
      fill: CHART_COLORS[1],
    },
    {
      name: "Clube Life Style",
      value: giardino.monthlyRevenue.lifeStyleClubMembership.monthlyTotal,
      fill: CHART_COLORS[2],
    },
    {
      name: "Bares/Restaurantes",
      value: giardino.monthlyRevenue.barsRestaurantShops.monthlyTotal,
      fill: CHART_COLORS[3],
    },
  ];

  // Dados de custos
  const costData = [
    {
      name: "Recursos Humanos",
      value:
        giardino.hrCosts.housekeeping.monthlyTotal +
        giardino.hrCosts.maintenance.monthlyTotal +
        giardino.hrCosts.management.monthlyTotal +
        giardino.hrCosts.food.monthlyTotal +
        giardino.hrCosts.entertainment.monthlyTotal,
      fill: CHART_COLORS[0],
    },
    {
      name: "Operacional",
      value:
        giardino.operationalCosts.utilities.monthlyTotal +
        giardino.operationalCosts.maintenance.monthlyTotal +
        giardino.operationalCosts.marketing.monthlyTotal,
      fill: CHART_COLORS[1],
    },
    {
      name: "Financeiro",
      value: giardino.financialCosts.monthlyTotal,
      fill: CHART_COLORS[2],
    },
  ];

  // Distribuição de Vendas Iniciais
  const salesDistribution = [
    { name: "Residencial Senior", value: giardino.initialSalesDistribution.residentialSenior },
    { name: "Hospedagem", value: giardino.initialSalesDistribution.hospitality },
    { name: "Clube Life Style", value: giardino.initialSalesDistribution.lifeStyleClub },
    { name: "Loteamento", value: giardino.initialSalesDistribution.lotting },
    { name: "Centro Comercial", value: giardino.initialSalesDistribution.commercialCenter },
  ];

  // Fluxo de Caixa
  const cashFlowData = [
    { month: "Jan", receita: 1200000, custos: 900000, lucro: 300000 },
    { month: "Fev", receita: 1250000, custos: 920000, lucro: 330000 },
    { month: "Mar", receita: 1300000, custos: 940000, lucro: 360000 },
    { month: "Abr", receita: 1350000, custos: 960000, lucro: 390000 },
    { month: "Mai", receita: 1400000, custos: 980000, lucro: 420000 },
    { month: "Jun", receita: 1450000, custos: 1000000, lucro: 450000 },
    { month: "Jul", receita: 1500000, custos: 1020000, lucro: 480000 },
    { month: "Ago", receita: 1550000, custos: 1040000, lucro: 510000 },
    { month: "Set", receita: 1600000, custos: 1060000, lucro: 540000 },
    { month: "Out", receita: 1650000, custos: 1080000, lucro: 570000 },
    { month: "Nov", receita: 1700000, custos: 1100000, lucro: 600000 },
    { month: "Dez", receita: 1800000, custos: 1150000, lucro: 650000 },
  ];

  // Dados de RH
  const hrData = [
    { department: "Governanta", employees: 45, salary: 2800000 },
    { department: "Manutenção", employees: 28, salary: 1400000 },
    { department: "Gestão", employees: 12, salary: 600000 },
    { department: "Alimentação", employees: 35, salary: 1050000 },
    { department: "Entretenimento", employees: 18, salary: 540000 },
  ];

  // Dados de viabilidade
  const viabilityMetrics = [
    { metric: "TIR (Taxa Interna de Retorno)", value: "18.5%", color: GIARDINO_COLORS.accent },
    { metric: "VPL (Valor Presente Líquido)", value: "R$ 156,8 M", color: GIARDINO_COLORS.secondary },
    { metric: "Payback", value: "5.2 anos", color: GIARDINO_COLORS.primary },
    { metric: "ROI (Retorno sobre Investimento)", value: "245%", color: GIARDINO_COLORS.accent },
  ];

  const legendItems = [
    { label: "Receita Bruta", color: GIARDINO_COLORS.secondary },
    { label: "Custos Totais", color: "#EF4444" },
    { label: "Lucro Líquido", color: GIARDINO_COLORS.accent },
  ];

  return (
    <div
      className={forPDF ? "pdf-wrapper" : ""}
      style={{
        backgroundColor: GIARDINO_COLORS.light,
        minHeight: "100vh",
        width: forPDF ? "1200px" : "100%",
      }}
    >
      {/* ===== HEADER ===== */}
      <div
        style={{
          background: `linear-gradient(135deg, #2C3E50 0%, #1F3B5E 100%)`,
          padding: forPDF ? "30px 20px" : "24px 16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Título e Descrição */}
          <div style={{ marginBottom: "24px" }}>
            <h1
              style={{
                fontSize: forPDF ? "48px" : "36px",
                fontWeight: "bold",
                color: GIARDINO_COLORS.accent,
                margin: "0 0 8px 0",
                textAlign: "center",
              }}
            >
              GIARDINO
            </h1>
            <p
              style={{
                fontSize: forPDF ? "16px" : "14px",
                fontWeight: "600",
                color: GIARDINO_COLORS.light,
                margin: "0 0 4px 0",
                textAlign: "center",
              }}
            >
              RESIDENCIAL SÊNIOR
            </p>
            <p
              style={{
                fontSize: forPDF ? "14px" : "12px",
                fontWeight: "300",
                color: `${GIARDINO_COLORS.light}cc`,
                margin: "0",
                textAlign: "center",
              }}
            >
              Modelo de Investimento Premium
            </p>
          </div>

          {/* Logo */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: forPDF ? "30px 20px" : "24px 16px",
              backgroundColor: GIARDINO_COLORS.light,
              borderRadius: "8px",
              marginBottom: "24px",
            }}
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F1f5c753434a147ec852674a7cae5983c%2F5fcc06ba8d4a407c8933fa63bcffec84?format=webp&width=800&height=1200"
              alt="GIARDINO Logo"
              style={{
                height: forPDF ? "180px" : "120px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Divider */}
          <div style={{ borderTop: `2px solid ${GIARDINO_COLORS.accent}60`, paddingTop: "24px" }}>
            <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <h2
                style={{
                  fontSize: forPDF ? "24px" : "20px",
                  fontWeight: "300",
                  color: GIARDINO_COLORS.light,
                  margin: "0 0 8px 0",
                }}
              >
                Modelo de Investimento Premium
              </h2>
              <p
                style={{
                  fontSize: forPDF ? "16px" : "14px",
                  color: `${GIARDINO_COLORS.light}dd`,
                  margin: "0 0 16px 0",
                }}
              >
                Residencial Senior + Clube Life Style + Loteamento + Centro Comercial
              </p>
              <p
                style={{
                  fontSize: forPDF ? "14px" : "12px",
                  fontWeight: "600",
                  color: `${GIARDINO_COLORS.light}ee`,
                  margin: "0",
                }}
              >
                Localização: Mogi das Cruzes, São Paulo — Área: 258.900 m²
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== CONTEÚDO - SEM MENU DE NAVEGAÇÃO ===== */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: forPDF ? "40px 20px" : "24px 16px",
        }}
      >
        {/* ===== ABA 1: OVERVIEW ===== */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "bold", color: GIARDINO_COLORS.primary, marginBottom: "24px" }}>
            📊 Visão Geral
          </h2>

          {/* 4 KPI Cards - Corrigido para não ficar cortado */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: forPDF ? "1fr 1fr 1fr 1fr" : "repeat(auto-fit, minmax(250px, 1fr))",
              gap: forPDF ? "16px" : "12px",
              marginBottom: "32px",
            }}
          >
            {/* Card 1: Receita Mensal */}
            <div
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeft: `4px solid ${GIARDINO_COLORS.primary}`,
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                height: "auto",
                overflow: "visible",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: GIARDINO_COLORS.secondary,
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                }}
              >
                RECEITA MENSAL
              </p>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: GIARDINO_COLORS.primary,
                  margin: "0 0 8px 0",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {formatCurrency(giardino.totalMonthlyRevenue)}
              </h3>
              <p style={{ fontSize: "11px", color: "#999", margin: "0" }}>Faturamento/mês</p>
            </div>

            {/* Card 2: Total Vendas */}
            <div
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeft: `4px solid ${GIARDINO_COLORS.secondary}`,
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                height: "auto",
                overflow: "visible",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: GIARDINO_COLORS.primary,
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                }}
              >
                TOTAL VENDAS
              </p>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: GIARDINO_COLORS.secondary,
                  margin: "0 0 8px 0",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {formatCurrency(606_600_000)}
              </h3>
              <p style={{ fontSize: "11px", color: "#999", margin: "0" }}>Investimento inicial</p>
            </div>

            {/* Card 3: Custos Mensais */}
            <div
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeft: `4px solid ${GIARDINO_COLORS.accent}`,
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                height: "auto",
                overflow: "visible",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: GIARDINO_COLORS.secondary,
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                }}
              >
                CUSTOS MENSAIS
              </p>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: GIARDINO_COLORS.accent,
                  margin: "0 0 8px 0",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {formatCurrency(469_000 + 4_320_000 + 1_000_000 + 500_000)}
              </h3>
              <p style={{ fontSize: "11px", color: "#999", margin: "0" }}>Custos operacionais</p>
            </div>

            {/* Card 4: Lucro Líquido */}
            <div
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderLeft: `4px solid ${GIARDINO_COLORS.accent}`,
                borderRadius: "8px",
                padding: "16px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                height: "auto",
                overflow: "visible",
              }}
            >
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "#666",
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                }}
              >
                LUCRO LÍQUIDO
              </p>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: GIARDINO_COLORS.accent,
                  margin: "0 0 8px 0",
                  wordWrap: "break-word",
                  whiteSpace: "normal",
                }}
              >
                {formatCurrency(
                  giardino.totalMonthlyRevenue -
                    (469_000 + 4_320_000 + 1_000_000 + 500_000)
                )}
              </h3>
              <p style={{ fontSize: "11px", color: "#999", margin: "0" }}>Mensal (aprox.)</p>
            </div>
          </div>

          {/* Gráficos */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginBottom: "32px",
            }}
          >
            {/* Pie Chart - Receitas */}
            <div
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderTop: `4px solid ${GIARDINO_COLORS.primary}`,
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: GIARDINO_COLORS.primary, marginBottom: "8px" }}>
                📊 Distribuição de Receitas
              </h3>
              <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
                Contribuição de cada segmento na receita bruta mensal
              </p>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="40%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${formatCurrency(value)}`}
                    outerRadius={90}
                    dataKey="value"
                  >
                    {revenueData.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <PDFLegend
                items={revenueData.map((d) => ({ label: d.name, color: d.fill }))}
              />
            </div>

            {/* Bar Chart - Vendas */}
            <div
              style={{
                backgroundColor: GIARDINO_COLORS.light,
                borderTop: `4px solid ${GIARDINO_COLORS.secondary}`,
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: GIARDINO_COLORS.secondary, marginBottom: "8px" }}>
                💼 Capital por Segmento
              </h3>
              <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
                Vendas iniciais (CAPEX) por segmento - Total R$ 606,6 milhões
              </p>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={salesDistribution} margin={{ top: 5, right: 10, left: 0, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    style={{ fontSize: "11px" }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#6b7280" style={{ fontSize: "11px" }} />
                  <Bar dataKey="value" fill={GIARDINO_COLORS.secondary} radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cash Flow Chart - Com Legenda Visível */}
          <div
            style={{
              backgroundColor: GIARDINO_COLORS.light,
              borderTop: `4px solid ${GIARDINO_COLORS.accent}`,
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              marginBottom: "32px",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "bold", color: GIARDINO_COLORS.accent, marginBottom: "8px" }}>
              📈 Fluxo de Caixa — 12 Meses
            </h3>
            <p style={{ fontSize: "12px", color: "#666", marginBottom: "16px" }}>
              Projeção mensal de receitas, custos e lucro líquido ao longo de 1 ano
            </p>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cashFlowData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: "11px" }} />
                <YAxis stroke="#6b7280" style={{ fontSize: "11px" }} />
                <Line
                  type="monotone"
                  dataKey="receita"
                  stroke={GIARDINO_COLORS.secondary}
                  strokeWidth={3}
                  dot={{ fill: GIARDINO_COLORS.secondary, r: 3 }}
                  name="Receita Bruta"
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="custos"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ fill: "#EF4444", r: 3 }}
                  name="Custos Totais"
                  isAnimationActive={false}
                />
                <Line
                  type="monotone"
                  dataKey="lucro"
                  stroke={GIARDINO_COLORS.accent}
                  strokeWidth={3}
                  dot={{ fill: GIARDINO_COLORS.accent, r: 3 }}
                  name="Lucro Líquido"
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
            <PDFLegend items={legendItems} />
          </div>
        </div>

        {/* ===== ABA 2: RECEITAS ===== */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "bold", color: GIARDINO_COLORS.primary, marginBottom: "24px" }}>
            💰 Receitas Detalhadas
          </h2>
          <div
            style={{
              backgroundColor: GIARDINO_COLORS.light,
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <p style={{ color: "#666", fontSize: "14px" }}>
              Total de Receitas Mensais: <strong>{formatCurrency(giardino.totalMonthlyRevenue)}</strong>
            </p>
          </div>
        </div>

        {/* ===== ABA 3: CUSTOS ===== */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "bold", color: GIARDINO_COLORS.primary, marginBottom: "24px" }}>
            📉 Custos Operacionais
          </h2>
          <div
            style={{
              backgroundColor: GIARDINO_COLORS.light,
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <p style={{ color: "#666", fontSize: "14px" }}>
              Total de Custos Mensais: <strong>{formatCurrency(469_000 + 4_320_000 + 1_000_000 + 500_000)}</strong>
            </p>
          </div>
        </div>

        {/* ===== ABA 4: RH ===== */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "bold", color: GIARDINO_COLORS.primary, marginBottom: "24px" }}>
            👥 Recursos Humanos
          </h2>
          <div
            style={{
              backgroundColor: GIARDINO_COLORS.light,
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              overflowX: "auto",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                  <th style={{ textAlign: "left", padding: "8px", fontWeight: "600" }}>Departamento</th>
                  <th style={{ textAlign: "right", padding: "8px", fontWeight: "600" }}>Funcionários</th>
                  <th style={{ textAlign: "right", padding: "8px", fontWeight: "600" }}>Custos Mensais</th>
                </tr>
              </thead>
              <tbody>
                {hrData.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: "1px solid #f3f4f6" }}>
                    <td style={{ padding: "8px" }}>{row.department}</td>
                    <td style={{ textAlign: "right", padding: "8px" }}>{row.employees}</td>
                    <td style={{ textAlign: "right", padding: "8px" }}>{formatCurrency(row.salary)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== ABA 5: VIABILIDADE ===== */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "bold", color: GIARDINO_COLORS.primary, marginBottom: "24px" }}>
            ✓ Viabilidade & Análise
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            {viabilityMetrics.map((metric, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: GIARDINO_COLORS.light,
                  borderRadius: "8px",
                  padding: "20px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  borderLeft: `4px solid ${metric.color}`,
                }}
              >
                <p style={{ fontSize: "12px", color: "#666", margin: "0 0 8px 0" }}>{metric.metric}</p>
                <h3 style={{ fontSize: "24px", fontWeight: "bold", color: metric.color, margin: "0" }}>
                  {metric.value}
                </h3>
              </div>
            ))}
          </div>

          {/* Galeria de Imagens - Renderizando apenas uma vez */}
          <div style={{ marginTop: "32px" }}>
            <h3 style={{ fontSize: "18px", fontWeight: "bold", color: GIARDINO_COLORS.primary, marginBottom: "16px" }}>
              📸 Galeria do Projeto
            </h3>
            <ProjectGalleryPDF forPDF={true} />
          </div>
        </div>

        {/* ===== ABA 6: SOBRE O PROJETO ===== */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: "bold", color: GIARDINO_COLORS.primary, marginBottom: "24px" }}>
            🏢 Sobre o Projeto
          </h2>
          <div
            style={{
              backgroundColor: GIARDINO_COLORS.light,
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            <p style={{ color: "#666", fontSize: "14px", lineHeight: "1.6", margin: "0" }}>
              O projeto GIARDINO é um empreendimento premium de residencial sênior com infraestrutura completa,
              incluindo clube lifestyle, loteamento de alto padrão e centro comercial. Localizado em Mogi das Cruzes,
              São Paulo, em uma área de 258.900 m², representa uma oportunidade única de investimento com alto retorno.
            </p>
          </div>
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div
        style={{
          backgroundColor: GIARDINO_COLORS.primary,
          color: GIARDINO_COLORS.light,
          padding: "30px 20px",
          textAlign: "center",
          marginTop: "40px",
          borderTop: `2px solid ${GIARDINO_COLORS.accent}`,
        }}
      >
        <p style={{ margin: "0 0 8px 0", fontWeight: "600", fontSize: "14px" }}>GIARDINO</p>
        <p style={{ margin: "0", fontSize: "12px", opacity: 0.9 }}>Residencial Sênior Premium</p>
        <p style={{ margin: "8px 0 0 0", fontSize: "11px", opacity: 0.7 }}>
          Documento Confidencial — Projeto de Investimento
        </p>
      </div>
    </div>
  );
}
