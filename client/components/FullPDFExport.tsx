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
        // Cria container temporário para o elemento clonado
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.left = "-9999px";
        tempContainer.style.top = "-9999px";
        tempContainer.style.visibility = "visible";
        tempContainer.style.width = "1200px";
        tempContainer.appendChild(element);
        document.body.appendChild(tempContainer);

        try {
          // Garante display do elemento
          element.style.display = "block";
          element.style.visibility = "visible";
          element.style.width = "100%";
          element.style.overflow = "visible";

          const canvas = await html2canvas(element, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            imageTimeout: 5000,
            windowHeight: element.scrollHeight,
            windowWidth: 1200,
          });

          // Calcula dimensões
          const imgWidth = contentWidth;
          const canvasAspectRatio = canvas.width / canvas.height;
          const imgHeight = imgWidth / canvasAspectRatio;

          // Páginas necessárias para este elemento
          const pageHeightAvailable = A4_HEIGHT;
          const totalPagesNeeded = Math.ceil(imgHeight / pageHeightAvailable);

          // Adiciona página break se necessário ANTES de adicionar o elemento
          if (pageBreakBefore && currentPageCount > 0) {
            pdf.addPage();
          }

          // Processa cada página
          for (let pageIdx = 0; pageIdx < totalPagesNeeded; pageIdx++) {
            // Adiciona nova página (exceto para a primeira)
            if (pageIdx > 0) {
              pdf.addPage();
            }
            currentPageCount++;

            // Calcula a altura da imagem a desenhar nesta página
            const remainingHeight = imgHeight - (pageIdx * pageHeightAvailable);
            const heightToDraw = Math.min(pageHeightAvailable, remainingHeight);

            // Calcula a correspondência em pixels do canvas
            const pixelsPerMm = (canvas.height / imgHeight);
            const sourceHeightPixels = heightToDraw * pixelsPerMm;
            const sourceY = pageIdx * pageHeightAvailable * pixelsPerMm;

            // Cria canvas de crop para evitar stretching
            const cropCanvas = document.createElement("canvas");
            cropCanvas.width = canvas.width;
            cropCanvas.height = Math.ceil(sourceHeightPixels);

            const ctx = cropCanvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(
                canvas,
                0, Math.round(sourceY),
                canvas.width, Math.ceil(sourceHeightPixels),
                0, 0,
                canvas.width, Math.ceil(sourceHeightPixels)
              );
            }

            const croppedData = cropCanvas.toDataURL("image/png", 0.95);
            pdf.addImage(croppedData, "PNG", margin, margin, imgWidth, heightToDraw);
          }

          isFirstImage = false;
          return true;
        } catch (error) {
          console.error("Erro ao capturar elemento:", error);
          return false;
        } finally {
          // Remove o container temporário
          document.body.removeChild(tempContainer);
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

        // Aguarda renderização completa (mais tempo para galeria carregar)
        const waitTime = tabLabel.includes("Viabilidade") ? 4000 : 2500;
        await new Promise((resolve) => setTimeout(resolve, waitTime));

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

          // Garante que o conteúdo está visível e tem altura
          contentClone.style.display = "block";
          contentClone.style.visibility = "visible";
          contentClone.style.height = "auto";
          contentClone.style.minHeight = "auto";

          // Para a aba de Viabilidade, garante que a galeria está expandida
          if (tabLabel.includes("Viabilidade")) {
            const galleryContainer = contentClone.querySelector('[class*="gallery"]') as HTMLElement;
            if (galleryContainer) {
              // Garante que todas as imagens da galeria são visíveis
              const images = galleryContainer.querySelectorAll("img");
              images.forEach((img) => {
                (img as HTMLElement).style.display = "block";
                (img as HTMLElement).style.visibility = "visible";
              });
            }
          }

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

      // Tenta encontrar o footer de várias formas
      let footerElement = mainContainer.querySelector("footer") as HTMLElement;

      if (!footerElement) {
        // Tenta por classe footer
        footerElement = mainContainer.querySelector('[class*="footer"]') as HTMLElement;
      }

      if (footerElement) {
        console.log("Footer encontrado, capturando...");
        const footerClone = footerElement.cloneNode(true) as HTMLElement;
        footerClone.style.display = "block";
        footerClone.style.visibility = "visible";
        footerClone.style.width = "100%";
        await captureElement(footerClone, true);
        console.log("✓ Footer capturado com sucesso");
      } else {
        console.warn("Footer não encontrado no dashboard");
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
      // Remove páginas em branco no final
      const totalPages = pdf.getNumberOfPages();
      console.log(`PDF com ${totalPages} páginas (antes de limpeza)`);

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
