import {
  getAuthUserList,
  addRole,
  getAuthRoleList,
  addTenantUser,
  deleteRole,
  setUserStatus,
  setAuthUserPwd,
} from '@/services/auth';

export default {
  namespace: 'auth',

  state: {
    list: [],
    currentUser: {},
    userList: [],
    userListTotal: 0,
    roleList: [],
    roleListTotal: [],
  },

  effects: {
    *fetchAuthUserLst({ payload }, { call, put }) {
      const response = yield call(getAuthUserList, payload);
      if (response.statusCode === 200) {
        yield put({
          type: 'saveAuthUserList',
          payload: {
            list: response.data.dataSet.rows.filter(v => v.status !== -1),
            total: response.data.dataSet.total,
          },
        });
      }
    },
    *fetchAuthRoleLst({ payload }, { call, put }) {
      const response = yield call(getAuthRoleList, payload);
      if (response.statusCode === 200) {
        yield put({
          type: 'saveAuthRoleList',
          payload: { list: response.data.dataSet.rows, total: response.data.dataSet.total },
        });
      }
    },
    *createRole({ payload, callback }, { call, put }) {
      const response = yield call(addRole, { ...payload, status: 1 });
      if (response.statusCode === 200) {
        yield put({
          type: 'fetchAuthRoleLst',
        });

        if (typeof callback === 'function') callback();
      }
    },
    *createTenantUser({ payload, callback }, { call, put }) {
      const response = yield call(addTenantUser, payload);
      if (response.statusCode === 200) {
        yield put({
          type: 'fetchAuthUserLst',
        });

        if (typeof callback === 'function') callback();
      }
    },
    *deleteRole({ payload, callback }, { call, put }) {
      const response = yield call(deleteRole, payload);
      if (response.statusCode === 200) {
        yield put({
          type: 'fetchAuthRoleLst',
        });

        if (typeof callback === 'function') callback();
      }
    },
    *deleteWorker({ payload, callback }, { call, put }) {
      const response = yield call(setUserStatus, { ...payload, status: -1 });
      if (response.statusCode === 200) {
        yield put({
          type: 'fetchAuthUserLst',
        });

        if (typeof callback === 'function') callback();
      }
    },
    *setAuthUserPwd({ payload, callback }, { call, put }) {
      const response = yield call(setAuthUserPwd, payload);
      if (response.statusCode === 200) {
        yield put({
          type: 'fetchAuthUserLst',
        });

        if (typeof callback === 'function') callback();
      }
    },
  },

  reducers: {
    saveAuthUserList(state, action) {
      return {
        ...state,
        userList: action.payload.list || [],
        userListTotal: action.payload.total,
      };
    },
    saveAuthRoleList(state, action) {
      return {
        ...state,
        roleList: action.payload.list || [],
        roleListTotal: action.payload.total,
      };
    },
  },
};
