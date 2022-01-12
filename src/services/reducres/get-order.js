import {GET_ORDER, GET_ORDER_SUCCESS, GET_ORDER_FAILED} from "../actions/actions";

const initialState =  {
  orderData: null,
  orderRequest: false,
  orderFailed: false
};

export function sendOrderData(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      }
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderData: action.data,
        orderRequest: false,
        orderFailed: false
      }
    }
    case GET_ORDER_FAILED: {
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