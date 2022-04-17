import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_ERROR } from "../constants/ingredients";
import {TIngredient} from "../types/ingredientsTypes";
import {TIngredientsAction} from "../actions/ingredients";

type TIngredientsState = {
  ingredientItems: TIngredient[];
  ingredientItemsRequest: boolean;
  ingredientItemsFailed: boolean;
}
const ingredientsInitialState: TIngredientsState = {
  ingredientItems: [],
  ingredientItemsRequest: false,
  ingredientItemsFailed: false,
};

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsAction) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        ingredientItemsRequest: true,
        ingredientItemsFailed: false
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        ingredientItemsRequest: false,
        ingredientItemsFailed: false,
        ingredientItems: action.items
      };
    }
    case GET_ITEMS_ERROR: {
      return {
        ...state,
        ingredientItemsRequest: false,
        ingredientItemsFailed: true
      }
    }
    default: {
      return state
    }
  }
}