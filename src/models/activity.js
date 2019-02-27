import { queryFakeList, removeFakeList, addFakeList, updateFakeList } from '@/services/api';
import {
  getActivityList,
  setMetHot,
  createActivity,
  createActivityContent,
  getOneActivity,
  updateActivity,
  loadSignupDataSet,
  loadAdminMettingsDataSet,
  setMettingsStatus,
  signupModelJsonDtolList,
  getAdminActivityList,
} from '@/services/activity';
import { PAGE_SIZE } from '@/constant';

export default {
  namespace: 'activity',

  state: {
    list: [],
    signupList: [],
  },

  effects: {
    *fetch_plant({ payload }, { call, put }) {
      const response = yield call(getAdminActivityList, payload);
      if (response.statusCode === 200) {
        yield put({
          type: 'saveList',
          payload: response.data.dataSet,
        });
      }
    },
    *fetch_tenant({ payload }, { call, put }) {
      const response = yield call(getActivityList, payload);
      if (response.statusCode === 200) {
        yield put({
          type: 'saveList',
          payload: response.data.dataSet,
        });
      }
    },
    *create({ payload, callback }, { call, put }) {
      const response = yield call(createActivity, payload);
      callback(response);
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateActivity, payload);
      callback(response);
    },
    *submitContent({ payload, callback }, { call, put }) {
      const response = yield call(createActivityContent, payload);
      callback(response);
    },
    *getOneActivity({ payload, callback }, { call, put }) {
      const response = yield call(getOneActivity, payload);
      callback(response);
    },
    *loadSignupDataSet({ payload, callback }, { call, put }) {
      const response = yield call(loadSignupDataSet, payload);
      callback(response);
    },
    *loadAdminMettingsDataSet({ payload, callback }, { call, put }) {
      const response = yield call(loadAdminMettingsDataSet, payload);
      callback(response);
    },
    *activitySignUpList({ payload, callback }, { call, put }) {
      const modelRes = yield call(signupModelJsonDtolList, payload);
      const listRes = yield call(loadSignupDataSet, payload);
      if (
        modelRes.statusCode === 200 &&
        listRes.statusCode === 200 &&
        typeof callback === 'function'
      ) {
        callback(
          modelRes.data.signupModelJsonDtolList,
          listRes.data.dataSet.rows,
          listRes.data.dataSet.total
        );
      }
    },
    *setHot({ payload, callback }, { call, put }) {
      yield call(setMetHot, payload, {
        successAlert: true,
      });

      yield put({
        type: 'fetch',
      });
    },
    *setStatus({ payload, callback }, { call, put }) {
      yield call(setMettingsStatus, payload, {
        successAlert: true,
      });

      yield put({
        type: 'fetch',
        payload: { rows: PAGE_SIZE, order: 'desc', sort: 'createTime' },
      });
    },

    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      const response = yield call(callback, payload); // post
      yield put({
        type: 'saveList',
        payload: response,
      });
    },
  },

  reducers: {
    saveList(state, action) {
      return {
        ...state,
        list: action.payload.rows,
        total: action.payload.total,
      };
    },
    appendList(state, action) {
      return {
        ...state,
        list: state.list.concat(action.payload),
      };
    },
  },
};
