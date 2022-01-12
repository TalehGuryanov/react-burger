import { combineReducers } from 'redux';
import { ingredientsList } from "./get-ingredients";
import { showIngredientData } from "./show-ingredient-data";
import { updateConstructor } from "./update-constructor";
import { sendOrderData } from "./get-order";
import { showOrderData } from "./show-order-data";

export const rootReducer = combineReducers({
  ingredients: ingredientsList,
  currentIngredient: showIngredientData,
  constructorData: updateConstructor,
  order: sendOrderData,
  orderModal: showOrderData
});