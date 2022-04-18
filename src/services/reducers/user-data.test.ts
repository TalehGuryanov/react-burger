import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  EDIT_USER_DATA_REQUEST,
  EDIT_USER_DATA_SUCCESS,
  EDIT_USER_DATA_ERROR
} from "../constants/user-data";
import {userDataReducer, userDataInitialState} from "./user-data";

describe('user data reducer', () => {
  it('should return the initial state', () => {
    expect(userDataReducer(undefined, {} as any)).toEqual(userDataInitialState)
  })
  
  it('GET_USER_DATA_SUCCESS', () => {
    const action = {
      type: GET_USER_DATA_REQUEST
    }
    expect(userDataReducer(userDataInitialState, action)).toEqual({
      ...userDataInitialState,
      userDataRequest: true,
    })
  })
  
  it('GET_USER_DATA_SUCCESS', () => {
    const action = {
      type: GET_USER_DATA_SUCCESS,
      user: {} as any
    }
    const initialState = {
      ...userDataInitialState,
      userDataRequest: true,
    }
    
    expect(userDataReducer(initialState, action)).toEqual({
      ...initialState,
      user: action.user,
      userDataRequest: false,
      userDataSuccess: true,
    })
  })
  
  it('GET_USER_DATA_ERROR', () => {
    const action = {
      type: GET_USER_DATA_ERROR
    }
    expect(userDataReducer(userDataInitialState, action)).toEqual({
      ...userDataInitialState,
      userDataRequest: false,
      userDataError: true
    })
  })
  
  it('EDIT_USER_DATA_REQUEST', () => {
    const action = {
      type: EDIT_USER_DATA_REQUEST,
    }
    const initialState = {
      ...userDataInitialState,
      userDataRequest: false,
      userDataSuccess: true,
      user: {} as any
    }
    
    expect(userDataReducer(initialState, action)).toEqual({
      ...initialState,
      editUserDataRequest: true,
    })
  })
  
  it('EDIT_USER_DATA_SUCCESS', () => {
    const action = {
      type: EDIT_USER_DATA_SUCCESS,
      user: {} as any
    }
    const initialState = {
      ...userDataInitialState,
      userDataRequest: false,
      userDataSuccess: true,
      user: {} as any,
      editUserDataRequest: true,
    }
    
    expect(userDataReducer(initialState, action)).toEqual({
      ...initialState,
      user: action.user,
      editUserDataRequest: false,
      editUserDataSuccess: true,
    })
  })
  
  it('EDIT_USER_DATA_ERROR', () => {
    const action = {
      type: EDIT_USER_DATA_ERROR,
    }
    const initialState = {
      ...userDataInitialState,
      userDataRequest: false,
      userDataSuccess: true,
      user: {} as any
    }
    
    expect(userDataReducer(initialState, action)).toEqual({
      ...initialState,
      editUserDataRequest: false,
      editUserDataError: true
    })
  })
})