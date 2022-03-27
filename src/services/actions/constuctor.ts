import update from 'immutability-helper';
import {
  ADD_ITEM_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  DELETE_ITEM_FROM_CONSTRUCTOR,
  CLEAN_CONSTRUCTOR,
  SWAMP_INGREDIENTS,
} from "../constants/constructor";
import {AppDispatch, AppThunk} from "../types";
import {TIngredient} from "../types/ingredientsTypes";

export interface IAddItemToConstructor {
  readonly type: typeof ADD_ITEM_TO_CONSTRUCTOR;
  readonly item: TIngredient;
}

export const addItemActionCreator: (item: TIngredient) => IAddItemToConstructor = (item) => ({
  type: ADD_ITEM_TO_CONSTRUCTOR,
  item
});

export interface IAddBunToConstructor {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  readonly bun: TIngredient;
}

export const addBunActionCreator: (bun: TIngredient) => IAddBunToConstructor = (bun) => ({
  type: ADD_BUN_TO_CONSTRUCTOR,
  bun
});

export interface IDeleteItemFromConstructor {
  readonly type: typeof DELETE_ITEM_FROM_CONSTRUCTOR;
  readonly index: string | number | undefined;
}

export const deleteItemActionCreator: (index: string | number | undefined) => IDeleteItemFromConstructor = (index) => ({
  type: DELETE_ITEM_FROM_CONSTRUCTOR,
  index
});

export interface ICleanConstructor {
  readonly type: typeof CLEAN_CONSTRUCTOR;
}

export const cleanConstructorActionCreator: () => ICleanConstructor = () => ({
  type: CLEAN_CONSTRUCTOR
});

export interface ISwampIngredients {
  readonly type: typeof SWAMP_INGREDIENTS;
  readonly changedArray: TIngredient[];
}

export const swampIngredientsActionCreator = (changedArray: TIngredient[]): ISwampIngredients => ({
  type: SWAMP_INGREDIENTS,
  changedArray
});

export type TConstructorActions =
    | IAddItemToConstructor
    | IAddBunToConstructor
    | IDeleteItemFromConstructor
    | ICleanConstructor
    | ISwampIngredients

export const swapIngredients: AppThunk =
    (fillings: TIngredient[], dragIndex: number, hoverIndex: number) => {
  return function (dispatch: AppDispatch) {
    const dragItem = fillings[dragIndex];
    const changedFillings = update(fillings, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragItem]
      ]
    })

    dispatch(swampIngredientsActionCreator(changedFillings));
  }
}