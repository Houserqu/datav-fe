import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Icon, Button, Dropdown, Menu, Divider, Table, Modal, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';
import FormModal from './FormModal';
import AddPerms from './AddPerms';
import { loadPermDataSetForRoleAssign, addPermsToRole, removePermsFromRole } from '@/services/auth';

/* eslint react/no-multi-comp:0 */
@connect(({ loading, auth }) => ({
  auth,
  loading: loading.models.auth,
}))
class TableList extends PureComponent {
  state = {
    selectedRows: [],
    showCreateSub: false,
    permsAddVisible: false,
    roleNotPerm: [],
    roleHasPerm: [],
    curRoleId: null,
    changePermsLoading: false,
  };

  columns = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '角色码',
      dataIndex: 'roleCode',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.showRolePermModal(record.id)}>权限管理</a>
          {/* <Divider type="vertical" />
          <a onClick={() => this.showRolePermModal(record.id)}>编辑</a> */}
          <Divider type="vertical" />
          <a onClick={() => this.handleDelRole(record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    this.queryRoleList();
  }

  queryRoleList = params => {
    this.props.dispatch({
      type: 'auth/fetchAuthRoleLst',
      payload: { ...params, rows: 20 },
    });
  };

  handleDelRole = record => {
    Modal.confirm({
      title: '删除角色',
      content: `确定删除角色：${record.name}`,
      onOk: () => {
        this.props.dispatch({
          type: 'auth/deleteRole',
          payload: { ids: record.id },
        });
      },
    });
  };

  handlePermsChange = async (targetKeys, direction, moveKeys) => {
    console.log(targetKeys, moveKeys, direction);
    this.setState({ targetPermsKeys: targetKeys });

    if (direction === 'right') {
      await addPermsToRole({ roleId: this.state.curRoleId, permIds: moveKeys.join() });
    }

    if (direction === 'left') {
      await removePermsFromRole({ roleId: this.state.curRoleId, permIds: moveKeys.join() });
    }

    this.getRolePerms(this.state.curRoleId);
  };

  getRolePerms = async roleId => {
    this.setState({ changePermsLoading: true });
    const resIn = await loadPermDataSetForRoleAssign({
      appKey: 'APP_ROOT',
      rows: 1000,
      isInRole: true,
      roleId,
    });
    const resOut = await loadPermDataSetForRoleAssign({
      appKey: 'APP_ROOT',
      rows: 1000,
      isInRole: false,
      roleId,
    });

    this.setState({
      roleHasPerm: resIn.data.dataSet.rows,
      roleNotPerm: resOut.data.dataSet.rows,
      changePermsLoading: false,
    });
  };

  showCreateRole = () => {
    this.setState({ showCreateRole: !this.state.showCreateRole });
  };

  submit = params => {
    console.log(params);
    this.props.dispatch({
      type: 'auth/createRole',
      payload: params,
      callback: this.showCreateRole,
    });
  };

  closePermsForm = () => {
    this.setState({ permsAddVisible: false, curRoleId: null });
  };

  showRolePermModal = roleId => {
    this.getRolePerms(roleId);
    this.setState({ permsAddVisible: true, curRoleId: roleId });
  };

  handleSubmitPerms = async perms => {
    this.setState({ changePermsLoading: true });
    console.log(perms, JSON.stringify(perms));
    const res = await addPermsToRole({ permIds: perms.join(), roleId: this.state.curRoleId });

    if (res.statusCode === 200) {
      message.success('操作成功');
      this.closePermsForm();
      this.queryRoleList();
    }
  };

  render() {
    const {
      loading,
      auth: { roleList, roleListTotal },
    } = this.props;
    const {
      selectedRows,
      showCreateRole,
      roleHasPerm,
      roleNotPerm,
      curRoleId,
      changePermsLoading,
    } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const paginationProps = {
      total: roleListTotal,
      onChange: page => {
        this.queryRoleList({ page });
      },
      pageSize: 20,
    };

    return (
      <PageHeaderWrapper title="角色管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={this.showCreateRole}>
                创建新角色
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
              dataSource={roleList}
              pagination={paginationProps}
              loading={loading}
              // onChange={this.handleTableChange}
            />
          </div>
        </Card>
        <FormModal visible={showCreateRole} onCancel={this.showCreateRole} onOk={this.submit} />
        {curRoleId && (
          <AddPerms
            roleHasPerm={roleHasPerm}
            roleNotPerm={roleNotPerm}
            targetKeys={roleHasPerm.map(v => v.id)}
            onCancel={this.closePermsForm}
            onOk={this.handleSubmitPerms}
            visible={this.state.permsAddVisible}
            onChange={this.handlePermsChange}
            loading={changePermsLoading}
          />
        )}
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
