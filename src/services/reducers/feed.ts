import {TFeedActions} from "../actions/feed";
import {
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_GET_MESSAGE,
  FEED_WS_CONNECTION_CLOSED,
} from "../constants/feed";
import {TOrder} from "../types/orders";

type TWSState = {
  feedWsConnected: boolean;
  feedWsClosed: boolean;
  feedWsError: boolean;
  feedWsRequest: boolean;
  feedOrders: TOrder[];
  total: number,
  totalToday: number,
}

const initialState: TWSState = {
  feedWsConnected: false,
  feedWsClosed: false,
  feedWsError: false,
  feedWsRequest: true,
  feedOrders: [],
  total: 0,
  totalToday: 0,
}

export const feedWsReducer = (state = initialState, action: TFeedActions) => {
  switch (action.type) {
    case FEED_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        feedWsConnected: true,
        feedWsError: false,
        feedWsRequest: false,
        feedWsClosed: false,
      };
  
    case FEED_WS_CONNECTION_ERROR:
      return {
        ...state,
        feedWsConnected: false,
        feedWsRequest: false,
        feedWsError: true,
        feedWsClosed: true,
      };
  
    case FEED_WS_CONNECTION_CLOSED:
      return {
        ...state,
        feedWsConnected: false,
        feedWsRequest: false,
        feedWsError: !action.wasClear,
        feedWsClosed: true,
      };
  
    case FEED_WS_CONNECTION_GET_MESSAGE:
      return {
        ...state,
        feedWsConnected: true,
        feedWsRequest: false,
        feedWsError: false,
        feedWsClosed: false,
        feedOrders: action.data.orders,
        total: action.data.total,
        totalToday: action.data.totalToday
      };
      
    default: return {
        ...state
      }
  }
}