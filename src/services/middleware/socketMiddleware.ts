import type { Middleware, MiddlewareAPI } from 'redux';
import type { TAppActions, AppDispatch, RootState } from '../types';
import {
  FEED_WS_CONNECTION_CLOSE,
  FEED_WS_CONNECTION_START,
} from "../constants/feed";
import {
  feedWsConnectionErrorActionCreator,
  feedWsConnectionGetMessageActionCreator,
  feedWsConnectionSuccessActionCreator,
  feedWsConnectionClosedActionCreator
} from "../actions/feed";

export const socketMiddleware = (wsUrl: string): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    
    return next => (action: TAppActions) => {
      const { dispatch } = store;
      const { type } = action;
      
      if( type === FEED_WS_CONNECTION_START) {
        socket = new WebSocket(wsUrl);
      }
      
      if(socket) {
        socket.onopen = event => {
          dispatch(feedWsConnectionSuccessActionCreator(event));
        };
  
        socket.onerror = event => {
          dispatch(feedWsConnectionErrorActionCreator(event));
        };
  
        socket.onmessage = event => {
          const { data } = event;
          dispatch(feedWsConnectionGetMessageActionCreator(JSON.parse(data)));
        };
  
        socket.onclose = event => {
          dispatch(feedWsConnectionClosedActionCreator(event));
        };
      }
      
      if(type === FEED_WS_CONNECTION_CLOSE) {
        socket?.close()
      }
  
      next(action);
    }
  })
}