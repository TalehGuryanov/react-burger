import {GET_ORDER_DATA_REQUEST, GET_ORDER_DATA_SUCCESS, GET_ORDER_DATA_ERROR} from "../constants/order";
import { orderReducer, orderInitialState } from "./order";

describe('order reducer', () => {
  it('should return the initial state', () => {
    expect(orderReducer(undefined, {} as any)).toEqual(orderInitialState)
  })
  
  it('GET_ORDER_DATA_REQUEST', () => {
    const action = {
      type: GET_ORDER_DATA_REQUEST
    }
    
    expect(orderReducer(orderInitialState, action)).toEqual({
      ...orderInitialState,
      orderRequest: true
    })
  })
  
  it('GET_ORDER_DATA_SUCCESS', () => {
    const action = {
      type: GET_ORDER_DATA_SUCCESS,
      data: {} as any
    }
  
    const initialState = {
      ...orderInitialState,
      orderRequest: true
    }
    
    expect(orderReducer(initialState, action)).toEqual({
      ...initialState,
      orderRequest: false,
      orderData: action.data
    })
  })
  
  it('GET_ORDER_DATA_ERROR', () => {
    const action = {
      type: GET_ORDER_DATA_ERROR,
    }
    
    expect(orderReducer(orderInitialState, action)).toEqual({
      ...orderInitialState,
      orderRequest: false,
      orderFailed: true
    })
  })
})
