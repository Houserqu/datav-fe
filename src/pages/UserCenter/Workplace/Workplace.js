import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect(({ list }) => ({
  list,
}))
class Workplace extends PureComponent {
  render() {
    return <h1>工作台</h1>;
  }
}

export default Workplace;
