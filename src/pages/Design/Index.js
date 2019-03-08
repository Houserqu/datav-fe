import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridLayout from 'react-grid-layout';
import styles from './index.less';
import Com from '@/BusinessComponent/Com';

@connect(({ design, loading }) => ({
  design,
  categoryLoading: loading.effects['design/fetchCategoryComponents'],
  detailLoading: loading.effects['design/fetchAppDetail'],
}))
class Design extends Component {
  state = {
    appOpt: {
      components: [
        {
          layout: { i: 'b', x: 1, y: 0, w: 8, h: 5 }, // grid 布局配置
          echartOpt: {
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
              type: 'value',
            },
            series: [
              {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {},
              },
            ],
          }, // echart 配置
          source: {}, // 数据源
        },
        {
          layout: { i: 'c', x: 10, y: 0, w: 8, h: 5 }, // grid 布局配置
          echartOpt: {
            tooltip: {
              formatter: '{a} <br/>{b} : {c}%',
            },
            toolbox: {
              feature: {
                restore: {},
                saveAsImage: {},
              },
            },
            series: [
              {
                name: '业务指标',
                type: 'gauge',
                detail: { formatter: '{value}%' },
                data: [{ value: 50, name: '完成率' }],
              },
            ],
          }, // echart 配
          source: {}, // 数据源
        },
      ],
    },
  };

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch({
      type: 'design/fetchAppDetail',
      payload: { id },
    });

    dispatch({
      type: 'design/fetchCategoryComponents',
      payload: { id },
    });
  }

  handleEdit = layout => {
    console.log(layout);
  };

  render() {
    const {
      design: { appDetail = null },
    } = this.props;

    const {
      appOpt: { components },
    } = this.state;

    const layout = components.map(v => ({ ...v.layout, minW: 8, minH: 5 }));

    console.log(layout);

    return (
      <div className={styles.container}>
        <div className={styles.pageContainer}>
          <div className={styles.page} style={{ width: 1080, minHeight: 900 }}>
            <GridLayout
              className="layout"
              layout={layout}
              rowHeight={45}
              width={1080}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={24}
              onLayoutChange={this.handleEdit}
            >
              {components.map(v => (
                <div key={v.layout.i}>
                  <Com layoutOpt={v.layout} echartOpt={v.echartOpt} />
                </div>
              ))}
            </GridLayout>
          </div>
        </div>
        <div className={styles.propsEditor}>123</div>
      </div>
    );
  }
}

export default Design;
