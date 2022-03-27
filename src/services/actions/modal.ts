import {
  OPEN_INGREDIENT_MODAL,
  CLOSE_INGREDIENT_MODAL,
  OPEN_ORDER_MODAL,
  CLOSE_ORDER_MODAL
} from "../constants/modal";

interface IOpenIngredientModal {
  readonly type: typeof OPEN_INGREDIENT_MODAL
}

const openIngredientModalActionCreator: () => IOpenIngredientModal = () => (
    {type: OPEN_INGREDIENT_MODAL}
);

interface ICloseIngredientModal {
  readonly type: typeof CLOSE_INGREDIENT_MODAL
}

export const closeIngredientModalActionCreator: () => ICloseIngredientModal = () => (
    {type: CLOSE_INGREDIENT_MODAL}
);

interface IOpenOrderModal {
  readonly type: typeof OPEN_ORDER_MODAL
}

export const openOrderModalActionCreator: () => IOpenOrderModal = () => (
    {type: OPEN_ORDER_MODAL}
);

interface ICLoseOrderModal {
  readonly type: typeof CLOSE_ORDER_MODAL
}

const closeOrderModalActionCreator: () => ICLoseOrderModal = () => (
    {type: CLOSE_ORDER_MODAL}
);

export type TModalActions =
  | IOpenIngredientModal
  | ICloseIngredientModal
  | IOpenOrderModal
  | ICLoseOrderModal