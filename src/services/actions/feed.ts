import {
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_CLOSE,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_GET_MESSAGE,
  FEED_WS_CONNECTION_SEND_MESSAGE,
  FEED_WS_CONNECTION_CLOSED,
} from "../constants/feed";
import {TOrderData} from "../types/web-socket";

interface IFeedWsConnectionStart {
  readonly type: typeof FEED_WS_CONNECTION_START
  readonly wsRequest: boolean
}

export const feedWsConnectionStartActionCreator: (wsRequest: boolean) => IFeedWsConnectionStart = (wsRequest) => (
    {
      type: FEED_WS_CONNECTION_START,
      wsRequest
    }
)

interface IFeedWsConnectionClose {
  readonly type: typeof FEED_WS_CONNECTION_CLOSE
}

export const feedWsConnectionCloseActionCreator: () => IFeedWsConnectionClose = () => (
    {
      type: FEED_WS_CONNECTION_CLOSE
    }
)

interface IFeedWsConnectionSuccess {
  readonly type: typeof FEED_WS_CONNECTION_SUCCESS
  readonly event: Event
}

export const feedWsConnectionSuccessActionCreator: (event: Event) => IFeedWsConnectionSuccess = (event) => (
    {
      type: FEED_WS_CONNECTION_SUCCESS,
      event
    }
)

interface IFeedWsConnectionError {
  readonly type: typeof FEED_WS_CONNECTION_ERROR
  readonly event: Event
}

export const feedWsConnectionErrorActionCreator: (event: Event) => IFeedWsConnectionError = (event) => (
    {
      type: FEED_WS_CONNECTION_ERROR,
      event
    }
)

interface IFeedWsConnectionGetMessage {
  readonly type: typeof FEED_WS_CONNECTION_GET_MESSAGE
  readonly data: TOrderData
}

export const feedWsConnectionGetMessageActionCreator: (data: TOrderData) => IFeedWsConnectionGetMessage = (data) => (
    {
      type: FEED_WS_CONNECTION_GET_MESSAGE,
      data
    }
)

interface IFeedWsConnectionSendMessage {
  readonly type: typeof FEED_WS_CONNECTION_SEND_MESSAGE
}

export const feedWsConnectionSendMessageActionCreator: () => IFeedWsConnectionSendMessage = () => (
    {
      type: FEED_WS_CONNECTION_SEND_MESSAGE
    }
)

interface IFeedWsConnectionSClosed {
  readonly type: typeof FEED_WS_CONNECTION_CLOSED
  readonly event: CloseEvent
}

export const feedWsConnectionClosedActionCreator: (event: CloseEvent) => IFeedWsConnectionSClosed = (event) => (
    {
      type: FEED_WS_CONNECTION_CLOSED,
      event
    }
)

export type TFeedActions =
  | IFeedWsConnectionStart
  | IFeedWsConnectionSuccess
  | IFeedWsConnectionError
  | IFeedWsConnectionSendMessage
  | IFeedWsConnectionGetMessage
  | IFeedWsConnectionSClosed
  | IFeedWsConnectionClose