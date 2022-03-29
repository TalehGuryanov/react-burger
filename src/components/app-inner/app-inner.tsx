import {Header} from "../header/header";
import {Route, Switch, useLocation} from "react-router-dom";
import ProtectedRoute from "../protected-route";
import IngredientModal from "../ingredient-modal/ingredient-modal";
import React, {useEffect, useState} from "react";
import {TLocation} from "../../services/types/location";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../services/types";
import {getCookie} from "../../utils/cookie";
import {ingredientsThunk} from "../../services/actions/ingredients";
import {Preloader} from "../preloader/preloader";
import {ForgotPassword, Ingredient, Login, Main, Profile, Register, ResetPassword} from "../../pages";

export const AppInner: React.FC = () => {
  const location = useLocation<any>();
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
              <ProtectedRoute path="/profile" isLogged={isLogged} redirectTo={"/login"}>
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute path="/reset-password" redirectTo={"/forgot-password"} isLogged={isPasswordCodeSuccess}>
                <ResetPassword />
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
              <IngredientModal />
            </Route>
          )
        }
      </>
  )
}