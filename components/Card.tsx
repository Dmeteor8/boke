/**
 * Card 组件
 * 
 * 可复用的卡片组件，支持多种变体和可选的点击交互
 * 需求：2.1-2.4, 3.1-3.6
 */

import React from 'react';
import type { CardProps } from '../types';

/**
 * 卡片组件
 * 
 * 特性：
 * - 支持 default, elevated, outlined 三种变体
 * - 响应式布局适配
 * - 可选的点击交互
 * - 完整的键盘导航支持（当可点击时）
 */
export const Card: React.FC<CardProps> = ({
  title,
  children,
  variant = 'default',
  onClick,
  className = '',
}) => {
  // 基础样式
  const baseStyles = [
    'rounded-lg',
    'p-6',
    'transition-all',
    'duration-200',
    'w-full',
  ];

  // 变体样式
  const variantStyles = {
    default: [
      'bg-white',
      'border',
      'border-gray-200',
    ],
    elevated: [
      'bg-white',
      'shadow-md',
      'hover:shadow-lg',
    ],
    outlined: [
      'bg-transparent',
      'border-2',
      'border-gray-300',
    ],
  };

  // 交互样式（当可点击时）
  const interactiveStyles = onClick
    ? [
        'cursor-pointer',
        'hover:scale-[1.02]',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-blue-500',
        'focus:ring-offset-2',
        'active:scale-[0.98]',
      ]
    : [];

  // 合并所有样式类
  const cardClasses = [
    ...baseStyles,
    ...variantStyles[variant],
    ...interactiveStyles,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // 标题样式
  const titleClasses = [
    'text-xl',
    'font-semibold',
    'text-gray-900',
    'mb-4',
  ].join(' ');

  // 内容样式
  const contentClasses = [
    'text-gray-700',
  ].join(' ');

  // 处理键盘事件（当可点击时）
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // 如果可点击，使用 div 并添加适当的 ARIA 属性
  const Component = onClick ? 'div' : 'div';
  const interactiveProps = onClick
    ? {
        onClick,
        onKeyDown: handleKeyDown,
        role: 'button',
        tabIndex: 0,
        'aria-pressed': 'false',
      }
    : {};

  return (
    <Component
      className={cardClasses}
      {...interactiveProps}
    >
      {title && <h3 className={titleClasses}>{title}</h3>}
      <div className={contentClasses}>{children}</div>
    </Component>
  );
};

export default Card;
