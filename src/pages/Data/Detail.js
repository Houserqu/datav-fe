import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Row, Col, Card, Divider, Button, Modal, message } from 'antd';
import DescriptionList from '@/components/DescriptionList';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import router from 'umi/router';
import styles from './index.less';
import { dataType } from '@/constant';
import JSONForm from '@/BusinessComponent/DataForm/JSONForm';
import DatabaseForm from '@/BusinessComponent/DataForm/DatabaseForm';

const { Description } = DescriptionList;
const { Group: ButtonGroup } = Button;

@connect(({ data, loading }) => ({
  data,
  loading: loading.effects['data/fetchDataDetail'],
}))
class DataDetail extends PureComponent {
  state = {
    testData: '',
  };

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;

    dispatch({
      type: 'data/fetchDataDetail',
      payload: { id },
    });
  }

  handleToggleStatus = async () => {
    const {
      data: {
        curData: { id, status },
      },
      dispatch,
    } = this.props;
    if (id && id !== 3) {
      await dispatch({
        type: 'app/toggleStatus',
        payload: { id, status: status === 1 ? 2 : 1 },
      });
    }
  };

  showDel = () => {
    Modal.confirm({
      title: '删除',
      content: <p style={{ color: 'red' }}>删除后数据无法恢复，确定删除应用吗？</p>,
      onOk: this.handleDel,
    });
  };

  handleDel = () => {
    const {
      app: {
        curApp: { id },
      },
      dispatch,
    } = this.props;
    dispatch({
      type: 'app/deleteApp',
      payload: { id },
      callback: res => {
        if (res.success) {
          router.push('/app/dashboard');
        }
      },
    });
  };

  render() {
    const {
      loading,
      data: { curData: detail },
      match: { params },
    } = this.props;

    const action = (
      <Fragment>
        <ButtonGroup>
          <Button onClick={() => router.push(`/app/data/edit/${params.id}`)}>编辑</Button>
          <Button onClick={this.showDel} type="danger">
            删除
          </Button>
        </ButtonGroup>
      </Fragment>
    );

    return (
      <PageHeaderWrapper
        loading={loading}
        // content={pageHeaderContent}
        title="数据详情"
        action={action}
      >
        {detail && (
          <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Card bordered={false} title={detail.name}>
                <DescriptionList size="large" title="基本信息" style={{ marginBottom: 32 }}>
                  <Description term="名称">{detail.name}</Description>
                  <Description term="介绍">{detail.describe}</Description>
                  <Description term="刷新时间">{detail.refresh} 毫秒</Description>
                  <Description term="创建时间">
                    {moment(detail.create_time).format('YY-MM-DD hh:mm')}
                  </Description>
                </DescriptionList>
                <Divider style={{ marginBottom: 32 }} />
                <DescriptionList size="large" title="数据类型" style={{ marginBottom: 32 }}>
                  <Description term="类型">{dataType[detail.type]}</Description>
                </DescriptionList>
                <Divider style={{ marginBottom: 32 }} />
                <div className={styles.title}>数据内容</div>
                {detail.type == 1 && (
                  <JSONForm
                    value={detail.content}
                    modify={false}
                    layout={{
                      labelCol: {
                        span: 2,
                      },
                      wrapperCol: {
                        span: 20,
                      },
                    }}
                  />
                )}

                {detail.type == 2 && (
                  <DatabaseForm
                    value={detail.content}
                    modify={false}
                    layout={{
                      labelCol: {
                        span: 2,
                      },
                      wrapperCol: {
                        span: 20,
                      },
                    }}
                  />
                )}
              </Card>
            </Col>
          </Row>
        )}
      </PageHeaderWrapper>
    );
  }
}

export default DataDetail;
