import {URL} from "../constants";
import {GET_ORDER_DATA_REQUEST, GET_ORDER_DATA_SUCCESS, GET_ORDER_DATA_ERROR} from "../constants/order";
import {AppDispatch, AppThunk} from "../types";
import {TOrderData} from "../types/orderType";

interface IGetOrderDataRequest {
  readonly type: typeof GET_ORDER_DATA_REQUEST
}

const getOrderDataRequestActionCreator: () => IGetOrderDataRequest = () => ({
  type: GET_ORDER_DATA_REQUEST
})

interface IGetOrderDataSuccess {
  readonly type: typeof GET_ORDER_DATA_SUCCESS;
  readonly data: TOrderData
}

const getOrderDataSuccessActionCreator: (data: TOrderData) => IGetOrderDataSuccess = (data) => ({
  type: GET_ORDER_DATA_SUCCESS,
  data
})

interface IGetOrderDataError {
  readonly type: typeof GET_ORDER_DATA_ERROR
}

const getOrderDataErrorActionCreator: () => IGetOrderDataError = () => ({
  type: GET_ORDER_DATA_ERROR
})

export type TOrderActions =
  | IGetOrderDataRequest
  | IGetOrderDataSuccess
  | IGetOrderDataError

export const orderThunk: AppThunk = (post: RequestInit) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderDataRequestActionCreator())
    
    fetch(`${URL}/orders`, post)
        .then((response) => {
          if(!response.ok) {
            dispatch(getOrderDataErrorActionCreator());
            throw new Error('Something went wrong');
          }
          return response.json()
        })
        .then((result) => dispatch(getOrderDataSuccessActionCreator(result)))
        .catch(() => dispatch(getOrderDataErrorActionCreator()));
  }
}