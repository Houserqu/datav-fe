import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import * as R from 'ramda';
import GridLayout from 'react-grid-layout';
import PropsEditor from '@/BusinessComponent/PropsEditor';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Modal } from 'antd';
import styles from './index.less';
import Com from '@/BusinessComponent/Com';
import DataManager from '@/BusinessComponent/DataManager';

@connect(({ design, loading, data }) => ({
  design,
  userData: data,
  userDataLoading: loading.effects['data/fetchUserDataList'],
  categoryLoading: loading.effects['design/fetchCategoryComponents'],
  detailLoading: loading.effects['design/fetchAppDetail'],
}))
class Design extends Component {
  state = {
    curComId: null,
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
    });

    dispatch({
      type: 'data/fetchUserDataList',
    });
  }

  // 布局发生改变
  onLayoutChange = layout => {
    const layoutObj = {};

    layout.forEach(element => {
      layoutObj[element.i] = element;
    });

    this.props.dispatch({
      type: 'design/saveCurAppDesign',
      payload: { componentsLayout: layoutObj },
    });
  };

  // 点击组件  激活当前组件为编辑状态
  handleCurCom = (id, data) => {
    this.setState({ curComId: id });
    this.props.dispatch({
      type: 'design/activeCurCom',
      payload: { activeCom: data },
    });
  };

  // 双击组件 显示组件配置弹窗
  handleShowComEditor = (id, data) => {
    this.setState({ curComId: id });
    this.props.dispatch({
      type: 'design/toggleComEditor',
      payload: { activeCom: data, show: true },
    });
  };

  // 右侧属性编辑器 form 发送改变
  handleFiledChange = (comId, values) => {
    const { dispatch } = this.props;

    const fields = {};
    Object.keys(values).forEach(v => {
      fields[v] = values[v].value;
      if (values[v].type) {
        dispatch({
          type: 'design/changeSecondProps',
          payload: {
            fields,
            type: values[v].type,
            comId,
          },
        });
      }
    });
  };

  clickPage = () => {
    this.setState({ curComId: '$PAGE$' });
    this.props.dispatch({
      type: 'design/activeCurCom',
      payload: { activeCom: null },
    });
  };

  render() {
    const {
      design: { curAppDesign = null, dataManagerShow = false },
      userData: { list: userDataList },
      userDataLoading,
    } = this.props;

    const { curComId } = this.state;

    const components = curAppDesign ? curAppDesign.components : {};
    const componentsLayout = curAppDesign && curAppDesign.componentsLayout;

    const curPropsEditCom = components[curComId] || {};
    const curPropsEditComLayout = componentsLayout && (componentsLayout[curComId] || {});

    const layout = R.values(componentsLayout);

    return (
      <div className={styles.container}>
        <div className={styles.pageContainer}>
          <div
            className={styles.page}
            style={{ width: 1200, minHeight: 900 }}
            onClick={this.clickPage}
          >
            {curAppDesign && !userDataLoading && (
              <GridLayout
                className="layout"
                layout={layout}
                rowHeight={45}
                width={1200}
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={24}
                onLayoutChange={this.onLayoutChange}
              >
                {Object.keys(components).map(v => (
                  <div key={v}>
                    <Com
                      layoutOpt={componentsLayout[v]}
                      echartOpt={components[v].echartOpt}
                      id={v}
                      onClick={this.handleCurCom}
                      onDoubleClick={this.handleShowComEditor}
                      active={v === curComId}
                      style={components[v].style}
                      source={components[v].source}
                      data={components[v]}
                      // source={this.getSourceData(components[v].type, components[v].source)}
                    />
                  </div>
                ))}
              </GridLayout>
            )}
          </div>
        </div>
        {curAppDesign && curComId && (
          <PropsEditor
            layout={curPropsEditComLayout || {}}
            style={curPropsEditCom.style || {}}
            info={curPropsEditCom.info || {}}
            onFiledChange={this.handleFiledChange}
            comId={curComId}
            data={curComId === '$PAGE$' ? curAppDesign.page : components[curComId]}
          />
        )}

        <DataManager />
      </div>
    );
  }
}

export default Design;
