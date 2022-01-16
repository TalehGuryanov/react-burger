import { combineReducers } from 'redux';
import { ingredientsReducer } from "./ingredients";
import { ingredientDataReducer } from "./ingredient-data";
import { constructorReducer } from "./constructor";
import { orderReducer } from "./order";
import { showHideModal } from "./modal";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  currentIngredient: ingredientDataReducer,
  constructorData: constructorReducer,
  order: orderReducer,
  modal: showHideModal
});