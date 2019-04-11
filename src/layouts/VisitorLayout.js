import React, { PureComponent } from 'react';
import { Layout, Icon } from 'antd';
import { connect } from 'dva';
import styles from './DesignLayout.less';

const { Header, Sider, Content } = Layout;

@connect(({ design, loading }) => ({
  design,
  categoryLoading: loading.effects['design/fetchCategoryComponents'],
  detailLoading: loading.effects['design/fetchAppDetail'],
}))
class DesignLayout extends PureComponent {
  handleAddCom = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'design/addCom',
      payload: { id },
    });
  };

  render() {
    const { children } = this.props;

    return (
      <div>
        <Layout className={styles.layout}>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </div>
    );
  }
}

export default DesignLayout;
