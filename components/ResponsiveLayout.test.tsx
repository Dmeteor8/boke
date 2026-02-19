import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ResponsiveLayout, useViewport, type Viewport } from './ResponsiveLayout';

// 测试组件，用于访问 useViewport hook
function TestComponent() {
  const { viewport, width, height } = useViewport();
  return (
    <div>
      <div data-testid="viewport">{viewport}</div>
      <div data-testid="width">{width}</div>
      <div data-testid="height">{height}</div>
    </div>
  );
}

describe('ResponsiveLayout 组件', () => {
  let originalInnerWidth: number;
  let originalInnerHeight: number;

  beforeEach(() => {
    // 保存原始窗口尺寸
    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;
  });

  afterEach(() => {
    // 恢复原始窗口尺寸
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
  });

  describe('基础渲染', () => {
    it('应该渲染子组件', () => {
      render(
        <ResponsiveLayout>
          <div data-testid="child">测试内容</div>
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByTestId('child')).toHaveTextContent('测试内容');
    });

    it('应该提供布局上下文', () => {
      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toBeInTheDocument();
      expect(screen.getByTestId('width')).toBeInTheDocument();
      expect(screen.getByTestId('height')).toBeInTheDocument();
    });
  });

  describe('视口检测 - 移动端 (需求 8.1)', () => {
    it('应该在宽度 < 768px 时检测为 mobile', () => {
      // 设置窗口宽度为 375px (典型移动设备)
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('mobile');
      expect(screen.getByTestId('width')).toHaveTextContent('375');
      expect(screen.getByTestId('height')).toHaveTextContent('667');
    });

    it('应该在宽度 320px 时检测为 mobile (最小移动设备)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 568,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('mobile');
    });

    it('应该在宽度 767px 时检测为 mobile (边界值)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 767,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('mobile');
    });
  });

  describe('视口检测 - 平板端 (需求 8.2)', () => {
    it('应该在宽度 768px 时检测为 tablet (下边界)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('tablet');
      expect(screen.getByTestId('width')).toHaveTextContent('768');
    });

    it('应该在宽度 900px 时检测为 tablet (中间值)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 900,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('tablet');
    });

    it('应该在宽度 1023px 时检测为 tablet (上边界)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1023,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('tablet');
    });
  });

  describe('视口检测 - 桌面端 (需求 8.3)', () => {
    it('应该在宽度 1024px 时检测为 desktop (下边界)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('desktop');
      expect(screen.getByTestId('width')).toHaveTextContent('1024');
    });

    it('应该在宽度 1920px 时检测为 desktop (典型桌面)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 1080,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('desktop');
    });

    it('应该在宽度 2560px 时检测为 desktop (超宽屏)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 2560,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('desktop');
    });
  });

  describe('窗口调整大小响应 (需求 8.4)', () => {
    it('应该在窗口调整大小时更新视口类型', () => {
      // 初始为桌面端
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 1080,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('desktop');

      // 调整为移动端
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 375,
        });
        Object.defineProperty(window, 'innerHeight', {
          writable: true,
          configurable: true,
          value: 667,
        });
        window.dispatchEvent(new Event('resize'));
      });

      expect(screen.getByTestId('viewport')).toHaveTextContent('mobile');
      expect(screen.getByTestId('width')).toHaveTextContent('375');
      expect(screen.getByTestId('height')).toHaveTextContent('667');
    });

    it('应该在从移动端调整到平板端时更新', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('mobile');

      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 768,
        });
        window.dispatchEvent(new Event('resize'));
      });

      expect(screen.getByTestId('viewport')).toHaveTextContent('tablet');
    });

    it('应该在从平板端调整到桌面端时更新', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 900,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('tablet');

      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 1024,
        });
        window.dispatchEvent(new Event('resize'));
      });

      expect(screen.getByTestId('viewport')).toHaveTextContent('desktop');
    });

    it('应该在多次调整大小时正确更新', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1920,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('desktop');

      // 第一次调整：桌面 -> 平板
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 800,
        });
        window.dispatchEvent(new Event('resize'));
      });

      expect(screen.getByTestId('viewport')).toHaveTextContent('tablet');

      // 第二次调整：平板 -> 移动
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 375,
        });
        window.dispatchEvent(new Event('resize'));
      });

      expect(screen.getByTestId('viewport')).toHaveTextContent('mobile');

      // 第三次调整：移动 -> 桌面
      act(() => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: 1440,
        });
        window.dispatchEvent(new Event('resize'));
      });

      expect(screen.getByTestId('viewport')).toHaveTextContent('desktop');
    });
  });

  describe('useViewport Hook', () => {
    it('应该在 ResponsiveLayout 外使用时抛出错误', () => {
      // 抑制控制台错误输出
      const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useViewport must be used within a ResponsiveLayout');

      consoleError.mockRestore();
    });

    it('应该返回正确的布局上下文', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      const viewport = screen.getByTestId('viewport');
      const width = screen.getByTestId('width');
      const height = screen.getByTestId('height');

      expect(viewport).toHaveTextContent('desktop');
      expect(width).toHaveTextContent('1024');
      expect(height).toHaveTextContent('768');
    });
  });

  describe('边界情况', () => {
    it('应该处理极小的窗口尺寸', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 100,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 100,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('mobile');
      expect(screen.getByTestId('width')).toHaveTextContent('100');
      expect(screen.getByTestId('height')).toHaveTextContent('100');
    });

    it('应该处理极大的窗口尺寸', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 5120,
      });
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 2880,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('desktop');
      expect(screen.getByTestId('width')).toHaveTextContent('5120');
      expect(screen.getByTestId('height')).toHaveTextContent('2880');
    });

    it('应该处理断点边界值 (767px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 767,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('mobile');
    });

    it('应该处理断点边界值 (768px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('tablet');
    });

    it('应该处理断点边界值 (1023px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1023,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('tablet');
    });

    it('应该处理断点边界值 (1024px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      expect(screen.getByTestId('viewport')).toHaveTextContent('desktop');
    });
  });

  describe('事件监听器清理', () => {
    it('应该在组件卸载时移除 resize 事件监听器', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = render(
        <ResponsiveLayout>
          <TestComponent />
        </ResponsiveLayout>
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });
  });
});
