import { FileText, Loader } from "lucide-react";
import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface GenerateCompletePDFProps {
  dashboardContentId?: string;
  filename?: string;
  buttonLabel?: string;
}

export function GenerateCompletePDF({
  dashboardContentId = "dashboard-content",
  filename = "GIARDINO-Dashboard-Todas-Abas-Completo.pdf",
  buttonLabel = "📋 PDF Todas as Abas",
}: GenerateCompletePDFProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById(dashboardContentId);
      if (!element) {
        alert("Conteúdo não encontrado para gerar PDF");
        setIsGenerating(false);
        return;
      }

      // Clona o elemento para não alterar o original
      const clonedElement = element.cloneNode(true) as HTMLElement;

      // Armazena estilos originais para restauração posterior
      const originalDisplay = new Map<HTMLElement, string>();

      // Torna todos os elementos visíveis no clone
      const allElements = clonedElement.querySelectorAll("*");
      allElements.forEach((el) => {
        const htmlEl = el as HTMLElement;
        originalDisplay.set(htmlEl, htmlEl.style.display || "");
        // Remove qualquer display: none
        htmlEl.style.display = "block";
        htmlEl.style.visibility = "visible";
        htmlEl.style.opacity = "1";
      });

      // Adiciona o clone ao DOM temporariamente (fora da viewport)
      clonedElement.style.position = "absolute";
      clonedElement.style.left = "-9999px";
      clonedElement.style.top = "-9999px";
      clonedElement.style.width = element.offsetWidth + "px";
      document.body.appendChild(clonedElement);

      // Cria PDF com jsPDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // ========== CAPA ==========
      pdf.setFillColor(15, 52, 96); // Azul marinho
      pdf.rect(0, 0, pageWidth, pageHeight, "F");

      pdf.setFont("Playfair Display", "bold");
      pdf.setFontSize(48);
      pdf.setTextColor(252, 211, 77); // Amarelo
      pdf.text("GIARDINO", pageWidth / 2, pageHeight / 3, { align: "center" });

      pdf.setFont("Montserrat", "normal");
      pdf.setFontSize(16);
      pdf.setTextColor(255, 255, 255);
      pdf.text("Dashboard Completo", pageWidth / 2, pageHeight / 3 + 20, {
        align: "center",
      });
      pdf.text(
        "Todos os Gráficos, Tabelas e Análises",
        pageWidth / 2,
        pageHeight / 3 + 30,
        { align: "center" }
      );

      pdf.setFontSize(12);
      pdf.text("Residencial Senior + Clube Life Style + Loteamento", pageWidth / 2, pageHeight / 2 + 30, {
        align: "center",
      });
      pdf.text("Mogi das Cruzes, São Paulo", pageWidth / 2, pageHeight / 2 + 40, {
        align: "center",
      });

      pdf.setFontSize(10);
      pdf.text(
        `Gerado em ${new Date().toLocaleDateString("pt-BR")} às ${new Date().toLocaleTimeString("pt-BR")}`,
        pageWidth / 2,
        pageHeight - 30,
        { align: "center" }
      );

      // ========== CONTEÚDO PRINCIPAL ==========
      pdf.addPage();

      // Captura o elemento clonado como imagem com altura máxima
      const canvas = await html2canvas(clonedElement, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#FFFFFF",
        windowHeight: clonedElement.scrollHeight + 500, // Adiciona padding extra
        windowWidth: clonedElement.scrollWidth,
      });

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = pageWidth - 20; // margem
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let position = 0;
      let heightLeft = imgHeight;

      while (heightLeft > 0) {
        const heightToPrint = pageHeight - 20;

        if (heightLeft > heightToPrint) {
          pdf.addImage(
            imgData,
            "PNG",
            10,
            10 - position,
            imgWidth,
            imgHeight
          );
          heightLeft -= heightToPrint;
          position += heightToPrint;

          if (heightLeft > 0) {
            pdf.addPage();
          }
        } else {
          pdf.addImage(
            imgData,
            "PNG",
            10,
            10 - position,
            imgWidth,
            imgHeight
          );
          heightLeft = 0;
        }
      }

      // ========== RODAPÉ COM NUMERAÇÃO ==========
      const totalPages = pdf.internal.pages.length - 1;
      pdf.setFont("Montserrat", "normal");
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
          "GIARDINO — Dashboard Completo Premium",
          pageWidth / 2,
          pageHeight - 3,
          { align: "center" }
        );
      }

      // Restaura o estilo original
      originalDisplay.forEach((display, el) => {
        el.style.display = display;
      });

      pdf.save(filename);
      alert("✅ PDF gerado com sucesso com todas as abas!");
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar PDF. Verifique o console para detalhes.");
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
        backgroundColor: isGenerating ? "#ccc" : "#065f46",
        color: "#FFFFFF",
        borderColor: "#FCD34D",
        borderWidth: "2px",
        cursor: isGenerating ? "not-allowed" : "pointer",
      }}
      title="Gera PDF com todas as abas, gráficos e tabelas"
    >
      {isGenerating ? (
        <>
          <Loader className="w-4 h-4 animate-spin" />
          Gerando...
        </>
      ) : (
        <>
          <FileText className="w-4 h-4" />
          {buttonLabel}
        </>
      )}
    </button>
  );
}
