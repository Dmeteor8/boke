/**
 * SolutionsSection 组件使用示例
 * 
 * 展示如何使用 SolutionsSection 组件
 */

import React from 'react';
import { SolutionsSection } from './SolutionsSection';
import type { Solution } from '../types';

/**
 * 基础示例：展示三个核心问题-解决方案配对
 */
export const BasicExample = () => {
  const solutions: Solution[] = [
    {
      id: 'solution-1',
      problem: '企业形象与品牌展示不足',
      solution: '定制企业官网',
    },
    {
      id: 'solution-2',
      problem: '管理流程分散，数据不清晰',
      solution: '定制后台管理系统',
    },
    {
      id: 'solution-3',
      problem: '人工操作多，效率低',
      solution: '自动化系统开发',
    },
  ];

  return <SolutionsSection solutions={solutions} />;
};

/**
 * 完整示例：包含图标的解决方案
 */
export const WithIconsExample = () => {
  const solutions: Solution[] = [
    {
      id: 'solution-1',
      problem: '企业形象与品牌展示不足',
      solution: '定制企业官网',
      icon: '🌐',
    },
    {
      id: 'solution-2',
      problem: '管理流程分散，数据不清晰',
      solution: '定制后台管理系统',
      icon: '📊',
    },
    {
      id: 'solution-3',
      problem: '人工操作多，效率低',
      solution: '自动化系统开发',
      icon: '⚙️',
    },
  ];

  return <SolutionsSection solutions={solutions} />;
};

/**
 * 最小示例：只有两个解决方案
 */
export const MinimalExample = () => {
  const solutions: Solution[] = [
    {
      id: 'solution-1',
      problem: '网站老旧，用户体验差',
      solution: '现代化网站重构',
    },
    {
      id: 'solution-2',
      problem: '数据管理混乱',
      solution: '数据管理系统开发',
    },
  ];

  return <SolutionsSection solutions={solutions} />;
};

/**
 * 扩展示例：更多解决方案
 */
export const ExtendedExample = () => {
  const solutions: Solution[] = [
    {
      id: 'solution-1',
      problem: '企业形象与品牌展示不足',
      solution: '定制企业官网',
    },
    {
      id: 'solution-2',
      problem: '管理流程分散，数据不清晰',
      solution: '定制后台管理系统',
    },
    {
      id: 'solution-3',
      problem: '人工操作多，效率低',
      solution: '自动化系统开发',
    },
    {
      id: 'solution-4',
      problem: '客户沟通效率低',
      solution: 'CRM 客户管理系统',
    },
    {
      id: 'solution-5',
      problem: '库存管理困难',
      solution: '智能库存管理系统',
    },
    {
      id: 'solution-6',
      problem: '财务报表不及时',
      solution: '财务管理自动化系统',
    },
  ];

  return <SolutionsSection solutions={solutions} />;
};

export default BasicExample;
