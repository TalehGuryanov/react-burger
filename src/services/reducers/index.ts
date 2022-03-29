import { combineReducers } from 'redux';
import { ingredientsReducer } from "./ingredients";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { showHideModal } from "./modal";
import {authReducer} from "./auth";
import {userDataReducer} from "./user-data";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  constructorData: constructorReducer,
  order: orderReducer,
  modal: showHideModal,
  authResponse: authReducer,
  user: userDataReducer
});