import { REGISTER_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, LOGIN_ERROR, LOGIN_SUCCESS, LOGIN_REQUEST } from "../actions/auth";

const initialState = {
  user: null,
  refreshToken: '',
  accessToken: '',
  isRegisterRequest: false,
  isRegisterFailed: false,
  isRegisterSuccess: false,
  isLoginRequest: false,
  isLoginFailed: false,
  isLoginSuccess: false
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        isRegisterRequest: true,
        isRegisterFailed: false,
        isRegisterSuccess: false
      }
    }
    case REGISTER_SUCCESS : {
      return {
        ...state,
        user: action.user,
        refreshToken: action.refreshToken,
        accessToken: action.accessToken,
        isRegisterRequest: false,
        isRegisterFailed: false,
        isRegisterSuccess: true
      }
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        isRegisterRequest: false,
        isRegisterFailed: true,
        isRegisterSuccess: false
      }
    }
    case LOGIN_REQUEST: {
      return  {
        ...state,
        isLoginRequest: true,
        isLoginFailed: false,
        isLoginSuccess: false
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.user,
        refreshToken: action.refreshToken,
        accessToken: action.accessToken,
        isLoginRequest: false,
        isLoginFailed: false,
        isLoginSuccess: true
      }
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isLoginRequest: false,
        isLoginFailed: true,
        isLoginSuccess: false
      }
    }
    default: {
      return state
    }
  }
}