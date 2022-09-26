import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {Redirect, Route} from "react-router-dom";
import {getUserDataAction} from "../../_redux/getUserData/Action/UserDataAction";

const PrivateRoute = ({children, ...rest}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.UserDataReducer.userData);

  useEffect(() => {
    dispatch(getUserDataAction());
  }, []);

  return (
    <Route
      {...rest}
      render={({location}) =>
        userData ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: location},
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
