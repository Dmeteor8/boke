/**
 * 企业服务展示网站 - 核心类型定义
 * 
 * 此文件包含网站所有核心数据模型的 TypeScript 接口定义
 */

// 导出验证相关类型和函数
export * from './validation';
// 导出实用类型
export * from './utils';

// ============================================================================
// 联系信息类型
// ============================================================================

/**
 * 联系信息
 * 需求：1.5, 7.5
 */
export interface ContactInfo {
  phone: string;
  email: string;
}

/**
 * 联系表单数据
 * 需求：7.1-7.4
 */
export interface ContactFormData {
  name: string;
  contact: string;
  requirement: string;
  company?: string;
}

// ============================================================================
// 内容区块类型
// ============================================================================

/**
 * CTA 按钮配置
 * 需求：1.4
 */
export interface CTAButton {
  text: string;
  variant: 'primary' | 'secondary';
  action: () => void;
}

/**
 * Hero 区块内容
 * 需求：1.1-1.6
 */
export interface HeroContent {
  title: string;
  subtitle: string;
  targetAudience: string[];
  contactInfo: ContactInfo;
}

/**
 * 解决方案配对
 * 需求：2.1-2.4
 */
export interface Solution {
  id: string;
  problem: string;
  solution: string;
  icon?: string;
}

/**
 * 项目案例
 * 需求：3.1-3.6
 */
export interface CaseStudy {
  id: string;
  title: string;
  description: string;
  deliveryTime: string;
  highlights: string[];
  image?: string;
}

/**
 * 合作流程步骤
 * 需求：4.1-4.5
 */
export interface ProcessStep {
  id: string;
  order: number;
  title: string;
  description: string;
}

/**
 * 服务承诺
 * 需求：5.1-5.6
 */
export interface Commitment {
  id: string;
  text: string;
  icon?: string;
}

/**
 * 价格服务
 * 需求：6.1-6.5
 */
export interface PricingService {
  id: string;
  name: string;
  startingPrice: number;
  features: string[];
}

/**
 * 底部链接
 */
export interface FooterLink {
  text: string;
  url: string;
}

/**
 * 底部内容
 * 需求：7.5-7.6
 */
export interface FooterContent {
  contactInfo: ContactInfo;
  copyright: string;
  links?: FooterLink[];
}

// ============================================================================
// 网站整体内容
// ============================================================================

/**
 * 网站完整内容数据模型
 */
export interface WebsiteContent {
  hero: HeroContent;
  solutions: Solution[];
  cases: CaseStudy[];
  process: ProcessStep[];
  commitments: Commitment[];
  pricing: PricingService[];
  footer: FooterContent;
}

// ============================================================================
// SEO 和元数据类型
// ============================================================================

/**
 * 结构化数据 - 联系点
 * 需求：10.6
 */
export interface StructuredDataContactPoint {
  '@type': 'ContactPoint';
  telephone: string;
  email: string;
  contactType: string;
}

/**
 * 结构化数据
 * 需求：10.6
 */
export interface StructuredData {
  '@context': 'https://schema.org';
  '@type': 'Organization' | 'Service';
  name: string;
  description: string;
  url: string;
  contactPoint: StructuredDataContactPoint;
}

/**
 * SEO 元数据
 * 需求：10.1-10.2, 10.6
 */
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl: string;
  structuredData: StructuredData;
}

// ============================================================================
// 表单状态类型
// ============================================================================

/**
 * 表单状态
 * 需求：7.2-7.4
 */
export interface FormState {
  data: ContactFormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError?: string;
}

// ============================================================================
// 响应式布局类型
// ============================================================================

/**
 * 视口类型
 * 需求：8.1-8.3
 */
export type Viewport = 'mobile' | 'tablet' | 'desktop';

/**
 * 断点配置
 * 需求：8.1-8.3
 */
export interface Breakpoints {
  mobile: number;    // < 768px
  tablet: number;    // 768px - 1024px
  desktop: number;   // > 1024px
}

/**
 * 布局上下文
 * 需求：8.1-8.3
 */
export interface LayoutContext {
  viewport: Viewport;
  width: number;
  height: number;
}

// ============================================================================
// 组件 Props 类型
// ============================================================================

/**
 * HeroSection 组件 Props
 * 需求：1.1-1.6
 */
export interface HeroSectionProps {
  title: string;
  subtitle: string;
  targetAudience: string[];
  contactInfo: ContactInfo;
  ctaButtons: CTAButton[];
}

/**
 * SolutionsSection 组件 Props
 * 需求：2.1-2.4
 */
export interface SolutionsSectionProps {
  solutions: Solution[];
}

/**
 * CasesSection 组件 Props
 * 需求：3.1-3.6
 */
export interface CasesSectionProps {
  cases: CaseStudy[];
}

/**
 * ProcessSection 组件 Props
 * 需求：4.1-4.5
 */
export interface ProcessSectionProps {
  steps: ProcessStep[];
}

/**
 * CommitmentSection 组件 Props
 * 需求：5.1-5.6
 */
export interface CommitmentSectionProps {
  commitments: Commitment[];
  highlight: string;
}

/**
 * PricingSection 组件 Props
 * 需求：6.1-6.5
 */
export interface PricingSectionProps {
  services: PricingService[];
}

/**
 * ContactForm 组件 Props
 * 需求：7.1-7.4
 */
export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * ResponsiveLayout 组件 Props
 * 需求：8.1-8.3
 */
export interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

/**
 * Footer 组件 Props
 * 需求：7.5-7.6
 */
export interface FooterProps {
  contactInfo: ContactInfo;
  copyright: string;
  onContactClick: () => void;
}

// ============================================================================
// 共享组件 Props 类型
// ============================================================================

/**
 * Button 组件 Props
 * 需求：1.4, 8.5, 12.1
 */
export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

/**
 * Card 组件 Props
 * 需求：2.1-2.4, 3.1-3.6
 */
export interface CardProps {
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  onClick?: () => void;
  className?: string;
}

/**
 * Input 组件 Props
 * 需求：7.2-7.4, 8.6, 12.3
 */
export interface InputProps {
  type: 'text' | 'email' | 'tel' | 'textarea';
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  id?: string;
  name?: string;
  className?: string;
}

// ============================================================================
// API 类型
// ============================================================================

/**
 * 联系表单 API 请求
 * 需求：7.3
 */
export interface ContactAPIRequest {
  name: string;
  contact: string;
  requirement: string;
  company?: string;
  timestamp: string;
}

/**
 * 联系表单 API 响应
 * 需求：7.3
 */
export interface ContactAPIResponse {
  success: boolean;
  message: string;
  error?: string;
}
