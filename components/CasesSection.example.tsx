/**
 * CasesSection 组件使用示例
 * 
 * 展示如何使用 CasesSection 组件
 */

import React from 'react';
import { CasesSection } from './CasesSection';
import type { CaseStudy } from '../types';

/**
 * 基础示例
 */
export const BasicExample = () => {
  const cases: CaseStudy[] = [
    {
      id: 'case-1',
      title: '机械制造企业官网升级项目',
      description: '为某机械制造企业打造现代化官网，提升品牌形象和在线展示能力',
      deliveryTime: '7天',
      highlights: [
        '响应式设计，完美适配手机、平板、电脑等各种设备',
        'SEO 优化，提升搜索引擎排名，增加曝光度',
        '系统稳定运行超过 1 年，零故障记录',
        '加载速度优化，首屏加载时间小于 2 秒',
      ],
    },
    {
      id: 'case-2',
      title: '贸易公司内部管理系统',
      description: '定制化后台管理系统，实现订单、库存、客户信息的统一管理，大幅提升运营效率',
      deliveryTime: '15天',
      highlights: [
        '订单管理自动化，减少人工操作 80%',
        '数据可视化报表，实时掌握业务状况',
        '多角色权限管理，保障数据安全',
        '移动端适配，随时随地处理业务',
      ],
    },
  ];

  return <CasesSection cases={cases} />;
};

/**
 * 多案例示例
 */
export const MultipleCasesExample = () => {
  const cases: CaseStudy[] = [
    {
      id: 'case-1',
      title: '机械制造企业官网升级项目',
      description: '为某机械制造企业打造现代化官网，提升品牌形象',
      deliveryTime: '7天',
      highlights: [
        '响应式设计，适配各种设备',
        'SEO 优化，提升搜索排名',
        '系统稳定运行超过 1 年',
      ],
    },
    {
      id: 'case-2',
      title: '贸易公司内部管理系统',
      description: '定制化后台管理系统，提升运营效率',
      deliveryTime: '15天',
      highlights: [
        '订单管理自动化',
        '数据可视化报表',
        '多角色权限管理',
      ],
    },
    {
      id: 'case-3',
      title: '服务型企业预约系统',
      description: '在线预约系统，客户可自助预约服务时间',
      deliveryTime: '10天',
      highlights: [
        '在线预约，减少电话沟通成本',
        '自动提醒，降低爽约率',
        '数据统计，优化服务安排',
      ],
    },
    {
      id: 'case-4',
      title: '制造业生产管理系统',
      description: '生产流程数字化管理，实时追踪生产进度',
      deliveryTime: '20天',
      highlights: [
        '生产计划管理',
        '物料需求计算',
        '质量追溯系统',
        '设备维护管理',
      ],
    },
  ];

  return <CasesSection cases={cases} />;
};

/**
 * 最小案例示例（边界情况）
 */
export const MinimalCasesExample = () => {
  const cases: CaseStudy[] = [
    {
      id: 'case-1',
      title: '企业官网项目',
      description: '简洁的企业官网',
      deliveryTime: '5天',
      highlights: ['快速交付', '稳定运行'],
    },
    {
      id: 'case-2',
      title: '管理系统项目',
      description: '基础管理系统',
      deliveryTime: '10天',
      highlights: ['功能完善', '易于使用'],
    },
  ];

  return <CasesSection cases={cases} />;
};

/**
 * 带图片的案例示例（未来扩展）
 */
export const CasesWithImagesExample = () => {
  const cases: CaseStudy[] = [
    {
      id: 'case-1',
      title: '机械制造企业官网升级项目',
      description: '为某机械制造企业打造现代化官网，提升品牌形象',
      deliveryTime: '7天',
      highlights: [
        '响应式设计，适配各种设备',
        'SEO 优化，提升搜索排名',
        '系统稳定运行超过 1 年',
      ],
      image: '/images/cases/case-1.jpg',
    },
    {
      id: 'case-2',
      title: '贸易公司内部管理系统',
      description: '定制化后台管理系统，提升运营效率',
      deliveryTime: '15天',
      highlights: [
        '订单管理自动化',
        '数据可视化报表',
        '多角色权限管理',
      ],
      image: '/images/cases/case-2.jpg',
    },
  ];

  return <CasesSection cases={cases} />;
};

/**
 * 使用说明
 */
export const UsageNotes = () => {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">CasesSection 组件使用说明</h1>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">基本用法</h2>
        <p className="text-gray-700">
          CasesSection 组件用于展示项目案例，支持点击展开/收起详情。
        </p>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`import { CasesSection } from './components/CasesSection';

const cases = [
  {
    id: 'case-1',
    title: '项目标题',
    description: '项目描述',
    deliveryTime: '7天',
    highlights: ['亮点1', '亮点2', '亮点3'],
  },
  // ... 更多案例
];

<CasesSection cases={cases} />`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Props 说明</h2>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">属性</th>
              <th className="border border-gray-300 px-4 py-2 text-left">类型</th>
              <th className="border border-gray-300 px-4 py-2 text-left">必填</th>
              <th className="border border-gray-300 px-4 py-2 text-left">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">cases</td>
              <td className="border border-gray-300 px-4 py-2">CaseStudy[]</td>
              <td className="border border-gray-300 px-4 py-2">是</td>
              <td className="border border-gray-300 px-4 py-2">案例列表数组</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">CaseStudy 类型</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code>{`interface CaseStudy {
  id: string;              // 唯一标识
  title: string;           // 案例标题
  description: string;     // 案例描述
  deliveryTime: string;    // 交付周期（如 "7天"）
  highlights: string[];    // 项目亮点列表
  image?: string;          // 可选的案例图片
}`}</code>
        </pre>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">特性</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>响应式网格布局（移动端 1 列，桌面端 2 列）</li>
          <li>点击案例卡片展开/收起详情</li>
          <li>展开时显示项目亮点列表</li>
          <li>平滑的展开/收起动画效果</li>
          <li>滚动进入视口时的渐显动画</li>
          <li>悬停时的阴影效果</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">需求追溯</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>需求 3.1：展示至少两个案例</li>
          <li>需求 3.2：显示交付周期</li>
          <li>需求 3.3：显示项目亮点</li>
          <li>需求 3.6：点击展开案例详情</li>
        </ul>
      </section>
    </div>
  );
};
