import {TFeedActions} from "../actions/feed";
import {
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_GET_MESSAGE,
  FEED_WS_CONNECTION_CLOSED,
} from "../constants/feed";
import {TOrderData} from "../types/orders";

type TWSState = TOrderData & {
  wsConnected: boolean;
  wsError: boolean;
  wsRequest: boolean
}

const initialState: TWSState = {
  wsRequest: true,
  wsConnected: false,
  wsError: false,
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
}

export const wsReducer = (state = initialState, action: TFeedActions) => {
  switch (action.type) {
    case FEED_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsError: false,
        success: true,
        wsRequest: false
      };
  
    case FEED_WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsRequest: false,
        wsError: true,
        success: false,
      };
  
    case FEED_WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsRequest: false,
        wsConnected: false,
      };
  
    case FEED_WS_CONNECTION_GET_MESSAGE:
      return {
        ...state,
        ...action.data,
        wsRequest: false,
      };
      
    default: return {
        ...state
      }
  }
}