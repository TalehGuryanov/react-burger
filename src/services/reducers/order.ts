import {GET_ORDER_DATA_REQUEST, GET_ORDER_DATA_SUCCESS, GET_ORDER_DATA_ERROR} from "../constants/order";
import {TOrderActions} from "../actions/order";
import {TOrderData} from "../types";
type TOrderState = {
  orderData: TOrderData | null,
  orderRequest: boolean,
  orderFailed: false
}
const orderInitialState: TOrderState =  {
  orderData: null,
  orderRequest: false,
  orderFailed: false
};

export function orderReducer(state = orderInitialState, action: TOrderActions) {
  switch (action.type) {
    case GET_ORDER_DATA_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      }
    }
    case GET_ORDER_DATA_SUCCESS: {
      return {
        ...state,
        orderData: action.data,
        orderRequest: false,
        orderFailed: false
      }
    }
    case GET_ORDER_DATA_ERROR: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    default: {
      return state
    }
  }
}