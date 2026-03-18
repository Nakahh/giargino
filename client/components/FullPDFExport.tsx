import { FileText, Loader } from "lucide-react";
import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export function FullPDFExport() {
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
      const A4_HEIGHT = pageHeight - 20;

      // Função para capturar elemento e adicionar ao PDF
      const captureAndAddPage = async (element: HTMLElement) => {
        try {
          const canvas = await html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            windowHeight: element.scrollHeight,
            windowWidth: element.offsetWidth,
            imageTimeout: 0,
          });

          const imgData = canvas.toDataURL("image/png", 0.95);
          const imgWidth = pageWidth - 10;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          let heightLeft = imgHeight;
          let position = 0;

          while (heightLeft > 0) {
            const pageHeightAvailable = A4_HEIGHT;

            pdf.addImage(imgData, "PNG", 5, 5 - position, imgWidth, imgHeight);

            heightLeft -= pageHeightAvailable;
            position += pageHeightAvailable;

            if (heightLeft > 0) {
              pdf.addPage();
            }
          }

          return true;
        } catch (error) {
          console.warn("Erro ao capturar elemento:", error);
          return false;
        }
      };

      // Obter elementos principais
      const mainContainer = document.querySelector(".min-h-screen") as HTMLElement;
      if (!mainContainer) {
        alert("Dashboard não encontrado!");
        setIsGenerating(false);
        return;
      }

      // Encontrar header, navegação e footer
      const allDivs = Array.from(mainContainer.querySelectorAll("div"));
      let headerElement: HTMLElement | null = null;
      let navElement: HTMLElement | null = null;
      let contentElement: HTMLElement | null = null;
      let footerElement: HTMLElement | null = null;

      for (const div of allDivs) {
        const hasLogo = div.querySelector('img[alt="GIARDINO Logo"]');
        const hasTitle = div.querySelector("h1");
        const hasGradient = div.style.background?.includes("linear-gradient");

        if (hasLogo && hasTitle && hasGradient && !headerElement) {
          headerElement = div;
        }

        if (
          div.className?.includes("sticky") &&
          div.className?.includes("top-0") &&
          !navElement
        ) {
          navElement = div;
        }

        if (div.id === "dashboard-content" && !contentElement) {
          contentElement = div;
        }

        const isFooter =
          div.className?.includes("py-12") &&
          div.className?.includes("mt-20") &&
          div.style.backgroundColor;
        if (isFooter && !footerElement) {
          footerElement = div;
        }
      }

      // 1. Capturar HEADER (remover botão PDF)
      if (headerElement) {
        const headerClone = headerElement.cloneNode(true) as HTMLElement;

        // Remove botão PDF
        const pdfButtons = headerClone.querySelectorAll("button");
        for (const btn of pdfButtons) {
          if (
            btn.textContent?.includes("📄") ||
            btn.textContent?.includes("Baixar") ||
            btn.title?.includes("PDF")
          ) {
            btn.style.display = "none";
          }
        }

        await captureAndAddPage(headerClone);
      }

      // 2. Capturar conteúdo de cada aba
      const tabButtons = Array.from(
        mainContainer.querySelectorAll("button")
      ).filter((btn) => {
        const text = btn.textContent || "";
        return (
          (text.includes("📊") || text.includes("Geral")) ||
          (text.includes("💰") || text.includes("Receitas")) ||
          (text.includes("📉") || text.includes("Custos")) ||
          (text.includes("👥") || text.includes("RH")) ||
          (text.includes("✓") || text.includes("Viabilidade")) ||
          (text.includes("🏢") || text.includes("Sobre"))
        );
      }) as HTMLButtonElement[];

      // Processa cada aba
      for (let i = 0; i < tabButtons.length; i++) {
        const tabBtn = tabButtons[i];
        const tabLabel = tabBtn.textContent?.trim() || `Aba ${i + 1}`;

        // Clica na aba
        tabBtn.click();

        // Aguarda renderização do conteúdo
        await new Promise((resolve) => setTimeout(resolve, 1500));

        try {
          // Encontra o conteúdo da aba
          let currentContent = contentElement?.cloneNode(true) as HTMLElement;

          if (!currentContent) {
            // Se não encontrar por ID, tenta localizar o elemento com espaço entre abas
            const allDivChildren = mainContainer.querySelectorAll("div > div");
            for (const div of allDivChildren) {
              if (
                (div as HTMLElement).offsetHeight > 300 &&
                div.querySelector("h2, .grid, .space-y-8")
              ) {
                currentContent = div.cloneNode(true) as HTMLElement;
                break;
              }
            }
          }

          if (currentContent) {
            // Remove navegação clonada se existir
            const navClones = currentContent.querySelectorAll(
              'button[className*="py-3"], button[className*="py-4"]'
            );
            for (const nav of navClones) {
              nav.remove();
            }

            // Adiciona página (nova página para próxima aba)
            if (i > 0) {
              pdf.addPage();
            }

            await captureAndAddPage(currentContent);
          }
        } catch (error) {
          console.warn(`Erro ao processar aba ${tabLabel}:`, error);
        }
      }

      // 3. Capturar FOOTER
      if (footerElement) {
        pdf.addPage();

        const footerClone = footerElement.cloneNode(true) as HTMLElement;
        await captureAndAddPage(footerClone);
      }

      // 4. Adicionar números de página
      const totalPages = pdf.internal.pages.length - 1;
      pdf.setFont("Montserrat", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);

      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.text(`Página ${i} de ${totalPages}`, pageWidth / 2, pageHeight - 5, {
          align: "center",
        });
      }

      // 5. Volta para primeira aba
      if (tabButtons.length > 0) {
        tabButtons[0].click();
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      // Salva o PDF
      pdf.save("GIARDINO-Projeto-Completo-Premium.pdf");

      alert(
        "✅ PDF Completo gerado com sucesso!\n\n" +
          "📄 GIARDINO-Projeto-Completo-Premium.pdf\n\n" +
          "✓ Contém:\n" +
          "• Header com logo e título\n" +
          "• Todos os cards KPI\n" +
          "• Todos os gráficos e charts\n" +
          "• Todas as tabelas\n" +
          "• Todas as imagens\n" +
          "• Todas as 6 abas completas:\n" +
          "  - 📊 Geral\n" +
          "  - 💰 Receitas\n" +
          "  - 📉 Custos\n" +
          "  - 👥 RH\n" +
          "  - ✓ Viabilidade\n" +
          "  - 🏢 Sobre\n" +
          "• Rodapé\n" +
          "• Numeração de páginas\n" +
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
