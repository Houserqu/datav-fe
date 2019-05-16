import React, { Component, Fragment } from 'react';
import { Form, Input, DatePicker, Select, Upload, Button, message, InputNumber } from 'antd';
import { connect } from 'dva';
import AceEditor from 'react-ace';
import brace from 'brace';
import { dataType } from '@/constant';
import JSONForm from './JSONForm';
import DatabaseForm from './DatabaseForm';
import { queryDataBySql } from '@/services/data';

const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};

@connect(({ loading }) => ({
  loading,
}))
@Form.create()
class AppCreateFrom extends Component {
  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      onSubmit,
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        onSubmit(values);
      }
    });
  };

  renderContentForm = type => {
    switch (type) {
      case 1:
        return <JSONForm />;
      case 2:
        return <DatabaseForm />;
      case 3:
        return <JSONForm />;
      case 4:
        return <JSONForm />;
      default:
        return <Fragment />;
    }
  };

  // 请求数据
  handleQueryData = async () => {
    const {
      data: { curData: detail },
    } = this.props;

    if (detail.type === 2) {
      try {
        const res = await queryDataBySql(JSON.parse(detail.content));
        if (res.success) {
          this.setState({ testData: res.data });
        }
      } catch (error) {
        message.error(error.message);
      }
    }
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      detail = {},
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label="名称" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: detail.name || '',
            rules: [
              {
                required: true,
                message: '请输入应用名称',
              },
            ],
          })(<Input />)}
        </Form.Item>

        <Form.Item label="介绍" {...formItemLayout}>
          {getFieldDecorator('describe', {
            initialValue: detail.describe || '',
          })(<TextArea />)}
        </Form.Item>

        <Form.Item label="数据类型" {...formItemLayout}>
          {getFieldDecorator('type', {
            initialValue: detail.type || 1,
            rules: [
              {
                required: true,
                message: '请选择数据类型',
              },
            ],
          })(
            <Select>
              {Object.keys(dataType).map(k => (
                <Option key={k} value={Number(k)}>
                  {dataType[k]}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          label="刷新时间"
          {...formItemLayout}
          help="再次请求数据的间隔时间，若为 0 则不刷新（单位【毫秒】）。"
        >
          {getFieldDecorator('refresh', {
            initialValue: detail.refresh || 0,
            rules: [
              {
                required: true,
                message: '请输入应用名称',
              },
            ],
          })(<InputNumber min={0} />)}
        </Form.Item>

        {getFieldDecorator('content', {
          initialValue: detail.content || '{}',
          rules: [
            {
              required: true,
              message: '请输入应用名称',
            },
          ],
        })(this.renderContentForm(getFieldValue('type')))}

        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: {
              span: formItemLayout.wrapperCol.span,
              offset: formItemLayout.labelCol.span,
            },
          }}
          label=""
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default AppCreateFrom;
