import React, { Component } from 'react';
import { Modal, Form, Input, Row, Col, Button } from 'antd';
import { formatMessage } from 'umi/locale';

const FormItem = Form.Item;
const InputGroup = Input.Group;

@Form.create()
class ChangePDModal extends Component {
  state = {
    count: 0,
  };

  onGetCaptcha = async () => {
    // let count = 59;
    // this.setState({ count });
    // this.interval = setInterval(() => {
    //   count -= 1;
    //   this.setState({ count });
    //   if (count === 0) {
    //     clearInterval(this.interval);
    //   }
    // }, 1000);
    // const { getFieldValue } = this.props.form;
    // const phone = getFieldValue('phone');
    // if (res.statusCode === 200) {
    //   message.success(res.message);
    // }
  };

  handleSubmit = () => {
    const { form, submit } = this.props;
    form.validateFields((err, values) => {
      console.log(values);
      if (!err) {
        submit({ ...values, password2: values.password });
      }
    });
  };

  render() {
    const {
      visible,
      form: { getFieldDecorator },
      onCancel,
    } = this.props;
    const { count } = this.state;

    return (
      <Modal title="修改密码" visible={visible} onOk={this.handleSubmit} onCancel={onCancel}>
        <Form>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input size="large" placeholder="新密码" />)}
          </FormItem>

          <FormItem>
            <InputGroup compact>
              {getFieldDecorator('phone', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'validation.phone-number.required' }),
                  },
                  {
                    pattern: /^\d{11}$/,
                    message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                  },
                ],
              })(
                <Input
                  size="large"
                  placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
                />
              )}
            </InputGroup>
          </FormItem>

          <FormItem>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('checkCode', {
                  rules: [
                    {
                      required: true,
                      message: formatMessage({ id: 'validation.verification-code.required' }),
                    },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
                  />
                )}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count}
                  // className={styles.getCaptcha}
                  style={{ width: '100%' }}
                  onClick={this.onGetCaptcha}
                >
                  {count
                    ? `${count} s`
                    : formatMessage({ id: 'app.register.get-verification-code' })}
                </Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default ChangePDModal;
