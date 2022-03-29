import {store} from "../store";
import {TConstructorActions} from "../actions/constuctor";
import {TAuthActions} from "../actions/auth";
import {Action, ActionCreator} from "redux";
import {ThunkAction} from "redux-thunk";
import {TIngredientsAction} from "../actions/ingredients";
import {TModalActions} from "../actions/modal";
import {TOrderActions} from "../actions/order";
import {TUserDataActions} from "../actions/user-data";

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type TAppActions =
    | TConstructorActions
    | TAuthActions
    | TIngredientsAction
    | TModalActions
    | TOrderActions
    | TUserDataActions

export type AppThunk<TReturn = void> = ActionCreator<
    ThunkAction<TReturn, Action, RootState, TAppActions>
    >;

export type TIsLogged = boolean;

export type TOnCLoseModal = () => void;