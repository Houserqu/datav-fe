export const API_DOMAIN = 'http://127.0.0.1:7001';

export const IMG_DOMAIN = 'http://127.0.0.1:7001';

export const PASSWORD_SALT = 'zhtframework_94DABGioQOq2tTUO0AXYow';

export const PAGE_SIZE = 20;

// 0待发布，1报名中，2报名结束，3会议进行中，4会议结束，5取消-1移除

export const activityStatus = {
  '-1': '已删除',
  '0': '待发布',
  '1': '报名中',
  '2': '报名结束',
  '3': '进行中',
  '4': '已结束',
  '5': '取消',
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
