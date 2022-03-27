import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR
} from "../constants/ingredients";
import {URL} from "../constants";
import {AppDispatch, AppThunk, TIngredient} from "../types";

interface IGetIngredientsRequest {
  readonly type: typeof GET_ITEMS_REQUEST
}

const getIngredientsRequestActionCreator: () => IGetIngredientsRequest = () => ({
  type: GET_ITEMS_REQUEST
})

interface IGetIngredientsSuccess{
  readonly type: typeof GET_ITEMS_SUCCESS
  items: TIngredient[]
}

const getIngredientsSuccessActionCreator: (items: TIngredient[]) => IGetIngredientsSuccess = (items) => ({
  type: GET_ITEMS_SUCCESS,
  items
})

interface IGetIngredientsError {
  readonly type: typeof GET_ITEMS_ERROR
}

const getIngredientsErrorActionCreator: () => IGetIngredientsError = () => ({
  type: GET_ITEMS_ERROR
})

export type TIngredientsAction = 
  | IGetIngredientsRequest
  | IGetIngredientsSuccess 
  | IGetIngredientsError

export const ingredientsThunk: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsRequestActionCreator())
    
    fetch(`${URL}/ingredients`)
        .then((response) => {
          if(!response.ok) {
            dispatch(getIngredientsErrorActionCreator());
            throw new Error('Something went wrong');
          }
          return response.json()
        })
        .then((res) => dispatch(getIngredientsSuccessActionCreator(res.data)))
        .catch(() => dispatch(getIngredientsErrorActionCreator()))
  }
}