import { ImgHTMLAttributes, useState, useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string;
  alt: string;
  srcSet?: {
    webp: {
      '360w'?: string;
      '640w'?: string;
      '960w'?: string;
      '1280w'?: string;
    };
    jpg: {
      '360w'?: string;
      '640w'?: string;
      '960w'?: string;
      '1280w'?: string;
    };
  };
  sizes?: string;
  aspectRatio?: 'auto' | 'square' | 'video' | 'portrait';
  lazy?: boolean;
  onLoadComplete?: () => void;
}

/**
 * Componente para imagens responsivas otimizadas
 * Suporta:
 * - srcset com múltiplos widths (360w, 640w, 960w, 1280w)
 * - Formato WebP com fallback JPG
 * - Lazy loading
 * - Aspect ratio responsivo
 * - Loading skeleton
 */
export function ResponsiveImage({
  src,
  alt,
  srcSet,
  sizes,
  aspectRatio = 'auto',
  lazy = true,
  onLoadComplete,
  className = '',
  ...props
}: ResponsiveImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const aspectRatioClass = {
    auto: 'aspect-auto',
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
  }[aspectRatio];

  // Generate srcSet string for WebP
  const webpSrcSet = srcSet
    ? `
      ${srcSet.webp['360w'] ? `${srcSet.webp['360w']} 360w` : ''}
      ${srcSet.webp['640w'] ? `${srcSet.webp['640w']} 640w` : ''}
      ${srcSet.webp['960w'] ? `${srcSet.webp['960w']} 960w` : ''}
      ${srcSet.webp['1280w'] ? `${srcSet.webp['1280w']} 1280w` : ''}
    `.trim()
    : undefined;

  // Generate srcSet string for JPG
  const jpgSrcSet = srcSet
    ? `
      ${srcSet.jpg['360w'] ? `${srcSet.jpg['360w']} 360w` : ''}
      ${srcSet.jpg['640w'] ? `${srcSet.jpg['640w']} 640w` : ''}
      ${srcSet.jpg['960w'] ? `${srcSet.jpg['960w']} 960w` : ''}
      ${srcSet.jpg['1280w'] ? `${srcSet.jpg['1280w']} 1280w` : ''}
    `.trim()
    : undefined;

  // Default sizes if not provided
  const defaultSizes = '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px';
  const finalSizes = sizes || defaultSizes;

  return (
    <div className={`relative w-full overflow-hidden rounded-lg ${aspectRatioClass}`}>
      {/* Loading skeleton */}
      {!isLoaded && (
        <Skeleton className={`absolute inset-0 ${aspectRatioClass}`} />
      )}

      {/* WebP with JPG fallback */}
      <picture className="w-full h-full">
        {/* WebP format */}
        {webpSrcSet && (
          <source
            srcSet={webpSrcSet}
            sizes={finalSizes}
            type="image/webp"
          />
        )}

        {/* JPG format */}
        {jpgSrcSet && (
          <source
            srcSet={jpgSrcSet}
            sizes={finalSizes}
            type="image/jpeg"
          />
        )}

        {/* Fallback image */}
        <img
          src={src}
          alt={alt}
          sizes={finalSizes}
          loading={lazy ? 'lazy' : 'eager'}
          decoding="async"
          className={`
            w-full h-full object-cover
            transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${className}
          `}
          onLoad={() => {
            setIsLoaded(true);
            onLoadComplete?.();
          }}
          onError={() => {
            setImageError(true);
            setIsLoaded(true);
          }}
          {...props}
        />
      </picture>

      {/* Error state */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          <span className="text-sm text-gray-600">Erro ao carregar imagem</span>
        </div>
      )}
    </div>
  );
}

/**
 * Helper para gerar URLs de imagens responsivas
 * Exemplo de uso:
 * const srcSet = generateImageSrcSet('image-name', ['360', '640', '960', '1280'])
 */
export function generateImageSrcSet(
  baseName: string,
  widths: string[] = ['360', '640', '960', '1280'],
  baseUrl: string = '/images'
) {
  return {
    webp: Object.fromEntries(
      widths.map((w) => [`${w}w`, `${baseUrl}/${baseName}-${w}w.webp`])
    ),
    jpg: Object.fromEntries(
      widths.map((w) => [`${w}w`, `${baseUrl}/${baseName}-${w}w.jpg`])
    ),
  };
}
