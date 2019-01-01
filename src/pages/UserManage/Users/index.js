import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect(({ list }) => ({
  list,
}))
class Workplace extends PureComponent {
  render() {
    return <h1>用户列表</h1>;
  }
}

export default Workplace;
