/**
 * Button 组件
 * 
 * 可复用的按钮组件，支持多种变体和尺寸
 * 需求：1.4, 8.5, 12.1
 */

import React from 'react';
import type { ButtonProps } from '../types';

/**
 * 按钮组件
 * 
 * 特性：
 * - 支持 primary, secondary, outline 三种变体
 * - 支持 sm, md, lg 三种尺寸
 * - 移动端最小触摸区域 44x44px
 * - 完整的键盘导航支持
 * - 清晰的焦点样式
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
}) => {
  // 基础样式
  const baseStyles = [
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-lg',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
  ];

  // 变体样式
  const variantStyles = {
    primary: [
      'bg-blue-600',
      'text-white',
      'hover:bg-blue-700',
      'focus:ring-blue-500',
      'active:bg-blue-800',
    ],
    secondary: [
      'bg-gray-600',
      'text-white',
      'hover:bg-gray-700',
      'focus:ring-gray-500',
      'active:bg-gray-800',
    ],
    outline: [
      'bg-transparent',
      'text-blue-600',
      'border-2',
      'border-blue-600',
      'hover:bg-blue-50',
      'focus:ring-blue-500',
      'active:bg-blue-100',
    ],
  };

  // 尺寸样式
  // 注意：所有尺寸在移动端都确保最小 44x44px 触摸区域
  const sizeStyles = {
    sm: [
      'text-sm',
      'px-4',
      'py-2.5',
      'min-h-[44px]', // 移动端最小触摸区域
      'min-w-[44px]',
    ],
    md: [
      'text-base',
      'px-6',
      'py-3',
      'min-h-[44px]', // 移动端最小触摸区域
      'min-w-[44px]',
    ],
    lg: [
      'text-lg',
      'px-8',
      'py-3.5',
      'min-h-[44px]', // 移动端最小触摸区域
      'min-w-[44px]',
    ],
  };

  // 合并所有样式类
  const buttonClasses = [
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      // 确保键盘可访问性
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </button>
  );
};

export default Button;
