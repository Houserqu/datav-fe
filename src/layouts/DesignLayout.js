import React, { PureComponent } from 'react';
import { connect } from 'dva';

connect(( global ) => ({ global}));
class DesignLayout extends PureComponent {
  render() {
    const {
      children,
    } = this.props;

    return (
      <div>
        {children}
      </div>
    );
  }
}

export default DesignLayout

