import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import { fakeChartData } from './service';
import { message } from 'antd';

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
  user_id?: string;
  dy_id?: string;
  dy_tk?: string;
  nickname?: string;
  shortid?: string;
  avatar?: string;
  sign?: string;
  focus?: number;
  follower?: number;
  likenum?: number;
  opus?: number;
  sum_digg?: number;
  sum_comment?: number;
  sum_play?: number;
  sum_share?: number;
  add_time?: string;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetch: Effect;
    fetchSalesData: Effect;
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
  namespace: 'dashboardAndanalysis',

  state: initState,

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(fakeChartData);
      // message.error(response);
      yield put({
        type: 'save',
        payload: response,
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
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return initState;
    },
  },
};

export default Model;
