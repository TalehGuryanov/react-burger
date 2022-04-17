import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  GET_PASSCODE_ERROR,
  GET_PASSCODE_REQUEST,
  GET_PASSCODE_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_ERROR,
  UPDATE_TOKEN_REQUEST,
} from "../constants/auth";
import {authReducer, authInitialState} from "./auth";

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {} as any)).toEqual(authInitialState)
  })
  
  it('REGISTER_REQUEST after situation without error', () => {
    const action = {
      type: REGISTER_REQUEST
    }
    
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      isAuthRequest: true
    })
  })
  
  it('REGISTER_REQUEST after error', () => {
    const action = {
      type: REGISTER_REQUEST
    }
    
    const initialStateWithError = {
      ...authInitialState,
      isAuthRequest: false,
      isAuthError: true
    }
    
    expect(authReducer(initialStateWithError, action)).toEqual({
      ...initialStateWithError,
      isAuthRequest: true,
      isAuthError: false
    })
  })
  
  it('REGISTER_SUCCESS', () => {
    const action = {
      type: REGISTER_SUCCESS
    }
  
    const initialState = {
      ...authInitialState,
      isAuthRequest: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isAuthRequest: false,
      isAuthSuccess: true,
      isLoggedSelector: true,
    })
  })
  
  it('REGISTER_ERROR', () => {
    const action = {
      type: REGISTER_ERROR
    }
    
    const initialState = {
      ...authInitialState,
      isAuthRequest: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isAuthRequest: false,
      isAuthError: true,
    })
  })
  
  it('LOGIN_REQUEST after situation without error', () => {
    const action = {
      type: LOGIN_REQUEST
    }
  
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      isAuthRequest: true
    })
  })
  
  it('LOGIN_REQUEST after error', () => {
    const action = {
      type: LOGIN_REQUEST
    }
    
    const initialStateWithError = {
      ...authInitialState,
      isAuthRequest: false,
      isAuthError: true
    }
    
    expect(authReducer(initialStateWithError, action)).toEqual({
      ...initialStateWithError,
      isAuthRequest: true,
      isAuthError: false
    })
  })
  
  it('LOGIN_SUCCESS', () => {
    const action = {
      type: LOGIN_SUCCESS
    }
    
    const initialState = {
      ...authInitialState,
      isAuthRequest: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...authInitialState,
      isAuthRequest: false,
      isAuthSuccess: true,
      isLoggedSelector: true,
    })
  })
  
  it('LOGIN_ERROR', () => {
    const action = {
      type: LOGIN_ERROR
    }
    
    const initialState = {
      ...authInitialState,
      isAuthRequest: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isAuthRequest: false,
      isAuthError: true,
    })
  })
  
  it('LOGOUT_REQUEST', () => {
    const action = {
      type: LOGOUT_REQUEST
    }
  
    const initialState = {
      ...authInitialState,
      isLoggedSelector: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isAuthRequest: true,
    })
  })
  
  it('LOGOUT_SUCCESS', () => {
    const action = {
      type: LOGOUT_SUCCESS
    }
    
    const initialState = {
      ...authInitialState,
      isAuthRequest: true,
      isLoggedSelector: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isAuthRequest: false,
      isAuthSuccess: true,
      isLoggedSelector: false,
    })
  })
  
  it('LOGOUT_ERROR', () => {
    const action = {
      type: LOGOUT_ERROR
    }
    
    const initialState = {
      ...authInitialState,
      isAuthRequest: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isAuthRequest: false,
      isAuthError: true,
    })
  })
  
  it('GET_PASSCODE_REQUEST', () => {
    const action = {
      type: GET_PASSCODE_REQUEST
    }
    
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      isPasswordCodeRequest: true,
    })
  })
  
  it('GET_PASSCODE_SUCCESS', () => {
    const action = {
      type: GET_PASSCODE_SUCCESS
    }
  
    const initialState = {
      ...authInitialState,
      isPasswordCodeRequest: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isPasswordCodeRequest: false,
      isPasswordCodeSuccess: true
    })
  })
  
  it('GET_PASSCODE_ERROR', () => {
    const action = {
      type: GET_PASSCODE_ERROR
    }
    
    const initialState = {
      ...authInitialState,
      isPasswordCodeRequest: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isPasswordCodeRequest: false,
      isPasswordCodeError: true
    })
  })
  
  it('RESET_PASSWORD_REQUEST', () => {
    const action = {
      type: RESET_PASSWORD_REQUEST
    }
    
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      resetPasswordRequest: true,
    })
  })
  
  it('RESET_PASSWORD_SUCCESS', () => {
    const action = {
      type: RESET_PASSWORD_SUCCESS
    }
    
    const initialState = {
      ...authInitialState,
      resetPasswordRequest: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordSuccess: true
    })
  })
  
  it('RESET_PASSWORD_ERROR', () => {
    const action = {
      type: RESET_PASSWORD_ERROR
    }
    
    const initialState = {
      ...authInitialState,
      resetPasswordRequest: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      resetPasswordRequest: false,
      resetPasswordError: true
    })
  })
  
  it('UPDATE_TOKEN_REQUEST', () => {
    const action = {
      type: UPDATE_TOKEN_REQUEST
    }
    
    expect(authReducer(authInitialState, action)).toEqual({
      ...authInitialState,
      updateTokenRequest: true,
    })
  })
  
  it('UPDATE_TOKEN_SUCCESS', () => {
    const action = {
      type: UPDATE_TOKEN_SUCCESS
    }
    
    const initialState = {
      ...authInitialState,
      updateTokenRequest: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      updateTokenRequest: false,
      updateTokenSuccess: true
    })
  })
  
  it('UPDATE_TOKEN_ERROR', () => {
    const action = {
      type: UPDATE_TOKEN_ERROR
    }
    
    const initialState = {
      ...authInitialState,
      updateTokenRequest: true
    }
    
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      updateTokenRequest: false,
      updateTokenError: true
    })
  })
})

