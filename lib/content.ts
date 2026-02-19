/**
 * 网站内容数据
 * 
 * 集中管理网站所有文本内容和数据
 * 需求：11.1-11.6
 */

import type { WebsiteContent } from '@/types';

/**
 * 网站完整内容数据
 * 
 * 文案特点：
 * - 强调专业性、稳定性、长期合作
 * - 避免使用"便宜"、"快速"等降低价值感的词汇
 * - 突出规范流程和技术实力
 */
export const websiteContent: WebsiteContent = {
  // Hero Section - 首屏内容
  hero: {
    title: '为企业提供专业网站与系统定制服务 助力业务升级与数字化管理',
    subtitle: '专注企业官网建设、后台系统开发与自动化解决方案',
    targetAudience: ['中小企业', '制造业', '贸易公司', '服务型企业'],
    contactInfo: {
      phone: '13151488988',
      email: 'mvpm@vip.qq.com',
    },
  },

  // Solutions Section - 问题解决方案
  solutions: [
    {
      id: 'solution-1',
      problem: '企业形象与品牌展示不足',
      solution: '定制企业官网',
      icon: 'globe',
    },
    {
      id: 'solution-2',
      problem: '管理流程分散，数据不清晰',
      solution: '定制后台管理系统',
      icon: 'chart',
    },
    {
      id: 'solution-3',
      problem: '人工操作多，效率低',
      solution: '自动化系统开发',
      icon: 'cog',
    },
  ],

  // Cases Section - 项目案例
  cases: [
    {
      id: 'case-1',
      title: '机械制造企业官网升级项目',
      description:
        '为某机械制造企业打造现代化官网，全面展示产品线和企业实力。采用响应式设计，确保在各类设备上都能完美呈现。',
      deliveryTime: '7天',
      highlights: [
        '响应式设计，适配所有设备',
        '产品展示系统，支持分类筛选',
        '在线询价功能，提升客户转化',
        '系统稳定运行超过2年，零故障',
      ],
    },
    {
      id: 'case-2',
      title: '贸易公司内部管理系统',
      description:
        '定制开发订单管理、库存管理、客户管理一体化系统，实现业务流程数字化，大幅提升管理效率。',
      deliveryTime: '15天',
      highlights: [
        '订单全流程跟踪，状态实时更新',
        '库存实时同步，避免超卖',
        '客户数据统一管理，支持标签分类',
        '数据报表自动生成，辅助决策',
      ],
    },
  ],

  // Process Section - 合作流程
  process: [
    {
      id: 'step-1',
      order: 1,
      title: '需求沟通与方案评估',
      description:
        '深入了解您的业务需求和痛点，评估技术可行性，提供初步解决方案建议。',
    },
    {
      id: 'step-2',
      order: 2,
      title: '出具功能说明与报价',
      description:
        '提供详细的功能清单和开发计划，透明的价格方案，确保双方对项目范围达成一致。',
    },
    {
      id: 'step-3',
      order: 3,
      title: '分阶段开发与测试',
      description:
        '按计划推进开发工作，每个阶段完成后进行确认，确保功能符合预期后再继续下一阶段。',
    },
    {
      id: 'step-4',
      order: 4,
      title: '验收确认后正式上线',
      description:
        '完成全面测试和验收，提供上线指导和操作培训，确保系统平稳运行。提供基础维护支持。',
    },
  ],

  // Commitment Section - 服务承诺
  commitments: [
    {
      id: 'commitment-1',
      text: '项目按约定周期推进',
      icon: 'clock',
    },
    {
      id: 'commitment-2',
      text: '功能确认后再开发',
      icon: 'check',
    },
    {
      id: 'commitment-3',
      text: '提供上线指导与基础维护',
      icon: 'support',
    },
    {
      id: 'commitment-4',
      text: '可签订合作协议',
      icon: 'document',
    },
  ],

  // Pricing Section - 价格区间
  pricing: [
    {
      id: 'pricing-1',
      name: '企业官网定制',
      startingPrice: 8000,
      features: [
        '响应式设计，适配所有设备',
        '内容管理系统，方便更新',
        'SEO 优化，提升搜索排名',
        '基础维护支持，保障稳定运行',
      ],
    },
    {
      id: 'pricing-2',
      name: '后台管理系统',
      startingPrice: 12000,
      features: [
        '业务流程定制，贴合实际需求',
        '数据统计分析，辅助决策',
        '权限管理，保障数据安全',
        '系统培训，确保团队会用',
      ],
    },
    {
      id: 'pricing-3',
      name: '自动化系统开发',
      startingPrice: 5000,
      features: [
        '流程自动化，减少人工操作',
        '数据对接，打通系统壁垒',
        '定时任务，自动执行',
        '错误监控，及时发现问题',
      ],
    },
  ],

  // Footer - 底部内容
  footer: {
    contactInfo: {
      phone: '13151488988',
      email: 'mvpm@vip.qq.com',
    },
    copyright: '© 2024 企业服务定制. 专注为企业提供稳定可靠的技术解决方案',
  },
};

/**
 * 获取网站内容
 */
export function getWebsiteContent(): WebsiteContent {
  return websiteContent;
}

/**
 * 获取联系信息
 */
export function getContactInfo() {
  return websiteContent.hero.contactInfo;
}

/**
 * 获取案例列表
 */
export function getCases() {
  return websiteContent.cases;
}

/**
 * 获取解决方案列表
 */
export function getSolutions() {
  return websiteContent.solutions;
}

/**
 * 获取合作流程
 */
export function getProcess() {
  return websiteContent.process;
}

/**
 * 获取服务承诺
 */
export function getCommitments() {
  return websiteContent.commitments;
}

/**
 * 获取价格服务
 */
export function getPricing() {
  return websiteContent.pricing;
}
