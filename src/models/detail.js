import { getUserDetailInfo } from '../services/user.js';

export default {
  namespace: 'detail',

  state: {
    loading: false,
    userInfo: {},
  },

  effects: {
    *fetchUserInfo(_, { call, put }){
      yield put({
        type: 'changeLoadingState',
        payload: true,
      });
      const response = yield call(getUserDetailInfo);
      yield put({
        type: 'save',
        payload: response,
      });
      yield put({
        type: 'changeLoadingState',
        payload: false,
      });
    }
  },

  reducers: {
    changeLoadingState(state, action){
      return {
        ...state,
        loading:action.payload,
      }
    },
    save(state, action){
      return {
        ...state,
        userInfo: action.payload,
      }
    }
  }
}
