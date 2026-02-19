/**
 * 联系表单 API 路由
 * 
 * 处理联系表单提交，验证数据并发送邮件通知
 * 需求：7.3
 */

import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/types/validation';
import type { ContactFormData } from '@/types';

/**
 * POST /api/contact
 * 
 * 接收联系表单数据，验证后发送邮件通知
 */
export async function POST(request: NextRequest) {
  try {
    // 解析请求体
    const body = await request.json();

    // 验证数据
    const validationResult = contactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: '数据验证失败',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const formData: ContactFormData = validationResult.data;

    // 发送邮件通知
    await sendEmailNotification(formData);

    // 返回成功响应
    return NextResponse.json(
      {
        success: true,
        message: '提交成功，我们会尽快与您联系',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('联系表单提交错误:', error);

    return NextResponse.json(
      {
        success: false,
        message: '服务器错误，请稍后重试或直接拨打电话联系我们',
        error: error instanceof Error ? error.message : '未知错误',
      },
      { status: 500 }
    );
  }
}

/**
 * 发送邮件通知
 * 
 * 使用 Resend 或 Nodemailer 发送邮件到 mvpm@vip.qq.com
 */
async function sendEmailNotification(formData: ContactFormData): Promise<void> {
  // 构建邮件内容
  const emailContent = `
新的客户咨询

姓名：${formData.name}
联系方式：${formData.contact}
${formData.company ? `公司：${formData.company}` : ''}
需求描述：
${formData.requirement}

提交时间：${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}
  `.trim();

  // TODO: 集成邮件服务
  // 选项 1: 使用 Resend (推荐)
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'contact@yourdomain.com',
  //   to: 'mvpm@vip.qq.com',
  //   subject: `新客户咨询 - ${formData.name}`,
  //   text: emailContent,
  // });

  // 选项 2: 使用 Nodemailer
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: parseInt(process.env.SMTP_PORT || '587'),
  //   secure: false,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // });
  // await transporter.sendMail({
  //   from: process.env.SMTP_FROM,
  //   to: 'mvpm@vip.qq.com',
  //   subject: `新客户咨询 - ${formData.name}`,
  //   text: emailContent,
  // });

  // 临时方案：记录到控制台（开发环境）
  if (process.env.NODE_ENV === 'development') {
    console.log('=== 邮件通知 ===');
    console.log(emailContent);
    console.log('================');
  }

  // 模拟邮件发送延迟
  await new Promise(resolve => setTimeout(resolve, 500));
}
