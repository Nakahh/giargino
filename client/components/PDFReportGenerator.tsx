import { jsPDF, HTMLElementInput } from "jspdf";
import { giardino } from "@shared/giardino-data";

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function generatePDFReport() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  const colors = {
    primary: "#0F3460",
    secondary: "#065f46",
    accent: "#FCD34D",
    gold: "#D4AF37",
    text: "#1F2937",
    lightGray: "#F3F4F6",
  };

  // ========== PÁGINA 1: CAPA ==========
  doc.setFillColor(15, 52, 96); // Azul marinho
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Título
  doc.setFont("Playfair Display", "bold");
  doc.setFontSize(48);
  doc.setTextColor(252, 211, 77); // Amarelo
  doc.text("GIARDINO", pageWidth / 2, pageHeight / 3, { align: "center" });

  // Subtítulo
  doc.setFont("Montserrat", "normal");
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text(
    "Modelo de Investimento Premium",
    pageWidth / 2,
    pageHeight / 3 + 20,
    { align: "center" }
  );
  doc.text(
    "Residencial Senior + Clube Life Style + Loteamento + Centro Comercial",
    pageWidth / 2,
    pageHeight / 3 + 30,
    { align: "center" }
  );

  // Localização
  doc.setFontSize(12);
  doc.text("Mogi das Cruzes, São Paulo", pageWidth / 2, pageHeight / 2 + 40, {
    align: "center",
  });
  doc.text("Área Total: 258.900 m²", pageWidth / 2, pageHeight / 2 + 50, {
    align: "center",
  });

  // Data
  doc.setFontSize(10);
  doc.text(
    `Relatório Executivo | ${new Date().toLocaleDateString("pt-BR")}`,
    pageWidth / 2,
    pageHeight - 30,
    { align: "center" }
  );

  doc.addPage();
  yPosition = margin;

  // ========== PÁGINA 2: SUMÁRIO EXECUTIVO ==========
  doc.setFont("Playfair Display", "bold");
  doc.setFontSize(24);
  doc.setTextColor(15, 52, 96);
  doc.text("Sumário Executivo", margin, yPosition);
  yPosition += 15;

  doc.setLineWidth(1);
  doc.setDrawColor(212, 175, 55);
  doc.line(margin, yPosition, margin + 50, yPosition);
  yPosition += 10;

  doc.setFont("Montserrat", "normal");
  doc.setFontSize(11);
  doc.setTextColor(31, 41, 55);

  const summaryText = [
    `Investimento Inicial: ${formatCurrency(150_000_000 + 100_000_000)}`,
    `Receita Mensal Bruta: ${formatCurrency(giardino.totalMonthlyRevenue)}`,
    `Custos Mensais: ${formatCurrency(469_000 + 4_320_000 + 1_500_000)}`,
    `Lucro Mensal Estimado: ${formatCurrency(giardino.totalMonthlyRevenue - (469_000 + 4_320_000 + 1_500_000))}`,
    `Taxa de Lucratividade: 71.6%`,
    `Payback Estimado: ~13 meses`,
    `Estrutura Residencial: 320 unidades (240 Senior + 80 Hospedagem)`,
    `Membros Clube: 6.000 com acesso 360 dias/ano`,
    `Loteamento: 400 terrenos de 500m² cada`,
  ];

  summaryText.forEach((text) => {
    doc.text(`• ${text}`, margin + 5, yPosition);
    yPosition += 7;
  });

  doc.addPage();
  yPosition = margin;

  // ========== PÁGINA 3: TABELA CONSOLIDADA DE RECEITAS ==========
  doc.setFont("Playfair Display", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 52, 96);
  doc.text("Modelo de Receitas", margin, yPosition);
  yPosition += 12;

  // Receitas Iniciais
  doc.setFont("Montserrat", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 52, 96);
  doc.text("Receitas Iniciais (Vendas)", margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  const initialSalesData = [
    ["Segmento", "Unidades", "Valor Unit.", "Total"],
    [
      "Residencial Senior (Cotas)",
      "80",
      "R$ 2.000.000",
      formatCurrency(160_000_000),
    ],
    [
      "Clube Life Style (Títulos)",
      "6.000",
      "R$ 50.000",
      formatCurrency(300_000_000),
    ],
    [
      "Loteamento",
      "400",
      "R$ 360.000",
      formatCurrency(144_000_000),
    ],
    [
      "Centro Comercial",
      "-",
      "-",
      formatCurrency(2_660_000),
    ],
    [
      "TOTAL VENDAS INICIAIS",
      "-",
      "-",
      formatCurrency(giardino.totalSales),
    ],
  ];

  doc.setFont("Montserrat", "normal");
  const tableWidth = contentWidth;
  const colWidth = tableWidth / 4;

  let tableY = yPosition;
  // Header
  doc.setFillColor(15, 52, 96);
  doc.setTextColor(255, 255, 255);
  initialSalesData[0].forEach((header, i) => {
    doc.text(header, margin + i * colWidth + 2, tableY + 5);
  });
  tableY += 8;

  // Rows
  doc.setTextColor(31, 41, 55);
  initialSalesData.slice(1).forEach((row, idx) => {
    if (idx === initialSalesData.length - 2) {
      doc.setFillColor(212, 175, 55);
      doc.rect(margin, tableY - 3, contentWidth, 6, "F");
      doc.setFont("Montserrat", "bold");
    } else {
      doc.setFillColor(idx % 2 === 0 ? 243 : 255, 244, 246, 255);
      doc.rect(margin, tableY - 3, contentWidth, 6, "F");
    }

    row.forEach((cell, i) => {
      const align = i === 0 ? "left" : "right";
      doc.text(cell, margin + i * colWidth + 2, tableY + 2, { align });
    });
    tableY += 7;
  });

  yPosition = tableY + 5;

  // Receitas Mensais
  doc.setFont("Montserrat", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 52, 96);
  doc.text("Receitas Mensais Recorrentes", margin, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  const monthlyRevenueData = [
    ["Segmento", "Unidades", "Valor/Período", "Mensal"],
    [
      "Residencial Senior",
      "240",
      "R$ 35.000/mês",
      formatCurrency(8_400_000),
    ],
    [
      "Hospedagem",
      "80",
      "R$ 1.000/diária",
      formatCurrency(756_000),
    ],
    [
      "Clube Life Style",
      "6.000",
      "R$ 500/mês",
      formatCurrency(3_000_000),
    ],
    [
      "Bares/Restaurantes/Lojas",
      "350/dia",
      "R$ 150/pessoa",
      formatCurrency(1_575_000),
    ],
    [
      "TOTAL MENSAL",
      "-",
      "-",
      formatCurrency(giardino.totalMonthlyRevenue),
    ],
  ];

  doc.setFont("Montserrat", "normal");
  tableY = yPosition;
  // Header
  doc.setFillColor(6, 95, 70);
  doc.setTextColor(255, 255, 255);
  monthlyRevenueData[0].forEach((header, i) => {
    doc.text(header, margin + i * colWidth + 2, tableY + 5);
  });
  tableY += 8;

  // Rows
  doc.setTextColor(31, 41, 55);
  monthlyRevenueData.slice(1).forEach((row, idx) => {
    if (idx === monthlyRevenueData.length - 2) {
      doc.setFillColor(212, 175, 55);
      doc.rect(margin, tableY - 3, contentWidth, 6, "F");
      doc.setFont("Montserrat", "bold");
    } else {
      doc.setFillColor(idx % 2 === 0 ? 243 : 255, 244, 246, 255);
      doc.rect(margin, tableY - 3, contentWidth, 6, "F");
    }

    row.forEach((cell, i) => {
      const align = i === 0 ? "left" : "right";
      doc.text(cell, margin + i * colWidth + 2, tableY + 2, { align });
    });
    tableY += 7;
  });

  // Adicionar página de custos
  doc.addPage();
  yPosition = margin;

  // ========== PÁGINA 4: CUSTOS CONSOLIDADOS ==========
  doc.setFont("Playfair Display", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 52, 96);
  doc.text("Estrutura de Custos Mensais", margin, yPosition);
  yPosition += 12;

  doc.setFont("Montserrat", "normal");
  doc.setFontSize(10);

  const costsData = [
    ["Categoria", "Descrição", "Valor Mensal"],
    ["Recursos Humanos", "204 Funcionários", formatCurrency(469_000)],
    ["Custos Operacionais", "240 unidades residenciais", formatCurrency(4_320_000)],
    ["Financiamento Principal", "120 meses @ 6% a.a.", formatCurrency(1_000_000)],
    ["Juros Financiamento", "Aproximado", formatCurrency(500_000)],
    ["TOTAL CUSTOS MENSAIS", "", formatCurrency(469_000 + 4_320_000 + 1_500_000)],
  ];

  tableY = yPosition;
  const col1Width = 50;
  const col2Width = 70;
  const col3Width = 50;

  // Header
  doc.setFillColor(212, 175, 55);
  doc.setTextColor(15, 52, 96);
  doc.setFont("Montserrat", "bold");
  doc.text("Categoria", margin + 2, tableY + 5);
  doc.text("Descrição", margin + col1Width + 2, tableY + 5);
  doc.text("Valor Mensal", margin + col1Width + col2Width + 2, tableY + 5);
  tableY += 8;

  // Rows
  doc.setFont("Montserrat", "normal");
  doc.setTextColor(31, 41, 55);
  costsData.slice(1).forEach((row, idx) => {
    if (idx === costsData.length - 2) {
      doc.setFillColor(15, 52, 96);
      doc.setTextColor(255, 255, 255);
      doc.setFont("Montserrat", "bold");
      doc.rect(margin, tableY - 3, contentWidth, 6, "F");
    } else {
      doc.setFillColor(idx % 2 === 0 ? 243 : 255, 244, 246, 255);
      doc.rect(margin, tableY - 3, contentWidth, 6, "F");
      doc.setFont("Montserrat", "normal");
    }

    doc.text(row[0], margin + 2, tableY + 2);
    doc.text(row[1], margin + col1Width + 2, tableY + 2, { maxWidth: col2Width - 4 });
    doc.text(row[2], margin + col1Width + col2Width + 2, tableY + 2, { align: "right" });
    tableY += 7;
  });

  // Viabilidade
  yPosition = tableY + 12;

  doc.setFont("Playfair Display", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 52, 96);
  doc.text("Análise de Viabilidade", margin, yPosition);
  yPosition += 10;

  doc.setFont("Montserrat", "normal");
  doc.setFontSize(10);
  doc.setTextColor(31, 41, 55);

  const viabilityMetrics = [
    ["Métrica", "Valor"],
    ["Lucro Mensal", formatCurrency(giardino.totalMonthlyRevenue - (469_000 + 4_320_000 + 1_500_000))],
    ["Lucro Anual", formatCurrency((giardino.totalMonthlyRevenue - (469_000 + 4_320_000 + 1_500_000)) * 12)],
    ["Taxa de Lucratividade", "71.6%"],
    ["Payback", "~13 meses"],
    ["Break-even", "~11 meses"],
    ["ROI (anual)", `${((((giardino.totalMonthlyRevenue - (469_000 + 4_320_000 + 1_500_000)) * 12) / 250_000_000) * 100).toFixed(1)}%`],
  ];

  tableY = yPosition;
  doc.setFillColor(252, 211, 77);
  doc.setTextColor(15, 52, 96);
  doc.setFont("Montserrat", "bold");
  doc.text("Métrica", margin + 2, tableY + 5);
  doc.text("Valor", margin + 80, tableY + 5, { align: "right" });
  tableY += 8;

  doc.setFont("Montserrat", "normal");
  doc.setTextColor(31, 41, 55);
  viabilityMetrics.slice(1).forEach((row, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 243 : 255, 244, 246, 255);
    doc.rect(margin, tableY - 3, contentWidth, 6, "F");
    doc.text(row[0], margin + 2, tableY + 2);
    doc.text(row[1], margin + contentWidth - 2, tableY + 2, { align: "right" });
    tableY += 7;
  });

  // Footer
  doc.setFont("Montserrat", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "GIARDINO — Documento Confidencial de Apresentação de Investimento",
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" }
  );

  // Save
  doc.save("GIARDINO-Relatorio-Investimento-Premium.pdf");
}
