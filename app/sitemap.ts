/**
 * Sitemap 生成器
 * 
 * 为搜索引擎生成网站地图
 * 需求：10.5
 */

import { MetadataRoute } from 'next';

/**
 * 生成 sitemap.xml
 * 
 * Next.js 会自动将此函数的返回值转换为 sitemap.xml 文件
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourdomain.com';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];
}
