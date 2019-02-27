import { queryProvince, queryCity } from '@/services/geographic';
import province from '@/utils/geographic/province';
import city from '@/utils/geographic/city';

export default {
  namespace: 'geographic',

  state: {
    province,
    city: [],
    isLoading: false,
  },

  effects: {
    *fetchProvince(_, { call, put }) {
      const response = require('@/utils/geographic/province');
      yield put({
        type: 'setProvince',
        payload: response,
      });
    },
    *fetchCity({ payload }, { call, put }) {
      yield put({
        type: 'setCity',
        payload: city[payload],
      });
    },
  },

  reducers: {
    setProvince(state, action) {
      return {
        ...state,
        province: action.payload,
      };
    },
    setCity(state, action) {
      return {
        ...state,
        city: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
};
