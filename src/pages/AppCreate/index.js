import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, Modal } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';
import { appAccessStatus, appStatus } from '@/constant';
import router from 'umi/router';
import AppCreateFrom from '@/BusinessComponent/AppCreateForm';

@connect(({ app, loading }) => ({
  app,
  loading,
}))
class AppCreate extends PureComponent {
  componentDidMount() {
    // dispatch({
    //   type: 'app/fetchAppDetail',
    //   payload: { id },
    // });
  }

  handleCreate = value => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/createApp',
      payload: value,
      callback: res => {
        if (res.success) {
          Modal.confirm({
            title: '创建成功！',
            content: '是否进入设计面板',
            okText: '进入设计面板',
            cancelText: '返回',
            onOk: () => {
              router.push(`/app/design/${res.data}`);
            },
            onCancel: () => {
              router.goBack();
            },
          });
        }
      },
    });
  };

  render() {
    return (
      <PageHeaderWrapper title="创建应用">
        <Card>
          <AppCreateFrom onSubmit={this.handleCreate} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AppCreate;
