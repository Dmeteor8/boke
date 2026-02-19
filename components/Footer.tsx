/**
 * Footer 组件
 * 
 * 网站底部区块，显示联系信息、CTA 按钮和版权信息
 * 需求：7.5-7.6
 */

import React from 'react';
import type { FooterProps } from '../types';
import { Button } from './Button';

/**
 * Footer 组件
 * 
 * 特性：
 * - 显示联系信息（电话、邮箱）
 * - 提供"预约沟通"按钮
 * - 显示版权信息
 * - 响应式布局
 * - 电话和邮箱可点击
 */
export const Footer: React.FC<FooterProps> = ({
  contactInfo,
  copyright,
  onContactClick,
}) => {
  return (
    <footer className="bg-gray-900 text-white py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 主要内容区 */}
        <div className="max-w-4xl mx-auto">
          {/* 联系信息和 CTA */}
          <div className="text-center space-y-6 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">
              开始您的项目
            </h2>
            <p className="text-gray-300 text-lg">
              专业的技术团队，为您提供稳定可靠的解决方案
            </p>

            {/* 联系方式 */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-lg">
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                aria-label={`拨打电话 ${contactInfo.phone}`}
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
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
                <span className="font-medium">{contactInfo.phone}</span>
              </a>

              <span className="hidden sm:inline text-gray-600">|</span>

              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group"
                aria-label={`发送邮件至 ${contactInfo.email}`}
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
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
                <span className="font-medium">{contactInfo.email}</span>
              </a>
            </div>

            {/* CTA 按钮 */}
            <div className="pt-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onContactClick}
                className="min-w-[200px]"
              >
                预约沟通
              </Button>
            </div>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-gray-700 my-8"></div>

          {/* 版权信息 */}
          <div className="text-center text-gray-400 text-sm">
            <p>{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
