/**
 * Input 组件
 * 
 * 可复用的输入组件，支持多种输入类型和验证错误显示
 * 需求：7.2-7.4, 8.6, 12.3
 */

import React from 'react';
import type { InputProps } from '../types';

/**
 * 输入组件
 * 
 * 特性：
 * - 支持 text, email, tel, textarea 类型
 * - 关联 label 标签（使用 htmlFor）
 * - 显示验证错误信息
 * - 移动端字体至少 16px（防止 iOS 自动缩放）
 * - 完整的可访问性支持
 */
export const Input: React.FC<InputProps> = ({
  type,
  label,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  id,
  name,
  className = '',
}) => {
  // 生成唯一 ID（如果未提供）
  const inputId = id || `input-${name || label.toLowerCase().replace(/\s+/g, '-')}`;
  const errorId = `${inputId}-error`;

  // 基础样式
  const baseStyles = [
    'w-full',
    'px-4',
    'py-3',
    'border',
    'rounded-lg',
    'transition-all',
    'duration-200',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-1',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:bg-gray-100',
    // 移动端字体至少 16px（防止 iOS 自动缩放）
    'text-base',
    'md:text-base',
  ];

  // 错误状态样式
  const errorStyles = error
    ? [
        'border-red-500',
        'focus:ring-red-500',
        'focus:border-red-500',
      ]
    : [
        'border-gray-300',
        'focus:ring-blue-500',
        'focus:border-blue-500',
        'hover:border-gray-400',
      ];

  // 合并样式
  const inputClasses = [...baseStyles, ...errorStyles, className]
    .filter(Boolean)
    .join(' ');

  // Label 样式
  const labelClasses = [
    'block',
    'text-sm',
    'font-medium',
    'text-gray-700',
    'mb-2',
  ].join(' ');

  // 错误信息样式
  const errorClasses = [
    'mt-2',
    'text-sm',
    'text-red-600',
    'flex',
    'items-start',
    'gap-1',
  ].join(' ');

  // 处理输入变化
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  // 渲染输入元素
  const renderInput = () => {
    const commonProps = {
      id: inputId,
      name: name || inputId,
      value,
      onChange: handleChange,
      required,
      placeholder,
      className: inputClasses,
      'aria-invalid': error ? 'true' : 'false',
      'aria-describedby': error ? errorId : undefined,
    };

    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          rows={4}
          style={{ resize: 'vertical' }}
        />
      );
    }

    return (
      <input
        {...commonProps}
        type={type}
        // 为 tel 类型添加 inputMode 提示
        inputMode={type === 'tel' ? 'tel' : type === 'email' ? 'email' : 'text'}
      />
    );
  };

  return (
    <div className="w-full">
      {/* Label 标签 - 使用 htmlFor 关联输入框 */}
      <label htmlFor={inputId} className={labelClasses}>
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-label="必填">
            *
          </span>
        )}
      </label>

      {/* 输入框 */}
      {renderInput()}

      {/* 错误信息 */}
      {error && (
        <div id={errorId} className={errorClasses} role="alert">
          <svg
            className="w-4 h-4 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default Input;
