# HeroSection 组件

## 概述

HeroSection 是网站的首屏展示组件，用于向访问者展示核心服务定位、联系信息和行动号召按钮。

## 功能特性

- ✅ 显示主标题和副标题
- ✅ 显示目标客户标签（中小企业、制造业等）
- ✅ 显示联系信息（电话、邮箱）
- ✅ 两个 CTA 按钮："预约沟通"和"查看案例"
- ✅ 响应式布局（移动端垂直堆叠，桌面端水平布局）
- ✅ 电话使用 `tel:` 协议，邮箱使用 `mailto:` 协议
- ✅ 完整的键盘导航支持
- ✅ 语义化 HTML 结构

## 验证需求

- **需求 1.1**: 显示主标题
- **需求 1.2**: 显示副标题
- **需求 1.3**: 显示目标客户标签
- **需求 1.4**: 包含两个 CTA 按钮
- **需求 1.5**: 显眼展示联系电话和邮箱
- **需求 7.7**: 电话号码使用 `tel:` 协议
- **需求 7.8**: 邮箱使用 `mailto:` 协议

## 使用示例

```tsx
import { HeroSection } from '@/components';

function HomePage() {
  const handleBooking = () => {
    // 显示联系表单或滚动到表单区域
    console.log('预约沟通');
  };

  const handleViewCases = () => {
    // 滚动到案例区块
    console.log('查看案例');
  };

  return (
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
          action: handleBooking,
        },
        {
          text: '查看案例',
          variant: 'secondary',
          action: handleViewCases,
        },
      ]}
    />
  );
}
```

## Props

### HeroSectionProps

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `title` | `string` | ✅ | 主标题文本 |
| `subtitle` | `string` | ✅ | 副标题文本 |
| `targetAudience` | `string[]` | ✅ | 目标客户标签数组 |
| `contactInfo` | `ContactInfo` | ✅ | 联系信息对象 |
| `ctaButtons` | `CTAButton[]` | ✅ | CTA 按钮配置数组 |

### ContactInfo

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `phone` | `string` | ✅ | 联系电话 |
| `email` | `string` | ✅ | 联系邮箱 |

### CTAButton

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `text` | `string` | ✅ | 按钮文本 |
| `variant` | `'primary' \| 'secondary'` | ✅ | 按钮样式变体 |
| `action` | `() => void` | ✅ | 点击回调函数 |

## 响应式设计

### 移动端 (< 768px)
- 垂直堆叠布局
- 内容区和联系信息区上下排列
- CTA 按钮垂直堆叠或小屏幕水平排列
- 字体大小适配移动端

### 平板端 (768px - 1024px)
- 开始使用水平布局
- 内容区和联系信息区左右排列
- 适中的间距和字体大小

### 桌面端 (> 1024px)
- 完整的水平布局
- 最大宽度限制（max-w-7xl）
- 更大的字体和间距
- 联系信息卡片固定宽度

## 可访问性

- ✅ 使用语义化 HTML（h1, h2, section）
- ✅ 电话和邮箱链接可通过键盘访问
- ✅ CTA 按钮支持键盘导航
- ✅ 图标使用 `aria-hidden="true"` 隐藏
- ✅ 清晰的焦点指示器
- ✅ 足够的颜色对比度

## 测试

组件包含完整的单元测试套件（`HeroSection.test.tsx`），覆盖：

- ✅ 内容渲染（标题、副标题、标签）
- ✅ 联系信息显示和链接协议
- ✅ CTA 按钮渲染和点击事件
- ✅ 响应式布局
- ✅ 可访问性
- ✅ 边界情况处理

运行测试：

```bash
npm test -- HeroSection.test.tsx
```

## 样式定制

组件使用 Tailwind CSS 实用类，可以通过以下方式定制：

1. **修改 Tailwind 配置**：在 `tailwind.config.ts` 中自定义颜色、间距等
2. **覆盖样式**：通过 CSS 模块或全局样式覆盖特定类
3. **修改组件**：直接编辑组件源码调整布局和样式

## 依赖

- React 18+
- Next.js 14+
- Tailwind CSS 3+
- Button 组件
- ResponsiveLayout 组件和 useViewport hook

## 注意事项

1. **必须在 ResponsiveLayout 中使用**：组件依赖 `useViewport` hook，必须在 `ResponsiveLayout` 组件内部使用
2. **CTA 按钮回调**：确保提供有效的回调函数，避免点击无响应
3. **联系信息格式**：电话号码应为纯数字或包含国际区号，邮箱应为有效格式
4. **目标客户标签**：建议 3-5 个标签，避免过多导致布局拥挤

## 未来改进

- [ ] 添加背景图片或视频支持
- [ ] 添加滚动动画效果（Framer Motion）
- [ ] 支持自定义图标
- [ ] 支持更多 CTA 按钮样式
- [ ] 添加社交媒体链接

## 相关组件

- [Button](./Button.README.md) - 按钮组件
- [ResponsiveLayout](./ResponsiveLayout.README.md) - 响应式布局组件

## 版本历史

- **v1.0.0** (2024-02-16): 初始版本
  - 实现基础功能
  - 完整的单元测试
  - 响应式布局支持
