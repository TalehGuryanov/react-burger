import {accessTokenLifeTime, apiRequest} from "../../utils/constants";
import {setCookie, deleteCookie} from "../../utils/cookie";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const GET_RESET_PASSWORD_CODE_REQUEST = "GET_RESET_PASSWORD_CODE_REQUEST";
export const GET_RESET_PASSWORD_CODE_SUCCESS = "GET_RESET_PASSWORD_CODE_SUCCESS";
export const GET_RESET_PASSWORD_CODE_ERROR = "GET_RESET_PASSWORD_CODE_ERROR";

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_ERROR = "RESET_PASSWORD_ERROR";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_ERROR = "LOGOUT_ERROR";

export const registerUserThunk = (user, email, password) => {
  return function (dispatch) {
    dispatch({ type: REGISTER_REQUEST });

    const data = {
      name: user,
      email: email,
      password: password,
    }

    const options = {
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
        dispatch({type: REGISTER_SUCCESS })
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken, {expires: accessTokenLifeTime});
      })
      .catch(() => dispatch({type: REGISTER_ERROR}))
  }
}

export const loginUserThunk = (email, password) => {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });

    const data = {
      email: email,
      password: password,
    };

    const options = {
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
        dispatch({type: LOGIN_SUCCESS });
        setCookie('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken, {expires: accessTokenLifeTime});
      })
      .catch(() => dispatch({type: LOGIN_ERROR}))
  }
}

export const forgotPasswordThunk = (email) => {
  return function (dispatch) {
    dispatch({ type: GET_RESET_PASSWORD_CODE_REQUEST });

    const data = {
      email: email
    };

    const options = {
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
      .then(() => dispatch({type: GET_RESET_PASSWORD_CODE_SUCCESS }))
      .catch(() => dispatch({type: GET_RESET_PASSWORD_CODE_ERROR}))
  }
}

export const resetPasswordThunk = (password, code) => {
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const data = {
      password: password,
      token: code,
    };

    const options = {
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
      .then(() => dispatch({type: RESET_PASSWORD_SUCCESS }))
      .catch(() => dispatch({type: RESET_PASSWORD_ERROR}))
  }
}

export const logoutThunk = (refreshToken) => {
  return function (dispatch) {
    dispatch({type: LOGOUT_REQUEST})

    const data = {
      token: refreshToken
    }

    const options = {
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
        dispatch({type: LOGOUT_SUCCESS });
      })
      .catch(() => dispatch({type: LOGOUT_ERROR}))
  }
}

