import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Table, Button, Tag } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './List.less';
import { getAppListI } from '@/services/app';
import { deleteApp } from '@/services/admin';
import { appStatusColor, appStatus, appAccessStatus } from '@/constant';

const { Group: ButtonGroup } = Button;

/* eslint react/no-multi-comp:0 */
@connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))
class PermissionManage extends PureComponent {
  state = {
    list: [],
  };

  columns = [
    {
      title: 'logo',
      dataIndex: 'logo',
      render: text => <img src={text} alt="" style={{ width: '80px' }} />,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '介绍',
      dataIndex: 'describe',
    },
    {
      title: '上线时间',
      dataIndex: 'start_time',
      render: text => text || '立即上线',
    },
    {
      title: '下线时间',
      dataIndex: 'end_time',
      render: text => text || '手动下线',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
    },
    {
      title: '访问类型',
      dataIndex: 'access',
      render: text => appAccessStatus[text],
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: text => <Tag color={appStatusColor[text]}>{appStatus[text]}</Tag>,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 200,
      render: (text, record) => (
        <ButtonGroup>
          <Button size="small" type="danger" onClick={() => this.handleDel(record.id)}>
            删除
          </Button>
        </ButtonGroup>
      ),
    },
  ];

  async componentDidMount() {
    this.queryList();
  }

  handleDel = async id => {
    if (id) {
      await deleteApp({ id });
      this.queryList();
    }
  };

  queryList = async () => {
    const res = await getAppListI();
    if (res.success) {
      this.setState({ list: res.data });
    }
  };

  render() {
    const { list } = this.state;

    return (
      <PageHeaderWrapper title="应用管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Table rowKey="id" columns={this.columns} dataSource={list} pagination={false} />
          </div>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Form.create()(PermissionManage);
