import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card, List, Avatar, Button, Tag, Icon } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './Index.less';
import { appStatusColor, appStatus } from '@/constant';

@connect(({ app, global, loading }) => ({
  app,
  global,
  currentUserLoading: loading.effects['global/getGlobalUserInfo'],
  appLoading: loading.effects['app/getUserAppList'],
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

  renderActivities() {
    const {
      activities: { list },
    } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      global: { userInfo: currentUser },
      currentUserLoading,
      appLoading,
      app: { list: appList },
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
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={appLoading}
              bodyStyle={{ padding: 0 }}
            >
              {appList.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card
                    bodyStyle={{ padding: 0, height: 100 }}
                    bordered={false}
                    actions={[
                      <Tag color={appStatusColor[item.status]}>{appStatus[item.status]}</Tag>,
                      <Fragment>
                        <Link to={`/app/application/edit/${item.id}`}>
                          <Icon type="edit" />
                          编辑
                        </Link>
                      </Fragment>,
                      <Fragment>
                        <Icon type="setting" />
                        设置
                      </Fragment>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={item.logo} />
                          <Link to={`/app/application/detail/${item.id}`}>{item.name}</Link>
                        </div>
                      }
                      description={item.describe}
                    />
                    <div className={styles.projectItemContent}>
                      <Link to={`/app/application/detail/${item.id}`}>{item.member || ''}</Link>
                      {item.update_time && (
                        <span className={styles.datetime} title={item.update_time}>
                          {moment(item.updatedAt).fromNow()}
                        </span>
                      )}
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>

            {/* <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="动态"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>{this.renderActivities()}</div>
              </List>
            </Card> */}
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
                <Button style={{ width: '100%' }} type="primary">
                  新建应用
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
