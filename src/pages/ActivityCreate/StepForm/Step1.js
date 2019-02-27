import React, { Fragment } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Button,
  Select,
  Divider,
  InputNumber,
  DatePicker,
  Upload,
  Icon,
  Modal,
} from 'antd';
import router from 'umi/router';
import moment from 'moment';
import styles from './style.less';
import { API_DOMAIN, IMG_DOMAIN } from '@/constant';
import BMap from '@/BusinessComponent/BMap';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 17,
  },
};

@connect(({ activity }) => ({
  activity,
}))
@Form.create()
class Step1 extends React.PureComponent {
  state = {
    id: this.props.location.query.id,
    data: {},
    mapModalVisible: false,
    mapData: {},
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
            this.setState({ data: res.data.mettingVo.mettings });
          }
        },
      });
    }
  }

  onValidateForm = () => {
    const {
      form: { validateFields },
      dispatch,
    } = this.props;
    const { id, data, mapData } = this.state;
    validateFields((err, values) => {
      console.log(values);
      if (!err) {
        const params = {
          ...values,
          metId: id || '',
          longitude: mapData.longitude || data.longitude,
          latitude: mapData.latitude || data.latitude,
          metStartTime: values.metStartTime.format('YYYY-MM-DD HH:mm:ss'),
          metEndTime: values.metEndTime.format('YYYY-MM-DD HH:mm:ss'),
          metLogo: values.metLogo ? values.metLogo.file.response.data.fileUrl : data.metLogo || '',
          metBigLogo: values.metBigLogo
            ? values.metBigLogo.file.response.data.fileUrl
            : data.metBigLogo || '',
        };
        dispatch({
          type: id ? 'activity/update' : 'activity/create',
          payload: params,
          callback: res => {
            if (res.statusCode === 200) {
              router.push(`/activity/create/content?id=${res.data.metId || id}`);
            }
          },
        });
      }
    });
  };

  handleShowMap = () => {
    this.setState({ mapModalVisible: true });
  };

  handleCancelMap = () => {
    this.setState({ mapModalVisible: false });
  };

  handleMapSelected = value => {
    console.log(value);
    this.props.form.setFieldsValue({ city: value.city, metAddress: value.metAddress });
    this.setState({ mapModalVisible: false, mapData: value });
  };

  render() {
    const { data, mapModalVisible } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Fragment>
        <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
          <Form.Item {...formItemLayout} label="会议标题">
            {getFieldDecorator('title', {
              initialValue: data.title || '',
              rules: [{ required: true, message: '请输入' }],
            })(<Input placeholder="会议标题" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="会议规模">
            {getFieldDecorator('metScale', {
              initialValue: data.metScale || '',
              rules: [{ required: true, message: '请输入' }],
            })(<InputNumber placeholder="会议规模" min={0} />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="活动开始时间">
            {getFieldDecorator('metStartTime', {
              initialValue: data.metStartTime ? moment(data.metStartTime) : null,
              rules: [{ required: true, message: '请输入' }],
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="活动截止时间">
            {getFieldDecorator('metEndTime', {
              initialValue: data.metEndTime ? moment(data.metEndTime) : null,
              rules: [{ required: true, message: '请输入' }],
            })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="会议主办方">
            {getFieldDecorator('organiser', {
              initialValue: data.organiser || '',
              rules: [{ required: true, message: '请输入' }],
            })(<Input placeholder="会议主办方" />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="会议Logo">
            {getFieldDecorator('metLogo')(
              <Upload
                name="file"
                action={`${API_DOMAIN}/met/service/tenant/upload/uploadImg`}
                listType="picture"
                withCredentials
              >
                <Button>
                  <Icon type="upload" /> 点击上传
                </Button>
                <p style={{ margin: 10 }}>图片尺寸大小：100 * 30</p>

                {data.metLogo && (
                  <div style={{ margin: 10 }}>
                    当前图片：{' '}
                    <img src={`${API_DOMAIN}${data.metLogo}`} style={{ width: 200 }} alt="" />
                  </div>
                )}
              </Upload>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="会议海报">
            {getFieldDecorator('metBigLogo')(
              <Upload
                name="file"
                action={`${API_DOMAIN}/met/service/tenant/upload/uploadImg`}
                listType="picture"
                withCredentials
              >
                <Button>
                  <Icon type="upload" /> 点击上传
                </Button>
                <p style={{ margin: 10 }}>图片尺寸大小：1920 * 500</p>

                {data.metBigLogo && (
                  <div style={{ margin: '10px' }}>
                    当前图片：{' '}
                    <img style={{ width: 200 }} src={`${API_DOMAIN}${data.metBigLogo}`} alt="" />
                  </div>
                )}
              </Upload>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="海报上展示会议信息">
            {getFieldDecorator('metInfoShowOnBigLogo', {
              initialValue: data.metInfoShowOnBigLogo || '',
              rules: [{ required: true, message: '请输入' }],
            })(
              <Select style={{ width: 300 }}>
                <Option key={1}>是</Option>
                <Option key={0}>否</Option>
              </Select>
            )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="选择会议地址">
            <Button onClick={this.handleShowMap}>选择会议地点</Button>
          </Form.Item>

          <Form.Item {...formItemLayout} label="会议城市">
            {getFieldDecorator('city', {
              initialValue: data.city || '',
              rules: [{ required: true, message: '请输入' }],
            })(<Input placeholder="会议城市" disabled />)}
          </Form.Item>

          <Form.Item {...formItemLayout} label="会议地址">
            {getFieldDecorator('metAddress', {
              initialValue: data.metAddress || '',
              rules: [{ required: true, message: '请输入' }],
            })(<Input placeholder="会议地址" disabled />)}
          </Form.Item>

          <Form.Item
            wrapperCol={{
              xs: { span: 24, offset: 0 },
              sm: {
                span: formItemLayout.wrapperCol.span,
                offset: formItemLayout.labelCol.span,
              },
            }}
            label=""
          >
            <Button type="primary" onClick={this.onValidateForm}>
              提交，进入下一步
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ margin: '40px 0 24px' }} />

        {/* <div className={styles.desc}>
          <h3>说明</h3>
          <h4>xxxx</h4>
          <p>xxxx</p>
        </div> */}

        {mapModalVisible && (
          <BMap visible onOk={this.handleMapSelected} onCancel={this.handleCancelMap} />
        )}
      </Fragment>
    );
  }
}

export default Step1;
