import React, { PureComponent } from 'react';
import { connect } from 'dva';
import RenderAuthorized from '@/components/Authorized';

@connect(({ global }) => ({ global }))
class Authorized extends PureComponent {
  render() {
    const {
      global: { permission },
    } = this.props;
    // const AuthorizedComponent = RenderAuthorized(permission);
    return <RenderAuthorized permission={permission} {...this.props} />;
  }
}

export default Authorized;
