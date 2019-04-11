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
import BaseForm from '@/BusinessComponent/DataForm/BaseForm';

@connect(({ app, loading }) => ({
  app,
  loading,
}))
class DataEdit extends PureComponent {
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
      type: 'data/fetchDataDetail',
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
    dispatch({
      type: 'data/updateData',
      payload: { ...value, id },
      callback: res => {
        if (res.success) {
          router.push('/app/dashboard');
        }
      },
    });
  };

  render() {
    const { detail } = this.state;
    return (
      <PageHeaderWrapper title="编辑数据">
        <Card>
          <BaseForm detail={detail} onSubmit={this.handleUpdate} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default DataEdit;
