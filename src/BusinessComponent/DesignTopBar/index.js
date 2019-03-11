import React, { Component } from 'react';
import { Button, Row, Col, Spin } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

@connect(({ design, loading }) => ({
  design,
  detailLoading: loading.effects['design/fetchAppDetail'],
}))
class DesignTopBar extends Component {
  handleSave = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'design/saveDesignJSON',
    });
  };

  handleReset = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'design/resetDesign',
    });
  };

  render() {
    const {
      detailLoading,
      design: { appDetail = {} },
    } = this.props;
    return (
      <div>
        {detailLoading ? (
          <Spin />
        ) : (
          appDetail && (
            <div className={styles.toolbox}>
              <div>{appDetail.name}</div>
              <div>
                <Button type="primary" onClick={this.handleSave}>
                  保存
                </Button>
              </div>
              <div>
                <Button onClick={this.handleReset}>重置</Button>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

export default DesignTopBar;
