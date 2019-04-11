import React, { PureComponent } from 'react';
import AceEditor from 'react-ace';
import { Button } from 'antd';
import brace from 'brace';
import 'brace/theme/xcode';
import 'brace/mode/json';

const { Group } = Button;

export default class EchartEdit extends PureComponent {
  state = {
    tmpEchartOptString: JSON.stringify(this.props.data, null, 2),
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.comId !== this.props.comId) {
      this.setState({ tmpEchartOptString: JSON.stringify(nextProps.data, null, 2) });
    }
  }

  handleChange = v => {
    this.setState({ tmpEchartOptString: v });
  };

  resetEditor = () => {
    this.setState({ tmpEchartOptString: '' });
  };

  handleSubmit = () => {
    const { onSubmit } = this.props;
    const { tmpEchartOptString } = this.state;
    onSubmit(JSON.parse(tmpEchartOptString));
  };

  render() {
    const { tmpEchartOptString } = this.state;
    return (
      <div>
        <Group style={{ marginBottom: 10, marginLeft: 10 }}>
          <Button type="primary" size="small" onClick={this.handleSubmit}>
            提交
          </Button>
          <Button size="small" onClick={this.resetEditor}>
            清空
          </Button>
        </Group>
        <AceEditor
          mode="json"
          theme="xcode"
          onChange={this.handleChange}
          name="UNIQUE_ID_OF_DIV"
          value={tmpEchartOptString}
          style={{ height: 600 }}
          editorProps={{ $blockScrolling: Infinity }}
          tabSize={2}
        />
      </div>
    );
  }
}
