import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../style.less';

const { Step } = Steps;

export default class StepForm extends PureComponent {
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    switch (pathList[pathList.length - 1]) {
      case 'base':
        return 0;
      case 'content':
        return 1;
      case 'form':
        return 2;
      default:
        return 0;
    }
  }

  handleChangeStep = type => {
    const id = this.props.location.query.id;
    if (id) {
      router.push(`/activity/create/${type}?id=${id}`);
    }
  };

  render() {
    const { location, children } = this.props;
    return (
      <PageHeaderWrapper title="创建活动" tabActiveKey={location.pathname}>
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="会议基本信息" onClick={() => this.handleChangeStep('base')} />
              <Step title="会议内容" onClick={() => this.handleChangeStep('content')} />
              <Step title="报名表单" onClick={() => this.handleChangeStep('form')} />
            </Steps>
            {children}
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
