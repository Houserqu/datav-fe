import React, { Fragment, Component } from 'react';
import { Input, Form, Button, message } from 'antd';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/xcode';
import 'brace/mode/json';
import { queryDataBySql } from '@/services/data';

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
class DatabaseForm extends Component {
  state = {
    testData: '',
  };

  // 请求数据
  handleQueryData = async () => {
    const {
      form: { getFieldsValue },
    } = this.props;

    const res = await queryDataBySql(getFieldsValue());
    if (res.success) {
      this.setState({ testData: res.data });
    }
  };

  render() {
    const {
      value = '{}',
      modify = true,
      layout = formItemLayout,
      form: { getFieldDecorator },
    } = this.props;

    const { testData } = this.state;

    const detail = JSON.parse(value);

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
          })(<Input disabled={!modify} />)}
        </Form.Item>

        <Form.Item label="用户名" {...layout}>
          {getFieldDecorator('user', {
            initialValue: detail.user || '',
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
            initialValue: detail.sql || '',
            rules: [
              {
                required: true,
                message: '请输入 SQL',
              },
            ],
          })(<TextArea disabled={!modify} />)}
        </Form.Item>

        <Form.Item label="测试" {...layout}>
          <Button onClick={this.handleQueryData}>测试</Button>
          <TextArea
            disabled
            value={JSON.stringify(testData, null, 2)}
            autosize={{ minRows: 2, maxRows: 20 }}
          />
        </Form.Item>
      </Fragment>
    );
  }
}

export default DatabaseForm;
