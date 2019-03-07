import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import ChartSelector from './ChartSelector';

@connect(({ design, loading }) => ({
  design,
  categoryLoading: loading.effects['design/fetchCategoryComponents'],
  detailLoading: loading.effects['design/fetchAppDetail'],
}))
class Design extends Component {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch({
      type: 'design/fetchAppDetail',
      payload: { id },
    });

    dispatch({
      type: 'design/fetchCategoryComponents',
      payload: { id },
    });
  }

  render() {
    const {
      design: { appDetail = null, categoryComponents },
      categoryLoading,
    } = this.props;
    return <Fragment>{appDetail && <h1>Welcome</h1>}</Fragment>;
  }
}

export default Design;
