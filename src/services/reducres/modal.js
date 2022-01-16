import { OPEN_INGREDIENT_MODAL, CLOSE_INGREDIENT_MODAL, OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL } from "../actions/modal";

const initialState = {
  isIngredientModalOpen: false,
  isOrderModalOpen: false
};

export function showHideModal(state = initialState, action) {
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