/**
 * 主页面
 * 
 * 企业服务展示网站的主页，组装所有区块组件
 * 需求：所有需求
 */

'use client';

import React, { useState, useRef } from 'react';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/HeroSection';
import type { ContactFormData } from '@/types';
import {
  generateOrganizationSchema,
  generateServiceSchema,
  structuredDataToScript,
} from '@/lib/structured-data';

// 懒加载非首屏组件
const SolutionsSection = dynamic(
  () => import('@/components/SolutionsSection').then((mod) => mod.SolutionsSection),
  {
    loading: () => <div className="py-24 text-center">加载中...</div>,
  }
);

const CasesSection = dynamic(
  () => import('@/components/CasesSection').then((mod) => mod.CasesSection),
  {
    loading: () => <div className="py-24 text-center">加载中...</div>,
  }
);

const ProcessSection = dynamic(
  () => import('@/components/ProcessSection').then((mod) => mod.ProcessSection),
  {
    loading: () => <div className="py-24 text-center">加载中...</div>,
  }
);

const CommitmentSection = dynamic(
  () => import('@/components/CommitmentSection').then((mod) => mod.CommitmentSection),
  {
    loading: () => <div className="py-24 text-center">加载中...</div>,
  }
);

const PricingSection = dynamic(
  () => import('@/components/PricingSection').then((mod) => mod.PricingSection),
  {
    loading: () => <div className="py-24 text-center">加载中...</div>,
  }
);

const ContactForm = dynamic(
  () => import('@/components/ContactForm').then((mod) => mod.ContactForm),
  {
    loading: () => <div className="py-24 text-center">加载中...</div>,
  }
);

const Footer = dynamic(
  () => import('@/components/Footer').then((mod) => mod.Footer),
  {
    loading: () => <div className="py-16 text-center">加载中...</div>,
  }
);

/**
 * 主页组件
 * 
 * 特性：
 * - 按顺序组装所有区块
 * - 实现平滑滚动
 * - "查看案例"按钮滚动到案例区块
 * - "预约沟通"按钮滚动到联系表单
 * - 处理表单提交
 */
