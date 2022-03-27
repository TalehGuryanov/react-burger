import {apiRequest} from "../../utils/apiRequest";
import {
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_ERROR,
  EDIT_USER_DATA_REQUEST,
  EDIT_USER_DATA_SUCCESS,
  EDIT_USER_DATA_ERROR
} from "../constants/user-data";
import {AppDispatch, AppThunk} from "../types";

interface IGetUserDataRequest {
  readonly type: typeof GET_USER_DATA_REQUEST
}

const getUserDataRequestActionCreator: () => IGetUserDataRequest = () => ({
  type: GET_USER_DATA_REQUEST
})

interface IGetUserDataSuccess {
  readonly type: typeof GET_USER_DATA_SUCCESS
  readonly user: any
}

const getUserDataSuccessActionCreator: (user: any) => IGetUserDataSuccess = (user) => ({
  type: GET_USER_DATA_SUCCESS,
  user
})

interface IGetUserDataError {
  readonly type: typeof GET_USER_DATA_ERROR
}

const getUserDataErrorActionCreator: () => IGetUserDataError = () => ({
  type: GET_USER_DATA_ERROR
})

interface IEditUserDataRequest {
  readonly type: typeof EDIT_USER_DATA_REQUEST
}

const editUserDataRequestActionCreator: () => IEditUserDataRequest = () => ({
  type: EDIT_USER_DATA_REQUEST
})

interface IEditUserDataSuccess {
  readonly type: typeof EDIT_USER_DATA_SUCCESS
  readonly user: any
}

const editUserDataSuccessActionCreator: (user: any) => IEditUserDataSuccess = (user) => ({
  type: EDIT_USER_DATA_SUCCESS,
  user
})

interface IEditUserDataError {
  readonly type: typeof EDIT_USER_DATA_ERROR
}

const editUserDataErrorActionCreator: () => IEditUserDataError = () => ({
  type: EDIT_USER_DATA_ERROR
})

export type TUserDataActions =
  | IGetUserDataRequest
  | IGetUserDataSuccess
  | IGetUserDataError
  | IEditUserDataRequest
  | IEditUserDataSuccess
  | IEditUserDataError
  

export const getUserDataThunk: AppThunk = (accessToken: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(getUserDataRequestActionCreator());
    
    const options: RequestInit = {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer'
    }
    
    apiRequest("/auth/user", options)
        .then((res) => {
          dispatch(getUserDataSuccessActionCreator(res.user));
        })
        .catch(() => dispatch(getUserDataErrorActionCreator()));
  }
}

export const editUserDataThunk: AppThunk = (accessToken: string, email: string, password: string, name: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(editUserDataRequestActionCreator());
    
    const data = {
      email: email,
      password: password,
      name: name,
    };
    
    const options: RequestInit = {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data)
    }
    
    apiRequest("/auth/user", options)
        .then((res) => {
          dispatch(editUserDataSuccessActionCreator(res.user));
        })
        .catch(() => dispatch(editUserDataErrorActionCreator()))
  }
}
