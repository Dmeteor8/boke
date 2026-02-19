/**
 * 组件导出文件
 * 
 * 统一导出所有共享组件
 */

export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';
export { ResponsiveLayout, useViewport } from './ResponsiveLayout';
export { HeroSection } from './HeroSection';
export { SolutionsSection } from './SolutionsSection';
export { CasesSection } from './CasesSection';
export { ProcessSection } from './ProcessSection';
export { CommitmentSection } from './CommitmentSection';
export { PricingSection } from './PricingSection';
export { ContactForm } from './ContactForm';
export { Footer } from './Footer';
export { OptimizedImage } from './OptimizedImage';

export type {
  ButtonProps,
  InputProps,
  CardProps,
  HeroSectionProps,
  SolutionsSectionProps,
  CasesSectionProps,
  ProcessSectionProps,
  CommitmentSectionProps,
  PricingSectionProps,
  ContactFormProps,
  FooterProps,
} from '../types';

export type { ResponsiveLayoutProps, LayoutContext, Viewport, Breakpoints } from './ResponsiveLayout';

