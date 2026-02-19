/**
 * 环境变量配置
 * 
 * 集中管理和验证环境变量
 */

/**
 * 获取环境变量，如果不存在则抛出错误
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key] || defaultValue;
  
  if (!value) {
    throw new Error(`环境变量 ${key} 未设置`);
  }
  
  return value;
}

/**
 * 获取可选的环境变量
 */
function getOptionalEnvVar(key: string, defaultValue?: string): string | undefined {
  return process.env[key] || defaultValue;
}

/**
 * 环境变量配置对象
 */
export const env = {
  // 网站配置
  siteUrl: getOptionalEnvVar('NEXT_PUBLIC_SITE_URL', 'https://yourdomain.com'),
  siteName: getOptionalEnvVar('NEXT_PUBLIC_SITE_NAME', '企业服务定制'),
  
  // 联系信息
  contactPhone: getOptionalEnvVar('NEXT_PUBLIC_CONTACT_PHONE', '13151488988'),
  contactEmail: getOptionalEnvVar('NEXT_PUBLIC_CONTACT_EMAIL', 'mvpm@vip.qq.com'),
  
  // 邮件服务配置
  resend: {
    apiKey: getOptionalEnvVar('RESEND_API_KEY'),
    fromEmail: getOptionalEnvVar('RESEND_FROM_EMAIL'),
  },
  
  smtp: {
    host: getOptionalEnvVar('SMTP_HOST'),
    port: getOptionalEnvVar('SMTP_PORT'),
    user: getOptionalEnvVar('SMTP_USER'),
    pass: getOptionalEnvVar('SMTP_PASS'),
    from: getOptionalEnvVar('SMTP_FROM'),
  },
  
  // 分析和监控
  analytics: {
    gaId: getOptionalEnvVar('NEXT_PUBLIC_GA_ID'),
    baiduId: getOptionalEnvVar('NEXT_PUBLIC_BAIDU_ANALYTICS_ID'),
  },
  
  // 环境
  nodeEnv: getOptionalEnvVar('NODE_ENV', 'development'),
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
};

/**
 * 验证必需的环境变量
 */
export function validateEnv() {
  const errors: string[] = [];
  
  // 检查邮件服务配置
  const hasResend = env.resend.apiKey && env.resend.fromEmail;
  const hasSmtp = env.smtp.host && env.smtp.port && env.smtp.user && env.smtp.pass;
  
  if (!hasResend && !hasSmtp && env.isProduction) {
    errors.push('生产环境必须配置邮件服务（Resend 或 SMTP）');
  }
  
  if (errors.length > 0) {
    console.error('环境变量验证失败:');
    errors.forEach(error => console.error(`  - ${error}`));
    
    if (env.isProduction) {
      throw new Error('环境变量验证失败');
    }
  }
}

// 在模块加载时验证环境变量
if (typeof window === 'undefined') {
  validateEnv();
}
