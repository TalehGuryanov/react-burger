import React from 'react';
import './app.module.css';
import Header from "../header/header";
import style from "./app.module.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Login, Main, Register, ForgotPassword, ResetPassword, Profile} from "../../pages";
import ProtectedRoute from "../protected-route";
import {getCookie} from "../../utils/get-cookie";
import {useSelector} from "react-redux";

function App() {
  const isLoggedSelector = getCookie("refreshToken") || false;
  const { isPasswordCodeSuccess } = useSelector(store => store.authResponse);

  return (
    <main className={style.app}>
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact >
            <Main />
          </Route>
          <ProtectedRoute exact path="/profile" isLogged={!!isLoggedSelector} redirectTo={"/login"}>
            <Profile />
          </ProtectedRoute>
          <Route path="/login">
            <Login isLogged={!!isLoggedSelector} redirectTo={"/"}/>
          </Route>
          <Route path="/register" >
            <Register isLogged={!!isLoggedSelector} redirectTo={"/"}/>
          </Route>
          <Route path="/forgot-password" >
            <ForgotPassword isLogged={!!isLoggedSelector} redirectTo={"/"}/>
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
