import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import styles from './index.less';
import ComErrorBoundary from '../ComErrorBoundary';

@connect(({ loading, data }) => ({
  userData: data,
  detailLoading: loading.effects['design/fetchAppDetail'],
}))
class ImageCom extends Component {
  handleClick = e => {
    e.stopPropagation();

    const { onClick, id, data } = this.props;
    if (typeof onClick === 'function') {
      onClick(id, data);
    }
  };

  handleDoubleClick = e => {
    e.stopPropagation();

    const { onDoubleClick, id, data } = this.props;
    if (typeof onDoubleClick === 'function') {
      onDoubleClick(id, data);
    }
  };

  render() {
    const { id, active, hover = true, textOpt = {} } = this.props;
    return (
      <div
        className={classnames(
          styles.comBox,
          { [styles.comBoxActive]: active },
          { [styles.hover]: hover }
        )}
        key={id}
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
      >
        <ComErrorBoundary>
          <div style={textOpt.style}>{textOpt.text}</div>
        </ComErrorBoundary>
      </div>
    );
  }
}

export default ImageCom;
