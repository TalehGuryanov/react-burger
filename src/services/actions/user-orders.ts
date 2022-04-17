import {
  USER_ORDERS_WS_CONNECTION_CLOSE,
  USER_ORDERS_WS_CONNECTION_CLOSED,
  USER_ORDERS_WS_CONNECTION_ERROR,
  USER_ORDERS_WS_CONNECTION_GET_MESSAGE,
  USER_ORDERS_WS_CONNECTION_SEND_MESSAGE,
  USER_ORDERS_WS_CONNECTION_START,
  USER_ORDERS_WS_CONNECTION_SUCCESS
} from "../constants/user-orders";

import {TOrderData} from "../types/orders";

interface IUserOrdersWsConnectionStart {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_START
}

export const userOrdersWsConnectionStartActionCreator: () => IUserOrdersWsConnectionStart = () => (
    {
      type: USER_ORDERS_WS_CONNECTION_START,
    }
)

interface IUserOrdersWsConnectionClose {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_CLOSE
}

export const userOrdersWsConnectionClosetActionCreator: () => IUserOrdersWsConnectionClose = () => (
    {
      type: USER_ORDERS_WS_CONNECTION_CLOSE,
    }
)

interface IUserOrdersWsConnectionSuccess {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_SUCCESS
}

interface IUserOrdersWsConnectionError {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_ERROR
}

interface IUserOrdersWsConnectionGetMessage {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_GET_MESSAGE
  readonly data: TOrderData
}

interface IUserOrdersWsConnectionSendMessage {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_SEND_MESSAGE
}

interface IUserOrdersWsConnectionClosed {
  readonly type: typeof USER_ORDERS_WS_CONNECTION_CLOSED
  wasClear: boolean
}

export const userOrdersWsActions = {
  wsInit: USER_ORDERS_WS_CONNECTION_START,
  wsSendMessage: USER_ORDERS_WS_CONNECTION_SEND_MESSAGE,
  wsClose: USER_ORDERS_WS_CONNECTION_CLOSE,
  onOpen: USER_ORDERS_WS_CONNECTION_SUCCESS,
  onClose: USER_ORDERS_WS_CONNECTION_CLOSED,
  onError: USER_ORDERS_WS_CONNECTION_ERROR,
  onMessage: USER_ORDERS_WS_CONNECTION_GET_MESSAGE
}

export type TUserOrdersActions =
    | IUserOrdersWsConnectionStart
    | IUserOrdersWsConnectionSuccess
    | IUserOrdersWsConnectionError
    | IUserOrdersWsConnectionSendMessage
    | IUserOrdersWsConnectionGetMessage
    | IUserOrdersWsConnectionClosed
    | IUserOrdersWsConnectionClose