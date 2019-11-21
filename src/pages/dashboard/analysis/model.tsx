import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { fakeTotalData } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface StateType {
  total_focus?: number;
  total_follower?: number;
  total_likenum?: number;
  total_opus?: number;
  total_digg?: number;
  total_comment?: number;
  total_play?: number;
  total_share?: number;
  list?: list[];
}
export interface list {
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

export interface ModelType {
  namespace: 'dashboardTotal';
  state: StateType;
  effects: {
    fetchTotalData: Effect;
  };
  reducers: {
    save: Reducer<StateType>;
    clear: Reducer<StateType>;
  };
}

const initState = {
  total_focus: 0,
  total_follower: 0,
  total_likenum: 0,
  total_opus: 0,
  total_digg: 0,
  total_comment: 0,
  total_play: 0,
  total_share: 0,
  list: [],
};

const Model: ModelType = {
  namespace: 'dashboardTotal',

  state: initState,

  effects: {
    *fetchTotalData(_, { call, put }) {
      const response = yield call(fakeTotalData);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
  },

  reducers: {
    save(state, action) {
      console.log(action.payload.list);
      return {
        ...state,
        total_focus: action.payload.total_focus,
        total_follower: action.payload.total_follower,
        total_likenum: action.payload.total_likenum,
        total_opus: action.payload.total_opus,
        total_digg: action.payload.total_digg,
        total_comment: action.payload.total_comment,
        total_play: action.payload.total_play,
        total_share: action.payload.total_share,
        list: action.payload.list || {},
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
