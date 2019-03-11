import React, { Component } from 'react';
import { Menu, Icon, Card, Tabs } from 'antd';
import styles from './index.less';

const { SubMenu } = Menu;
const { TabPane } = Tabs;

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

class ChartSelector extends Component {
  state = {
    collapsed: false,
  };

  handleSelectCom = id => {
    this.props.onAddCom(id);
  };

  render() {
    const { collapsed } = this.state;
    const { loading = '', data = [] } = this.props;

    return (
      <Menu
        mode="vertical"
        // openKeys={this.state.openKeys}
        // onOpenChange={this.onOpenChange}
        loading={loading.toString()}
        // collapsed="true"
      >
        {data.map(c => (
          <SubMenu
            key={c.id}
            title={
              <span>
                <Icon type="mail" />
                <span>{c.name}</span>
              </span>
            }
          >
            <Menu.Item style={{ height: 'fit-content' }}>
              <Card>
                {c.components.map(v => (
                  <Card.Grid
                    className={styles.categoryCom}
                    key={v.id}
                    onClick={() => this.handleSelectCom(v.id)}
                  >
                    <img style={{ width: 240 }} alt="example" src={v.thumb} />
                    <p>{v.name}</p>
                  </Card.Grid>
                ))}
              </Card>
            </Menu.Item>
          </SubMenu>
        ))}
      </Menu>
    );
  }
}

export default ChartSelector;
