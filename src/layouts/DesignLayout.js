import React, { PureComponent } from 'react';
import { Layout, Icon } from 'antd';
import { connect } from 'dva';
import ComponentSelector from '@/BusinessComponent/ComponentSelector';
import styles from './DesignLayout.less';

const { Header, Sider, Content } = Layout;

@connect(({ design, loading }) => ({
  design,
  categoryLoading: loading.effects['design/fetchCategoryComponents'],
  detailLoading: loading.effects['design/fetchAppDetail'],
}))
class DesignLayout extends PureComponent {
  state = { a: 2 };

  render() {
    const {
      design: { categoryComponents },
      categoryLoading,
      children,
    } = this.props;

    return (
      <div>
        <Layout className={styles.layout}>
          <Sider className={styles.sider} style={{ width: '150px' }} collapsed>
            <div className={styles.logo}>
              <img src="/icons/logo.png" alt="datav" />
            </div>
            <ComponentSelector data={categoryComponents} loading={categoryLoading} />
          </Sider>
          <Layout>
            <Header className={styles.header}>Header</Header>
            <Content className={styles.content}>{children}</Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default DesignLayout;
