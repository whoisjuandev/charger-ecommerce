import axios from "axios";
import encrypt from "../../utils";

import { loadState, saveState } from "../../localStorage";
import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  ERROR_MESSAGE,
  MODIFY_CATEGORY,
  DELETE_CATEGORY,
  GET_PRODUCTS,
  DELETE_PRODUCTS,
  ADD_PRODUCT,
  ADD_CATEGORY_PRODUCT,
  REMOVE_CATEGORY_PRODUCT,
  GET_PRODUCTS_BY_CATEGORY,
  MODIFY_PRODUCT,
  GET_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DELETE_FROM_CART,
  GET_SELECTORS,
  GET_ORDERS,
  CREATE_USER,
  LOGIN,
  LOGOUT,
  CHECKOUT,
  SNACKBAR_CLEAR,
  GET_USER,
  GET_SEARCH,
  CLEAR_CART,
  RESET_PASSWORD,
  GET_ALL_USERS,
  DELETE_FROM_USERS,
  MAKE_USER_ADMIN,
  GET_REVIEWS,
  ADD_REVIEWS,
  DELETE_REVIEWS,
  CONFIRM_ORDER,
  GET_USER_REVIEWS,
  MODIFY_REVIEW,
  MODIFY_USER,
  MODIFY_MY_USER,
  GET_ALL_ORDERS,
  MODIFY_ORDERS_STATE,
  DO_PAYMENT,
  CANCEL_ORDER
} from "../constants";

const url = "localhost:3001";
const errorNotification = "Oh no! Something has gone wrong. Try again!";

