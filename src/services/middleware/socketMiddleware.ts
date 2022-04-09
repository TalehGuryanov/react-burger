import type { Middleware, MiddlewareAPI } from 'redux';
import type { TAppActions, AppDispatch, RootState } from '../types';
import {TWsActions} from "../types/wsActions";

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    
    return next => (action: TAppActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
      
      if( type === wsInit) {
        socket = new WebSocket(wsUrl);
      }
      
      if(socket) {
        socket.onopen = () => {
          dispatch({type: onOpen});
        };
  
        socket.onerror = () => {
          dispatch({type: onError});
        };
  
        socket.onmessage = event => {
          const { data } = event;
          dispatch({type: onMessage, data: JSON.parse(data)});
        };
  
        socket.onclose = () => {
          dispatch({type: onClose});
        };
      }
  
      next(action);
    }
  })
}