import { getAppDetailI } from '@/services/app';
import { getDataDetailI } from '@/services/data';

export default {
  namespace: 'visitor',

  state: {
    appDetail: null,
    appDesign: null,
    appData: null,
  },

  effects: {
    *fetchAppDetail({ payload }, { call, put }) {
      const res = yield call(getAppDetailI, payload);

      const appDesign = JSON.parse(res.data[0].design_json);
      // 获取 source
      const dataIds = [];

      Object.keys(appDesign.components).forEach(v => {
        if (appDesign.components[v].source !== -1) dataIds.push(appDesign.components[v].source);
      });

      if (dataIds.length > 0) {
        yield put({
          type: 'data/fetchDataDetailList',
          payload: { id: dataIds.join() },
        });
      }

      yield put({
        type: 'saveAppDetail',
        payload: { appDetail: res.data[0], appDesign },
      });
    },
  },

  reducers: {
    saveAppDetail(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
