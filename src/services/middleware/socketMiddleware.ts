import type { Middleware, MiddlewareAPI } from 'redux';
import type { TAppActions, AppDispatch, RootState } from '../types';
import {getCookie} from "../../utils/cookie";

export const socketMiddleware = (wsUrl: string, wsActions: any, isUserOrders=false): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    
    return next => (action: TAppActions) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;
      
      if(isUserOrders) {
        const accessToken = getCookie("accessToken").replace("Bearer ", "");
        wsUrl+=`?token=${accessToken}`
      }
      
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
  
        socket.onclose = (event) => {
          dispatch({type: onClose, wasClear: event.wasClean});
        };
  
        if( type === wsClose) {
          socket.close();
        }
      }
  
      next(action);
    }
  })
}