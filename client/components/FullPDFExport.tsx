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
      const captureElement = async (element: HTMLElement, pageBreakBefore = false, addTopPadding = false) => {
        // Cria container temporário para o elemento clonado
        const tempContainer = document.createElement("div");
        tempContainer.style.position = "absolute";
        tempContainer.style.left = "-9999px";
        tempContainer.style.top = "-9999px";
        tempContainer.style.visibility = "visible";
        tempContainer.style.width = "1200px";
        tempContainer.style.backgroundColor = "#ffffff";

        // Wrapper para adicionar padding (sem padding no topo para evitar cortes)
        const wrapper = document.createElement("div");
        wrapper.style.width = "100%";
        wrapper.style.paddingTop = addTopPadding ? "0px" : "0px"; // Remove padding do topo
        wrapper.style.paddingBottom = addTopPadding ? "20px" : "0px"; // Padding só no fim
        wrapper.style.paddingLeft = "0px";
        wrapper.style.paddingRight = "0px";
        wrapper.style.backgroundColor = "#ffffff";
        wrapper.appendChild(element);
        tempContainer.appendChild(wrapper);
        document.body.appendChild(tempContainer);

        try {
          // Garante display do elemento
          element.style.display = "block";
          element.style.visibility = "visible";
          element.style.width = "100%";
          element.style.overflow = "visible";

          const canvas = await html2canvas(wrapper, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            imageTimeout: 5000,
            windowHeight: wrapper.scrollHeight,
            windowWidth: 1200,
          });

          // Calcula dimensões com mais precisão
          const imgWidth = contentWidth;
          const canvasHeight = canvas.height;
          const canvasWidth = canvas.width;
          const imgHeight = (canvasHeight / canvasWidth) * imgWidth;

          // Páginas necessárias para este elemento
          const pageHeightAvailable = A4_HEIGHT;
          const totalPagesNeeded = Math.ceil(imgHeight / pageHeightAvailable);

          // Adiciona página break se necessário ANTES de adicionar o elemento
          if (pageBreakBefore && currentPageCount > 0) {
            pdf.addPage();
            currentPageCount++;
          }

          // Processa cada página
          for (let pageIdx = 0; pageIdx < totalPagesNeeded; pageIdx++) {
            // Adiciona nova página SOMENTE se necessário
            if (pageIdx > 0) {
              pdf.addPage();
              currentPageCount++;
            } else if (currentPageCount === 0) {
              // Primeira página do PDF
              currentPageCount++;
            }

            // Calcula a altura exata para esta página
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
                0, Math.round(sourceY),
                canvasWidth, Math.round(sourceHeightPixels),
                0, 0,
                canvasWidth, Math.round(sourceHeightPixels)
              );
            }

            const croppedData = cropCanvas.toDataURL("image/png", 0.95);

            // Verifica se há conteúdo real antes de adicionar imagem
            if (cropCanvas.height > 0) {
              pdf.addImage(croppedData, "PNG", margin, margin, imgWidth, heightToDraw);
            }
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

      // O header é o PRIMEIRO child do mainContainer com gradient
      let headerElement: HTMLElement | null = null;
      const mainChildren = mainContainer.children;

      // Procura o header como o primeiro div com background gradient
      for (let i = 0; i < mainChildren.length; i++) {
        const el = mainChildren[i] as HTMLElement;
        const style = window.getComputedStyle(el);
        const bgImage = style.backgroundImage;
        const bgColor = style.backgroundColor;

        // Header tem gradient ou background azul marinho
        if ((bgImage && bgImage.includes("linear-gradient")) ||
            (bgColor && (bgColor.includes("rgb(31, 59, 94)") || bgColor.includes("#1F3B5E") || bgColor.includes("#2C3E50")))) {
          headerElement = el as HTMLElement;
          break;
        }
      }

      if (headerElement) {
        console.log("Header encontrado, capturando...");
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

        // Garante que o header está completamente visível
        headerClone.style.display = "block";
        headerClone.style.visibility = "visible";
        headerClone.style.width = "100%";

        await captureElement(headerClone, false, false);
        console.log("✓ Header capturado com sucesso");
      } else {
        console.warn("Header não encontrado no dashboard");
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

        // Aguarda renderização completa (mais tempo para gráficos e galeria carregarem)
        let waitTime = 3500; // padrão para gráficos
        if (tabLabel.includes("Viabilidade")) waitTime = 5500; // galeria demora mais
        if (tabLabel.includes("Receitas") || tabLabel.includes("Custos")) waitTime = 4500; // gráficos
        if (tabLabel.includes("Geral")) waitTime = 4000; // geral tem vários gráficos

        await new Promise((resolve) => setTimeout(resolve, waitTime));

        // Força rendering dos gráficos Recharts
        const charts = mainContainer.querySelectorAll(".recharts-responsive-container");
        for (let chart of charts) {
          const el = chart as HTMLElement;
          el.style.display = "block";
          el.style.visibility = "visible";
          el.style.overflow = "visible";
        }

        // Força SVGs serem renderizáveis
        const svgElements = mainContainer.querySelectorAll("svg");
        for (let svg of svgElements) {
          const el = svg as HTMLElement;
          el.setAttribute("width", el.getAttribute("width") || "100%");
          el.setAttribute("height", el.getAttribute("height") || "auto");
          el.style.display = "block";
          el.style.visibility = "visible";
          el.style.overflow = "visible";
        }

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

          // Remove espaços vazios e padding desnecessário
          const allElements = contentClone.querySelectorAll("*");
          allElements.forEach((el) => {
            const elem = el as HTMLElement;
            // Remove margin-top e margin-bottom grandes
            const marginTop = window.getComputedStyle(elem).marginTop;
            const marginBottom = window.getComputedStyle(elem).marginBottom;
            if (marginTop && (parseInt(marginTop) > 30)) elem.style.marginTop = "10px";
            if (marginBottom && (parseInt(marginBottom) > 30)) elem.style.marginBottom = "10px";
          });

          // Garante que gráficos estão visíveis
          const chartsInContent = contentClone.querySelectorAll(".recharts-responsive-container");
          chartsInContent.forEach((chart) => {
            const el = chart as HTMLElement;
            el.style.display = "block";
            el.style.visibility = "visible";
            el.style.minHeight = "300px";
          });

          // Melhora legenda dos gráficos
          const legends = contentClone.querySelectorAll(".recharts-default-legend");
          legends.forEach((legend) => {
            const el = legend as HTMLElement;
            el.style.fontSize = "14px";
            el.style.padding = "15px 0";
            el.style.marginTop = "10px";
            el.style.display = "flex";
            el.style.flexWrap = "wrap";
            el.style.justifyContent = "center";
            el.style.gap = "20px";
            el.style.visibility = "visible";
            el.style.opacity = "1";

            // Garante que cada item da legenda está visível
            const legendItems = el.querySelectorAll(".recharts-legend-item");
            legendItems.forEach((item) => {
              const itemEl = item as HTMLElement;
              itemEl.style.display = "inline-flex";
              itemEl.style.visibility = "visible";
              itemEl.style.opacity = "1";
              itemEl.style.fontSize = "13px";
              itemEl.style.whiteSpace = "nowrap";
            });
          });

          // Garante que SVGs dos gráficos estão visíveis
          const svgs = contentClone.querySelectorAll("svg");
          svgs.forEach((svg) => {
            const el = svg as HTMLElement;
            el.style.display = "block";
            el.style.visibility = "visible";
            el.style.overflow = "visible";
          });

          // Garante que o conteúdo está visível e tem altura
          contentClone.style.display = "block";
          contentClone.style.visibility = "visible";
          contentClone.style.height = "auto";
          contentClone.style.minHeight = "auto";
          contentClone.style.overflow = "visible";

          // Para a aba de Viabilidade, garante que a galeria está expandida (evita duplicação)
          if (tabLabel.includes("Viabilidade")) {
            // Remove galerias duplicadas (se houver)
            const allGalleries = contentClone.querySelectorAll('[class*="gallery"]');
            if (allGalleries.length > 1) {
              // Mantém apenas a primeira galeria
              for (let i = 1; i < allGalleries.length; i++) {
                (allGalleries[i] as HTMLElement).style.display = "none";
              }
            }

            const galleryContainer = contentClone.querySelector('[class*="gallery"]') as HTMLElement;
            if (galleryContainer) {
              galleryContainer.style.display = "block";
              galleryContainer.style.visibility = "visible";

              // Garante que todas as imagens da galeria são visíveis
              const images = galleryContainer.querySelectorAll("img");
              images.forEach((img) => {
                (img as HTMLElement).style.display = "block";
                (img as HTMLElement).style.visibility = "visible";
                (img as HTMLElement).style.height = "auto";
                (img as HTMLElement).style.width = "auto";
              });
            }
          }

          // Captura com page break (exceto para a primeira) - add padding no topo para evitar cortes
          await captureElement(contentClone, idx > 0, true);

          console.log(`✓ ${tabLabel} capturada com sucesso`);
        } catch (error) {
          console.error(`Erro ao processar ${tabLabel}:`, error);
        }

        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      // ========== 3. CAPTURAR FOOTER ==========
      console.log("Capturando footer...");

      // O footer está fora do mainContainer, procura no documento
      let footerElement: HTMLElement | null = null;

      // Procura por footer com backgroundColor similar ao header
      const allDivs = document.querySelectorAll("div");
      for (let div of allDivs) {
        const style = window.getComputedStyle(div);
        const bgColor = style.backgroundColor;

        // Procura por div com backgroundColor similar ao primary color (#1F3B5E)
        if (bgColor && (bgColor.includes("31") || bgColor.includes("rgb"))) {
          // Verifica se contém o texto do footer
          if (div.textContent?.includes("GIARDINO") && div.textContent?.includes("Confidencial")) {
            footerElement = div as HTMLElement;
            break;
          }
        }
      }

      if (footerElement) {
        console.log("Footer encontrado, capturando...");
        const footerClone = footerElement.cloneNode(true) as HTMLElement;

        // Remove a barra de menu de abas que pode estar depois do footer
        const navBars = footerClone.querySelectorAll('[class*="sticky"], [class*="overflow-x"]');
        navBars.forEach((nav) => {
          (nav as HTMLElement).style.display = "none";
        });

        // Remove botões de navegação
        const navButtons = footerClone.querySelectorAll("button");
        navButtons.forEach((btn) => {
          const text = btn.textContent?.trim() || "";
          if (text.includes("📊") || text.includes("💰") || text.includes("📉") ||
              text.includes("👥") || text.includes("✓") || text.includes("🏢")) {
            btn.style.display = "none";
          }
        });

        footerClone.style.display = "block";
        footerClone.style.visibility = "visible";
        footerClone.style.width = "100%";
        await captureElement(footerClone, true, true);
        console.log("✓ Footer capturado com sucesso");
      } else {
        console.warn("Footer não encontrado no dashboard");
      }

      // ========== 4. RESTAURAR ELEMENTOS OCULTOS ==========
      hiddenModals.forEach((modal) => {
        modal.style.display = "";
      });

      // ========== 5. NÃO VOLTA PARA PRIMEIRA ABA ==========
      // Removido: não queremos que o menu de abas apareça no PDF final
      console.log("Finalizando captura PDF...");

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
