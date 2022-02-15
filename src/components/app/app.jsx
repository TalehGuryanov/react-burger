import React, {useEffect, useState} from 'react';
import './app.module.css';
import Header from "../header/header";
import style from "./app.module.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Login, Main, Register, ForgotPassword, ResetPassword, Profile, Ingredient} from "../../pages";
import ProtectedRoute from "../protected-route";
import {useDispatch, useSelector} from "react-redux";
import {ingredients} from "../../services/actions/ingredients";
import {getCookie} from "../../utils/cookie";
import Preloader from "../preloader/preloader";

function App() {
  // Get ingredients
  const { ingredientItems }  = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  // Constants for authenticator
  const { isPasswordCodeSuccess, isAuthRequest, isLoggedSelector } = useSelector(store => store.authResponse);
  const accessToken = getCookie("accessToken");
  const [isLogged, setIsLogged] = useState(!!accessToken);

  useEffect(() => {

    if(isLoggedSelector) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }

    if(!ingredientItems.length) {
      dispatch(ingredients())
    }
  }, [ingredientItems, isLoggedSelector]);

  return (
    isAuthRequest ? <Preloader/> :
    <main className={style.app}>
      <Router>
        <Header isLogged={isLogged}/>
        <Switch>
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
            <Main />
          </Route>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
