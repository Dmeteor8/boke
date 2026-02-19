# ResponsiveLayout 组件

响应式布局组件，提供视口尺寸检测和布局上下文。

## 功能

- 检测视口尺寸变化
- 根据断点提供设备类型（mobile/tablet/desktop）
- 通过 Context 向子组件提供布局信息
- 支持服务端渲染（SSR）

## 断点定义

- **mobile**: < 768px
- **tablet**: 768px - 1024px
- **desktop**: > 1024px

## 使用方法

### 基础用法

```tsx
import { ResponsiveLayout, useViewport } from '@/components';

function App() {
  return (
    <ResponsiveLayout>
      <YourContent />
    </ResponsiveLayout>
  );
}

function YourContent() {
  const { viewport, width, height } = useViewport();
  
  return (
    <div>
      <p>当前设备: {viewport}</p>
      <p>视口宽度: {width}px</p>
      <p>视口高度: {height}px</p>
    </div>
  );
}
```

### 条件渲染

```tsx
function MyComponent() {
  const { viewport } = useViewport();
  
  if (viewport === 'mobile') {
    return <MobileView />;
  }
  
  if (viewport === 'tablet') {
    return <TabletView />;
  }
  
  return <DesktopView />;
}
```

### 响应式样式

```tsx
function MyComponent() {
  const { viewport } = useViewport();
  
  return (
    <div className={`
      ${viewport === 'mobile' ? 'flex-col' : 'flex-row'}
      ${viewport === 'desktop' ? 'max-w-7xl' : 'max-w-full'}
    `}>
      {/* 内容 */}
    </div>
  );
}
```

## API

### ResponsiveLayout

包裹应用的根组件，提供布局上下文。

**Props:**
- `children: React.ReactNode` - 子组件

### useViewport

获取当前视口信息的 Hook。

**返回值:**
```typescript
{
  viewport: 'mobile' | 'tablet' | 'desktop';
  width: number;
  height: number;
}
```

**注意:** 必须在 `ResponsiveLayout` 组件内使用，否则会抛出错误。

## 验证需求

- **需求 8.1**: 宽度 < 768px 应用移动端布局
- **需求 8.2**: 宽度 768px-1024px 应用平板端布局
- **需求 8.3**: 宽度 > 1024px 应用桌面端布局

## 实现细节

- 使用 React Context API 提供全局布局状态
- 监听 `window.resize` 事件实时更新视口信息
- 支持服务端渲染，初始化时使用默认桌面端配置
- 组件挂载后立即更新为实际视口尺寸
- 组件卸载时自动清理事件监听器

## 性能考虑

- resize 事件直接更新状态，对于高频更新场景可考虑添加防抖
- Context 值变化会导致所有消费者重新渲染
- 建议在需要响应式行为的组件中使用，避免不必要的重渲染
