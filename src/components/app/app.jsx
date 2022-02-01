import React from 'react';
import './app.module.css';
import Header from "../header/header";
import style from "./app.module.css"
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import {Login, Main, Register, ForgotPassword, ResetPassword} from "../../pages";

function App() {
  return (
      <main className={style.app}>
        <Header />
        <Router>
          <Switch>
            <Route path="/" exact={true}>
              <Main />
            </Route>
            <Route path="/login" exact={true}>
              <Login/>
            </Route>
            <Route path="/register" exact={true}>
              <Register/>
            </Route>
            <Route path="/forgot-password" exact={true}>
              <ForgotPassword/>
            </Route>
            <Route path="/reset-password" exact={true}>
              <ResetPassword/>
            </Route>
          </Switch>
        </Router>
      </main>
  );
}

export default App;
