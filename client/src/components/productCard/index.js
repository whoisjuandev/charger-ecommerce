import React, { useState } from "react";

import { SvgIcon, Snackbar } from "@material-ui/core";
import Style from "../productCard/style.module.css";
import cart from "../../assets/imgs/carrito_icon.png";
import DoneIcon from "@material-ui/icons/Done";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const [active, setActive] = useState("");

  function handleClick(e) {
    const clicked = e.target.className;
    const message = 'Product successfully added to your cart!'
    if (props.product.stock > 0) {
      if (active === clicked) {
        setActive("");
      } else {
        props.addToCart(props.product, message);
        setActive(clicked);
      }
    } else {
      props.setAlert(true);
    }
  }

  return (
    <div className={Style.wrapper}>
      <div className={Style.container}>
        <Link to={`/product/${props.product.id}`}>
          <img src={props.product.image} alt="product" className={Style.top} />
        </Link>
        <div
          className={`${Style.bottom} ${
            active === Style.first ? Style.clicked : ""
          }`}
        >
          <div className={Style.left}>
            <div className={Style.details}>
              <div className={Style.title}>
                <h3>{props.product.name}</h3>
              </div>
              <p>${props.product.price} </p>
            </div>
            <div className={Style.buy}>
              {" "}
              <img
                className={Style.first}
                src={cart}
                alt="cart"
                onClick={handleClick}
              />{" "}
            </div>
          </div>
          <div className={Style.right}>
            <div className={Style.done}>
              <SvgIcon
                component={DoneIcon}
                style={{ fontSize: 60, paddingLeft: 15, paddingTop: 10 }}
              />
            </div>
            <div className={Style.details}>
              <div className={Style.title2}>
                <h3>{props.product.title} </h3>
              </div>
              <p>Added to your cart</p>
            </div>
          </div>
        </div>
      </div>
      <div className={Style.inside}>
        <div className={Style.icon}>
          {" "}
          <SvgIcon component={InfoOutlinedIcon} />{" "}
        </div>
        <div className={Style.contents}>
          <table>
	    <tr>
	      <th>
	      Description:
	      </th>
	    </tr>
	    <tr>
	      <td>
		{props.product.description}
	      </td> 
	    </tr>


            {/* <tr>
          <th>Talle</th>
          <th>Color</th>
        </tr>
        <tr>
          <td>S</td>
          <td>Amarillo</td>
        </tr>
        <tr>
          <th>M</th>
          <th>Negro</th>
        </tr>
        <tr>
          <td>L</td>
          <td>Verde</td>
        </tr>
        <tr>
          <th>XL</th>
          <th>Rojo</th>
        </tr>
        <tr>
          <td>XXL</td>
          <td>Blanco</td>
        </tr> */}

            {/* <th> {props.prenda.categories} </th> */}
          </table>
        </div>
      </div>
    </div>
  );
}
