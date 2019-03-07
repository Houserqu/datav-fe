import { getAppDetailI, getCategoryWithComponent } from '@/services/app';
// import { reloadAuthorized } from '@/utils/Authorized'

export default {
  namespace: 'design',

  state: {
    appDetail: null,
    categoryComponents: [],
  },

  effects: {
    *fetchAppDetail({ payload, callback }, { call, put }) {
      const res = yield call(getAppDetailI, payload);

      if (res.success) {
        yield put({
          type: 'saveCurApp',
          payload: res.data[0],
        });

        if (typeof callback === 'function') {
          callback(res.data[0]);
        }
      }
    },
    *fetchCategoryComponents({ payload }, { call, put }) {
      const res = yield call(getCategoryWithComponent, payload);

      if (res.success) {
        yield put({
          type: 'saveCategoryComponents',
          payload: res.data,
        });
      }
    },
  },

  reducers: {
    saveCurApp(state, { payload }) {
      return {
        ...state,
        appDetail: payload,
      };
    },
    saveCategoryComponents(state, { payload }) {
      return {
        ...state,
        categoryComponents: payload,
      };
    },
  },
};
