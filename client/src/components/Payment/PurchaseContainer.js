import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Avatar,
  makeStyles,
  Grid,
  Divider,
} from "@material-ui/core";
import { useParams } from "react-router-dom";

const useStyle = makeStyles({
  card: {
    margin: "2em",
  },
  product: {
    display: "flex",
    alignItems: "center",
    marginTop: "1em",
    marginBottom: "1em",
  },
});

export default function PurchaseContainer({ user, orders, getOrders }) {
  const classes = useStyle();
  const { orderId } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (user) getOrders(user.id);
  }, [user]);

  useEffect(() => {
    if (orders)/*  console.log(orders) */;
    setOrder(
      orders
        .map((order) => ({
          ...order,
          shoppingCard: undefined,
          products: order.shoppingCart.content,
        }))
        .filter((order) => {
          return order.id === orderId;
        })[0]
    );
  }, [orders]);

  let total = 0;

  if (order !== null && order !== undefined) {
    /* console.log(order) */;
    order.products.map((prod) => {
      total += prod.price * prod.amount;
      return prod;
    });

    return (
      <>
        <Grid>
          <Grid xs={12} item>
            <Card className={classes.card}>
              <CardContent>
                <Box>
                  <Typography>Order: #{order.id}</Typography>
                </Box>
                {order.products.map((prod, index) => (
                  <>
                    <Box key={index} className={classes.product}>
                      <Avatar src={prod.image} style={{ marginRight: "8px" }} />
                      <Typography>
                        {" "}
                        {prod.name} - ${prod.price * prod.amount} ( $
                        {prod.price} x{prod.amount} )
                      </Typography>
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
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <h1>No orders</h1>
      </>
    );
  }
}
