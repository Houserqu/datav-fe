import React, { Component, Fragment } from 'react';
import { Input, Form, Row, Col, InputNumber, Tabs } from 'antd';
import { connect } from 'dva';
import ReactJson from 'react-json-view';
import styles from './index.less';
import EchartEdit from './EchartEdit';

const { TabPane } = Tabs;
const { TextArea } = Input;

const typeName = {
  chart: '图表',
  page: '页面',
  text: '文案',
};

const FormItem = ({ children, ...rest }) => (
  <Form.Item {...rest} style={{ marginBottom: 10, height: 30 }}>
    {children}
  </Form.Item>
);

@connect(({ design, loading }) => ({
  design,
  loading,
}))
@Form.create({
  mapPropsToFields: props => ({
    width: Form.createFormField({ value: props.layout.w, type: 'layout' }),
    height: Form.createFormField({ value: props.layout.h, type: 'layout' }),
    x: Form.createFormField({ value: props.layout.x, type: 'layout' }),
    y: Form.createFormField({ value: props.layout.y, type: 'layout' }),
    name: Form.createFormField({ value: props.info.name, type: 'info' }),
  }),
  onFieldsChange: ({ onFiledChange, comId }, values) => {
    onFiledChange(comId, values);
  },
})
class Com extends Component {
  handleSubmitEchartOpt = value => {
    console.log(value);
    // this.setState({})
    const { dispatch, comId } = this.props;
    dispatch({
      type: 'design/changeEchartOpt',
      payload: {
        comId,
        echartOpt: value,
      },
    });
  };

  render() {
    const {
      data,
      form: { getFieldDecorator },
      comId,
      layout,
    } = this.props;

    return (
      <div className={styles.container}>
        {data && (
          <Fragment>
            <Form>
              <Tabs defaultActiveKey="1" size="small">
                <TabPane tab="样式" key="1">
                  <div className={styles.block}>
                    <h3>信息</h3>
                    <FormItem
                      style={{ marginBottom: 10, height: 40 }}
                      label="id"
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 20 }}
                    >
                      <Input size="small" disabled value={comId} />
                    </FormItem>

                    <FormItem
                      style={{ marginBottom: 10, height: 40 }}
                      label="名称"
                      labelCol={{ span: 4 }}
                      wrapperCol={{ span: 20 }}
                    >
                      {getFieldDecorator('name', {})(<Input size="small" />)}
                    </FormItem>
                  </div>
                  <div className={styles.block}>
                    <h3>样式</h3>
                    <Row gutter={5}>
                      <Col span={12}>
                        <FormItem
                          style={{ marginBottom: 10, height: 30 }}
                          label="宽度"
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 16 }}
                        >
                          {getFieldDecorator('width', {})(
                            <InputNumber disabled min={1} style={{ width: '100%' }} size="small" />
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem
                          style={{ marginBottom: 10, height: 40 }}
                          label="高度"
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 16 }}
                        >
                          {getFieldDecorator('height', {})(
                            <InputNumber disabled min={1} style={{ width: '100%' }} size="small" />
                          )}
                        </FormItem>
                      </Col>
                    </Row>

                    <Row gutter={5}>
                      <Col span={12}>
                        <FormItem
                          style={{ marginBottom: 10, height: 30 }}
                          label="X"
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 16 }}
                        >
                          {getFieldDecorator('x', {})(
                            <InputNumber
                              disabled
                              max={24}
                              min={0}
                              style={{ width: '100%' }}
                              size="small"
                            />
                          )}
                        </FormItem>
                      </Col>
                      <Col span={12}>
                        <FormItem
                          style={{ marginBottom: 10, height: 40 }}
                          label="Y"
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 16 }}
                        >
                          {getFieldDecorator('y', {})(
                            <InputNumber
                              disabled
                              max={24}
                              min={0}
                              style={{ width: '100%' }}
                              size="small"
                            />
                          )}
                        </FormItem>
                      </Col>
                    </Row>
                  </div>
                  <div className={styles.block}>
                    <h3>组件属性表</h3>
                    <table className={styles.propsTable}>
                      <thead>
                        <tr>
                          <th>key</th>
                          <th>value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {layout &&
                          Object.keys(layout).map(key => (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>{layout[key]}</td>
                            </tr>
                          ))}
                        {data &&
                          data.style &&
                          Object.keys(data.style).map(key => (
                            <tr key={key}>
                              <td>{key}</td>
                              <td>{layout[key]}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </TabPane>
                <TabPane tab="图表" key="2">
                  <EchartEdit
                    data={data.echartOpt}
                    comId={comId}
                    onSubmit={this.handleSubmitEchartOpt}
                  />
                </TabPane>
                <TabPane tab="数据源" key="3">
                  Content of Tab Pane 3
                </TabPane>
                <TabPane tab="属性树" key="4" style={{ overflowY: 'scroll' }}>
                  <ReactJson
                    name={false}
                    src={data}
                    style={{ height: 600 }}
                    collapsed={3}
                    displayDataTypes={false}
                  />
                </TabPane>
              </Tabs>
            </Form>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Com;
