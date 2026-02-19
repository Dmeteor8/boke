/**
 * CasesSection 组件
 * 
 * 展示项目案例的区块组件
 * 需求：3.1-3.3, 3.6
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './Card';
import type { CasesSectionProps, CaseStudy } from '../types';

/**
 * 项目案例区块组件
 * 
 * 特性：
 * - 渲染案例列表（至少 2 个案例）
 * - 实现案例卡片点击展开/收起详情
 * - 显示案例标题、交付周期、亮点
 * - 响应式网格布局
 */
export const CasesSection: React.FC<CasesSectionProps> = ({ cases }) => {
  const [expandedCaseId, setExpandedCaseId] = useState<string | null>(null);

  const toggleCase = (caseId: string) => {
    setExpandedCaseId(expandedCaseId === caseId ? null : caseId);
  };

  return (
    <section className="py-16 px-4 bg-white">
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
            项目案例
          </h2>
          <p className="text-lg text-gray-600">
            真实项目案例展示，稳定运行，按时交付
          </p>
        </motion.div>

        {/* 案例网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cases.map((caseStudy, index) => (
            <CaseCard
              key={caseStudy.id}
              caseStudy={caseStudy}
              isExpanded={expandedCaseId === caseStudy.id}
              onToggle={() => toggleCase(caseStudy.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * 案例卡片组件
 */
interface CaseCardProps {
  caseStudy: CaseStudy;
  isExpanded: boolean;
  onToggle: () => void;
  index: number;
}

const CaseCard: React.FC<CaseCardProps> = ({
  caseStudy,
  isExpanded,
  onToggle,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
      }}
      data-testid="case-card"
    >
      <Card
        variant="elevated"
        onClick={onToggle}
        className="h-full cursor-pointer hover:shadow-xl transition-shadow duration-300"
      >
        <div className="space-y-4">
          {/* 案例标题 */}
          <div className="flex items-start justify-between">
            <h3 className="text-xl font-bold text-gray-900 flex-1">
              {caseStudy.title}
            </h3>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-blue-600 flex-shrink-0 ml-2"
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </motion.svg>
          </div>

          {/* 交付周期 */}
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-green-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-semibold text-green-600">
              交付周期：{caseStudy.deliveryTime}
            </span>
          </div>

          {/* 简短描述（始终显示） */}
          <p className="text-gray-700 leading-relaxed">
            {caseStudy.description}
          </p>

          {/* 展开的详细信息 */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    项目亮点
                  </h4>
                  <ul className="space-y-2">
                    {caseStudy.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-700 text-sm leading-relaxed">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 点击提示 */}
          <div className="text-center pt-2">
            <span className="text-xs text-gray-500">
              {isExpanded ? '点击收起详情' : '点击查看详情'}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CasesSection;
