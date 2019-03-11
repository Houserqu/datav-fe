import React, { Component, Fragment } from 'react';
import { Input, Form, Row, Col } from 'antd';
import styles from './index.less';

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

@Form.create({
  mapPropsToFields: props => {
    console.log(props);
    return {
      width: Form.createFormField({ value: props.width }),
      height: Form.createFormField(props.height),
    };
  },
  onFieldsChange: ({ onFiledChange, comId }, values) => {
    onFiledChange(comId, values);
  },
})
class Com extends Component {
  state = {};

  render() {
    const {
      data,
      form: { getFieldDecorator },
    } = this.props;
    console.log(data);

    return (
      <div className={styles.container}>
        {data && (
          <Fragment>
            <h2 className={styles.title}>{typeName[data.type]}</h2>
            <Form>
              <div className={styles.block}>
                <Row>
                  <Col span={12}>
                    <FormItem
                      style={{ marginBottom: 10, height: 30 }}
                      label="高度"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                    >
                      {getFieldDecorator('width', {})(
                        <Input style={{ width: '70px' }} size="small" />
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
                        <Input style={{ width: '70px' }} size="small" />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </div>
            </Form>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Com;
