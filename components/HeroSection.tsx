/**
 * HeroSection 组件
 * 
 * 首屏展示区域，包含主标题、副标题、目标客户标签、联系信息和 CTA 按钮
 * 需求：1.1-1.5, 7.7-7.8
 */

'use client';

import React from 'react';
import type { HeroSectionProps } from '../types';
import { Button } from './Button';
import { useViewport } from './ResponsiveLayout';

/**
 * HeroSection 组件
 * 
 * 特性：
 * - 显示主标题、副标题和目标客户标签
 * - 显示联系信息（电话、邮箱）
 * - 两个 CTA 按钮："预约沟通"和"查看案例"
 * - 响应式布局（移动端垂直堆叠，桌面端水平布局）
 * - 电话使用 tel: 协议，邮箱使用 mailto: 协议
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  targetAudience,
  contactInfo,
  ctaButtons,
}) => {
  const { viewport } = useViewport();
  const isMobile = viewport === 'mobile';

  return (
    <section 
      className="w-full bg-gradient-to-br from-blue-50 to-gray-50 py-12 md:py-20 lg:py-24"
      data-testid="hero-section"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <div className={`flex flex-col ${isMobile ? 'gap-8' : 'md:flex-row md:items-center md:justify-between md:gap-12'}`}>
          {/* 左侧内容区 */}
          <div className="flex-1 space-y-6">
            {/* 主标题 */}
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              data-testid="hero-title"
            >
              {title}
            </h1>

            {/* 副标题 */}
            <p 
              className="text-lg md:text-xl text-gray-700 leading-relaxed"
              data-testid="hero-subtitle"
            >
              {subtitle}
            </p>

            {/* 目标客户标签 */}
            <div 
              className="flex flex-wrap gap-2 md:gap-3"
              data-testid="hero-target-audience"
            >
              {targetAudience.map((audience, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-800 text-sm md:text-base font-medium rounded-full"
                  data-testid={`audience-tag-${index}`}
                >
                  {audience}
                </span>
              ))}
            </div>

            {/* CTA 按钮组 */}
            <div 
              className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4"
              data-testid="hero-cta-buttons"
            >
              {ctaButtons.map((button, index) => (
                <Button
                  key={index}
                  variant={button.variant}
                  size="lg"
                  onClick={button.action}
                  data-testid={`cta-button-${index}`}
                >
                  {button.text}
                </Button>
              ))}
            </div>
          </div>

          {/* 右侧联系信息区 */}
          <div 
            className="flex-shrink-0 bg-white rounded-2xl shadow-lg p-6 md:p-8 space-y-4 md:w-80 lg:w-96"
            data-testid="hero-contact-info"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
              联系我们
            </h2>

            {/* 电话 */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-medium">电话</p>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-3 text-lg md:text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors group"
                data-testid="hero-phone"
              >
                <svg 
                  className="w-6 h-6 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
                <span className="group-hover:underline">{contactInfo.phone}</span>
              </a>
            </div>

            {/* 邮箱 */}
            <div className="space-y-2">
              <p className="text-sm text-gray-600 font-medium">邮箱</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-lg md:text-xl font-semibold text-blue-600 hover:text-blue-700 transition-colors group break-all"
                data-testid="hero-email"
              >
                <svg 
                  className="w-6 h-6 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                <span className="group-hover:underline">{contactInfo.email}</span>
              </a>
            </div>

            {/* 提示文本 */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 leading-relaxed">
                我们专注于为企业提供专业、稳定的网站与系统定制服务
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
