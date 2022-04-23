import {feedWsReducer, feedInitialState} from "./feed";
import {
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_GET_MESSAGE,
  FEED_WS_CONNECTION_CLOSED,
} from "../constants/feed";

describe('feed reducer', () => {
  it('should return the initial state', () => {
    expect(feedWsReducer(undefined, {} as any)).toEqual(feedInitialState)
  })
  
  it('FEED_WS_CONNECTION_START', () => {
    const action = {
      type: FEED_WS_CONNECTION_START
    }
    
    expect(feedWsReducer(feedInitialState, action)).toEqual({
      ...feedInitialState,
      feedWsRequest: true
    })
  })
  
  it('FEED_WS_CONNECTION_SUCCESS', () => {
    const action = {
      type: FEED_WS_CONNECTION_SUCCESS
    }
    
    const initialState = {
      ...feedInitialState,
      feedWsRequest: true
    }
    
    expect(feedWsReducer(initialState, action)).toEqual({
      ...initialState,
      feedWsRequest: false,
      feedWsConnected: true
    })
  })
  
  it('FEED_WS_CONNECTION_GET_MESSAGE', () => {
    const action = {
      type: FEED_WS_CONNECTION_GET_MESSAGE,
      data: {} as any
    }
    
    const initialState = {
      ...feedInitialState,
      feedWsRequest: false,
      feedWsConnected: true
    }
    
    expect(feedWsReducer(initialState, action)).toEqual({
      ...initialState,
      feedWsRequest: false,
      feedWsConnected: true,
      feedOrders: action.data.orders,
      total: action.data.total,
      totalToday: action.data.totalToday
    })
  })
  
  it('FEED_WS_CONNECTION_ERROR before FEED_WS_CONNECTION_SUCCESS', () => {
    const action = {
      type: FEED_WS_CONNECTION_ERROR
    }
    
    expect(feedWsReducer(feedInitialState, action)).toEqual({
      ...feedInitialState,
      feedWsRequest: false,
      feedWsError: true,
      feedWsClosed: true,
    })
  })
  
  it('FEED_WS_CONNECTION_ERROR after FEED_WS_CONNECTION_SUCCESS', () => {
    const action = {
      type: FEED_WS_CONNECTION_ERROR
    }
    
    const initialState = {
      ...feedInitialState,
      feedWsRequest: false,
      feedWsConnected: true,
      feedOrders: [],
      total: 1,
      totalToday: 2
    }
    
    expect(feedWsReducer(initialState, action)).toEqual({
      ...initialState,
      feedWsConnected: false,
      feedWsRequest: false,
      feedWsError: true,
      feedWsClosed: true,
      feedOrders: [],
      total: 0,
      totalToday: 0,
    })
  })
  
  it('FEED_WS_CONNECTION_CLOSED without errors', () => {
    const action = {
      type: FEED_WS_CONNECTION_CLOSED,
      wasClear: false
    }
    
    const initialState = {
      ...feedInitialState,
      feedWsRequest: false,
      feedWsConnected: true,
      feedOrders: [],
      total: 1,
      totalToday: 2
    }
    
    expect(feedWsReducer(initialState, action)).toEqual({
      ...initialState,
      feedWsConnected: false,
      feedWsRequest: false,
      feedWsError: !action.wasClear,
      feedWsClosed: true,
    })
  })
  
  it('FEED_WS_CONNECTION_CLOSED with errors after FEED_WS_CONNECTION_START', () => {
    const action = {
      type: FEED_WS_CONNECTION_CLOSED,
      wasClear: true
    }
    
    const initialState = {
      ...feedInitialState,
      feedWsRequest: false,
      feedWsConnected: true,
      feedOrders: [],
      total: 1,
      totalToday: 2
    }
    
    expect(feedWsReducer(initialState, action)).toEqual({
      ...initialState,
      feedWsConnected: false,
      feedWsRequest: false,
      feedWsError: !action.wasClear,
      feedWsClosed: true,
    })
  })
  
  it('FEED_WS_CONNECTION_CLOSED with errors before FEED_WS_CONNECTION_START', () => {
    const action = {
      type: FEED_WS_CONNECTION_CLOSED,
      wasClear: true
    }
    
    expect(feedWsReducer(feedInitialState, action)).toEqual({
      ...feedInitialState,
      feedWsConnected: false,
      feedWsRequest: false,
      feedWsError: !action.wasClear,
      feedWsClosed: true,
    })
  })
})

