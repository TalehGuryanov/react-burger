import {accessTokenLifeTime} from "../constants";
import {setCookie, deleteCookie} from "../../utils/cookie";
import {
  GET_PASSCODE_ERROR,
  GET_PASSCODE_REQUEST,
  GET_PASSCODE_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_ERROR
} from "../constants/auth";
import {AppDispatch, AppThunk} from "../types";
import {apiRequest} from "../../utils/apiRequest";

export interface IUpdateTokenRequest {
  readonly type: typeof UPDATE_TOKEN_REQUEST
}

const updateTokenRequestActionCreator: () => IUpdateTokenRequest = () => ({type: UPDATE_TOKEN_REQUEST});
    
export interface IUpdateTokenSuccess {
  readonly type: typeof UPDATE_TOKEN_SUCCESS
}

const updateTokenSuccessActionCreator: () => IUpdateTokenSuccess = () => ({type: UPDATE_TOKEN_SUCCESS});

export interface IUpdateTokenError {
  readonly type: typeof UPDATE_TOKEN_ERROR
}

const updateTokenErrorActionCreator: () => IUpdateTokenError = () => ({type: UPDATE_TOKEN_ERROR});

export interface IResetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST
}

const resetPasswordRequestActionCreator: () => IResetPasswordRequest = () => ({type: RESET_PASSWORD_REQUEST});

export interface IResetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS
}

const resetPasswordSuccessActionCreator: () => IResetPasswordSuccess = () => ({type: RESET_PASSWORD_SUCCESS});

export interface IResetPasswordError {
  readonly type: typeof RESET_PASSWORD_ERROR
}

const resetPasswordErrorActionCreator: () => IResetPasswordError = () => ({type: RESET_PASSWORD_ERROR});

export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST
}

const registerRequestActionCreator: () => IRegisterRequest = () => ({type: REGISTER_REQUEST});

export interface IRegisterSuccess {
  readonly type: typeof REGISTER_SUCCESS
}

const registerSuccessActionCreator: () => IRegisterSuccess = () => ({type: REGISTER_SUCCESS});

export interface IRegisterError {
  readonly type: typeof REGISTER_ERROR
}

const registerErrorActionCreator: () => IRegisterError = () => ({type: REGISTER_ERROR});

export interface IGetPasscodeRequest {
  readonly type: typeof GET_PASSCODE_REQUEST
}

const getPasscodeRequestActionCreator: () => IGetPasscodeRequest = () => ({type: GET_PASSCODE_REQUEST});

export interface IGetPasscodeSuccess {
  readonly type: typeof GET_PASSCODE_SUCCESS
}

const getPasscodeSuccessActionCreator: () => IGetPasscodeSuccess = () => ({type: GET_PASSCODE_SUCCESS});

export interface IGetPasscodeError {
  readonly type: typeof GET_PASSCODE_ERROR
}

const getPasscodeErrorActionCreator: () => IGetPasscodeError = () => ({type: GET_PASSCODE_ERROR});

export interface ILoginRequest {
  readonly type: typeof LOGIN_REQUEST
}

export const loginRequestActionCreator: () => ILoginRequest = () => ({type: LOGIN_REQUEST});

export interface ILoginSuccess {
  readonly type: typeof LOGIN_SUCCESS
}

const loginSuccessActionCreator: () => ILoginSuccess = () => ({type: LOGIN_SUCCESS});

export interface ILoginError {
  readonly type: typeof LOGIN_ERROR
}

const loginErrorActionCreator: () => ILoginError = () => ({type: LOGIN_ERROR});

export interface ILogoutRequest {
  readonly type: typeof LOGOUT_REQUEST
}

const logoutRequestActionCreator: () => ILogoutRequest = () => ({type: LOGOUT_REQUEST});

export interface ILogoutSuccess {
  readonly type: typeof LOGOUT_SUCCESS
}

const logoutSuccessActionCreator: () => ILogoutSuccess = () => ({type: LOGOUT_SUCCESS});

export interface ILogoutError {
  readonly type: typeof LOGOUT_ERROR
}

const logoutErrorActionCreator: () => ILogoutError = () => ({type: LOGOUT_ERROR});

export type TAuthActions =
  | IUpdateTokenRequest
  | IUpdateTokenSuccess
  | IUpdateTokenError
  | IResetPasswordRequest
  | IResetPasswordSuccess
  | IResetPasswordError
  | IRegisterRequest
  | IRegisterSuccess
  | IRegisterError
  | IGetPasscodeRequest
  | IGetPasscodeSuccess
  | IGetPasscodeError
  | ILoginRequest
  | ILoginSuccess
  | ILoginError
  | ILogoutRequest
  | ILogoutSuccess
  | ILogoutError

export const registerUserThunk: AppThunk = (user: string, email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(registerRequestActionCreator());

    const data = {
      name: user,
      email: email,
      password: password,
    }

    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    };

    apiRequest("/auth/register", options)
      .then((res) => {
        dispatch(registerSuccessActionCreator())
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken, {expires: accessTokenLifeTime});
      })
      .catch(() => dispatch(registerErrorActionCreator()))
  }
}

export const loginUserThunk: AppThunk = (email: string, password: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(loginRequestActionCreator());

    const data = {
      email: email,
      password: password,
    };

    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    };

    apiRequest("/auth/login", options)
      .then((res) => {
        dispatch(loginSuccessActionCreator());
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken, {expires: accessTokenLifeTime});
      })
      .catch(() => dispatch(loginErrorActionCreator()))
  }
}

export const forgotPasswordThunk: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(getPasscodeRequestActionCreator());

    const data = {
      email: email
    };

    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    };

    apiRequest("/password-reset", options)
      .then(() => dispatch(getPasscodeSuccessActionCreator()))
      .catch(() => dispatch(getPasscodeErrorActionCreator()))
  }
}

export const resetPasswordThunk: AppThunk = (password: string, code: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(resetPasswordRequestActionCreator());

    const data = {
      password: password,
      token: code,
    };

    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    };

    apiRequest("/password-reset/reset", options)
      .then(() => dispatch(resetPasswordSuccessActionCreator()))
      .catch(() => dispatch(resetPasswordErrorActionCreator()))
  }
}

export const logoutThunk: AppThunk = (refreshToken: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(logoutRequestActionCreator())

    const data = {
      token: refreshToken
    }

    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    };

    apiRequest("/auth/logout", options)
      .then(() => {
        deleteCookie("refreshToken");
        deleteCookie("accessToken");
        dispatch(logoutSuccessActionCreator());
      })
      .catch(() => dispatch(logoutErrorActionCreator()))
  }
}

export const updateTokenThunk: AppThunk = (refreshToken: string) => {

  return async function (dispatch: AppDispatch) {
    dispatch(updateTokenRequestActionCreator());

    const data = {
      token: refreshToken
    };

    const options: RequestInit = {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    };

    await apiRequest("/auth/token", options)
      .then((res) => {
        dispatch(updateTokenSuccessActionCreator());
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken, {expires: accessTokenLifeTime});
      })
      .catch(() => dispatch(updateTokenErrorActionCreator()))
  }
}


