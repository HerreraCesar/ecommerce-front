import { API_URL } from "../config";
import axios from "axios";

const getOrders = async (token, email) => {
  if (email) {
    return axios.get(API_URL + "/orders?email=" + email, {
      headers: { authorization: token },
    });
  }
  return axios.get(API_URL + "/orders", {
    headers: { authorization: token },
  });
};

const postOrder = async (token) => {
  return axios.post(API_URL + "/orders", null, {
    headers: { authorization: token },
  });
};

const ordersService = {
  getOrders,
  postOrder,
};

export default ordersService;
