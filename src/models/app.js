import { getUserAppListI, getAppDetailI, setStatusI, deleteAppI } from '@/services/app';
// import { reloadAuthorized } from '@/utils/Authorized'

export default {
  namespace: 'app',

  state: {
    total: 0,
    list: [],
    curApp: {},
  },

  effects: {
    *fetchUserAppList({ payload }, { call, put }) {
      const res = yield call(getUserAppListI);

      if (res.success) {
        yield put({
          type: 'saveUserAppList',
          payload: res.data,
        });
      }
    },
    *fetchAppDetail({ payload }, { call, put }) {
      const res = yield call(getAppDetailI, payload);

      if (res.success) {
        yield put({
          type: 'saveCurApp',
          payload: res.data[0],
        });
      }
    },
    // 切换在线状态
    *toggleStatus({ payload }, { call, put }) {
      const res = yield call(setStatusI, payload);

      if (res.success) {
        yield put({
          type: 'changeCurAppStatus',
          payload: payload.status,
        });
      }
    },
    *deleteApp({ payload, callback }, { call }) {
      const res = yield call(deleteAppI, payload);

      if (typeof callback === 'function') {
        callback(res);
      }
    },
  },

  reducers: {
    saveUserAppList(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    saveCurApp(state, { payload }) {
      return {
        ...state,
        curApp: payload,
      };
    },
    changeCurAppStatus(state, { payload }) {
      return {
        ...state,
        curApp: {
          ...state.curApp,
          status: payload,
        },
      };
    },
  },
};
