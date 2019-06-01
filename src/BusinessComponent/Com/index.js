import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import classnames from 'classnames';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import * as R from 'ramda';
import isEqual from 'lodash/isEqual';
import styles from './index.less';
import ComErrorBoundary from '../ComErrorBoundary';
import { queryDataBySql } from '@/services/data';

@connect(({ loading, data }) => ({
  userData: data,
  detailLoading: loading.effects['design/fetchAppDetail'],
}))
class Com extends Component {
  componentDidMount() {
    const {
      source,
      data: { type },
      echartOpt,
    } = this.props;
    if (source !== -1) {
      this.setEchartOption(source, type, echartOpt);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.source !== this.props.source) {
      this.setEchartOption(nextProps.source, nextProps.data.type, nextProps.echartOpt);
    }
  }

  // 设置组件参数
  setEchartOption = async (source, type, echartOpt) => {
    let newOptions = {};
    if (source === -1) {
      newOptions = echartOpt;
    } else {
      // 获取数据源配置
      const sourceData = this.getSourceData(type, source);

      // 静态数据
      if (sourceData) {
        // 静态 json 数据
        newOptions.series = echartOpt.series.map(v => ({ ...v, data: null }));

        if (sourceData.type === 1) {
          newOptions.dataset = JSON.parse(sourceData.content);
        }

        if (sourceData.type === 2) {
          const res = await queryDataBySql(JSON.parse(sourceData.content));
          if (res.success) {
            newOptions.dataset = res.data;
          }
        }
      }
    }

    console.log('newOptions:', newOptions);

    // 设置 echart 数据
    const echartsInstance = this.echarts_react.getEchartsInstance();
    echartsInstance.setOption(newOptions);
  };

  // 根据组件数据源 id 获取数据配置信息
  getSourceData = memoizeOne((type, source) => {
    const {
      userData: { list: userDataList = [] },
    } = this.props;

    return type === 'chart' ? R.find(R.propEq('id', source))(userDataList) : source;
  }, isEqual);

  handleClick = e => {
    e.stopPropagation();

    const { onClick, id, data } = this.props;
    if (typeof onClick === 'function') {
      onClick(id, data);
    }
  };

  handleDoubleClick = e => {
    e.stopPropagation();

    const { onDoubleClick, id, data } = this.props;
    if (typeof onDoubleClick === 'function') {
      onDoubleClick(id, data);
    }
  };

  getEchartOpt = () => this.props.echartOpt || {};

  render() {
    const { echartOpt, id, active, style = {}, notMerge = false, hover = true, page } = this.props;
    const defaultTheme = page.component && page.component.defaultTheme;
    return (
      <div
        className={classnames(
          styles.comBox,
          { [styles.comBoxActive]: active },
          { [styles.hover]: hover }
        )}
        key={id}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
      >
        <ComErrorBoundary>
          {echartOpt && (
            <ReactEcharts
              ref={e => {
                this.echarts_react = e;
              }}
              option={echartOpt}
              style={{ width: style.width || '100%', height: style.height || '100%' }}
              notMerge={notMerge}
              theme={style.theme || defaultTheme || ''}
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
