import moment from 'moment';
import {
  fakeChartData,
  loadMettingsAggregate,
  loadMetPV,
  loadMemberCount,
  loadSignupCount,
  loadSignupAggrateDate,
  loadMettingsDataSet,
} from '@/services/api';

export default {
  namespace: 'chart',

  state: {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
    loading: false,
    aggregate: {},
    metpvo: {},
    memberCount: 0,
    signupCount: 0,
    metSignup: {},
  },

  effects: {
    *adminData(_, { call, put }) {
      const responseAggregate = yield call(loadMettingsAggregate);
      const responseMetPV = yield call(loadMetPV);
      const responseMetSignup = yield call(loadSignupAggrateDate);
      const responseMemberCount = yield call(loadMemberCount);
      const responseSignupCount = yield call(loadSignupCount);
      const responseMettingsDataSet = yield call(loadMettingsDataSet, {
        sort: 'signupCount',
        order: 'desc',
      });

      yield put({
        type: 'saveAdminCardNum',
        payload: {
          metpvo: responseMetPV.data.metpvo,
          metSignup: responseMetSignup.data.signupAggregateVo,
          memberCount: responseMemberCount.data.memberCount,
          signupCount: responseSignupCount.data.count,
          aggregate: responseAggregate.data.aggregate,
          mettingList: responseMettingsDataSet.data.dataSet.recordRows.slice(0, 7),
        },
      });
    },
    *loadMettingsAggregate(_, { call, put }) {
      const responseAggregate = yield call(loadMettingsAggregate);
      if (responseAggregate.statusCode === 200) {
        yield put({
          type: 'save',
          aggregate: responseAggregate.data.aggregate,
        });
      }
    },
    *loadMetPV(_, { call, put }) {
      const responseMetPV = yield call(loadMetPV);
      if (responseMetPV.statusCode === 200) {
        yield put({
          type: 'save',
          metpvo: responseMetPV.data.metpvo,
        });
      }
    },
    *loadMemberCount(_, { call, put }) {
      const responseMemberCount = yield call(loadMemberCount);
      if (responseMemberCount.statusCode === 200) {
        yield put({
          type: 'save',
          memberCount: responseMemberCount.data,
        });
      }
    },
    *loadSignupCount(_, { call, put }) {
      const responseSignupCount = yield call(loadSignupCount);
      if (responseSignupCount.statusCode === 200) {
        yield put({
          type: 'save',
          signupCount: responseSignupCount.data,
        });
      }
    },

    *fetch(_, { call, put }) {
      // const response = yield call(fakeChartData);
      const visitData = [];
      const beginDay = new Date().getTime();

      const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
      for (let i = 0; i < fakeY.length; i += 1) {
        visitData.push({
          x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
          y: fakeY[i],
        });
      }
      yield put({
        type: 'save',
        payload: {
          visitData,
        },
      });
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    saveAdminCardNum(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};
