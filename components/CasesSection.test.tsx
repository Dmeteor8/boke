/**
 * CasesSection 组件测试
 * 
 * 测试案例展示区块的渲染和交互功能
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CasesSection } from './CasesSection';
import type { CaseStudy } from '../types';

describe('CasesSection', () => {
  const mockCases: CaseStudy[] = [
    {
      id: 'case-1',
      title: '机械制造企业官网升级项目',
      description: '为某机械制造企业打造现代化官网，提升品牌形象',
      deliveryTime: '7天',
      highlights: [
        '响应式设计，适配各种设备',
        'SEO 优化，提升搜索排名',
        '系统稳定运行超过 1 年',
      ],
    },
    {
      id: 'case-2',
      title: '贸易公司内部管理系统',
      description: '定制化后台管理系统，提升运营效率',
      deliveryTime: '15天',
      highlights: [
        '订单管理自动化',
        '数据可视化报表',
        '多角色权限管理',
      ],
    },
  ];

  describe('渲染测试', () => {
    it('应该渲染区块标题', () => {
      render(<CasesSection cases={mockCases} />);
      
      expect(screen.getByText('项目案例')).toBeInTheDocument();
      expect(screen.getByText('真实项目案例展示，稳定运行，按时交付')).toBeInTheDocument();
    });

    it('应该渲染所有案例卡片', () => {
      const { container } = render(<CasesSection cases={mockCases} />);
      
      const caseCards = container.querySelectorAll('[data-testid="case-card"]');
      expect(caseCards).toHaveLength(2);
    });

    it('应该渲染至少 2 个案例（需求 3.1）', () => {
      const { container } = render(<CasesSection cases={mockCases} />);
      
      const caseCards = container.querySelectorAll('[data-testid="case-card"]');
      expect(caseCards.length).toBeGreaterThanOrEqual(2);
    });

    it('应该显示案例标题', () => {
      render(<CasesSection cases={mockCases} />);
      
      expect(screen.getByText('机械制造企业官网升级项目')).toBeInTheDocument();
      expect(screen.getByText('贸易公司内部管理系统')).toBeInTheDocument();
    });

    it('应该显示交付周期（需求 3.2）', () => {
      render(<CasesSection cases={mockCases} />);
      
      expect(screen.getByText(/交付周期：7天/)).toBeInTheDocument();
      expect(screen.getByText(/交付周期：15天/)).toBeInTheDocument();
    });

    it('应该显示案例描述', () => {
      render(<CasesSection cases={mockCases} />);
      
      expect(screen.getByText('为某机械制造企业打造现代化官网，提升品牌形象')).toBeInTheDocument();
      expect(screen.getByText('定制化后台管理系统，提升运营效率')).toBeInTheDocument();
    });
  });

  describe('交互测试', () => {
    it('初始状态下不应该显示案例详情', () => {
      render(<CasesSection cases={mockCases} />);
      
      // 亮点应该不可见
      expect(screen.queryByText('响应式设计，适配各种设备')).not.toBeInTheDocument();
      expect(screen.queryByText('订单管理自动化')).not.toBeInTheDocument();
    });

    it('点击案例卡片应该展开详情（需求 3.6）', () => {
      render(<CasesSection cases={mockCases} />);
      
      // 点击第一个案例
      const firstCaseTitle = screen.getByText('机械制造企业官网升级项目');
      fireEvent.click(firstCaseTitle.closest('[data-testid="case-card"]')!);
      
      // 详情应该显示
      expect(screen.getByText('响应式设计，适配各种设备')).toBeInTheDocument();
      expect(screen.getByText('SEO 优化，提升搜索排名')).toBeInTheDocument();
      expect(screen.getByText('系统稳定运行超过 1 年')).toBeInTheDocument();
    });

    it('再次点击案例卡片应该收起详情', () => {
      render(<CasesSection cases={mockCases} />);
      
      const firstCaseCard = screen.getByText('机械制造企业官网升级项目').closest('[data-testid="case-card"]')!;
      
      // 第一次点击 - 展开
      fireEvent.click(firstCaseCard);
      expect(screen.getByText('响应式设计，适配各种设备')).toBeInTheDocument();
      
      // 第二次点击 - 收起
      fireEvent.click(firstCaseCard);
      
      // 等待动画完成后，详情应该不可见
      setTimeout(() => {
        expect(screen.queryByText('响应式设计，适配各种设备')).not.toBeInTheDocument();
      }, 500);
    });

    it('展开一个案例时应该收起其他案例', () => {
      render(<CasesSection cases={mockCases} />);
      
      const firstCaseCard = screen.getByText('机械制造企业官网升级项目').closest('[data-testid="case-card"]')!;
      const secondCaseCard = screen.getByText('贸易公司内部管理系统').closest('[data-testid="case-card"]')!;
      
      // 展开第一个案例
      fireEvent.click(firstCaseCard);
      expect(screen.getByText('响应式设计，适配各种设备')).toBeInTheDocument();
      
      // 展开第二个案例
      fireEvent.click(secondCaseCard);
      expect(screen.getByText('订单管理自动化')).toBeInTheDocument();
      
      // 第一个案例的详情应该不可见
      setTimeout(() => {
        expect(screen.queryByText('响应式设计，适配各种设备')).not.toBeInTheDocument();
      }, 500);
    });

    it('应该显示所有亮点（需求 3.3）', () => {
      render(<CasesSection cases={mockCases} />);
      
      // 展开第一个案例
      const firstCaseCard = screen.getByText('机械制造企业官网升级项目').closest('[data-testid="case-card"]')!;
      fireEvent.click(firstCaseCard);
      
      // 验证所有亮点都显示
      mockCases[0].highlights.forEach(highlight => {
        expect(screen.getByText(highlight)).toBeInTheDocument();
      });
    });
  });

  describe('响应式布局测试', () => {
    it('应该使用网格布局', () => {
      const { container } = render(<CasesSection cases={mockCases} />);
      
      const grid = container.querySelector('.grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-2');
    });
  });

  describe('边界情况测试', () => {
    it('应该处理空案例列表', () => {
      const { container } = render(<CasesSection cases={[]} />);
      
      const caseCards = container.querySelectorAll('[data-testid="case-card"]');
      expect(caseCards).toHaveLength(0);
    });

    it('应该处理单个案例', () => {
      const singleCase = [mockCases[0]];
      const { container } = render(<CasesSection cases={singleCase} />);
      
      const caseCards = container.querySelectorAll('[data-testid="case-card"]');
      expect(caseCards).toHaveLength(1);
    });

    it('应该处理没有亮点的案例', () => {
      const caseWithoutHighlights: CaseStudy = {
        id: 'case-3',
        title: '测试案例',
        description: '测试描述',
        deliveryTime: '10天',
        highlights: [],
      };
      
      render(<CasesSection cases={[caseWithoutHighlights]} />);
      
      const caseCard = screen.getByText('测试案例').closest('[data-testid="case-card"]')!;
      fireEvent.click(caseCard);
      
      // 应该显示亮点标题但没有列表项
      expect(screen.getByText('项目亮点')).toBeInTheDocument();
    });
  });

  describe('可访问性测试', () => {
    it('案例卡片应该可点击', () => {
      render(<CasesSection cases={mockCases} />);
      
      const firstCaseCard = screen.getByText('机械制造企业官网升级项目').closest('[data-testid="case-card"]')!;
      expect(firstCaseCard.querySelector('.cursor-pointer')).toBeInTheDocument();
    });

    it('应该显示点击提示文本', () => {
      render(<CasesSection cases={mockCases} />);
      
      const hints = screen.getAllByText('点击查看详情');
      expect(hints.length).toBeGreaterThan(0);
    });

    it('展开后应该显示收起提示', () => {
      render(<CasesSection cases={mockCases} />);
      
      const firstCaseCard = screen.getByText('机械制造企业官网升级项目').closest('[data-testid="case-card"]')!;
      fireEvent.click(firstCaseCard);
      
      expect(screen.getByText('点击收起详情')).toBeInTheDocument();
    });
  });
});
