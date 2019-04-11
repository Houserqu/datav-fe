import React, { Component } from 'react';
import { Button, Modal, Tabs, Collapse, Row, Col, Table } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/xcode';
import 'brace/mode/json';
import Com from '@/BusinessComponent/Com';
import DataEdit from '@/BusinessComponent/PropsEditor/DataEdit';

// import styles from './index.less';

const { TabPane } = Tabs;

@connect(({ design, data }) => ({
  design,
  userData: data,
}))
class DataManager extends Component {
  state = {
    tmpEchartOptString: JSON.stringify(this.props.echartOpt, null, 2),
    tmpDataSource: this.props.source,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.comId !== this.props.comId) {
      this.setState({ tmpEchartOptString: JSON.stringify(nextProps.echartOpt, null, 2) });
      this.setState({ tmpDataSource: nextProps.source });
    }
  }

  handleChange = v => {
    this.setState({ tmpEchartOptString: v });
  };

  resetEditor = () => {
    this.setState({ tmpEchartOptString: '' });
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { tmpEchartOptString, tmpDataSource } = this.state;
    onSubmit(JSON.parse(tmpEchartOptString), tmpDataSource);
    this.handleClose();
  };

  handleClose = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'design/toggleComEditor',
      payload: { show: false },
    });
  };

  // 修改数据
  handleSubmitData = v => {
    // const { dispatch, comId } = this.props;
    // dispatch({
    //   type: 'design/changeDataOpt',
    //   payload: {
    //     comId,
    //     source: v,
    //     callback: () => {
    //       message.success('数据保存成功');
    //     },
    //   },
    // });
    this.setState({ tmpDataSource: v });
  };

  render() {
    const {
      design: { comEditorShow = false },
      data,
      comId,
      userDataList,
      page,
      style,
    } = this.props;

    const { tmpEchartOptString, tmpDataSource } = this.state;

    let tmpEchartOpt = {};
    try {
      tmpEchartOpt = JSON.parse(tmpEchartOptString);
    } catch (error) {
      tmpEchartOpt = {};
    }

    return (
      <div>
        <Modal
          maskClosable={false}
          onCancel={this.handleClose}
          width="80%"
          title={null}
          visible={comEditorShow}
          onOk={this.handleSubmit}
          destroyOnClose
          bodyStyle={{ height: '76vh' }}
        >
          <Row gutter={16}>
            <Col span={14}>
              <Tabs defaultActiveKey="1" size="small">
                <TabPane tab="组件" key="1">
                  <AceEditor
                    mode="json"
                    theme="xcode"
                    onChange={this.handleChange}
                    name="UNIQUE_ID_OF_DIV"
                    value={tmpEchartOptString}
                    style={{ minHeight: 500, width: '100%' }}
                    editorProps={{ $blockScrolling: Infinity }}
                    tabSize={2}
                  />
                </TabPane>
                <TabPane tab="数据" key="2">
                  <DataEdit
                    userData={userDataList}
                    source={tmpDataSource}
                    comId={comId}
                    echartOpt={tmpEchartOpt}
                    onSubmit={this.handleSubmitData}
                  />
                </TabPane>
              </Tabs>
            </Col>
            <Col span={10} style={{ height: 300 }}>
              <h3>预览</h3>
              <Com
                echartOpt={tmpEchartOpt}
                id={comId}
                onClick={this.handleCurCom}
                active
                style={style}
                source={tmpDataSource}
                data={data}
                page={page}
                notMerge
                // onDoubleClick={this.handleComEditor}
                // source={this.getSourceData(data.type, dataSource)}
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default DataManager;
