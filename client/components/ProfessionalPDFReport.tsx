import { FileText, Loader } from "lucide-react";
import { useState } from "react";
import jsPDF from "jspdf";
import { giardino } from "@shared/giardino-data";

export function ProfessionalPDFReport() {
  const [isGenerating, setIsGenerating] = useState(false);

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
      let yPosition = margin;

      // ============================================
      // PAGE 1: COVER PAGE
      // ============================================
      pdf.setFillColor(31, 59, 94); // Navy blue
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      // Crown symbol
      pdf.setFontSize(40);
      pdf.setTextColor(244, 196, 48); // Gold
      pdf.text("♛", pageWidth / 2, pageHeight / 4 - 10, { align: "center" });

      // Title
      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(48);
      pdf.setTextColor(244, 196, 48);
      pdf.text("GIARDINO", pageWidth / 2, pageHeight / 4 + 20, { align: "center" });

      // Subtitle
      pdf.setFont("Helvetica", "normal");
      pdf.setFontSize(20);
      pdf.setTextColor(255, 255, 255);
      pdf.text("Residencial Senior", pageWidth / 2, pageHeight / 4 + 35, {
        align: "center",
      });

      // Description
      pdf.setFontSize(14);
      pdf.setTextColor(200, 200, 200);
      const descriptionText = [
        "Modelo de Investimento Premium",
        "Análise Financeira Completa",
      ];
      let descY = pageHeight / 3 + 20;
      descriptionText.forEach((text) => {
        pdf.text(text, pageWidth / 2, descY, { align: "center" });
        descY += 8;
      });

      // Key metrics on cover
      pdf.setFontSize(11);
      pdf.setTextColor(244, 196, 48);
      pdf.text(`Faturamento Bruto Mensal: R$ 13,7 Mi`, pageWidth / 2, pageHeight / 2 + 20, {
        align: "center",
      });
      pdf.text(`Investimento Total: R$ 604,6 Mi`, pageWidth / 2, pageHeight / 2 + 30, {
        align: "center",
      });

      // Footer
      pdf.setFontSize(10);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `Gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
        pageWidth / 2,
        pageHeight - 20,
        { align: "center" }
      );

      // ============================================
      // PAGE 2: EXECUTIVE SUMMARY
      // ============================================
      pdf.addPage();
      yPosition = margin;

      // Title
      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(20);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Resumo Executivo", margin, yPosition);
      yPosition += 12;

      // Underline
      pdf.setDrawColor(244, 196, 48);
      pdf.setLineWidth(1);
      pdf.line(margin, yPosition - 4, margin + 40, yPosition - 4);
      yPosition += 8;

      // Key metrics table
      pdf.setFont("Helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);

      const metrics = [
        { label: "Faturamento Bruto Mensal", value: "R$ 13.731.000" },
        { label: "Total de Vendas Iniciais", value: "R$ 604.660.000" },
        { label: "Custos Operacionais Mensais", value: "R$ 4.789.000" },
        { label: "Lucro Líquido Estimado Mensal", value: "R$ 7.441.000" },
        { label: "Unidades Residenciais Senior", value: "240 unidades" },
        { label: "Membros Clube Life Style", value: "6.000 títulos" },
        { label: "Terrenos no Loteamento", value: "400 terrenos" },
        { label: "Lojas no Shopping", value: "303 lojas" },
      ];

      metrics.forEach((metric) => {
        pdf.setTextColor(31, 59, 94);
        pdf.setFont("Helvetica", "bold");
        pdf.text(`${metric.label}:`, margin, yPosition);
        
        pdf.setTextColor(45, 80, 22);
        pdf.setFont("Helvetica", "normal");
        pdf.text(metric.value, contentWidth - 40, yPosition, { align: "right" });
        yPosition += 8;
      });

      yPosition += 8;

      // Description section
      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(12);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Descrição do Projeto", margin, yPosition);
      yPosition += 6;

      pdf.setFont("Helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(0, 0, 0);
      const description = pdf.splitTextToSize(
        "O GIARDINO é um projeto complexo e inovador que combina Residencial Senior com Clube Life Style, Loteamento Residencial e Centro Comercial (Shopping/Mall) em uma área total de 258.900 m² localizada em Mogi das Cruzes, São Paulo. O projeto oferece um modelo de investimento premium com múltiplos fluxos de receita e um retorno financeiro superior ao mercado.",
        contentWidth
      );
      pdf.text(description, margin, yPosition);
      yPosition += description.length * 5 + 5;

      // ============================================
      // PAGE 3+: DETAILED FINANCIAL DATA
      // ============================================
      pdf.addPage();
      yPosition = margin;

      // Sales data table
      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Receitas Iniciais (CAPEX)", margin, yPosition);
      yPosition += 10;

      // Create table for initial sales
      const salesTableData = [
        ["Segmento", "Unidades", "Valor Unit.", "Total"],
        [
          "Residencial Senior",
          "80",
          "R$ 2.000.000",
          "R$ 160.000.000",
        ],
        [
          "Clube Life Style",
          "6.000",
          "R$ 50.000",
          "R$ 300.000.000",
        ],
        [
          "Loteamento",
          "400",
          "R$ 360.000",
          "R$ 144.000.000",
        ],
        [
          "Shopping/Mall",
          "-",
          "-",
          "R$ 2.660.000",
        ],
        [
          "TOTAL",
          "-",
          "-",
          "R$ 606.660.000",
        ],
      ];

      pdf.setFont("Helvetica", "normal");
      pdf.setFontSize(9);
      let tableY = yPosition;

      // Table header
      pdf.setFillColor(31, 59, 94);
      pdf.setTextColor(255, 255, 255);
      const colWidths = [contentWidth * 0.3, contentWidth * 0.2, contentWidth * 0.25, contentWidth * 0.25];
      let xPos = margin;

      salesTableData[0].forEach((cell, idx) => {
        pdf.rect(xPos, tableY, colWidths[idx], 6, "F");
        pdf.text(cell, xPos + 2, tableY + 4, { maxWidth: colWidths[idx] - 2 });
        xPos += colWidths[idx];
      });

      tableY += 6;
      pdf.setTextColor(0, 0, 0);

      // Table rows
      salesTableData.slice(1).forEach((row, rowIdx) => {
        xPos = margin;
        const isTotal = rowIdx === salesTableData.length - 2;

        if (isTotal) {
          pdf.setFillColor(244, 196, 48);
          pdf.rect(margin, tableY, contentWidth, 6, "F");
          pdf.setFont("Helvetica", "bold");
        } else {
          if (rowIdx % 2 === 0) {
            pdf.setFillColor(240, 240, 240);
            pdf.rect(margin, tableY, contentWidth, 6, "F");
          }
          pdf.setFont("Helvetica", "normal");
        }

        row.forEach((cell, idx) => {
          const align = idx > 0 ? "right" : "left";
          pdf.text(
            cell,
            xPos + (align === "right" ? colWidths[idx] - 2 : 2),
            tableY + 4,
            { maxWidth: colWidths[idx] - 2, align }
          );
          xPos += colWidths[idx];
        });

        tableY += 6;
      });

      yPosition = tableY + 8;

      // Monthly revenue section
      if (yPosition > pageHeight - 50) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Receitas Mensais Recorrentes", margin, yPosition);
      yPosition += 10;

      const monthlyRevenueData = [
        ["Segmento", "Unidades", "Tarifa", "Total Mensal"],
        [
          "Residencial Senior",
          "240",
          "R$ 35.000",
          "R$ 8.400.000",
        ],
        [
          "Hospedagem",
          "80 apts",
          "R$ 1.000/dia",
          "R$ 756.000",
        ],
        [
          "Clube Life Style",
          "6.000",
          "R$ 500",
          "R$ 3.000.000",
        ],
        [
          "Bares/Restaurantes/Lojas",
          "350 pessoas/dia",
          "R$ 150",
          "R$ 1.575.000",
        ],
        [
          "TOTAL",
          "-",
          "-",
          "R$ 13.731.000",
        ],
      ];

      tableY = yPosition;
      pdf.setFont("Helvetica", "normal");
      pdf.setFontSize(9);

      // Header
      pdf.setFillColor(45, 80, 22);
      pdf.setTextColor(255, 255, 255);
      xPos = margin;

      monthlyRevenueData[0].forEach((cell, idx) => {
        pdf.rect(xPos, tableY, colWidths[idx], 6, "F");
        pdf.text(cell, xPos + 2, tableY + 4, { maxWidth: colWidths[idx] - 2 });
        xPos += colWidths[idx];
      });

      tableY += 6;
      pdf.setTextColor(0, 0, 0);

      // Rows
      monthlyRevenueData.slice(1).forEach((row, rowIdx) => {
        xPos = margin;
        const isTotal = rowIdx === monthlyRevenueData.length - 2;

        if (isTotal) {
          pdf.setFillColor(244, 196, 48);
          pdf.rect(margin, tableY, contentWidth, 6, "F");
          pdf.setFont("Helvetica", "bold");
        } else {
          if (rowIdx % 2 === 0) {
            pdf.setFillColor(240, 240, 240);
            pdf.rect(margin, tableY, contentWidth, 6, "F");
          }
          pdf.setFont("Helvetica", "normal");
        }

        row.forEach((cell, idx) => {
          const align = idx > 0 ? "right" : "left";
          pdf.text(
            cell,
            xPos + (align === "right" ? colWidths[idx] - 2 : 2),
            tableY + 4,
            { maxWidth: colWidths[idx] - 2, align }
          );
          xPos += colWidths[idx];
        });

        tableY += 6;
      });

      yPosition = tableY + 8;

      // Operating costs section
      if (yPosition > pageHeight - 100) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFont("Helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(31, 59, 94);
      pdf.text("Custos Operacionais Mensais", margin, yPosition);
      yPosition += 10;

      const costsData = [
        ["Categoria", "Quantidade", "Salário/Custo", "Total Mensal"],
        ["Recursos Humanos", "-", "-", "R$ 469.000"],
        ["Operacional (Residencial)", "-", "-", "R$ 4.320.000"],
        ["Financiamento (CAPEX)", "-", "-", "R$ 1.000.000"],
        ["Juros Mensais (aprox.)", "-", "-", "R$ 500.000"],
        ["TOTAL", "-", "-", "R$ 6.289.000"],
      ];

      tableY = yPosition;
      pdf.setFont("Helvetica", "normal");
      pdf.setFontSize(9);

      // Header
      pdf.setFillColor(210, 80, 22);
      pdf.setTextColor(255, 255, 255);
      xPos = margin;

      costsData[0].forEach((cell, idx) => {
        pdf.rect(xPos, tableY, colWidths[idx], 6, "F");
        pdf.text(cell, xPos + 2, tableY + 4, { maxWidth: colWidths[idx] - 2 });
        xPos += colWidths[idx];
      });

      tableY += 6;
      pdf.setTextColor(0, 0, 0);

      // Rows
      costsData.slice(1).forEach((row, rowIdx) => {
        xPos = margin;
        const isTotal = rowIdx === costsData.length - 2;

        if (isTotal) {
          pdf.setFillColor(244, 196, 48);
          pdf.rect(margin, tableY, contentWidth, 6, "F");
          pdf.setFont("Helvetica", "bold");
        } else {
          if (rowIdx % 2 === 0) {
            pdf.setFillColor(245, 245, 245);
            pdf.rect(margin, tableY, contentWidth, 6, "F");
          }
          pdf.setFont("Helvetica", "normal");
        }

        row.forEach((cell, idx) => {
          const align = idx > 0 ? "right" : "left";
          pdf.text(
            cell,
            xPos + (align === "right" ? colWidths[idx] - 2 : 2),
            tableY + 4,
            { maxWidth: colWidths[idx] - 2, align }
          );
          xPos += colWidths[idx];
        });

        tableY += 6;
      });

      // Add footer with page numbers
      const totalPages = pdf.internal.pages.length - 1;
      pdf.setFont("Helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);

      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.text(
          `Página ${i} de ${totalPages}`,
          pageWidth / 2,
          pageHeight - 8,
          { align: "center" }
        );
        pdf.text(
          "GIARDINO — Relatório de Investimento Premium",
          pageWidth / 2,
          pageHeight - 3,
          { align: "center" }
        );
      }

      pdf.save("GIARDINO-Relatorio-Investimento-Completo.pdf");
      alert("✅ PDF Profissional gerado com sucesso! 📊");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("❌ Erro ao gerar PDF. Verifique o console para detalhes.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={isGenerating}
      className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap"
      style={{
        backgroundColor: isGenerating ? "#ccc" : "#1F3B5E",
        color: "#FFFFFF",
        borderColor: "#F4C430",
        borderWidth: "2px",
        cursor: isGenerating ? "not-allowed" : "pointer",
      }}
      title="Gera PDF profissional com relatório de investimento completo em formato A4"
    >
      {isGenerating ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Gerando...
        </>
      ) : (
        <>
          <FileText className="w-4 h-4" />
          📄 PDF Relatório
        </>
      )}
    </button>
  );
}
