import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Icon, Button, Dropdown, Menu, Table, Modal, Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';
import { getRoleList, deleteRole, createRole } from '@/services/auth';

const { Group: ButtonGroup } = Button;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

/* eslint react/no-multi-comp:0 */
@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
class RoleManage extends PureComponent {
  state = {
    selectedRows: [],
    list: [],
    createVisible: false,
  };

  columns = [
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: 'code',
      dataIndex: 'code',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => (
        <ButtonGroup>
          <Button size="small">分配权限</Button>
          <Button size="small" type="danger" onClick={() => this.handleDeleteCategory(record.id)}>
            删除
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  async componentDidMount() {
    this.queryList();
  }

  queryList = async () => {
    const res = await getRoleList();
    if (res.success) {
      this.setState({ list: res.data });
    }
  };

  showCreate = () => {
    this.setState({ createVisible: true });
  };

  closeCreate = () => {
    this.props.form.resetFields();
    this.setState({ createVisible: false });
  };

  handleDeleteCategory = async id => {
    const res = await deleteRole({ id });
    if (res.success) {
      this.queryList();
    }
  };

  handleSubmitCreate = async e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await createRole(values);
        if (res.success) {
          this.closeCreate();
          this.queryList();
        }
      }
    });
  };

  render() {
    const { selectedRows, list, createVisible } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    return (
      <PageHeaderWrapper title="角色管理">
        <Card
          bordered={false}
          extra={
            <Button type="primary" onClick={this.showCreate}>
              创建
            </Button>
          }
        >
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
            <Table rowKey="id" columns={this.columns} dataSource={list} pagination={false} />
          </div>
        </Card>

        <Modal
          title="创建组件"
          visible={createVisible}
          footer={null}
          onCancel={this.closeCreate}
          maskClosable={false}
        >
          <Form onSubmit={this.handleSubmitCreate}>
            <Form.Item label="名称" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入名称' }],
              })(<Input placeholder="名称" />)}
            </Form.Item>

            <Form.Item label="code" {...formItemLayout}>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入code' }],
              })(<Input placeholder="code" />)}
            </Form.Item>

            <Form.Item label="提交" {...formItemLayout}>
              <Button type="primary" htmlType="submit" className="login-form-button">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(RoleManage);
