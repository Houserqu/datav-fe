import React, { Component } from 'react';
import { Modal, Transfer } from 'antd';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddPerms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PermData: [],
    };
  }

  async componentDidMount() {}

  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

  onOk = () => {
    this.props.onOk(this.state.targetKeys);
  };

  render() {
    const {
      onCancel,
      visible,
      roleNotPerm = [],
      roleHasPerm = [],
      onChange,
      targetKeys,
      loading,
    } = this.props;

    return (
      <Modal visible={visible} title="添加角色权限" width="600px" onCancel={onCancel} footer={null}>
        <Transfer
          dataSource={roleNotPerm.concat(roleHasPerm)}
          showSearch
          filterOption={this.filterOption}
          targetKeys={targetKeys}
          onChange={onChange}
          render={item => item.name}
          rowKey={record => record.id}
          listStyle={{ height: '500px' }}
          titles={['未拥有权限', '已拥有权限']}
          disabled={loading}
        />
      </Modal>
    );
  }
}

export default AddPerms;
