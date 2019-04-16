import { registerI } from '@/services/user';
import { setAuthority } from '@/utils/authority';
import { reloadAuthorized } from '@/utils/Authorized';
import md5 from 'blueimp-md5';
import { PASSWORD_SALT } from '@/constant';

export default {
  namespace: 'register',

  state: {
    status: undefined,
  },

  effects: {
    *submit({ payload, callback }, { call, put }) {
      // const md5Password = md5(PASSWORD_SALT + payload.password);
      const newPayload = payload;

      const response = yield call(registerI, newPayload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      if (response.success) {
        callback(response);
      }
    },
  },

  reducers: {
    registerHandle(state, { payload }) {
      reloadAuthorized();
      return {
        ...state,
        status: payload.status,
      };
    },
  },
};
