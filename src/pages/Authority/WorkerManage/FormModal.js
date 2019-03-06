import React, { PureComponent } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { getAuthRoleList } from '@/services/auth';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class FormModal extends PureComponent {
  state = {
    roleList: [],
  };

  async componentDidMount() {
    const res = await getAuthRoleList();
    if (res.statusCode === 200) {
      this.setState({ roleList: res.data.dataSet.rows });
    }
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) return;
      this.props.onOk(fieldsValue);
    });
  };

  render() {
    const {
      visible,
      form: { getFieldDecorator },
      onCancel,
    } = this.props;
    const { roleList } = this.state;

    return (
      <Modal
        title="创建用户"
        visible={visible}
        onCancel={onCancel}
        onOk={this.handleSubmit}
        destroyOnClose
      >
        <Form>
          <FormItem>
            {getFieldDecorator('account', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="登录账号" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="邮箱" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="密码" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('phone', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="电话" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('roleCode', {
              rules: [
                {
                  required: true,
                },
              ],
            })(
              <Select allowClear>
                {roleList.map(v => (
                  <Option key={v.roleCode}>{v.name}</Option>
                ))}
              </Select>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default FormModal;
