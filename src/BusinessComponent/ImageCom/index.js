import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'dva';
import styles from './index.less';
import ComErrorBoundary from '../ComErrorBoundary';

@connect(({ loading, data }) => ({
  userData: data,
  detailLoading: loading.effects['design/fetchAppDetail'],
}))
class TextCom extends Component {
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
    const { id, active, hover = true, imageOpt = {} } = this.props;
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
          <img
            alt={id}
            style={{ height: '100%', width: '100%', ...imageOpt.style }}
            src={imageOpt.src}
          />
        </ComErrorBoundary>
      </div>
    );
  }
}

export default TextCom;
