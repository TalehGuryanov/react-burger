import { ADD_INGREDIENT_DATA, DELETE_INGREDIENT_DATA } from "../constants/ingredient-data";
import {TIngredient} from "../types/ingredientsTypes";

interface TAddIngredientData {
  readonly type: typeof ADD_INGREDIENT_DATA;
  readonly item: TIngredient
}

export const addIngredientDataActionCreator: (item: TIngredient) => TAddIngredientData = (item) => ({
    type: ADD_INGREDIENT_DATA,
    item
})

interface TDeleteIngredientData {
  readonly type: typeof DELETE_INGREDIENT_DATA
}

export const deleteIngredientDataActionCreator: () => TDeleteIngredientData = () => ({
  type: DELETE_INGREDIENT_DATA,
})

export type TIngredientDataActions =
  | TAddIngredientData
  | TDeleteIngredientData