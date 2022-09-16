import { notifyError, notifySuccess } from "../../services/notifications";

import { API_URL } from "../../config";
import axios from "axios";
import { cartTypes } from "../types/cart.types";

const { GET_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT, CLEAR_CART } = cartTypes;

export const getProductsInCart = (token, id, setLoading = false) => {
  return async (dispatch) => {
    try {
      const response = await axios
        .get(API_URL + "/carts/" + id, {
          headers: { authorization: token },
        })
        .then((response) => {
          setLoading(false);
          return response.data;
        });
      dispatch({
        type: GET_PRODUCTS,
        products: response.products,
        total: response.total,
      });
    } catch (error) {
      console.log(error);
      notifyError("Hubo un problema al obtener el carrito");
    }
  };
};

export const addProductToCart = (
  token,
  cartId,
  productId,
  setLoading,
  setAdded
) => {
  return async (dispatch) => {
    try {
      const response = await axios
        .post(API_URL + "/carts/" + cartId + "/" + productId, null, {
          headers: { authorization: token },
        })
        .then((response) => {
          if (response.data.status !== 200) {
            throw new Error();
          }
          return response.data;
        });

      dispatch({
        type: ADD_PRODUCT,
        products: response.cart.products,
        total: response.cart.total,
      });
      setAdded(true);
      setLoading(false);
      notifySuccess(response.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      notifyError("Ocurrió un problema al agregar el producto.");
    }
  };
};

export const removeProductFromCart = (token, cartId, productId, setLoading) => {
  return async (dispatch) => {
    try {
      const response = await axios
        .delete(API_URL + "/carts/" + cartId + "/" + productId, {
          headers: { authorization: token },
        })
        .then((response) => {
          if (response.data.status !== 200) {
            throw new Error();
          }
          return response.data;
        });

      dispatch({
        type: REMOVE_PRODUCT,
        products: response.cart.products,
        total: response.cart.total,
      });
      setLoading(false);
      notifySuccess(response.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      notifyError("Ocurrió un problema al eliminar el producto del carrito.");
    }
  };
};

export const clearCart = (token, cartId, setLoading) => {
  return async (dispatch) => {
    try {
      const response = await axios
        .delete(API_URL + "/carts/" + cartId, {
          headers: { authorization: token },
        })
        .then((response) => {
          if (response.data.status !== 200) {
            throw new Error();
          }
          return response.data;
        });

      dispatch({
        type: CLEAR_CART,
        products: response.cart.products,
        total: response.cart.total,
      });
      setLoading(false);
      notifySuccess(response.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      notifyError("Ocurrió un problema al vaciar el carrito.");
    }
  };
};
