import {URL} from "../constants";

export const GET_ITEMS = "GET_ITEMS";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";

export function ingredients() {
  return function (dispatch) {
    dispatch({type: GET_ITEMS })

    fetch(`${URL}/ingredients`)
      .then((response) => {
        if(!response.ok) {
          dispatch({type: GET_ITEMS_FAILED});
          throw new Error('Something went wrong');
        }
        return response.json()
      })
      .then((res) => dispatch({type: GET_ITEMS_SUCCESS, items: res.data}))
      .catch(() => dispatch({type: GET_ITEMS_FAILED}))
  }
};