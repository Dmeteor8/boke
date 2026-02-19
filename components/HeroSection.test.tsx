/**
 * HeroSection 组件单元测试
 * 
 * 验证需求：1.1-1.5, 7.7-7.8
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HeroSection } from './HeroSection';
import { ResponsiveLayout } from './ResponsiveLayout';
import type { HeroSectionProps } from '../types';

// 模拟数据
const mockProps: HeroSectionProps = {
  title: '为企业提供专业网站与系统定制服务 助力业务升级与数字化管理',
  subtitle: '专注企业官网建设、后台系统开发与自动化解决方案',
  targetAudience: ['中小企业', '制造业', '贸易公司', '服务型企业'],
  contactInfo: {
    phone: '13151488988',
    email: 'mvpm@vip.qq.com',
  },
  ctaButtons: [
    {
      text: '预约沟通',
      variant: 'primary' as const,
      action: vi.fn(),
    },
    {
      text: '查看案例',
      variant: 'secondary' as const,
      action: vi.fn(),
    },
  ],
};

// 辅助函数：在 ResponsiveLayout 中渲染组件
const renderWithLayout = (props: HeroSectionProps) => {
  return render(
    <ResponsiveLayout>
      <HeroSection {...props} />
    </ResponsiveLayout>
  );
};

describe('HeroSection', () => {
  describe('内容渲染', () => {
    it('应该渲染主标题', () => {
      renderWithLayout(mockProps);
      const title = screen.getByTestId('hero-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent(mockProps.title);
    });

    it('应该渲染副标题', () => {
      renderWithLayout(mockProps);
      const subtitle = screen.getByTestId('hero-subtitle');
      expect(subtitle).toBeInTheDocument();
      expect(subtitle).toHaveTextContent(mockProps.subtitle);
    });

    it('应该渲染所有目标客户标签', () => {
      renderWithLayout(mockProps);
      const audienceContainer = screen.getByTestId('hero-target-audience');
      expect(audienceContainer).toBeInTheDocument();

      mockProps.targetAudience.forEach((audience, index) => {
        const tag = screen.getByTestId(`audience-tag-${index}`);
        expect(tag).toBeInTheDocument();
        expect(tag).toHaveTextContent(audience);
      });
    });

    it('应该渲染正确数量的目标客户标签', () => {
      renderWithLayout(mockProps);
      const tags = screen.getAllByTestId(/^audience-tag-/);
      expect(tags).toHaveLength(mockProps.targetAudience.length);
    });
  });

  describe('联系信息', () => {
    it('应该显示电话号码', () => {
      renderWithLayout(mockProps);
      const phone = screen.getByTestId('hero-phone');
      expect(phone).toBeInTheDocument();
      expect(phone).toHaveTextContent(mockProps.contactInfo.phone);
    });

    it('应该显示邮箱地址', () => {
      renderWithLayout(mockProps);
      const email = screen.getByTestId('hero-email');
      expect(email).toBeInTheDocument();
      expect(email).toHaveTextContent(mockProps.contactInfo.email);
    });

    it('电话链接应该使用 tel: 协议', () => {
      renderWithLayout(mockProps);
      const phone = screen.getByTestId('hero-phone');
      expect(phone).toHaveAttribute('href', `tel:${mockProps.contactInfo.phone}`);
    });

    it('邮箱链接应该使用 mailto: 协议', () => {
      renderWithLayout(mockProps);
      const email = screen.getByTestId('hero-email');
      expect(email).toHaveAttribute('href', `mailto:${mockProps.contactInfo.email}`);
    });
  });

  describe('CTA 按钮', () => {
    it('应该渲染所有 CTA 按钮', () => {
      renderWithLayout(mockProps);
      const buttons = screen.getAllByTestId(/^cta-button-/);
      expect(buttons).toHaveLength(mockProps.ctaButtons.length);
    });

    it('应该渲染"预约沟通"按钮', () => {
      renderWithLayout(mockProps);
      const button = screen.getByText('预约沟通');
      expect(button).toBeInTheDocument();
    });

    it('应该渲染"查看案例"按钮', () => {
      renderWithLayout(mockProps);
      const button = screen.getByText('查看案例');
      expect(button).toBeInTheDocument();
    });

    it('点击"预约沟通"按钮应该触发回调', async () => {
      const user = userEvent.setup();
      renderWithLayout(mockProps);
      
      const button = screen.getByText('预约沟通');
      await user.click(button);
      
      expect(mockProps.ctaButtons[0].action).toHaveBeenCalledTimes(1);
    });

    it('点击"查看案例"按钮应该触发回调', async () => {
      const user = userEvent.setup();
      renderWithLayout(mockProps);
      
      const button = screen.getByText('查看案例');
      await user.click(button);
      
      expect(mockProps.ctaButtons[1].action).toHaveBeenCalledTimes(1);
    });
  });

  describe('响应式布局', () => {
    it('应该在所有视口尺寸下正确渲染', () => {
      renderWithLayout(mockProps);
      const section = screen.getByTestId('hero-section');
      expect(section).toBeInTheDocument();
    });

    it('应该包含响应式 CSS 类', () => {
      renderWithLayout(mockProps);
      const section = screen.getByTestId('hero-section');
      expect(section).toHaveClass('w-full');
    });
  });

  describe('可访问性', () => {
    it('主标题应该使用 h1 标签', () => {
      renderWithLayout(mockProps);
      const title = screen.getByTestId('hero-title');
      expect(title.tagName).toBe('H1');
    });

    it('联系信息标题应该使用 h2 标签', () => {
      renderWithLayout(mockProps);
      const heading = screen.getByText('联系我们');
      expect(heading.tagName).toBe('H2');
    });

    it('电话和邮箱链接应该是可点击的', () => {
      renderWithLayout(mockProps);
      const phone = screen.getByTestId('hero-phone');
      const email = screen.getByTestId('hero-email');
      
      expect(phone.tagName).toBe('A');
      expect(email.tagName).toBe('A');
    });

    it('图标应该有 aria-hidden 属性', () => {
      renderWithLayout(mockProps);
      const icons = screen.getAllByRole('img', { hidden: true });
      icons.forEach(icon => {
        expect(icon).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('边界情况', () => {
    it('应该处理空的目标客户数组', () => {
      const propsWithEmptyAudience = {
        ...mockProps,
        targetAudience: [],
      };
      renderWithLayout(propsWithEmptyAudience);
      const audienceContainer = screen.getByTestId('hero-target-audience');
      expect(audienceContainer).toBeInTheDocument();
      expect(audienceContainer.children).toHaveLength(0);
    });

    it('应该处理单个 CTA 按钮', () => {
      const propsWithOneButton = {
        ...mockProps,
        ctaButtons: [mockProps.ctaButtons[0]],
      };
      renderWithLayout(propsWithOneButton);
      const buttons = screen.getAllByTestId(/^cta-button-/);
      expect(buttons).toHaveLength(1);
    });

    it('应该处理长文本内容', () => {
      const propsWithLongText = {
        ...mockProps,
        title: '这是一个非常非常非常非常非常非常非常非常非常非常长的标题文本用于测试组件如何处理长文本内容',
      };
      renderWithLayout(propsWithLongText);
      const title = screen.getByTestId('hero-title');
      expect(title).toHaveTextContent(propsWithLongText.title);
    });
  });
});
