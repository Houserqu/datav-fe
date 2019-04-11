import React, { Fragment } from 'react';
import AceEditor from 'react-ace';
import styles from './index.less';
import 'brace/theme/xcode';
import 'brace/mode/json';

export default function DataEditInfo({ data, type }) {
  let contentObj;
  try {
    contentObj = JSON.parse(data.content);
  } catch (error) {
    contentObj = [];
  }

  switch (type) {
    case 2:
      return (
        <div className={styles.contentInfo}>
          <p key="refresh">
            <b>刷新时间</b>: {data.refresh === 0 ? '不刷新' : data.refresh}
          </p>
          {Object.keys(contentObj).map(key => (
            <p key={key}>
              <b>{key}</b>: {contentObj[key]}
            </p>
          ))}
        </div>
      );
    case 1:
      return (
        <div className={styles.contentInfo}>
          <p key="refresh">
            <b>刷新时间</b>: {data.refresh}
          </p>
          <AceEditor
            mode="json"
            theme="xcode"
            readOnly
            name="UNIQUE_ID_OF_DIV"
            value={data.content}
            style={{ height: 400, width: '100%' }}
            editorProps={{ $blockScrolling: Infinity }}
            tabSize={2}
          />
        </div>
      );
    case -1:
      return (
        <div className={styles.contentInfo}>
          <p key="refresh">自定义数据直接在 echart 配置项中配置</p>
        </div>
      );
    default:
      return '无法显示';
  }
}
