import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './index.less';

class Com extends Component {
  state = {};

  render() {
    const { layoutOpt = {}, echartOpt = {} } = this.props;

    return (
      <div className={styles.comBox} key={layoutOpt.i}>
        <ReactEcharts
          option={echartOpt}
          // notMerge={true}
          // lazyUpdate={true}
          // theme={"theme_name"}
          // onChartReady={this.onChartReadyCallback}
          // onEvents={EventsDict}
        />
      </div>
    );
  }
}

export default Com;
