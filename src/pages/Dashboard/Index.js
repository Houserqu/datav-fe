import React from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card } from 'antd';

export default function() {
  return (
    <PageHeaderWrapper title="控制台">
      <Card bordered={false}>欢迎使用 Datav 控制台</Card>
    </PageHeaderWrapper>
  );
}
