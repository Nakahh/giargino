import { FileText, Loader } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export function FullPDFExport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { t } = useTranslation();

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

      // Remove qualquer modal/dialog aberto
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
      const captureElement = async (
        element: HTMLElement,
        pageBreakBefore = false
      ) => {
        // Cria container temporário para o elemento clonado
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.left = "-9999px";
        tempContainer.style.top = "-9999px";
        tempContainer.style.visibility = "visible";
        tempContainer.style.width = "1200px";
        tempContainer.style.backgroundColor = "#ffffff";
        tempContainer.style.overflow = "visible";

        // Clone do elemento
        const clone = element.cloneNode(true) as HTMLElement;
        clone.style.width = "100%";
        clone.style.display = "block";
        clone.style.visibility = "visible";
        clone.style.height = "auto";
        clone.style.overflow = "visible";

        tempContainer.appendChild(clone);
        document.body.appendChild(tempContainer);

        try {
          // Garantir que tudo está visível
          clone.style.display = "block";
          clone.style.visibility = "visible";
          clone.style.width = "100%";
          clone.style.overflow = "visible";

          // Remove gráficos-tooltip que aparecem ao hover
          const tooltips = clone.querySelectorAll(".recharts-tooltip");
          tooltips.forEach((tt) => {
            (tt as HTMLElement).style.display = "none";
          });

          // Captura com html2canvas
          const canvas = await html2canvas(clone, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            imageTimeout: 10000,
            windowHeight: clone.scrollHeight,
            windowWidth: 1200,
          });

          // Processa imagem do canvas
          const imgWidth = contentWidth;
          const canvasHeight = canvas.height;
          const canvasWidth = canvas.width;
          const imgHeight = (canvasHeight / canvasWidth) * imgWidth;

          // Calcula páginas necessárias
          const pageHeightAvailable = A4_HEIGHT;
          const totalPagesNeeded = Math.ceil(imgHeight / pageHeightAvailable);

          // Adiciona page break se necessário
          if (pageBreakBefore && currentPageCount > 0) {
            pdf.addPage();
            currentPageCount++;
          }

          // Processa cada página
          for (let pageIdx = 0; pageIdx < totalPagesNeeded; pageIdx++) {
            // Adiciona nova página se necessário
            if (pageIdx > 0) {
              pdf.addPage();
              currentPageCount++;
            } else if (currentPageCount === 0) {
              currentPageCount++;
            }

            // Calcula altura para esta página
            const pageStartHeight = pageIdx * pageHeightAvailable;
            const pageEndHeight = (pageIdx + 1) * pageHeightAvailable;
            const actualHeight = imgHeight - pageStartHeight;
            const heightToDraw = Math.min(pageHeightAvailable, actualHeight);

            // Converte para pixels do canvas
            const pixelsPerMm = canvasHeight / imgHeight;
            const sourceHeightPixels = heightToDraw * pixelsPerMm;
            const sourceY = pageIdx * pageHeightAvailable * pixelsPerMm;

            // Cria canvas de crop
            const cropCanvas = document.createElement("canvas");
            cropCanvas.width = canvasWidth;
            cropCanvas.height = Math.round(sourceHeightPixels);

            const ctx = cropCanvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(
                canvas,
                0,
                Math.round(sourceY),
                canvasWidth,
                Math.round(sourceHeightPixels),
                0,
                0,
                canvasWidth,
                Math.round(sourceHeightPixels)
              );
            }

            const croppedData = cropCanvas.toDataURL("image/png", 0.95);

            // Adiciona imagem ao PDF
            if (cropCanvas.height > 0) {
              pdf.addImage(
                croppedData,
                "PNG",
                margin,
                margin,
                imgWidth,
                heightToDraw
              );
            }
          }

          return true;
        } catch (error) {
          console.error("Erro ao capturar elemento:", error);
          return false;
        } finally {
          document.body.removeChild(tempContainer);
        }
      };

      const mainContainer = document.querySelector(".min-h-screen");
      if (!mainContainer) {
        alert("Dashboard não encontrado!");
        setIsGenerating(false);
        return;
      }

      console.log("Iniciando captura do PDF...");

      // ===== 1. CAPTURAR HEADER =====
      let headerElement: HTMLElement | null = null;
      const mainChildren = mainContainer.children;

      for (let i = 0; i < mainChildren.length; i++) {
        const el = mainChildren[i] as HTMLElement;
        const style = window.getComputedStyle(el);
        const bgImage = style.backgroundImage;
        const bgColor = style.backgroundColor;

        if (
          (bgImage && bgImage.includes("linear-gradient")) ||
          (bgColor &&
            (bgColor.includes("rgb(31, 59, 94)") ||
              bgColor.includes("#1F3B5E") ||
              bgColor.includes("#2C3E50")))
        ) {
          headerElement = el as HTMLElement;
          break;
        }
      }

      if (headerElement) {
        console.log("✓ Capturando header...");
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

        headerClone.style.display = "block";
        headerClone.style.visibility = "visible";
        headerClone.style.width = "100%";

        await captureElement(headerClone, false);
      }

      // ===== 2. CAPTURAR CONTEÚDO DAS ABAS =====
      const tabButtons = Array.from(
        mainContainer.querySelectorAll("button")
      ).filter((btn) => {
        const text = btn.textContent?.trim() || "";
        return (
          text.includes("📊") ||
          text.includes("💰") ||
          text.includes("📉") ||
          text.includes("👥") ||
          text.includes("✓") ||
          text.includes("🏢")
        );
      }) as HTMLButtonElement[];

      console.log(`Encontradas ${tabButtons.length} abas`);

      for (let idx = 0; idx < tabButtons.length; idx++) {
        const tabBtn = tabButtons[idx];
        const tabLabel = tabBtn.textContent?.trim() || `Aba ${idx + 1}`;

        console.log(
          `Processando: ${tabLabel} (${idx + 1}/${tabButtons.length})`
        );

        // Clica na aba
        tabBtn.click();

        // Aguarda renderização
        let waitTime = 3500;
        if (tabLabel.includes("Viabilidade")) waitTime = 5500;
        if (
          tabLabel.includes("Receitas") ||
          tabLabel.includes("Custos")
        )
          waitTime = 4500;
        if (tabLabel.includes("Geral")) waitTime = 4000;

        await new Promise((resolve) => setTimeout(resolve, waitTime));

        // Força visibilidade dos gráficos
        const charts = mainContainer.querySelectorAll(
          ".recharts-responsive-container"
        );
        charts.forEach((chart) => {
          const el = chart as HTMLElement;
          el.style.display = "block";
          el.style.visibility = "visible";
          el.style.overflow = "visible";
        });

        // Força visibilidade das legendas
        const legends = mainContainer.querySelectorAll(
          ".recharts-default-legend"
        );
        legends.forEach((legend) => {
          const el = legend as HTMLElement;
          el.style.visibility = "visible";
          el.style.opacity = "1";
          el.style.display = "flex";
        });

        try {
          const contentElement = mainContainer.querySelector(
            "#dashboard-content"
          ) as HTMLElement;

          if (!contentElement) {
            console.warn(`Conteúdo não encontrado para ${tabLabel}`);
            continue;
          }

          const contentClone = contentElement.cloneNode(true) as HTMLElement;

          // Remove navegação e modais
          const navs = contentClone.querySelectorAll(
            'button[class*="py-3"], button[class*="py-4"]'
          );
          navs.forEach((nav) => {
            (nav as HTMLElement).style.display = "none";
          });

          // Remove lightbox modals
          const modalsInClone = contentClone.querySelectorAll(
            "[role='dialog'], .fixed.inset-0"
          );
          modalsInClone.forEach((m) => {
            (m as HTMLElement).style.display = "none";
          });

          // Ajusta margins grandes
          const allElements = contentClone.querySelectorAll("*");
          allElements.forEach((el) => {
            const elem = el as HTMLElement;
            const marginTop = window.getComputedStyle(elem).marginTop;
            const marginBottom = window.getComputedStyle(elem).marginBottom;
            if (marginTop && parseInt(marginTop) > 30)
              elem.style.marginTop = "10px";
            if (marginBottom && parseInt(marginBottom) > 30)
              elem.style.marginBottom = "10px";
          });

          // Garante gráficos visíveis
          const chartsInContent = contentClone.querySelectorAll(
            ".recharts-responsive-container"
          );
          chartsInContent.forEach((chart) => {
            const el = chart as HTMLElement;
            el.style.display = "block";
            el.style.visibility = "visible";
            el.style.minHeight = "300px";
          });

          // Garante legendas visíveis
          const legendsInContent = contentClone.querySelectorAll(
            ".recharts-default-legend"
          );
          legendsInContent.forEach((legend) => {
            const el = legend as HTMLElement;
            el.style.visibility = "visible";
            el.style.opacity = "1";
            el.style.display = "flex";

            const legendItems = el.querySelectorAll(".recharts-legend-item");
            legendItems.forEach((item) => {
              const itemEl = item as HTMLElement;
              itemEl.style.display = "inline-flex";
              itemEl.style.visibility = "visible";
              itemEl.style.opacity = "1";
            });
          });

          // Para Viabilidade, remove duplicação de galeria
          if (tabLabel.includes("Viabilidade")) {
            const allGalleries = contentClone.querySelectorAll(
              '[class*="space-y"]'
            );
            if (allGalleries.length > 1) {
              for (let i = 1; i < allGalleries.length; i++) {
                (allGalleries[i] as HTMLElement).style.display = "none";
              }
            }
          }

          contentClone.style.display = "block";
          contentClone.style.visibility = "visible";
          contentClone.style.height = "auto";
          contentClone.style.overflow = "visible";

          await captureElement(contentClone, idx > 0);
          console.log(`✓ ${tabLabel} capturada`);
        } catch (error) {
          console.error(`Erro ao processar ${tabLabel}:`, error);
        }

        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      // ===== 3. CAPTURAR FOOTER =====
      console.log("Capturando footer...");
      let footerElement: HTMLElement | null = null;

      const allDivs = document.querySelectorAll("div");
      for (let div of allDivs) {
        const style = window.getComputedStyle(div);
        const bgColor = style.backgroundColor;

        if (
          bgColor &&
          (bgColor.includes("31") || bgColor.includes("rgb"))
        ) {
          if (
            div.textContent?.includes("GIARDINO") &&
            div.textContent?.includes("Confidencial")
          ) {
            footerElement = div as HTMLElement;
            break;
          }
        }
      }

      if (footerElement) {
        console.log("✓ Capturando footer...");
        const footerClone = footerElement.cloneNode(true) as HTMLElement;

        const navBars = footerClone.querySelectorAll(
          '[class*="sticky"], [class*="overflow-x"]'
        );
        navBars.forEach((nav) => {
          (nav as HTMLElement).style.display = "none";
        });

        const navButtons = footerClone.querySelectorAll("button");
        navButtons.forEach((btn) => {
          const text = btn.textContent?.trim() || "";
          if (
            text.includes("📊") ||
            text.includes("💰") ||
            text.includes("📉") ||
            text.includes("👥") ||
            text.includes("✓") ||
            text.includes("🏢")
          ) {
            btn.style.display = "none";
          }
        });

        footerClone.style.display = "block";
        footerClone.style.visibility = "visible";
        footerClone.style.width = "100%";

        await captureElement(footerClone, true);
      }

      // Restaurar elementos
      hiddenModals.forEach((modal) => {
        modal.style.display = "";
      });

      // Salvar PDF
      pdf.save(t('ui.pdf.filename'));

      alert(
        `${t('ui.messages.pdfSuccessFull')}\n\n` +
        `📄 ${t('ui.pdf.filename')}\n\n` +
        `${t('ui.pdf.totalPages', { count: currentPageCount })}\n\n` +
        `${t('ui.pdf.includesFull')}\n` +
        `• ${t('ui.pdf.header')}\n` +
        `• ${t('ui.pdf.tabsAll')}\n` +
        `• ${t('ui.pdf.footer')}\n` +
        `• ${t('ui.pdf.layout')}\n` +
        `• ${t('ui.pdf.withoutMenu')}`
      );
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert(
        `${t('ui.messages.pdfError')}\n\n` +
        `${t('ui.messages.tryAgain')}\n` +
        `${t('ui.messages.reloadPage')}\n` +
        `${t('ui.messages.waitLoad')}\n` +
        `${t('ui.messages.tryOnceMore')}\n\n` +
        `Erro: ` +
        (error instanceof Error ? error.message : "Unknown")
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
      title={t('ui.buttons.downloadProject')}
    >
      {isGenerating ? (
        <>
          <Loader className="w-5 h-5 animate-spin" />
          {t('ui.buttons.downloadCompleteWait')}
        </>
      ) : (
        <>
          <FileText className="w-5 h-5" />
          {t('ui.buttons.downloadProject')}
        </>
      )}
    </button>
  );
}
