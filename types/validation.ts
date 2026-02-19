/**
 * 企业服务展示网站 - 表单验证 Schema
 * 
 * 使用 Zod 定义表单验证规则
 * 需求：7.2-7.4
 */

import { z } from 'zod';

// ============================================================================
// 联系表单验证 Schema
// ============================================================================

/**
 * 手机号正则表达式
 * 匹配中国大陆手机号：1[3-9]开头，共11位数字
 */
const PHONE_REGEX = /^1[3-9]\d{9}$/;

/**
 * 邮箱正则表达式
 * 基本邮箱格式验证
 */
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

/**
 * 联系方式验证（手机号或邮箱）
 */
const contactValidator = z.string().refine(
  (value) => PHONE_REGEX.test(value) || EMAIL_REGEX.test(value),
  {
    message: '请输入有效的手机号或邮箱地址',
  }
);

/**
 * 联系表单数据验证 Schema
 * 
 * 验证规则：
 * - 姓名：必填，2-50 字符
 * - 联系方式：必填，有效的手机号或邮箱
 * - 需求描述：必填，10-500 字符
 * - 公司：可选，2-100 字符
 * 
 * 需求：7.2
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, '姓名至少需要 2 个字符')
    .max(50, '姓名不能超过 50 个字符')
    .trim(),
  
  contact: contactValidator,
  
  requirement: z
    .string()
    .min(10, '需求描述至少需要 10 个字符')
    .max(500, '需求描述不能超过 500 个字符')
    .trim(),
  
  company: z
    .string()
    .min(2, '公司名称至少需要 2 个字符')
    .max(100, '公司名称不能超过 100 个字符')
    .trim()
    .optional()
    .or(z.literal('')),
});

/**
 * 联系表单数据类型（从 Schema 推导）
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;

// ============================================================================
// API 请求验证 Schema
// ============================================================================

/**
 * 联系表单 API 请求验证 Schema
 * 
 * 在服务端验证请求数据
 * 需求：7.3
 */
export const contactAPIRequestSchema = contactFormSchema.extend({
  timestamp: z.string().datetime(),
});

/**
 * 联系表单 API 请求类型（从 Schema 推导）
 */
export type ContactAPIRequest = z.infer<typeof contactAPIRequestSchema>;

// ============================================================================
// 验证辅助函数
// ============================================================================

/**
 * 验证联系表单数据
 * 
 * @param data - 待验证的表单数据
 * @returns 验证结果，包含是否成功和错误信息
 */
export function validateContactForm(data: unknown): {
  success: boolean;
  data?: ContactFormData;
  errors?: Record<string, string>;
} {
  const result = contactFormSchema.safeParse(data);
  
  if (result.success) {
    return {
      success: true,
      data: result.data,
    };
  }
  
  // 将 Zod 错误转换为字段错误映射
  const errors: Record<string, string> = {};
  result.error.errors.forEach((error) => {
    const field = error.path[0] as string;
    if (field && !errors[field]) {
      errors[field] = error.message;
    }
  });
  
  return {
    success: false,
    errors,
  };
}

/**
 * 验证单个字段
 * 
 * @param field - 字段名
 * @param value - 字段值
 * @returns 错误信息，如果验证通过则返回 undefined
 */
export function validateField(
  field: keyof ContactFormData,
  value: unknown
): string | undefined {
  try {
    const fieldSchema = contactFormSchema.shape[field];
    fieldSchema.parse(value);
    return undefined;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0]?.message;
    }
    return '验证失败';
  }
}

// ============================================================================
// 表单验证配置常量
// ============================================================================

/**
 * 表单验证配置
 * 
 * 提供给组件使用的验证规则常量
 * 需求：7.2
 */
export const FORM_VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  contact: {
    required: true,
    pattern: PHONE_REGEX.source + '|' + EMAIL_REGEX.source,
  },
  requirement: {
    required: true,
    minLength: 10,
    maxLength: 500,
  },
  company: {
    required: false,
    minLength: 2,
    maxLength: 100,
  },
} as const;

/**
 * 错误信息常量
 */
export const ERROR_MESSAGES = {
  REQUIRED: '此字段为必填项',
  INVALID_PHONE: '请输入有效的手机号',
  INVALID_EMAIL: '请输入有效的邮箱地址',
  INVALID_CONTACT: '请输入有效的手机号或邮箱地址',
  TOO_SHORT: (min: number) => `至少需要 ${min} 个字符`,
  TOO_LONG: (max: number) => `不能超过 ${max} 个字符`,
} as const;
