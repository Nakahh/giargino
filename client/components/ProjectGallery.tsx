import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GalleryImage {
  url: string;
  title: string;
  category: "dining" | "pool" | "sports" | "facilities" | "gardens" | "residences";
  description: string;
}

// Giardino Project Photos - Real Images URLs
const galleryImagesBase: Array<GalleryImage & { index: number }> = [
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2Fa067ca4bbd23418da604f0a0be440e7a?format=webp&width=1200",
    title: "",
    category: "dining",
    description: "",
    index: 0,
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2F3b289804842f48e7ba6c7336aeebd197?format=webp&width=1200",
    title: "",
    category: "pool",
    description: "",
    index: 1,
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2Ffc6a1a394a7e41699eca446712818e7f?format=webp&width=1200",
    title: "",
    category: "sports",
    description: "",
    index: 2,
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2Fd6137460547d4b51a94c210a5592a91e?format=webp&width=1200",
    title: "",
    category: "facilities",
    description: "",
    index: 3,
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2F7d667954fcd34263859b88608d9ccf15?format=webp&width=1200",
    title: "",
    category: "facilities",
    description: "",
    index: 4,
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2F5551d0485b564236aa1843f5240f438e?format=webp&width=1200",
    title: "",
    category: "sports",
    description: "",
    index: 5,
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2Fda58e1d2441b45f7a977f1baaa7127b0?format=webp&width=1200",
    title: "",
    category: "pool",
    description: "",
    index: 6,
  },
  {
    url: "https://cdn.builder.io/api/v1/image/assets%2F762d7c0e481d4150a40ab9f799de5814%2F56f58a6bd34344af91499c540cee3f5b?format=webp&width=1200",
    title: "",
    category: "facilities",
    description: "",
    index: 7,
  },
];

export function ProjectGallery() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<"all" | GalleryImage["category"]>("all");

  // Translate image titles and descriptions dynamically
  const galleryImages = galleryImagesBase.map((img) => ({
    ...img,
    title: t(`ui.gallery.images.${img.index}.title`),
    description: t(`ui.gallery.images.${img.index}.description`),
  }));

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const categories: (GalleryImage["category"] | "all")[] = [
    "all",
    "dining",
    "pool",
    "sports",
    "facilities",
  ];

  const handlePrevious = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? filteredImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === filteredImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="space-y-8">
      {/* Gallery Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2" style={{ color: "#0F3460" }}>
          {t('ui.gallery.title')}
        </h2>
        <p className="text-gray-600">
          {t('ui.gallery.description')}
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentImageIndex(0);
            }}
            className={`px-6 py-2 rounded-full font-semibold transition-all ${
              selectedCategory === category
                ? "text-white shadow-lg"
                : "text-gray-700 bg-gray-100 hover:bg-gray-200"
            }`}
            style={
              selectedCategory === category
                ? {
                    backgroundColor: "#0F3460",
                    borderColor: "#FCD34D",
                    borderWidth: "2px",
                  }
                : {}
            }
          >
            {category === "all"
              ? t('ui.gallery.allCategories')
              : t(`ui.gallery.categories.${category}`)}
          </button>
        ))}
      </div>

      {/* Main Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image, index) => (
          <div
            key={index}
            className="group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:scale-105"
            onClick={() => {
              setSelectedImage(image);
              setCurrentImageIndex(index);
            }}
          >
            <div className="relative h-64 overflow-hidden bg-gray-200">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-lg"
                  style={{ borderColor: "#FCD34D", borderWidth: "2px" }}
                >
                  {t('ui.gallery.viewDetails')}
                </button>
              </div>
            </div>
            <div className="p-4 bg-white">
              <p className="text-sm font-semibold mb-1" style={{ color: "#0F3460" }}>
                {t(`ui.gallery.categories.${image.category}`)}
              </p>
              <h3 className="font-bold text-gray-900">{image.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{image.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            {/* Image Container */}
            <div className="relative mb-6">
              <img
                src={filteredImages[currentImageIndex].url}
                alt={filteredImages[currentImageIndex].title}
                className="w-full h-auto rounded-lg"
              />

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 text-white hover:text-gray-300 transition"
              >
                <ChevronLeft size={40} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 text-white hover:text-gray-300 transition"
              >
                <ChevronRight size={40} />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition bg-black bg-opacity-50 rounded-full p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Image Info */}
            <div className="bg-white rounded-lg p-6">
              <p className="text-sm font-semibold mb-2" style={{ color: "#0F3460" }}>
                {t(`ui.gallery.categories.${filteredImages[currentImageIndex].category}`)}
              </p>
              <h3 className="text-2xl font-bold mb-2 text-gray-900">
                {filteredImages[currentImageIndex].title}
              </h3>
              <p className="text-gray-600 mb-4">
                {filteredImages[currentImageIndex].description}
              </p>

              {/* Image Counter */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {t('ui.gallery.imageCounter', { current: currentImageIndex + 1, total: filteredImages.length })}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevious}
                    className="px-4 py-2 rounded-lg border-2 transition"
                    style={{ borderColor: "#0F3460", color: "#0F3460" }}
                  >
                    {t('ui.gallery.previousBtn')}
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded-lg text-white transition"
                    style={{ backgroundColor: "#0F3460" }}
                  >
                    {t('ui.gallery.nextBtn')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
