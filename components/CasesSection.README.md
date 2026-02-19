# CasesSection 组件

项目案例展示区块组件，用于展示企业服务项目的真实案例。

## 功能特性

- ✅ 渲染案例列表（至少 2 个案例）
- ✅ 案例卡片点击展开/收起详情
- ✅ 显示案例标题、交付周期、亮点
- ✅ 响应式网格布局（移动端 1 列，桌面端 2 列）
- ✅ 滚动进入视口时的渐显动画
- ✅ 平滑的展开/收起动画效果

## 需求追溯

- **需求 3.1**：展示至少两个案例
- **需求 3.2**：显示交付周期
- **需求 3.3**：显示项目亮点
- **需求 3.6**：点击展开案例详情

## 使用方法

### 基本用法

```tsx
import { CasesSection } from './components/CasesSection';
import type { CaseStudy } from './types';

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
];

function App() {
  return <CasesSection cases={cases} />;
}
```

## Props

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| cases | CaseStudy[] | 是 | 案例列表数组 |

## CaseStudy 类型

```typescript
interface CaseStudy {
  id: string;              // 唯一标识
  title: string;           // 案例标题
  description: string;     // 案例描述
  deliveryTime: string;    // 交付周期（如 "7天"）
  highlights: string[];    // 项目亮点列表
  image?: string;          // 可选的案例图片（未来扩展）
}
```

## 交互行为

### 展开/收起详情

- **初始状态**：所有案例卡片都处于收起状态，只显示标题、交付周期和简短描述
- **点击展开**：点击案例卡片，展开显示项目亮点列表
- **点击收起**：再次点击已展开的案例卡片，收起详情
- **单一展开**：展开一个案例时，会自动收起其他已展开的案例

### 视觉反馈

- **悬停效果**：鼠标悬停时，卡片阴影加深
- **展开指示器**：右上角的箭头图标会旋转 180 度
- **提示文本**：底部显示"点击查看详情"或"点击收起详情"

## 样式定制

组件使用 Tailwind CSS 构建，可以通过以下方式定制样式：

### 修改颜色主题

```tsx
// 在 CasesSection.tsx 中修改颜色类
<span className="text-green-600">  {/* 交付周期颜色 */}
<svg className="text-blue-600">    {/* 图标颜色 */}
```

### 修改布局

```tsx
// 修改网格列数
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### 修改间距

```tsx
// 修改区块内边距
<section className="py-16 px-4">  {/* 垂直 16，水平 4 */}
```

## 响应式设计

### 断点

- **移动端** (< 768px)：1 列布局
- **桌面端** (≥ 768px)：2 列布局

### 字体大小

- **标题**：移动端 3xl，桌面端 4xl
- **案例标题**：xl
- **正文**：base
- **辅助文本**：sm

## 动画效果

### 滚动动画

使用 Framer Motion 实现滚动进入视口时的渐显效果：

```tsx
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-50px' }}
transition={{ duration: 0.5, delay: index * 0.1 }}
```

### 展开/收起动画

```tsx
initial={{ opacity: 0, height: 0 }}
animate={{ opacity: 1, height: 'auto' }}
exit={{ opacity: 0, height: 0 }}
transition={{ duration: 0.3 }}
```

## 可访问性

- ✅ 卡片可点击，使用 `cursor-pointer` 样式
- ✅ 提供视觉反馈（悬停效果、展开指示器）
- ✅ 提供文本提示（"点击查看详情"）
- ⚠️ 建议添加键盘导航支持（未来改进）
- ⚠️ 建议添加 ARIA 标签（未来改进）

## 性能优化

- ✅ 使用 `viewport={{ once: true }}` 避免重复触发动画
- ✅ 使用 `AnimatePresence` 优化展开/收起动画
- ✅ 懒加载图片（如果使用 image 属性）

## 测试

组件包含完整的单元测试，覆盖以下场景：

- ✅ 渲染测试（标题、案例数量、内容）
- ✅ 交互测试（展开、收起、切换）
- ✅ 响应式布局测试
- ✅ 边界情况测试（空列表、单个案例、无亮点）
- ✅ 可访问性测试

运行测试：

```bash
npm run test components/CasesSection.test.tsx
```

## 依赖

- `react` - React 核心库
- `framer-motion` - 动画库
- `./Card` - 卡片组件
- `../types` - TypeScript 类型定义

## 注意事项

1. **案例数量**：建议至少提供 2 个案例（符合需求 3.1）
2. **交付周期格式**：建议使用"X天"格式，如"7天"、"15天"
3. **亮点数量**：建议每个案例提供 2-5 个亮点
4. **描述长度**：描述应简洁明了，建议 20-50 字
5. **图片支持**：当前版本暂未实现图片显示，可在未来版本中添加

## 未来改进

- [ ] 添加图片展示功能
- [ ] 添加键盘导航支持（Tab、Enter、Escape）
- [ ] 添加 ARIA 标签提升可访问性
- [ ] 支持外部链接（查看完整案例）
- [ ] 支持案例分类筛选
- [ ] 支持案例搜索功能

## 相关组件

- `Card` - 卡片容器组件
- `SolutionsSection` - 解决方案区块组件
- `HeroSection` - 首屏区块组件

## 版本历史

- **v1.0.0** (2024-02-16)
  - 初始版本
  - 实现基本的案例展示和展开/收起功能
  - 响应式布局
  - 滚动动画效果
