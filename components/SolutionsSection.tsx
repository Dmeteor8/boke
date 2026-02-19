/**
 * SolutionsSection 组件
 * 
 * 展示问题-解决方案配对的区块组件
 * 需求：2.1-2.4
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './Card';
import type { SolutionsSectionProps } from '../types';

/**
 * 问题解决方案区块组件
 * 
 * 特性：
 * - 渲染三个问题-解决方案配对
 * - 使用 Card 组件展示每个配对
 * - 滚动进入视口时的渐显动画（Framer Motion）
 * - 响应式网格布局（移动端 1 列，平板 2 列，桌面 3 列）
 */
export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ solutions }) => {
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
            针对性解决方案
          </h2>
          <p className="text-lg text-gray-600">
            为您的业务痛点提供专业的定制化解决方案
          </p>
        </motion.div>

        {/* 解决方案网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <Card variant="elevated" className="h-full">
                <div className="space-y-4">
                  {/* 问题 */}
                  <div>
                    <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2">
                      问题
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      {solution.problem}
                    </p>
                  </div>

                  {/* 分隔线 */}
                  <div className="border-t border-gray-200"></div>

                  {/* 解决方案 */}
                  <div>
                    <h3 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-2">
                      解决方案
                    </h3>
                    <p className="text-lg font-medium text-gray-900">
                      {solution.solution}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
