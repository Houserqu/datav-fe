// import router from 'umi/router';

export default {
  namespace: 'user',

  state: {
    list: [],
    currentUser: {},
    userList: [],
  },

  effects: {},

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
