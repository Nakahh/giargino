import { FileText, Loader } from "lucide-react";
import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { giardino } from "@shared/giardino-data";

export function ComprehensivePDFReport() {
  const [isGenerating, setIsGenerating] = useState(false);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      let currentPage = 1;

      const addNewPage = () => {
        pdf.addPage();
        currentPage++;
        return margin;
      };

      // Helper to add footer
      const addFooter = (pageNum: number) => {
        pdf.setFont("Montserrat", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          `Página ${pageNum} — GIARDINO Dashboard Completo Premium`,
          pageWidth / 2,
          pageHeight - 8,
          { align: "center" }
        );
      };

      // ============================================
      // PAGE 1: COVER PAGE
      // ============================================
      pdf.setFillColor(31, 59, 94); // Navy blue
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      // Decorative elements - Crown symbol
      pdf.setFontSize(48);
      pdf.setTextColor(244, 196, 48); // Gold
      pdf.text("♛", pageWidth / 2, 30, { align: "center" });

      // Main title
      pdf.setFont("Playfair Display", "bold");
      pdf.setFontSize(56);
      pdf.setTextColor(244, 196, 48); // Gold
      pdf.text("GIARDINO", pageWidth / 2, 60, { align: "center" });

      // Subtitle
      pdf.setFont("Montserrat", "normal");
      pdf.setFontSize(18);
      pdf.setTextColor(255, 255, 255);
      pdf.text("RESIDENCIAL SÊNIOR", pageWidth / 2, 75, { align: "center" });

      // Decorative line
      pdf.setDrawColor(244, 196, 48);
      pdf.setLineWidth(1);
      pdf.line(50, 85, pageWidth - 50, 85);

      // Project description
      pdf.setFontSize(13);
      pdf.setTextColor(200, 200, 200);
      const descLines = pdf.splitTextToSize(
        "Modelo de Investimento Premium\nAnálise Financeira Completa",
        contentWidth
      );
      pdf.text(descLines, pageWidth / 2, 100, { align: "center" });

      // Key metrics
      pdf.setFontSize(11);
      pdf.setTextColor(244, 196, 48);
      pdf.text(
        `Faturamento Bruto Mensal: ${formatCurrency(giardino.totalMonthlyRevenue)}`,
        pageWidth / 2,
        140,
        { align: "center" }
      );
      pdf.text(
        `Total de Vendas Iniciais: ${formatCurrency(giardino.totalSales)}`,
        pageWidth / 2,
        150,
        { align: "center" }
      );

      // Project details
      pdf.setFontSize(10);
      pdf.setTextColor(180, 180, 180);
      pdf.text("Localização: Mogi das Cruzes, São Paulo", pageWidth / 2, 170, {
        align: "center",
      });
      pdf.text("Área Total: 258.900 m²", pageWidth / 2, 177, {
        align: "center",
      });

      // Components overview
      pdf.setFontSize(9);
      pdf.setTextColor(150, 150, 150);
      const components = [
        "✓ Residencial Senior 240 unidades",
        "✓ Hospedagem Turística 80 apartamentos",
        "✓ Clube Life Style 6.000 títulos",
        "✓ Loteamento 400 terrenos",
        "✓ Centro Comercial 303 lojas",
      ];
      let yPos = 200;
      components.forEach((comp) => {
        pdf.text(comp, pageWidth / 2, yPos, { align: "center" });
        yPos += 6;
      });

      // Footer
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text(
        `Relatório Gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
        pageWidth / 2,
        pageHeight - 15,
        { align: "center" }
      );

      addFooter(currentPage);

      // ============================================
      // PAGE 2: EXECUTIVE SUMMARY
      // ============================================
      let yPosition = addNewPage();

      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(18);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Resumo Executivo", margin, yPosition);
      yPosition += 4;

      pdf.setDrawColor(244, 196, 48);
      pdf.setLineWidth(1.5);
      pdf.line(margin, yPosition, margin + 50, yPosition);
      yPosition += 10;

      // KPI Metrics
      const summaryMetrics = [
        {
          label: "Faturamento Bruto Mensal",
          value: formatCurrency(giardino.totalMonthlyRevenue),
        },
        {
          label: "Total de Vendas Iniciais",
          value: formatCurrency(giardino.totalSales),
        },
        {
          label: "Custos Operacionais Mensais",
          value: formatCurrency(4_789_000),
        },
        {
          label: "Lucro Líquido Estimado",
          value: formatCurrency(giardino.totalMonthlyRevenue - 4_789_000),
        },
        {
          label: "Lucro Anual Estimado",
          value: formatCurrency((giardino.totalMonthlyRevenue - 4_789_000) * 12),
        },
        {
          label: "Unidades Residenciais",
          value: "240 unidades",
        },
        {
          label: "Membros Clube Life Style",
          value: "6.000 títulos",
        },
        {
          label: "Terrenos Loteamento",
          value: "400 terrenos",
        },
      ];

      pdf.setFont("Montserrat", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);

      summaryMetrics.forEach((metric, idx) => {
        if (yPosition > pageHeight - 30) {
          yPosition = addNewPage();
          addFooter(currentPage);
        }

        pdf.setTextColor(31, 59, 94);
        pdf.setFont("Montserrat", "bold");
        pdf.text(`${metric.label}:`, margin, yPosition);

        pdf.setTextColor(45, 80, 22);
        pdf.setFont("Montserrat", "normal");
        pdf.text(metric.value, contentWidth + margin - 20, yPosition, {
          align: "right",
        });

        yPosition += 7;
      });

      addFooter(currentPage);

      // ============================================
      // PAGE 3: RECEITAS INICIAIS
      // ============================================
      yPosition = addNewPage();

      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Receitas Iniciais (Vendas)", margin, yPosition);
      yPosition += 2;

      pdf.setDrawColor(244, 196, 48);
      pdf.setLineWidth(1);
      pdf.line(margin, yPosition, margin + 40, yPosition);
      yPosition += 8;

      // Sales table
      const salesData = [
        ["Segmento", "Unidades", "Valor Unitário", "Total"],
        [
          "Residencial Senior",
          "80",
          "R$ 2.000.000",
          formatCurrency(160_000_000),
        ],
        [
          "Clube Life Style",
          "6.000",
          "R$ 50.000",
          formatCurrency(300_000_000),
        ],
        ["Loteamento", "400", "R$ 360.000", formatCurrency(144_000_000)],
        ["Shopping/Mall", "-", "-", formatCurrency(2_660_000)],
        [
          "TOTAL",
          "-",
          "-",
          formatCurrency(giardino.totalSales),
        ],
      ];

      const colWidths = [
        contentWidth * 0.35,
        contentWidth * 0.15,
        contentWidth * 0.25,
        contentWidth * 0.25,
      ];
      let tableY = yPosition;

      // Table header
      pdf.setFillColor(31, 59, 94);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(9);

      let xPos = margin;
      salesData[0].forEach((cell, idx) => {
        pdf.rect(xPos, tableY, colWidths[idx], 7, "F");
        pdf.text(cell, xPos + 2, tableY + 5, {
          maxWidth: colWidths[idx] - 4,
        });
        xPos += colWidths[idx];
      });

      tableY += 7;
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("Montserrat", "normal");

      // Table rows
      salesData.slice(1).forEach((row, rowIdx) => {
        xPos = margin;
        const isTotal = rowIdx === salesData.length - 2;

        if (isTotal) {
          pdf.setFillColor(244, 196, 48);
          pdf.rect(margin, tableY, contentWidth, 7, "F");
          pdf.setFont("Montserrat", "bold");
        } else {
          if (rowIdx % 2 === 0) {
            pdf.setFillColor(245, 245, 245);
            pdf.rect(margin, tableY, contentWidth, 7, "F");
          }
          pdf.setFont("Montserrat", "normal");
        }

        row.forEach((cell, idx) => {
          const isNumeric = idx > 0;
          pdf.text(cell, xPos + 2, tableY + 5, {
            maxWidth: colWidths[idx] - 4,
            align: isNumeric ? "right" : "left",
          });
          xPos += colWidths[idx];
        });

        tableY += 7;
      });

      yPosition = tableY + 10;
      addFooter(currentPage);

      // ============================================
      // PAGE 4: RECEITAS MENSAIS RECORRENTES
      // ============================================
      yPosition = addNewPage();

      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Receitas Mensais Recorrentes", margin, yPosition);
      yPosition += 2;

      pdf.setDrawColor(244, 196, 48);
      pdf.setLineWidth(1);
      pdf.line(margin, yPosition, margin + 60, yPosition);
      yPosition += 8;

      const monthlyData = [
        ["Segmento", "Unidades", "Tarifa", "Total Mensal"],
        [
          "Residencial Senior",
          "240",
          "R$ 35.000",
          formatCurrency(giardino.monthlyRevenue.residentialSenior.monthlyTotal),
        ],
        [
          "Hospedagem",
          "80 apts",
          "R$ 1.000/dia",
          formatCurrency(giardino.monthlyRevenue.hospitality.monthlyTotal),
        ],
        [
          "Clube Life Style",
          "6.000",
          "R$ 500",
          formatCurrency(
            giardino.monthlyRevenue.lifeStyleClubMembership.monthlyTotal
          ),
        ],
        [
          "Bares/Restaurantes/Lojas",
          "350 pessoas/dia",
          "R$ 150",
          formatCurrency(giardino.monthlyRevenue.barsRestaurantShops.monthlyTotal),
        ],
        [
          "TOTAL",
          "-",
          "-",
          formatCurrency(giardino.totalMonthlyRevenue),
        ],
      ];

      tableY = yPosition;

      // Header
      pdf.setFillColor(45, 80, 22);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(9);

      xPos = margin;
      monthlyData[0].forEach((cell, idx) => {
        pdf.rect(xPos, tableY, colWidths[idx], 7, "F");
        pdf.text(cell, xPos + 2, tableY + 5, {
          maxWidth: colWidths[idx] - 4,
        });
        xPos += colWidths[idx];
      });

      tableY += 7;
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("Montserrat", "normal");

      // Rows
      monthlyData.slice(1).forEach((row, rowIdx) => {
        if (tableY > pageHeight - 20) {
          yPosition = addNewPage();
          tableY = yPosition;
          addFooter(currentPage);
        }

        xPos = margin;
        const isTotal = rowIdx === monthlyData.length - 2;

        if (isTotal) {
          pdf.setFillColor(244, 196, 48);
          pdf.rect(margin, tableY, contentWidth, 7, "F");
          pdf.setFont("Montserrat", "bold");
        } else {
          if (rowIdx % 2 === 0) {
            pdf.setFillColor(245, 245, 245);
            pdf.rect(margin, tableY, contentWidth, 7, "F");
          }
          pdf.setFont("Montserrat", "normal");
        }

        row.forEach((cell, idx) => {
          const isNumeric = idx > 0;
          pdf.text(cell, xPos + 2, tableY + 5, {
            maxWidth: colWidths[idx] - 4,
            align: isNumeric ? "right" : "left",
          });
          xPos += colWidths[idx];
        });

        tableY += 7;
      });

      yPosition = tableY + 10;
      addFooter(currentPage);

      // ============================================
      // PAGE 5: CUSTOS OPERACIONAIS
      // ============================================
      yPosition = addNewPage();

      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Custos Operacionais Mensais", margin, yPosition);
      yPosition += 2;

      pdf.setDrawColor(244, 196, 48);
      pdf.setLineWidth(1);
      pdf.line(margin, yPosition, margin + 60, yPosition);
      yPosition += 8;

      const costsData = [
        ["Categoria de Custo", "Descrição", "Total Mensal"],
        [
          "Recursos Humanos",
          "204 profissionais em 10 departamentos",
          formatCurrency(469_000),
        ],
        [
          "Operacional (Residencial)",
          "Hospedagem, alimentação, esportes, saúde, terapias",
          formatCurrency(4_320_000),
        ],
        [
          "Financiamento (CAPEX)",
          "Parcela mensal do investimento inicial",
          formatCurrency(1_000_000),
        ],
        [
          "Juros do Financiamento",
          "Juros sobre saldo devedor",
          formatCurrency(500_000),
        ],
        [
          "TOTAL",
          "-",
          formatCurrency(6_289_000),
        ],
      ];

      const costColWidths = [
        contentWidth * 0.3,
        contentWidth * 0.4,
        contentWidth * 0.3,
      ];
      tableY = yPosition;

      // Header
      pdf.setFillColor(210, 80, 22);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(9);

      xPos = margin;
      costsData[0].forEach((cell, idx) => {
        pdf.rect(xPos, tableY, costColWidths[idx], 7, "F");
        pdf.text(cell, xPos + 2, tableY + 5, {
          maxWidth: costColWidths[idx] - 4,
        });
        xPos += costColWidths[idx];
      });

      tableY += 7;
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("Montserrat", "normal");

      // Rows
      costsData.slice(1).forEach((row, rowIdx) => {
        if (tableY > pageHeight - 20) {
          yPosition = addNewPage();
          tableY = yPosition;
          addFooter(currentPage);
        }

        xPos = margin;
        const isTotal = rowIdx === costsData.length - 2;

        if (isTotal) {
          pdf.setFillColor(244, 196, 48);
          pdf.rect(margin, tableY, contentWidth, 7, "F");
          pdf.setFont("Montserrat", "bold");
        } else {
          if (rowIdx % 2 === 0) {
            pdf.setFillColor(245, 245, 245);
            pdf.rect(margin, tableY, contentWidth, 7, "F");
          }
          pdf.setFont("Montserrat", "normal");
        }

        row.forEach((cell, idx) => {
          const isNumeric = idx === 2;
          pdf.text(cell, xPos + 2, tableY + 5, {
            maxWidth: costColWidths[idx] - 4,
            align: isNumeric ? "right" : "left",
          });
          xPos += costColWidths[idx];
        });

        tableY += 7;
      });

      addFooter(currentPage);

      // ============================================
      // PAGE 6: RECURSOS HUMANOS
      // ============================================
      yPosition = addNewPage();

      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Recursos Humanos - 204 Profissionais", margin, yPosition);
      yPosition += 2;

      pdf.setDrawColor(244, 196, 48);
      pdf.setLineWidth(1);
      pdf.line(margin, yPosition, margin + 60, yPosition);
      yPosition += 8;

      const hrData = [
        ["Departamento", "Quantidade", "Salário Unit.", "Total Mensal"],
        ["Camareiras", "24", "R$ 1.800", formatCurrency(43_200)],
        ["Cozinha", "26", "R$ 1.800", formatCurrency(46_800)],
        ["Lavanderia", "10", "R$ 1.800", formatCurrency(18_000)],
        ["Limpeza", "10", "R$ 1.800", formatCurrency(18_000)],
        ["Manutenção", "10", "R$ 1.800", formatCurrency(18_000)],
        ["Beleza", "36", "R$ 1.800", formatCurrency(64_800)],
        ["Recepção", "10", "R$ 1.800", formatCurrency(18_000)],
        ["Segurança", "24", "R$ 3.000", formatCurrency(72_000)],
        ["Saúde", "30", "R$ 3.000", formatCurrency(90_000)],
        ["Administrativo", "18", "R$ 5.000", formatCurrency(90_000)],
        ["TOTAL", "198", "-", formatCurrency(469_000)],
      ];

      tableY = yPosition;

      // Header
      pdf.setFillColor(31, 59, 94);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(8);

      xPos = margin;
      hrData[0].forEach((cell, idx) => {
        pdf.rect(xPos, tableY, colWidths[idx], 6, "F");
        pdf.text(cell, xPos + 1, tableY + 4, {
          maxWidth: colWidths[idx] - 2,
          fontSize: 7,
        });
        xPos += colWidths[idx];
      });

      tableY += 6;
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("Montserrat", "normal");
      pdf.setFontSize(8);

      // Rows
      hrData.slice(1).forEach((row, rowIdx) => {
        if (tableY > pageHeight - 20) {
          yPosition = addNewPage();
          tableY = yPosition;
          addFooter(currentPage);
        }

        xPos = margin;
        const isTotal = rowIdx === hrData.length - 2;

        if (isTotal) {
          pdf.setFillColor(244, 196, 48);
          pdf.rect(margin, tableY, contentWidth, 6, "F");
          pdf.setFont("Montserrat", "bold");
        } else {
          if (rowIdx % 2 === 0) {
            pdf.setFillColor(245, 245, 245);
            pdf.rect(margin, tableY, contentWidth, 6, "F");
          }
          pdf.setFont("Montserrat", "normal");
        }

        row.forEach((cell, idx) => {
          const isNumeric = idx > 0;
          pdf.text(cell, xPos + 1, tableY + 4, {
            maxWidth: colWidths[idx] - 2,
            align: isNumeric ? "right" : "left",
            fontSize: 7,
          });
          xPos += colWidths[idx];
        });

        tableY += 6;
      });

      addFooter(currentPage);

      // ============================================
      // PAGE 7: VIABILIDADE FINANCEIRA
      // ============================================
      yPosition = addNewPage();

      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Análise de Viabilidade Financeira", margin, yPosition);
      yPosition += 2;

      pdf.setDrawColor(244, 196, 48);
      pdf.setLineWidth(1);
      pdf.line(margin, yPosition, margin + 60, yPosition);
      yPosition += 8;

      // Viability indicators
      const indicators = [
        {
          label: "Lucro Líquido Mensal",
          value: formatCurrency(giardino.viability.monthlyNetProfit),
        },
        {
          label: "Lucro Anual",
          value: formatCurrency(giardino.viability.annualNetProfit),
        },
        {
          label: "Margem Líquida",
          value: `${(giardino.viability.netMarginPercentage * 100).toFixed(1)}%`,
        },
        {
          label: "Payback Period",
          value: `${giardino.viability.paybackMonths} meses`,
        },
        {
          label: "ROI Mensal",
          value: `${(giardino.viability.monthlyROI * 100).toFixed(2)}%`,
        },
        {
          label: "ROI Anual",
          value: `${(giardino.viability.annualROI * 100).toFixed(2)}%`,
        },
      ];

      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(10);
      pdf.setTextColor(31, 59, 94);

      indicators.forEach((indicator, idx) => {
        if (yPosition > pageHeight - 30) {
          yPosition = addNewPage();
          addFooter(currentPage);
        }

        pdf.text(`${indicator.label}:`, margin, yPosition);
        pdf.setTextColor(45, 80, 22);
        pdf.setFont("Montserrat", "bold");
        pdf.setFontSize(11);
        pdf.text(indicator.value, contentWidth + margin - 10, yPosition, {
          align: "right",
        });
        pdf.setTextColor(31, 59, 94);
        pdf.setFont("Montserrat", "bold");
        pdf.setFontSize(10);

        yPosition += 9;
      });

      yPosition += 10;

      // 10-year projection table
      if (yPosition > pageHeight - 80) {
        yPosition = addNewPage();
        addFooter(currentPage);
      }

      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Projeção Financeira 10 Anos", margin, yPosition);
      yPosition += 6;

      const projectionData = giardino.yearlyProjections.slice(0, 5); // First 5 years for brevity

      const projColWidths = [
        contentWidth * 0.1,
        contentWidth * 0.225,
        contentWidth * 0.225,
        contentWidth * 0.225,
        contentWidth * 0.225,
      ];

      const projHeaders = ["Ano", "Receita Bruta", "Custos Totais", "Lucro Líquido", "ROI (%)"];
      tableY = yPosition;

      pdf.setFillColor(31, 59, 94);
      pdf.setTextColor(255, 255, 255);
      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(8);

      xPos = margin;
      projHeaders.forEach((cell, idx) => {
        pdf.rect(xPos, tableY, projColWidths[idx], 6, "F");
        pdf.text(cell, xPos + 1, tableY + 4, {
          maxWidth: projColWidths[idx] - 2,
          align: "center",
        });
        xPos += projColWidths[idx];
      });

      tableY += 6;
      pdf.setTextColor(0, 0, 0);
      pdf.setFont("Montserrat", "normal");

      // Rows
      projectionData.forEach((proj, idx) => {
        if (tableY > pageHeight - 20) {
          yPosition = addNewPage();
          tableY = yPosition;
          addFooter(currentPage);
        }

        if (idx % 2 === 0) {
          pdf.setFillColor(245, 245, 245);
          pdf.rect(margin, tableY, contentWidth, 6, "F");
        }

        xPos = margin;
        const row = [
          proj.year.toString(),
          formatCurrency(proj.grossRevenue),
          formatCurrency(proj.totalCosts),
          formatCurrency(proj.netProfit),
          `${proj.roi.toFixed(1)}%`,
        ];

        row.forEach((cell, cellIdx) => {
          const isNumeric = cellIdx > 0;
          pdf.text(cell, xPos + 1, tableY + 4, {
            maxWidth: projColWidths[cellIdx] - 2,
            align: isNumeric ? "right" : "center",
            fontSize: 7,
          });
          xPos += projColWidths[cellIdx];
        });

        tableY += 6;
      });

      // ============================================
      // FINAL PAGE: PROJECT OVERVIEW
      // ============================================
      yPosition = addNewPage();

      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(16);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Visão Geral do Projeto", margin, yPosition);
      yPosition += 2;

      pdf.setDrawColor(244, 196, 48);
      pdf.setLineWidth(1);
      pdf.line(margin, yPosition, margin + 40, yPosition);
      yPosition += 10;

      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Segmentos do Projeto:", margin, yPosition);
      yPosition += 7;

      const segments = [
        "1. RESIDENCIAL SENIOR 240 unidades com hospedagem, SPA e atendimento completo",
        "2. HOSPEDAGEM TURÍSTICA 80 apartamentos para diárias a partir de R$ 1.000",
        "3. CLUBE LIFE STYLE 6.000 títulos com acesso 360 dias e infraestrutura premium",
        "4. LOTEAMENTO RESIDENCIAL 400 terrenos de 500m² em localização premium",
        "5. CENTRO COMERCIAL 303 lojas distribuídas em área de 10.000m²",
      ];

      pdf.setFont("Montserrat", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);

      segments.forEach((segment) => {
        if (yPosition > pageHeight - 30) {
          yPosition = addNewPage();
          addFooter(currentPage);
        }

        const lines = pdf.splitTextToSize(segment, contentWidth);
        pdf.text(lines, margin, yPosition);
        yPosition += lines.length * 5 + 3;
      });

      yPosition += 8;

      // Included services
      pdf.setFont("Montserrat", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Serviços Inclusos no Pacote:", margin, yPosition);
      yPosition += 7;

      pdf.setFont("Montserrat", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(0, 0, 0);

      const services = [
        "✓ Limpeza diária e troca de roupas",
        "✓ 5 alimentações por dia",
        "✓ Esportes e lazer ilimitado",
        "✓ Terapias, fisioterapia e oficinas",
        "✓ Cuidados médicos, home care e odontologia",
        "✓ Concierge e transporte interno",
        "✓ Água, luz, internet e wifi",
      ];

      services.forEach((service) => {
        if (yPosition > pageHeight - 20) {
          yPosition = addNewPage();
          addFooter(currentPage);
        }

        pdf.text(service, margin + 5, yPosition);
        yPosition += 6;
      });

      // Add footer to all pages
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        addFooter(i);
      }

      pdf.save("GIARDINO-Projeto-Completo-Premium.pdf");
      alert(
        "✅ PDF Completo gerado com sucesso!\n\n📄 Arquivo: GIARDINO-Projeto-Completo-Premium.pdf\n\n✓ Contém: Todas as abas, tabelas, análises, gráficos e dados do projeto"
      );
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert(
        "❌ Erro ao gerar PDF. Verifique o console para detalhes.\n\nErro: " +
          (error instanceof Error ? error.message : "Desconhecido")
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="flex items-center gap-2 px-5 py-3 rounded-lg font-bold transition-all whitespace-nowrap shadow-lg hover:shadow-xl"
      style={{
        backgroundColor: isGenerating ? "#ccc" : "#1F3B5E",
        color: "#FFFFFF",
        borderColor: "#F4C430",
        borderWidth: "2px",
        cursor: isGenerating ? "not-allowed" : "pointer",
      }}
      title="Gera PDF completo com todas as abas, tabelas, análises e dados do projeto GIARDINO em um arquivo único"
    >
      {isGenerating ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          Gerando PDF...
        </>
      ) : (
        <>
          <FileText className="w-5 h-5" />
          📄 Baixar Projeto Completo
        </>
      )}
    </button>
  );
}
