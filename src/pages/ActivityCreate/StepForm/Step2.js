import React from 'react';
import { connect } from 'dva';
import { Form, Input, Button, Alert, Tabs } from 'antd';
import router from 'umi/router';
import { digitUppercase } from '@/utils/utils';
import styles from './style.less';
import { API_DOMAIN } from '@/constant';
import UEditor from '@/components/Ueditor';

const { TabPane } = Tabs;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 19,
  },
};

@connect(({ activity, loading }) => ({
  loading: loading.effects['activity/getActivityContent'],
  activity,
}))
@Form.create()
class Step2 extends React.PureComponent {
  state = {
    id: this.props.location.query.id,
    data: null,
    queryed: false,
  };

  componentDidMount() {
    this.queryDetail();
  }

  queryDetail = () => {
    const { id } = this.state;
    if (id) {
      this.props.dispatch({
        type: 'activity/getOneActivity',
        payload: {
          id,
        },
        callback: res => {
          if (res.statusCode === 200) {
            this.setState({ data: res.data.mettingVo.mettingsDetail, queryed: true });
          }
        },
      });
    }
  };

  saveDetail = (v, type) => {
    this.props.dispatch({
      type: 'activity/submitContent',
      payload: {
        metId: this.state.id,
        type,
        contentText: v,
      },
    });
  };

  onPrev = () => {
    const { id } = this.state;
    router.push(id ? `/activity/create/base?id=${id}` : '/activity/create/base');
  };

  onNext = () => {
    const { id } = this.state;
    router.push(id ? `/activity/create/form?id=${id}` : '/activity/create/form');
  };

  render() {
    const { data, id, queryed } = this.state;

    return (
      <div className={styles.stepContentForm}>
        {id ? (
          <div style={{ margin: '20px auto', textAlign: 'center' }}>
            <Button onClick={this.onPrev} style={{ marginRight: 10 }}>
              上一步
            </Button>
            <Button type="primary" onClick={this.onNext}>
              下一步
            </Button>
          </div>
        ) : (
          <Alert showIcon type="error" message="获取会议信息失败" style={{ marginBottom: 24 }} />
        )}

        <Tabs defaultActiveKey="metContent" onChange={() => {}}>
          <TabPane tab="会议内容" key="metContent">
            {queryed && (
              <UEditor
                id="metContent"
                initValue={data.metContent}
                onAutoSave={v => this.saveDetail(v, 'metContent')}
              />
            )}
          </TabPane>
          <TabPane tab="主办方介绍" key="organiserInfo">
            {queryed && (
              <UEditor
                id="organiserInfo"
                initValue={data.organiserInfo}
                onAutoSave={v => this.saveDetail(v, 'organiserInfo')}
              />
            )}
          </TabPane>
          <TabPane tab="会议日程" key="metAgenda">
            {queryed && (
              <UEditor
                id="metAgenda"
                initValue={data.metAgenda}
                onAutoSave={v => this.saveDetail(v, 'metAgenda')}
              />
            )}
          </TabPane>
          <TabPane tab="会议嘉宾" key="metGuest">
            {queryed && (
              <UEditor
                id="metGuest"
                initValue={data.metGuest}
                onAutoSave={v => this.saveDetail(v, 'metGuest')}
              />
            )}
          </TabPane>
          <TabPane tab="联系人" key="linkInfo">
            {queryed && (
              <UEditor
                id="linkInfo"
                initValue={data.linkInfo}
                onAutoSave={v => this.saveDetail(v, 'linkInfo')}
              />
            )}
          </TabPane>
          <TabPane tab="场馆介绍" key="venueIntroduct">
            {queryed && (
              <UEditor
                id="venueIntroduct"
                initValue={data.venueIntroduct}
                onAutoSave={v => this.saveDetail(v, 'venueIntroduct')}
              />
            )}
          </TabPane>
          {/* <TabPane tab="场馆门票" key="ticketInfo">
            {queryed && (
              <UEditor
                id="ticketInfo"
                initValue={data.ticketInfo}
                onAutoSave={v => this.saveDetail(v, 'ticketInfo')}
              />
            )}
          </TabPane> */}
        </Tabs>
      </div>
    );
  }
}

export default Step2;
