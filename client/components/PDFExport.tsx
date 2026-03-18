import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";

interface PDFExportProps {
  elementId: string;
  filename?: string;
  buttonLabel?: string;
}

export function PDFExport({
  elementId,
  filename = "giardino-relatorio-investimento.pdf",
  buttonLabel = "📄 Exportar PDF",
}: PDFExportProps) {
  const exportToPDF = async () => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        console.error(`Elemento com ID ${elementId} não encontrado`);
        return;
      }

      // Criar canvas da página
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#FFFFFF",
        windowHeight: element.scrollHeight,
      });

      // Criar PDF em A4
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const imgWidth = 210; // Largura A4 em mm
      const pageHeight = 295; // Altura A4 em mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Adicionar imagem ao PDF com múltiplas páginas
      const imgData = canvas.toDataURL("image/png");

      while (heightLeft >= 0) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;

        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      // Download
      pdf.save(filename);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar PDF. Verifique o console para mais detalhes.");
    }
  };

  return (
    <button
      onClick={exportToPDF}
      className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
      style={{
        backgroundColor: "#0F3460",
        color: "#FFFFFF",
        border: "2px solid #FCD34D",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#1a4d7f";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#0F3460";
      }}
    >
      <Download className="w-5 h-5" />
      {buttonLabel}
    </button>
  );
}
