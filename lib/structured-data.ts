/**
 * 结构化数据生成器
 * 
 * 生成 Schema.org 格式的结构化数据，用于 SEO 优化
 * 需求：10.6
 */

import type { StructuredData } from '@/types';

/**
 * 生成组织结构化数据
 * 
 * 用于告诉搜索引擎网站的组织信息
 */
export function generateOrganizationSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '企业服务定制',
    description:
      '专注为中小企业提供专业的网站定制、后台管理系统开发和自动化解决方案',
    url: 'https://yourdomain.com',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-13151488988',
      email: 'mvpm@vip.qq.com',
      contactType: '客户服务',
    },
  };
}

/**
 * 生成服务结构化数据
 * 
 * 用于告诉搜索引擎提供的服务信息
 */
export function generateServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: '企业网站与系统定制开发',
    provider: {
      '@type': 'Organization',
      name: '企业服务定制',
      telephone: '+86-13151488988',
      email: 'mvpm@vip.qq.com',
    },
    areaServed: {
      '@type': 'Country',
      name: '中国',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: '服务项目',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '企业官网定制',
            description: '响应式设计、内容管理系统、SEO 优化',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '后台管理系统',
            description: '业务流程定制、数据统计分析、权限管理',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '自动化系统开发',
            description: '流程自动化、数据对接、定时任务',
          },
        },
      ],
    },
  };
}

/**
 * 生成面包屑导航结构化数据
 */
export function generateBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: '首页',
        item: 'https://yourdomain.com',
      },
    ],
  };
}

/**
 * 生成常见问题结构化数据
 */
export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '你们的服务适合什么类型的企业？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '我们专注为中小企业、制造业、贸易公司和服务型企业提供定制化的网站和系统开发服务。',
        },
      },
      {
        '@type': 'Question',
        name: '项目开发周期是多久？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '根据项目复杂度不同，企业官网通常 7-15 天，后台管理系统通常 15-30 天。我们会在需求沟通后给出准确的时间计划。',
        },
      },
      {
        '@type': 'Question',
        name: '如何保证项目质量？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '我们采用分阶段开发模式，每个阶段完成后进行确认。功能确认后再开发，确保最终交付的系统符合您的需求。所有项目都以长期稳定运行为目标。',
        },
      },
    ],
  };
}

/**
 * 将结构化数据转换为 JSON-LD 脚本标签
 */
export function structuredDataToScript(data: any): string {
  return JSON.stringify(data);
}
