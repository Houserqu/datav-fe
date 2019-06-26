import React, { Fragment } from 'react';
import moment from 'moment';
import Link from 'umi/link';
import { Card, Tag, Icon, Avatar } from 'antd';
import styles from './index.less';
import { appStatusColor, appStatus } from '@/constant';

export default function AppCardList({ data = [] }) {
  return (
    <Fragment>
      {data.map(item => (
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
    </Fragment>
  );
}
