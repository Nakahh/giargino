import React from "react";
import { useTranslation } from "react-i18next";

interface GalleryImage {
  url: string;
  title: string;
  category: "dining" | "pool" | "sports" | "facilities" | "gardens" | "residences";
  description: string;
}

// Giardino Project Photos - Real Images URLs
const galleryImages: GalleryImage[] = [
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2Fa067ca4bbd23418da604f0a0be440e7a?format=webp&width=1200",
    title: "Sala de Eventos Premium",
    category: "dining",
    description: "Espaço elegante para eventos e celebrações com capacidade para grandes grupos"
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2F3b289804842f48e7ba6c7336aeebd197?format=webp&width=1200",
    title: "Piscina Interna Aquecida",
    category: "pool",
    description: "Piscina climatizada para uso o ano todo com excelente iluminação natural"
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2Ffc6a1a394a7e41699eca446712818e7f?format=webp&width=1200",
    title: "Complexo Esportivo Multiuso",
    category: "sports",
    description: "Quadras profissionais para tênis, futsal e outras modalidades esportivas"
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2Fd6137460547d4b51a94c210a5592a91e?format=webp&width=1200",
    title: "Academia Fitness Premium",
    category: "facilities",
    description: "Equipamento de ponta com acompanhamento de personal trainers especializados"
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2F7d667954fcd34263859b88608d9ccf15?format=webp&width=1200",
    title: "Área Aérea do Resort",
    category: "facilities",
    description: "Vista panorâmica da área total do complexo Giardino - 258.900 m²"
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2F5551d0485b564236aa1843f5240f438e?format=webp&width=1200",
    title: "Campos de Futebol",
    category: "sports",
    description: "Campos profissionais com grama sintética e iluminação completa"
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2Fda58e1d2441b45f7a977f1baaa7127b0?format=webp&width=1200",
    title: "Piscina Aquecida Coberta",
    category: "pool",
    description: "Piscina com temperatura controlada para atividades de terapia e lazer"
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2F56f58a6bd34344af91499c540cee3f5b?format=webp&width=1200",
    title: "Salas de Aula e Terapia",
    category: "facilities",
    description: "Espaços dedicados para atividades terapêuticas e oficinas educacionais"
  },
];

const categoryLabels: Record<string, string> = {
  dining: "🍽️ Gastronomia",
  pool: "🏊 Piscinas",
  sports: "⚽ Esportes",
  facilities: "🏛️ Facilidades",
  gardens: "🌿 Jardins",
  residences: "🏠 Residências",
};

interface ProjectGalleryPDFProps {
  forPDF?: boolean;
}

/**
 * Versão da galeria otimizada para PDF - sem interatividade ou modais
 */
export function ProjectGalleryPDF({ forPDF = false }: ProjectGalleryPDFProps) {
  // Para PDF, renderizar todas as imagens em uma grade simples sem interatividade
  if (forPDF) {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                  backgroundColor: "#f3f4f6",
                }}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div style={{ padding: "12px" }}>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "#1F3B5E",
                    margin: "0 0 4px 0",
                  }}
                >
                  {categoryLabels[image.category]}
                </p>
                <h4
                  style={{
                    fontSize: "13px",
                    fontWeight: "bold",
                    color: "#111",
                    margin: "0 0 4px 0",
                  }}
                >
                  {image.title}
                </h4>
                <p
                  style={{
                    fontSize: "11px",
                    color: "#666",
                    margin: "0",
                    lineHeight: "1.4",
                  }}
                >
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Para web, usar a galeria original interativa
  return null;
}
