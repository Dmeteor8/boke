/**
 * ContactForm 组件使用示例
 */

import React, { useState } from 'react';
import { ContactForm } from './ContactForm';
import type { ContactFormData } from '../types';

/**
 * 基础使用示例
 */
export function BasicExample() {
  const handleSubmit = async (data: ContactFormData) => {
    // 模拟 API 调用
    console.log('提交表单数据:', data);
    
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 模拟成功响应
    return Promise.resolve();
  };

  const handleSuccess = () => {
    alert('提交成功！我们会尽快与您联系。');
  };

  const handleError = (error: Error) => {
    alert(`提交失败：${error.message}。请稍后重试或直接拨打电话联系我们。`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">联系我们</h2>
      <ContactForm
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}

/**
 * 带 API 集成的示例
 */
export function APIIntegrationExample() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '提交失败');
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  };

  const handleSuccess = () => {
    setShowSuccessModal(true);
    setErrorMessage(null);
  };

  const handleError = (error: Error) => {
    setErrorMessage(error.message);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">预约沟通</h2>
      
      {/* 错误提示 */}
      {errorMessage && (
        <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h3 className="text-sm font-medium text-red-800">提交失败</h3>
              <p className="mt-1 text-sm text-red-700">{errorMessage}</p>
              <p className="mt-2 text-sm text-red-700">
                请稍后重试，或直接拨打{' '}
                <a href="tel:13151488988" className="underline font-medium">
                  13151488988
                </a>
              </p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="ml-auto text-red-600 hover:text-red-800"
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
        </div>
      )}

      {/* 联系表单 */}
      <ContactForm
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        onError={handleError}
      />

      {/* 成功模态框 */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                提交成功！
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                感谢您的咨询，我们会尽快与您联系。
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * 嵌入页面中的示例
 */
export function EmbeddedExample() {
  const handleSubmit = async (data: ContactFormData) => {
    console.log('提交表单数据:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            预约沟通
          </h2>
          <p className="text-lg text-gray-600">
            填写您的需求，我们会尽快与您联系
          </p>
        </div>
        
        <ContactForm
          onSubmit={handleSubmit}
          onSuccess={() => {
            // 滚动到页面顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onError={(error) => {
            console.error('提交失败:', error);
          }}
        />
      </div>
    </section>
  );
}

export default BasicExample;
