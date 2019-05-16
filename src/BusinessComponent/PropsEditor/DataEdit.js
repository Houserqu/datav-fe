import React, { Component } from 'react';
import { Select, Form, Button } from 'antd';
import * as R from 'ramda';
import DataEditInfo from './DataEditInfo';

const { Option } = Select;
const { Group } = Button;

const FormItem = ({ children, ...rest }) => (
  <Form.Item
    {...rest}
    style={{ marginBottom: 10, height: 30 }}
    labelCol={{ span: 2 }}
    wrapperCol={{ span: 22 }}
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
    const { userData = [], source = '' } = this.props;

    const data = source === -1 ? { type: -1 } : R.find(R.propEq('id', source))(userData);

    return (
      <div style={{ padding: 5 }}>
        <FormItem label="数据">
          <Select
            size="small"
            value={source}
            onChange={this.handleSelectData}
            style={{ width: 200 }}
          >
            {userData.map(v => (
              <Option key={v.id} value={v.id}>
                {v.name}
              </Option>
            ))}
            <Option key={-1} value={-1}>
              组件自定义
            </Option>
          </Select>
        </FormItem>

        {source && (
          <FormItem label="内容">
            <DataEditInfo data={data} type={data.type} />
          </FormItem>
        )}
      </div>
    );
  }
}
