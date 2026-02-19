# 类型定义文档

本目录包含企业服务展示网站的所有 TypeScript 类型定义。

## 文件结构

```
types/
├── index.ts        # 主类型定义和统一导出
├── validation.ts   # 表单验证 Schema（Zod）
├── utils.ts        # 实用类型定义
└── README.md       # 本文档
```

## 使用方式

### 导入类型

```typescript
// 导入核心类型
import type { ContactFormData, CaseStudy, Solution } from '@/types';

// 导入验证 Schema
import { contactFormSchema, validateContactForm } from '@/types';

// 导入实用类型
import type { AsyncState, ResponsiveValue } from '@/types';
```

### 表单验证示例

```typescript
import { contactFormSchema, validateContactForm } from '@/types';

// 使用 Zod Schema 验证
const result = contactFormSchema.safeParse(formData);

// 或使用辅助函数
const { success, data, errors } = validateContactForm(formData);

if (success) {
  // 提交表单
  await submitForm(data);
} else {
  // 显示错误
  setFormErrors(errors);
}
```

### 组件 Props 示例

```typescript
import type { HeroSectionProps } from '@/types';

export function HeroSection({ title, subtitle, contactInfo }: HeroSectionProps) {
  // 组件实现
}
```

## 类型分类

### 1. 内容数据类型

- `ContactInfo` - 联系信息
- `HeroContent` - 首屏内容
- `Solution` - 解决方案
- `CaseStudy` - 项目案例
- `ProcessStep` - 合作流程步骤
- `Commitment` - 服务承诺
- `PricingService` - 价格服务
- `FooterContent` - 底部内容
- `WebsiteContent` - 完整网站内容

### 2. 表单相关类型

- `ContactFormData` - 联系表单数据
- `FormState` - 表单状态
- `contactFormSchema` - 表单验证 Schema
- `validateContactForm()` - 表单验证函数
- `validateField()` - 单字段验证函数

### 3. 组件 Props 类型

- `HeroSectionProps`
- `SolutionsSectionProps`
- `CasesSectionProps`
- `ProcessSectionProps`
- `CommitmentSectionProps`
- `PricingSectionProps`
- `ContactFormProps`
- `ButtonProps`
- `CardProps`
- `InputProps`

### 4. 响应式布局类型

- `Viewport` - 视口类型（mobile | tablet | desktop）
- `Breakpoints` - 断点配置
- `LayoutContext` - 布局上下文
- `ResponsiveValue<T>` - 响应式值

### 5. SEO 类型

- `SEOMetadata` - SEO 元数据
- `StructuredData` - 结构化数据（Schema.org）
- `StructuredDataContactPoint` - 联系点结构化数据

### 6. API 类型

- `ContactAPIRequest` - 联系表单 API 请求
- `ContactAPIResponse` - 联系表单 API 响应
- `APIResponse<T>` - 通用 API 响应包装

### 7. 实用类型

- `AsyncState<T>` - 异步数据状态
- `LoadingState` - 加载状态
- `ValidationResult` - 验证结果
- `DeepPartial<T>` - 深度部分类型
- `DeepReadonly<T>` - 深度只读类型

## 验证规则

### 联系表单验证规则

| 字段 | 必填 | 最小长度 | 最大长度 | 格式要求 |
|------|------|----------|----------|----------|
| name | 是 | 2 | 50 | - |
| contact | 是 | - | - | 手机号或邮箱 |
| requirement | 是 | 10 | 500 | - |
| company | 否 | 2 | 100 | - |

### 联系方式格式

- **手机号**：1[3-9]开头，共11位数字
- **邮箱**：标准邮箱格式（user@domain.com）

## 需求追溯

所有类型定义都标注了对应的需求编号，确保实现覆盖以下需求：

- **需求 1.1-1.6**：首屏专业定位展示
- **需求 2.1-2.4**：问题解决方案展示
- **需求 3.1-3.6**：项目案例展示
- **需求 4.1-4.5**：合作流程展示
- **需求 5.1-5.6**：服务承诺展示
- **需求 6.1-6.5**：价格区间展示
- **需求 7.1-7.8**：联系与转化功能
- **需求 8.1-8.6**：响应式布局
- **需求 10.1-10.7**：搜索引擎优化
- **需求 12.1-12.5**：可访问性

## 最佳实践

1. **使用类型导入**：使用 `import type` 导入类型，避免运行时开销
2. **严格模式**：项目启用 TypeScript 严格模式，确保类型安全
3. **验证优先**：使用 Zod Schema 进行运行时验证，确保数据安全
4. **类型推导**：尽可能使用 `z.infer` 从 Schema 推导类型，保持单一数据源
5. **文档注释**：所有类型都包含 JSDoc 注释，提供智能提示

## 扩展指南

如需添加新类型：

1. 在 `index.ts` 中定义接口
2. 添加 JSDoc 注释和需求追溯
3. 如涉及表单验证，在 `validation.ts` 中添加 Schema
4. 更新本 README 文档

## 相关文档

- [需求文档](../.kiro/specs/enterprise-service-website/requirements.md)
- [设计文档](../.kiro/specs/enterprise-service-website/design.md)
- [任务列表](../.kiro/specs/enterprise-service-website/tasks.md)
