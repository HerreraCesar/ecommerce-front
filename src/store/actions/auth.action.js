import { API_URL } from "../../config";
import { authTypes } from "../types/auth.types";
import axios from "axios";
import { notifyError } from "../../services/notifications";
import { validateSession } from "../../services/session";

const { SIGNUP, SIGNIN, SIGNOUT, CHECK_TOKEN } = authTypes;

export const signup = (email, password, username, phone, setLoading) => {
  return async (dispatch) => {
    try {
      const response = await axios
        .post(API_URL + "/registration", {
          email,
          password,
          username,
          phone,
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          return response.data;
        });

      dispatch({
        type: SIGNUP,
        token: response.token,
        email: response.email,
        username: response.username,
        cart: response.cart,
        chat: response.chat,
        timestamp: response.timestamp,
        validated: true,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      notifyError("El usuario ya se encuentra registrado");
    }
  };
};

export const signin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios
        .post(API_URL + "/login", {
          email,
          password,
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          return response.data;
        });

      dispatch({
        type: SIGNIN,
        token: response.token,
        email: response.email,
        username: response.username,
        cart: response.cart,
        chat: response.chat,
        timestamp: response.timestamp,
        validated: true,
      });
    } catch (error) {
      notifyError("Datos incorrectos");
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("user");
      dispatch({
        type: SIGNOUT,
        validated: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const validate = () => {
  return async (dispatch) => {
    try {
      const response = validateSession();
      dispatch({
        type: CHECK_TOKEN,
        validated: response,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
