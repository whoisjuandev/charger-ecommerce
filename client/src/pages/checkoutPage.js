import React from "react";
import Checkout from "../components/Checkout/";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});
export default function CheckoutPage() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={8}>
          <Checkout />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </ThemeProvider>
  );
}
