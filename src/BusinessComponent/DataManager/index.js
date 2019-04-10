import React, { Component } from 'react';
import { Button, Modal, Tabs, Collapse, Row, Col, Table } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
// import styles from './index.less';

const { TabPane } = Tabs;

@connect(({ design, data }) => ({
  design,
  userData: data,
}))
class DataManager extends Component {
  handleClose = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'design/toggleDataManager',
      payload: false,
    });
  };

  render() {
    const {
      design: { dataManagerShow = false },
      userData: { list },
    } = this.props;

    return (
      <div>
        <Modal
          maskClosable={false}
          onCancel={this.handleClose}
          footer={null}
          width={800}
          title="数据管理"
          visible={dataManagerShow}
        >
          <Tabs defaultActiveKey="1" size="small">
            <TabPane tab="所有" key="1">
              <Row gutter={16}>
                <Col span={8}>
                  <Table
                    showHeader={false}
                    columns={[
                      {
                        title: '名称',
                        dataIndex: 'name',
                      },
                    ]}
                    dataSource={list}
                    size="small"
                    pagination={false}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="新建" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    );
  }
}

export default DataManager;
