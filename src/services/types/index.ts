import {store} from "../store";
import {TConstructorActions} from "../actions/constuctor";
import {TAuthActions} from "../actions/auth";
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {TIngredientDataActions} from "../actions/ingredient-data";

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type TAppActions =
    | TConstructorActions
    | TAuthActions
    | TIngredientDataActions

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TAppActions>
    >;

export type TIsLogged = boolean;

export type TOnCLoseModal = () => void;

export type TIngredientType = 'bun' | 'main' | 'sauce';

export type TIngredient = {
  _id: string;
  id?: string;
  index?: number | string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  count?: number;
};
