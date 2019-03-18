import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card, Avatar, Button, Tabs } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';
import AppCardList from './AppCardList';
import DataCardList from './DataCardList';

const { TabPane } = Tabs;

@connect(({ app, global, data, loading }) => ({
  app,
  data,
  global,
  currentUserLoading: loading.effects['global/getGlobalUserInfo'],
  appLoading: loading.effects['app/fetchUserAppList'],
  dataLoading: loading.effects['app/fetchUserDataSource'],
}))
class Workplace extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/fetchUserAppList',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  changeTab = key => {
    switch (key) {
      case 'app':
        this.props.dispatch({
          type: 'app/fetchUserAppList',
        });
        break;
      case 'data':
        this.props.dispatch({
          type: 'data/fetchUserDataList',
        });
        break;

      default:
        break;
    }
  };

  render() {
    const {
      global: { userInfo: currentUser },
      currentUserLoading,
      appLoading,
      dataLoading,
      app: { list: appList },
      data: { list: dataList },
    } = this.props;

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div>
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              早安，
              {currentUser.nickname}
              ，祝你开心每一天！
            </div>
            <div>{currentUser.describe}</div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>项目数</p>
          <p>56</p>
        </div>
        <div className={styles.statItem}>
          <p>团队内排名</p>
          <p>
            8<span> / 24</span>
          </p>
        </div>
        <div className={styles.statItem}>
          <p>项目访问</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <PageHeaderWrapper
        loading={currentUserLoading}
        content={pageHeaderContent}
        extraContent={extraContent}
      >
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <Tabs defaultActiveKey="app" onChange={this.changeTab} size="large">
                <TabPane tab="我的应用" key="app" style={{ padding: 10 }} loading={appLoading}>
                  <AppCardList data={appList} />
                </TabPane>
                <TabPane tab="我的数据" key="data" style={{ padding: 10 }} loading={dataLoading}>
                  <DataCardList data={dataList} />
                </TabPane>
              </Tabs>
            </Card>
          </Col>
          <Col xl={6} lg={6} md={6} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="操作"
              bordered={false}
              loading={appLoading}
              bodyStyle={{ padding: 20 }}
            >
              <Link to="/app/application/create">
                <Button style={{ width: '100%', marginBottom: '10px' }} type="primary">
                  新建应用
                </Button>
              </Link>
              <Link to="/app/data/create">
                <Button style={{ width: '100%' }} type="primary">
                  新建数据
                </Button>
              </Link>
            </Card>
          </Col>
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
