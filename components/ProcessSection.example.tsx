/**
 * ProcessSection 组件示例
 * 
 * 展示如何使用 ProcessSection 组件
 */

import React from 'react';
import { ProcessSection } from './ProcessSection';
import type { ProcessStep } from '../types';

/**
 * 示例数据：四个合作阶段
 */
const exampleSteps: ProcessStep[] = [
  {
    id: 'step-1',
    order: 1,
    title: '需求沟通与方案评估',
    description: '深入了解您的业务需求，评估技术可行性，提供初步解决方案建议',
  },
  {
    id: 'step-2',
    order: 2,
    title: '出具功能说明与报价',
    description: '根据需求整理详细功能清单，明确开发范围，提供透明的项目报价',
  },
  {
    id: 'step-3',
    order: 3,
    title: '分阶段开发与测试',
    description: '按照约定的时间节点推进开发，定期同步进度，确保功能符合预期',
  },
  {
    id: 'step-4',
    order: 4,
    title: '验收确认后正式上线',
    description: '完成功能验收，提供上线指导和基础维护，确保系统稳定运行',
  },
];

/**
 * 基础示例
 */
export function BasicExample() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ProcessSection steps={exampleSteps} />
    </div>
  );
}

/**
 * 自定义步骤示例
 */
export function CustomStepsExample() {
  const customSteps: ProcessStep[] = [
    {
      id: 'custom-1',
      order: 1,
      title: '项目启动',
      description: '确定项目目标和范围',
    },
    {
      id: 'custom-2',
      order: 2,
      title: '设计阶段',
      description: '完成UI/UX设计和技术架构设计',
    },
    {
      id: 'custom-3',
      order: 3,
      title: '开发实施',
      description: '按照设计文档进行功能开发',
    },
    {
      id: 'custom-4',
      order: 4,
      title: '测试上线',
      description: '全面测试后部署到生产环境',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <ProcessSection steps={customSteps} />
    </div>
  );
}

export default BasicExample;
