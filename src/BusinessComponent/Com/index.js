import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import classnames from 'classnames';
import styles from './index.less';

class Com extends Component {
  state = {};

  handleClick = e => {
    e.stopPropagation();

    const { onClick, id, data } = this.props;
    onClick(id, data);
  };

  render() {
    const { echartOpt = {}, id, active, style = {} } = this.props;

    return (
      <div
        className={classnames(styles.comBox, { [styles.comBoxActive]: active })}
        key={id}
        onClick={this.handleClick}
      >
        <ReactEcharts
          option={echartOpt}
          style={{ width: style.width || '100%', height: style.height || '100%' }}
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
