/**
 * Input 组件单元测试
 * 
 * 测试 Input 组件的核心功能和可访问性
 * 需求：7.2-7.4, 8.6, 12.3
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染 text 类型输入框', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
        />
      );

      const input = screen.getByLabelText('姓名');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('应该渲染 email 类型输入框', () => {
      render(
        <Input
          type="email"
          label="邮箱"
          value=""
          onChange={() => {}}
        />
      );

      const input = screen.getByLabelText('邮箱');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('inputMode', 'email');
    });

    it('应该渲染 tel 类型输入框', () => {
      render(
        <Input
          type="tel"
          label="电话"
          value=""
          onChange={() => {}}
        />
      );

      const input = screen.getByLabelText('电话');
      expect(input).toHaveAttribute('type', 'tel');
      expect(input).toHaveAttribute('inputMode', 'tel');
    });

    it('应该渲染 textarea 类型输入框', () => {
      render(
        <Input
          type="textarea"
          label="描述"
          value=""
          onChange={() => {}}
        />
      );

      const textarea = screen.getByLabelText('描述');
      expect(textarea.tagName).toBe('TEXTAREA');
    });
  });

  describe('Label 关联 (需求 12.3)', () => {
    it('应该使用 htmlFor 关联 label 和 input', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
          id="name-input"
        />
      );

      const label = screen.getByText('姓名');
      const input = screen.getByLabelText('姓名');

      expect(label).toHaveAttribute('for', 'name-input');
      expect(input).toHaveAttribute('id', 'name-input');
    });

    it('应该在未提供 id 时自动生成唯一 id', () => {
      render(
        <Input
          type="text"
          label="用户名"
          value=""
          onChange={() => {}}
        />
      );

      const input = screen.getByLabelText('用户名');
      expect(input).toHaveAttribute('id');
      expect(input.id).toBeTruthy();
    });

    it('应该支持通过 name 属性生成 id', () => {
      render(
        <Input
          type="text"
          label="姓名"
          name="fullName"
          value=""
          onChange={() => {}}
        />
      );

      const input = screen.getByLabelText('姓名');
      expect(input).toHaveAttribute('id', 'input-fullName');
    });
  });

  describe('必填字段标识', () => {
    it('应该为必填字段显示星号', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
          required
        />
      );

      const asterisk = screen.getByText('*');
      expect(asterisk).toBeInTheDocument();
      expect(asterisk).toHaveClass('text-red-500');
    });

    it('应该为必填字段的星号添加 aria-label', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
          required
        />
      );

      const asterisk = screen.getByLabelText('必填');
      expect(asterisk).toBeInTheDocument();
    });

    it('非必填字段不应显示星号', () => {
      render(
        <Input
          type="text"
          label="公司"
          value=""
          onChange={() => {}}
        />
      );

      const asterisk = screen.queryByText('*');
      expect(asterisk).not.toBeInTheDocument();
    });
  });

  describe('值和变化处理', () => {
    it('应该显示传入的值', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value="张三"
          onChange={() => {}}
        />
      );

      const input = screen.getByLabelText('姓名') as HTMLInputElement;
      expect(input.value).toBe('张三');
    });

    it('应该在输入时调用 onChange', () => {
      const handleChange = vi.fn();
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={handleChange}
        />
      );

      const input = screen.getByLabelText('姓名');
      fireEvent.change(input, { target: { value: '李四' } });

      expect(handleChange).toHaveBeenCalledWith('李四');
    });

    it('textarea 应该在输入时调用 onChange', () => {
      const handleChange = vi.fn();
      render(
        <Input
          type="textarea"
          label="描述"
          value=""
          onChange={handleChange}
        />
      );

      const textarea = screen.getByLabelText('描述');
      fireEvent.change(textarea, { target: { value: '这是一段描述' } });

      expect(handleChange).toHaveBeenCalledWith('这是一段描述');
    });
  });

  describe('错误显示 (需求 7.4)', () => {
    it('应该显示错误信息', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
          error="姓名不能为空"
        />
      );

      const errorMessage = screen.getByText('姓名不能为空');
      expect(errorMessage).toBeInTheDocument();
    });

    it('错误信息应该有 role="alert"', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
          error="姓名不能为空"
        />
      );

      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toHaveTextContent('姓名不能为空');
    });

    it('有错误时输入框应该有错误样式', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
          error="姓名不能为空"
        />
      );

      const input = screen.getByLabelText('姓名');
      expect(input).toHaveClass('border-red-500');
    });

    it('有错误时应该设置 aria-invalid', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
          error="姓名不能为空"
        />
      );

      const input = screen.getByLabelText('姓名');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('有错误时应该使用 aria-describedby 关联错误信息', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
          error="姓名不能为空"
          id="name-input"
        />
      );

      const input = screen.getByLabelText('姓名');
      const errorId = input.getAttribute('aria-describedby');
      
      expect(errorId).toBeTruthy();
      expect(errorId).toBe('name-input-error');

      const errorElement = document.getElementById(errorId!);
      expect(errorElement).toHaveTextContent('姓名不能为空');
    });

    it('无错误时不应显示错误信息', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value="张三"
          onChange={() => {}}
        />
      );

      const errorMessage = screen.queryByRole('alert');
      expect(errorMessage).not.toBeInTheDocument();
    });

    it('无错误时应该有正常样式', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
        />
      );

      const input = screen.getByLabelText('姓名');
      expect(input).toHaveClass('border-gray-300');
      expect(input).not.toHaveClass('border-red-500');
    });
  });

  describe('移动端字体大小 (需求 8.6)', () => {
    it('应该使用至少 16px 的字体大小', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
        />
      );

      const input = screen.getByLabelText('姓名');
      // text-base 在 Tailwind 中是 16px
      expect(input).toHaveClass('text-base');
    });

    it('textarea 应该使用至少 16px 的字体大小', () => {
      render(
        <Input
          type="textarea"
          label="描述"
          value=""
          onChange={() => {}}
        />
      );

      const textarea = screen.getByLabelText('描述');
      expect(textarea).toHaveClass('text-base');
    });
  });

  describe('Placeholder', () => {
    it('应该显示 placeholder', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
          placeholder="请输入您的姓名"
        />
      );

      const input = screen.getByPlaceholderText('请输入您的姓名');
      expect(input).toBeInTheDocument();
    });
  });

  describe('自定义样式', () => {
    it('应该支持自定义 className', () => {
      render(
        <Input
          type="text"
          label="姓名"
          value=""
          onChange={() => {}}
          className="custom-class"
        />
      );

      const input = screen.getByLabelText('姓名');
      expect(input).toHaveClass('custom-class');
    });
  });

  describe('Textarea 特性', () => {
    it('textarea 应该有 4 行默认高度', () => {
      render(
        <Input
          type="textarea"
          label="描述"
          value=""
          onChange={() => {}}
        />
      );

      const textarea = screen.getByLabelText('描述') as HTMLTextAreaElement;
      expect(textarea.rows).toBe(4);
    });

    it('textarea 应该支持垂直调整大小', () => {
      render(
        <Input
          type="textarea"
          label="描述"
          value=""
          onChange={() => {}}
        />
      );

      const textarea = screen.getByLabelText('描述') as HTMLTextAreaElement;
      expect(textarea.style.resize).toBe('vertical');
    });
  });
});
