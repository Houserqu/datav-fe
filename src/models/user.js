import {
  query as queryUsers,
  getUserInfo,
  getMemberList,
  isTenantOpened,
  openTenant,
  updateUserInfo,
  changePwdSendSmsCheckCode,
  changePwdDoSet,
} from '@/services/user';
import router from 'umi/router';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    userList: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(getUserInfo);
      if (response.data.isLogin) {
        yield put({
          type: 'saveCurrentUser',
          payload: { ...response.data.userInfoVo.member, ...response.data.userInfoVo.sessionUser },
        });
      } else {
        router.push('/user/login');
      }
    },
    *fetchUserList({ payload }, { call, put }) {
      const response = yield call(getMemberList, payload);
      if (response.statusCode === 200) {
        yield put({
          type: 'saveUserList',
          payload: { list: response.data.dataSet.rows, total: response.data.dataSet.total },
        });
      }
    },
    *updateUserInfo({ payload }, { call, put }) {
      const response = yield call(updateUserInfo, payload);
      if (response.statusCode === 200) {
        yield put({
          type: 'fetchCurrent',
        });
      }
    },
    *changePwdSendSmsCheckCode({ payload }, { call, put }) {
      yield call(changePwdSendSmsCheckCode, payload);
    },
    *changePwdDoSet({ payload }, { call, put }) {
      yield call(changePwdDoSet, payload);
    },
    // *isTenantOpened(_, { call, put }) {
    //   const response = yield call(isTenantOpened);
    //   console.log(response);
    //   if(response.data.isOpened === 0) {
    //     yield put({
    //       type: 'openedTenant',
    //     });
    //   }
    // },
    // *openedTenant(_, { call, put }) {
    //   yield call(openTenant);
    // },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveUserList(state, action) {
      return {
        ...state,
        userList: action.payload.list || [],
        userListTotal: action.payload.total,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
