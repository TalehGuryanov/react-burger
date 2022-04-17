import {TUserOrdersActions} from "../actions/user-orders";
import {
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_GET_MESSAGE,
  USER_ORDERS_WS_CONNECTION_SUCCESS
} from "../constants/user-orders";

import {TOrder} from "../types/orders";

type TUSerOrdersState = {
  userOrdersConnected: boolean;
  userOrdersClosed: boolean;
  userOrdersError: boolean;
  userOrdersRequest: boolean;
  userOrders: TOrder[];
  total: number,
  totalToday: number,
}

const initialState: TUSerOrdersState = {
  userOrdersConnected: false,
  userOrdersClosed: false,
  userOrdersError: false,
  userOrdersRequest: true,
  userOrders: [],
  total: 0,
  totalToday: 0,
}

export const userOrdersReducer = (state = initialState, action: TUserOrdersActions) => {
  switch (action.type) {
    case USER_ORDERS_WS_CONNECTION_SUCCESS:
      return {
        ...state,
        userOrdersConnected: true,
        userOrdersError: false,
        userOrdersRequest: false,
        userOrdersClosed: false,
      };
    
    case USER_ORDERS_WS_CONNECTION_ERROR:
      return {
        ...state,
        userOrdersConnected: false,
        userOrdersRequest: false,
        userOrdersError: true,
        userOrdersClosed: true,
      };
    
    case USER_ORDERS_WS_CONNECTION_CLOSED:
      return {
        ...state,
        userOrdersConnected: false,
        userOrdersRequest: false,
        userOrdersError: !action.wasClear,
        userOrdersClosed: true,
      };
    
    case USER_ORDERS_WS_CONNECTION_GET_MESSAGE:
      return {
        ...state,
        userOrdersConnected: true,
        userOrdersRequest: false,
        userOrdersError: false,
        userOrdersClosed: false,
        userOrders: action.data.orders,
        total: action.data.total,
        totalToday: action.data.totalToday
      };
    
    default: return {
      ...state
    }
  }
}