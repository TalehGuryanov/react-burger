import {applyMiddleware, createStore} from 'redux';
import { rootReducer } from './reducers';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {WS_ALL_ORDERS} from "./constants";
import {socketMiddleware} from "./middleware/socketMiddleware";
import {feedWsActions} from "./actions/feed";
import {userOrdersWsActions} from "./actions/user-orders";

const enhancer = composeWithDevTools(applyMiddleware(
    thunk,
    socketMiddleware(WS_ALL_ORDERS + "/all", feedWsActions),
    socketMiddleware(WS_ALL_ORDERS, userOrdersWsActions, true)
));

export const store = createStore(rootReducer, enhancer);