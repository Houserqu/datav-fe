import React, { PureComponent } from 'react';
import { connect } from 'dva';
import uuidv1 from 'uuid/v1';
import { Card, Form, Icon, Button, Dropdown, Menu, Table, Modal, Input, Select } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';
import { getComponentListI, createComponentI, deleteComponentI } from '@/services/component';
import { getCategory } from '@/services/app';

const { Option } = Select;
const { TextArea } = Input;

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
class Components extends PureComponent {
  state = {
    selectedRows: [],
    category: [],
    createVisible: false,
  };

  columns = [
    {
      title: '缩略图',
      dataIndex: 'thumb',
      width: 220,
      render: text => <img style={{ width: 200 }} src={text} alt="" />,
    },
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '分类',
      dataIndex: 'category_name',
    },
    {
      title: '类型',
      dataIndex: 'type',
    },
    {
      title: '说明',
      dataIndex: 'describe',
    },

    {
      title: 'code',
      dataIndex: 'code',
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
    this.queryComponentList();
  }

  queryCategoryList = async () => {
    const res = await getCategory();
    if (res.success) {
      this.setState({ category: res.data });
    }
  };

  queryComponentList = async () => {
    const res = await getComponentListI();
    if (res.success) {
      this.setState({ components: res.data });
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
    const res = await deleteComponentI({ id });
    if (res.success) {
      this.queryComponentList();
    }
  };

  handleSubmitCreate = async e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const selectCategory = this.state.category.find(v => v.id === values.category_id);

        const res = await createComponentI({
          ...values,
          code: uuidv1().toLocaleUpperCase(),
          category_name: selectCategory && selectCategory.name,
        });
        if (res.success) {
          this.closeCreate();
          this.queryComponentList();
        }
      }
    });
  };

  render() {
    const { selectedRows, category, components, createVisible } = this.state;
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
            <Table rowKey="id" columns={this.columns} dataSource={components} pagination={false} />
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

            <Form.Item label="组件类型" {...formItemLayout}>
              {getFieldDecorator('type', {
                rules: [{ required: true, message: '选择类型' }],
                initialValue: 'chart',
              })(
                <Select>
                  <Option value="chart">图表</Option>
                  <Option value="text">文本</Option>
                  <Option value="image">图片</Option>
                </Select>
              )}
            </Form.Item>

            <Form.Item label="缩略图" {...formItemLayout}>
              {getFieldDecorator('thumb', {
                rules: [{ required: true, message: '请输入缩略图地址' }],
              })(<Input placeholder="缩略图地址" />)}
            </Form.Item>

            <Form.Item label="分类" {...formItemLayout}>
              {getFieldDecorator('category_id', {
                rules: [{ required: true, message: '选择分类' }],
              })(
                <Select>
                  {category.map(v => (
                    <Option key={v.id} value={v.id}>
                      {v.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="配置参数" {...formItemLayout}>
              {getFieldDecorator('json_str', {
                rules: [{ required: true, message: '配置参数' }],
              })(<TextArea />)}
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

export default Form.create()(Components);
