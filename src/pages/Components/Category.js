import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Icon, Button, Dropdown, Menu, Table, Modal, Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';
import { getCategory, createCategory, deleteCategory } from '@/services/app';

/* eslint react/no-multi-comp:0 */
@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
class TableList extends PureComponent {
  state = {
    selectedRows: [],
    category: [],
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
      title: 'icon',
      dataIndex: 'icon',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (text, record) => (
        <Button onClick={() => this.handleDeleteCategory(record.id)} type="danger">
          删除
        </Button>
      ),
    },
  ];

  async componentDidMount() {
    this.queryCategoryList();
  }

  queryCategoryList = async () => {
    const res = await getCategory();
    if (res.success) {
      this.setState({ category: res.data });
    }
  };

  showCreate = () => {
    this.setState({ createVisible: true });
  };

  closeCreate = () => {
    this.setState({ createVisible: false });
  };

  handleDeleteCategory = async id => {
    const res = await deleteCategory({ id });
    if (res.success) {
      this.queryCategoryList();
    }
  };

  handleSubmitCreate = async e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const res = await createCategory(values);
        if (res.success) {
          this.closeCreate();
          this.queryCategoryList();
        }
      }
    });
  };

  render() {
    const { selectedRows, category, createVisible } = this.state;
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
      <PageHeaderWrapper title="组件分类管理">
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
            <Table rowKey="id" columns={this.columns} dataSource={category} pagination={false} />
          </div>
        </Card>

        <Modal title="创建分类" visible={createVisible} footer={null} onCancel={this.closeCreate}>
          <Form onSubmit={this.handleSubmitCreate}>
            <Form.Item label="名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入分类名称' }],
              })(<Input placeholder="分类名称" />)}
            </Form.Item>

            <Form.Item label="icon">
              {getFieldDecorator('icon', {
                rules: [{ required: true, message: '请输入分类 icon' }],
              })(<Input placeholder="分类 icon" />)}
            </Form.Item>
            <Form.Item>
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

export default Form.create()(TableList);
