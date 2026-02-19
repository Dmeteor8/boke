/**
 * Next.js 配置
 * 
 * 配置性能优化和构建选项
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用严格模式
  reactStrictMode: true,

  // 压缩
  compress: true,

  // 图片优化配置
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 年
  },

  // 编译器优化
  compiler: {
    // 移除 console.log（生产环境）
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // 实验性功能
  experimental: {
    // 优化包导入
    optimizePackageImports: ['framer-motion'],
  },

  // 输出配置
  output: 'standalone',

  // 性能优化
  poweredByHeader: false,
};

module.exports = nextConfig;
