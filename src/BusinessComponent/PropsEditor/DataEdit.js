import React, { Component, Fragment } from 'react';
import AceEditor from 'react-ace';
import { Button, Select, Form } from 'antd';
import * as R from 'ramda';
import brace from 'brace';
import 'brace/theme/xcode';
import 'brace/mode/json';
import styles from './index.less';

const { Group } = Button;
const { Option } = Select;

const SourceDetail = ({ content, type }) => {
  const obj = JSON.parse(content);

  switch (type) {
    case 2:
      return (
        <Fragment>
          {Object.keys(obj).map(key => (
            <p key={key} className={styles.contentInfoItem}>
              <b>{key}</b>: {obj[key]}
            </p>
          ))}
        </Fragment>
      );
    case 1:
      return (
        <Fragment>
          <AceEditor
            mode="json"
            theme="xcode"
            readOnly
            name="UNIQUE_ID_OF_DIV"
            value={content}
            style={{ height: 600 }}
            editorProps={{ $blockScrolling: Infinity }}
            tabSize={2}
          />
        </Fragment>
      );
    default:
      return '无法显示';
  }
};

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
  constructor(props) {
    super(props);

    // 初始化当前组件已配置数据源
    const { userData, sourceId } = this.props;
    this.state = {
      source: R.find(R.propEq('id', sourceId))(userData) || null,
    };
  }

  componentWillReceiveProps(nextProps) {
    // TODO: 切换组件 数据没有更新
    if (nextProps.sourceId !== this.props.sourceId) {
      // this.setState({ tmpEchartOptString: JSON.stringify(nextProps.data, null, 2) });
    }
  }

  // 切换数据源
  handleSelectData = v => {
    const { userData = [] } = this.props;
    const data = R.find(R.propEq('id', v))(userData);

    this.setState({ source: data });
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { source } = this.state;
    onSubmit(source.id);
  };

  render() {
    const { userData = [], sourceId = '' } = this.props;
    const { source } = this.state;

    return (
      <div style={{ padding: 5 }}>
        <FormItem label="数据">
          <Select size="small" defaultValue={sourceId} onChange={this.handleSelectData}>
            {userData.map(v => (
              <Option key={v.id} value={v.id}>
                {v.name}
              </Option>
            ))}
          </Select>
        </FormItem>

        {source && (
          <FormItem label="内容">
            <SourceDetail content={source.content} type={source.type} />
          </FormItem>
        )}

        <FormItem label="操作">
          <Group style={{ marginBottom: 10, marginLeft: 10 }}>
            <Button key="submit" type="primary" size="small" onClick={this.handleSubmit}>
              提交
            </Button>
            <Button key="reset" size="small" onClick={this.resetEditor}>
              重置
            </Button>
          </Group>
        </FormItem>
      </div>
    );
  }
}
