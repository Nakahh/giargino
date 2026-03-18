import { FileText, Loader } from "lucide-react";
import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export function ComprehensivePDFReport() {
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

      // Get the entire dashboard container
      const dashboardContainer = document.querySelector(".min-h-screen");
      if (!dashboardContainer) {
        alert("Dashboard não encontrado!");
        setIsGenerating(false);
        return;
      }

      // Get all tab buttons
      const tabButtons = Array.from(
        document.querySelectorAll('button[className*="py-3"]')
      ).filter((btn) => {
        const text = btn.textContent || "";
        return (
          text.includes("Geral") ||
          text.includes("Receitas") ||
          text.includes("Custos") ||
          text.includes("RH") ||
          text.includes("Viabilidade") ||
          text.includes("Sobre")
        );
      }) as HTMLElement[];

      let isFirstPage = true;

      // Capture each tab's content
      for (const tabBtn of tabButtons) {
        const tabLabel = tabBtn.textContent?.trim() || "";

        // Click the tab
        tabBtn.click();

        // Wait for content to render
        await new Promise((resolve) => setTimeout(resolve, 800));

        try {
          // Get header and current tab content
          const fullContent = document.querySelector(".min-h-screen");

          if (!fullContent) continue;

          // Capture the current view
          const canvas = await html2canvas(fullContent as HTMLElement, {
            scale: 1.5,
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            windowHeight: (fullContent as HTMLElement).scrollHeight + 1000,
            windowWidth: (fullContent as HTMLElement).offsetWidth,
          });

          const imgData = canvas.toDataURL("image/png");
          const imgWidth = pageWidth - 10; // 5mm margins
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          if (isFirstPage) {
            isFirstPage = false;
          } else {
            pdf.addPage();
          }

          let heightLeft = imgHeight;
          let position = 0;

          // Add image to PDF, handling pagination
          while (heightLeft > 0) {
            const pageHeightAvailable = pageHeight - 20;

            if (heightLeft > pageHeightAvailable) {
              pdf.addImage(
                imgData,
                "PNG",
                5,
                5 - position,
                imgWidth,
                imgHeight
              );
              heightLeft -= pageHeightAvailable;
              position += pageHeightAvailable;

              if (heightLeft > 0) {
                pdf.addPage();
              }
            } else {
              pdf.addImage(
                imgData,
                "PNG",
                5,
                5 - position,
                imgWidth,
                imgHeight
              );
              heightLeft = 0;
            }
          }
        } catch (tabError) {
          console.warn(`Erro ao capturar aba ${tabLabel}:`, tabError);
        }
      }

      // Add footer with page numbers
      const totalPages = pdf.internal.pages.length - 1;
      pdf.setFont("Montserrat", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);

      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.text(
          `Página ${i} de ${totalPages}`,
          pageWidth / 2,
          pageHeight - 5,
          { align: "center" }
        );
      }

      // Click first tab to restore initial state
      const firstTab = tabButtons[0];
      if (firstTab) {
        firstTab.click();
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      pdf.save("GIARDINO-Projeto-Completo-Premium.pdf");
      alert(
        "✅ PDF Completo gerado com sucesso!\n\n" +
          "📄 GIARDINO-Projeto-Completo-Premium.pdf\n\n" +
          "✓ Contém:\n" +
          "• Logo oficial\n" +
          "• Todos os cards KPI\n" +
          "• Todos os gráficos\n" +
          "• Todas as tabelas\n" +
          "• Todas as abas (Geral, Receitas, Custos, RH, Viabilidade, Sobre)\n" +
          "• Layout exato do site\n" +
          "• Formatação A4 profissional"
      );
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert(
        "❌ Erro ao gerar PDF. Tente novamente.\n\nErro: " +
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
      title="Gera PDF visual idêntico ao site com todas as abas, cards, gráficos, tabelas e imagens em formato A4"
    >
      {isGenerating ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          Gerando PDF (pode levar alguns segundos)...
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
