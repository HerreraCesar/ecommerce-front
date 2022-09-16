import { Link, Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  addProductToCart,
  getProductsInCart,
} from "../../store/actions/cart.action";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../loader/Loader";
import { notifyInfo } from "../../services/notifications";
import productsService from "../../services/products";
import { validate } from "../../store/actions/auth.action";

const Details = () => {
  const [isLoading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const user = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validate());
    dispatch(getProductsInCart(user.token, user.cart, setLoading));
    if (user.validated === true) {
      productsService.getProduct(user.token, id).then(
        (response) => {
          setProduct(response.data);
          setLoading(false);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      notifyInfo("Para acceder a esta sección debe iniciar sesión");
    }
  }, [id]);
  useEffect(() => {
    const index = cart.products.findIndex(
      (register) => register.id === product.id
    );
    if (index === -1) {
      setAdded(false);
    } else {
      setAdded(true);
    }
  }, [cart, product]);
  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      addProductToCart(user.token, user.cart, product.id, setLoading, setAdded)
    );
  };
  return user.validated ? (
    isLoading ? (
      <Loader />
    ) : (
      <div className="detail">
        <div className="frame">
          <img className="photo" src={product.thumbnail} alt={product.title} />
        </div>
        <div className="data">
          <div>
            <h2 className="name">{product.title}</h2>
            <span className="price">$ {product.price}</span>
          </div>
          {added ? (
            <div>
              <p className="noStock">Producto en carrito</p>
              <div className="buttonsContainer">
                <Link to="/carrito">
                  <button className="button">Ir al carrito</button>
                </Link>
                <button
                  className="button"
                  onClick={() => window.history.back()}
                >
                  Volver
                </button>
              </div>
            </div>
          ) : (
            <button className="button" onClick={addProduct}>
              Agregar al carrito
            </button>
          )}
        </div>
      </div>
    )
  ) : (
    <Navigate to="/autenticacion" />
  );
};

export default Details;
