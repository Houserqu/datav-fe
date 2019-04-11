import {
  getUserDataListI,
  getDataDetailI,
  createDataI,
  updateDataI,
  deleteDataI,
} from '@/services/data';
// import { reloadAuthorized } from '@/utils/Authorized'

export default {
  namespace: 'data',

  state: {
    total: 0,
    list: [],
    curData: null,
  },

  effects: {
    *fetchUserDataList({ payload }, { call, put }) {
      const res = yield call(getUserDataListI);

      if (res.success) {
        yield put({
          type: 'saveUserDataList',
          payload: res.data,
        });
      }
    },
    *fetchDataDetail({ payload, callback }, { call, put }) {
      const res = yield call(getDataDetailI, payload);

      if (res.success) {
        yield put({
          type: 'saveCurData',
          payload: res.data[0],
        });

        if (typeof callback === 'function') {
          callback(res.data[0]);
        }
      }
    },
    *fetchDataDetailList({ payload, callback }, { call, put }) {
      const res = yield call(getDataDetailI, payload);

      if (res.success) {
        yield put({
          type: 'saveUserDataList',
          payload: res.data,
        });

        if (typeof callback === 'function') {
          callback(res.data);
        }
      }
    },
    // // 切换在线状态
    // *toggleStatus({ payload }, { call, put }) {
    //   const res = yield call(setStatusI, payload);

    //   if (res.success) {
    //     yield put({
    //       type: 'changeCurAppStatus',
    //       payload: payload.status,
    //     });
    //   }
    // },
    *deleteData({ payload, callback }, { call }) {
      const res = yield call(deleteDataI, payload);

      if (typeof callback === 'function') {
        callback(res);
      }
    },
    *createData({ payload, callback }, { call }) {
      const res = yield call(createDataI, payload);

      if (typeof callback === 'function') {
        callback(res);
      }
    },
    *updateData({ payload, callback }, { call }) {
      const res = yield call(updateDataI, payload);

      if (typeof callback === 'function') {
        callback(res);
      }
    },
  },

  reducers: {
    saveUserDataList(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    saveCurData(state, { payload }) {
      return {
        ...state,
        curData: payload,
      };
    },
    saveCurDataList(state, { payload }) {
      return {
        ...state,
        curData: payload,
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
