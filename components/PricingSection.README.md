# PricingSection 组件

展示服务价格区间的区块组件。

## 功能特性

- 渲染三个服务类型和起始价格
- 强调"起"字（使用红色和较大字体）
- 列出每个服务的特性列表
- 响应式网格布局（移动端 1 列，平板 2 列，桌面 3 列）
- 滚动进入视口时的渐显动画

## Props

```typescript
interface PricingSectionProps {
  services: PricingService[];
}

interface PricingService {
  id: string;
  name: string;
  startingPrice: number;
  features: string[];
}
```

## 使用示例

```tsx
import { PricingSection } from './PricingSection';

const services = [
  {
    id: 'website',
    name: '企业官网定制',
    startingPrice: 8000,
    features: [
      '响应式设计，适配各种设备',
      '专业视觉设计',
      'SEO 优化',
      '基础内容管理',
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
    ],
  },
];

<PricingSection services={services} />
```

## 设计要点

### 价格展示
- 使用大号字体（4xl）显示价格数字
- 价格使用蓝色（blue-600）
- "起"字使用红色（red-600）和较大字体（2xl）强调
- 价格和"起"字在同一行，基线对齐

### 特性列表
- 使用绿色勾选图标标识每个特性
- 特性文本使用灰色（gray-700）
- 列表项之间有适当间距

### 响应式布局
- 移动端（< 768px）：1 列
- 平板端（768px - 1024px）：2 列
- 桌面端（> 1024px）：3 列

### 动画效果
- 区块标题从上方淡入
- 价格卡片依次从下方淡入，带有延迟效果
- 底部说明文字淡入

## 需求追溯

- 需求 6.1：展示三个服务类型的起始价格 ✓
- 需求 6.2：显示"企业官网定制：8000元起" ✓
- 需求 6.3：显示"后台管理系统：12000元起" ✓
- 需求 6.4：显示"自动化系统开发：5000元起" ✓
- 需求 6.5：强调"起"字，表明根据需求定制 ✓

## 可访问性

- 使用语义化的 HTML 标签（section, h2, h3, ul, li）
- 价格信息清晰可读
- 图标使用 SVG，确保在不同分辨率下清晰显示
- 文本与背景对比度符合 WCAG AA 标准

## 样式说明

- 背景色：灰色（bg-gray-50）
- 卡片使用 elevated 变体，带有阴影效果
- 内边距：py-16 px-4
- 最大宽度：max-w-7xl，居中显示
