import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';
import { getUserList } from '@/services/auth';

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
      title: 'avatar',
      dataIndex: 'avatar',
      render: text => <img src={text} alt="" style={{ width: '80px' }} />,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },

    {
      title: 'mail',
      dataIndex: 'mail',
    },
  ];

  async componentDidMount() {
    this.queryList();
  }

  queryList = async () => {
    const res = await getUserList();
    if (res.success) {
      this.setState({ list: res.data });
    }
  };

  render() {
    const { list } = this.state;

    return (
      <PageHeaderWrapper title="用户管理">
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
