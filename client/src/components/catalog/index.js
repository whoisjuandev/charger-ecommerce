import React from "react";
import { makeStyles, Grid } from "@material-ui/core";
import ProductCard from "../productCard";

// STYLES
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

// Component
export default ({products, setAlert, addToCart, removeFromCart}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} xs={12} justify="center" alignItems="center">
        {products.map((prod, index) => (
          <Grid key={index} item lg={8} sm={4}>
            <ProductCard
              product={prod}
              setAlert={setAlert}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};