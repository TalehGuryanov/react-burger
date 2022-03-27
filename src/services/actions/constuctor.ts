import update from 'immutability-helper';
import {
  ADD_ITEM_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  DELETE_ITEM_FROM_CONSTRUCTOR,
  CLEAN_CONSTRUCTOR,
  SWAMP_INGREDIENTS,
} from "../constants/constructor";
import {TIngredient} from "../types";

export interface IAddItemToConstructor {
  readonly type: typeof ADD_ITEM_TO_CONSTRUCTOR;
  readonly item: TIngredient;
}

export interface IAddBunToConstructor {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  readonly bun: TIngredient;
}

export interface IDeleteItemFromConstructor {
  readonly type: typeof DELETE_ITEM_FROM_CONSTRUCTOR;
  readonly index: string | number | undefined;
}

export interface ICleanConstructor {
  readonly type: typeof CLEAN_CONSTRUCTOR;
}

export interface ISwampIngredients {
  readonly type: typeof SWAMP_INGREDIENTS;
  readonly changedArray: any;
}

export type TConstructorActions =
    | IAddItemToConstructor
    | IAddBunToConstructor
    | IDeleteItemFromConstructor
    | ICleanConstructor
    | ISwampIngredients

export const addItemCreator: (item: TIngredient) => IAddItemToConstructor = (item) => ({
  type: ADD_ITEM_TO_CONSTRUCTOR,
  item
});

export const addBunCreator: (bun: TIngredient) => IAddBunToConstructor = (bun) => ({
  type: ADD_BUN_TO_CONSTRUCTOR,
  bun
});

export const deleteItemCreator: (index: string | number | undefined) => IDeleteItemFromConstructor = (index) => ({
  type: DELETE_ITEM_FROM_CONSTRUCTOR,
  index
});

export const cleanConstructorCreator: () => ICleanConstructor = () => ({
  type: CLEAN_CONSTRUCTOR
});

export const swampIngredients = (changedArray: any): ISwampIngredients => ({
  type: SWAMP_INGREDIENTS,
  changedArray
});


export const swapIngredients =
    (fillings: any, dragIndex: any, hoverIndex: any) => {
  return function (dispatch: any) {
    const dragItem = fillings[dragIndex];
    const changedFillings = update(fillings, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragItem]
      ]
    })

    dispatch(swampIngredients(changedFillings));
  }
}