export function getCategories() {
  return (dispatch) => {
    axios
      .get(`http://${url}/products/category`, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: GET_CATEGORIES,
            categories: res.data || [],
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            categories: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function addCategory(name, description, message) {
  return (dispatch) => {
    axios
      .post(`http://${url}/products/category`, {
        name,
        description,
      }, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: ADD_CATEGORY,
            category: res.data.category,
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
            errorNotification,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function modifyCategory(id, name, description, message) {
  return (dispatch) => {
    axios
      .put(`http://${url}/products/category/${id}`, {
        name,
        description,
      }, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: MODIFY_CATEGORY,
            id,
            name,
            description,
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function deleteCategory(id, message) {
  return (dispatch) => {
    axios
      .delete(`http://${url}/products/category/${id}`, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: DELETE_CATEGORY,
            id,
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function getProducts() {
  return (dispatch) => {
    axios
      .get(`http://${url}/products?showOutStock=true`, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: GET_PRODUCTS,
            products: res.data,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function deleteProduct(id, message) {
  return (dispatch) => {
    axios
      .delete(`http://${url}/products/${id}`, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: DELETE_PRODUCTS,
            id,
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function addProduct(name, description, price, stock, img, message) {
  return (dispatch) => {
    axios
      .post(`http://${url}/products`, {
        name,
        description,
        price,
        stock,
        img,
      }, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: ADD_PRODUCT,
            product: res.data.product,
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function addCategoryProduct(productId, categoryId, message) {
  return (dispatch) => {
    console.log({ productId, categoryId });
    axios
      .put(`http://${url}/products/${productId}/${categoryId}`, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: ADD_CATEGORY_PRODUCT,
            data: {
              productId,
              categoryId,
            },
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function removeCategoryProduct(productId, categoryId, message) {
  return (dispatch) => {
    axios
      .delete(`http://${url}/products/${productId}/${categoryId}`, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: REMOVE_CATEGORY_PRODUCT,
            data: {
              productId,
              categoryId,
            },
            message,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function getProductsByCategory(categoryId) {
  return (dispatch) => {
    axios
      .get(`http://${url}/products/searchByCategory/${categoryId}`, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: GET_PRODUCTS_BY_CATEGORY,
            products: res.data.products,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function getSearch(searchKey) {
  return (dispatch) => {
    axios
      .post(`http://${url}/products/search/`, { search: searchKey }, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: GET_SEARCH,
            products: res.data.products,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      });
  };
}

export function modifyProduct(
  id,
  name,
  description,
  price,
  stock,
  img,
  message
) {
  return (dispatch) => {
    axios
      .put(`http://${url}/products/${id}`, {
        name,
        price,
        stock,
        description,
        img,
      }, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: MODIFY_PRODUCT,
            product: res.data.product,
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}
export function getCart() {
  return (dispatch) => {
    const cart = loadState();
    if (cart !== "error") {
      dispatch({
        type: GET_CART,
        cart: cart,
      });
    }
  };
}
export function clearCart() {
  const cart = [];

  return (dispatch) => {
    dispatch({
      type: CLEAR_CART,
      cart: cart,
    });
  };
}
export function addToCart(product, message) {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      cart: product,
      message,
    });
  };
}
export function removeFromCart(product, message) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_FROM_CART,
      id: product.id,
      message,
    });
  };
}
export function deleteFromCart(product) {
  return (dispatch) => {
    dispatch({
      type: DELETE_FROM_CART,
      id: product.id,
    });
  };
}
export function getSelectors() {
  return (dispatch) => {
    axios
      .get(`http://${url}/products/selectors`, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: GET_SELECTORS,
            selectors: res.data.selectors,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function getOrders(userId) {
  return (dispatch) => {
    axios
      .get(`http://${url}/order/${userId}`, {withCredentials: true})
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          // console.log(res.data.orders);
          res.data.orders = res.data.orders.map((order) => ({
            ...order,
            shoppingCart: {
              ...order.shoppingCart,
              content: JSON.parse(order.shoppingCart.content),
            },
          }));
          dispatch({
            type: GET_ORDERS,
            orders: res.data.orders,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(console.error);
  };
}

export function createUser(email, password, name, lastName, address, message) {
  return (dispatch) => {
    axios
      .post(`http://${url}/users`, {
        email,
        password,
        name,
        lastName,
        address, //aca se los pasamos por body
      }, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: CREATE_USER,
            createdUser: res.data.createdUser,
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function loginUser(email, password, errorNotification) {
  return (dispatch) => {
    axios
      .post(
        `http://${url}/users/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        if (res.data.logged === true) {
          dispatch({
            type: LOGIN,
            user: res.data.user,
            logged: res.data.logged,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function checkout(message, redirectTo) {
  const content = localStorage.getItem("cart");

  return (dispatch) => {
    axios
      .post(
        `http://${url}/checkout`,
        {
          content,
        },
        { withCredentials: true }
      )
      .then((res) => {
        let order = res.data.order;
        if (order) {
          order = {
            ...order,
            shoppingCart: {
              ...order.shoppingCart,
              content: JSON.parse(order.shoppingCart.content),
            },
          };

          dispatch({
            type: CHECKOUT,
            order: order,
            message,
          });
          redirectTo(`/checkout/purchase/${order.id}`);
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .then(() => {
        dispatch({
          type: CLEAR_CART,
          cart: [],
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function logout() {
  return (dispatch) => {
    axios
      .get(`http://${url}/users/logout`, { withCredentials: true })
      .then((res) => {
        dispatch({
          type: LOGOUT,
          logged: false,
          user: null,
        });
      })
      .then(() => {
        dispatch({
          type: CLEAR_CART,
          cart: [],
        });
      });
  };
}

export function getUser() {
  return (dispatch) => {
    axios
      .get(`http://${url}/users/getuser`, { withCredentials: true })
      .then((res) => {
        if (res.data.logged) {
          dispatch({
            type: GET_USER,
            logged: res.data.logged,
            user: res.data.user,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch(console.error);
  };
}

export function getAllUsers() {
  return (dispatch) => {
    axios
      .get(`http://${url}/users`, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          dispatch({
            type: GET_ALL_USERS,
            users: res.data,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function deleteUser(id, message) {
  return (dispatch) => {
    axios
      .delete(`http://${url}/users/${id}`, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: DELETE_FROM_USERS,
            id,
            message,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function makeAdmin(id, message) {
  return (dispatch) => {
    axios
      .put(`http://${url}/users/usertoadmin/${id}`, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: MAKE_USER_ADMIN,
            message,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export const clearSnackbar = () => {
  return { type: SNACKBAR_CLEAR };
};

export const resetPassword = (email, password, repassword) => {
  return (dispatch) => {
    axios
      .put(`http://${url}/users/password/${email}`, { password, repassword }, {withCredentials: true})
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          return dispatch({
            type: RESET_PASSWORD,
            message: "Password changed correctly",
          });
        } else {
          return dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: ERROR_MESSAGE,
          message: err.data,
        });
      });
  };
};
//  w

export function getReviews(Id) {
  return (dispatch) => {
    axios
      .get(`http://${url}/reviews/${Id}`, {withCredentials: true})
      .then((res) => {
        dispatch({
          type: GET_REVIEWS,
          reviews: res.data.reviews,
        });
      })
      .catch(console.error);
  };
}

export function addReviews(userId, productId, commentary, rating, message) {
  return (dispatch) => {
    axios
      .post(`http://${url}/reviews/`, { 
	userId, productId, commentary, rating 
      }, {withCredentials: true}).then((res) => {
          dispatch({
            type: ADD_REVIEWS,
            review: res.data.review,
            message
          });
      }).catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}
export function deleteReviews(reviewId, message) {
  return (dispatch) => {
    axios.delete(`http://${url}/reviews/${reviewId}`, {withCredentials: true})
      .then((res) => {
        dispatch({
          type: DELETE_REVIEWS,
          id: reviewId,
          message,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function getUserReviews(userId) {
  return (dispatch) => {
    axios.get(`http://${url}/reviews/user/${userId}`, {withCredentials: true})
      .then(res => {
        console.log(res.data.text)
        dispatch({
          type: GET_USER_REVIEWS,
          userReviews: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}
// en este caso, vamos a llevarnos esta funcion |

export function modifyReview(id, commentary, message) {
  return (dispatch) => {
    axios
      .put(`http://${url}/reviews/${id}`, {
        commentary,
      }, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: MODIFY_REVIEW,
            id,
            commentary,
            message,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function confirmOrder(token, redirectTo, successMessage, errorMessage) {
  return (dispatch) => {
    axios
      .post(
        `http://${url}/order/confirm/${token}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: CONFIRM_ORDER,
          order: res.data.order,
          message: successMessage,
        });
        redirectTo("/");
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
        redirectTo('/');
      });
  };
}

export function modifyUser(id, name, lastName, password, address, message) {
  return (dispatch) => {
    axios
      .put(`http://${url}/users/${id}`, {
        name, lastName, password, address
      }, {withCredentials: true})
      .then(res => {
        if(res.status === 200) {
          dispatch({
            type: MODIFY_USER,
            user: res.data.user,
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            message: res.data.text,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function modifyMyUser(data, successMessage, errorMessage) {
  return (dispatch) => {
    axios
      .post(
        `http://${url}/users/modify`,
        { ...data },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.status >= 200 || res.status <= 299) {
          dispatch({
            type: MODIFY_MY_USER,
            user: res.data.user,
            message: successMessage,
          });
        }
      })
      .catch((err) => {
        console.error(err.response);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification: errorMessage,
        });
      });
  };
}
export function getAllOrders() {
  return (dispatch) => {
    axios.get(`http://${url}/checkout/check/`, {withCredentials: true})
      .then(res => {
        dispatch({
          type: GET_ALL_ORDERS,
          allOrders: res.data,
        });
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}
export function modifyOrdersState(orderId, newState) {
  if(newState === 'canceled') return {
    type: ERROR_MESSAGE,
    errorNotification: 'To cancel a order you have to use the "Cancel order" button.'
  }

  return (dispatch) => {
    axios.put(`http://${url}/checkout/check/`,
      {id:orderId, state: newState}, {withCredentials: true}
    )
      .then(res => {
	if(res.status === 200){
         dispatch({
	   type: MODIFY_ORDERS_STATE,
	   order: res.data
	 })
        }
	else{
	  dispatch({
            type: ERROR_MESSAGE,
            errorNotification,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification,
        });
      });
  };
}

export function doPayment(paymentMethod, orderId, message) {
  return dispatch => {
    axios
      .post(`http://${url}/checkout/purchase/${orderId}`, {paymentMethod}, {withCredentials: true})
        .then(res => {
          if (res.status === 200) {
            dispatch({
              type: DO_PAYMENT,
              message
            })
          }
        })
        .catch((err) => {
          console.error(err);
          dispatch({ // lee meet
            type: ERROR_MESSAGE,
            errorNotification,
          });
        });
  }
}

export function cancelOrder(id, successMessage, errorMessage) {
  return dispatch => {
    axios.delete(`http://${url}/checkout/${id}`, {withCredentials: true})
      .then(res => {
        if(res.data.success) {
          dispatch({
            type: CANCEL_ORDER,
            order: id,
            message: successMessage
          });
        } else {
          dispatch({
            type: ERROR_MESSAGE,
            errorNotification: errorMessage
          });
        }
      }).catch(err => {
        dispatch({
          type: ERROR_MESSAGE,
          errorNotification: errorMessage
        });
      })
  }
}