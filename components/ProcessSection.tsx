/**
 * ProcessSection 组件
 * 
 * 展示合作流程的区块组件
 * 需求：4.1-4.5
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { ProcessSectionProps } from '../types';

/**
 * 合作流程区块组件
 * 
 * 特性：
 * - 渲染四个合作阶段
 * - 使用时间线样式展示流程
 * - 响应式布局（移动端垂直，桌面端水平）
 * - 步骤编号和连接线视觉效果
 */
export const ProcessSection: React.FC<ProcessSectionProps> = ({ steps }) => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* 区块标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            合作流程
          </h2>
          <p className="text-lg text-gray-600">
            清晰的流程，让项目推进更有保障
          </p>
        </motion.div>

        {/* 时间线容器 - 桌面端水平，移动端垂直 */}
        <div className="relative">
          {/* 连接线 - 桌面端水平 */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 transform -translate-y-1/2"></div>
          
          {/* 连接线 - 移动端垂直 */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-600"></div>

          {/* 步骤网格 */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <ProcessStepCard
                key={step.id}
                step={step}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * 流程步骤卡片组件
 */
interface ProcessStepCardProps {
  step: {
    id: string;
    order: number;
    title: string;
    description: string;
  };
  index: number;
}

const ProcessStepCard: React.FC<ProcessStepCardProps> = ({ step, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
      }}
      className="relative"
    >
      {/* 步骤卡片 */}
      <div className="relative bg-white rounded-lg shadow-lg p-6 lg:p-8 hover:shadow-xl transition-shadow duration-300 ml-16 lg:ml-0">
        {/* 步骤编号圆圈 - 移动端在左侧，桌面端在顶部 */}
        <div className="absolute -left-16 top-6 lg:left-1/2 lg:-top-16 lg:-translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg z-10">
          <span className="text-2xl font-bold text-white">{step.order}</span>
        </div>

        {/* 步骤内容 */}
        <div className="lg:pt-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
            {step.title}
          </h3>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProcessSection;
