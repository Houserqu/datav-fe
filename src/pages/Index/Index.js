import React, { Component } from 'react';
import { getAppListI } from '@/services/app';
import { Card } from 'antd';
import Link from 'umi/link';

class index extends Component {
  state = {
    list: [],
  };

  async componentDidMount() {
    const res = await getAppListI();
    if (res.success) {
      this.setState({ list: res.data });
    }
  }

  render() {
    const { list } = this.state;
    return (
      <div style={{ display: 'flex', width: '80vw', margin: '0 auto' }}>
        {list.map(v => (
          <Card
            key={v.id}
            title={v.name}
            extra={<Link to={`/visitor/app/${v.id}`}>查看</Link>}
            style={{ width: 300 }}
          >
            <p>{v.describe}</p>
          </Card>
        ))}
      </div>
    );
  }
}

export default index;
