export const API_DOMAIN = 'http://127.0.0.1:7001';

export const IMG_DOMAIN = 'http://127.0.0.1:7001';

export const PASSWORD_SALT = 'zhtframework_94DABGioQOq2tTUO0AXYow';

export const PAGE_SIZE = 20;

// 1=所有人可以访问、2=密码访问、3=登录访问

export const appAccessStatus = {
  '1': '所有人可以访问',
  '2': '密码访问',
  '3': '登录访问',
};

// 1=在线，2=下线，3=删除

export const appStatus = {
  '1': '在线',
  '2': '下线',
  '3': '删除',
};

export const appStatusColor = {
  '1': '#87d068',
  '2': '#bebebe',
  '3': '#f50',
};

export const activityStatusTagColor = {
  '-1': '#bebebe',
  '0': 'purple',
  '1': '#87d068',
  '2': 'orange',
  '3': '#108ee9',
  '4': '#f50',
  '5': '#bebebe',
};

export const memberStatus = {
  '-1': '删除',
  '1': '正常',
  '0': '禁用',
};

export const dataType = {
  '1': '文本数据',
  '2': '数据库',
  '3': 'HTTP接口',
  '4': '文件',
};

// 内置 主题
export const echartThemes = [
  'walden',
  'essos',
  'macarons',
  'purple-passion',
  'shine',
  'westeros',
  'wonderland',
];

// 内置 主题
export const pageThemes = ['black', 'blue'];

export const defaultDesignJson = {
  page: {
    type: 'page',
    backgroundColor: '', // 页面默认背景色
    pageTheme: '',
    component: {
      defaultTheme: '', // 组件默认主题
    },
    info: {}, // 页面信息
    style: {}, // 样式
  },
  componentsLayout: {}, // 组件布局
  components: {}, // 组件
  activeCurCom: null, // 当前激活组件
};
