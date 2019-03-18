import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import { Card, Modal, Button } from 'antd';
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
  state = {
    detail: {},
  };

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;

    dispatch({
      type: 'app/fetchAppDetail',
      payload: { id },
      callback: res => {
        this.setState({ detail: res });
      },
    });
  }

  handleUpdate = value => {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    console.log(value);
    dispatch({
      type: 'app/updateApp',
      payload: { ...value, id },
      callback: res => {
        if (res.success) {
          Modal.confirm({
            title: '更新成功！',
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
    const { detail } = this.state;
    return (
      <PageHeaderWrapper title="编辑应用">
        <Card
          title={`编辑：${detail.name}`}
          extra={
            <Button onClick={() => router.push(`/app/design/${detail.id}`)} type="primary">
              进入设计面板
            </Button>
          }
        >
          <AppCreateFrom onSubmit={this.handleUpdate} detail={detail} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default AppCreate;
