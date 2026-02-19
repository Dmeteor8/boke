# ContactForm 组件

联系表单组件，用于收集潜在客户的联系信息和需求。

## 功能特性

- ✅ 使用 React Hook Form 管理表单状态
- ✅ 使用 Zod schema 验证表单数据
- ✅ 实时验证和错误提示
- ✅ 提交按钮禁用状态管理
- ✅ 保留用户输入内容（验证失败时）
- ✅ 完整的可访问性支持（ARIA 标签、键盘导航）
- ✅ 移动端友好（字体至少 16px）
- ✅ 加载状态指示器

## Props

```typescript
interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

interface ContactFormData {
  name: string;        // 姓名（2-50字符）
  contact: string;     // 联系方式（手机号或邮箱）
  requirement: string; // 需求描述（10-500字符）
  company?: string;    // 公司名称（可选，2-100字符）
}
```

## 使用示例

```tsx
import { ContactForm } from './components/ContactForm';

function App() {
  const handleSubmit = async (data: ContactFormData) => {
    // 提交表单数据到 API
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('提交失败');
    }
  };

  const handleSuccess = () => {
    alert('提交成功！我们会尽快与您联系。');
  };

  const handleError = (error: Error) => {
    alert(`提交失败：${error.message}。请稍后重试或直接拨打电话联系我们。`);
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-bold text-center mb-8">联系我们</h2>
      <ContactForm
        onSubmit={handleSubmit}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
}
```

## 表单验证规则

### 姓名
- 必填
- 最小长度：2 个字符
- 最大长度：50 个字符

### 联系方式
- 必填
- 格式：有效的手机号（1[3-9]开头，11位数字）或邮箱地址

### 需求描述
- 必填
- 最小长度：10 个字符
- 最大长度：500 个字符

### 公司名称
- 可选
- 最小长度：2 个字符（如果填写）
- 最大长度：100 个字符

## 提交按钮状态

提交按钮在以下情况下会被禁用：
- 表单未被修改（`!isDirty`）
- 表单验证未通过（`!isValid`）
- 正在提交中（`isSubmitting`）

## 错误处理

- **实时验证**：用户输入时立即显示验证错误
- **错误提示**：每个字段下方显示具体的错误信息
- **视觉反馈**：错误字段显示红色边框和错误图标
- **可访问性**：使用 `aria-invalid` 和 `aria-describedby` 属性

## 提交流程

1. 用户填写表单
2. 实时验证每个字段
3. 点击提交按钮
4. 显示加载状态（旋转图标 + "提交中..."）
5. 调用 `onSubmit` 回调
6. 成功：清空表单，调用 `onSuccess`
7. 失败：保留表单内容，调用 `onError`

## 可访问性

- ✅ 所有字段都有关联的 `<label>` 标签
- ✅ 必填字段标记 `*` 符号
- ✅ 错误信息使用 `role="alert"` 和 `aria-describedby`
- ✅ 表单使用 `noValidate` 禁用浏览器默认验证
- ✅ 键盘导航支持（Tab 键切换字段）
- ✅ 移动端字体至少 16px（防止 iOS 自动缩放）

## 依赖项

确保项目已安装以下依赖：

```bash
npm install react-hook-form @hookform/resolvers zod
```

## 需求追溯

- **需求 7.1**：点击"预约沟通"按钮显示联系表单
- **需求 7.2**：验证必填字段（姓名、联系方式、需求描述）
- **需求 7.3**：验证通过后提交表单数据并显示成功提示
- **需求 7.4**：验证失败时显示具体错误信息并保持用户已输入内容
- **需求 8.6**：移动端字体至少 16px
- **需求 12.3**：表单输入提供清晰的标签和错误提示

## 注意事项

1. **依赖安装**：使用前需要安装 `@hookform/resolvers` 包
2. **API 集成**：需要实现 `/api/contact` 端点来处理表单提交
3. **错误处理**：建议在 `onError` 回调中提供备用联系方式
4. **成功反馈**：建议在 `onSuccess` 回调中显示友好的成功消息
5. **样式定制**：可以通过 Tailwind CSS 类名进行样式调整
