import React, { Component } from 'react';
import { API_DOMAIN } from '@/constant';

class UEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.uedeitor = {};
  }

  componentDidMount() {
    this.initEditor();
  }

  componentWillUnmount() {
    // 组件卸载后，清除放入库的id
    let UE = window.UE;
    UE.delEditor(this.props.id);
  }

  initEditor() {
    const { initValue, uploadAPI, id, onAutoSave = null } = this.props;
    const { UE } = window;

    this.uedeitor = UE.getEditor(this.props.id, {
      serverUrl: uploadAPI,
    });

    // 自动保存
    if (onAutoSave) {
      this.uedeitor.addListener('afterautosave', () => {
        onAutoSave(this.uedeitor.getContent());
      });
    }

    UE.Editor.prototype._bkGetActionUrl = UE.Editor.prototype.getActionUrl;

    UE.Editor.prototype.getActionUrl = function(action) {
      if (
        action === 'uploadimage' ||
        action === 'uploadscrawl' ||
        action === 'uploadfile' ||
        action === 'uploadvideo'
      ) {
        return `${API_DOMAIN}/met/service/pub/upload/uploadUeditorImg`;
      }

      return this._bkGetActionUrl.call(this, action);
    };

    const self = this;
    this.uedeitor.ready(ueditor => {
      if (!ueditor) {
        UE.delEditor(id);
        self.initEditor();
      }
      if (initValue) {
        this.uedeitor.setContent(initValue);
      }
    });
  }

  render() {
    return (
      <div>
        <div
          id={this.props.id}
          name="content"
          type="text/plain"
          style={{ width: '100%', minHeight: '400px' }}
        />
        {/* <button
          onClick={() => this.uedeitor.setContent(this.props.initValue)}
          style={{ margin: '10px 0', width: '100px' }}
        >
          刷新编辑器
        </button> */}
      </div>
    );
  }
}

export default UEditor;
