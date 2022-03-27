import {
  ADD_ITEM_TO_CONSTRUCTOR,
  DELETE_ITEM_FROM_CONSTRUCTOR,
  CLEAN_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  SWAMP_INGREDIENTS
} from "../constants/constructor";
import {TIngredient} from "../types/ingredientsTypes";
import {TConstructorActions} from "../actions/constuctor";

type TConstructorState= {
  bun: TIngredient | null;
  fillingItems: TIngredient[];
}
const constructorInitialState: TConstructorState = {
  bun: null,
  fillingItems: []
}

export function constructorReducer(state = constructorInitialState, action: TConstructorActions): TConstructorState {
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
        fillingItems: state.fillingItems.filter((item: TIngredient) => item.index !== action.index)
      }
    }
    case CLEAN_CONSTRUCTOR: {
      return {
        ...state,
        bun: null,
        fillingItems: []
      }
    }
    case ADD_BUN_TO_CONSTRUCTOR: {
      return {
        ...state,
        bun: action.bun
      }
    }
    case SWAMP_INGREDIENTS: {
      return {
        ...state,
        fillingItems: action.changedArray
      }
    }
    default: {
      return state
    }
  }
}