import React, { Component } from 'react';
import { connect } from 'dva';
import GridLayout from 'react-grid-layout';
import * as R from 'ramda';
import styles from './index.less';
import Com from '@/BusinessComponent/Com';
import ImageCom from '@/BusinessComponent/ImageCom';
import TextCom from '@/BusinessComponent/TextCom';

@connect(({ visitor, loading }) => ({
  visitor,
  loading: loading.effects['visitor/fetchAppDetail'],
  loadingData: loading.effects['data/fetchDataDetailList'],
}))
class App extends Component {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;

    dispatch({
      type: 'visitor/fetchAppDetail',
      payload: { id },
    });
  }

  render() {
    const {
      visitor: { appDetail, appDesign },
      loading,
      loadingData,
    } = this.props;

    const components = appDesign ? appDesign.components : {};
    const page = appDesign ? appDesign.page : {};
    const componentsLayout = appDesign && appDesign.componentsLayout;

    const layout = R.values(componentsLayout);

    return (
      <div className={styles.pageContainer}>
        <div
          className={styles.page}
          style={{ width: 1200, minHeight: 900 }}
          onClick={this.clickPage}
        >
          {appDesign && !loading && !loadingData && (
            <GridLayout
              className="layout"
              layout={layout}
              rowHeight={45}
              width={1200}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={24}
              onLayoutChange={this.onLayoutChange}
              isDraggable={false}
              isResizable={false}
            >
              {Object.keys(components).map(v => (
                <div key={v}>
                  {components[v].type === 'chart' && (
                    <Com
                      layoutOpt={componentsLayout[v]}
                      echartOpt={components[v].echartOpt}
                      id={v}
                      style={components[v].style}
                      source={components[v].source}
                      data={components[v]}
                      page={page}
                      notMerge
                      hover={false}
                    />
                  )}

                  {components[v].type === 'image' && (
                    <ImageCom
                      layoutOpt={componentsLayout[v]}
                      imageOpt={components[v].echartOpt}
                      id={v}
                      onClick={this.handleCurCom}
                      onDoubleClick={this.handleShowComEditor}
                      style={components[v].style}
                      data={components[v]}
                      page={page}
                    />
                  )}

                  {components[v].type === 'text' && (
                    <TextCom
                      layoutOpt={componentsLayout[v]}
                      textOpt={components[v].echartOpt}
                      id={v}
                      onClick={this.handleCurCom}
                      onDoubleClick={this.handleShowComEditor}
                      style={components[v].style}
                      data={components[v]}
                      page={page}
                    />
                  )}
                </div>
              ))}
            </GridLayout>
          )}
        </div>
      </div>
    );
  }
}

export default App;
