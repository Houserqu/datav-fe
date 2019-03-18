import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { dataType } from '@/constant';
import BaseForm from '@/BusinessComponent/DataForm/BaseForm';

@connect(({ app, loading }) => ({
  app,
  loading,
}))
class AppCreate extends PureComponent {
  handleCreate = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'data/createData',
      payload: value,
      callback: res => {
        if (res.statusCode === 200) {
          router.push('/app/dashboard');
        }
      },
    });
  };

  render() {
    return (
      <PageHeaderWrapper title="创建数据">
        <Card>
          <BaseForm onSubmit={this.handleCreate} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AppCreate;
