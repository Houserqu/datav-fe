import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import styles from './DesignLayout.less';

const { Content } = Layout;

@connect(({ design, loading }) => ({
  design,
  categoryLoading: loading.effects['design/fetchCategoryComponents'],
  detailLoading: loading.effects['design/fetchAppDetail'],
}))
class VisitorLayout extends PureComponent {
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

export default VisitorLayout;
