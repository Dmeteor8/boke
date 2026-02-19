/**
 * SolutionsSection 组件测试
 * 
 * 验证问题-解决方案区块的渲染和行为
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SolutionsSection } from './SolutionsSection';
import type { Solution } from '../types';

describe('SolutionsSection', () => {
  const mockSolutions: Solution[] = [
    {
      id: '1',
      problem: '企业形象与品牌展示不足',
      solution: '定制企业官网',
    },
    {
      id: '2',
      problem: '管理流程分散，数据不清晰',
      solution: '定制后台管理系统',
    },
    {
      id: '3',
      problem: '人工操作多，效率低',
      solution: '自动化系统开发',
    },
  ];

  it('应该渲染区块标题', () => {
    render(<SolutionsSection solutions={mockSolutions} />);
    
    expect(screen.getByText('针对性解决方案')).toBeInTheDocument();
    expect(screen.getByText('为您的业务痛点提供专业的定制化解决方案')).toBeInTheDocument();
  });

  it('应该渲染所有问题-解决方案配对', () => {
    render(<SolutionsSection solutions={mockSolutions} />);
    
    // 验证所有问题都被渲染
    expect(screen.getByText('企业形象与品牌展示不足')).toBeInTheDocument();
    expect(screen.getByText('管理流程分散，数据不清晰')).toBeInTheDocument();
    expect(screen.getByText('人工操作多，效率低')).toBeInTheDocument();
    
    // 验证所有解决方案都被渲染
    expect(screen.getByText('定制企业官网')).toBeInTheDocument();
    expect(screen.getByText('定制后台管理系统')).toBeInTheDocument();
    expect(screen.getByText('自动化系统开发')).toBeInTheDocument();
  });

  it('应该为每个配对显示"问题"和"解决方案"标签', () => {
    render(<SolutionsSection solutions={mockSolutions} />);
    
    // 应该有3个"问题"标签
    const problemLabels = screen.getAllByText('问题');
    expect(problemLabels).toHaveLength(3);
    
    // 应该有3个"解决方案"标签
    const solutionLabels = screen.getAllByText('解决方案');
    expect(solutionLabels).toHaveLength(3);
  });

  it('应该使用网格布局渲染解决方案', () => {
    const { container } = render(<SolutionsSection solutions={mockSolutions} />);
    
    // 查找网格容器
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    
    // 验证网格类名包含响应式类
    expect(gridContainer?.className).toContain('grid-cols-1');
    expect(gridContainer?.className).toContain('md:grid-cols-2');
    expect(gridContainer?.className).toContain('lg:grid-cols-3');
  });

  it('应该渲染正确数量的卡片', () => {
    const { container } = render(<SolutionsSection solutions={mockSolutions} />);
    
    // 查找所有卡片（通过 Card 组件的基础样式类）
    const cards = container.querySelectorAll('.rounded-lg.p-6');
    expect(cards).toHaveLength(3);
  });

  it('应该处理空的解决方案数组', () => {
    const { container } = render(<SolutionsSection solutions={[]} />);
    
    // 标题应该仍然显示
    expect(screen.getByText('针对性解决方案')).toBeInTheDocument();
    
    // 但不应该有任何卡片
    const cards = container.querySelectorAll('.rounded-lg.p-6');
    expect(cards).toHaveLength(0);
  });

  it('应该为每个解决方案使用唯一的 key', () => {
    const { container } = render(<SolutionsSection solutions={mockSolutions} />);
    
    // 验证渲染了正确数量的动画容器
    const motionDivs = container.querySelectorAll('.grid > div');
    expect(motionDivs).toHaveLength(3);
  });

  it('应该正确配对问题和解决方案', () => {
    render(<SolutionsSection solutions={mockSolutions} />);
    
    // 验证需求 2.2：企业形象与品牌展示不足 -> 定制企业官网
    const problem1 = screen.getByText('企业形象与品牌展示不足');
    const solution1 = screen.getByText('定制企业官网');
    expect(problem1).toBeInTheDocument();
    expect(solution1).toBeInTheDocument();
    
    // 验证需求 2.3：管理流程分散，数据不清晰 -> 定制后台管理系统
    const problem2 = screen.getByText('管理流程分散，数据不清晰');
    const solution2 = screen.getByText('定制后台管理系统');
    expect(problem2).toBeInTheDocument();
    expect(solution2).toBeInTheDocument();
    
    // 验证需求 2.4：人工操作多，效率低 -> 自动化系统开发
    const problem3 = screen.getByText('人工操作多，效率低');
    const solution3 = screen.getByText('自动化系统开发');
    expect(problem3).toBeInTheDocument();
    expect(solution3).toBeInTheDocument();
  });
});
