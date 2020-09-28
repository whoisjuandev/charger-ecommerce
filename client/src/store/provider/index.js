import * as constants from "../constants";
import { loadState, saveState } from "../../localStorage";

const initialState = {
  categories: [],
  products: [],
  cart: loadState() === undefined ? [] : loadState(),
  selectors: [],
  users: [],

  logged: false,
  user: null,
  orders: [],
  allOrders: [],
  reloadProducts: true,
  checkoutTotal: 0,
  reviews: [],
  userReviews: [],

  error: false,
  errorMessage: "",

  successSnackbarOpen: false,
  errorSnackbarOpen: false,
  warningSnackbarOpen: false,
  successSnackbarMessage: "",
  errorSnackbarMessage: "Oh no! Something has gone wrong. Try again!",
};

export default function Provider(state = initialState, action) {
  switch (action.type) {
    case "@@INIT":
      return {
        ...state,
      };
    case constants.GET_CATEGORIES:
      return { ...state, categories: action.categories };
    case constants.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.category],
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.MODIFY_CATEGORY:
      let cat = state.categories.filter(
        (cat) => cat.id === parseInt(action.id)
      )[0];
      if (cat === undefined) return { ...state };
      let index = state.categories.indexOf(cat);
      let categories = [...state.categories];
      categories[index].name = action.name;
      categories[index].description = action.description;
      return {
        ...state,
        categories, //: state.categories.map(cat => cat.id === parseInt(action.id)?{...cat, name: action.name, description: action.description}:cat)
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (cat) => cat.id !== parseInt(action.id)
        ),
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.GET_PRODUCTS:
      return {
        ...state,
        products: state.reloadProducts ? action.products : state.products,
        reloadProducts: true,
      };
    case constants.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.product],
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.DELETE_PRODUCTS:
      return {
        ...state,
        products: state.products.filter(
          (prod) => prod.id !== parseInt(action.id)
        ),
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.ADD_CATEGORY_PRODUCT:
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.REMOVE_CATEGORY_PRODUCT:
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        products: action.products,
      };
    case constants.MODIFY_PRODUCT:
      let prod = state.products.filter(
        (prod) => prod.id === action.product.id
      )[0];
      if (prod === undefined) return { ...state };
      let indexProd = state.products.indexOf(prod);
      let products = [...state.products];
      products[indexProd].name = action.product.name;
      products[indexProd].description = action.product.description;
      products[indexProd].price = action.product.price;
      products[indexProd].stock = action.product.stock;
      products[indexProd].img = action.product.img;
      return {
        ...state,
        products,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.GET_CART:
      return {
        ...state,
        cart: action.cart,
      };
    case constants.GET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case constants.ADD_TO_CART:
      const c = state.cart.find((cart) => cart.id === action.cart.id);
      if (c === undefined) {
        action.cart.amount = 1;
        return {
          ...state,
          cart: [...state.cart, action.cart],
        };
      } else {
        c.amount++;
        return {
          ...state,
        };
      }
    case constants.REMOVE_FROM_CART:
      const m = state.cart.find((prod) => prod.id === Number(action.id));
      if (m.amount === 1) {
        return {
          ...state,
        };
      } else {
        m.amount--;
        return {
          ...state,
        };
      }
    case constants.DELETE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((prod) => prod.id !== Number(action.id)),
      };

    case constants.GET_SELECTORS:
      return {
        ...state,
        selectors: action.selectors,
      };
    case constants.CREATE_USER:
      return {
        ...state,
        users: [...state.users, action.createdUser],
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.LOGIN:
      return {
        ...state,
        logged: action.logged,
        user: action.user || null,
      };
    case constants.LOGOUT:
      return {
        ...state,
        logged: action.logged,
        user: action.user || null,
      };
    case constants.GET_USER:
      return {
        ...state,
        logged: action.logged,
        user: action.user || null,
      };
    case constants.CHECKOUT:
      return {
        ...state,
        orders: [...state.orders, action.order],
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.GET_SEARCH:
      return {
        ...state,
        products: action.products,
        reloadProducts: false,
      };
    case constants.ERROR_MESSAGE:
      return {
        ...state,
        error: true,
        errorMessage: action.message,
        errorSnackbarOpen: true,
        errorSnackbarMessage: action.errorNotification,
      };
    case constants.SNACKBAR_CLEAR:
      return {
        ...state,
        successSnackbarOpen: false,
        errorSnackbarOpen: false,
        warningSnackbarOpen: false,
      };
    case constants.CLEAR_CART:
      return {
        ...state,
        cart: action.cart,
      };
    case constants.RESET_PASSWORD:
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.GET_ALL_USERS:
      return {
        ...state,
        users: action.users,
      };
    case constants.DELETE_FROM_USERS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== parseInt(action.id)),
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.MAKE_USER_ADMIN:
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.GET_REVIEWS:
      return {
        ...state,
        reviews: action.reviews,
      };
    case constants.ADD_REVIEWS:
      return {
        ...state,
        reviews: [...state.reviews, action.review],
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.DELETE_REVIEWS:
      return {
        ...state,
        reviews: state.reviews.filter(
          (reviews) => reviews.id !== Number(action.id)
        ),
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.GET_USER_REVIEWS:
      return {
        ...state,
        userReviews: action.userReviews,
        reviews: action.userReviews.reviews,
      };
    case constants.MODIFY_REVIEW:
      let rev = state.reviews.filter(
        (rev) => rev.id === parseInt(action.id)
      )[0];
      if (rev === undefined) return { ...state };
      let i = state.reviews.indexOf(rev);
      let reviews = [...state.reviews];
      reviews[i].commentary = action.commentary;
      return {
        ...state,
        reviews,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.CONFIRM_ORDER:
      return {
        ...state,
        orders: [
          ...state.orders.filter((order) => order.id != action.order.id),
          action.order,
        ],
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };

    case constants.GET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.allOrders,
      };
    case constants.MODIFY_ORDERS_STATE:
      let ord = state.allOrders.filter(
        (order) => order.id === action.order.id
      )[0];
      if (ord === undefined) return { ...state };
      let ind = state.allOrders.indexOf(ord);
      let allOrders = [...state.allOrders];
      allOrders[ind] = action.order;
      return {
        ...state,
        allOrders,
      };
    case constants.MODIFY_USER:
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.MODIFY_MY_USER:
      return {
        ...state,
        user: action.user,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case constants.DO_PAYMENT:
      return {
        ...state,
        successSnackbarMessage: action.message,
        successSnackbarOpen: true
      }
    case constants.CANCEL_ORDER:
      return {
        ...state,
        allOrders: state.allOrders.map(order => order.id===action.order?{...order, state: 'canceled'}:order),
        successSnackbarMessage: action.message,
        successSnackbarOpen: true
      }
    default:
      return { ...state };
  }
}
