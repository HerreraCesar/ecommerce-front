import { cartTypes } from "../types/cart.types";

const { GET_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT, CLEAR_CART } = cartTypes;

const initialState = {
  products: [],
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.products,
        total: action.total,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: action.products,
        total: action.total,
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: action.products,
        total: action.total,
      };
    case CLEAR_CART:
      return {
        ...state,
        products: action.products,
        total: action.total,
      };
    default:
      return state;
  }
};
export default cartReducer;
