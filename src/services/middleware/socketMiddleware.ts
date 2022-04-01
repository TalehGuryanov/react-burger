import type { Middleware, MiddlewareAPI } from 'redux';
import type { TAppActions, AppDispatch, RootState } from '../types';
import {
  FEED_WS_CONNECTION_START,
} from "../constants/feed";
import {
  FeedWsConnectionErrorActionCreator,
  FeedWsConnectionGetMessageActionCreator,
  FeedWsConnectionSuccessActionCreator,
  IFeedWsConnectionClosedActionCreator
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
          dispatch(FeedWsConnectionSuccessActionCreator(event));
        };
  
        socket.onerror = event => {
          dispatch(FeedWsConnectionErrorActionCreator(event));
        };
  
        socket.onmessage = event => {
          const { data } = event;
          dispatch(FeedWsConnectionGetMessageActionCreator(data));
        };
  
        socket.onclose = event => {
          dispatch(IFeedWsConnectionClosedActionCreator(event));
        };
      }
  
      next(action);
    }
  })
}