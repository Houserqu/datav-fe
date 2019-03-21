import React, { Component } from 'react';
import { Select, Form } from 'antd';
import * as R from 'ramda';
import DataEditInfo from './DataEditInfo';

const { Option } = Select;

const FormItem = ({ children, ...rest }) => (
  <Form.Item
    {...rest}
    style={{ marginBottom: 10, height: 30 }}
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 20 }}
  >
    {children}
  </Form.Item>
);

export default class DataEdit extends Component {
  // constructor(props) {
  //   super(props);

  //   // 初始化当前组件已配置数据源
  //   const { userData, sourceId } = this.props;
  //   this.state = {
  //     source: R.find(R.propEq('id', sourceId))(userData) || null,
  //   };
  // }

  // componentWillReceiveProps(nextProps) {
  //   // TODO: 切换组件 数据没有更新
  //   if (nextProps.sourceId !== this.props.sourceId) {
  //     this.setState({
  //       source: R.find(R.propEq('id', nextProps.sourceId))(nextProps.userData) || null,
  //     });
  //   }
  // }

  // 切换数据源
  handleSelectData = v => {
    const { onSubmit } = this.props;
    onSubmit(v);
  };

  render() {
    const { userData = [], sourceId = '' } = this.props;
    const data = R.find(R.propEq('id', sourceId))(userData);

    return (
      <div style={{ padding: 5 }}>
        <FormItem label="数据">
          <Select size="small" value={sourceId} onChange={this.handleSelectData}>
            {userData.map(v => (
              <Option key={v.id} value={v.id}>
                {v.name}
              </Option>
            ))}
          </Select>
        </FormItem>

        {sourceId && (
          <FormItem label="内容">
            <DataEditInfo data={data} type={data.type} />
          </FormItem>
        )}

        {/* <FormItem label="操作">
          <Group style={{ marginBottom: 10, marginLeft: 10 }}>
            <Button key="submit" type="primary" size="small" onClick={this.handleSubmit}>
              提交
            </Button>
            <Button key="reset" size="small" onClick={this.resetEditor}>
              重置
            </Button>
          </Group>
        </FormItem> */}
      </div>
    );
  }
}
