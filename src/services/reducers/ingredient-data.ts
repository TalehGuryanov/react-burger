import { ADD_INGREDIENT_DATA, DELETE_INGREDIENT_DATA } from "../constants/ingredient-data";
import {TIngredientDataActions} from "../actions/ingredient-data";

type TIngredientDataState = {
  ingredientData: any
}

const ingredientDataStat: TIngredientDataState = {
  ingredientData: {}
}

export function ingredientDataReducer(state = ingredientDataStat, action: TIngredientDataActions) {
  switch (action.type) {
    case ADD_INGREDIENT_DATA: {
      return {
        ...state,
        ingredientData: action.item
      }
    }
    case DELETE_INGREDIENT_DATA: {
      return {
        ...state,
        ingredientData: {}
      }
    }
    default: {
      return state
    }
  }
}