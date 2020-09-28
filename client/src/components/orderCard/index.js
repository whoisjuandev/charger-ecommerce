import React from "react";
import { makeStyles, Card, CardContent, Typography } from "@material-ui/core";

const useStyle = makeStyles({
  card: {
    maxWidth: "25em",
    marginTop: "8px",
  },
  title: {
    fontSize: "0.75em",
  },
  product: {
    fontSize: "0.75em",
    color: "#555555",
  },
  status: {
    color: "#888888",
    fontSize: "0.75em",
  },
});

export default function OrderCard({ id, products, status }) {
  const classes = useStyle();

  let total = 0;

    products.forEach(prod => {
        total += prod.price * prod.amount;
    });

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title}>
          Order #{id} <span className={classes.status}>Status: {status}</span>
        </Typography>
        {products.map((prod) => (
          <Typography className={classes.product}>
            {" "}
            - {prod.title} - ${prod.price * prod.amount} (${prod.price} - x
            {prod.amount})
          </Typography>
        ))}
        <Typography className={classes.total}>Total: ${total}</Typography>
      </CardContent>
    </Card>
  );
}
