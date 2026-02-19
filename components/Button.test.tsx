/**
 * Button 组件单元测试
 * 
 * 测试 Button 组件的基本功能和可访问性
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  describe('基本渲染', () => {
    it('应该渲染按钮文本', () => {
      render(<Button variant="primary" size="md">点击我</Button>);
      expect(screen.getByRole('button', { name: '点击我' })).toBeInTheDocument();
    });

    it('应该应用正确的 type 属性', () => {
      render(<Button variant="primary" size="md" type="submit">提交</Button>);
      const button = screen.getByRole('button', { name: '提交' });
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('默认 type 应该是 button', () => {
      render(<Button variant="primary" size="md">按钮</Button>);
      const button = screen.getByRole('button', { name: '按钮' });
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('变体样式', () => {
    it('primary 变体应该有正确的样式类', () => {
      render(<Button variant="primary" size="md">Primary</Button>);
      const button = screen.getByRole('button', { name: 'Primary' });
      expect(button).toHaveClass('bg-blue-600', 'text-white');
    });

    it('secondary 变体应该有正确的样式类', () => {
      render(<Button variant="secondary" size="md">Secondary</Button>);
      const button = screen.getByRole('button', { name: 'Secondary' });
      expect(button).toHaveClass('bg-gray-600', 'text-white');
    });

    it('outline 变体应该有正确的样式类', () => {
      render(<Button variant="outline" size="md">Outline</Button>);
      const button = screen.getByRole('button', { name: 'Outline' });
      expect(button).toHaveClass('bg-transparent', 'text-blue-600', 'border-2');
    });
  });

  describe('尺寸样式', () => {
    it('sm 尺寸应该有正确的样式类', () => {
      render(<Button variant="primary" size="sm">Small</Button>);
      const button = screen.getByRole('button', { name: 'Small' });
      expect(button).toHaveClass('text-sm', 'px-4');
    });

    it('md 尺寸应该有正确的样式类', () => {
      render(<Button variant="primary" size="md">Medium</Button>);
      const button = screen.getByRole('button', { name: 'Medium' });
      expect(button).toHaveClass('text-base', 'px-6');
    });

    it('lg 尺寸应该有正确的样式类', () => {
      render(<Button variant="primary" size="lg">Large</Button>);
      const button = screen.getByRole('button', { name: 'Large' });
      expect(button).toHaveClass('text-lg', 'px-8');
    });
  });

  describe('移动端触摸区域 (需求 8.5)', () => {
    it('所有尺寸都应该有最小 44px 高度', () => {
      const { rerender } = render(<Button variant="primary" size="sm">Small</Button>);
      let button = screen.getByRole('button', { name: 'Small' });
      expect(button).toHaveClass('min-h-[44px]');

      rerender(<Button variant="primary" size="md">Medium</Button>);
      button = screen.getByRole('button', { name: 'Medium' });
      expect(button).toHaveClass('min-h-[44px]');

      rerender(<Button variant="primary" size="lg">Large</Button>);
      button = screen.getByRole('button', { name: 'Large' });
      expect(button).toHaveClass('min-h-[44px]');
    });

    it('所有尺寸都应该有最小 44px 宽度', () => {
      const { rerender } = render(<Button variant="primary" size="sm">S</Button>);
      let button = screen.getByRole('button', { name: 'S' });
      expect(button).toHaveClass('min-w-[44px]');

      rerender(<Button variant="primary" size="md">M</Button>);
      button = screen.getByRole('button', { name: 'M' });
      expect(button).toHaveClass('min-w-[44px]');

      rerender(<Button variant="primary" size="lg">L</Button>);
      button = screen.getByRole('button', { name: 'L' });
      expect(button).toHaveClass('min-w-[44px]');
    });
  });

  describe('键盘导航 (需求 12.1)', () => {
    it('应该可以通过键盘聚焦', () => {
      render(<Button variant="primary" size="md">Focus Me</Button>);
      const button = screen.getByRole('button', { name: 'Focus Me' });
      
      // 按钮应该有 tabIndex 0（可聚焦）
      expect(button).toHaveAttribute('tabIndex', '0');
    });

    it('禁用的按钮应该不可聚焦', () => {
      render(<Button variant="primary" size="md" disabled>Disabled</Button>);
      const button = screen.getByRole('button', { name: 'Disabled' });
      
      // 禁用的按钮应该有 tabIndex -1（不可聚焦）
      expect(button).toHaveAttribute('tabIndex', '-1');
    });

    it('应该有焦点样式类', () => {
      render(<Button variant="primary" size="md">Focus Styles</Button>);
      const button = screen.getByRole('button', { name: 'Focus Styles' });
      
      // 检查焦点相关的样式类
      expect(button).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2');
    });
  });

  describe('交互行为', () => {
    it('点击时应该调用 onClick 处理器', () => {
      const handleClick = vi.fn();
      render(<Button variant="primary" size="md" onClick={handleClick}>Click Me</Button>);
      
      const button = screen.getByRole('button', { name: 'Click Me' });
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('禁用时不应该调用 onClick 处理器', () => {
      const handleClick = vi.fn();
      render(<Button variant="primary" size="md" onClick={handleClick} disabled>Disabled</Button>);
      
      const button = screen.getByRole('button', { name: 'Disabled' });
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('禁用时应该有禁用样式', () => {
      render(<Button variant="primary" size="md" disabled>Disabled</Button>);
      const button = screen.getByRole('button', { name: 'Disabled' });
      
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });
  });

  describe('自定义样式', () => {
    it('应该接受并应用自定义 className', () => {
      render(<Button variant="primary" size="md" className="custom-class">Custom</Button>);
      const button = screen.getByRole('button', { name: 'Custom' });
      
      expect(button).toHaveClass('custom-class');
    });

    it('自定义 className 不应该覆盖基础样式', () => {
      render(<Button variant="primary" size="md" className="custom-class">Custom</Button>);
      const button = screen.getByRole('button', { name: 'Custom' });
      
      // 应该同时有基础样式和自定义样式
      expect(button).toHaveClass('custom-class', 'bg-blue-600', 'text-white');
    });
  });
});
