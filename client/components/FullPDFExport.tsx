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
      const margin = 10;
      const contentWidth = pageWidth - margin * 2;
      const A4_HEIGHT = pageHeight - margin * 2;

      let currentPageCount = 0;
      let isFirstImage = true;

      // Remove any lightbox modals antes de começar
      const modals = document.querySelectorAll("[role='dialog'], .fixed.inset-0");
      const hiddenModals: HTMLElement[] = [];
      modals.forEach((modal) => {
        const el = modal as HTMLElement;
        if (el.style.display !== "none") {
          el.style.display = "none";
          hiddenModals.push(el);
        }
      });

      // Função para capturar elemento e adicionar páginas ao PDF
      const captureElement = async (element: HTMLElement, pageBreakBefore = false) => {
        try {
          // Garante display do elemento
          element.style.display = "block";
          element.style.visibility = "visible";

          const canvas = await html2canvas(element, {
            scale: 1.5,
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            imageTimeout: 5000,
            windowHeight: element.scrollHeight,
            windowWidth: element.offsetWidth,
          });

          const imgData = canvas.toDataURL("image/png", 0.95);
          const imgWidth = contentWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          // Adiciona página break se necessário
          if (pageBreakBefore && !isFirstImage) {
            pdf.addPage();
            currentPageCount++;
          }

          let heightLeft = imgHeight;
          let yPosition = margin;

          // Adiciona a imagem em múltiplas páginas se necessário
          while (heightLeft > 0) {
            if (!isFirstImage && yPosition === margin) {
              pdf.addPage();
              currentPageCount++;
            }

            const pageHeightAvailable = A4_HEIGHT;
            const heightToDraw = Math.min(heightLeft, pageHeightAvailable);

            pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight);

            heightLeft -= pageHeightAvailable;
            yPosition = margin;
            isFirstImage = false;

            if (heightLeft > 0) {
              pdf.addPage();
              currentPageCount++;
            }
          }

          if (!isFirstImage) {
            isFirstImage = false;
          }

          return true;
        } catch (error) {
          console.error("Erro ao capturar elemento:", error);
          return false;
        }
      };

      const mainContainer = document.querySelector(".min-h-screen");
      if (!mainContainer) {
        alert("Dashboard não encontrado!");
        setIsGenerating(false);
        return;
      }

      // ========== 1. CAPTURAR HEADER ==========
      console.log("Capturando header...");
      const headerElement = mainContainer.querySelector(
        'div[style*="linear-gradient"]'
      ) as HTMLElement;

      if (headerElement) {
        const headerClone = headerElement.cloneNode(true) as HTMLElement;

        // Remove botão PDF
        const btns = headerClone.querySelectorAll("button");
        btns.forEach((btn) => {
          if (
            btn.textContent?.includes("Baixar") ||
            btn.textContent?.includes("📄")
          ) {
            btn.style.display = "none";
          }
        });

        await captureElement(headerClone, false);
      }

      // ========== 2. PROCESSAR ABAS ==========
      const tabButtons = Array.from(mainContainer.querySelectorAll("button")).filter(
        (btn) => {
          const text = btn.textContent?.trim() || "";
          return (
            text.includes("📊") ||
            text.includes("💰") ||
            text.includes("📉") ||
            text.includes("👥") ||
            text.includes("✓") ||
            text.includes("🏢")
          );
        }
      ) as HTMLButtonElement[];

      console.log(`Encontradas ${tabButtons.length} abas para processar`);

      for (let idx = 0; idx < tabButtons.length; idx++) {
        const tabBtn = tabButtons[idx];
        const tabLabel = tabBtn.textContent?.trim() || `Aba ${idx + 1}`;

        console.log(`Processando: ${tabLabel} (${idx + 1}/${tabButtons.length})`);

        // Clica na aba
        tabBtn.click();

        // Aguarda renderização completa
        await new Promise((resolve) => setTimeout(resolve, 2000));

        try {
          // Encontra o conteúdo
          const contentElement = mainContainer.querySelector(
            "#dashboard-content"
          ) as HTMLElement;

          if (!contentElement) {
            console.warn(`Conteúdo não encontrado para ${tabLabel}`);
            continue;
          }

          // Clona o conteúdo
          const contentClone = contentElement.cloneNode(true) as HTMLElement;

          // Remove navegação e modais
          const navs = contentClone.querySelectorAll(
            'button[class*="py-3"], button[class*="py-4"]'
          );
          navs.forEach((nav) => {
            (nav as HTMLElement).style.display = "none";
          });

          // Remove lightbox modal se existir
          const modalsInClone = contentClone.querySelectorAll(
            "[role='dialog'], .fixed.inset-0"
          );
          modalsInClone.forEach((m) => {
            (m as HTMLElement).style.display = "none";
          });

          // Captura com page break (exceto para a primeira)
          await captureElement(contentClone, idx > 0);

          console.log(`✓ ${tabLabel} capturada com sucesso`);
        } catch (error) {
          console.error(`Erro ao processar ${tabLabel}:`, error);
        }

        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      // ========== 3. CAPTURAR FOOTER ==========
      console.log("Capturando footer...");
      const footerElement = mainContainer.querySelector(
        'div[style*="py-12"][style*="mt-20"]'
      ) as HTMLElement;

      if (footerElement) {
        const footerClone = footerElement.cloneNode(true) as HTMLElement;
        await captureElement(footerClone, true);
      }

      // ========== 4. RESTAURAR ELEMENTOS OCULTOS ==========
      hiddenModals.forEach((modal) => {
        modal.style.display = "";
      });

      // ========== 5. VOLTAR PARA PRIMEIRA ABA ==========
      console.log("Voltando para primeira aba...");
      if (tabButtons.length > 0) {
        tabButtons[0].click();
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // ========== 6. SALVAR PDF ==========
      console.log(`Salvando PDF com ${currentPageCount} páginas...`);
      pdf.save("GIARDINO-Projeto-Completo-Premium.pdf");

      alert(
        "✅ PDF Completo gerado com sucesso!\n\n" +
          "📄 GIARDINO-Projeto-Completo-Premium.pdf\n\n" +
          `Total: ${currentPageCount} páginas\n\n` +
          "✓ Contém:\n" +
          "• Header com logo\n" +
          "• 6 Abas completas:\n" +
          "  - 📊 Geral (KPIs, gráficos, fluxo de caixa)\n" +
          "  - 💰 Receitas (gráficos, tabelas)\n" +
          "  - 📉 Custos (gráficos, análise)\n" +
          "  - 👥 RH (dados de funcionários)\n" +
          "  - ✓ Viabilidade (KPIs, análise, GALERIA)\n" +
          "  - 🏢 Sobre (projeto info)\n" +
          "• Footer com branding\n" +
          "• Sem números de página\n" +
          "• Layout responsivo A4"
      );
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert(
        "❌ Erro ao gerar PDF.\n\n" +
          "Tente:\n" +
          "1. Recarregar a página\n" +
          "2. Aguarde o dashboard carregar completamente\n" +
          "3. Tente novamente\n\n" +
          "Erro: " +
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
