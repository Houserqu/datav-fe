import React, { Fragment, Component } from 'react';
import moment from 'moment';
import Link from 'umi/link';
import { connect } from 'dva';
import { Card, Icon, Modal } from 'antd';
import router from 'umi/router';
import styles from './index.less';

@connect(({ data }) => ({
  data,
}))
class DataCardList extends Component {
  showDel = id => {
    Modal.confirm({
      title: '删除',
      content: <p style={{ color: 'red' }}>删除后数据无法恢复，确定删除吗？</p>,
      onOk: () => this.handleDel(id),
    });
  };

  handleDel = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'data/deleteData',
      payload: { id },
      callback: res => {
        if (res.success) {
          dispatch({
            type: 'data/fetchUserDataList',
          });
        }
      },
    });
  };

  render() {
    const { list = [] } = this.props;
    return (
      <Fragment>
        {list.map(item => (
          <Card.Grid className={styles.projectGrid} key={item.id}>
            <Card
              bodyStyle={{ padding: 0, height: 100 }}
              bordered={false}
              actions={[
                <Fragment>
                  <Link to={`/app/data/edit/${item.id}`}>
                    <Icon type="edit" />
                    编辑
                  </Link>
                </Fragment>,
                <Fragment>
                  <a onClick={() => this.showDel(item.id)}>
                    <Icon type="delete" />
                    删除
                  </a>
                </Fragment>,
              ]}
            >
              <Card.Meta
                title={
                  <div className={styles.cardTitle}>
                    <Link to={`/app/data/detail/${item.id}`}>{item.name}</Link>
                  </div>
                }
                description={item.describe}
              />
              <div className={styles.projectItemContent}>
                <Link to={`/app/data/detail/${item.id}`}>{item.member || ''}</Link>
                {item.update_time && (
                  <span className={styles.datetime} title={item.update_time}>
                    {moment(item.updatedAt).fromNow()}
                  </span>
                )}
              </div>
            </Card>
          </Card.Grid>
        ))}
      </Fragment>
    );
  }
}

export default DataCardList;
