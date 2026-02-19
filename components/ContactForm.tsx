/**
 * ContactForm 组件
 * 
 * 联系表单组件，用于收集潜在客户的联系信息和需求
 * 需求：7.1-7.4
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ContactFormProps, ContactFormData } from '../types';
import { contactFormSchema } from '../types/validation';
import { Button } from './Button';

/**
 * 联系表单组件
 * 
 * 特性：
 * - 使用 React Hook Form 管理表单状态
 * - 使用 Zod schema 验证表单数据
 * - 实时验证和错误提示
 * - 提交按钮禁用状态管理
 * - 保留用户输入内容（验证失败时）
 * - 完整的可访问性支持
 */
export const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  onSuccess,
  onError,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 使用 React Hook Form 管理表单
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onChange', // 实时验证
    defaultValues: {
      name: '',
      contact: '',
      requirement: '',
      company: '',
    },
  });

  // 处理表单提交
  const handleFormSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(false);
      
      await onSubmit(data);
      
      // 提交成功
      setSubmitSuccess(true);
      reset(); // 清空表单
      onSuccess?.();
      
      // 3秒后自动隐藏成功提示
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      // 提交失败
      const errorMessage = error instanceof Error ? error.message : '提交失败，请稍后重试';
      setSubmitError(errorMessage);
      onError?.(error as Error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 判断提交按钮是否应该禁用
  const isSubmitDisabled = !isDirty || !isValid || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full max-w-2xl mx-auto space-y-6"
      noValidate
    >
      {/* 成功提示 */}
      {submitSuccess && (
        <div
          className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
          role="alert"
          aria-live="polite"
        >
          <svg
            className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-green-800">提交成功！</h3>
            <p className="mt-1 text-sm text-green-700">
              感谢您的咨询，我们会尽快与您联系。
            </p>
          </div>
        </div>
      )}

      {/* 错误提示 */}
      {submitError && (
        <div
          className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          role="alert"
          aria-live="assertive"
        >
          <svg
            className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
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
          <div className="flex-1">
            <h3 className="text-sm font-medium text-red-800">提交失败</h3>
            <p className="mt-1 text-sm text-red-700">{submitError}</p>
            <p className="mt-2 text-sm text-red-700">
              您也可以直接拨打{' '}
              <a
                href="tel:13151488988"
                className="font-medium underline hover:text-red-800"
              >
                13151488988
              </a>
              {' '}或发送邮件至{' '}
              <a
                href="mailto:mvpm@vip.qq.com"
                className="font-medium underline hover:text-red-800"
              >
                mvpm@vip.qq.com
              </a>
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSubmitError(null)}
            className="text-red-400 hover:text-red-600 transition-colors"
            aria-label="关闭错误提示"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}

      {/* 姓名字段 */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          姓名
          <span className="text-red-500 ml-1" aria-label="必填">
            *
          </span>
        </label>
        <input
          id="name"
          type="text"
          placeholder="请输入您的姓名"
          className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 text-base ${
            errors.name
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
          }`}
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <div id="name-error" className="mt-2 text-sm text-red-600 flex items-start gap-1" role="alert">
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
            <span>{errors.name.message}</span>
          </div>
        )}
      </div>

      {/* 联系方式字段 */}
      <div>
        <label
          htmlFor="contact"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          联系方式
          <span className="text-red-500 ml-1" aria-label="必填">
            *
          </span>
        </label>
        <input
          id="contact"
          type="text"
          placeholder="请输入手机号或邮箱"
          className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 text-base ${
            errors.contact
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
          }`}
          aria-invalid={errors.contact ? 'true' : 'false'}
          aria-describedby={errors.contact ? 'contact-error' : undefined}
          {...register('contact')}
        />
        {errors.contact && (
          <div id="contact-error" className="mt-2 text-sm text-red-600 flex items-start gap-1" role="alert">
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
            <span>{errors.contact.message}</span>
          </div>
        )}
      </div>

      {/* 公司字段（可选） */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          公司名称
        </label>
        <input
          id="company"
          type="text"
          placeholder="请输入公司名称（可选）"
          className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 text-base ${
            errors.company
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
          }`}
          aria-invalid={errors.company ? 'true' : 'false'}
          aria-describedby={errors.company ? 'company-error' : undefined}
          {...register('company')}
        />
        {errors.company && (
          <div id="company-error" className="mt-2 text-sm text-red-600 flex items-start gap-1" role="alert">
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
            <span>{errors.company.message}</span>
          </div>
        )}
      </div>

      {/* 需求描述字段 */}
      <div>
        <label
          htmlFor="requirement"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          需求描述
          <span className="text-red-500 ml-1" aria-label="必填">
            *
          </span>
        </label>
        <textarea
          id="requirement"
          rows={4}
          placeholder="请详细描述您的需求（10-500字）"
          className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 text-base ${
            errors.requirement
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400'
          }`}
          style={{ resize: 'vertical' }}
          aria-invalid={errors.requirement ? 'true' : 'false'}
          aria-describedby={errors.requirement ? 'requirement-error' : undefined}
          {...register('requirement')}
        />
        {errors.requirement && (
          <div id="requirement-error" className="mt-2 text-sm text-red-600 flex items-start gap-1" role="alert">
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
            <span>{errors.requirement.message}</span>
          </div>
        )}
      </div>

      {/* 提交按钮 */}
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitDisabled}
          className="w-full sm:w-auto min-w-[200px]"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              提交中...
            </span>
          ) : (
            '提交'
          )}
        </Button>
      </div>

      {/* 提示文本 */}
      <p className="text-sm text-gray-500 text-center">
        提交后我们会尽快与您联系，或直接拨打{' '}
        <a
          href="tel:13151488988"
          className="text-blue-600 hover:text-blue-700 underline"
        >
          13151488988
        </a>
      </p>
    </form>
  );
};

export default ContactForm;
