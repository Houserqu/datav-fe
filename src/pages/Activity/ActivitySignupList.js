import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Icon, Button, Dropdown, Menu, Divider, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './ActivitySignupList.less';
// import FormModal from './FormModal';

/* eslint react/no-multi-comp:0 */
@connect(({ loading, activity }) => ({
  activity,
  loading: loading.models.activity,
}))
class ActivitySignupList extends PureComponent {
  state = {
    selectedRows: [],
    showCreate: false,
    model: [],
    list: [],
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    this.queryList({ metId: this.props.match.params.id });
  }

  queryList = params => {
    this.props.dispatch({
      type: 'activity/activitySignUpList',
      payload: { ...params, rows: 20 },
      callback: (model, list, total) => {
        this.setState({ model, list, total });
      },
    });
  };

  render() {
    const {
      loading,
      match: { params },
    } = this.props;
    const { selectedRows, model, list, total } = this.state;
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    const paginationProps = {
      total,
      onChange: page => {
        this.queryList({ page, metId: params.id });
      },
      pageSize: 20,
    };

    return (
      <PageHeaderWrapper title="报名列表">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              {selectedRows.length > 0 && (
                <span>
                  <Button>批量操作</Button>
                  <Dropdown overlay={menu}>
                    <Button>
                      更多操作 <Icon type="down" />
                    </Button>
                  </Dropdown>
                </span>
              )}
            </div>
            <Table
              rowKey="id"
              columns={model.map(v => ({ title: v.label, dataIndex: v.name }))}
              // rowSelection={rowSelection}
              dataSource={list}
              pagination={paginationProps}
              loading={loading}
              // onChange={this.handleTableChange}
            />
          </div>
        </Card>
        {/* <FormModal visible={showCreate} onCancel={this.showCreate} onOk={this.submit} /> */}
      </PageHeaderWrapper>
    );
  }
}

export default ActivitySignupList;
