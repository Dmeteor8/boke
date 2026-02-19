/**
 * 根布局
 * 
 * Next.js 应用的根布局，配置全局元数据和样式
 * 需求：10.1-10.2
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// 优化字体加载
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

/**
 * 网站元数据配置
 * 
 * 包含 SEO 优化所需的所有元数据
 */
export const metadata: Metadata = {
  // 基础元数据
  title: {
    default: '企业服务定制 - 专业网站与系统开发服务',
    template: '%s | 企业服务定制',
  },
  description:
    '专注为中小企业提供专业的网站定制、后台管理系统开发和自动化解决方案。规范流程，稳定可靠，长期合作伙伴。联系电话：13151488988',
  keywords: [
    '企业官网定制',
    '后台管理系统',
    '自动化系统开发',
    '网站建设',
    '系统开发',
    '企业数字化',
    '中小企业服务',
  ],

  // 作者和版权
  authors: [{ name: '企业服务定制' }],
  creator: '企业服务定制',
  publisher: '企业服务定制',

  // Open Graph 元数据（社交媒体分享）
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://yourdomain.com',
    siteName: '企业服务定制',
    title: '企业服务定制 - 专业网站与系统开发服务',
    description:
      '专注为中小企业提供专业的网站定制、后台管理系统开发和自动化解决方案',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '企业服务定制',
      },
    ],
  },

  // Twitter Card 元数据
  twitter: {
    card: 'summary_large_image',
    title: '企业服务定制 - 专业网站与系统开发服务',
    description:
      '专注为中小企业提供专业的网站定制、后台管理系统开发和自动化解决方案',
    images: ['/og-image.jpg'],
  },

  // 其他元数据
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console 验证（需要替换为实际值）
    // google: 'your-google-verification-code',
  },
};

/**
 * 根布局组件
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <head>
        {/* 字符集和视口 */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 主题颜色 */}
        <meta name="theme-color" content="#1e40af" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* DNS 预解析和预连接 */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
