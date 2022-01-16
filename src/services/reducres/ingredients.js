import { GET_ITEMS, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from "../actions/ingredients";

const initialState = {
  ingredientItems: [],
  ingredientItemsRequest: false,
  ingredientItemsFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS: {
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
    case GET_ITEMS_FAILED: {
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