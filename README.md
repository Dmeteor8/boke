# 企业服务展示网站

专注为中小企业提供专业的网站定制、后台管理系统开发和自动化解决方案。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **表单**: React Hook Form + Zod
- **动画**: Framer Motion
- **测试**: Vitest + React Testing Library

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

复制 `.env.example` 为 `.env.local` 并填入实际值：

```bash
cp .env.example .env.local
```

必需配置：
- `NEXT_PUBLIC_SITE_URL`: 网站 URL
- 邮件服务配置（Resend 或 SMTP）

### 3. 运行开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 4. 构建生产版本

```bash
npm run build
npm run start
```

## 项目结构

```
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 主页
│   └── globals.css        # 全局样式
├── components/            # React 组件
│   ├── HeroSection.tsx
│   ├── SolutionsSection.tsx
│   ├── CasesSection.tsx
│   └── ...
├── lib/                   # 工具函数和配置
│   ├── content.ts         # 网站内容数据
│   ├── env.ts             # 环境变量配置
│   └── structured-data.ts # SEO 结构化数据
├── types/                 # TypeScript 类型定义
│   ├── index.ts
│   ├── validation.ts
│   └── utils.ts
└── public/                # 静态资源

```

## 功能特性

### 核心功能
- ✅ 响应式设计（移动端/平板/桌面）
- ✅ 首屏专业定位展示
- ✅ 问题解决方案展示
- ✅ 项目案例展示
- ✅ 合作流程说明
- ✅ 服务承诺展示
- ✅ 价格区间展示
- ✅ 联系表单（带验证）
- ✅ 平滑滚动导航

### SEO 优化
- ✅ 元数据配置（title, description, keywords）
- ✅ Open Graph 标签
- ✅ Twitter Card 标签
- ✅ 结构化数据（Schema.org）
- ✅ Sitemap 生成
- ✅ Robots.txt 配置

### 性能优化
- ✅ 代码分割和懒加载
- ✅ 图片优化（WebP, 懒加载）
- ✅ 字体优化
- ✅ 缓存策略
- ✅ 压缩和最小化

### 可访问性
- ✅ 键盘导航支持
- ✅ ARIA 标签
- ✅ 焦点管理
- ✅ 移动端触摸区域优化
- ✅ 表单标签关联

## 邮件服务配置

### 选项 1: Resend (推荐)

1. 注册 [Resend](https://resend.com) 账号
2. 获取 API Key
3. 配置环境变量：

```env
RESEND_API_KEY=your_api_key
RESEND_FROM_EMAIL=contact@yourdomain.com
```

### 选项 2: SMTP

配置 SMTP 服务器信息：

```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_password
SMTP_FROM=contact@yourdomain.com
```

## 部署

### Vercel (推荐)

1. 推送代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 配置环境变量
4. 部署

### 宝塔面板

参考 [宝塔部署指南.md](./宝塔部署指南.md)

## 测试

```bash
# 运行所有测试
npm run test

# 运行测试并生成覆盖率报告
npm run test:coverage

# 监听模式
npm run test:watch
```

## 开发指南

### 添加新内容

编辑 `lib/content.ts` 文件修改网站内容。

### 修改样式

- 全局样式：`app/globals.css`
- Tailwind 配置：`tailwind.config.ts`
- 组件样式：使用 Tailwind 类名

### 添加新组件

1. 在 `components/` 目录创建组件文件
2. 在 `types/index.ts` 添加类型定义
3. 在页面中导入使用

## 联系方式

- 电话：13151488988
- 邮箱：mvpm@vip.qq.com

## 许可证

© 2024 企业服务定制. 保留所有权利。
