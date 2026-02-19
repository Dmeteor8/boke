# ContactForm 组件安装说明

## 依赖安装

ContactForm 组件需要以下依赖包才能正常工作：

```bash
npm install @hookform/resolvers
```

或者如果你还没有安装其他依赖：

```bash
npm install
```

## 已添加的依赖

在 `package.json` 中已经添加了以下依赖：

```json
{
  "dependencies": {
    "react-hook-form": "^7.51.0",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.0"
  }
}
```

## 验证安装

安装完成后，可以通过以下命令验证：

```bash
npm list @hookform/resolvers
```

应该看到类似输出：
```
enterprise-service-website@0.1.0
└── @hookform/resolvers@3.3.4
```

## 使用组件

安装完成后，就可以导入和使用 ContactForm 组件了：

```tsx
import { ContactForm } from './components/ContactForm';
// 或
import { ContactForm } from './components';
```

详细使用方法请参考 `ContactForm.README.md` 和 `ContactForm.example.tsx`。
