# Input 组件

可复用的输入组件，支持多种输入类型和完整的表单验证功能。

## 需求追溯

- **需求 7.2-7.4**: 表单验证和错误显示
- **需求 8.6**: 移动端字体至少 16px
- **需求 12.3**: 表单标签关联

## 特性

- ✅ 支持 `text`, `email`, `tel`, `textarea` 四种输入类型
- ✅ 使用 `htmlFor` 关联 label 标签（可访问性）
- ✅ 显示验证错误信息
- ✅ 移动端字体至少 16px（防止 iOS 自动缩放）
- ✅ 完整的 ARIA 属性支持
- ✅ 必填字段标识
- ✅ 响应式设计

## 使用示例

### 基础文本输入

```tsx
import { Input } from '@/components';

function MyForm() {
  const [name, setName] = useState('');

  return (
    <Input
      type="text"
      label="姓名"
      value={name}
      onChange={setName}
      required
    />
  );
}
```

### 邮箱输入

```tsx
<Input
  type="email"
  label="邮箱地址"
  value={email}
  onChange={setEmail}
  placeholder="example@email.com"
  required
/>
```

### 电话输入

```tsx
<Input
  type="tel"
  label="联系电话"
  value={phone}
  onChange={setPhone}
  placeholder="13800138000"
  required
/>
```

### 多行文本输入

```tsx
<Input
  type="textarea"
  label="需求描述"
  value={description}
  onChange={setDescription}
  placeholder="请详细描述您的需求..."
  required
/>
```

### 带错误提示

```tsx
<Input
  type="text"
  label="姓名"
  value={name}
  onChange={setName}
  error="姓名至少需要 2 个字符"
  required
/>
```

### 自定义 ID 和 Name

```tsx
<Input
  type="text"
  label="用户名"
  value={username}
  onChange={setUsername}
  id="username-field"
  name="username"
/>
```

## Props

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `type` | `'text' \| 'email' \| 'tel' \| 'textarea'` | ✅ | - | 输入类型 |
| `label` | `string` | ✅ | - | 标签文本 |
| `value` | `string` | ✅ | - | 输入值 |
| `onChange` | `(value: string) => void` | ✅ | - | 值变化回调 |
| `error` | `string` | ❌ | - | 错误信息 |
| `required` | `boolean` | ❌ | `false` | 是否必填 |
| `placeholder` | `string` | ❌ | - | 占位符文本 |
| `id` | `string` | ❌ | 自动生成 | 输入框 ID |
| `name` | `string` | ❌ | - | 输入框 name 属性 |
| `className` | `string` | ❌ | `''` | 自定义样式类 |

## 可访问性特性

### Label 关联

组件使用 `htmlFor` 属性将 label 与 input 关联，确保：
- 点击 label 可以聚焦输入框
- 屏幕阅读器可以正确读取标签

```tsx
<label htmlFor="name-input">姓名</label>
<input id="name-input" />
```

### ARIA 属性

- `aria-invalid`: 标识输入是否有错误
- `aria-describedby`: 关联错误信息
- `role="alert"`: 错误信息使用 alert 角色

### 必填字段标识

必填字段会显示红色星号，并带有 `aria-label="必填"` 属性。

## 移动端优化

### 字体大小

使用 `text-base` (16px) 确保移动端不会自动缩放：

```css
/* 防止 iOS Safari 自动缩放 */
font-size: 16px;
```

### InputMode

为不同类型的输入设置合适的 `inputMode`：
- `email`: 显示邮箱键盘
- `tel`: 显示数字键盘
- `text`: 显示标准键盘

## 样式定制

### 错误状态

有错误时：
- 边框变为红色 (`border-red-500`)
- 焦点环变为红色 (`focus:ring-red-500`)
- 显示错误图标和消息

无错误时：
- 边框为灰色 (`border-gray-300`)
- 焦点环为蓝色 (`focus:ring-blue-500`)
- 悬停时边框变深 (`hover:border-gray-400`)

### Textarea 特性

- 默认 4 行高度
- 支持垂直调整大小 (`resize: vertical`)
- 保持与其他输入框一致的样式

## 与表单验证集成

配合 `types/validation.ts` 中的验证函数使用：

```tsx
import { Input } from '@/components';
import { validateField } from '@/types/validation';

function ContactForm() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<string>();

  const handleNameChange = (value: string) => {
    setName(value);
    // 实时验证
    const error = validateField('name', value);
    setNameError(error);
  };

  return (
    <Input
      type="text"
      label="姓名"
      value={name}
      onChange={handleNameChange}
      error={nameError}
      required
    />
  );
}
```

## 测试

组件包含完整的单元测试，覆盖：
- ✅ 所有输入类型渲染
- ✅ Label 关联（需求 12.3）
- ✅ 必填字段标识
- ✅ 值和变化处理
- ✅ 错误显示（需求 7.4）
- ✅ 移动端字体大小（需求 8.6）
- ✅ ARIA 属性
- ✅ Textarea 特性

运行测试：

```bash
npm test Input.test.tsx
```

## 设计决策

### 为什么使用 16px 字体？

iOS Safari 会在输入框字体小于 16px 时自动缩放页面，影响用户体验。使用 16px 可以防止这种行为。

### 为什么使用 htmlFor 而不是包裹？

虽然可以用 `<label>` 包裹 `<input>`，但使用 `htmlFor` 更灵活，允许 label 和 input 分开放置，同时保持可访问性。

### 为什么错误信息使用 role="alert"？

`role="alert"` 会让屏幕阅读器立即读出错误信息，提供更好的可访问性体验。

### 为什么 textarea 只支持垂直调整？

水平调整可能破坏响应式布局，只允许垂直调整可以保持布局一致性。
