import React, { Fragment } from 'react';
import { connect } from 'dva';
import { Button, Row, Col, Form } from 'antd';
import router from 'umi/router';
import Result from '@/components/Result';
import styles from './style.less';
import { API_DOMAIN } from '@/constant';

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ activity, loading }) => ({
  loading: loading.effects['activity/getOneActivity'],
  activity,
}))
class Step3 extends React.PureComponent {
  state = {
    id: this.props.location.query.id,
    data: {},
  };

  componentDidMount() {
    const { id } = this.state;
    if (id) {
      this.props.dispatch({
        type: 'activity/getOneActivity',
        payload: {
          id,
        },
        callback: res => {
          if (res.statusCode === 200) {
            this.setState({ data: res.data.mettingVo.mettingsDetail });
          }
        },
      });
    }
  }

  render() {
    const { id } = this.state;
    const onPrev = () => {
      router.push(`/activity/create/content?id=${id}`);
    };

    return (
      <div>
        <iframe
          src={`/admin/signup-template.html?metId=${id}`}
          title="template"
          style={{ width: '100%', minHeight: '600px', border: 'none', overflowX: 'hidden' }}
        />
        <Button onClick={onPrev} style={{ marginLeft: 8 }}>
          上一步
        </Button>
      </div>
    );
  }
}

export default Step3;
