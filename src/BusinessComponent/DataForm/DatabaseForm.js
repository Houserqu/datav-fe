import React, { Fragment, Component } from 'react';
import { Input, Form } from 'antd';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/xcode';
import 'brace/mode/json';

const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};

@Form.create({
  onValuesChange: (props, changeValue, allValues) => {
    props.onChange(JSON.stringify(allValues));
  },
})
class JSONForm extends Component {
  state = {};

  render() {
    const {
      value = '{}',
      modify = true,
      layout = formItemLayout,
      form: { getFieldDecorator },
    } = this.props;

    const detail = JSON.parse(value);
    console.log(detail);

    return (
      <Fragment>
        <Form.Item label="主机" {...layout}>
          {getFieldDecorator('host', {
            initialValue: detail.host || '',
            rules: [
              {
                required: true,
                message: '请输入应用名称',
              },
            ],
          })(<Input disabled={!modify} />)}
        </Form.Item>

        <Form.Item label="端口号" {...layout}>
          {getFieldDecorator('port', {
            initialValue: detail.port || '',
            rules: [
              {
                required: true,
                message: '请输入端口号',
              },
            ],
          })(<Input disabled={!modify} />)}
        </Form.Item>

        <Form.Item label="用户名" {...layout}>
          {getFieldDecorator('username', {
            initialValue: detail.username || '',
            rules: [
              {
                required: true,
                message: '请输入用户名',
              },
            ],
          })(<Input disabled={!modify} />)}
        </Form.Item>

        <Form.Item label="密码" {...layout}>
          {getFieldDecorator('password', {
            initialValue: detail.password || '',
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
            ],
          })(<Input type="password" disabled={!modify} />)}
        </Form.Item>

        <Form.Item label="数据库" {...layout}>
          {getFieldDecorator('database', {
            initialValue: detail.database || '',
            rules: [
              {
                required: true,
                message: '请输入数据库',
              },
            ],
          })(<Input disabled={!modify} />)}
        </Form.Item>

        <Form.Item label="SQL" {...layout}>
          {getFieldDecorator('sql', {
            initialValue: detail.database || '',
            rules: [
              {
                required: true,
                message: '请输入 SQL',
              },
            ],
          })(<TextArea disabled={!modify} />)}
        </Form.Item>
      </Fragment>
    );
  }
}

export default JSONForm;
