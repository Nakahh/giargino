import { FileText, Loader } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export function SimplePDFExport() {
  const [isGenerating, setIsGenerating] = useState(false);
  const { t } = useTranslation();

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      console.log("=== INICIANDO GERAÇÃO DE PDF ===");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth(); // 210mm
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297mm
      const margin = 10;
      const contentWidth = pageWidth - margin * 2; // 190mm
      const maxHeightPerPage = pageHeight - margin * 2; // 277mm

      let totalPages = 0;

      // ===== HELPER: Adicionar página ao PDF =====
      const addImageToPDF = async (element: HTMLElement, addPageBreak = false) => {
        // Clone do elemento
        const clone = element.cloneNode(true) as HTMLElement;

        // Garantir visibilidade e tamanho
        clone.style.display = "block";
        clone.style.visibility = "visible";
        clone.style.width = "100%";
        clone.style.height = "auto";
        clone.style.overflow = "visible";
        clone.style.position = "relative";
        clone.style.margin = "0";
        clone.style.padding = "20px";
        clone.style.boxSizing = "border-box";
        clone.style.backgroundColor = "#ffffff";

        // Criar container temporário
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.left = "-9999px";
        container.style.top = "-9999px";
        container.style.width = "1200px"; // Largura fixa para PDF
        container.style.visibility = "visible";
        container.style.backgroundColor = "#ffffff";

        container.appendChild(clone);
        document.body.appendChild(container);

        try {
          // Remover elementos desnecessários do clone
          const menuBtns = clone.querySelectorAll("button");
          menuBtns.forEach((btn) => {
            const text = btn.textContent || "";
            // Remover botões de aba e PDF
            if (
              text.includes("📊") ||
              text.includes("💰") ||
              text.includes("📉") ||
              text.includes("👥") ||
              text.includes("✓") ||
              text.includes("🏢") ||
              text.includes("Baixar") ||
              text.includes("📄")
            ) {
              btn.style.display = "none";
            }
          });

          // Remover modais
          const modals = clone.querySelectorAll("[role='dialog'], .fixed.inset-0");
          modals.forEach((m) => {
            (m as HTMLElement).style.display = "none";
          });

          // Capturar com html2canvas
          console.log(`Capturando elemento: ${element.className}`);
          const canvas = await html2canvas(clone, {
            scale: 2,
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            windowWidth: 1200,
            windowHeight: clone.scrollHeight,
            imageTimeout: 15000,
          });

          const imgWidth = contentWidth;
          const imgHeight = (canvas.height / canvas.width) * imgWidth;

          // Calcular quantas páginas são necessárias
          const pagesNeeded = Math.ceil(imgHeight / maxHeightPerPage);
          console.log(`Elemento necessita ${pagesNeeded} página(s) (altura: ${imgHeight.toFixed(1)}mm)`);

          // Adicionar page break se necessário
          if (addPageBreak && totalPages > 0) {
            pdf.addPage();
            totalPages++;
            console.log(`Page break adicionado. Total: ${totalPages} páginas`);
          }

          // Processar cada página
          for (let pageIdx = 0; pageIdx < pagesNeeded; pageIdx++) {
            // Adicionar página se necessária
            if (pageIdx > 0) {
              pdf.addPage();
              totalPages++;
            } else if (totalPages === 0) {
              totalPages++;
            }

            // Calcular slice da imagem para esta página
            const sourceY = (pageIdx * maxHeightPerPage * canvas.height) / imgHeight;
            const sourceHeight = Math.min(
              (maxHeightPerPage * canvas.height) / imgHeight,
              canvas.height - sourceY
            );
            const destHeight = (sourceHeight * imgHeight) / canvas.height;

            // Crop do canvas
            const cropCanvas = document.createElement("canvas");
            cropCanvas.width = canvas.width;
            cropCanvas.height = Math.ceil(sourceHeight);

            const ctx = cropCanvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(
                canvas,
                0, Math.round(sourceY),
                canvas.width, Math.round(sourceHeight),
                0, 0,
                canvas.width, Math.round(sourceHeight)
              );
            }

            const imageData = cropCanvas.toDataURL("image/jpeg", 0.92);
            pdf.addImage(imageData, "JPEG", margin, margin, imgWidth, destHeight);

            console.log(`✓ Página ${pageIdx + 1}/${pagesNeeded} adicionada (altura: ${destHeight.toFixed(1)}mm)`);
          }
        } finally {
          document.body.removeChild(container);
        }
      };

      // ===== 1. CAPTURAR HEADER =====
      console.log("\n--- Capturando HEADER ---");
      const mainContainer = document.querySelector(".min-h-screen");
      if (!mainContainer) {
        throw new Error("Container principal não encontrado");
      }

      // Encontrar o header (primeiro div com gradient)
      let headerElement: HTMLElement | null = null;
      const children = Array.from(mainContainer.children);

      for (const child of children) {
        const el = child as HTMLElement;
        const style = window.getComputedStyle(el);
        const bgImage = style.backgroundImage;
        const bgColor = style.backgroundColor;

        // Header tem gradient azul ou cor específica
        if (
          (bgImage && bgImage.includes("gradient")) ||
          (bgColor && (bgColor.includes("rgb(31, 59, 94)") || bgColor.includes("rgb(44, 62, 80)")))
        ) {
          headerElement = el;
          break;
        }
      }

      if (headerElement) {
        await addImageToPDF(headerElement, false);
        console.log("✓ Header capturado");
      } else {
        console.warn("⚠ Header não encontrado");
      }

      // ===== 2. CAPTURAR CONTEÚDO DAS ABAS =====
      console.log("\n--- Capturando ABAS ---");

      // Encontrar todos os botões de aba
      const tabButtons = Array.from(mainContainer.querySelectorAll("button")).filter((btn) => {
        const text = btn.textContent?.trim() || "";
        return (
          text.includes("📊") ||
          text.includes("💰") ||
          text.includes("📉") ||
          text.includes("👥") ||
          text.includes("✓") ||
          text.includes("🏢")
        );
      });

      console.log(`Encontradas ${tabButtons.length} abas`);

      for (let i = 0; i < tabButtons.length; i++) {
        const btn = tabButtons[i] as HTMLButtonElement;
        const tabName = btn.textContent?.trim() || `Aba ${i + 1}`;

        console.log(`\n[${i + 1}/${tabButtons.length}] Processando: ${tabName}`);

        // Clicar na aba
        btn.click();
        console.log("  → Aba clicada");

        // Aguardar renderização baseado no tipo de aba
        let waitMs = 3000; // default
        if (tabName.includes("Viabilidade")) waitMs = 5000; // galeria é lenta
        if (tabName.includes("Receitas") || tabName.includes("Custos")) waitMs = 4000;
        if (tabName.includes("RH")) waitMs = 3500;

        await new Promise((resolve) => setTimeout(resolve, waitMs));
        console.log(`  → Aguardado ${waitMs}ms para renderização`);

        // Encontrar conteúdo
        const contentDiv = mainContainer.querySelector("#dashboard-content") as HTMLElement;
        if (!contentDiv) {
          console.warn(`  ⚠ Conteúdo não encontrado para ${tabName}`);
          continue;
        }

        // Remover menu sticky de navegação
        const stickyNav = mainContainer.querySelector(".sticky.top-0") as HTMLElement;
        if (stickyNav) {
          stickyNav.style.display = "none";
        }

        // Capturar conteúdo
        try {
          await addImageToPDF(contentDiv, i > 0);
          console.log(`  ✓ ${tabName} capturada com sucesso`);
        } catch (error) {
          console.error(`  ✗ Erro ao capturar ${tabName}:`, error);
        }

        // Restaurar nav
        if (stickyNav) {
          stickyNav.style.display = "";
        }
      }

      // ===== 3. CAPTURAR FOOTER =====
      console.log("\n--- Capturando FOOTER ---");
      const allDivs = Array.from(document.querySelectorAll("div"));
      let footerElement: HTMLElement | null = null;

      for (const div of allDivs) {
        const text = div.textContent || "";
        const style = window.getComputedStyle(div);
        const bgColor = style.backgroundColor;

        // Footer tem cor azul escuro e texto específico
        if (
          text.includes("GIARDINO") &&
          text.includes("Confidencial") &&
          bgColor &&
          (bgColor.includes("rgb(31, 59, 94)") || bgColor.includes("rgb(44, 62, 80)"))
        ) {
          footerElement = div;
          break;
        }
      }

      if (footerElement) {
        await addImageToPDF(footerElement, true);
        console.log("✓ Footer capturado");
      } else {
        console.warn("⚠ Footer não encontrado");
      }

      // ===== 4. SALVAR PDF =====
      console.log("\n=== FINALIZANDO PDF ===");
      console.log(`Total de páginas: ${totalPages}`);

      pdf.save(t('ui.pdf.filename'));

      alert(
        `${t('ui.messages.pdfSuccess')}\n\n` +
        `📄 ${t('ui.pdf.filename')}\n\n` +
        `${t('ui.pdf.totalPages', { count: totalPages })}\n\n` +
        `${t('ui.pdf.includes')}\n` +
        `• ${t('ui.pdf.header')}\n` +
        `• ${t('ui.pdf.sixTabs')}\n` +
        `• ${t('ui.pdf.footer')}\n\n` +
        `⚠ ${t('ui.pdf.navigation')}\n` +
        `⚠ ${t('ui.pdf.design')}`
      );
    } catch (error) {
      console.error("ERRO:", error);
      alert(
        `${t('ui.messages.pdfError')}\n\n${error instanceof Error ? error.message : String(error)}\n\n` +
        `${t('ui.messages.tryAgain')}\n` +
        `${t('ui.messages.reloadPage')}\n` +
        `${t('ui.messages.waitLoad')}\n` +
        `${t('ui.messages.tryOnceMore')}`
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return null;
}
