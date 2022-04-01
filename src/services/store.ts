import {applyMiddleware, createStore} from 'redux';
import { rootReducer } from './reducers';
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {WS_ALL_ORDERS} from "./constants";
import {socketMiddleware} from "./middleware/socketMiddleware";

const enhancer = composeWithDevTools(applyMiddleware(thunk, socketMiddleware(WS_ALL_ORDERS)));

export const store = createStore(rootReducer, enhancer);