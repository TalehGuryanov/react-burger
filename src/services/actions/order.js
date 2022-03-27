import {URL} from "../constants";

export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export function order(post) {
  return function (dispatch) {
    dispatch({type: GET_ORDER})

    fetch(`${URL}/orders`, post)
      .then((response) => {
        if(!response.ok) {
          dispatch({type: GET_ORDER_FAILED})
          throw new Error('Something went wrong');
        }
        return response.json()
      })
      .then((result) => dispatch({type: GET_ORDER_SUCCESS, data: result}))
      .catch(() => dispatch({type: GET_ORDER_FAILED}));
  }
}