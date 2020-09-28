import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import NavBarCOntainer from "../NavBar/Container";
import ShippingAndPaymentForm from "./ShippingAndPaymentForm";
import { Box, Grid, makeStyles } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import PurchaseContainer from "./PurchaseContainer";
import { getOrders } from "../../store/actions";

const useStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4em",
    background: "#3d3d3d",
    height: "90.8vh",
  },
});

function Purchase({ user, orders, getOrders, doPayment }) {
  const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  //hay que hacer el resfasfsa hiciste un pequeño lio "insertar sticker de lio chiquito"
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [purchaseMethod, setPurchaseMethod] = React.useState("");
  const [shippingAdress, setShippingAdress] = React.useState("");

  const classes = useStyle();

  useEffect(() => {
    console.log('Recibí un payment method');
    console.log(paymentMethod)
  }, [paymentMethod]);

  useEffect(() => {
    if (user) getOrders(user.id);
  }, [user]);

  function handleSubmit() {
    // Aca corres el doPayment
  }

  return (
    <>
      <div style={{ paddingTop: 20 }}></div>
      <ThemeProvider theme={darkTheme}>
        <Box mt={2}>
          <Grid
            fullwidth
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            className={classes.root}
          >
            <NavBarCOntainer />
            <PurchaseContainer
              orders={orders}
              user={user}
              getOrders={getOrders}
            />
            <ShippingAndPaymentForm
              setPaymentMethodDos={setPaymentMethod}
              setPurchaseMethod={setPurchaseMethod}
              setShippingAdress={setShippingAdress}
              shippingAdress={shippingAdress}
              purchaseMethod={purchaseMethod}
              doPayment={doPayment}
              />
          </Grid>
        </Box>
      </ThemeProvider>
    </>
  );
}

function mapStateToProps(state) {
  return {
    orders: state.orders,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrders: (userId) => dispatch(getOrders(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);