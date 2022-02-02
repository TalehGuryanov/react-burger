import {AUTH_API} from "../../utils/constants";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

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

    authRequest("/register", {
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

    authRequest("/login", {
      email: email,
      password: password,
    })
      .then((res) => dispatch({type: LOGIN_SUCCESS, accessToken: res.accessToken, refreshToken: res.refreshToken, user: res.user}))
      .catch(() => dispatch({type: LOGIN_ERROR}))
  }
}


