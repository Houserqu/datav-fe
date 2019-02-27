import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Card, List, Avatar } from 'antd';

import { Radar } from '@/components/Charts';
import EditableLinkGroup from '@/components/EditableLinkGroup';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { PAGE_SIZE, IMG_DOMAIN } from '@/constant';

import styles from './Workplace.less';

const links = [
  {
    title: '操作一',
    href: '',
  },
  {
    title: '操作二',
    href: '',
  },
  {
    title: '操作三',
    href: '',
  },
  {
    title: '操作四',
    href: '',
  },
  {
    title: '操作五',
    href: '',
  },
  {
    title: '操作六',
    href: '',
  },
];

@connect(({ user, activities, chart, loading, activity }) => ({
  currentUser: user.currentUser,
  activities,
  chart,
  user,
  activity,
  currentUserLoading: loading.effects['user/fetchCurrent'],
  projectLoading: loading.effects['project/fetchNotice'],
  activitiesLoading: loading.effects['activities/fetchList'],
}))
class Workplace extends PureComponent {
  state = {
    signupList: [],
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'activity/fetch',
      payload: {
        rows: PAGE_SIZE,
        page: 1,
      },
    });

    dispatch({
      type: 'activity/loadSignupDataSet',
      callback: res => {
        if (res.statusCode === 200) {
          this.setState({ signupList: res.data.dataSet.rows });
        }
      },
    });
  }

  renderActivities() {
    const { signupList } = this.state;
    return signupList.map(item => {
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.name}</a>
                <span className={styles.event}>报名会议</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.time}>
                {item.time}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      currentUser,
      currentUserLoading,
      projectLoading,
      activitiesLoading,
      activity: { list },
    } = this.props;

    const pageHeaderContent =
      currentUser && Object.keys(currentUser).length ? (
        <div className={styles.pageHeaderContent}>
          {/* <div className={styles.avatar}>
            <Avatar size="large" src={currentUser.avatar} />
          </div> */}
          <div className={styles.content}>
            <div className={styles.contentTitle}>
              {currentUser.username}
              ，祝你开心每一天！
            </div>
            <div>{currentUser.username}</div>
          </div>
        </div>
      ) : null;

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>会议数</p>
          <p>{list.length}</p>
        </div>
        <div className={styles.statItem}>
          <p>报名数</p>
          <p>223</p>
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
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={styles.projectList}
              style={{ marginBottom: 24 }}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/activity/basic-list">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{ padding: 0 }}
            >
              {list.map(item => (
                <Card.Grid className={styles.projectGrid} key={item.id}>
                  <Card bodyStyle={{ padding: 0 }} bordered={false}>
                    <Card.Meta
                      title={
                        <div className={styles.cardTitle}>
                          <Avatar size="small" src={`${IMG_DOMAIN}${item.metLogo}`} />
                          <Link to={`/activity/create/base?id=${item.id}`}>{item.title}</Link>
                        </div>
                      }
                      description={item.title}
                    />
                    <div className={styles.projectItemContent}>
                      {item.organiser || ''}
                      <span className={styles.datetime} title={item.updatedAt}>
                        {moment(item.createTime).fromNow()}
                      </span>
                    </div>
                  </Card>
                </Card.Grid>
              ))}
            </Card>
            <Card
              bodyStyle={{ padding: 0 }}
              bordered={false}
              className={styles.activeCard}
              title="报名动态"
              loading={activitiesLoading}
            >
              <List loading={activitiesLoading} size="large">
                <div className={styles.activitiesList}>{this.renderActivities()}</div>
              </List>
            </Card>
          </Col>
          {/* <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{ marginBottom: 24 }}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{ padding: 0 }}
            >
              <EditableLinkGroup onAdd={() => {}} links={links} linkElement={Link} />
            </Card>
            <Card
              style={{ marginBottom: 24 }}
              bordered={false}
              title="XX 指数"
              loading={radarData.length === 0}
            >
              <div className={styles.chart}>
                <Radar hasLegend height={343} data={radarData} />
              </div>
            </Card>
            <Card
              bodyStyle={{ paddingTop: 12, paddingBottom: 12 }}
              bordered={false}
              title="团队"
              loading={projectLoading}
            >
              <div className={styles.members}>
                <Row gutter={48}>
                  {notice.map(item => (
                    <Col span={12} key={`members-item-${item.id}`}>
                      <Link to={item.href}>
                        <Avatar src={item.logo} size="small" />
                        <span className={styles.member}>{item.member}</span>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col> */}
        </Row>
      </PageHeaderWrapper>
    );
  }
}

export default Workplace;
