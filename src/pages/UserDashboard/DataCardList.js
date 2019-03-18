import React, { Fragment } from 'react';
import moment from 'moment';
import Link from 'umi/link';
import { Card, Tag, Icon, Avatar } from 'antd';
import styles from './Index.less';
import { appStatusColor, appStatus } from '@/constant';

export default function({ data = [] }) {
  return (
    <Fragment>
      {data.map(item => (
        <Card.Grid className={styles.projectGrid} key={item.id}>
          <Card
            bodyStyle={{ padding: 0, height: 100 }}
            bordered={false}
            actions={[
              <Fragment>
                <Link to={`/app/application/edit/${item.id}`}>
                  <Icon type="edit" />
                  编辑
                </Link>
              </Fragment>,
              <Fragment>
                <Icon type="delete" />
                删除
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
