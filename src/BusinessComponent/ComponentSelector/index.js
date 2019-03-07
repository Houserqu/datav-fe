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

  renderSub = props => {
    console.log(props);
    return (
      <Card title="Card Title">
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
        <Card.Grid style={gridStyle}>Content</Card.Grid>
      </Card>
    );
  };

  render() {
    const { collapsed } = this.state;
    const { loading = '', data = [] } = this.props;

    return (
      <Menu
        mode="vertical"
        // openKeys={this.state.openKeys}
        // onOpenChange={this.onOpenChange}
        style={{ width: 200 }}
        loading={loading.toString()}
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
            {
              // c.components.map(v =>(
              //   <Menu.Item style={{ height: 180 }} key={v.id}>
              //     <img className={styles.menuItemThumb} src={v.thumb} alt="" />
              //     <span className={styles.menuItemName}>{v.name}</span>
              //   </Menu.Item>
              // ))
            }
            <Menu.Item style={{ height: 'fit-content' }}>{this.renderSub()}</Menu.Item>
          </SubMenu>
        ))}
      </Menu>
    );
  }
}

export default ChartSelector;
