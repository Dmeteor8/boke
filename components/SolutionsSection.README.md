# SolutionsSection 组件

问题-解决方案展示区块组件，用于展示企业服务如何解决客户的业务痛点。

## 功能特性

- ✅ 渲染三个问题-解决方案配对
- ✅ 使用 Card 组件展示每个配对
- ✅ 滚动进入视口时的渐显动画（Framer Motion）
- ✅ 响应式网格布局（移动端 1 列，平板 2 列，桌面 3 列）
- ✅ 清晰的视觉层次（问题用红色标签，解决方案用蓝色标签）

## 需求追溯

- **需求 2.1**: 展示三个核心问题与解决方案配对
- **需求 2.2**: 显示"企业形象与品牌展示不足" -> "定制企业官网"
- **需求 2.3**: 显示"管理流程分散，数据不清晰" -> "定制后台管理系统"
- **需求 2.4**: 显示"人工操作多，效率低" -> "自动化系统开发"
- **需求 2.5**: 滚动到解决方案区域时以视觉动效突出显示

## 使用方法

### 基础用法

```tsx
import { SolutionsSection } from '@/components/SolutionsSection';
import type { Solution } from '@/types';

const solutions: Solution[] = [
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
];

function App() {
  return <SolutionsSection solutions={solutions} />;
}
```

### 带图标的用法

```tsx
const solutions: Solution[] = [
  {
    id: 'solution-1',
    problem: '企业形象与品牌展示不足',
    solution: '定制企业官网',
    icon: '🌐', // 可选的图标
  },
  // ...
];
```

## Props

### SolutionsSectionProps

| 属性 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `solutions` | `Solution[]` | ✅ | 问题-解决方案配对数组 |

### Solution 类型

```typescript
interface Solution {
  id: string;           // 唯一标识符
  problem: string;      // 问题描述
  solution: string;     // 解决方案描述
  icon?: string;        // 可选的图标（当前未在 UI 中使用）
}
```

## 响应式行为

组件使用 Tailwind CSS 的响应式网格系统：

- **移动端** (`< 768px`): 1 列布局
- **平板端** (`768px - 1024px`): 2 列布局
- **桌面端** (`> 1024px`): 3 列布局

## 动画效果

使用 Framer Motion 实现滚动动画：

1. **区块标题动画**：
   - 从下方淡入（`y: 20` -> `y: 0`）
   - 持续时间：0.6 秒
   - 触发条件：进入视口 100px 范围内

2. **卡片动画**：
   - 从下方淡入（`y: 30` -> `y: 0`）
   - 持续时间：0.5 秒
   - 延迟：每个卡片延迟 0.1 秒（错开动画）
   - 触发条件：进入视口 50px 范围内

## 样式定制

组件使用 Tailwind CSS 类，可以通过以下方式定制：

### 修改颜色方案

在 `tailwind.config.ts` 中修改主题色：

```typescript
module.exports = {
  theme: {
    extend: {
      colors: {
        // 修改问题标签颜色（默认红色）
        'problem': '#dc2626',
        // 修改解决方案标签颜色（默认蓝色）
        'solution': '#2563eb',
      },
    },
  },
};
```

### 修改间距

直接修改组件中的 Tailwind 类：

```tsx
// 修改区块内边距
<section className="py-16 px-4"> // 改为 py-20 px-6

// 修改卡片间距
<div className="grid ... gap-6"> // 改为 gap-8
```

## 可访问性

- ✅ 使用语义化 HTML 标签（`<section>`, `<h2>`, `<h3>`）
- ✅ 清晰的视觉层次和对比度
- ✅ 响应式设计确保在所有设备上可读
- ✅ 动画使用 `once: true` 避免重复触发

## 性能优化

- ✅ 使用 `'use client'` 指令标记为客户端组件
- ✅ 动画使用 `viewport={{ once: true }}` 只触发一次
- ✅ 使用 `margin` 参数优化动画触发时机

## 测试

组件包含完整的单元测试，覆盖以下场景：

- ✅ 渲染区块标题
- ✅ 渲染所有问题-解决方案配对
- ✅ 显示"问题"和"解决方案"标签
- ✅ 使用正确的网格布局
- ✅ 渲染正确数量的卡片
- ✅ 处理空数组
- ✅ 使用唯一的 key
- ✅ 正确配对问题和解决方案

运行测试：

```bash
npm run test components/SolutionsSection.test.tsx
```

## 依赖

- `react`: React 核心库
- `framer-motion`: 动画库
- `./Card`: 卡片组件
- `../types`: TypeScript 类型定义

## 相关组件

- `Card`: 用于展示每个问题-解决方案配对
- `HeroSection`: 首屏区块
- `CasesSection`: 案例展示区块

## 示例

查看 `SolutionsSection.example.tsx` 文件获取更多使用示例。
