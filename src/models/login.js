import { stringify } from 'qs';
import { getGlobalUserInfoI, loginOutI, loginI } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const newPayload = payload;
      const response = yield call(loginI, newPayload);

      const params = getPageQuery();
      const { redirect } = params;

      if (response.success) {
        yield put({
          type: 'global/getGlobalUserInfo',
        });

        if (redirect) {
          window.location.href = redirect;
        } else {
          yield put(routerRedux.replace(redirect || '/'));
        }
      }
    },

    *logout(_, { put, call }) {
      yield call(loginOutI);

      yield put(routerRedux.replace('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
