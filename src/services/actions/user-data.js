import {getCookie, setCookie} from "../../utils/cookie";
import {accessTokenLifeTime, apiRequest} from "../../utils/constants";

export const GET_USER_DATA_REQUEST = "GET_USER_DATA_REQUEST";
export const GET_USER_DATA_SUCCESS = "GET_USER_DATA_SUCCESS";
export const GET_USER_DATA_ERROR = "GET_USER_DATA_ERROR";
export const EDIT_USER_DATA_REQUEST = "EDIT_USER_DATA_REQUEST";
export const EDIT_USER_DATA_SUCCESS = "EDIT_USER_DATA_SUCCESS";
export const EDIT_USER_DATA_ERROR = "EDIT_USER_DATA_ERROR";
export const UPDATE_TOKEN_REQUEST = "UPDATE_TOKEN_REQUEST";
export const UPDATE_TOKEN_SUCCESS = "UPDATE_TOKEN_SUCCESS";
export const UPDATE_TOKEN_ERROR = "UPDATE_TOKEN_ERROR";

export const updateTokenThunk = () => {
  const refreshToken = getCookie('refreshToken');

  return async function (dispatch) {
      dispatch({type: UPDATE_TOKEN_REQUEST});

      const data = {
        token: refreshToken
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

      await apiRequest("/auth/token", options)
        .then((res) => {
          dispatch({type: UPDATE_TOKEN_SUCCESS});
          setCookie('refreshToken', res.refreshToken);
          setCookie('accessToken', res.accessToken, {expires: accessTokenLifeTime});
        })
        .catch(() => dispatch({type: UPDATE_TOKEN_ERROR}))
    }
}

export const getUserDataThunk = (accessToken) => {
  return function (dispatch) {
    dispatch({type: GET_USER_DATA_REQUEST});

    const options = {
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
        dispatch({type: GET_USER_DATA_SUCCESS, user: res.user});
      })
      .catch(() => dispatch({type: GET_USER_DATA_ERROR}));
  }
}

export const editUserDataThunk = (accessToken, email, password, name) => {
  return function (dispatch) {
    dispatch({type: EDIT_USER_DATA_REQUEST});

    const data = {
      email: email,
      password: password,
      name: name,
    };

    const options = {
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
        dispatch({type: EDIT_USER_DATA_SUCCESS, user: res.user});
      })
      .catch(() => dispatch({type: EDIT_USER_DATA_ERROR}))
  }
}