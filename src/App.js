/** @format */

// Hello Dear

import "./App.css";
import React, {useEffect, useState} from "react";
import routes from "../src/router/Router";

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import CheckoutPage from "./pages/CheckoutPage";
import PrivateRoute from "./components/master/privateRoute/PrivateRoute";
import SimpleModel from "./components/master/simpleModal/SimpleModel";
import LocationStore from "./components/Location&Store/Location&Store";
import {useDispatch, useSelector} from "react-redux";
import {selectStorModal} from "./_redux/_global_store/action/GlobalAction";
import {getLocalSearchInfo} from "./components/Location&Store/_redux/action/Location&StoreAction";
import UserAccount from "./pages/UserAccount";
import WishlistPage from "./pages/WishlistPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import OrderListPage from "./pages/OrderListPage";
import AddressBookPage from "./pages/AddressBookPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import SubCategoryPage from "./pages/SubCategoryPage";

function App() {
  const dispatch = useDispatch();
  const isStoreModalActive = useSelector(
    (state) => state.GlobalReducer.isStoreModalActive
  );
  const LocalSearchInfo = useSelector(
    (state) => state.LocationStoreReducer.LocalSearchInfo
  );
  //  const [isModalActive, setIsModalAction] = useState(false)

  useEffect(() => {
    dispatch(getLocalSearchInfo());
  }, [dispatch]);

  useEffect(() => {
    if (
      typeof LocalSearchInfo !== "undefined" &&
      LocalSearchInfo !== null &&
      LocalSearchInfo !== ""
    ) {
      dispatch(selectStorModal(false));
      // setIsModalAction(true)
    } else {
      dispatch(selectStorModal(true));
      // setIsModalAction(false)
    }
  }, [LocalSearchInfo, dispatch]);

  const handleClose = () => {
    dispatch(selectStorModal(false));
  };

  return (
    <>
      <Router>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              name={route.name}
              component={route.component}
            />
          ))}
          <Route path="/sub-category/:id" exact={true}>
            <SubCategoryPage />
          </Route>

          <PrivateRoute path="/wishlist">
            <WishlistPage />
          </PrivateRoute>
          <PrivateRoute exact={true} path="/checkout">
            <CheckoutPage />
          </PrivateRoute>
          <PrivateRoute exact={true} path="/account">
            <UserAccount />
          </PrivateRoute>
          <PrivateRoute exact={true} path="/order">
            <OrderListPage />
          </PrivateRoute>
          {/* <PrivateRoute exact={true} path='/wishlist'>
          </PrivateRoute> */}

          <PrivateRoute exact={true} path="/password-change">
            <ChangePasswordPage />
          </PrivateRoute>
          <PrivateRoute exact={true} path="/address-book">
            <AddressBookPage />
          </PrivateRoute>
          <PrivateRoute exact={true} path="/order/order-details/:id">
            <OrderDetailsPage />
          </PrivateRoute>
        </Switch>
      </Router>
      <SimpleModel
        show={isStoreModalActive}
        size="md"
        handleClose={handleClose}
        onHide={handleClose}
        // isCloseButton={false}
      >
        <LocationStore />
      </SimpleModel>
    </>
  );
}

export default App;
