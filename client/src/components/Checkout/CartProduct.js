import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { Button, TableRow, TableCell } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "5px",
    marginBottom: "5px",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  image: {
    width: 90,
    height: 90,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
}));

export default function CartProduct({
  product,
  onClose,
  addToCart,
  removeFromCart,
  deleteFromCart,
  handleChange
}) {
  const classes = useStyles();
  product.image =
    product.image === undefined ? product.imgs[0].url : product.image;
  const [amount, setAmount] = useState(product.amount);

  useEffect(() => {
    handleChange(product.id, amount * product.price);
  }, [amount])

  return (
    <>
      <TableCell align="right">
        <ButtonBase className={classes.image}>
          <img
            className={classes.img}
            /*alt="complex"*/
            src={product.image}
          />
        </ButtonBase>
      </TableCell>
      <TableCell align="right">
        <Typography gutterBottom variant="subtitle1">
          {product.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {product.description}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Button
          onClick={(e) => {
            if (product.amount < product.stock) {
              addToCart(product);
              setAmount(product.amount);
            } else {
              //pass
            }
          }}
        >
          <AddCircleIcon />
        </Button>
        x{amount} {"\u00A0"} {/* \u00A0 es un espacio */}$
        {product.price * amount}
        <Button
          onClick={(e) => {
            removeFromCart(product);
            setAmount(product.amount);
          }}
        >
          <RemoveCircleIcon />
        </Button>
      </TableCell>
      <TableCell align="right">
        <Button onClick={onClose}>
          <DeleteForeverIcon fontSize="large" />
        </Button>
      </TableCell>
    </>
  );
}
