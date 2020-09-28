import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Avatar,
  makeStyles,
  Grid,
  Modal,
  Button,
  Divider,
  Tooltip,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import NavBarContainer from "../components/NavBar/Container";
import CreateReview from "../components/CreateReview";
import { getOrders, getUserReviews } from "../store/actions";
import { Link, useParams } from "react-router-dom";

const useStyle = makeStyles({
  root: {
    marginTop: "4em",
    background: "#3d3d3d",
    height: "90.8vh",
  },
  card: {
    margin: "2em",
  },
  product: {
    display: "flex",
    alignItems: "center",
    marginTop: "1em",
    marginBottom: "1em",
  },
  process: {
    display: "flex",
    alignItems: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

function OrderPage({ user, orders, getOrders, reviews, getUserReviews }) {
  const classes = useStyle();

  const { id } = useParams();

  const [order, setOrder] = useState(null);

  const [open, setOpen] = React.useState(false);

  const [p, setP] = React.useState(0);

  const handleOpen = (productId) => {
    setOpen(true);
    setP(productId);
  };

  const handleClose = () => {
    setOpen(false);
    getUserReviews(user.id);
  };

  useEffect(() => {
    if (user) {
      getOrders(user.id);
      getUserReviews(user.id);
    }
  }, [user]);

  useEffect(() => {
    if (orders)
      setOrder(
        orders
          .map((order) => ({
            ...order,
            shoppingCard: undefined,
            products: order.shoppingCart.content,
          }))
          .filter((order) => {
            return order.id === id;
          })[0]
      );
  }, [orders]);

  const handleDisabled = (prodId) => {
    let value;
    if (!reviews) {
      value = false;
    } else {
      for (var j = 0; j < reviews.length; j++) {
        if (reviews[j] && reviews[j].productId === prodId) {
          value = true;
        }
      }
    }
    return value;
  };

  let total = 0;

  if (order !== null && order !== undefined) {
    order.products.map((prod) => {
      total += prod.price * prod.amount;
      return prod;
    });
    return (
      <>
        <NavBarContainer noTransparent={true} />
        <Grid container className={classes.root}>
          <Grid xs={6} item>
            <Card className={classes.card}>
              <CardContent>
                <Box>
                  <Typography>Order: #{order.id}</Typography>
                </Box>
                {order.products.map((prod, index) => (
                  <>
                    <Box key={index} className={classes.product}>
                      <Tooltip title="Go to product" arrow>
                        <Link to={`/product/${prod.id}`}>
                          <Avatar
                            src={prod.image}
                            style={{ marginRight: "8px" }}
                          />
                        </Link>
                      </Tooltip>
                      <Typography>
                        {" "}
                        {prod.name} - ${prod.price * prod.amount} ( $
                        {prod.price} x {prod.amount} )
                      </Typography>
                    </Box>
                    <Box>
                      <Tooltip
                        title={
                          handleDisabled(prod.id)
                            ? "Review already created"
                            : "Create a review"
                        }
                        placement="right"
                        arrow
                      >
                        <span>
                          <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpen(prod.id)}
                            disabled={handleDisabled(prod.id)}
                          >
                            Add Review
                          </Button>
                        </span>
                      </Tooltip>
                    </Box>
                  </>
                ))}
                <Box
                  mt={1}
                  style={{ maxWidth: "100%" }}
                  display="flex"
                  justifyContent="flex-end"
                >
                  <Divider />
                  <Typography variant="h5">Total: ${total}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid xs={6} item>
            <Card className={classes.card}>
              <CardContent>
                <Typography>
                  Status:{" "}
                  <Box component="span">
                    {order.state
                      .split("")
                      .map((l, i) => (i === 0 ? l.toUpperCase() : l))
                      .join("")}
                  </Box>
                </Typography>
                <Box component="div">
                  <Box component="div" className={classes.process}>
                    <PaymentIcon />
                    Payment:{" "}
                    {order.state === "pending" ? "Processing..." : "Completed"}
                  </Box>
                  <Box component="div" className={classes.process}>
                    <LocalShippingIcon />
                    Shipping:{" "}
                    {order.state === "shipping"
                      ? "Shipping"
                      : order.state === "complete"
                      ? "Completed"
                      : "Waiting"}
                  </Box>
                  <Box component="div" className={classes.process}>
                    <LocalShippingIcon />
                    Reception:{" "}
                    {order.state === "complete" ? "Completed" : "Waiting"}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          className={classes.modal}
          disableAutoFocus
          disableEnforceFocus
        >
          <Box alignItems="center" justifyContent="center">
            <CreateReview userId={user.id} productId={p} />
          </Box>
        </Modal>
        <Link to={`/checkout/purchase/${order.id}`}>
          <Button>Purchase</Button>
        </Link>
      </>
    );
  } else {
    return <Box>No orders</Box>;
  }
}

//  DISABLED FOR DEBUGGING

function mapStateToProps(state) {
  return {
    orders: state.orders,
    user: state.user,
    reviews: state.reviews,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrders: (userId) => dispatch(getOrders(userId)),
    getUserReviews: (userId) => dispatch(getUserReviews(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
