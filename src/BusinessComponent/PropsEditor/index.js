import React, { Component, Fragment } from 'react';
import { Input, Form, Row, Col, InputNumber, Button } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import ComEditor from '@/BusinessComponent/ComEditor';

const typeName = {
  chart: '图表',
  page: '页面',
  text: '文案',
};

const FormItem = ({ children, ...rest }) => (
  <Form.Item
    {...rest}
    style={{ marginBottom: 10, height: 30 }}
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 18 }}
  >
    {children}
  </Form.Item>
);

@connect(({ design, loading, data }) => ({
  design,
  loading,
  sourceData: data,
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
  handleSubmitEchartOpt = (echartOpt, source) => {
    const { dispatch, comId } = this.props;
    dispatch({
      type: 'design/changeEchartOpt',
      payload: {
        comId,
        echartOpt,
      },
    });

    dispatch({
      type: 'design/changeDataOpt',
      payload: {
        comId,
        source,
      },
    });
  };

  // 打开 配置弹窗
  handleComEditor = (id, data) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'design/toggleComEditor',
      payload: { show: true },
    });
  };

  render() {
    const {
      data,
      form: { getFieldDecorator },
      comId,
      layout,
      sourceData: { list },
    } = this.props;

    return (
      <div className={styles.container}>
        {data && (
          <Fragment>
            <Form>
              <div className={styles.block}>
                <h3>信息</h3>
                <FormItem label="id">
                  <Input size="small" disabled value={comId} />
                </FormItem>

                <FormItem label="名称">
                  {getFieldDecorator('name', {})(<Input size="small" />)}
                </FormItem>
              </div>
              <div className={styles.block}>
                <h3>配置</h3>
                <Button style={{ width: '100%' }} type="primary" onClick={this.handleComEditor}>
                  组件配置
                </Button>
              </div>
              <div className={styles.block}>
                <h3>样式</h3>
                <Row gutter={5}>
                  <Col span={12}>
                    <FormItem label="宽度">
                      {getFieldDecorator('width', {})(
                        <InputNumber disabled min={1} style={{ width: '80%' }} size="small" />
                      )}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label="高度">
                      {getFieldDecorator('height', {})(
                        <InputNumber disabled min={1} style={{ width: '80%' }} size="small" />
                      )}
                    </FormItem>
                  </Col>
                </Row>

                <Row gutter={5}>
                  <Col span={12}>
                    <FormItem label="X">
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
                    <FormItem label="Y">
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
              {/* <TabPane tab="属性树" key="4" style={{ overflowY: 'scroll' }}>
                  <ReactJson
                    name={false}
                    src={data}
                    style={{ height: 600 }}
                    collapsed={3}
                    displayDataTypes={false}
                  />
                </TabPane> */}
            </Form>

            <ComEditor
              echartOpt={data.echartOpt}
              comId={comId}
              source={data.source}
              data={data}
              onSubmit={this.handleSubmitEchartOpt}
              userDataList={list}
            />
          </Fragment>
        )}
      </div>
    );
  }
}

export default Com;
