import {TUserDataActions} from "../actions/user-data";
import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  EDIT_USER_DATA_REQUEST,
  EDIT_USER_DATA_SUCCESS,
  EDIT_USER_DATA_ERROR
} from "../constants/user-data";
import {TUser} from "../types/userType";

type TUserData = {
  user: TUser | null;
  userDataRequest: boolean;
  userDataSuccess: boolean
  userDataError: boolean,
  editUserDataRequest: boolean,
  editUserDataSuccess: boolean,
  editUserDataError: boolean
}

export const userDataInitialState: TUserData = {
  user: null,
  userDataRequest: false,
  userDataSuccess: false,
  userDataError: false,
  editUserDataRequest: false,
  editUserDataSuccess: false,
  editUserDataError: false
}

export const userDataReducer = (state=userDataInitialState, action: TUserDataActions) => {
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
