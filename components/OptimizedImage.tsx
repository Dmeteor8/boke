/**
 * OptimizedImage 组件
 * 
 * 优化的图片组件，支持懒加载和响应式
 * 需求：9.2, 10.4
 */

import React from 'react';
import Image from 'next/image';

/**
 * 图片组件 Props
 */
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
}

/**
 * OptimizedImage 组件
 * 
 * 特性：
 * - 使用 Next.js Image 组件自动优化
 * - 非首屏图片自动懒加载
 * - 响应式图片尺寸
 * - 必须提供有意义的 alt 属性
 * - 自动格式转换（WebP）
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  fill = false,
  sizes,
  quality = 85,
}) => {
  // 验证 alt 属性
  if (!alt || alt.trim().length === 0) {
    console.warn('OptimizedImage: alt 属性不能为空，这会影响可访问性和 SEO');
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      className={className}
      sizes={sizes}
      quality={quality}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
    />
  );
};

export default OptimizedImage;
