import {Redirect, Route, useLocation} from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({ children, isLogged, redirectTo, ...rest }) {
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

ProtectedRoute.propsType = {
  isLogged: PropTypes.bool,
  redirectTo:  PropTypes.string,
  children: PropTypes.element
}


export default ProtectedRoute;