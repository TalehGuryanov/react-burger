import React, {useEffect} from 'react';
import './app.module.css';
import Header from "../header/header";
import style from "./app.module.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Login, Main, Register, ForgotPassword, ResetPassword, Profile} from "../../pages";

function App() {
  return (
      <main className={style.app}>
        <Header />
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <Main />
            </Route>
            <Route path="/profile" >
              <Profile />
            </Route>
            <Route path="/login" >
              <Login/>
            </Route>
            <Route path="/register" >
              <Register/>
            </Route>
            <Route path="/forgot-password" >
              <ForgotPassword/>
            </Route>
            <Route path="/reset-password" >
              <ResetPassword/>
            </Route>
          </Switch>
        </Router>
      </main>
  );
}

export default App;
