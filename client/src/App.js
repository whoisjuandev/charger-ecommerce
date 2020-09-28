import React, { useEffect } from "react";
import "./App.css";

import { Route, Switch } from "react-router-dom";

// PAGES
import HomePage from "./pages/homePage";
import BusquedaPage from "./pages/busquedaPage";
import CheckoutPage from "./pages/checkoutPage";
import ProductoPage from "./pages/productPage";
import AdminPage from "./pages/adminPage";
import CategoriaPage from "./pages/categoriaPage";
import LoginPage from "./pages/loginPage";
import CreateUserPage from "./pages/createUserPage";
import userPanelPage from "./pages/userPanelPage";
import orderPage from "./pages/orderPage";
import ForgotPasswordPage from "./pages/forgotPasswordPage";
import OrderCheckoutPage from "./pages/orderCheckoutPage";
import { connect } from "react-redux";
import { checkLogin } from "./store/actions";
import SuccessSnackbar from "./components/Snackbars/SuccessSnackbar";
import ErrorSnackbar from "./components/Snackbars/ErrorSnackbar";
import { getUser } from "./store/actions";
import PurchasePage from "./pages/PurchasePage";
import OrderConfirmPage from "./pages/orderConfirmPage";
import CreateReview from './pages/createReview.js';
import PrivateRoute from './components/Routes/PrivateRoute';
import PrivateAdmin from './components/Routes/PrivateAdmin';

function App({ getUser }) {
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
      <SuccessSnackbar />
      <ErrorSnackbar />
      <Switch>
        {/* User Routes */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signUp" component={CreateUserPage} />
        <Route exact path="/forgotPassword" component={ForgotPasswordPage} />
        <Route exact path="/search/:query" component={BusquedaPage} />
        <Route exact path="/catalog" component={BusquedaPage} />
        <Route exact path="/product" component={ProductoPage} />
        <Route exact path="/category/:categoryId" component={CategoriaPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/checkout/purchase/:orderId" component={PurchasePage} />
        <Route exact path="/product/:product" component={ProductoPage} />
        <PrivateRoute exact path="/user" component={userPanelPage} />
        <Route exact path="/order/confirm/:token" component={OrderConfirmPage} />
        <PrivateRoute exact path="/order/:id" component={orderPage} />
        <PrivateRoute exact path='/createReview/' component={CreateReview} />
        <PrivateRoute exact path='/checkout/confirm' component={OrderCheckoutPage} />
        {/* Admin Routes */}
        <PrivateAdmin exact path="/admin" component={AdminPage} />
      </Switch>
    </>
  );
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => dispatch(getUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
