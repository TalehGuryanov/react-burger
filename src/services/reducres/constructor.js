import { ADD_ITEM_TO_CONSTRUCTOR, DELETE_ITEM_FROM_CONSTRUCTOR, ADD_BUN_TO_CONSTRUCTOR } from "../actions/constuctor";

const initialState = {
  bun: null,
  fillingItems: []
}

export function constructorReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM_TO_CONSTRUCTOR: {
      return {
        ...state,
        fillingItems: [...state.fillingItems, action.item]
      }
    }
    case DELETE_ITEM_FROM_CONSTRUCTOR: {
      return {
        ...state,
        fillingItems: state.fillingItems.filter((item) => item.index !== action.index)
      }
    }
    case ADD_BUN_TO_CONSTRUCTOR: {
      return {
        ...state,
        bun: action.bun
      }
    }
    default: {
      return state
    }
  }
}