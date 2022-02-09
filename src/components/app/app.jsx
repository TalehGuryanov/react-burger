import React, {useEffect} from 'react';
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

function App() {
  // Constants for authenticator
  const { isPasswordCodeSuccess, isLogged } = useSelector(store => store.authResponse);

  // Get ingredients
  const { ingredientItems }  = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!ingredientItems.length) {
      dispatch(ingredients())
    }
  }, [ingredientItems]);

  return (
    <main className={style.app}>
      <Router>
        <Header isLogged={isLogged}/>
        <Switch>
          <Route path="/" exact >
            <Main />
          </Route>
          <Route path="/ingredients/:id" exact >
            <Ingredient />
          </Route>
          <ProtectedRoute exact path="/profile" isLogged={isLogged} redirectTo={"/login"}>
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
          <ProtectedRoute path="/reset-password" redirectTo={"/forgot-password"} isLogged={isPasswordCodeSuccess}>
            <ResetPassword />
          </ProtectedRoute>
        </Switch>
      </Router>
    </main>
  );
}

export default App;
