import React, { useEffect } from "react";
import NavBarCOntainer from "../NavBar/Container";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import {
  getProducts,
  getCart,
  addToCart,
  removeFromCart,
  deleteFromCart,
  checkout,
  clearCart,
} from "../../store/actions";

import CartCheckout from "./CartCheckout";

import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Button, Grid, Box } from "@material-ui/core";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function Checkout({
  cart,
  getCart,
  addToCart,
  removeFromCart,
  onCheckout,
  deleteFromCart,
  clearCart,
  history
}) {
  useEffect(() => {
    getProducts();
  }, []);

  const [prices, setPrices] = React.useState({})

  function handleChange(key, value) {
    setPrices({...prices, [key]:value})
  }

  return (
    <>
      <NavBarCOntainer />
      <div style={{ paddingTop: 64 }}></div>
      <ThemeProvider theme={darkTheme}>
        <Box mt={4}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            {cart.length > 0 ? (
              /* WHEN THE CLIENT HAVE PRODUCTS IN THE CART: */
              <>
                <CartCheckout
                  clearCart={clearCart}
                  onCheckout={onCheckout}
                  cart={cart}
                  getCart={getCart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  deleteFromCart={deleteFromCart}
                  handleChange={handleChange}
                  prices={prices}
                  redirectTo={history.push}
                />
              </>
            ) : (
              /* WHEN THE CLIENT DON'T HAVE PRODUCTS IN THE CART */
              <div
                style={{ textAlign: "center", color: "#666", marginTop: "2em" }}
              >
                <h1>No products in the cart</h1>
                <RemoveShoppingCartIcon style={{ fontSize: "15em" }} />
              </div>
            )}
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}

function mapStateToProps(state) {
  return {
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCart: () => dispatch(getCart()),
    addToCart: (product, message) => dispatch(addToCart(product, message)),
    removeFromCart: (id, message) => dispatch(removeFromCart(id, message)),
    deleteFromCart: (id, message) => dispatch(deleteFromCart(id, message)),
    onCheckout: (message, redirectTo) => dispatch(checkout(message, redirectTo)),
    clearCart: () => dispatch(clearCart()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Checkout));
