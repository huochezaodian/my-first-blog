import { getAllUsers as queryUsers, queryCurrent, deleteUser } from '../services/user';

export default {
  namespace: 'user',

  state: {
    list: {},
    loading: false,
    currentUser: {},
  },

  effects: {
    *fetchUsers(_, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
    *fetchDeleteUser({ payload }, { call, put }) {
      const response = yield call(deleteUser, payload);
      yield put({
        type: 'saveDeleteUser',
        payload: payload
      })
      return response;
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    saveDeleteUser(state, { payload }) {
      return {
        ...state,
        list: { users: state.list.users.filter(item => item.userid !== payload.userid)},
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
