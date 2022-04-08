import {TFeedActions} from "../actions/feed";
import {
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_GET_MESSAGE,
  FEED_WS_CONNECTION_CLOSED,
} from "../constants/feed";
import {TOrderData} from "../types/web-socket";

type TWSState = TOrderData & {
  wsConnected: boolean;
  event: Event | CloseEvent | any,
  error?: Event;
  wsRequest: boolean
}

const initialState: TWSState = {
  wsRequest: true,
  wsConnected: false,
  success: false,
  event: {},
  orders: [],
  total: 0,
  totalToday: 0,
}

export const wsReducer = (state = initialState, action: TFeedActions) => {
  switch (action.type) {
    case FEED_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
        success: true,
        event: action.event,
        wsRequest: false
      };
  
    case FEED_WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.event,
        wsConnected: false,
        wsRequest: false
      };
  
    case FEED_WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        event: action.event,
        wsRequest: false,
      };
  
    case FEED_WS_CONNECTION_GET_MESSAGE:
      return {
        ...state,
        wsRequest: false,
        ...action.data
      };
      
    default: return {
        ...state
      }
  }
}