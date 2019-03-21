import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import classnames from 'classnames';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import * as R from 'ramda';
import isEqual from 'lodash/isEqual';
import styles from './index.less';
import ComErrorBoundary from '../ComErrorBoundary';

@connect(({ loading, data }) => ({
  userData: data,
  detailLoading: loading.effects['design/fetchAppDetail'],
}))
class Com extends Component {
  state = {};

  componentDidMount() {
    this.setEchartDataset();
  }

  // 设置组件数据
  setEchartDataset = () => {
    const {
      source,
      data: { type },
    } = this.props;

    // 根据 source id 查找对应完整数据配置
    const sourceData = this.getSourceData(type, source);

    let dataset = null;

    // 静态数据
    if (sourceData.type === 1) {
      dataset = { source: JSON.parse(sourceData.content) };
    }

    // 设置 echart 数据
    const echartsInstance = this.echarts_react.getEchartsInstance();
    echartsInstance.setOption({
      dataset,
    });
  };

  // 根据组件数据源 id 获取数据配置信息
  getSourceData = memoizeOne((type, source) => {
    const {
      userData: { list: userDataList },
    } = this.props;

    return type === 'chart' ? R.find(R.propEq('id', source))(userDataList) : source;
  }, isEqual);

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
        <ComErrorBoundary>
          {echartOpt && (
            <ReactEcharts
              ref={e => {
                this.echarts_react = e;
              }}
              option={{ ...echartOpt }}
              style={{ width: style.width || '100%', height: style.height || '100%' }}
              // notMerge={true}
              // lazyUpdate={true}
              // theme={"theme_name"}
              // onChartReady={this.onChartReadyCallback}
              // onEvents={EventsDict}
            />
          )}
        </ComErrorBoundary>
      </div>
    );
  }
}

export default Com;
