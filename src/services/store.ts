import {applyMiddleware, createStore} from 'redux';
import { rootReducer } from './reducers';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {WS_ALL_ORDERS} from "./constants";
import {socketMiddleware} from "./middleware/socketMiddleware";
import {feedWsActions} from "./actions/feed";
import {getCookie} from "../utils/cookie";
import {userOrdersWsActions} from "./actions/user-orders";
const accessToken = getCookie("accessToken").replace("Bearer ", "");

const enhancer = composeWithDevTools(applyMiddleware(
    thunk,
    socketMiddleware(WS_ALL_ORDERS + "/all", feedWsActions),
    socketMiddleware(WS_ALL_ORDERS + `?token=${accessToken}`, userOrdersWsActions)
));

export const store = createStore(rootReducer, enhancer);