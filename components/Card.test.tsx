/**
 * Card 组件单元测试
 * 
 * 测试 Card 组件的渲染、变体样式和交互功能
 * 需求：2.1-2.4, 3.1-3.6
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染子内容', () => {
      render(
        <Card>
          <p>测试内容</p>
        </Card>
      );

      expect(screen.getByText('测试内容')).toBeInTheDocument();
    });

    it('应该渲染标题（当提供时）', () => {
      render(
        <Card title="测试标题">
          <p>测试内容</p>
        </Card>
      );

      expect(screen.getByText('测试标题')).toBeInTheDocument();
      expect(screen.getByText('测试内容')).toBeInTheDocument();
    });

    it('应该不渲染标题（当未提供时）', () => {
      const { container } = render(
        <Card>
          <p>测试内容</p>
        </Card>
      );

      const heading = container.querySelector('h3');
      expect(heading).not.toBeInTheDocument();
    });
  });

  describe('变体样式', () => {
    it('应该应用 default 变体样式', () => {
      const { container } = render(
        <Card variant="default">
          <p>内容</p>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-white');
      expect(card).toHaveClass('border');
      expect(card).toHaveClass('border-gray-200');
    });

    it('应该应用 elevated 变体样式', () => {
      const { container } = render(
        <Card variant="elevated">
          <p>内容</p>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-white');
      expect(card).toHaveClass('shadow-md');
    });

    it('应该应用 outlined 变体样式', () => {
      const { container } = render(
        <Card variant="outlined">
          <p>内容</p>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-transparent');
      expect(card).toHaveClass('border-2');
      expect(card).toHaveClass('border-gray-300');
    });

    it('应该默认使用 default 变体', () => {
      const { container } = render(
        <Card>
          <p>内容</p>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('bg-white');
      expect(card).toHaveClass('border');
    });
  });

  describe('点击交互', () => {
    it('应该在点击时调用 onClick 处理器', () => {
      const handleClick = vi.fn();
      render(
        <Card onClick={handleClick}>
          <p>可点击内容</p>
        </Card>
      );

      const card = screen.getByRole('button');
      fireEvent.click(card);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('应该在按下 Enter 键时调用 onClick 处理器', () => {
      const handleClick = vi.fn();
      render(
        <Card onClick={handleClick}>
          <p>可点击内容</p>
        </Card>
      );

      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: 'Enter' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('应该在按下空格键时调用 onClick 处理器', () => {
      const handleClick = vi.fn();
      render(
        <Card onClick={handleClick}>
          <p>可点击内容</p>
        </Card>
      );

      const card = screen.getByRole('button');
      fireEvent.keyDown(card, { key: ' ' });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('应该在可点击时具有 role="button"', () => {
      const handleClick = vi.fn();
      render(
        <Card onClick={handleClick}>
          <p>可点击内容</p>
        </Card>
      );

      const card = screen.getByRole('button');
      expect(card).toBeInTheDocument();
    });

    it('应该在可点击时具有 tabIndex=0', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card onClick={handleClick}>
          <p>可点击内容</p>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('应该在不可点击时没有 role="button"', () => {
      const { container } = render(
        <Card>
          <p>不可点击内容</p>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).not.toHaveAttribute('role', 'button');
    });

    it('应该在可点击时应用交互样式', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card onClick={handleClick}>
          <p>可点击内容</p>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('cursor-pointer');
    });
  });

  describe('响应式布局', () => {
    it('应该应用 w-full 类以适应容器宽度', () => {
      const { container } = render(
        <Card>
          <p>内容</p>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('w-full');
    });
  });

  describe('自定义样式', () => {
    it('应该接受并应用自定义 className', () => {
      const { container } = render(
        <Card className="custom-class">
          <p>内容</p>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });

    it('应该保留基础样式同时应用自定义 className', () => {
      const { container } = render(
        <Card className="custom-class">
          <p>内容</p>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('p-6');
    });
  });

  describe('可访问性', () => {
    it('应该在可点击时支持键盘导航', () => {
      const handleClick = vi.fn();
      render(
        <Card onClick={handleClick}>
          <p>可点击内容</p>
        </Card>
      );

      const card = screen.getByRole('button');
      
      // 测试 Tab 键可以聚焦
      card.focus();
      expect(document.activeElement).toBe(card);
    });

    it('应该在可点击时具有适当的 ARIA 属性', () => {
      const handleClick = vi.fn();
      const { container } = render(
        <Card onClick={handleClick}>
          <p>可点击内容</p>
        </Card>
      );

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('aria-pressed', 'false');
    });
  });
});
