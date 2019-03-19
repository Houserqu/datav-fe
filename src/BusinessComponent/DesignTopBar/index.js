import React, { Component } from 'react';
import { Button, Spin, Icon } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './index.less';

const { Group } = Button;

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

  handleBack = () => {
    router.goBack();
  };

  handleDelCom = () => {
    const {
      dispatch,
      design: { activeCom },
    } = this.props;

    dispatch({ type: 'design/delCom', payload: { id: activeCom.id } });
  };

  render() {
    const {
      detailLoading,
      design: { appDetail = {}, activeCom },
    } = this.props;

    // 图表组件工具激活状态
    const chartToolActive = activeCom && activeCom.type === 'chart';

    return (
      <div>
        {detailLoading ? (
          <Spin />
        ) : (
          appDetail && (
            <div className={styles.toolbox}>
              {/* <div>{appDetail.name}</div> */}

              <div className={styles.tools}>
                <Group>
                  <Button disabled={!chartToolActive} onClick={this.handleDelCom}>
                    <Icon type="delete" />
                  </Button>
                </Group>
              </div>
              <div className={styles.action}>
                <Button style={{ marginRight: 15 }} type="primary" onClick={this.handleSave}>
                  保存
                </Button>
                <Button style={{ marginRight: 15 }} onClick={this.handleBack}>
                  返回
                </Button>
                <Button type="danger" onClick={this.handleReset}>
                  重置
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

export default DesignTopBar;
