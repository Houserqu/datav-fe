import React, { Component, Fragment } from 'react';
import styles from './index.less';

const typeName = {
  chart: '图表',
  page: '页面',
  text: '文案',
};

class Com extends Component {
  state = {};

  render() {
    const { data } = this.props;
    console.log(data);

    return (
      <div className={styles.container}>
        {data && (
          <Fragment>
            <h2 className={styles.title}>{typeName[data.type]}</h2>
          </Fragment>
        )}
      </div>
    );
  }
}

export default Com;
