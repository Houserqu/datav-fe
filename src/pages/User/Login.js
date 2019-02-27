import React, { Component } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import Link from 'umi/link';
import { Checkbox, Alert, Icon, Input } from 'antd';
import Login from '@/components/Login';
import styles from './Login.less';
import { API_DOMAIN } from '@/constant';

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

const getCaptchaSrc = () => {
  return `${API_DOMAIN}/api/auth/captcha?${Math.floor(Math.random() * 100)}`;
};

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
class LoginPage extends Component {
  state = {
    type: 'account',
    autoLogin: true,
    captchaSrc: getCaptchaSrc(),
  };

  onTabChange = type => {
    this.setState({ type });
  };

  onGetCaptcha = () =>
    new Promise((resolve, reject) => {
      this.loginForm.validateFields(['phone'], {}, (err, values) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;

          dispatch({
            type: 'login/getCaptcha',
            payload: { phone: values.phone },
          })
            .then(resolve)
            .catch(reject);
        }
      });
    });

  handleSubmit = (err, values) => {
    // 登录类型 账号 、手机
    const { type } = this.state;
    const { dispatch } = this.props;

    if (!err) {
      if (type === 'mobile') {
        dispatch({
          type: 'login/phoneLogin',
          payload: values,
        });
      }

      if (type === 'account') {
        dispatch({
          type: 'login/login',
          payload: { ...values, captcha: '123' },
        });
      }
    }
  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => (
    <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />
  );

  // 刷新验证码图片
  refreshCaptcha = () => {
    this.setState({ captchaSrc: getCaptchaSrc() });
  };

  render() {
    const { login, submitting } = this.props;
    const { type, autoLogin, captchaSrc } = this.state;
    return (
      <div className={styles.main}>
        <Login
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          ref={form => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'app.login.tab-login-credentials' })}>
            <UserName
              name="mail"
              placeholder="用户名"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
              type="email"
              defaultValue="houserqu@qq.com"
            />
            <Password
              name="password"
              placeholder={formatMessage({ id: 'app.login.password' })}
              rules={[
                {
                  required: true,
                  message: '请输入密码',
                },
              ]}
              defaultValue="382027881"
              onPressEnter={() => this.loginForm.validateFields(this.handleSubmit)}
            />
            {/* <UserName
              name="captcha"
              placeholder='验证码'
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                },
              ]}
            />
            <div className="captcha" style={{ margin: '0 2px 24px' }}>
              <img alt="" id="captcha" onClick={this.refreshCaptcha} style={{ width: '120px', height: '35px' }} src={captchaSrc} />
            </div> */}
          </Tab>
          <Tab key="mobile" tab={formatMessage({ id: 'app.login.tab-login-mobile' })}>
            {login.status === 'error' &&
              login.type === 'mobile' &&
              !submitting &&
              this.renderMessage(
                formatMessage({ id: 'app.login.message-invalid-verification-code' })
              )}
            <Mobile
              name="phone"
              placeholder={formatMessage({ id: 'form.phone-number.placeholder' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.phone-number.required' }),
                },
                {
                  pattern: /^1\d{10}$/,
                  message: formatMessage({ id: 'validation.phone-number.wrong-format' }),
                },
              ]}
            />
            <Captcha
              name="checkCode"
              placeholder={formatMessage({ id: 'form.verification-code.placeholder' })}
              countDown={120}
              onGetCaptcha={this.onGetCaptcha}
              getCaptchaButtonText={formatMessage({ id: 'form.get-captcha' })}
              getCaptchaSecondText={formatMessage({ id: 'form.captcha.second' })}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'validation.verification-code.required' }),
                },
              ]}
            />
          </Tab>
          {/* <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              <FormattedMessage id="app.login.remember-me" />
            </Checkbox>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="app.login.forgot-password" />
            </a>
          </div> */}
          <Submit loading={submitting}>
            <FormattedMessage id="app.login.login" />
          </Submit>
          <div className={styles.other}>
            {/* <FormattedMessage id="app.login.sign-in-with" /> */}
            {/* <Icon type="alipay-circle" className={styles.icon} theme="outlined" />
            <Icon type="taobao-circle" className={styles.icon} theme="outlined" />
            <Icon type="weibo-circle" className={styles.icon} theme="outlined" /> */}
            <Link className={styles.register} to="/user/register">
              <FormattedMessage id="app.login.signup" />
            </Link>
          </div>
        </Login>
      </div>
    );
  }
}

export default LoginPage;
