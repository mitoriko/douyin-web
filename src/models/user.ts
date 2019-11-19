import { Effect } from 'dva';
import { Reducer } from 'redux';
import { queryCurrent, query as queryUsers } from '@/services/user';
import {setAuthority} from "@/utils/authority";

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
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
        const response = yield call(queryCurrent,localStorage.getItem('username'));
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
      if (response.message === 'success') {
        localStorage.setItem('role', response.data.roles[0].roleName);
      }

    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      setAuthority(action.payload.roles[0].roleName);
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
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

export default UserModel;
