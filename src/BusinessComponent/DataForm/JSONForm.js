import React, { Fragment, Component } from 'react';
import { Input, Form } from 'antd';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/theme/xcode';
import 'brace/mode/json';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 10,
  },
};

class JSONForm extends Component {
  state = {};

  handleAceChange = v => {
    this.props.onChange(v);
  };

  render() {
    const { value, modify = true, layout = formItemLayout } = this.props;
    return (
      <Fragment>
        <Form.Item label="JOSN 文本" {...layout}>
          <AceEditor
            mode="json"
            theme="xcode"
            onChange={this.handleAceChange}
            name="JOSN_FORM"
            value={value}
            tabSize={2}
            readOnly={!modify}
            style={{ height: 600, width: '100%', border: '#dedede solid 1px' }}
            editorProps={{ $blockScrolling: Infinity }}
          />
        </Form.Item>
      </Fragment>
    );
  }
}

export default JSONForm;
