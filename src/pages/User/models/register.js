import { fakeRegister, register } from '@/services/api';
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
      const newPayload = { ...payload, password2: payload.password, smsVerfyId: 123 };

      const response = yield call(register, newPayload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      if (response.statusCode === 200 && typeof callback === 'function') {
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
