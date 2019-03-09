import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from './index.less';

class Com extends Component {
  state = {};

  handleClick = e => {
    e.stopPropagation();

    const { onClick, id } = this.props;
    onClick(id);
  };

  render() {
    const { echartOpt = {}, id } = this.props;

    return (
      <div className={styles.comBox} key={id} onClick={this.handleClick}>
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