export default function HomePage() {
  // 区块引用
  const casesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  // 表单提交状态
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 平滑滚动到指定区块
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // 处理"查看案例"按钮点击
  const handleViewCases = () => {
    scrollToSection(casesRef);
  };

  // 处理"预约沟通"按钮点击
  const handleContactClick = () => {
    scrollToSection(contactRef);
  };

  // 处理表单提交
  const handleFormSubmit = async (data: ContactFormData): Promise<void> => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || '提交失败');
      }

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // 表单提交成功回调
  const handleFormSuccess = () => {
    setShowSuccessModal(true);
    // 3秒后自动关闭模态框
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  // 表单提交失败回调
  const handleFormError = (error: Error) => {
    console.error('表单提交错误:', error);
  };

  return (
    <main className="min-h-screen">
      {/* 结构化数据 - 组织信息 */}
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredDataToScript(generateOrganizationSchema()),
        }}
      />

      {/* 结构化数据 - 服务信息 */}
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: structuredDataToScript(generateServiceSchema()),
        }}
      />

      {/* Hero Section - 首屏 */}
      <HeroSection
        title="为企业提供专业网站与系统定制服务 助力业务升级与数字化管理"
        subtitle="专注企业官网建设、后台系统开发与自动化解决方案"
        targetAudience={['中小企业', '制造业', '贸易公司', '服务型企业']}
        contactInfo={{
          phone: '13151488988',
          email: 'mvpm@vip.qq.com',
        }}
        ctaButtons={[
          {
            text: '预约沟通',
            variant: 'primary',
            action: handleContactClick,
          },
          {
            text: '查看案例',
            variant: 'secondary',
            action: handleViewCases,
          },
        ]}
      />

      {/* Solutions Section - 问题解决方案 */}
      <SolutionsSection
        solutions={[
          {
            id: 'solution-1',
            problem: '企业形象与品牌展示不足',
            solution: '定制企业官网',
          },
          {
            id: 'solution-2',
            problem: '管理流程分散，数据不清晰',
            solution: '定制后台管理系统',
          },
          {
            id: 'solution-3',
            problem: '人工操作多，效率低',
            solution: '自动化系统开发',
          },
        ]}
      />

      {/* Cases Section - 项目案例 */}
      <section ref={casesRef}>
        <CasesSection
          cases={[
            {
              id: 'case-1',
              title: '机械制造企业官网升级项目',
              description: '为某机械制造企业打造现代化官网，展示产品线和企业实力',
              deliveryTime: '7天',
              highlights: [
                '响应式设计，适配所有设备',
                '产品展示系统，支持分类筛选',
                '在线询价功能',
                '系统稳定运行超过2年',
              ],
            },
            {
              id: 'case-2',
              title: '贸易公司内部管理系统',
              description: '定制开发订单管理、库存管理、客户管理一体化系统',
              deliveryTime: '15天',
              highlights: [
                '订单全流程跟踪',
                '库存实时同步',
                '客户数据统一管理',
                '数据报表自动生成',
              ],
            },
          ]}
        />
      </section>

      {/* Process Section - 合作流程 */}
      <ProcessSection
        steps={[
          {
            id: 'step-1',
            order: 1,
            title: '需求沟通与方案评估',
            description: '深入了解您的业务需求，评估技术可行性',
          },
          {
            id: 'step-2',
            order: 2,
            title: '出具功能说明与报价',
            description: '提供详细的功能清单和透明的价格方案',
          },
          {
            id: 'step-3',
            order: 3,
            title: '分阶段开发与测试',
            description: '按计划推进开发，每个阶段确认后再继续',
          },
          {
            id: 'step-4',
            order: 4,
            title: '验收确认后正式上线',
            description: '完成测试验收，提供上线指导和基础维护',
          },
        ]}
      />

      {/* Commitment Section - 服务承诺 */}
      <CommitmentSection
        commitments={[
          {
            id: 'commitment-1',
            text: '项目按约定周期推进',
          },
          {
            id: 'commitment-2',
            text: '功能确认后再开发',
          },
          {
            id: 'commitment-3',
            text: '提供上线指导与基础维护',
          },
          {
            id: 'commitment-4',
            text: '可签订合作协议',
          },
        ]}
        highlight="每个项目都以长期稳定运行为目标"
      />

      {/* Pricing Section - 价格区间 */}
      <PricingSection
        services={[
          {
            id: 'pricing-1',
            name: '企业官网定制',
            startingPrice: 8000,
            features: [
              '响应式设计',
              '内容管理系统',
              'SEO 优化',
              '基础维护支持',
            ],
          },
          {
            id: 'pricing-2',
            name: '后台管理系统',
            startingPrice: 12000,
            features: [
              '业务流程定制',
              '数据统计分析',
              '权限管理',
              '系统培训',
            ],
          },
          {
            id: 'pricing-3',
            name: '自动化系统开发',
            startingPrice: 5000,
            features: [
              '流程自动化',
              '数据对接',
              '定时任务',
              '错误监控',
            ],
          },
        ]}
      />

      {/* Contact Section - 联系表单 */}
      <section
        ref={contactRef}
        className="py-16 md:py-24 bg-gray-50"
        id="contact"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              联系我们
            </h2>
            <p className="text-lg text-gray-600">
              填写您的需求，我们会尽快与您联系
            </p>
          </div>

          <ContactForm
            onSubmit={handleFormSubmit}
            onSuccess={handleFormSuccess}
            onError={handleFormError}
          />
        </div>
      </section>

      {/* Footer - 底部 */}
      <Footer
        contactInfo={{
          phone: '13151488988',
          email: 'mvpm@vip.qq.com',
        }}
        copyright="© 2024 企业服务定制. 专注为企业提供稳定可靠的技术解决方案"
        onContactClick={handleContactClick}
      />
    </main>
  );
}
