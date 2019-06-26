import React, { Fragment, Component } from 'react';
import { Input, Form, Button, message } from 'antd';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/xcode';
import 'brace/mode/json';
import { queryDataBySql } from '@/services/data';
import { request } from '@/utils/http';

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
      form: { validateFields },
    } = this.props;

    validateFields(async (err, values) => {
      try {
        const res = await request(values.url, { method: values.method }, { noDomain: true });
        this.setState({ testData: res });
      } catch (error) {
        message.error(error.message);
      }
    });
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
        <Form.Item label="url" {...layout}>
          {getFieldDecorator('url', {
            initialValue: detail.url || '',
            rules: [
              {
                required: true,
                message: '请输入应用名称',
              },
            ],
          })(<Input disabled={!modify} />)}
        </Form.Item>

        <Form.Item label="请求类型" {...layout}>
          {getFieldDecorator('method', {
            initialValue: detail.method || '',
          })(<Input disabled={!modify} />)}
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
