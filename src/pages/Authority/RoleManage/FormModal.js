import React, { PureComponent } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

@Form.create()
class FormModal extends PureComponent {
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
    return (
      <Modal title="修改密码" visible={visible} onCancel={onCancel} onOk={this.handleSubmit}>
        <Form>
          <FormItem>
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="角色名" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('roleCode', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="角色码" />)}
          </FormItem>
          <FormItem>
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input placeholder="描述" />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default FormModal;
