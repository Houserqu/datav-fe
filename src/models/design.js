import { getAppDetailI, getCategoryWithComponent, updateAppI } from '@/services/app';
// import { reloadAuthorized } from '@/utils/Authorized'
import * as R from 'ramda';
import uuidv1 from 'uuid/v1';

export default {
  namespace: 'design',

  state: {
    curAppDesign: null, // 当前应用设计数据
    categoryComponents: [], // 分类组件库
    appDetail: null, // 当前应用信息
    components: [], // 组件库
  },

  effects: {
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
    // 保存设计数据到服务端
    *saveDesignJSON({ payload }, { call, put, select }) {
      console.log('cur ');
      const design = yield select(state => state.design);
      const {
        appDetail: { id },
        curAppDesign,
      } = design;
      yield call(updateAppI, { id, design_json: JSON.stringify(curAppDesign) });
    },
  },

  reducers: {
    saveCurApp(state, { payload }) {
      return {
        ...state,
        appDetail: payload,
        curAppDesign: JSON.parse(payload.design_json),
      };
    },
    // 重置设计数据
    resetDesign(state, { payload }) {
      return {
        ...state,
        appDetail: payload,
        curAppDesign: {
          page: { type: 'page' },
          componentsLayout: {},
          components: {},
        },
      };
    },
    // 更新当前设计数据
    saveCurAppDesign(state, { payload }) {
      return {
        ...state,
        curAppDesign: { ...state.curAppDesign, ...payload },
      };
    },
    // 保存组件库信息
    saveCategoryComponents(state, { payload }) {
      const components = R.unnest(payload.map(v => v.components));

      return {
        ...state,
        categoryComponents: payload,
        components,
      };
    },
    // 保存组件库信息
    changePropsOpt(state, { payload }) {
      console.log(payload);
      const { comId, fields } = payload;
      return {
        ...state,
        curAppDesign: {
          ...state.curAppDesign,
          components: {
            ...state.curAppDesign.components,
            [comId]: {
              ...state.curAppDesign.components[comId],
              ...fields,
            },
          },
        },
      };
    },
    // 添加组件到页面中
    addCom(state, { payload }) {
      // 组件库中查找该组件信息
      const comDetail = R.find(R.propEq('id', payload.id))(state.components);

      // 组件 默认 echarts 配置
      const comOpt = JSON.parse(comDetail.json_str);

      // 生成组件 id
      const designComId = uuidv1();
      return {
        ...state,
        curAppDesign: {
          ...state.curAppDesign,
          components: {
            ...state.curAppDesign.components,
            [designComId]: {
              id: designComId,
              type: comDetail.type,
              echartOpt: comOpt,
              source: {},
            },
          },
          componentsLayout: {
            ...state.curAppDesign.componentsLayout,
            [designComId]: {
              w: 15,
              h: 5,
              x: 1,
              y: 1,
              i: designComId,
              static: false,
            },
          },
        },
      };
    },
  },
};
