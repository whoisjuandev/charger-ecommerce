import React, { useEffect, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  Paper,
} from "@material-ui/core";
import CartProduct from "./CartProduct";

export default function CartCheckout({
  cart,
  onCheckout,
  getCart,
  addToCart,
  removeFromCart,
  deleteFromCart,
  clearCart,
  handleChange,
  prices,
  redirectTo,
  history,
}) {
  const [openClearCart, setOpenClearCart] = useState(false);
  const [openCheckout, setOpenCheckout] = useState(false);
  const message = "The order was created you can follow it on your profile!";

  const handleClickOpenClearCart = () => {
    setOpenClearCart(true);
  };

  const handleCloseClearCart = () => {
    setOpenClearCart(false);
  };
  const handleClickOpenCheckout = () => {
    setOpenCheckout(true);
  };
  const handleCloseCheckout = () => {
    setOpenCheckout(false);
  };
  const handleOnCheckout = () => {
    onCheckout(message, redirectTo);
    handleCloseCheckout();
  };

  useEffect(() => {
    getCart();
  }, []);

  let tot = 0;
  
  
  Object.values(prices).forEach((price) => tot+=price
   );
console.log(tot)
  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Product</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Sub-Total</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((prod) => {
              
              return (
                <TableRow key={prod.id}>
                  <CartProduct
                    key={prod.id}
                    onClose={() => {
                      deleteFromCart(prod);
                    }}
                    product={prod}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    handleChange={handleChange}
                  />
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell align="right">Total</TableCell>
              <TableCell align="right">{tot}</TableCell> {/* tabla total*/ }
            </TableRow>
	  </TableFooter>
        </Table>
      </TableContainer>
      <br />
      <Dialog
        open={openClearCart}
        onClose={handleCloseClearCart}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to clear your entire cart?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you clear your cart all your items will be deleted from your
            cart.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClearCart} color="secondary">
            Cancel
          </Button>
          <Button onClick={clearCart} color="secondary" autoFocus>
            Clear my cart
          </Button>
        </DialogActions>
      </Dialog>
      <br />
      <Dialog
        open={openCheckout}
        onClose={handleCloseCheckout}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you ready to checkout?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Once you do checkout you wont be able to add or remove more items on
            this cart.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCheckout} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleOnCheckout} color="secondary" autoFocus>
            Checkout this cart
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        onClick={handleClickOpenClearCart}
        variant="contained"
        color="secondary"
        style={{ marginRight: "8px" }}
      >
        Clear Cart
      </Button>
      <Button
        onClick={handleClickOpenCheckout}
        variant="contained"
        color="secondary"
      >
        Checkout
      </Button>
    </Grid>
  );
}
