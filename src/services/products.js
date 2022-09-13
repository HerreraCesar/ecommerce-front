import { API_URL } from "../config";
import axios from "axios";

const getProducts = async (token, category) => {
  if (category) {
    return axios.get(API_URL + "/products/" + category, {
      headers: { authorization: token },
    });
  }
  return axios.get(API_URL + "/products", {
    headers: { authorization: token },
  });
};
const getProduct = async (token, id) => {
  return axios.get(API_URL + "/products?id=" + id, {
    headers: { authorization: token },
  });
};

const productsService = {
  getProducts,
  getProduct,
};

export default productsService;
