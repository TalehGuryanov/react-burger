import {
  FEED_WS_CONNECTION_START,
  FEED_WS_CONNECTION_SUCCESS,
  FEED_WS_CONNECTION_ERROR,
  FEED_WS_CONNECTION_GET_MESSAGE,
  FEED_WS_CONNECTION_SEND_MESSAGE,
  FEED_WS_CONNECTION_CLOSED,
} from "../constants/feed";
import {TAllOrders, TWebSocketEvent} from "../types/web-socket";

interface IFeedWsConnectionStart {
  readonly type: typeof FEED_WS_CONNECTION_START
}

export const FeedWsConnectionStartActionCreator: () => IFeedWsConnectionStart = () => (
    {
      type: FEED_WS_CONNECTION_START
    }
)

interface IFeedWsConnectionSuccess {
  readonly type: typeof FEED_WS_CONNECTION_SUCCESS
  readonly event: TWebSocketEvent
}

export const FeedWsConnectionSuccessActionCreator: (event: TWebSocketEvent) => IFeedWsConnectionSuccess = (event) => (
    {
      type: FEED_WS_CONNECTION_SUCCESS,
      event
    }
)

interface IFeedWsConnectionError {
  readonly type: typeof FEED_WS_CONNECTION_ERROR
  readonly event: TWebSocketEvent
}

export const FeedWsConnectionErrorActionCreator: (event: TWebSocketEvent) => IFeedWsConnectionError = (event) => (
    {
      type: FEED_WS_CONNECTION_ERROR,
      event
    }
)

interface IFeedWsConnectionGetMessage {
  readonly type: typeof FEED_WS_CONNECTION_GET_MESSAGE
  readonly data: TAllOrders
}

export const FeedWsConnectionGetMessageActionCreator: (data: TAllOrders) => IFeedWsConnectionGetMessage = (data) => (
    {
      type: FEED_WS_CONNECTION_GET_MESSAGE,
      data
    }
)

interface IFeedWsConnectionSendMessage {
  readonly type: typeof FEED_WS_CONNECTION_SEND_MESSAGE
}

export const IFeedWsConnectionSendMessageActionCreator: () => IFeedWsConnectionSendMessage = () => (
    {
      type: FEED_WS_CONNECTION_SEND_MESSAGE
    }
)

interface IFeedWsConnectionSClosed {
  readonly type: typeof FEED_WS_CONNECTION_CLOSED
  readonly event: any
}

export const IFeedWsConnectionClosedActionCreator: (event: any) => IFeedWsConnectionSClosed = (event) => (
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