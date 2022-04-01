import {TFeedActions} from "../actions/feed";
import {
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_GET_MESSAGE,
  FEED_WS_CONNECTION_CLOSED,
} from "../constants/feed";

type TWSState = {
  wsConnected: boolean;
  data: any,
  event: any,
  error?: Event;
}

const initialState: TWSState = {
  wsConnected: false,
  event: {},
  data: []
}

export const wsReducer = (state = initialState, action: TFeedActions) => {
  switch (action.type) {
    case FEED_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
        event: action.event
      };
  
    case FEED_WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.event,
        wsConnected: false
      };
  
    case FEED_WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        event: action.event,
        wsConnected: false
      };
  
    case FEED_WS_CONNECTION_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        data: [...state.data, action.data]
      };
      
    default: return {
        ...state
      }
  }
}