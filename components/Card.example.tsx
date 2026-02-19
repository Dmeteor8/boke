/**
 * Card 组件使用示例
 * 
 * 展示 Card 组件的各种用法
 */

import React from 'react';
import { Card } from './Card';

export const CardExamples: React.FC = () => {
  const handleCardClick = () => {
    console.log('卡片被点击');
  };

  return (
    <div className="space-y-8 p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Card 组件示例</h1>

      {/* Default 变体 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Default 变体</h2>
        <Card title="默认卡片" variant="default">
          <p>这是一个默认样式的卡片，带有边框和白色背景。</p>
        </Card>
      </section>

      {/* Elevated 变体 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Elevated 变体</h2>
        <Card title="提升卡片" variant="elevated">
          <p>这是一个带有阴影效果的卡片，悬停时阴影会增强。</p>
        </Card>
      </section>

      {/* Outlined 变体 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Outlined 变体</h2>
        <Card title="轮廓卡片" variant="outlined">
          <p>这是一个带有粗边框的透明背景卡片。</p>
        </Card>
      </section>

      {/* 可点击卡片 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">可点击卡片</h2>
        <Card
          title="点击我"
          variant="elevated"
          onClick={handleCardClick}
        >
          <p>这个卡片可以点击，支持鼠标点击和键盘导航（Enter 或空格键）。</p>
          <p className="mt-2 text-sm text-gray-500">
            提示：使用 Tab 键聚焦，然后按 Enter 或空格键触发点击。
          </p>
        </Card>
      </section>

      {/* 无标题卡片 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">无标题卡片</h2>
        <Card variant="default">
          <p>这个卡片没有标题，只有内容。</p>
        </Card>
      </section>

      {/* 复杂内容卡片 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">复杂内容卡片</h2>
        <Card title="项目案例" variant="elevated">
          <div className="space-y-3">
            <p className="font-medium">机械制造企业官网升级项目</p>
            <p className="text-sm text-gray-600">交付周期：7 天</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>响应式设计，适配所有设备</li>
              <li>SEO 优化，提升搜索排名</li>
              <li>性能优化，加载速度提升 50%</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* 网格布局示例 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">网格布局示例</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="服务 1" variant="default">
            <p>企业官网定制</p>
            <p className="mt-2 text-sm text-gray-600">8000元起</p>
          </Card>
          <Card title="服务 2" variant="default">
            <p>后台管理系统</p>
            <p className="mt-2 text-sm text-gray-600">12000元起</p>
          </Card>
          <Card title="服务 3" variant="default">
            <p>自动化系统开发</p>
            <p className="mt-2 text-sm text-gray-600">5000元起</p>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default CardExamples;
