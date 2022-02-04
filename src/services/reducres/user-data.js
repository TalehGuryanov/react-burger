import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_ERROR,
  UPDATE_TOKEN_REQUEST,
  EDIT_USER_DATA_REQUEST,
  EDIT_USER_DATA_SUCCESS,
  EDIT_USER_DATA_ERROR
} from "../actions/user-data";

const initialState = {
  user: null,
  userDataRequest: false,
  userDataSuccess: false,
  userDataError: false,
  updateTokenRequest: false,
  updateTokenSuccess: false,
  updateTokenError: false,
  editUserDataRequest: false,
  editUserDataSuccess: false,
  editUserDataError: false,
}

export const userDataReducer = (state=initialState, action) => {
  switch(action.type) {
    case GET_USER_DATA_REQUEST: {
      return {
        ...state,
        userDataRequest: true,
        userDataSuccess: false,
        userDataError: false
      }
    }
    case GET_USER_DATA_SUCCESS: {
      return {
        ...state,
        user: action.user,
        userDataRequest: false,
        userDataSuccess: true,
        userDataError: false
      }
    }
    case GET_USER_DATA_ERROR: {
      return {
        ...state,
        userDataRequest: false,
        userDataSuccess: false,
        userDataError: true
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
    case EDIT_USER_DATA_REQUEST: {
      return {
        ...state,
        editUserDataRequest: true,
        editUserDataSuccess: false,
        editUserDataError: false,
      }
    }
    case EDIT_USER_DATA_SUCCESS: {
      return {
        ...state,
        user: action.user,
        editUserDataRequest: false,
        editUserDataSuccess: true,
        editUserDataError: false,
      }
    }
    case EDIT_USER_DATA_ERROR: {
      return {
        ...state,
        editUserDataRequest: false,
        editUserDataSuccess: false,
        editUserDataError: true,
      }
    }
    default: {
      return state
    }
  }
}