import { getUserAppList } from '@/services/app';
// import { reloadAuthorized } from '@/utils/Authorized'

export default {
  namespace: 'app',

  state: {
    total: 0,
    list: [],
  },

  effects: {
    *fetchUserAppList({ payload }, { call, put }) {
      const res = yield call(getUserAppList);

      if (res.success) {
        yield put({
          type: 'saveUserAppList',
          payload: res.data,
        });
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
  },
};
