/**
 * CommitmentSection 组件示例
 * 
 * 展示如何使用 CommitmentSection 组件
 */

import React from 'react';
import { CommitmentSection } from './CommitmentSection';
import type { Commitment } from '../types';

/**
 * 示例：基本用法
 */
export const BasicExample = () => {
  const commitments: Commitment[] = [
    {
      id: '1',
      text: '项目按约定周期推进',
    },
    {
      id: '2',
      text: '功能确认后再开发',
    },
    {
      id: '3',
      text: '提供上线指导与基础维护',
    },
    {
      id: '4',
      text: '可签订合作协议',
    },
  ];

  const highlight = '每个项目都以长期稳定运行为目标';

  return (
    <CommitmentSection
      commitments={commitments}
      highlight={highlight}
    />
  );
};

/**
 * 示例：自定义承诺内容
 */
export const CustomCommitmentsExample = () => {
  const commitments: Commitment[] = [
    {
      id: '1',
      text: '需求明确后再启动开发',
    },
    {
      id: '2',
      text: '分阶段交付，及时反馈',
    },
    {
      id: '3',
      text: '提供完整的技术文档',
    },
    {
      id: '4',
      text: '一年内免费技术支持',
    },
  ];

  const highlight = '专注于为企业提供长期稳定的技术服务';

  return (
    <CommitmentSection
      commitments={commitments}
      highlight={highlight}
    />
  );
};

export default BasicExample;
