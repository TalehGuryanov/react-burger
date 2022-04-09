import {
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_CLOSE,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_GET_MESSAGE,
  FEED_WS_CONNECTION_SEND_MESSAGE,
  FEED_WS_CONNECTION_CLOSED,
} from "../constants/feed";
import {TOrderData} from "../types/orders";
import {TWsActions} from "../types/wsActions";

interface IFeedWsConnectionStart {
  readonly type: typeof FEED_WS_CONNECTION_START
}

export const feedWsConnectionStartActionCreator: () => IFeedWsConnectionStart = () => (
    {
      type: FEED_WS_CONNECTION_START,
    }
)

interface IFeedWsConnectionClose {
  readonly type: typeof FEED_WS_CONNECTION_CLOSE
}

interface IFeedWsConnectionSuccess {
  readonly type: typeof FEED_WS_CONNECTION_SUCCESS
}

interface IFeedWsConnectionError {
  readonly type: typeof FEED_WS_CONNECTION_ERROR
}

interface IFeedWsConnectionGetMessage {
  readonly type: typeof FEED_WS_CONNECTION_GET_MESSAGE
  readonly data: TOrderData
}

interface IFeedWsConnectionSendMessage {
  readonly type: typeof FEED_WS_CONNECTION_SEND_MESSAGE
}

interface IFeedWsConnectionSClosed {
  readonly type: typeof FEED_WS_CONNECTION_CLOSED
}

export const feedWsActions: TWsActions = {
  wsInit: FEED_WS_CONNECTION_START,
  wsSendMessage: FEED_WS_CONNECTION_SEND_MESSAGE,
  onOpen: FEED_WS_CONNECTION_SUCCESS,
  onClose: FEED_WS_CONNECTION_CLOSED,
  onError: FEED_WS_CONNECTION_ERROR,
  onMessage: FEED_WS_CONNECTION_GET_MESSAGE
}

export type TFeedActions =
  | IFeedWsConnectionStart
  | IFeedWsConnectionSuccess
  | IFeedWsConnectionError
  | IFeedWsConnectionSendMessage
  | IFeedWsConnectionGetMessage
  | IFeedWsConnectionSClosed
  | IFeedWsConnectionClose