import axios from "axios";

const API_URL = "http://localhost:8080";

const getProducts = async (token) => {
  return axios.get(API_URL + "/products", {
    headers: { authorization: token },
  });
};

const productsService = {
  getProducts,
};

export default productsService;
