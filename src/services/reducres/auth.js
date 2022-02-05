import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  GET_RESET_PASSWORD_CODE_ERROR,
  GET_RESET_PASSWORD_CODE_REQUEST,
  GET_RESET_PASSWORD_CODE_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR
} from "../actions/auth";

const initialState = {
  isRegisterRequest: false,
  isRegisterFailed: false,
  isRegisterSuccess: false,
  isLoginRequest: false,
  isLoginFailed: false,
  isLoginSuccess: false,
  isPasswordCodeRequest: false,
  isPasswordCodeError: false,
  isPasswordCodeSuccess: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordError: false,
  logoutRequest: false,
  logoutSuccess: false,
  logoutError: false,
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
    case GET_RESET_PASSWORD_CODE_REQUEST: {
      return {
        ...state,
        isPasswordCodeRequest: true,
        isPasswordCodeError: false,
        isPasswordCodeSuccess: false
      }
    }
    case GET_RESET_PASSWORD_CODE_SUCCESS: {
      return {
        ...state,
        isPasswordCodeRequest: false,
        isPasswordCodeError: false,
        isPasswordCodeSuccess: true
      }
    }
    case GET_RESET_PASSWORD_CODE_ERROR: {
      return {
        ...state,
        isPasswordCodeRequest: false,
        isPasswordCodeError: true,
        isPasswordCodeSuccess: false
      }
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordSuccess: false,
        resetPasswordError: false,
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: true,
        resetPasswordError: false,
      }
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        resetPasswordRequest: false,
        resetPasswordSuccess: false,
        resetPasswordError: true,
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutSuccess: false,
        logoutError: false,
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        logoutRequest: false,
        logoutSuccess: true,
        logoutError: false,
      }
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        logoutRequest: false,
        logoutSuccess: false,
        logoutError: true,
      }
    }
    default: {
      return state
    }
  }
}