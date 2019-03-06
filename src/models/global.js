import { getGlobalUserInfoI } from '@/services/user';
// import { reloadAuthorized } from '@/utils/Authorized'

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
    loadedAllNotices: false,
    permission: [],
    userInfo: {
      title: 'hahah',
    },
  },

  effects: {
    *getGlobalUserInfo({ payload }, { call, put }) {
      const globalInfo = yield call(getGlobalUserInfoI);

      if (globalInfo.success) {
        // 写入 localstorage
        localStorage.setItem('permissions', JSON.stringify(globalInfo.auth));

        yield put({
          type: 'saveGlobalUserInfo',
          payload: globalInfo.data,
        });
      }
    },
  },

  reducers: {
    saveGlobalUserInfo(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
