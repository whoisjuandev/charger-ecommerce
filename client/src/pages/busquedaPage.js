import React, { useEffect, useState } from "react";
import Selector from "../components/Selector";
import {
  createMuiTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
  getProducts,
  getSelectors,
  addToCart,
  removeFromCart,
} from "../store/actions";
import { connect } from "react-redux";
import NavBarCOntainer from "../components/NavBar/Container";
import { Snackbar } from "@material-ui/core";
import CatalogContainer from "../components/catalogContainer";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles(() => ({
  cont: {
    background: "#3D3D3D",
  },
}));

function Catalogo({
  products,
  getProducts,
  getSelectors,
  selectors,
  cart,
  addToCart,
}) {
  const classes = useStyles();

  const [alert, setAlert] = useState(false);

  useEffect(() => {
    getProducts();
    getSelectors();
  }, []);

  function onSelect(id) {
    //getProducts(id);
  }
  return (
    <>
      <NavBarCOntainer cart={cart} />
      <div style={{ paddingTop: 64, backgroundColor: "#3D3D3D" }}></div>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.cont}>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            paddingBottom="40px"
            className={classes.background}
          >
            {
              /*selectors.map(cat=>{
                  return(
                    <Selector nom={cat.name} desc={cat.description} val={cat.id}/>
                  )
                })*/

              (() => {
                if (selectors) {
                  let results = [];

                  let i = 0;

                  for (let [key, value] of Object.entries(selectors)) {
                    results.push(
                      <Selector key={i} nom={key} elements={value} />
                    );
                    i++;
                  }

                  return results;
                } else {
                  return "";
                }
              })()
            }
          </Grid>
          <div>
            <CatalogContainer
              setAlert={setAlert}
              products={products.map((prod) => ({
                image: prod.imgs[0].url,
                title: prod.name,
                name: prod.name,
                description: prod.description,
                price: prod.price,
                id: prod.id,
                stock: prod.stock,
                categories: prod.categories,
              }))}
              addToCart={addToCart}
            />
          </div>
        </div>
      </ThemeProvider>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={alert}
        onClose={(e) => setAlert(false)}
        message="Out of stock"
      />
    </>
  );
}

function mapStateToProps(state) {
  return {
    products: state.products,
    selectors: state.selectors,
    cart: state.cart,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProducts: () => dispatch(getProducts()),
    getSelectors: () => dispatch(getSelectors()),
    addToCart: (product, message) => dispatch(addToCart(product, message)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalogo);
