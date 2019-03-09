import { getAppDetailI, getCategoryWithComponent } from '@/services/app';
// import { reloadAuthorized } from '@/utils/Authorized'

export default {
  namespace: 'design',

  state: {
    curAppDesign: null,
    categoryComponents: [],
  },

  effects: {
    *init({ payload, callback }, { call, put }) {
      // const res = yield call(getAppDetailI, payload);

      const res = {
        page: {
          type: 'page',
          backgroundColor: 'red',
        },
        componentsLayout: {
          b: { i: 'b', x: 1, y: 0, w: 8, h: 5 },
          c: { i: 'c', x: 10, y: 0, w: 8, h: 5 },
        },
        components: {
          b: {
            id: 'b',
            type: 'chart',
            echartOpt: {
              xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              },
              yAxis: {
                type: 'value',
              },
              series: [
                {
                  data: [820, 932, 901, 934, 1290, 1330, 1320],
                  type: 'line',
                  areaStyle: {},
                },
              ],
            }, // echart 配置
            source: {}, // 数据源
          },
          c: {
            id: 'c',
            type: 'chart',
            echartOpt: {
              tooltip: {
                formatter: '{a} <br/>{b} : {c}%',
              },
              toolbox: {
                feature: {
                  restore: {},
                  saveAsImage: {},
                },
              },
              series: [
                {
                  name: '业务指标',
                  type: 'gauge',
                  detail: { formatter: '{value}%' },
                  data: [{ value: 50, name: '完成率' }],
                },
              ],
            }, // echart 配
            source: {}, // 数据源
          },
        },
      };

      // if (res.success) {
      yield put({
        type: 'saveCurAppDesign',
        payload: res,
      });

      if (typeof callback === 'function') {
        callback(res.data[0]);
      }
      // }
    },
    *fetchAppDetail({ payload, callback }, { call, put }) {
      const res = yield call(getAppDetailI, payload);

      if (res.success) {
        yield put({
          type: 'saveCurApp',
          payload: res.data[0],
        });

        if (typeof callback === 'function') {
          callback(res.data[0]);
        }
      }
    },
    *fetchCategoryComponents({ payload }, { call, put }) {
      const res = yield call(getCategoryWithComponent, payload);

      if (res.success) {
        yield put({
          type: 'saveCategoryComponents',
          payload: res.data,
        });
      }
    },
  },

  reducers: {
    saveCurApp(state, { payload }) {
      return {
        ...state,
        appDetail: payload,
      };
    },
    saveCurAppDesign(state, { payload }) {
      return {
        ...state,
        curAppDesign: payload,
      };
    },
    saveCategoryComponents(state, { payload }) {
      return {
        ...state,
        categoryComponents: payload,
      };
    },
  },
};
