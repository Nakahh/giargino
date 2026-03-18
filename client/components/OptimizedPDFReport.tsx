import jsPDF from "jspdf";
import { giardino } from "@shared/giardino-data";

// Cores GIARDINO
const COLORS = {
  primary: "#1F3B5E",
  secondary: "#2D5016",
  accent: "#F4C430",
  text: "#374151",
  lightText: "#6B7280",
  border: "#E5E7EB",
  white: "#FFFFFF",
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function generatePDF() {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let yPosition = margin;

  // Helper functions
  const setFont = (fontName: string, size: number, color: string) => {
    pdf.setFontSize(size);
    pdf.setTextColor(parseInt(color.slice(1, 3), 16), parseInt(color.slice(3, 5), 16), parseInt(color.slice(5, 7), 16));
    if (fontName === "heading") pdf.setFont("helvetica", "bold");
    else if (fontName === "bold") pdf.setFont("helvetica", "bold");
    else pdf.setFont("helvetica", "normal");
  };

  const addNewPage = () => {
    pdf.addPage();
    yPosition = margin;
  };

  const checkPageSpace = (space: number) => {
    if (yPosition + space > pageHeight - margin) {
      addNewPage();
    }
  };

  const drawTableRow = (columns: string[], widths: number[], yPos: number, isBold: boolean = false, bgColor?: string) => {
    if (bgColor) {
      pdf.setFillColor(parseInt(bgColor.slice(1, 3), 16), parseInt(bgColor.slice(3, 5), 16), parseInt(bgColor.slice(5, 7), 16));
      pdf.rect(margin, yPos - 4, contentWidth, 6, "F");
    }

    setFont(isBold ? "bold" : "normal", 9, isBold ? COLORS.primary : COLORS.text);

    let xPos = margin;
    columns.forEach((col, idx) => {
      const align = idx === 0 ? "left" : "right";
      pdf.text(col, xPos + 2, yPos, { maxWidth: widths[idx] - 2, align });
      xPos += widths[idx];
    });
  };

  // ===== PAGE 1: COVER =====
  setFont("heading", 48, COLORS.primary);
  pdf.text("GIARDINO", pageWidth / 2, 80, { align: "center" });

  setFont("normal", 20, COLORS.secondary);
  pdf.text("RESIDENCIAL SÊNIOR E CLUBE LIFE STYLE", pageWidth / 2, 100, { align: "center" });

  setFont("normal", 14, COLORS.accent);
  pdf.text("MODELO DE INVESTIMENTO", pageWidth / 2, 115, { align: "center" });

  setFont("normal", 11, COLORS.lightText);
  pdf.text("ANÁLISE FINANCEIRA COMPLETA - 10 ANOS", pageWidth / 2, 135, { align: "center" });

  // Key metrics on cover
  yPosition = 160;
  const metrics = [
    { label: "Investimento Inicial", value: "R$ 150 Milhões" },
    { label: "Receita Mensal Bruta", value: "R$ 13,7 Milhões" },
    { label: "Unidades Residenciais", value: "240" },
    { label: "Taxa de Retorno (ROI)", value: "71,6%" },
  ];

  setFont("normal", 10, COLORS.primary);
  metrics.forEach((metric, idx) => {
    pdf.text(`${metric.label}:`, margin, yPosition + idx * 10, { maxWidth: contentWidth / 2 });
    setFont("bold", 10, COLORS.accent);
    pdf.text(metric.value, pageWidth / 2 + margin, yPosition + idx * 10);
    setFont("normal", 10, COLORS.primary);
  });

  addNewPage();

  // ===== PAGE 2: EXECUTIVE SUMMARY & OVERVIEW =====
  setFont("heading", 16, COLORS.primary);
  pdf.text("RESUMO EXECUTIVO", margin, yPosition);
  yPosition += 12;

  setFont("normal", 10, COLORS.text);
  const summaryText = `O projeto GIARDINO é um empreendimento de luxo integrando residencial sênior, hospedagem, 
clube life style, loteamento e shopping. Com investimento inicial de R$ 150 milhões e receita bruta 
mensal de R$ 13,7 milhões, projeta lucro mensal de R$ 7,441 milhões (margem de 54%).`;

  const textLines = pdf.splitTextToSize(summaryText, contentWidth);
  pdf.text(textLines, margin, yPosition);
  yPosition += textLines.length * 5 + 5;

  // Quick metrics
  checkPageSpace(50);
  setFont("heading", 12, COLORS.secondary);
  pdf.text("INDICADORES PRINCIPAIS", margin, yPosition);
  yPosition += 8;

  const indicators = [
    ["Métrica", "Valor"],
    ["Receita Bruta Mensal", formatCurrency(giardino.totalMonthlyRevenue)],
    ["Custos Mensais", formatCurrency(469_000 + 4_320_000 + 1_000_000 + 500_000)],
    ["Lucro Líquido Mensal", formatCurrency(giardino.totalMonthlyRevenue - (469_000 + 4_320_000 + 1_000_000 + 500_000))],
    ["Margem de Lucro", "54,2%"],
    ["Payback", "~13 meses"],
  ];

  setFont("bold", 9, COLORS.white);
  pdf.setFillColor(31, 59, 94);
  drawTableRow([indicators[0][0], indicators[0][1]], [contentWidth * 0.6, contentWidth * 0.4], yPosition, true, COLORS.primary);
  yPosition += 8;

  setFont("normal", 9, COLORS.text);
  for (let i = 1; i < indicators.length; i++) {
    checkPageSpace(8);
    const bgColor = i % 2 === 0 ? "#F9FAFB" : undefined;
    pdf.setFillColor(249, 250, 251);
    if (bgColor) pdf.rect(margin, yPosition - 4, contentWidth, 6, "F");
    drawTableRow([indicators[i][0], indicators[i][1]], [contentWidth * 0.6, contentWidth * 0.4], yPosition);
    yPosition += 8;
  }

  addNewPage();

  // ===== PAGE 3: REVENUE DETAILS =====
  setFont("heading", 14, COLORS.primary);
  pdf.text("RECEITAS MENSAIS POR SEGMENTO", margin, yPosition);
  yPosition += 10;

  const revenueTable = [
    ["Segmento", "Unidades", "Valor Unit.", "Total Mensal", "% do Total"],
    ["Residencial Senior", "240", formatCurrency(35_000), formatCurrency(8_400_000), "61.2%"],
    ["Hospedagem", "80", formatCurrency(1_000), formatCurrency(756_000), "5.5%"],
    ["Clube Life Style", "6.000", formatCurrency(500), formatCurrency(3_000_000), "21.9%"],
    ["Bares/Restaurantes", "350/dia", formatCurrency(150), formatCurrency(1_575_000), "11.5%"],
  ];

  // Header
  setFont("bold", 9, COLORS.white);
  pdf.setFillColor(31, 59, 94);
  pdf.rect(margin, yPosition - 4, contentWidth, 6, "F");
  drawTableRow(revenueTable[0], [contentWidth * 0.25, contentWidth * 0.15, contentWidth * 0.2, contentWidth * 0.2, contentWidth * 0.2], yPosition, true);
  yPosition += 8;

  // Rows
  setFont("normal", 9, COLORS.text);
  for (let i = 1; i < revenueTable.length; i++) {
    checkPageSpace(8);
    if (i % 2 === 0) {
      pdf.setFillColor(249, 250, 251);
      pdf.rect(margin, yPosition - 4, contentWidth, 6, "F");
    }
    drawTableRow(revenueTable[i], [contentWidth * 0.25, contentWidth * 0.15, contentWidth * 0.2, contentWidth * 0.2, contentWidth * 0.2], yPosition);
    yPosition += 8;
  }

  // Total row
  yPosition += 2;
  pdf.setFillColor(31, 59, 94);
  pdf.rect(margin, yPosition - 4, contentWidth, 6, "F");
  setFont("bold", 9, COLORS.white);
  drawTableRow(["TOTAL MENSAL", "", "", formatCurrency(giardino.totalMonthlyRevenue), "100%"], [contentWidth * 0.25, contentWidth * 0.15, contentWidth * 0.2, contentWidth * 0.2, contentWidth * 0.2], yPosition, true, COLORS.primary);
  yPosition += 10;

  addNewPage();

  // ===== PAGE 4: COSTS & HR =====
  setFont("heading", 14, COLORS.secondary);
  pdf.text("CUSTOS OPERACIONAIS MENSAIS", margin, yPosition);
  yPosition += 10;

  const costsTable = [
    ["Categoria de Custo", "Valor Mensal", "% do Total"],
    ["Recursos Humanos", formatCurrency(469_000), "5.8%"],
    ["Custos Operacionais Residenciais", formatCurrency(4_320_000), "53.4%"],
    ["Pagamento Financiamento", formatCurrency(1_000_000), "12.3%"],
    ["Juros do Financiamento", formatCurrency(500_000), "6.2%"],
  ];

  // Header
  setFont("bold", 9, COLORS.white);
  pdf.setFillColor(45, 80, 22);
  pdf.rect(margin, yPosition - 4, contentWidth, 6, "F");
  drawTableRow(costsTable[0], [contentWidth * 0.5, contentWidth * 0.3, contentWidth * 0.2], yPosition, true);
  yPosition += 8;

  // Rows
  setFont("normal", 9, COLORS.text);
  for (let i = 1; i < costsTable.length; i++) {
    checkPageSpace(8);
    if (i % 2 === 0) {
      pdf.setFillColor(249, 250, 251);
      pdf.rect(margin, yPosition - 4, contentWidth, 6, "F");
    }
    drawTableRow(costsTable[i], [contentWidth * 0.5, contentWidth * 0.3, contentWidth * 0.2], yPosition);
    yPosition += 8;
  }

  // Total
  yPosition += 2;
  pdf.setFillColor(45, 80, 22);
  pdf.rect(margin, yPosition - 4, contentWidth, 6, "F");
  setFont("bold", 9, COLORS.white);
  drawTableRow(["TOTAL DE CUSTOS", formatCurrency(469_000 + 4_320_000 + 1_000_000 + 500_000), "100%"], [contentWidth * 0.5, contentWidth * 0.3, contentWidth * 0.2], yPosition, true);
  yPosition += 12;

  addNewPage();

  // ===== PAGE 5: 10-YEAR PROJECTION =====
  setFont("heading", 14, COLORS.primary);
  pdf.text("PROJEÇÃO FINANCEIRA 10 ANOS", margin, yPosition);
  yPosition += 10;

  // Simplified projection table
  const projectionTable = [
    ["Ano", "Receita Bruta", "Custos Totais", "Lucro Líquido", "Lucro Acumulado", "ROI (%)"],
    ...giardino.yearlyProjections
      .filter((_, idx) => idx % 2 === 0 || idx === giardino.yearlyProjections.length - 1) // Show every other year + last
      .map((proj) => [
        `Ano ${proj.year}`,
        formatCurrency(proj.grossRevenue),
        formatCurrency(proj.totalCosts),
        formatCurrency(proj.netProfit),
        formatCurrency(proj.cumulativeProfit),
        `${proj.roi}%`,
      ]),
  ];

  // Header
  setFont("bold", 8, COLORS.white);
  pdf.setFillColor(31, 59, 94);
  pdf.rect(margin, yPosition - 4, contentWidth, 6, "F");
  const colWidths = [contentWidth * 0.1, contentWidth * 0.15, contentWidth * 0.15, contentWidth * 0.15, contentWidth * 0.25, contentWidth * 0.1];
  drawTableRow(projectionTable[0], colWidths, yPosition, true);
  yPosition += 8;

  // Rows
  setFont("normal", 8, COLORS.text);
  for (let i = 1; i < projectionTable.length; i++) {
    checkPageSpace(8);
    if (i % 2 === 0) {
      pdf.setFillColor(249, 250, 251);
      pdf.rect(margin, yPosition - 4, contentWidth, 6, "F");
    }
    drawTableRow(projectionTable[i], colWidths, yPosition);
    yPosition += 8;
  }

  yPosition += 5;
  setFont("normal", 8, COLORS.lightText);
  pdf.text("* Projeção com crescimento de 2% a.a. e inflação de 3% nos custos", margin, yPosition);

  // ===== FINAL PAGE: FOOTER =====
  addNewPage();
  setFont("heading", 12, COLORS.primary);
  pdf.text("CONCLUSÃO", margin, yPosition);
  yPosition += 10;

  setFont("normal", 10, COLORS.text);
  const conclusion = `O projeto GIARDINO apresenta viabilidade econômica excepcional com:

• Receita bruta mensal de R$ 13,7 milhões
• Margem de lucro de 54,2% (R$ 7,441 milhões/mês)
• Payback em ~13 meses
• ROI acumulado de 86,5% em 10 anos
• Lucro acumulado de R$ 893,292 milhões

O projeto é estruturado para oferecer múltiplos fluxos de renda 
(residencial, hospitality, club memberships, retail) com demanda 
crescente no segmento premium de vida assistida.`;

  const conclusionLines = pdf.splitTextToSize(conclusion, contentWidth);
  pdf.text(conclusionLines, margin, yPosition);

  // Save PDF
  pdf.save("GIARDINO-Relatorio-Investimento-A4.pdf");
}

export function OptimizedPDFReport() {
  return (
    <button
      onClick={generatePDF}
      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-shadow font-semibold flex items-center gap-2"
    >
      <span>📄 PDF A4 Profissional</span>
    </button>
  );
}
