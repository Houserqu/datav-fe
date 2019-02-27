import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Icon, Button, Dropdown, Menu, Divider, Table, Modal, Form, Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { memberStatus } from '@/constant';
import styles from './List.less';
import FormModal from './FormModal';

/* eslint react/no-multi-comp:0 */
@connect(({ loading, auth }) => ({
  auth,
  loading: loading.models.user,
}))
class TableList extends PureComponent {
  state = {
    selectedRows: [],
    showCreate: false,
    password: '',
    passwordConfirm: '',
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
      title: '角色名称',
      dataIndex: 'defualtRoleName',
    },
    { title: '状态', dataIndex: 'status', key: 'enabled', render: text => memberStatus[text] },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.resetPassword(record)}>重置密码</a>
          <Divider type="vertical" />
          <a onClick={() => this.delUser(record.id)}>删除</a>
        </Fragment>
      ),
    },
    // {
    //   title: '操作',
    //   render: (text, record) => (
    //     <Fragment>
    //       <a onClick={() => this.handleUpdateModalVisible(true, record)}>配置</a>
    //       <Divider type="vertical" />
    //       <a href="">订阅警报</a>
    //     </Fragment>
    //   ),
    // },
  ];

  componentDidMount() {
    this.queryUserList();
  }

  resetPassword = record => {
    Modal.confirm({
      title: '重置密码',
      content: (
        <Form>
          <Form.Item>
            <Input
              placeholder="新密码"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </Form.Item>
          <Form.Item>
            <Input
              onChange={e => this.setState({ passwordConfirm: e.target.value })}
              placeholder="确认新密码"
            />
          </Form.Item>
        </Form>
      ),
      onOk: () => {
        const { password, passwordConfirm } = this.state;
        if (password && passwordConfirm && password === passwordConfirm) {
          this.props.dispatch({
            type: 'auth/setAuthUserPwd',
            payload: {
              password,
              password2: passwordConfirm,
              id: record.id,
            },
          });
        }
      },
    });
  };

  delUser = id => {
    Modal.confirm({
      title: '删除用户',
      content: '确定删除用户吗？',
      onOk: () => {
        this.props.dispatch({
          type: 'auth/deleteWorker',
          payload: { userIds: id },
        });
      },
    });
  };

  queryUserList = params => {
    this.props.dispatch({
      type: 'auth/fetchAuthUserLst',
      payload: { ...params, rows: 20, status: 1 },
    });
  };

  showCreate = () => {
    this.setState({ showCreate: !this.state.showCreate });
  };

  submit = params => {
    this.props.dispatch({
      type: 'auth/createTenantUser',
      payload: params,
      callback: this.showCreate,
    });
  };

  render() {
    const {
      loading,
      auth: { userList, userListTotal },
    } = this.props;
    const { selectedRows, showCreate } = this.state;
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
      <PageHeaderWrapper title="人员管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={this.showCreate}>
                创建子账号
              </Button>
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
        <FormModal visible={showCreate} onCancel={this.showCreate} onOk={this.submit} />
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
