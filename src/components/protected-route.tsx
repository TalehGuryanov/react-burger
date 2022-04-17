import {Redirect, Route, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import React, {ReactNode} from "react";
import {TIsLogged} from "../services/types";

type TProtectedRouteProps = {
  children: ReactNode,
  isLogged: TIsLogged,
  redirectTo: string,
  [x:string]: any
}

const ProtectedRoute: React.FC<TProtectedRouteProps> = ({ children, isLogged, redirectTo, ...rest }) => {
  const {pathname} = useLocation();

  if(!isLogged) {
    return <Redirect to={{
      pathname: redirectTo,
      state: {from: pathname}
    }}/>
  }

  return (
    <Route
      {...rest}
      render={() => children}
    />
  )
}

export default ProtectedRoute;
