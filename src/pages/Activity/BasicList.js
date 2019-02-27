import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import {
  List,
  Card,
  Row,
  Col,
  Radio,
  Input,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Tag,
  Modal,
  InputNumber,
} from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './BasicList.less';
import {
  PAGE_SIZE,
  IMG_DOMAIN,
  activityStatus,
  activityStatusTagColor,
  API_DOMAIN,
} from '@/constant';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(({ activity, loading, user }) => ({
  activity,
  loading: loading.models.activity,
  user,
}))
class BasicList extends PureComponent {
  state = {
    params: {},
    hotInput: 0,
  };

  formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };

  componentDidMount() {
    this.queryActivity();
  }

  queryActivity = (page = 1, params = {}) => {
    const {
      dispatch,
      user: { currentUser },
    } = this.props;
    dispatch({
      type: currentUser.tenantId === 1 ? 'activity/fetch_plant' : 'activity/fetch_tenant',
      payload: {
        rows: PAGE_SIZE,
        order: 'desc',
        sort: 'createTime',
        page,
        ...params,
      },
    });
  };

  search = v => {
    const value = v.target.value;
    let status = '';

    switch (value) {
      case 'all':
        status = '';
        break;
      case 'progress':
        status = '1,2,3';
        break;
      case 'end':
        status = '4,5';
        break;
      default:
        break;
    }

    this.setState({ params: { ...this.state.params, status } }, () => {
      this.queryActivity(1, this.state.params);
    });
  };

  handleSearchInput = v => {
    const value = v.target.value;
    this.setState({ params: { ...this.state.params, title: value } });
  };

  handleSearch = () => {
    this.queryActivity(1, this.state.params);
  };

  moreAction = ({ key }, { id }) => {
    const { dispatch } = this.props;

    if (key === 'hot') {
      Modal.confirm({
        title: '设置热门',
        content: (
          <InputNumber
            style={{ width: 200 }}
            placeholder="越大越靠前"
            onChange={e => this.setState({ hotInput: e })}
          />
        ),
        onOk: () => {
          dispatch({
            type: 'activity/setHot',
            payload: { id, metHot: this.state.hotInput },
          });
        },
      });
    }

    if (key === 'signup') {
      dispatch({
        type: 'activity/setStatus',
        payload: { status: 1, id },
      });
    }
    if (key === 'open') {
      dispatch({
        type: 'activity/setStatus',
        payload: { status: 3, id },
      });
    }
    if (key === 'end') {
      dispatch({
        type: 'activity/setStatus',
        payload: { status: 4, id },
      });
    }
    if (key === 'signup') {
      dispatch({
        type: 'activity/setStatus',
        payload: { status: 1, id },
      });
    }
    if (key === 'del') {
      dispatch({
        type: 'activity/setStatus',
        payload: { status: -1, id },
      });
    }
  };

  render() {
    const {
      activity: { list, total },
      loading,
      user: { currentUser },
    } = this.props;

    const { params } = this.state;
    const isAdmin = currentUser.tenantId === 1;

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup defaultValue="all" onChange={this.search}>
          <RadioButton value="all">全部</RadioButton>
          <RadioButton value="progress">进行中</RadioButton>
          <RadioButton value="end">已结束</RadioButton>
        </RadioGroup>
        <Input
          className={styles.extraContentSearch}
          allowClear
          placeholder="会议名称"
          value={params.title}
          onChange={this.handleSearchInput}
        />
        <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.handleSearch}>
          搜索
        </Button>
      </div>
    );

    const paginationProps = {
      showQuickJumper: true,
      pageSize: PAGE_SIZE,
      total,
    };

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const ListContent = ({
      data: { status, metEndTime, metStartTime, signupCount, metScale, metHot },
    }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>活动开始时间</span>
          <p>
            {moment(metStartTime).format('YYYY-MM-DD')}
            <br />
            {moment(metStartTime).format('HH:mm')}
          </p>
        </div>
        <div className={styles.listContentItem}>
          <span>活动结束时间</span>
          <p>
            {moment(metEndTime).format('YYYY-MM-DD')}
            <br />
            {moment(metEndTime).format('HH:mm')}
          </p>
        </div>
        <div className={styles.listContentItem}>
          <Progress
            percent={Number((signupCount / metScale).toFixed(2))}
            status="active"
            strokeWidth={6}
            style={{ width: 120 }}
          />
        </div>
        <div className={styles.listContentItem}>
          <span>状态</span>
          <div>
            <Tag color={activityStatusTagColor[status]}>{activityStatus[status]}</Tag>
          </div>
        </div>
        <div className={styles.listContentItem}>
          <span>报名人数</span>
          <div>
            <Tag>{signupCount}</Tag>
          </div>
        </div>
        <div className={styles.listContentItem}>
          <span>会议规模</span>
          <div>
            <Tag>{metScale}</Tag>
          </div>
        </div>
        <div className={styles.listContentItem}>
          <span>会议热度</span>
          <div>
            <Tag>{metHot}</Tag>
          </div>
        </div>
      </div>
    );

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={e => this.moreAction(e, props.current)}>
            {isAdmin && <Menu.Item key="hot">设置热度</Menu.Item>}
            {!isAdmin && <Menu.Item key="signup">开启报名</Menu.Item>}
            {!isAdmin && <Menu.Item key="open">开启会议</Menu.Item>}
            {!isAdmin && <Menu.Item key="end">结束会议</Menu.Item>}
            <Menu.Item key="del">删除会议</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    return (
      <PageHeaderWrapper>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="会议个数" value={total} bordered />
              </Col>
              <Col sm={8} xs={24}>
                {/* <Info title="活动平均时长" value="32分钟" bordered /> */}
              </Col>
              <Col sm={8} xs={24}>
                <Info
                  title="进行中的会议"
                  value={list.filter(v => [1, 2, 3].indexOf(v.status) >= 0).length}
                />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="会议列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            {currentUser.tenantId !== 1 && (
              <Button
                type="dashed"
                style={{ width: '100%', marginBottom: 8 }}
                icon="plus"
                onClick={() => router.push('/activity/create')}
              >
                添加新会议
              </Button>
            )}

            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Link to={`/activity/create/base?id=${item.id}`}>编辑</Link>,
                    <Link to={`/activity/signup-list/${item.id}`}>报名记录</Link>,
                    <MoreBtn current={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar src={`${IMG_DOMAIN}${item.metLogo}`} shape="square" size="large" />
                    }
                    title={<a href={`${API_DOMAIN}/detail.html?id=${item.id}`}>{item.title}</a>}
                    description={item.subTtitle}
                    style={{ flex: 1 }}
                  />
                  <ListContent data={item} style={{ flex: 3 }} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default BasicList;
