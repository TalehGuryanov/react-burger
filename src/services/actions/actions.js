import { URL } from "../../utils/constants";

export const GET_ITEMS = "GET_ITEMS";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";
export const SET_INGREDIENT_DATA = "SET_INGREDIENT_DATA";
export const DELETE_INGREDIENT_DATA = "DELETE_INGREDIENT_DATA";
export const ADD_ITEM_TO_CONSTRUCTOR = "ADD_ITEM_TO_CONSTRUCTOR";
export const ADD_BUN_TO_CONSTRUCTOR = "ADD_BUN_TO_CONSTRUCTOR";
export const DELETE_ITEM_FROM_CONSTRUCTOR = "DELETE_ITEM_FROM_CONSTRUCTOR";
export const GET_ORDER = "GET_ORDER";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const SHOW_ORDER_DATA = "SHOW_ORDER_DATA";
export const HIDE_ORDER_DATA = "HIDE_ORDER_DATA";

export function getIngredients() {
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

export function getOrder(post) {
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
