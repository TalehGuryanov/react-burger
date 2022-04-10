import {Header} from "../header/header";
import {Route, Switch, useLocation} from "react-router-dom";
import ProtectedRoute from "../protected-route";
import PreviewModal from "../preview-modal/preview-modal";
import React, {useEffect, useState} from "react";
import {TLocation} from "../../services/types/location";
import {useDispatch, useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";
import {getCookie} from "../../utils/cookie";
import {ingredientsThunk} from "../../services/actions/ingredients";
import {Preloader} from "../preloader/preloader";
import {Feed, ForgotPassword, Ingredient, Login, Main, FeedOrder, Profile, Register, ResetPassword} from "../../pages";
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderPreview from "../order-preview/order-preview";
import UserOrder from "../../pages/user-order/user-order";

export const AppInner: React.FC = () => {
  const location = useLocation<TLocation>();
  const background = location.state && location.state.background;
  // Get ingredients
  const { ingredientItems }  = useSelector((store: RootState) => store.ingredients);
  const dispatch = useDispatch();
  
  // Constants for authenticator
  const { isPasswordCodeSuccess, isAuthRequest, isAuthSuccess, isAuthError, isLoggedSelector } = useSelector((store: RootState) => store.authResponse);
  const accessToken = getCookie("accessToken");
  const [isLogged, setIsLogged] = useState<boolean>(!!accessToken);
  
  useEffect(() => {
    
    if(isAuthSuccess || isAuthError) {
      setIsLogged(isLoggedSelector)
    }
    
    if(!ingredientItems.length) {
      dispatch(ingredientsThunk())
    }
  }, [ingredientItems, isAuthSuccess]);
  
  return (
    isAuthRequest ? <Preloader/> :
      <>
        <Header isLogged={isLogged}/>
        <Switch location={background || location}>
          <ProtectedRoute path="/reset-password" redirectTo={"/forgot-password"} isLogged={isPasswordCodeSuccess}>
            <ResetPassword />
          </ProtectedRoute>
          <ProtectedRoute path='/profile/orders/:id' exact isLogged={isLogged} redirectTo={"/login"}>
            <UserOrder />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" isLogged={isLogged} redirectTo={"/login"}>
            <Profile />
          </ProtectedRoute>
          <Route path="/login">
            <Login isLogged={isLogged} redirectTo={"/"}/>
          </Route>
          <Route path="/register" >
            <Register isLogged={isLogged} redirectTo={"/"}/>
          </Route>
          <Route path="/forgot-password" >
            <ForgotPassword isLogged={isLogged} redirectTo={"/"}/>
          </Route>
          <Route path="/feed" exact>
            <Feed />
          </Route>
          <Route path="/feed/:id" exact >
            <FeedOrder />
          </Route>
          <Route path="/ingredients/:id" >
            <Ingredient />
          </Route>
          <Route path="/" >
            <Main isLogged={isLogged}/>
          </Route>
        </Switch>
        {
          background && (
            <Route path="/ingredients/:id" exact>
              <PreviewModal children={<IngredientDetails/>} title={"Детали ингредиента"}/>
            </Route>
          )
        }
        {
          background && (
            <Route path="/feed/:id" exact>
              <PreviewModal children={<FeedOrder/>}/>
            </Route>
          )
        }
        {
          background && (
            <Route path="/profile/orders/:id" exact>
              <PreviewModal children={<UserOrder />}/>
            </Route>
          )
        }
      </>
  )
}