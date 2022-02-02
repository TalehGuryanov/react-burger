import {AUTH_API} from "../../utils/constants";

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

const authRequest = (endpoint, data, method="POST") => {
  const options = {
    method: method,
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

  return fetch(AUTH_API + endpoint, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.statusText);
      }
    })
};

export const registerUserThunk = (user, email, password) => {
  return function (dispatch) {
    dispatch({ type: REGISTER_REQUEST });

    authRequest("/auth/register", {
      name: user,
      email: email,
      password: password,
    })
      .then((res) => {
        dispatch({type: REGISTER_SUCCESS, accessToken: res.accessToken, refreshToken: res.refreshToken, user: res.user })
      })
      .catch(() => dispatch({type: REGISTER_ERROR}))
  }
}

export const loginUserThunk = (email, password) => {
  return function (dispatch) {
    dispatch({ type: LOGIN_REQUEST });

    authRequest("/auth/login", {
      email: email,
      password: password,
    })
      .then((res) => dispatch({type: LOGIN_SUCCESS, accessToken: res.accessToken, refreshToken: res.refreshToken, user: res.user}))
      .catch(() => dispatch({type: LOGIN_ERROR}))
  }
}

export const forgotPasswordThunk = (email) => {
  return function (dispatch) {
    dispatch({ type: GET_RESET_PASSWORD_CODE_REQUEST });

    authRequest("/password-reset", {
      email: email,
    })
      .then(() => dispatch({type: GET_RESET_PASSWORD_CODE_SUCCESS }))
      .catch(() => dispatch({type: GET_RESET_PASSWORD_CODE_ERROR}))
  }
}

export const resetPasswordThunk = (password, code) => {
  return function (dispatch) {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    authRequest("/password-reset/reset", {
      password: password,
      token: code,
    })
      .then(() => dispatch({type: RESET_PASSWORD_SUCCESS }))
      .catch(() => dispatch({type: RESET_PASSWORD_ERROR}))
  }
}

