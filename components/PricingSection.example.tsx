/**
 * PricingSection 组件使用示例
 */

import { PricingSection } from './PricingSection';
import type { PricingService } from '../types';

/**
 * 示例 1：基本使用
 * 展示三个服务类型的价格
 */
export function BasicPricingExample() {
  const services: PricingService[] = [
    {
      id: 'website',
      name: '企业官网定制',
      startingPrice: 8000,
      features: [
        '响应式设计，适配各种设备',
        '专业视觉设计',
        'SEO 优化',
        '基础内容管理',
        '域名与服务器配置指导',
      ],
    },
    {
      id: 'backend',
      name: '后台管理系统',
      startingPrice: 12000,
      features: [
        '定制化功能开发',
        '数据管理与统计',
        '权限管理系统',
        '系统稳定运行',
        '基础维护支持',
      ],
    },
    {
      id: 'automation',
      name: '自动化系统开发',
      startingPrice: 5000,
      features: [
        '流程自动化',
        '数据自动处理',
        '第三方系统对接',
        '提升工作效率',
        '可扩展架构',
      ],
    },
  ];

  return <PricingSection services={services} />;
}

/**
 * 示例 2：完整页面集成
 * 在完整页面中使用 PricingSection
 */
export function FullPageExample() {
  const services: PricingService[] = [
    {
      id: 'website',
      name: '企业官网定制',
      startingPrice: 8000,
      features: [
        '响应式设计，适配各种设备',
        '专业视觉设计，提升品牌形象',
        'SEO 优化，提高搜索排名',
        '基础内容管理系统',
        '域名与服务器配置指导',
        '上线后基础维护支持',
      ],
    },
    {
      id: 'backend',
      name: '后台管理系统',
      startingPrice: 12000,
      features: [
        '定制化功能开发',
        '数据管理与统计分析',
        '多角色权限管理',
        '系统稳定运行保障',
        '数据安全与备份',
        '基础维护与技术支持',
      ],
    },
    {
      id: 'automation',
      name: '自动化系统开发',
      startingPrice: 5000,
      features: [
        '业务流程自动化',
        '数据自动采集与处理',
        '第三方系统 API 对接',
        '显著提升工作效率',
        '可扩展的系统架构',
        '定期优化与升级',
      ],
    },
  ];

  return (
    <div>
      {/* 其他区块... */}
      <PricingSection services={services} />
      {/* 其他区块... */}
    </div>
  );
}

/**
 * 示例 3：自定义服务数据
 * 展示如何使用不同的服务配置
 */
export function CustomServicesExample() {
  const customServices: PricingService[] = [
    {
      id: 'basic-website',
      name: '基础企业官网',
      startingPrice: 8000,
      features: [
        '5-8 个页面',
        '响应式设计',
        '基础 SEO 优化',
        '联系表单',
      ],
    },
    {
      id: 'advanced-website',
      name: '高级企业官网',
      startingPrice: 15000,
      features: [
        '10+ 个页面',
        '高级动画效果',
        '内容管理系统',
        '多语言支持',
        '高级 SEO 优化',
      ],
    },
    {
      id: 'ecommerce',
      name: '电商系统',
      startingPrice: 25000,
      features: [
        '产品管理系统',
        '购物车与支付集成',
        '订单管理',
        '库存管理',
        '会员系统',
      ],
    },
  ];

  return <PricingSection services={customServices} />;
}
