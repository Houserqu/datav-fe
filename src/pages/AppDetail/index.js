import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card, List, Avatar, Table, Divider, Button, Switch, Modal } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './index.less';
import { appAccessStatus, appStatus } from '@/constant';
import router from 'umi/router';

const { Description } = DescriptionList;
const { Group: ButtonGroup } = Button;

@connect(({ app, loading }) => ({
  app,
  loading: loading.effects['app/getAppDetailI'],
}))
class AppDetail extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;

    dispatch({
      type: 'app/fetchAppDetail',
      payload: { id },
    });
  }

  handleToggleStatus = async () => {
    const {
      app: {
        curApp: { id, status },
      },
      dispatch,
    } = this.props;
    if (id && id !== 3) {
      await dispatch({
        type: 'app/toggleStatus',
        payload: { id, status: status === 1 ? 2 : 1 },
      });
    }
  };

  showDel = () => {
    Modal.confirm({
      title: '删除',
      content: <p style={{ color: 'red' }}>删除后数据无法恢复，确定删除应用吗？</p>,
      onOk: this.handleDel,
    });
  };

  handleDel = () => {
    const {
      app: {
        curApp: { id },
      },
      dispatch,
    } = this.props;
    dispatch({
      type: 'app/deleteApp',
      payload: { id },
      callback: res => {
        if (res.success) {
          router.push('/app/dashboard');
        }
      },
    });
  };

  render() {
    const {
      loading,
      app: { curApp: detail },
      match: { params },
    } = this.props;

    const action = (
      <Fragment>
        <b style={{ color: '#1890FF' }}>状态:</b>
        <Switch
          onChange={this.handleToggleStatus}
          style={{ margin: '0 20px 0 10px' }}
          checkedChildren="在线"
          unCheckedChildren="下线"
          checked={detail.status === 1}
          disabled={detail.status === 3}
          loading={loading}
        />
        <ButtonGroup>
          <Button onClick={() => router.push(`/app/application/edit${params.id}`)}>编辑</Button>
          <Button onClick={this.showDel} type="danger">
            删除
          </Button>
        </ButtonGroup>

        <Button type="primary">进入设计面板</Button>
      </Fragment>
    );

    return (
      <PageHeaderWrapper
        // loading={currentUserLoading}
        // content={pageHeaderContent}
        title="应用详情"
        action={action}
      >
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} title={detail.name}>
              <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
                <Description term="名称">{detail.name}</Description>
                <Description term="介绍">{detail.describe}</Description>
                <Description term="logo">{detail.logo}</Description>
                <Description term="创建时间">
                  {moment(detail.create_time).format('YY-MM-DD hh:mm')}
                </Description>
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />
              <DescriptionList size="large" title="访问控制" style={{ marginBottom: 32 }}>
                <Description term="访问类型">{appAccessStatus[detail.access]}</Description>
                <Description term="上线时间">
                  {detail.start_time
                    ? moment.unix(detail.start_time).format('YY-MM-DD hh:mm:ss')
                    : '立即上线'}
                </Description>
                <Description term="下线时间">
                  {detail.end_time
                    ? moment.unix(detail.end_time).format('YY-MM-DD hh:mm:ss')
                    : '不下线'}
                </Description>
              </DescriptionList>
              <DescriptionList size="large" title="主题配置" style={{ marginBottom: 32 }}>
                <Description term="页面主题">{detail.page_theme_id}</Description>
                <Description term="组件主题">{detail.com_theme_id}</Description>
              </DescriptionList>
              <Divider style={{ marginBottom: 32 }} />
              <div className={styles.title}>PV统计</div>
              <Table
                style={{ marginBottom: 24 }}
                pagination={false}
                loading={loading}
                dataSource={[]}
                columns={[]}
                rowKey="id"
              />
              <div className={styles.title}>UV统计</div>
              <Table
                style={{ marginBottom: 16 }}
                pagination={false}
                loading={loading}
                dataSource={[]}
                columns={[]}
              />
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default AppDetail;
