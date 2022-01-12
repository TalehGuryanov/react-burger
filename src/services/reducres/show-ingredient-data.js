import {SET_INGREDIENT_DATA, DELETE_INGREDIENT_DATA } from "../actions/actions";

const initialState = {
  ingredientData: {},
  isOpenModal: false
}

export function showIngredientData(state = initialState, action) {
  switch (action.type) {
    case SET_INGREDIENT_DATA: {
      return {
        ...state,
        ingredientData: action.item,
        isOpenModal: true
      }
    }
    case DELETE_INGREDIENT_DATA: {
      return {
        ...state,
        ingredientData: {},
        isOpenModal: false
      }
    }
    default: return {...state}
  }
}