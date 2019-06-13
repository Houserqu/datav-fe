import React, { Component } from 'react';
import { connect } from 'dva';
import GridLayout from 'react-grid-layout';
import * as R from 'ramda';
import { Input } from 'antd';
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
  state = {
    lock: false,
  };

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
      callback: detail => {
        if (detail.access === 2) {
          this.setState({ lock: true });
        }
      },
    });
  }

  handleInputPassword = v => {
    const {
      visitor: { appDetail },
    } = this.props;
    if (v.target.value === appDetail.password) {
      this.setState({ lock: false });
    }
  };

  render() {
    const { lock } = this.state;
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
          style={{
            width: 1200,
            minHeight: 900,
            backgroundColor: (page.style && page.style.background) || '#ffffff',
          }}
          onClick={this.clickPage}
        >
          {appDesign && !loading && !loadingData && !lock && (
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

          {lock && (
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Input
                placeholder="请输入访问密码"
                onChange={this.handleInputPassword}
                style={{ width: '300px', margin: 'auto' }}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
