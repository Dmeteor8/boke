# Button 组件实现文档

## 概述

Button 组件是一个完全可访问、响应式的按钮组件，满足企业服务展示网站的所有需求。

## 功能特性

### 1. 三种变体 (Variants)

- **primary**: 主要操作按钮（蓝色背景）
- **secondary**: 次要操作按钮（灰色背景）
- **outline**: 轮廓按钮（透明背景，蓝色边框）

### 2. 三种尺寸 (Sizes)

- **sm**: 小尺寸（text-sm, px-4, py-2.5）
- **md**: 中等尺寸（text-base, px-6, py-3）
- **lg**: 大尺寸（text-lg, px-8, py-3.5）

### 3. 移动端触摸区域 (需求 8.5)

所有尺寸的按钮都确保最小触摸区域为 44x44px，通过以下 Tailwind 类实现：
- `min-h-[44px]`: 最小高度 44px
- `min-w-[44px]`: 最小宽度 44px

这符合 WCAG 2.1 的触摸目标尺寸指南。

### 4. 键盘导航支持 (需求 12.1)

- 所有按钮默认可通过 Tab 键聚焦（`tabIndex={0}`）
- 禁用的按钮不可聚焦（`tabIndex={-1}`）
- 清晰的焦点指示器：
  - `focus:outline-none`: 移除默认轮廓
  - `focus:ring-2`: 2px 焦点环
  - `focus:ring-offset-2`: 2px 偏移量
  - `focus:ring-{color}-500`: 颜色匹配变体

### 5. 禁用状态

- `disabled` 属性控制禁用状态
- 禁用样式：
  - `disabled:opacity-50`: 50% 不透明度
  - `disabled:cursor-not-allowed`: 禁止光标
- 禁用时不触发 onClick 事件

### 6. 过渡动画

- `transition-all duration-200`: 所有属性 200ms 过渡
- 平滑的悬停、聚焦和激活状态变化

## 使用示例

### 基本使用

\`\`\`tsx
import { Button } from '@/components';

// Primary 按钮
<Button variant="primary" size="md" onClick={() => console.log('Clicked')}>
  预约沟通
</Button>

// Secondary 按钮
<Button variant="secondary" size="md">
  查看案例
</Button>

// Outline 按钮
<Button variant="outline" size="sm">
  了解更多
</Button>
\`\`\`

### 表单提交

\`\`\`tsx
<Button 
  variant="primary" 
  size="lg" 
  type="submit"
  disabled={isSubmitting}
>
  {isSubmitting ? '提交中...' : '提交'}
</Button>
\`\`\`

### 自定义样式

\`\`\`tsx
<Button 
  variant="primary" 
  size="md"
  className="w-full md:w-auto"
>
  响应式宽度按钮
</Button>
\`\`\`

## 测试覆盖

### 单元测试

Button.test.tsx 包含以下测试用例：

1. **基本渲染**
   - 渲染按钮文本
   - 应用正确的 type 属性
   - 默认 type 为 button

2. **变体样式**
   - Primary 变体样式
   - Secondary 变体样式
   - Outline 变体样式

3. **尺寸样式**
   - Small 尺寸样式
   - Medium 尺寸样式
   - Large 尺寸样式

4. **移动端触摸区域** (需求 8.5)
   - 所有尺寸最小 44px 高度
   - 所有尺寸最小 44px 宽度

5. **键盘导航** (需求 12.1)
   - 可通过键盘聚焦
   - 禁用按钮不可聚焦
   - 焦点样式类存在

6. **交互行为**
   - 点击调用 onClick
   - 禁用时不调用 onClick
   - 禁用样式正确应用

7. **自定义样式**
   - 接受自定义 className
   - 不覆盖基础样式

### 运行测试

\`\`\`bash
# 安装依赖
npm install

# 运行所有测试
npm test

# 监听模式
npm run test:watch

# 生成覆盖率报告
npm run test:coverage
\`\`\`

## 可访问性 (A11y)

### WCAG 2.1 合规性

- ✅ **2.1.1 键盘**: 所有功能可通过键盘访问
- ✅ **2.5.5 目标尺寸**: 最小 44x44px 触摸目标
- ✅ **2.4.7 焦点可见**: 清晰的焦点指示器
- ✅ **4.1.2 名称、角色、值**: 正确的语义 HTML

### 屏幕阅读器支持

- 使用原生 `<button>` 元素，自动提供正确的角色和状态
- 按钮文本作为可访问名称
- 禁用状态自动传达给辅助技术

## 技术实现细节

### 样式系统

使用 Tailwind CSS 实用类构建样式：

1. **基础样式数组**: 所有按钮共享的样式
2. **变体样式映射**: 根据 variant prop 选择
3. **尺寸样式映射**: 根据 size prop 选择
4. **样式合并**: 使用数组 join 合并所有样式类

### TypeScript 类型安全

- 使用 `ButtonProps` 接口定义所有 props
- 严格的 variant 和 size 类型（字面量联合类型）
- 完整的 TypeScript 类型推断

### 性能优化

- 样式类在渲染时动态合并，无运行时 CSS-in-JS 开销
- Tailwind CSS 按需生成，生产构建中未使用的样式会被移除
- 使用 React.FC 类型，支持 React 优化

## 需求追溯

- **需求 1.4**: CTA 按钮支持（primary 和 secondary 变体）
- **需求 8.5**: 移动端最小触摸区域 44x44px
- **需求 12.1**: 键盘导航和焦点样式

## 下一步

Button 组件已完成实现和测试。接下来的任务：

1. **任务 3.2**: 为 Button 组件编写属性测试（使用 fast-check）
2. **任务 3.3**: 实现 Input 组件
3. **任务 3.4**: 为 Input 组件编写属性测试
4. **任务 3.5**: 实现 Card 组件

## 注意事项

- 确保项目中已安装 Tailwind CSS 并正确配置
- 自定义 className 会追加到基础样式，不会覆盖
- 在生产环境中，建议使用 PurgeCSS 或 Tailwind 的内置清理功能优化 CSS 大小
