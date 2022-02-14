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
  LOGOUT_ERROR,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_ERROR,
  UPDATE_TOKEN_REQUEST,
} from "../actions/auth";

const initialState = {
  isAuthRequest: false,
  isAuthSuccess: false,
  isAuthError: false,
  isLoggedSelector: false,
  isPasswordCodeRequest: false,
  isPasswordCodeError: false,
  isPasswordCodeSuccess: false,
  resetPasswordRequest: false,
  resetPasswordSuccess: false,
  resetPasswordError: false,
  updateTokenRequest: false,
  updateTokenSuccess: false,
  updateTokenError: false
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        isAuthRequest: true,
        isAuthSuccess: false,
        isAuthError: false,
        isLoggedSelector: false,
      }
    }
    case REGISTER_SUCCESS : {
      return {
        ...state,
        isAuthRequest: false,
        isAuthSuccess: true,
        isAuthError: false,
        isLoggedSelector: true,
      }
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        isAuthRequest: false,
        isAuthSuccess: false,
        isAuthError: true,
        isLoggedSelector: false,
      }
    }
    case LOGIN_REQUEST: {
      return  {
        ...state,
        isAuthRequest: true,
        isAuthSuccess: false,
        isAuthError: false,
        isLoggedSelector: false,
      }
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthRequest: false,
        isAuthSuccess: true,
        isAuthError: false,
        isLoggedSelector: true,
      }
    }
    case LOGIN_ERROR: {
      return {
        ...state,
        isAuthRequest: false,
        isAuthSuccess: false,
        isAuthError: true,
        isLoggedSelector: false,
      }
    }
    case LOGOUT_REQUEST: {
      return {
        ...state,
        isAuthRequest: true,
        isAuthSuccess: false,
        isAuthError: false,
        isLoggedSelector: false,
      }
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isAuthRequest: false,
        isAuthSuccess: true,
        isAuthError: false,
        isLoggedSelector: false,
      }
    }
    case LOGOUT_ERROR: {
      return {
        ...state,
        isAuthRequest: false,
        isAuthSuccess: false,
        isAuthError: true,
        isLoggedSelector: false,
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
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        updateTokenRequest: true,
        updateTokenSuccess: false,
        updateTokenError: false,
      }
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenSuccess: true,
        updateTokenError: false,
      }
    }
    case UPDATE_TOKEN_ERROR: {
      return {
        ...state,
        updateTokenRequest: false,
        updateTokenSuccess: false,
        updateTokenError: true,
      }
    }
    default: {
      return state
    }
  }
}
