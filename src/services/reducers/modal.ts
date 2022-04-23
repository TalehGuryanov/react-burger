import { OPEN_INGREDIENT_MODAL, CLOSE_INGREDIENT_MODAL, OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL } from "../constants/modal";
import {TModalActions} from "../actions/modal";

type TModalState = {
  isIngredientModalOpen: boolean;
  isOrderModalOpen: boolean
}
export const modalInitialState: TModalState = {
  isIngredientModalOpen: false,
  isOrderModalOpen: false
};

export function modalReducer(state = modalInitialState, action: TModalActions) {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL: {
      return {
        ...state,
        isIngredientModalOpen: true
      }
    }
    case CLOSE_INGREDIENT_MODAL: {
      return {
        ...state,
        isIngredientModalOpen: false
      }
    }
    case OPEN_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalOpen: true
      }
    }
    case CLOSE_ORDER_MODAL: {
      return {
        ...state,
        isOrderModalOpen: false
      }
    }
    default: {
      return state
    }
  }
};