import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { fakeDyUser } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface StateType {
  dyUser: dyUser;
  list: list;
}
export interface dyUser {
  userId?: string;
  dyId?: string;
  dyTk?: string;
  nickname?: string;
  shortid?: string;
  avatar?: string;
  sign?: string;
  focus?: number;
  follower?: number;
  likenum?: number;
  opus?: number;
  sumDigg?: number;
  sumComment?: number;
  sumPlay?: number;
  sumShare?: number;
  addTime?: string;
}

export interface list {
  videoId?: string;
  dyId?: string;
  awemeId?: string;
  desc?: string;
  awemeType?: number;
  mediaType?: number;
  diggCount?: number;
  commentCount?: number;
  playCount?: number;
  shareCount?: number;
  forwardCount?: number;
  coverImg?: string;
  addTime?: string;
}

export interface ModelType {
  namespace: 'dyuser';
  state: StateType;
  effects: {
    fetchDyUser: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    clear: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'dyuser',

  state: {
    dyUser: {},
    list: [],
  },

  effects: {
    *fetchDyUser({ payload }, { call, put }) {
      const response = yield call(fakeDyUser, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
  },

  reducers: {
    save(state, action) {
      console.log(action.payload);
      return {
        ...state,
        dyUser: action.payload.dyUser || {},
        list: action.payload.list || {},
      };
    },
  },
};

export default Model;
