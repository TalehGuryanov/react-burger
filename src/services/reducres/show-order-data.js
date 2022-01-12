import { SHOW_ORDER_DATA, HIDE_ORDER_DATA } from "../actions/actions";

const initialState = {
  showOrderModal: false,
}

export function showOrderData(state = initialState, action) {
  switch (action.type) {
    case SHOW_ORDER_DATA: {
      return {
        ...state,
        showOrderModal: true
      }
    }
    case HIDE_ORDER_DATA: {
      return {
        ...state,
        showOrderModal: false
      }
    }
    default: {
      return state
    }
  }
}