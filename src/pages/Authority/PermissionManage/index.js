import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Button, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';
import { getPermissionList } from '@/services/auth';

/* eslint react/no-multi-comp:0 */
@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
class PermissionManage extends PureComponent {
  state = {
    list: [],
  };

  columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'type',
      dataIndex: 'type',
    },
    {
      title: 'code',
      dataIndex: 'code',
    },
    {
      title: 'app',
      dataIndex: 'app',
    },
  ];

  async componentDidMount() {
    this.queryList();
  }

  queryList = async () => {
    const res = await getPermissionList();
    if (res.success) {
      this.setState({ list: res.data });
    }
  };

  render() {
    const { list } = this.state;

    return (
      <PageHeaderWrapper title="权限管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table rowKey="id" columns={this.columns} dataSource={list} pagination={false} />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(PermissionManage);
