import { ADD_INGREDIENT_DATA, DELETE_INGREDIENT_DATA } from "../actions/ingredient-data";

const initialState = {
  ingredientData: {},
}

export function ingredientDataReducer(state = initialState, action) {
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