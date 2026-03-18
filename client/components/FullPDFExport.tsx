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

      // Função melhorada para capturar e adicionar ao PDF
      const captureAndAdd = async (
        element: HTMLElement,
        isFirstPage: boolean = false
      ) => {
        try {
          // Captura com html2canvas com configurações otimizadas
          const canvas = await html2canvas(element, {
            scale: 1.5, // Escala balanceada
            logging: false,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
            imageTimeout: 5000,
            windowHeight: element.scrollHeight + 100,
            windowWidth: element.offsetWidth,
            onclone: (doc) => {
              // Garante que o clone está com display correto
              const clone = doc.querySelector('[data-cloned]') as HTMLElement;
              if (clone) {
                clone.style.display = "block";
                clone.style.visibility = "visible";
              }
            },
          });

          const imgData = canvas.toDataURL("image/png", 0.95);
          const imgWidth = contentWidth;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          let yPosition = margin;
          let heightLeft = imgHeight;
          let isFirstSection = isFirstPage;

          while (heightLeft > 0) {
            if (!isFirstSection) {
              pdf.addPage();
            }
            isFirstSection = false;

            const pageHeightAvailable = pageHeight - margin * 2;
            const heightToDraw = Math.min(heightLeft, pageHeightAvailable);

            pdf.addImage(
              imgData,
              "PNG",
              margin,
              yPosition,
              imgWidth,
              imgHeight
            );

            heightLeft -= pageHeightAvailable;

            if (heightLeft > 0) {
              yPosition = margin;
            }
          }

          return true;
        } catch (error) {
          console.error("Erro ao capturar elemento:", error);
          return false;
        }
      };

      // Encontra o container principal
      const mainContainer = document.querySelector(".min-h-screen");
      if (!mainContainer) {
        alert("Dashboard não encontrado! Recarregue a página e tente novamente.");
        setIsGenerating(false);
        return;
      }

      let isFirstPage = true;

      // ======== 1. HEADER ========
      // Encontra o header (com logo e título)
      const headerQuery = mainContainer.querySelector(
        'div[style*="background"][style*="linear-gradient"]'
      ) as HTMLElement | null;

      if (headerQuery) {
        // Cria um div temporário com o header clonado
        const headerClone = headerQuery.cloneNode(true) as HTMLElement;
        headerClone.setAttribute("data-cloned", "true");
        
        // Remove o botão PDF do clone
        const pdfButtons = headerClone.querySelectorAll("button");
        pdfButtons.forEach((btn) => {
          const text = btn.textContent || "";
          if (text.includes("Baixar") || text.includes("PDF") || text.includes("📄")) {
            btn.style.display = "none";
          }
        });

        // Adiciona ao DOM temporariamente para capturar
        const temp = document.createElement("div");
        temp.style.position = "absolute";
        temp.style.left = "-9999px";
        temp.appendChild(headerClone);
        document.body.appendChild(temp);

        await new Promise((r) => setTimeout(r, 300));
        await captureAndAdd(headerClone, isFirstPage);
        isFirstPage = false;

        document.body.removeChild(temp);
      }

      // ======== 2. ENCONTRAR E PROCESSAR ABAS ========
      // Procura pelos botões de abas
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

      console.log(`Encontradas ${tabButtons.length} abas`);

      // Processa cada aba
      for (let i = 0; i < tabButtons.length; i++) {
        const tabBtn = tabButtons[i];
        const tabLabel = tabBtn.textContent?.trim() || `Aba ${i + 1}`;

        console.log(`Processando aba: ${tabLabel}`);

        // Clica na aba
        tabBtn.click();

        // Aguarda renderização (aumentado para garantir carregamento)
        await new Promise((resolve) => setTimeout(resolve, 1800));

        try {
          // Encontra o conteúdo da aba (div com id dashboard-content)
          const contentContainer = mainContainer.querySelector(
            "#dashboard-content"
          ) as HTMLElement;

          if (!contentContainer) {
            console.warn(`Conteúdo não encontrado para aba ${tabLabel}`);
            continue;
          }

          // Cria um clone para trabalhar
          const contentClone = contentContainer.cloneNode(true) as HTMLElement;
          contentClone.setAttribute("data-cloned", "true");
          
          // Remove elementos de navegação/botões do clone
          const navElements = contentClone.querySelectorAll(
            'button[class*="py-3"], button[class*="py-4"]'
          );
          navElements.forEach((el) => {
            (el as HTMLElement).style.display = "none";
          });

          // Adiciona largura e espaçamento apropriados para PDF
          contentClone.style.width = "100%";
          contentClone.style.padding = "20px";
          contentClone.style.boxSizing = "border-box";
          contentClone.style.backgroundColor = "#ffffff";

          // Adiciona ao DOM temporariamente
          const temp = document.createElement("div");
          temp.style.position = "absolute";
          temp.style.left = "-9999px";
          temp.style.width = "900px"; // Largura compatível com A4
          temp.appendChild(contentClone);
          document.body.appendChild(temp);

          await new Promise((r) => setTimeout(r, 500));

          // Captura e adiciona ao PDF
          const success = await captureAndAdd(contentClone, isFirstPage);
          if (success) {
            isFirstPage = false;
          }

          document.body.removeChild(temp);
        } catch (error) {
          console.error(`Erro ao processar aba ${tabLabel}:`, error);
        }

        // Pequena pausa entre abas
        await new Promise((r) => setTimeout(r, 200));
      }

      // ======== 3. FOOTER ========
      // Procura pelo footer
      const footerQuery = mainContainer.querySelector(
        'div[class*="py-12"][class*="mt-20"]'
      ) as HTMLElement;

      if (footerQuery) {
        const footerClone = footerQuery.cloneNode(true) as HTMLElement;
        footerClone.setAttribute("data-cloned", "true");
        footerClone.style.backgroundColor = "#1F3B5E";
        footerClone.style.padding = "30px";
        footerClone.style.textAlign = "center";

        const temp = document.createElement("div");
        temp.style.position = "absolute";
        temp.style.left = "-9999px";
        temp.appendChild(footerClone);
        document.body.appendChild(temp);

        await new Promise((r) => setTimeout(r, 300));
        await captureAndAdd(footerClone, isFirstPage);

        document.body.removeChild(temp);
      }

      // ======== 4. ADICIONAR NÚMEROS DE PÁGINA ========
      const totalPages = pdf.internal.pages.length - 1;
      pdf.setFont("Montserrat", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);

      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.text(`Página ${i} de ${totalPages}`, pageWidth / 2, pageHeight - 7, {
          align: "center",
        });
      }

      // ======== 5. VOLTAR PARA PRIMEIRA ABA ========
      if (tabButtons.length > 0) {
        tabButtons[0].click();
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // ======== 6. SALVAR PDF ========
      pdf.save("GIARDINO-Projeto-Completo-Premium.pdf");

      alert(
        "✅ PDF Completo gerado com sucesso!\n\n" +
          "📄 GIARDINO-Projeto-Completo-Premium.pdf\n\n" +
          `✓ Total de páginas: ${totalPages}\n\n` +
          "✓ Contém:\n" +
          "• Header com logo GIARDINO\n" +
          "• Todos os KPIs e cards\n" +
          "• Gráficos e charts completos\n" +
          "• Tabelas detalhadas\n" +
          "• Imagens e galeria\n" +
          "• 6 Abas completas:\n" +
          "  - 📊 Geral\n" +
          "  - 💰 Receitas\n" +
          "  - 📉 Custos\n" +
          "  - 👥 RH\n" +
          "  - ✓ Viabilidade\n" +
          "  - 🏢 Sobre\n" +
          "• Footer com branding\n" +
          "• Numeração automática\n" +
          "• Formatação A4 profissional"
      );
    } catch (error) {
      console.error("Erro geral ao gerar PDF:", error);
      alert(
        "❌ Erro ao gerar PDF.\n\nTente:\n" +
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
