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

interface TableRow {
  [key: string]: string | number;
}

function addTableToPDF(
  doc: jsPDF,
  startY: number,
  headers: string[],
  rows: TableRow[],
  columnWidths: number[],
  options: {
    margin?: number;
    headerBgColor?: string;
    headerTextColor?: string;
    alternateRowColor?: boolean;
    fontSize?: number;
  } = {}
): number {
  const margin = options.margin || 15;
  const pageWidth = doc.internal.pageSize.getWidth();
  const headerBg = options.headerBgColor || "#0F3460";
  const headerText = options.headerTextColor || "#FFFFFF";
  const fontSize = options.fontSize || 9;
  const contentWidth = pageWidth - 2 * margin;

  let y = startY;
  const rowHeight = 7;

  doc.setFont("Montserrat", "bold");
  doc.setFontSize(fontSize);

  // Header
  const headerRGB = headerBg.match(/\w\w/g)!.map(x => parseInt(x, 16));
  doc.setFillColor(headerRGB[0], headerRGB[1], headerRGB[2]);
  doc.setTextColor(...(headerText === "#FFFFFF" ? [255, 255, 255] : [31, 41, 55]));

  let xPos = margin;
  headers.forEach((header, i) => {
    doc.text(header, xPos + 1, y + 4, { maxWidth: columnWidths[i] - 2 });
    xPos += columnWidths[i];
  });
  y += rowHeight;

  // Rows
  doc.setFont("Montserrat", "normal");
  doc.setTextColor(31, 41, 55);

  rows.forEach((row, rowIdx) => {
    // Check if we need a new page
    if (y > doc.internal.pageSize.getHeight() - 20) {
      doc.addPage();
      y = margin;
    }

    const isLastRow = rowIdx === rows.length - 1;
    const bgColor = isLastRow ? "#D4AF37" : (options.alternateRowColor && rowIdx % 2 === 0 ? "#F3F4F6" : "#FFFFFF");
    const bgRGB = bgColor.match(/\w\w/g)!.map(x => parseInt(x, 16));

    doc.setFillColor(bgRGB[0], bgRGB[1], bgRGB[2]);
    doc.rect(margin, y - rowHeight + 1, contentWidth, rowHeight, "F");

    if (isLastRow) {
      doc.setFont("Montserrat", "bold");
      doc.setTextColor(15, 52, 96);
    }

    xPos = margin;
    headers.forEach((header, i) => {
      const value = String(row[header.toLowerCase().replace(/\s/g, '')] || '');
      const isNumeric = !isNaN(Number(value.replace(/[^\d.-]/g, '')));
      doc.text(value, xPos + 1, y + 2, {
        maxWidth: columnWidths[i] - 2,
        align: isNumeric ? "right" : "left"
      });
      xPos += columnWidths[i];
    });

    y += rowHeight;
    doc.setFont("Montserrat", "normal");
    doc.setTextColor(31, 41, 55);
  });

  return y + 3;
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

  // ========== PÁGINA 5: DETALHES DE RH ==========
  doc.addPage();
  yPosition = margin;

  doc.setFont("Playfair Display", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 52, 96);
  doc.text("Estrutura de Recursos Humanos (204 Funcionários)", margin, yPosition);
  yPosition += 12;

  const hrData = [
    ["Departamento", "Quantidade", "Salário Unit.", "Total Mensal"],
    ["Camareiras", "24", "R$ 1.800", formatCurrency(43_200)],
    ["Cozinheiras + Auxiliares", "26", "R$ 1.800", formatCurrency(46_800)],
    ["Lavanderia", "10", "R$ 1.800", formatCurrency(18_000)],
    ["Limpeza (Áreas Comuns)", "10", "R$ 1.800", formatCurrency(18_000)],
    ["Jardineiros + Piscineiros", "10", "R$ 1.800", formatCurrency(18_000)],
    ["Beleza (Cabelo/Manicure/Depilar)", "36", "R$ 1.800", formatCurrency(64_800)],
    ["Recepcionistas", "10", "R$ 1.800", formatCurrency(18_000)],
    ["Segurança (24h)", "24", "R$ 3.000", formatCurrency(72_000)],
    ["Enfermeiros/Saúde", "30", "R$ 3.000", formatCurrency(90_000)],
    ["Administrativo + Marketing", "18", "R$ 5.000", formatCurrency(90_000)],
    ["TOTAL RH", "204", "", formatCurrency(469_000)],
  ];

  doc.setFont("Montserrat", "normal");
  doc.setFontSize(9);
  tableY = yPosition;
  const colW = contentWidth / 4;

  // Header
  doc.setFillColor(15, 52, 96);
  doc.setTextColor(255, 255, 255);
  doc.setFont("Montserrat", "bold");
  hrData[0].forEach((header, i) => {
    doc.text(header, margin + i * colW + 1, tableY + 4, { maxWidth: colW - 2 });
  });
  tableY += 7;

  // Rows
  doc.setFont("Montserrat", "normal");
  doc.setTextColor(31, 41, 55);
  hrData.slice(1).forEach((row, idx) => {
    if (idx === hrData.length - 2) {
      doc.setFillColor(212, 175, 55);
      doc.setFont("Montserrat", "bold");
      doc.setTextColor(15, 52, 96);
    } else {
      doc.setFillColor(idx % 2 === 0 ? 243 : 255, 244, 246, 255);
    }
    doc.rect(margin, tableY - 3, contentWidth, 6, "F");

    row.forEach((cell, i) => {
      const isNum = !isNaN(Number(cell.replace(/[^\d.-]/g, '')));
      doc.text(cell, margin + i * colW + 1, tableY + 2, {
        maxWidth: colW - 2,
        align: isNum && i > 0 ? "right" : "left"
      });
    });
    tableY += 7;
    doc.setFont("Montserrat", "normal");
    doc.setTextColor(31, 41, 55);
  });

  // ========== PÁGINA 6: CUSTOS RESIDENCIAIS DETALHADOS ==========
  yPosition = tableY + 12;
  if (yPosition > pageHeight - 80) {
    doc.addPage();
    yPosition = margin;
  }

  doc.setFont("Playfair Display", "bold");
  doc.setFontSize(16);
  doc.setTextColor(15, 52, 96);
  doc.text("Custos Operacionais (240 Unidades Residenciais)", margin, yPosition);
  yPosition += 12;

  const residentialCostsData = [
    ["Categoria", "Por Unidade", "240 Unidades", "% Custo Total"],
    ["Hospedagem", "R$ 4.500", formatCurrency(1_080_000), "25.0%"],
    ["Alimentação (5 refeições)", "R$ 6.000", formatCurrency(1_440_000), "33.3%"],
    ["Esporte e Lazer", "R$ 2.400", formatCurrency(576_000), "13.3%"],
    ["Cuidados Médicos/Home Care", "R$ 2.400", formatCurrency(576_000), "13.3%"],
    ["Terapias/Fisioterapia/Oficinas", "R$ 2.400", formatCurrency(576_000), "13.3%"],
    ["Cuidados Pessoais", "R$ 300", formatCurrency(72_000), "1.7%"],
    ["TOTAL MENSAL", "R$ 18.000", formatCurrency(4_320_000), "100%"],
  ];

  doc.setFont("Montserrat", "normal");
  doc.setFontSize(9);
  tableY = yPosition;

  doc.setFillColor(6, 95, 70);
  doc.setTextColor(255, 255, 255);
  doc.setFont("Montserrat", "bold");
  residentialCostsData[0].forEach((header, i) => {
    doc.text(header, margin + i * colW + 1, tableY + 4, { maxWidth: colW - 2 });
  });
  tableY += 7;

  doc.setFont("Montserrat", "normal");
  doc.setTextColor(31, 41, 55);
  residentialCostsData.slice(1).forEach((row, idx) => {
    if (idx === residentialCostsData.length - 2) {
      doc.setFillColor(212, 175, 55);
      doc.setFont("Montserrat", "bold");
      doc.setTextColor(15, 52, 96);
    } else {
      doc.setFillColor(idx % 2 === 0 ? 243 : 255, 244, 246, 255);
    }
    doc.rect(margin, tableY - 3, contentWidth, 6, "F");

    row.forEach((cell, i) => {
      doc.text(cell, margin + i * colW + 1, tableY + 2, {
        maxWidth: colW - 2,
        align: i > 0 ? "right" : "left"
      });
    });
    tableY += 7;
    doc.setFont("Montserrat", "normal");
    doc.setTextColor(31, 41, 55);
  });

  // ========== PÁGINA 7: SERVIÇOS INCLUSOS NO PACOTE ==========
  yPosition = tableY + 12;
  if (yPosition > pageHeight - 100) {
    doc.addPage();
    yPosition = margin;
  }

  doc.setFont("Playfair Display", "bold");
  doc.setFontSize(16);
  doc.setTextColor(15, 52, 96);
  doc.text("Serviços Inclusos no Pacote Residencial", margin, yPosition);
  yPosition += 10;

  doc.setFont("Montserrat", "normal");
  doc.setFontSize(9);
  doc.setTextColor(31, 41, 55);

  const includedServices = [
    "Limpeza diária do apartamento",
    "Trocas de roupa de cama e banho 3x/semana",
    "Toalhas de piscina diariamente",
    "Lavanderia completa 1x/semana",
    "5 refeições balanceadas por dia",
    "1 atividade esportiva/dia",
    "Terapia ou fisioterapia 3x/semana + 2 oficinas",
    "Cuidados médicos e home care 24/7",
    "Sala de jogos livre acesso",
    "8 festas e eventos por mês",
    "Serviço emergencial de ambulância",
    "Concierge e serviço de mordomo",
    "Transporte interno gratuito",
    "Água, luz e internet ilimitada",
    "Manicure/pedicure 4x/mês",
    "Cabelereiro 4x/mês",
    "Limpeza de pele 2x/mês",
    "Depilação 2x/mês",
  ];

  let col1 = 0, col2 = 0;
  const serviceY = yPosition;
  let currentY = serviceY;
  const midPoint = Math.ceil(includedServices.length / 2);

  doc.setFillColor(252, 211, 77);
  doc.rect(margin, currentY - 2, contentWidth / 2 - 2, 6, "F");
  doc.setFont("Montserrat", "bold");
  doc.setTextColor(15, 52, 96);
  doc.text("TIPO DE SERVIÇO", margin + 2, currentY + 2);

  doc.rect(margin + contentWidth / 2, currentY - 2, contentWidth / 2 - 2, 6, "F");
  doc.text("TIPO DE SERVIÇO", margin + contentWidth / 2 + 2, currentY + 2);
  currentY += 8;

  doc.setFont("Montserrat", "normal");
  doc.setTextColor(31, 41, 55);
  doc.setFontSize(8);

  includedServices.forEach((service, idx) => {
    if (idx === midPoint) {
      currentY = serviceY + 8;
    }
    const xPos = idx < midPoint ? margin + 2 : margin + contentWidth / 2 + 2;
    const maxY = idx < midPoint ? currentY : currentY;

    if (maxY > pageHeight - 30) {
      doc.addPage();
      currentY = margin;
    }

    doc.text(`• ${service}`, xPos, currentY);
    if (idx < midPoint) {
      currentY += 5;
    } else {
      currentY += 5;
    }
  });

  // ========== PÁGINA 8: ESTRUTURA DO PROJETO ==========
  doc.addPage();
  yPosition = margin;

  doc.setFont("Playfair Display", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 52, 96);
  doc.text("Estrutura Completa do Projeto", margin, yPosition);
  yPosition += 12;

  const projectStructure = [
    {
      title: "Residencial Senior + SPA",
      details: [
        "240 unidades habitacionais",
        "Serviços all-inclusive especializados",
        "SPA para tratamento de ansiedade, depressão e estresse",
        "Cuidados 24/7 com equipe especializada",
      ]
    },
    {
      title: "Hospedagem (Pousada/Hotel)",
      details: [
        "80 apartamentos de hospedagem",
        "Diária: R$ 1.200 (all-inclusive)",
        "Taxa de ocupação estimada: 30%",
        "Público: turismo e visitantes de associados",
      ]
    },
    {
      title: "Clube Life Style",
      details: [
        "6.000 membros com títulos de fração ideal",
        "Acesso 360 dias/ano a toda estrutura",
        "Mensalidade: R$ 500/mês",
        "Direito de uso completo das instalações",
      ]
    },
    {
      title: "Loteamento Residencial",
      details: [
        "400 terrenos de 500m² cada",
        "Preço: R$ 360.000 por terreno",
        "Todos os proprietários ganham acesso ao clube",
        "Área para residências permanentes",
      ]
    },
    {
      title: "Centro Comercial (Shopping)",
      details: [
        "200 lojas comerciais (50m²)",
        "50 lojas de alimentação",
        "Supermercado, farmácia, drogaria",
        "Cinemas, pet shop, posto de gasolina",
      ]
    },
  ];

  projectStructure.forEach((section) => {
    if (yPosition > pageHeight - 60) {
      doc.addPage();
      yPosition = margin;
    }

    doc.setFont("Montserrat", "bold");
    doc.setFontSize(11);
    doc.setTextColor(15, 52, 96);
    doc.text(section.title, margin, yPosition);
    yPosition += 6;

    doc.setFont("Montserrat", "normal");
    doc.setFontSize(9);
    doc.setTextColor(31, 41, 55);
    section.details.forEach((detail) => {
      doc.text(`• ${detail}`, margin + 5, yPosition);
      yPosition += 5;
    });
    yPosition += 2;
  });

  // ========== PÁGINA 9: RESUMO FINAL E NOTAS ==========
  doc.addPage();
  yPosition = margin;

  doc.setFont("Playfair Display", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 52, 96);
  doc.text("Síntese de Investimento", margin, yPosition);
  yPosition += 12;

  doc.setLineWidth(1);
  doc.setDrawColor(212, 175, 55);
  doc.line(margin, yPosition, margin + 80, yPosition);
  yPosition += 8;

  doc.setFont("Montserrat", "bold");
  doc.setFontSize(12);
  doc.setTextColor(15, 52, 96);

  const synthesisData = [
    { label: "INVESTIMENTO TOTAL", value: formatCurrency(250_000_000) },
    { label: "RECEITA MENSAL BRUTA", value: formatCurrency(giardino.totalMonthlyRevenue) },
    { label: "RECEITA ANUAL BRUTA", value: formatCurrency(giardino.totalMonthlyRevenue * 12) },
    { label: "CUSTOS MENSAIS TOTAIS", value: formatCurrency(469_000 + 4_320_000 + 1_500_000) },
    { label: "LUCRO MENSAL LÍQUIDO", value: formatCurrency(giardino.totalMonthlyRevenue - (469_000 + 4_320_000 + 1_500_000)) },
    { label: "LUCRO ANUAL LÍQUIDO", value: formatCurrency((giardino.totalMonthlyRevenue - (469_000 + 4_320_000 + 1_500_000)) * 12) },
    { label: "TAXA DE LUCRATIVIDADE", value: "71.6%" },
    { label: "PAYBACK ESTIMADO", value: "~13 meses" },
    { label: "BREAK-EVEN", value: "~11 meses" },
    { label: "ROI ANUAL", value: "64.2%" },
  ];

  doc.setFontSize(10);
  synthesisData.forEach((item) => {
    doc.setTextColor(15, 52, 96);
    doc.setFont("Montserrat", "bold");
    doc.text(item.label, margin, yPosition, { maxWidth: contentWidth / 2 });
    doc.setFont("Montserrat", "bold");
    doc.setTextColor(212, 175, 55);
    doc.text(item.value, margin + contentWidth / 2, yPosition, { align: "right" });
    yPosition += 7;
  });

  yPosition += 5;
  doc.setLineWidth(1);
  doc.setDrawColor(212, 175, 55);
  doc.line(margin, yPosition, margin + contentWidth, yPosition);
  yPosition += 8;

  doc.setFont("Montserrat", "normal");
  doc.setFontSize(9);
  doc.setTextColor(31, 41, 55);
  doc.text(
    "Este documento é um relatório executivo confidencial preparado para fins de apresentação de investimento. Todos os valores são baseados em projeções e estimativas realizadas a partir dos dados fornecidos. Recomenda-se análise detalhada com consultores especializados antes de qualquer decisão de investimento.",
    margin,
    yPosition,
    { maxWidth: contentWidth, align: "justify" }
  );

  // Footer
  yPosition = pageHeight - 15;
  doc.setFont("Montserrat", "normal");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(
    "GIARDINO — Residencial Sênior Premium | Documento Confidencial | " + new Date().getFullYear(),
    pageWidth / 2,
    yPosition,
    { align: "center" }
  );

  // Save
  doc.save("GIARDINO-Relatorio-Investimento-Premium.pdf");
}
