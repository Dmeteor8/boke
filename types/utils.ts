/**
 * 企业服务展示网站 - 实用类型定义
 * 
 * 提供通用的 TypeScript 实用类型
 */

// ============================================================================
// React 相关类型
// ============================================================================

/**
 * 异步函数类型
 */
export type AsyncFunction<T = void> = () => Promise<T>;

/**
 * 事件处理器类型
 */
export type EventHandler<T = void> = (event: React.SyntheticEvent) => T;

/**
 * 点击处理器类型
 */
export type ClickHandler = (event: React.MouseEvent) => void;

/**
 * 变更处理器类型
 */
export type ChangeHandler = (value: string) => void;

// ============================================================================
// 状态类型
// ============================================================================

/**
 * 加载状态
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * 异步数据状态
 */
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// ============================================================================
// 验证类型
// ============================================================================

/**
 * 验证结果
 */
export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * 字段验证器
 */
export type FieldValidator<T = string> = (value: T) => string | undefined;

// ============================================================================
// 响应式类型
// ============================================================================

/**
 * 响应式值
 * 可以为不同视口提供不同的值
 */
export interface ResponsiveValue<T> {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  default: T;
}

/**
 * 获取响应式值的辅助函数类型
 */
export type GetResponsiveValue = <T>(
  value: ResponsiveValue<T>,
  viewport: 'mobile' | 'tablet' | 'desktop'
) => T;

// ============================================================================
// 样式类型
// ============================================================================

/**
 * CSS 类名类型
 */
export type ClassName = string | undefined | null | false;

/**
 * 样式变体映射
 */
export type VariantMap<T extends string> = Record<T, string>;

// ============================================================================
// 数据获取类型
// ============================================================================

/**
 * API 响应包装
 */
export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * 分页参数
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
}

/**
 * 分页响应
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ============================================================================
// 实用函数类型
// ============================================================================

/**
 * 深度部分类型
 * 递归地将所有属性设为可选
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * 深度只读类型
 * 递归地将所有属性设为只读
 */
export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

/**
 * 提取 Promise 返回类型
 */
export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

/**
 * 非空类型
 */
export type NonNullable<T> = T extends null | undefined ? never : T;

/**
 * 必需属性
 * 将指定的可选属性变为必需
 */
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * 可选属性
 * 将指定的必需属性变为可选
 */
export type OptionalKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
