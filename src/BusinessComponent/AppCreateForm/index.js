import React, { Component } from 'react';
import { Form, Input, DatePicker, Select, Upload, Button, Icon } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

const { TextArea } = Input;
const { Option } = Select;

@connect(({ app, loading }) => ({
  app,
  loading,
}))
@Form.create()
class AppCreateFrom extends Component {
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      form: { validateFields },
      onSubmit,
    } = this.props;
    validateFields((err, values) => {
      if (!err) {
        onSubmit({
          ...values,
          start_time: values.start_time ? values.start_time.valueOf() : '',
          end_time: values.end_time ? values.end_time.valueOf() : '',
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      app: { pageThemes, componentThemes },
      detail = {},
    } = this.props;

    const formItemLayout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 10,
      },
    };
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

        <Form.Item label="页面主题" {...formItemLayout}>
          {getFieldDecorator('page_theme_id', {
            initialValue: detail.page_theme_id || '',
            rules: [
              {
                required: true,
                message: '请选择页面主题',
              },
            ],
          })(
            <Select>
              {pageThemes.map(v => (
                <Option key={v.id} value={v.id}>
                  {v.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="组件默认主题" help="组件默认主题可以被自定义样式覆盖" {...formItemLayout}>
          {getFieldDecorator('com_theme_id', {
            initialValue: detail.com_theme_id || '',
            rules: [
              {
                required: true,
                message: '请选择组件默认主题',
              },
            ],
          })(
            <Select>
              {componentThemes.map(v => (
                <Option key={v.id} value={v.id}>
                  {v.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item label="访问控制" {...formItemLayout}>
          {getFieldDecorator('access', {
            initialValue: detail.access || 1,
            rules: [
              {
                required: true,
                message: '请选择用户访问模式',
              },
            ],
          })(
            <Select>
              <Option key={1} value={1}>
                所有人可以访问
              </Option>
              <Option key={2} value={1}>
                密码
              </Option>
              <Option key={3} value={1}>
                登录访问
              </Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Logo" {...formItemLayout}>
          {getFieldDecorator('logo', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
            // initialValue: detail.logo || '',
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>
          )}
        </Form.Item>

        <Form.Item label="自动上线时间" help="若不设置则【立即上线】" {...formItemLayout}>
          {getFieldDecorator('start_time', {
            initialValue: detail.start_time ? moment.unix(detail.start_time) : null,
          })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
        </Form.Item>

        <Form.Item label="自动下线时间" help="若不设置则【一直保持在线状态】" {...formItemLayout}>
          {getFieldDecorator('end_time', {
            initialValue: detail.end_time ? moment.unix(detail.end_time) : null,
          })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
        </Form.Item>

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
