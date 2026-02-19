'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Viewport = 'mobile' | 'tablet' | 'desktop';

export interface LayoutContext {
  viewport: Viewport;
  width: number;
  height: number;
}

export interface Breakpoints {
  mobile: number;    // < 768px
  tablet: number;    // 768px - 1024px
  desktop: number;   // > 1024px
}

const BREAKPOINTS: Breakpoints = {
  mobile: 768,
  tablet: 1024,
  desktop: 1024,
};

const ResponsiveLayoutContext = createContext<LayoutContext | undefined>(undefined);

export interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

/**
 * ResponsiveLayout 组件
 * 
 * 提供响应式布局上下文，检测视口尺寸并根据断点提供当前设备类型。
 * 
 * 断点定义：
 * - mobile: < 768px
 * - tablet: 768px - 1024px
 * - desktop: > 1024px
 * 
 * 验证需求：8.1-8.3
 */
export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const [layoutContext, setLayoutContext] = useState<LayoutContext>(() => {
    // 初始化时使用默认值，避免服务端渲染问题
    if (typeof window === 'undefined') {
      return {
        viewport: 'desktop',
        width: 1920,
        height: 1080,
      };
    }
    
    return {
      viewport: getViewportType(window.innerWidth),
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      setLayoutContext({
        viewport: getViewportType(window.innerWidth),
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 初始化时更新一次
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ResponsiveLayoutContext.Provider value={layoutContext}>
      {children}
    </ResponsiveLayoutContext.Provider>
  );
}

/**
 * useViewport Hook
 * 
 * 获取当前视口信息，包括设备类型、宽度和高度。
 * 
 * @returns LayoutContext 包含 viewport, width, height
 * @throws Error 如果在 ResponsiveLayout 组件外使用
 */
export function useViewport(): LayoutContext {
  const context = useContext(ResponsiveLayoutContext);
  
  if (context === undefined) {
    throw new Error('useViewport must be used within a ResponsiveLayout');
  }
  
  return context;
}

/**
 * 根据窗口宽度确定视口类型
 * 
 * @param width 窗口宽度（像素）
 * @returns Viewport 类型：'mobile' | 'tablet' | 'desktop'
 */
function getViewportType(width: number): Viewport {
  if (width < BREAKPOINTS.mobile) {
    return 'mobile';
  } else if (width < BREAKPOINTS.desktop) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}
