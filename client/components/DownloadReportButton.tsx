import { Download } from "lucide-react";
import { generatePDFReport } from "./PDFReportGenerator";

export function DownloadReportButton() {
  const handleDownload = () => {
    generatePDFReport();
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg whitespace-nowrap"
      style={{
        backgroundColor: "#0F3460",
        color: "#FFFFFF",
        border: "2px solid #FCD34D",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#1a4d7f";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(15, 52, 96, 0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#0F3460";
        e.currentTarget.style.boxShadow = "none";
      }}
      title="Baixar relatório completo em PDF (A4)"
    >
      <Download className="w-5 h-5" />
      Relatório PDF
    </button>
  );
}
