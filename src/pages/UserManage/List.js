import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Form, Icon, Button, Dropdown, Menu, Divider, Table, Modal } from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';
import { memberStatus } from '@/constant';

/* eslint react/no-multi-comp:0 */
@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
class TableList extends PureComponent {
  state = {
    selectedRows: [],
  };

  columns = [
    {
      title: '账号',
      dataIndex: 'account',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '地址',
      dataIndex: 'userAddress',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: text => memberStatus[text],
    },
  ];

  componentDidMount() {
    this.queryUserList();
  }

  queryUserList = params => {
    this.props.dispatch({
      type: 'user/fetchUserList',
      payload: { ...params, rows: 20 },
    });
  };

  render() {
    const {
      loading,
      user: { userList, userListTotal },
    } = this.props;
    const { selectedRows } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const paginationProps = {
      total: userListTotal,
      onChange: page => {
        this.queryUserList({ page });
      },
      pageSize: 20,
    };

    return (
      <PageHeaderWrapper title="会员管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <Table
              rowKey="id"
              columns={this.columns}
              // rowSelection={rowSelection}
              dataSource={userList}
              pagination={paginationProps}
              loading={loading}
              // onChange={this.handleTableChange}
            />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
