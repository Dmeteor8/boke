/**
 * PricingSection 组件
 * 
 * 展示价格区间的区块组件
 * 需求：6.1-6.5
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './Card';
import type { PricingSectionProps } from '../types';

/**
 * 价格区间区块组件
 * 
 * 特性：
 * - 渲染三个服务类型和起始价格
 * - 强调"起"字（使用不同颜色或字体大小）
 * - 列出每个服务的特性
 * - 响应式网格布局（移动端 1 列，平板 2 列，桌面 3 列）
 */
export const PricingSection: React.FC<PricingSectionProps> = ({ services }) => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* 区块标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            服务价格
          </h2>
          <p className="text-lg text-gray-600">
            根据需求定制，提供专业的解决方案
          </p>
        </motion.div>

        {/* 价格网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <Card variant="elevated" className="h-full">
                <div className="space-y-6">
                  {/* 服务名称 */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {service.name}
                    </h3>
                  </div>

                  {/* 价格 - 强调"起"字 */}
                  <div className="flex items-baseline space-x-1">
                    <span className="text-4xl font-bold text-blue-600">
                      ¥{service.startingPrice.toLocaleString()}
                    </span>
                    <span className="text-2xl font-bold text-red-600">
                      起
                    </span>
                  </div>

                  {/* 分隔线 */}
                  <div className="border-t border-gray-200"></div>

                  {/* 服务特性列表 */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
                      服务特性
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-gray-700 text-sm leading-relaxed">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* 底部说明 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-gray-600">
            * 具体价格根据项目需求和功能复杂度确定，欢迎咨询详细报价
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
