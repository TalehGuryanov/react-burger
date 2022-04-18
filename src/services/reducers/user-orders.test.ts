import {userOrdersReducer, userOrdersInitialState} from "./user-orders";
import {
  USER_ORDERS_WS_CONNECTION_START,
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_GET_MESSAGE,
  USER_ORDERS_WS_CONNECTION_SUCCESS
} from "../constants/user-orders";

describe('feed reducer', () => {
  it('should return the initial state', () => {
    expect(userOrdersReducer(undefined, {} as any)).toEqual(userOrdersInitialState)
  })
  
  it('USER_ORDERS_WS_CONNECTION_START', () => {
    const action = {
      type: USER_ORDERS_WS_CONNECTION_START
    }
    
    expect(userOrdersReducer(userOrdersInitialState, action)).toEqual({
      ...userOrdersInitialState,
      userOrdersRequest: true
    })
  })
  
  it('USER_ORDERS_WS_CONNECTION_SUCCESS', () => {
    const action = {
      type: USER_ORDERS_WS_CONNECTION_SUCCESS
    }
    
    const initialState = {
      ...userOrdersInitialState,
      userOrdersRequest: true
    }
    
    expect(userOrdersReducer(initialState, action)).toEqual({
      ...initialState,
      userOrdersRequest: false,
      userOrdersConnected: true
    })
  })
  
  it('USER_ORDERS_WS_CONNECTION_GET_MESSAGE', () => {
    const action = {
      type: USER_ORDERS_WS_CONNECTION_GET_MESSAGE,
      data: {} as any
    }
    
    const initialState = {
      ...userOrdersInitialState,
      userOrdersRequest: false,
      userOrdersConnected: true
    }
    
    expect(userOrdersReducer(initialState, action)).toEqual({
      ...initialState,
      userOrders: action.data.orders,
      total: action.data.total,
      totalToday: action.data.totalToday
    })
  })
  
  it('USER_ORDERS_WS_CONNECTION_ERROR before USER_ORDERS_WS_CONNECTION_SUCCESS', () => {
    const action = {
      type: USER_ORDERS_WS_CONNECTION_ERROR
    }
    
    expect(userOrdersReducer(userOrdersInitialState, action)).toEqual({
      ...userOrdersInitialState,
      userOrdersRequest: false,
      userOrdersError: true,
      userOrdersClosed: true,
    })
  })
  
  it('USER_ORDERS_WS_CONNECTION_ERROR after USER_ORDERS_WS_CONNECTION_SUCCESS', () => {
    const action = {
      type: USER_ORDERS_WS_CONNECTION_ERROR
    }
    
    const initialState = {
      ...userOrdersInitialState,
      userOrdersRequest: false,
      userOrdersConnected: true,
      userOrders: [],
      total: 1,
      totalToday: 2
    }
    
    expect(userOrdersReducer(initialState, action)).toEqual({
      ...initialState,
      userOrdersConnected: false,
      userOrdersError: true,
      userOrdersClosed: true,
      userOrders: [],
      total: 0,
      totalToday: 0,
    })
  })
  
  it('USER_ORDERS_WS_CONNECTION_CLOSED without errors', () => {
    const action = {
      type: USER_ORDERS_WS_CONNECTION_CLOSED,
      wasClear: false
    }
    
    const initialState = {
      ...userOrdersInitialState,
      userOrdersRequest: false,
      userOrdersConnected: true,
      userOrders: [],
      total: 1,
      totalToday: 2
    }
    
    expect(userOrdersReducer(initialState, action)).toEqual({
      ...initialState,
      userOrdersConnected: false,
      userOrdersError: !action.wasClear,
      userOrdersClosed: true,
    })
  })
  
  it('USER_ORDERS_WS_CONNECTION_CLOSED with errors after USER_ORDERS_WS_CONNECTION_START', () => {
    const action = {
      type: USER_ORDERS_WS_CONNECTION_CLOSED,
      wasClear: true
    }
    
    const initialState = {
      ...userOrdersInitialState,
      userOrdersRequest: false,
      userOrdersConnected: true,
      userOrders: [],
      total: 1,
      totalToday: 2
    }
    
    expect(userOrdersReducer(initialState, action)).toEqual({
      ...initialState,
      userOrdersConnected: false,
      userOrdersError: !action.wasClear,
      userOrdersClosed: true,
    })
  })
  
  it('USER_ORDERS_WS_CONNECTION_CLOSED with errors before USER_ORDERS_WS_CONNECTION_START', () => {
    const action = {
      type: USER_ORDERS_WS_CONNECTION_CLOSED,
      wasClear: true
    }
    
    expect(userOrdersReducer(userOrdersInitialState, action)).toEqual({
      ...userOrdersInitialState,
      userOrdersRequest: false,
      userOrdersError: !action.wasClear,
      userOrdersClosed: true,
    })
  })
})

